import React, { useMemo } from 'react';
import { 
  ChevronRight, 
  Settings, 
  Users, 
  Box, 
  Zap, 
  Clock, 
  Gavel, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  TrendingUp, 
  FileSearch, 
  ArrowLeft, 
  ArrowRight, 
  Link2, 
  MapPin, 
  FileBarChart, 
  ChevronLeft,
  // Added missing Globe and TowerControl imports
  Globe,
  TowerControl
} from 'lucide-react';
import { pocStyles } from '../styles';
import { mockSPGs, mockCUs, mockSPGProductApplications, mockBids, POC_NOW } from '../mockData';
import { SPG } from '../types';

interface Props {
  id: string;
  prevSpg: SPG | null;
  nextSpg: SPG | null;
  onSelectSPG: (id: string) => void;
  onBack: () => void;
  onSelectCU: (id: string) => void;
  onSelectBid?: (id: string) => void;
}

const styles = {
  stickyHeader: {
    position: 'sticky' as const,
    top: '56px',
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
    alignItems: 'center gap: 6px',
    padding: '6px 12px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '4px',
    color: '#42526e',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.1s'
  },
  headerBadge: {
    backgroundColor: '#deebff',
    color: '#0052cc',
    padding: '4px 12px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.85rem'
  },
  statBox: {
    backgroundColor: '#fafbfc',
    border: '1px solid #dfe1e6',
    borderRadius: '6px',
    padding: '16px',
    flex: 1
  },
  statLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#6b778c',
    textTransform: 'uppercase' as const,
    marginBottom: '8px'
  },
  statValue: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#172b4d'
  },
  clickableId: {
    display: 'flex',
    alignItems: 'center', gap: '8px',
    cursor: 'pointer',
    width: 'fit-content'
  },
  qualificationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
    marginBottom: '24px'
  },
  qualCard: {
    display: 'flex',
    alignItems: 'center', gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e3fcef',
    backgroundColor: '#f4fbf8'
  },
  subSectionTitle: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#42526e',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '12px',
    display: 'block'
  }
};

// Seeded accuracy calculation helper
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

