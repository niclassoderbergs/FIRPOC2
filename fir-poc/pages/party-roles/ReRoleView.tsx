
import React, { useMemo } from 'react';
import { Zap, Coins, Info, BarChart3, FileText } from 'lucide-react';
import { pocStyles } from '../../styles';
import { mockBids, POC_NOW, mockCUs } from '../../mockData';

interface Props {
  retailCustomers: any[];
  onSelectCU: (id: string) => void;
}

// Consistent delivery factor logic to ensure mathematical alignment across the system
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

  // Central Settlement Logic: Map verified volumes from activations to individual CUs
  const settlementData = useMemo(() => {
    const cuMap = new Map<string, number>();
    let totalCompMWh = 0;
    let impactedUnitsCount = 0;

    // Filter relevant activations (past week, successful, verified)
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
        const factor = getSeededDeliveryFactor(bid.id);
        const totalVerifiedMWh = bid.volumeMW * factor * 0.25; // 15 min MTU

        // Calculate share per CU in the group that belongs to THIS Retailer
        const allSpgCUs = mockCUs.filter(c => c.spgId === bid.spgId);
        const mySpgCUs = allSpgCUs.filter(c => c.re === partyName);
        
        if (mySpgCUs.length > 0) {
            const sharePerCU = totalVerifiedMWh / allSpgCUs.length;
            
            mySpgCUs.forEach(cu => {
                const currentVal = cuMap.get(cu.id) || 0;
                if (currentVal === 0) impactedUnitsCount++;
                cuMap.set(cu.id, currentVal + sharePerCU);
                totalCompMWh += sharePerCU;
            });
        }
    });

    // Only show units that actually have volume to compensate
    const compensatedCustomers = retailCustomers.filter(cu => (cuMap.get(cu.id) || 0) > 0);

    return {
        cuMap,
        totalCompMWh: totalCompMWh.toFixed(3),
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
            <p style={{ fontSize: '0.8rem', color: '#873800', marginTop: '8px', lineHeight: '1.4' }}>
                Verified flexibility volume to be compensated for current settlement period.
            </p>
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
            List filtered to only show units with <strong>Verified Volume</strong> requiring financial settlement.
          </p>
      </div>

      <table style={pocStyles.table}>
        <thead style={{ backgroundColor: '#fafbfc' }}>
          <tr>
            <th style={pocStyles.th}>Unit ID</th>
            <th style={pocStyles.th}>Accounting Point</th>
            <th style={pocStyles.th}>Bidding Zone</th>
            <th style={{ ...pocStyles.th, textAlign: 'right' }}>Verified Volume (MWh)</th>
          </tr>
        </thead>
        <tbody>
          {settlementData.compensatedCustomers.length > 0 ? (
            settlementData.compensatedCustomers.map(cu => {
              const verifiedVolume = settlementData.cuMap.get(cu.id) || 0;
              return (
                <tr 
                  key={cu.id} 
                  style={{ ...pocStyles.row, backgroundColor: '#fffaf0' }} 
                  onClick={() => onSelectCU(cu.id)}
                >
                  <td style={{ ...pocStyles.td, color: '#0052cc', fontWeight: 600 }}>{cu.id}</td>
                  <td style={{ ...pocStyles.td, fontFamily: 'monospace', fontSize: '0.85rem' }}>{cu.accountingPoint}</td>
                  <td style={pocStyles.td}><span style={pocStyles.badge}>{cu.biddingZone}</span></td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#d97706' }}>
                    +{verifiedVolume.toFixed(3)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} style={{ ...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic' }}>
                No units with verified volume found for this period.
              </td>
            </tr>
          )}
        </tbody>
        {settlementData.compensatedCustomers.length > 0 && (
          <tfoot style={{ backgroundColor: '#f4f5f7', borderTop: '2px solid #ebecf0' }}>
              <tr>
                  <td colSpan={3} style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700 }}>TOTAL COMPENSATION BASIS:</td>
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
