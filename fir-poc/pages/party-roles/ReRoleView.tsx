import React, { useMemo } from 'react';
import { Zap, Coins, Info, BarChart3, FileText, Globe, TowerControl } from 'lucide-react';
import { pocStyles } from '../../styles';
import { mockBids, POC_NOW, mockCUs, svkProducts } from '../../mockData';

interface Props {
  retailCustomers: any[];
  onSelectCU: (id: string) => void;
}

const getSeededDeliveryFactor = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    let sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += Math.sin(hash * i * 9876.5432);
    }
    const avg = sum / 10; 
    return 1.0 + (avg * 0.4);
};

export const ReRoleView: React.FC<Props> = ({ retailCustomers, onSelectCU }) => {
  const partyName = retailCustomers[0]?.re || 'Retailer';

  const settlementData = useMemo(() => {
    const cuMap = new Map<string, { tso: number, dso: number }>();
    let totalTsoMWh = 0;
    let totalDsoMWh = 0;
    let impactedUnitsCount = 0;

    const weekAgo = new Date(POC_NOW.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    const relevantBids = mockBids.filter(bid => {
        const date = new Date(bid.timestamp);
        const diffHours = (POC_NOW.getTime() - date.getTime()) / (1000 * 60 * 60);
        return date >= weekAgo && 
               bid.selectionStatus === 'Selected' && 
               bid.status === 'Valid' && 
               bid.activationStatus === 'Activated' &&
               diffHours >= 6;
    });

    relevantBids.forEach(bid => {
        const productMeta = svkProducts.find(p => p.id === bid.productId);
        const isTSO = !bid.productId.startsWith('LM-') && (productMeta?.market.includes('TSO') || productMeta?.market.includes('Balancing'));
        
        const factor = getSeededDeliveryFactor(bid.id);
        const totalVerifiedMWh = bid.volumeMW * factor * 0.25;

        const allSpgCUs = mockCUs.filter(c => c.spgId === bid.spgId || c.localSpgId === bid.spgId);
        const mySpgCUs = allSpgCUs.filter(c => c.re === partyName);
        
        if (mySpgCUs.length > 0) {
            const sharePerCU = totalVerifiedMWh / allSpgCUs.length;
            
            mySpgCUs.forEach(cu => {
                const current = cuMap.get(cu.id) || { tso: 0, dso: 0 };
                if (current.tso === 0 && current.dso === 0) impactedUnitsCount++;
                
                if (isTSO) {
                    current.tso += sharePerCU;
                    totalTsoMWh += sharePerCU;
                } else {
                    current.dso += sharePerCU;
                    totalDsoMWh += sharePerCU;
                }
                cuMap.set(cu.id, current);
            });
        }
    });

    const compensatedCustomers = retailCustomers.filter(cu => {
        const vals = cuMap.get(cu.id);
        return vals && (vals.tso > 0 || vals.dso > 0);
    });

    return {
        cuMap,
        totalTsoMWh,
        totalDsoMWh,
        totalCompMWh: (totalTsoMWh + totalDsoMWh).toFixed(3),
        impactedUnitsCount,
        compensatedCustomers
    };
  }, [partyName, retailCustomers]);

  return (
    <div style={{ ...pocStyles.section, borderLeft: '4px solid #e65100' }}>
      <h3 style={pocStyles.sectionTitle}>
        <Zap size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
        Role: Electricity Supplier (RE) — Compensation Basis
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#fff7e6', padding: '24px', borderRadius: '12px', border: '1px solid #ffd591', boxShadow: '0 2px 4px rgba(212, 107, 8, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Coins size={20} color="#d46b08" />
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#d46b08', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Verified Volume (Week)</h4>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#873800' }}>{settlementData.totalCompMWh} MWh</div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: '#0052cc' }}>
                    <Globe size={12} /> TSO: {settlementData.totalTsoMWh.toFixed(3)}
                </div>
                <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: '#4a148c' }}>
                    <TowerControl size={12} /> DSO: {settlementData.totalDsoMWh.toFixed(3)}
                </div>
            </div>
        </div>
        
        <div style={{ backgroundColor: '#f4f5f7', padding: '24px', borderRadius: '12px', border: '1px solid #dfe1e6', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <BarChart3 size={20} color="#42526e" />
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Compensation Units</h4>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#172b4d' }}>{settlementData.impactedUnitsCount} Units</div>
            <p style={{ fontSize: '0.8rem', color: '#6b778c', marginTop: '8px' }}>
                Resources in your portfolio with verified activations this week.
            </p>
        </div>
      </div>

      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #ebecf0', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Info size={18} color="#0052cc" />
          <p style={{ fontSize: '0.85rem', color: '#42526e', margin: 0 }}>
            List filtered to show units with <strong>Verified Volume</strong>. Volumes are split by market type (TSO Balancing vs DSO Local).
          </p>
      </div>

      <table style={pocStyles.table}>
        <thead style={{ backgroundColor: '#fafbfc' }}>
          <tr>
            <th style={pocStyles.th}>Unit ID</th>
            <th style={pocStyles.th}>Accounting Point</th>
            <th style={pocStyles.th}>Bidding Zone</th>
            <th style={{ ...pocStyles.th, textAlign: 'right' }}>TSO Vol (MWh)</th>
            <th style={{ ...pocStyles.th, textAlign: 'right' }}>DSO Vol (MWh)</th>
            <th style={{ ...pocStyles.th, textAlign: 'right' }}>Total (MWh)</th>
          </tr>
        </thead>
        <tbody>
          {settlementData.compensatedCustomers.length > 0 ? (
            settlementData.compensatedCustomers.map(cu => {
              const volumes = settlementData.cuMap.get(cu.id) || { tso: 0, dso: 0 };
              const total = volumes.tso + volumes.dso;
              return (
                <tr 
                  key={cu.id} 
                  style={{ ...pocStyles.row, backgroundColor: '#fffaf0' }} 
                  onClick={() => onSelectCU(cu.id)}
                >
                  <td style={{ ...pocStyles.td, color: '#0052cc', fontWeight: 600 }}>{cu.id}</td>
                  <td style={{ ...pocStyles.td, fontFamily: 'monospace', fontSize: '0.85rem' }}>{cu.accountingPoint}</td>
                  <td style={pocStyles.td}><span style={pocStyles.badge}>{cu.biddingZone}</span></td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', color: '#0052cc', fontSize: '0.85rem' }}>
                    {volumes.tso > 0 ? volumes.tso.toFixed(3) : '-'}
                  </td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', color: '#4a148c', fontSize: '0.85rem' }}>
                    {volumes.dso > 0 ? volumes.dso.toFixed(3) : '-'}
                  </td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#d97706' }}>
                    +{total.toFixed(3)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} style={{ ...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic' }}>
                No units with verified volume found for this period.
              </td>
            </tr>
          )}
        </tbody>
        {settlementData.compensatedCustomers.length > 0 && (
          <tfoot style={{ backgroundColor: '#f4f5f7', borderTop: '2px solid #ebecf0' }}>
              <tr>
                  <td colSpan={3} style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700 }}>TOTAL COMPENSATION BASIS:</td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 600, color: '#0052cc' }}>{settlementData.totalTsoMWh.toFixed(3)}</td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 600, color: '#4a148c' }}>{settlementData.totalDsoMWh.toFixed(3)}</td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#d97706' }}>{settlementData.totalCompMWh} MWh</td>
              </tr>
          </tfoot>
        )}
      </table>
      
      <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button style={{ ...pocStyles.actionButton, backgroundColor: '#fff', color: '#0052cc', border: '1px solid #0052cc', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <FileText size={14} /> Download Settlement XML
          </button>
      </div>
    </div>
  );
};