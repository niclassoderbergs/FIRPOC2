
import { Bid } from '../types';
import React, { useMemo } from 'react';
import { pocStyles } from '../styles';
import { 
  ChevronRight, 
  ChevronLeft,
  Zap, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  Clock, 
  Activity, 
  HelpCircle,
  BarChart3,
  Gavel,
  Briefcase,
  AlertCircle,
  Link2,
  Box,
  AlertTriangle
} from 'lucide-react';
import { mockBids, mockCUs, baselineMethods, POC_NOW } from '../mockData';
import { isMissingMeterValues } from './FirVerificationList';

interface Props {
  bidId: string;
  onBack: () => void;
  onSelectCU: (id: string) => void;
  onSelectSPG: (id: string) => void;
  onSelectBid: (id: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const styles = {
  stickyHeader: {
    position: 'sticky' as const,
    top: '56px', // Exactly below the topBar (56px)
    zIndex: 90,
    backgroundColor: '#f4f5f7',
    padding: '12px 0',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #dfe1e6'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '8px 12px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '4px',
    color: '#42526e',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'all 0.1s',
    gap: '6px'
  },
  metadataGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '16px'
  },
  settlementStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '32px'
  },
  metaItem: {
    padding: '16px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  statBrick: {
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    borderTop: '4px solid #0052cc'
  },
  statBrickGreen: {
    borderTopColor: '#36b37e'
  },
  statBrickRed: {
    borderTopColor: '#bf2600'
  },
  metaLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#6b778c',
    textTransform: 'uppercase' as const
  },
  metaValue: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#172b4d'
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#172b4d'
  },
  cuCapacity: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#172b4d'
  },
  actorMiniLabel: {
    fontSize: '0.7rem',
    color: '#42526e',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }
};

const getNormalDistributedFactor = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    let sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += Math.sin(hash * i * 9876.5432);
    }
    const avg = sum / 10; 
    return 1.0 + (avg * 0.4);
};