export const FirSPGDetail: React.FC<Props> = ({ id, prevSpg, nextSpg, onSelectSPG, onBack, onSelectCU, onSelectBid }) => {
  const spg = mockSPGs.find(s => s.id === id);
  
  // FIX: Look at both spgId and localSpgId to find members
  const unitsInGroup = useMemo(() => 
    mockCUs.filter(cu => cu.spgId === id || cu.localSpgId === id)
  , [id]);

  const totalCapacity = useMemo(() => unitsInGroup.reduce((acc, curr) => {
      /* Fix: Change cu.capacity to curr.capacity as cu is not in scope */
      const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
      return acc + val;
  }, 0).toFixed(1), [unitsInGroup]);

  // Filter Bids for this SPG
  const relatedBids = useMemo(() => {
    return mockBids
      .filter(b => b.spgId === id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [id]);

  // Filter Verification Results (Activated Bids)
  const verifiedActivations = useMemo(() => {
    return relatedBids.filter(b => {
        // Corrected reference from 'bid' to 'b' which is the iteration variable
        const bidTime = new Date(b.timestamp);
        const diffHours = (POC_NOW.getTime() - bidTime.getTime()) / (1000 * 60 * 60);
        return b.selectionStatus === 'Selected' && b.status === 'Valid' && b.activationStatus === 'Activated' && diffHours >= 6;
    });
  }, [relatedBids]);

  if (!spg) return <div>Group not found</div>;

  const spgApplications = mockSPGProductApplications.filter(app => app.spgId === id);
  const newlyApprovedProducts = spgApplications.filter(app => app.status === 'Approved').map(app => app.product);
  const activeQualifications = [...new Set([...(spg.qualifications || []), ...newlyApprovedProducts])];

  return (
    <div style={pocStyles.content}>
        {/* STICKY HEADER NAVIGATION */}
        <div style={styles.stickyHeader}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#5e6c84', cursor: 'pointer'}}>
                <span onClick={onBack}>Home</span>
                <ChevronRight size={14} />
                <span onClick={onBack} style={{textDecoration:'underline'}}>Service Providing Groups</span>
                <ChevronRight size={14} />
                <span style={{color: '#172b4d', fontWeight: 500}}>{id}</span>
            </div>
            <div style={{display: 'flex', gap: '8px'}}>
                <button 
                    style={{...styles.navButton, opacity: prevSpg ? 1 : 0.4, cursor: prevSpg ? 'pointer' : 'not-allowed'}}
                    disabled={!prevSpg}
                    onClick={() => prevSpg && onSelectSPG(prevSpg.id)}
                >
                    <ArrowLeft size={16} /> Prev
                </button>
                <button 
                    style={{...styles.navButton, opacity: nextSpg ? 1 : 0.4, cursor: nextSpg ? 'pointer' : 'not-allowed'}}
                    disabled={!nextSpg}
                    onClick={() => nextSpg && onSelectSPG(nextSpg.id)}
                >
                    Next <ArrowRight size={16} />
                </button>
            </div>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: '24px'}}>
             <div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: 0}}>{spg.name}</h1>
                    <span style={{
                        ...pocStyles.badge, 
                        backgroundColor: spg.status === 'Active' ? '#e3fcef' : '#fff0b3', 
                        color: spg.status === 'Active' ? '#006644' : '#172b4d',
                        fontSize: '0.9rem', padding: '4px 12px'
                    }}>{spg.status.toUpperCase()}</span>
                </div>
                <div style={{color: '#5e6c84', display: 'flex', gap: '16px', fontSize: '0.9rem'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Users size={16}/> {spg.fsp}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>📍 {spg.zone}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: spg.marketType === 'TSO' ? '#0052cc' : '#4a148c'}}>
                        {/* Globe and TowerControl are now imported */}
                        {spg.marketType === 'TSO' ? <Globe size={16}/> : <TowerControl size={16}/>}
                        {spg.marketType === 'TSO' ? 'TSO Portfolio' : 'Local Portfolio'}
                    </span>
                </div>
             </div>
             <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Settings size={16} /> Manage Group
             </button>
        </div>

        <div style={{display: 'flex', gap: '24px', marginBottom: '32px'}}>
            <div style={styles.statBox}>
                <div style={styles.statLabel}>Current Capacity</div>
                <div style={styles.statValue}>{totalCapacity} MW</div>
            </div>
            <div style={styles.statBox}>
                <div style={styles.statLabel}>Included Units</div>
                <div style={styles.statValue}>{unitsInGroup.length} CUs</div>
            </div>
            <div style={styles.statBox}>
                <div style={styles.statLabel}>Recent Bids</div>
                <div style={styles.statValue}>{relatedBids.length}</div>
            </div>
        </div>

        {/* 1. MARKET READINESS SECTION */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}>Market Readiness</h3>
            <div style={{marginBottom: '24px'}}>
                <span style={styles.subSectionTitle}>Active Product Qualifications</span>
                <div style={styles.qualificationGrid}>
                    {activeQualifications.length > 0 ? (
                        activeQualifications.map(p => (
                            <div key={p} style={styles.qualCard}>
                                <Zap size={20} color="#36b37e" />
                                <div>
                                    <div style={{fontSize: '0.95rem', fontWeight: 700, color: '#172b4d'}}>{p}</div>
                                    <div style={{fontSize: '0.7rem', color: '#006644', fontWeight: 600, textTransform: 'uppercase'}}>Market Ready</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{color: '#6b778c', fontStyle: 'italic', fontSize: '0.9rem'}}>No active market qualifications.</div>
                    )}
                </div>
            </div>
        </div>

        {/* 2. RECENT BIDS SECTION */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}>
                <Gavel size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Recent Market Bids
            </h3>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={pocStyles.th}>Bid ID</th>
                        <th style={pocStyles.th}>Product</th>
                        <th style={pocStyles.th}>Period</th>
                        <th style={{...pocStyles.th, textAlign: 'right'}}>Volume (MW)</th>
                        <th style={pocStyles.th}>Validation</th>
                        <th style={pocStyles.th}>Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {relatedBids.slice(0, 5).map((bid, idx) => (
                        <tr key={bid.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                            <td 
                                style={{...pocStyles.td, fontWeight: 600, color: '#0052cc', textDecoration: 'underline', cursor: 'pointer'}}
                                onClick={() => onSelectBid?.(bid.id)}
                            >
                                {bid.id}
                            </td>
                            <td style={pocStyles.td}>
                                <span style={{...pocStyles.badge, ...pocStyles.badgeBlue}}>{bid.productId}</span>
                            </td>
                            <td style={pocStyles.td}>
                                <div style={{fontSize: '0.8rem'}}>
                                    {new Date(bid.timestamp).toLocaleDateString()} MTU {bid.period}
                                </div>
                            </td>
                            <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700}}>{bid.volumeMW}</td>
                            <td style={pocStyles.td}>
                                <span style={{
                                    ...pocStyles.badge,
                                    backgroundColor: bid.status === 'Valid' ? '#e3fcef' : '#ffebe6',
                                    color: bid.status === 'Valid' ? '#006644' : '#bf2600'
                                }}>
                                    {bid.status}
                                </span>
                            </td>
                            <td style={pocStyles.td}>
                                <span style={{
                                    fontWeight: 600,
                                    color: bid.selectionStatus === 'Selected' ? '#006644' : '#6b778c'
                                }}>{bid.selectionStatus}</span>
                            </td>
                        </tr>
                    ))}
                    {relatedBids.length === 0 && (
                        <tr>
                            <td colSpan={6} style={{...pocStyles.td, textAlign: 'center', color: '#6b778c', padding: '24px', fontStyle: 'italic'}}>
                                No bids found for this group.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* 3. VERIFICATION SECTION */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}>
                <CheckCircle2 size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Verification Results (Ex-post)
            </h3>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={pocStyles.th}>Activation Ref</th>
                        <th style={pocStyles.th}>Product</th>
                        <th style={pocStyles.th}>Period</th>
                        <th style={{...pocStyles.th, textAlign: 'right'}}>Verified MW</th>
                        <th style={{...pocStyles.th, textAlign: 'right'}}>Verified MWh</th>
                        <th style={{...pocStyles.th, textAlign: 'right'}}>Accuracy</th>
                        <th style={pocStyles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {verifiedActivations.slice(0, 5).map((bid, idx) => {
                        const factor = getSeededDeliveryFactor(bid.id);
                        const accuracyPct = Math.round(factor * 100);
                        const verifiedMW = bid.volumeMW * factor;
                        const verifiedMWh = verifiedMW * 0.25;

                        let resultColor = '#36b37e'; 
                        if (accuracyPct < 98) resultColor = '#ffab00';
                        if (accuracyPct < 90) resultColor = '#bf2600';
                        if (accuracyPct > 102) resultColor = '#403294';

                        return (
                            <tr key={bid.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                <td 
                                    style={{...pocStyles.td, fontWeight: 600, color: '#0052cc', textDecoration: 'underline', cursor: 'pointer'}}
                                    onClick={() => onSelectBid?.(bid.id)}
                                >
                                    {bid.id}
                                </td>
                                <td style={pocStyles.td}>
                                    <span style={{...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc'}}>{bid.productId}</span>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{fontSize: '0.8rem'}}>
                                        {new Date(bid.timestamp).toLocaleDateString()} {bid.period}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 600}}>{verifiedMW.toFixed(2)}</td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#0052cc'}}>{verifiedMWh.toFixed(3)}</td>
                                <td style={{...pocStyles.td, textAlign: 'right'}}>
                                    <span style={{fontWeight: 800, color: resultColor}}>{accuracyPct}%</span>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'right'}}>
                                    <button 
                                        style={{border:'none', background:'none', color:'#0052cc', cursor:'pointer'}}
                                        onClick={() => onSelectBid?.(bid.id)}
                                    >
                                        <FileSearch size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {verifiedActivations.length === 0 && (
                        <tr>
                            <td colSpan={7} style={{...pocStyles.td, textAlign: 'center', color: '#6b778c', padding: '24px', fontStyle: 'italic'}}>
                                No verified activations available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <div style={pocStyles.section}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <h3 style={{...pocStyles.sectionTitle, marginBottom: 0}}>Included Resources (CUs)</h3>
            </div>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={pocStyles.th}>CU ID</th>
                        <th style={pocStyles.th}>Name</th>
                        <th style={pocStyles.th}>Resource Type</th>
                        <th style={pocStyles.th}>Grid Owner</th>
                        <th style={pocStyles.th}>Max Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {unitsInGroup.map((cu, idx) => (
                        <tr 
                            key={cu.id} 
                            style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                            onClick={() => onSelectCU(cu.id)}
                        >
                            <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>
                                <div style={styles.clickableId}>
                                    <Box size={14} color="#6b778c"/>
                                    {cu.id}
                                </div>
                            </td>
                            <td style={{...pocStyles.td, fontWeight: 500}}>{cu.name}</td>
                            <td style={pocStyles.td}>{cu.type}</td>
                            <td style={pocStyles.td}>{cu.gridOwner}</td>
                            <td style={pocStyles.td}>{cu.capacity} {cu.capacityUnit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};