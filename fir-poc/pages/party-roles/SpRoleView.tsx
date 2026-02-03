
import React, { useMemo } from 'react';
// Fix: Added missing 'Download' import from lucide-react
import { Briefcase, Coins, CheckCircle2, Zap, Info, Activity, FileSearch, TrendingUp, ArrowRight, Calendar, Download } from 'lucide-react';
import { pocStyles } from '../../styles';
import { mockBids, POC_NOW, mockCUs } from '../../mockData';

interface Props {
  managedSPGs: any[];
  ownedCUs: any[];
  onSelectSPG: (id: string) => void;
}

// Consistent delivery factor logic to match the verification page
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

export const SpRoleView: React.FC<Props> = ({ managedSPGs, ownedCUs, onSelectSPG }) => {
  const partyName = managedSPGs[0]?.fsp || 'Service Provider';
  const oneWeekAgo = new Date(POC_NOW.getTime() - (7 * 24 * 60 * 60 * 1000));

  const totalCapacityMW = useMemo(() => {
    return ownedCUs.reduce((sum, cu) => {
      const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
      return sum + val;
    }, 0);
  }, [ownedCUs]);

  // Settlement Data Calculation
  const settlement = useMemo(() => {
    const verifiedBids = mockBids.filter(bid => {
      const bidTime = new Date(bid.timestamp);
      const diffHours = (POC_NOW.getTime() - bidTime.getTime()) / (1000 * 60 * 60);
      return bid.bsp === partyName && 
             bid.selectionStatus === 'Selected' && 
             bid.status === 'Valid' && 
             bid.activationStatus === 'Activated' &&
             diffHours >= 6;
    }).map(bid => {
        const factor = getSeededDeliveryFactor(bid.id);
        const verifiedMW = bid.volumeMW * factor;
        const verifiedMWh = verifiedMW * 0.25; // 15 min MTU
        const accuracy = Math.round(factor * 100);
        return { ...bid, verifiedMW, verifiedMWh, accuracy };
    });

    const totalEnergy = verifiedBids.reduce((sum, b) => sum + b.verifiedMWh, 0);
    
    const weeklyBids = verifiedBids.filter(b => new Date(b.timestamp) >= oneWeekAgo);
    const weeklyEnergy = weeklyBids.reduce((sum, b) => sum + b.verifiedMWh, 0);
    const weeklyCapacity = weeklyBids.reduce((sum, b) => sum + b.verifiedMW, 0);

    return {
      history: verifiedBids.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      totalMWh: totalEnergy.toFixed(3),
      weeklyMWh: weeklyEnergy.toFixed(3),
      weeklyMW: weeklyCapacity.toFixed(2),
      count: verifiedBids.length,
      weeklyCount: weeklyBids.length
    };
  }, [partyName]);

  return (
    <div style={{ ...pocStyles.section, borderLeft: '4px solid #0052cc' }}>
      <h3 style={pocStyles.sectionTitle}>
        <Briefcase size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
        Role: Balance Service Provider (BSP)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#f4f5f7', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase' }}>Portfolios (SPGs)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#172b4d' }}>{managedSPGs.length} Groups</div>
          <div style={{ fontSize: '0.75rem', color: '#6b778c', marginTop: '4px' }}>In {ownedCUs.length} Controllable Units</div>
        </div>
        <div style={{ backgroundColor: '#e6effc', padding: '16px', borderRadius: '8px', border: '1px solid #b3d4ff' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0052cc', textTransform: 'uppercase' }}>Qualified Capacity</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0052cc' }}>{totalCapacityMW.toFixed(1)} MW</div>
          <div style={{ fontSize: '0.75rem', color: '#0052cc', marginTop: '4px' }}>Gross potential across all zones</div>
        </div>
        <div style={{ backgroundColor: '#e3fcef', padding: '16px', borderRadius: '8px', border: '1px solid #b3dfc1' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#006644', textTransform: 'uppercase' }}>Verified Delivery (Total)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#006644' }}>{settlement.totalMWh} MWh</div>
          <div style={{ fontSize: '0.75rem', color: '#006644', marginTop: '4px' }}>Accrued settlement basis</div>
        </div>
      </div>

      {/* SETTLEMENT AUDIT SECTION */}
      <div style={{ marginBottom: '40px', backgroundColor: '#fafbfc', border: '1px solid #ebecf0', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#172b4d', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Coins size={20} color="#006644" /> Financial Settlement Audit
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ ...pocStyles.actionButton, backgroundColor: '#fff', color: '#0052cc', border: '1px solid #dfe1e6', fontSize: '0.75rem' }}>
                    <Calendar size={14} style={{ marginRight: '6px' }} /> Custom Range
                </button>
                <button style={{ ...pocStyles.actionButton, backgroundColor: '#0052cc', fontSize: '0.75rem' }}>
                    <Download size={14} style={{ marginRight: '6px' }} /> Export Settlement XML
                </button>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            {/* Stats Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ebecf0' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', marginBottom: '8px' }}>LATEST 7 DAYS</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0052cc' }}>{settlement.weeklyMWh} MWh</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b778c' }}>{settlement.weeklyCount} Activations</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#172b4d' }}>{settlement.weeklyMW} MW</div>
                            <div style={{ fontSize: '0.65rem', color: '#6b778c' }}>Avg. Capacity</div>
                        </div>
                    </div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#e3fcef', borderRadius: '8px', border: '1px solid #b3dfc1' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#006644', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <CheckCircle2 size={14} /> Settlement Ready
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#006644', margin: 0, lineHeight: '1.4' }}>
                        All values for the current period have passed the 6h metering frist and are finalized for clearing.
                    </p>
                </div>
            </div>

            {/* Recent Verified Table */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #ebecf0', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={pocStyles.table}>
                    <thead style={{ backgroundColor: '#f4f5f7' }}>
                        <tr>
                            <th style={pocStyles.th}>Reference</th>
                            <th style={pocStyles.th}>MTU</th>
                            <th style={{ ...pocStyles.th, textAlign: 'right' }}>Verified (MW)</th>
                            <th style={{ ...pocStyles.th, textAlign: 'right' }}>Energy (MWh)</th>
                            <th style={pocStyles.th}>Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {settlement.history.slice(0, 5).map((bid, idx) => {
                            let resultColor = '#36b37e'; 
                            if (bid.accuracy < 98) resultColor = '#ffab00';
                            if (bid.accuracy < 90) resultColor = '#bf2600';
                            return (
                                <tr key={bid.id} style={{ ...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff' }}>
                                    <td style={{ ...pocStyles.td, fontWeight: 600, color: '#0052cc', fontSize: '0.8rem' }}>{bid.id}</td>
                                    <td style={pocStyles.td}>
                                        <div style={{ fontSize: '0.75rem' }}>{new Date(bid.timestamp).toLocaleDateString()} {bid.period}</div>
                                    </td>
                                    <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 600 }}>{bid.verifiedMW.toFixed(2)}</td>
                                    <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#0052cc' }}>{bid.verifiedMWh.toFixed(3)}</td>
                                    <td style={pocStyles.td}>
                                        <span style={{ color: resultColor, fontSize: '0.75rem', fontWeight: 800 }}>{bid.accuracy}%</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#42526e', marginBottom: '12px', textTransform: 'uppercase' }}>Portfolios & Groups (SPG)</h4>
        <table style={pocStyles.table}>
          <thead>
            <tr>
              <th style={pocStyles.th}>ID</th>
              <th style={pocStyles.th}>Group Name</th>
              <th style={pocStyles.th}>Bidding Zone</th>
              <th style={{ ...pocStyles.th, textAlign: 'right' }}>Capacity (MW)</th>
              <th style={pocStyles.th}>Status</th>
              <th style={{ ...pocStyles.th, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managedSPGs.map((spg, idx) => {
              const spgUnits = mockCUs.filter(cu => cu.spgId === spg.id);
              const spgPowerMW = spgUnits.reduce((acc, curr) => {
                const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
                return acc + val;
              }, 0);

              return (
                <tr key={spg.id} style={{ ...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff' }} onClick={() => onSelectSPG(spg.id)}>
                  <td style={{ ...pocStyles.td, color: '#0052cc', fontWeight: 600 }}>{spg.id}</td>
                  <td style={pocStyles.td}>{spg.name}</td>
                  <td style={pocStyles.td}><span style={pocStyles.badge}>SE{spg.zone.replace('SE', '')}</span></td>
                  <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700 }}>{spgPowerMW.toFixed(1)} MW</td>
                  <td style={pocStyles.td}>
                    <span style={{ ...pocStyles.badge, ...pocStyles.badgeGreen }}>{spg.status}</span>
                  </td>
                  <td style={{ ...pocStyles.td, textAlign: 'right' }}>
                    <button style={{ border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>View Details</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: '#fafbfc', border: '1px solid #ebecf0', borderRadius: '8px', padding: '16px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#42526e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={14} /> Market Participation
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {managedSPGs.length > 0 && [...new Set(managedSPGs.flatMap(s => s.qualifications))].map((q: any) => (
                <span key={q} style={{...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', border: '1px solid #b3d4ff'}}>
                    <Zap size={10} style={{marginRight: 4, display: 'inline'}} /> {q}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};