export const FirVerificationDetail: React.FC<Props> = ({ bidId, onBack, onSelectCU, onSelectSPG, onSelectBid, onPrev, onNext }) => {
  const bid = useMemo(() => mockBids.find(b => b.id === bidId), [bidId]);
  
  const sortedBids = useMemo(() => {
    return [...mockBids].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, []);

  const bidIndex = useMemo(() => sortedBids.findIndex(b => b.id === bidId), [sortedBids, bidId]);
  const hasPrev = bidIndex > 0;
  const hasNext = bidIndex < sortedBids.length - 1;

  const hasMissingValues = useMemo(() => bid ? isMissingMeterValues(bid.id) : false, [bid]);

  const isVerified = useMemo(() => {
    if (!bid || hasMissingValues) return false;
    const diffHours = (POC_NOW.getTime() - new Date(bid.timestamp).getTime()) / 3600000;
    return diffHours >= 6;
  }, [bid, hasMissingValues]);

  const constituentCUs = useMemo(() => {
    if (!bid) return [];
    return mockCUs.filter(cu => cu.spgId === bid.spgId);
  }, [bid]);

  const deliveryData = useMemo(() => {
    if (!bid || constituentCUs.length === 0) return [];
    
    const bidTimestamp = new Date(bid.timestamp).getTime();

    const data = constituentCUs.map((cu, idx) => {
        const cuFactor = getNormalDistributedFactor(bid.id + cu.id);
        const baselineConfig = cu.productBaselines.find(pb => pb.productId === bid.productId);
        const method = baselineMethods.find(bm => bm.id === (baselineConfig?.methodId || 'BM-001'));
        
        const historyRecord = cu.relationshipHistory?.find(record => {
            const start = new Date(record.startDate).getTime();
            const end = record.endDate === 'Present' ? POC_NOW.getTime() : new Date(record.endDate).getTime();
            return bidTimestamp >= start && bidTimestamp <= end;
        });

        const share = 1 / constituentCUs.length;
        const verifiedPower = bid.volumeMW * share * cuFactor;
        const verifiedEnergy = verifiedPower * 0.25;

        let meterValueStatus = 'Available';
        if (hasMissingValues) {
            const cuSeed = parseInt(cu.id.split('-').pop() || '0', 10);
            if ((cuSeed + idx) % 2 === 0) meterValueStatus = 'Missing';
        } else if (!isVerified) {
            if (idx % 4 === 0) meterValueStatus = 'Awaiting';
        }

        const isCuSource = (parseInt(cu.id.split('-').pop() || '0')) % 2 === 0;

        return {
            cu,
            method,
            factor: cuFactor,
            isCuSource,
            meterValueStatus,
            verifiedPower,
            verifiedEnergy,
            affectedBRP: historyRecord?.brp || cu.brp,
            affectedRE: historyRecord?.re || cu.re
        };
    });

    return data.sort((a, b) => {
        const priority: Record<string, number> = { 'Missing': 0, 'Awaiting': 1, 'Available': 2 };
        return priority[a.meterValueStatus] - priority[b.meterValueStatus];
    });
  }, [bid, constituentCUs, isVerified, hasMissingValues]);

  const totals = useMemo(() => {
    if (hasMissingValues || deliveryData.length === 0) return { power: 0, energy: 0, pct: 0 };
    
    const power = deliveryData.reduce((sum, d) => d.meterValueStatus === 'Available' ? sum + d.verifiedPower : sum, 0);
    const energy = deliveryData.reduce((sum, d) => d.meterValueStatus === 'Available' ? sum + d.verifiedEnergy : sum, 0);
    const pct = bid ? (power / bid.volumeMW) * 100 : 0;
    return { power, energy, pct };
  }, [deliveryData, bid, hasMissingValues]);

  if (!bid) return <div style={pocStyles.content}>Bid not found.</div>;

  return (
    <div style={pocStyles.content}>
      {/* STICKY HEADER NAVIGATION */}
      <div style={styles.stickyHeader}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#5e6c84', cursor: 'pointer'}}>
            <button onClick={onBack} style={{background:'none', border:'none', color:'inherit', cursor:'pointer', padding:0}}>Home</button>
            <ChevronRight size={14} />
            <span>Settlement</span>
            <ChevronRight size={14} />
            <button onClick={onBack} style={{background:'none', border:'none', color:'inherit', cursor:'pointer', padding:0, textDecoration:'underline'}}>Verification</button>
            <ChevronRight size={14} />
            <span style={{color: '#172b4d', fontWeight: 500}}>{bidId}</span>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <button 
              onClick={onPrev}
              disabled={!hasPrev}
              style={{...styles.navButton, opacity: hasPrev ? 1 : 0.3, cursor: hasPrev ? 'pointer' : 'not-allowed'}}
              title="Previous Bid"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button 
              onClick={onNext}
              disabled={!hasNext}
              style={{...styles.navButton, opacity: hasNext ? 1 : 0.3, cursor: hasNext ? 'pointer' : 'not-allowed'}}
              title="Next Bid"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px'}}>
        <div>
          <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Verification Details: {bidId}</h1>
          <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            {hasMissingValues ? (
                <span style={{
                    ...pocStyles.badge, 
                    backgroundColor: '#ffebe6', 
                    color: '#bf2600',
                    padding: '4px 12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: '1px solid #ff5630'
                }}>
                    <AlertCircle size={14} />
                    MISSING METER VALUES
                </span>
            ) : (
                <span style={{
                    ...pocStyles.badge, 
                    backgroundColor: isVerified ? '#e3fcef' : '#fff0b3', 
                    color: isVerified ? '#006644' : '#856404',
                    padding: '4px 12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: `1px solid ${isVerified ? '#36b37e' : '#ffab00'}30`
                }}>
                    {isVerified ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {isVerified ? 'VERIFIED (FINAL)' : 'PRELIMINARY ASSESSMENT'}
                </span>
            )}
          </div>
        </div>
        <button 
          style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}
          onClick={onBack}
        >
          <ArrowLeft size={16} /> Back to List
        </button>
      </div>

      <div style={styles.metadataGrid}>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Service Provider</span>
          <span style={styles.metaValue}>{bid.bsp}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Portfolio / Group</span>
          <div 
            style={{...styles.metaValue, color: '#0052cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'}}
            onClick={() => onSelectSPG(bid.spgId)}
          >
            <Link2 size={16} /> {bid.spgId}
          </div>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Market Product</span>
          <span style={{...styles.metaValue, color: '#6554c0'}}>
            <Zap size={14} style={{display:'inline', marginRight:'4px', marginBottom:'2px'}} />
            {bid.productId}
          </span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Trading Period (MTU)</span>
          <span style={styles.metaValue}>
            {new Date(bid.timestamp).toLocaleDateString()} {bid.period}
          </span>
        </div>
      </div>

      <div style={styles.settlementStatsGrid}>
        <div style={styles.statBrick}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={styles.metaLabel}>Bid Volume (MW)</span>
                <Gavel size={16} color="#0052cc" />
            </div>
            <div style={styles.statValue}>{bid.volumeMW.toFixed(1)} MW</div>
            <div style={{fontSize: '0.75rem', color: '#6b778c'}}>Original market commitment</div>
        </div>
        
        <div style={{...styles.statBrick, ...(hasMissingValues ? styles.statBrickRed : styles.statBrickGreen)}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={styles.metaLabel}>Verified Volume (MW)</span>
                <Activity size={16} color={hasMissingValues ? "#bf2600" : "#36b37e"} />
            </div>
            <div style={{...styles.statValue, color: hasMissingValues ? '#bf2600' : '#006644'}}>
                {hasMissingValues ? '-' : `${totals.power.toFixed(2)} MW`}
            </div>
            <div style={{fontSize: '0.75rem', color: '#6b778c'}}>
                {hasMissingValues ? 'Incomplete data for calculation' : 'Aggregated power result'}
            </div>
        </div>

        <div style={{...styles.statBrick, ...(hasMissingValues ? styles.statBrickRed : { borderTopColor: '#0052cc' })}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={styles.metaLabel}>Verified Energy (MWh)</span>
                <BarChart3 size={16} color={hasMissingValues ? "#bf2600" : "#0052cc"} />
            </div>
            <div style={{...styles.statValue, color: hasMissingValues ? '#bf2600' : '#0052cc'}}>
                {hasMissingValues ? '-' : `${totals.energy.toFixed(3)} MWh`}
            </div>
            <div style={{fontSize: '0.75rem', color: '#6b778c'}}>
                {hasMissingValues ? 'Basis not established' : 'Settlement basis for RE/BRP'}
            </div>
        </div>
      </div>

      <div style={pocStyles.section}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
            <h3 style={{...pocStyles.sectionTitle, borderBottom: 'none', marginBottom: 0}}>Constituent Resources (Controllable Units)</h3>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                {hasMissingValues && (
                    <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'0.85rem', color:'#bf2600', backgroundColor: '#ffebe6', padding: '4px 12px', borderRadius: '4px', fontWeight: 600}}>
                        <AlertTriangle size={14} />
                        <span>Critical: Missing meter values from key resources</span>
                    </div>
                )}
                <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'0.75rem', color:'#6b778c'}}>
                    <HelpCircle size={12} />
                    <span>Quantification: (Baseline - Meter) per individual unit</span>
                </div>
            </div>
        </div>
        <table style={pocStyles.table}>
          <thead style={{backgroundColor: '#fafbfc'}}>
            <tr>
              <th style={{...pocStyles.th, width: '20%'}}>CU ID / Name</th>
              <th style={pocStyles.th}>Affected actors</th>
              <th style={pocStyles.th}>Meter Source</th>
              <th style={pocStyles.th}>Baseline Method</th>
              <th style={pocStyles.th}>Meter Value Status</th>
              <th style={{...pocStyles.th, textAlign: 'right'}}>Verified MW</th>
              <th style={{...pocStyles.th, textAlign: 'right'}}>Verified MWh</th>
              <th style={{...pocStyles.th, textAlign: 'right'}}>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {deliveryData.length > 0 ? deliveryData.map((item, idx) => {
              const { cu, method, affectedBRP, affectedRE, verifiedPower, verifiedEnergy, factor, meterValueStatus, isCuSource } = item;
              
              const isDataAvailable = meterValueStatus === 'Available';
              const accuracyPct = isDataAvailable ? Math.round(factor * 100) : 0;

              let accuracyColor = isDataAvailable ? '#36b37e' : '#6b778c'; 
              if (isDataAvailable) {
                if (accuracyPct < 98) accuracyColor = '#ffab00';
                if (accuracyPct < 90) accuracyColor = '#bf2600';
                if (accuracyPct > 102) accuracyColor = '#403294';
              }

              return (
                <tr key={cu.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                  <td 
                    style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}
                    onClick={() => onSelectCU(cu.id)}
                  >
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                      <Box size={14} color="#6b778c" />
                      <div>
                        <div>{cu.id}</div>
                        <div style={{fontSize: '0.75rem', color: '#6b778c', fontWeight: 400}}>{cu.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={pocStyles.td}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                        <div style={styles.actorMiniLabel}>
                            <Briefcase size={10} color="#1b5e20" />
                            <span style={{fontWeight: 600}}>BRP:</span> {affectedBRP}
                        </div>
                        <div style={styles.actorMiniLabel}>
                            <Zap size={10} color="#e65100" />
                            <span style={{fontWeight: 600}}>RE:</span> {affectedRE}
                        </div>
                    </div>
                  </td>
                  <td style={pocStyles.td}>
                    <span style={{
                        ...pocStyles.badge,
                        backgroundColor: isCuSource ? '#e6effc' : '#fff7e6',
                        color: isCuSource ? '#0052cc' : '#d46b08',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        border: `1px solid ${isCuSource ? '#0052cc' : '#d46b08'}30`
                    }}>
                        {isCuSource ? 'CU' : 'MP'}
                    </span>
                  </td>
                  <td style={pocStyles.td}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize: '0.85rem', fontWeight: 500}}>{method?.name || 'Standard Baseline'}</span>
                      <span style={{fontSize: '0.7rem', color: '#6b778c'}}>{method?.id || 'BM-001'}</span>
                    </div>
                  </td>
                  <td style={pocStyles.td}>
                    <span style={{
                      ...pocStyles.badge,
                      backgroundColor: isDataAvailable ? '#e3fcef' : (meterValueStatus === 'Missing' ? '#ffebe6' : '#fff0b3'),
                      color: isDataAvailable ? '#006644' : (meterValueStatus === 'Missing' ? '#bf2600' : '#856404'),
                      fontSize: '0.65rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                        {isDataAvailable ? <CheckCircle2 size={10} /> : (meterValueStatus === 'Missing' ? <AlertCircle size={10} /> : <Clock size={10} />)}
                        {meterValueStatus.toUpperCase()}
                    </span>
                  </td>
                  <td style={{...pocStyles.td, textAlign: 'right'}}>
                    <span style={styles.cuCapacity}>{isDataAvailable ? `${verifiedPower.toFixed(3)}` : '-'}</span>
                  </td>
                  <td style={{...pocStyles.td, textAlign: 'right'}}>
                    <span style={{...styles.cuCapacity, color: '#0052cc'}}>{isDataAvailable ? `${verifiedEnergy.toFixed(3)}` : '-'}</span>
                  </td>
                  <td style={{...pocStyles.td, textAlign: 'right'}}>
                    <span style={{
                        fontSize: '0.8rem', 
                        fontWeight: 800, 
                        color: accuracyColor
                    }}>
                        {isDataAvailable ? `${accuracyPct}%` : '-'}
                    </span>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={8} style={{...pocStyles.td, textAlign: 'center', padding: '40px', color: '#6b778c', fontStyle: 'italic'}}>
                  No units identified for this verification period.
                </td>
              </tr>
            )}
          </tbody>
          {deliveryData.length > 0 && !hasMissingValues && (
            <tfoot style={{backgroundColor: '#f4f5f7', borderTop: '2px solid #dfe1e6'}}>
              <tr>
                <td colSpan={5} style={{...pocStyles.td, fontWeight: 700, textAlign: 'right'}}>AGGREGATED TOTAL:</td>
                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#172b4d'}}>
                  {totals.power > 0 ? totals.power.toFixed(3) : '-'} {totals.power > 0 && 'MW'}
                </td>
                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#0052cc'}}>
                  {totals.energy > 0 ? totals.energy.toFixed(3) : '-'} {totals.energy > 0 && 'MWh'}
                </td>
                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 800, color: totals.pct >= 98 && totals.pct <= 102 ? '#006644' : '#974f0c'}}>
                  {Math.round(totals.pct)}%
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
