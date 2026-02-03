
import React, { useMemo } from 'react';
import { 
  ChevronRight, 
  Activity, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  Info,
  Clock,
  ArrowLeft,
  ArrowRight,
  Settings,
  Trophy,
  Users,
  Link2,
  MapPin,
  FileBarChart,
  FileSearch,
  ExternalLink,
  Briefcase,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';
import { pocStyles } from '../styles';
import { svkProducts, mockCUs, mockSPGs, mockBids, POC_NOW } from '../mockData';

interface Props {
  productId: string;
  prevProduct: any | null;
  nextProduct: any | null;
  onSelectProduct: (id: string) => void;
  onBack: () => void;
  onNavigateToGroup?: (id: string) => void;
  onSelectParty?: (name: string) => void;
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
    alignItems: 'center', gap: '6px',
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
  reqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  reqCard: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #ebecf0',
    backgroundColor: '#fafbfc'
  },
  reqLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#6b778c',
    textTransform: 'uppercase' as const,
    marginBottom: '4px',
    display: 'block'
  },
  reqValue: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#172b4d'
  },
  reqDesc: {
    fontSize: '0.8rem',
    color: '#5e6c84',
    marginTop: '4px',
    lineHeight: '1.4'
  },
  statRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #ebecf0'
  },
  statLabel: {
    width: '80px',
    fontWeight: 700,
    color: '#172b4d'
  },
  volumeBarContainer: {
    flex: 1,
    height: '24px',
    backgroundColor: '#f4f5f7',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative' as const,
    margin: '0 16px'
  },
  volumeBarFill: {
    height: '100%',
    backgroundColor: '#0052cc',
    transition: 'width 1s ease-out'
  },
  statValue: {
    width: '100px',
    textAlign: 'right' as const,
    fontWeight: 600,
    fontSize: '0.9rem'
  },
  leaderboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '24px',
    marginTop: '16px'
  },
  leaderboardCard: {
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  leaderboardHeader: {
    padding: '12px 16px',
    backgroundColor: '#f4f5f7',
    borderBottom: '1px solid #dfe1e6',
    fontWeight: 700,
    color: '#172b4d',
    display: 'flex',
    alignItems: 'center gap: 8px'
  },
  rankIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 700
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const
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

export const FirProductDetail: React.FC<Props> = ({ productId, prevProduct, nextProduct, onSelectProduct, onBack, onNavigateToGroup, onSelectParty, onSelectBid }) => {
  const product = svkProducts.find(p => p.id === productId);

  // Settlement Data Logic - now includes preliminary bids (no 6h filter here)
  const settlementHistory = useMemo(() => {
    return mockBids.filter(bid => {
        return bid.productId === productId && 
               bid.selectionStatus === 'Selected' && 
               bid.status === 'Valid' && 
               bid.activationStatus === 'Activated';
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [productId]);

  const settlementTotals = useMemo(() => {
    return settlementHistory.reduce((acc, curr) => {
        const factor = getSeededDeliveryFactor(curr.id);
        const verifiedMW = curr.volumeMW * factor;
        const verifiedMWh = verifiedMW * 0.25;
        return {
            bidMW: acc.bidMW + curr.volumeMW,
            verMW: acc.verMW + verifiedMW,
            verMWh: acc.verMWh + verifiedMWh
        };
    }, { bidMW: 0, verMW: 0, verMWh: 0 });
  }, [settlementHistory]);

  if (!product) return <div>Product not found</div>;

  const zones = ['SE1', 'SE2', 'SE3', 'SE4'];
  
  const zoneAnalysis = zones.map(zone => {
    const spgsInZone = mockSPGs.filter(spg => spg.zone === zone && spg.qualifications.includes(productId));
    const spgIds = spgsInZone.map(s => s.id);
    
    const leaderboard = spgsInZone.map(spg => {
        const cusInSpg = mockCUs.filter(cu => cu.spgId === spg.id);
        const volumeInMW = cusInSpg.reduce((sum, cu) => {
            const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
            return sum + val;
        }, 0);
        return {
            id: spg.id,
            name: spg.name,
            sp: spg.fsp,
            volume: volumeInMW,
            cuCount: cusInSpg.length
        };
    }).sort((a, b) => b.volume - a.volume).slice(0, 3);

    const cusInAllSpgsInZone = mockCUs.filter(cu => cu.spgId && spgIds.includes(cu.spgId));
    const totalVolumeMW = cusInAllSpgsInZone.reduce((sum, cu) => {
        const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
        return sum + val;
    }, 0);

    return {
        zone,
        spgCount: spgsInZone.length,
        cuCount: cusInAllSpgsInZone.length,
        volume: totalVolumeMW,
        leaderboard
    };
  });

  const maxVolume = Math.max(...zoneAnalysis.map(s => s.volume), 1);

  return (
    <div style={pocStyles.content}>
      {/* STICKY HEADER NAVIGATION */}
      <div style={styles.stickyHeader}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#5e6c84', cursor: 'pointer'}}>
            <span onClick={onBack}>Home</span>
            <ChevronRight size={14} />
            <span onClick={onBack} style={{textDecoration:'underline'}}>Product Types</span>
            <ChevronRight size={14} />
            <span style={{color: '#172b4d', fontWeight: 500}}>{productId}</span>
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
                <button 
                    style={{...styles.navButton, opacity: prevProduct ? 1 : 0.4, cursor: prevProduct ? 'pointer' : 'not-allowed'}}
                    disabled={!prevProduct}
                    onClick={() => prevProduct && onSelectProduct(prevProduct.id)}
                >
                    <ArrowLeft size={16} /> Prev
                </button>
                <button 
                    style={{...styles.navButton, opacity: nextProduct ? 1 : 0.4, cursor: nextProduct ? 'pointer' : 'not-allowed'}}
                    disabled={!nextProduct}
                    onClick={() => nextProduct && onSelectProduct(nextProduct.id)}
                >
                    Next <ArrowRight size={16} />
                </button>
          </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px'}}>
        <div>
          <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>{product.name}</h1>
          <div style={{display: 'flex', gap: '8px'}}>
            <span style={{
                ...pocStyles.badge,
                backgroundColor: product.category === 'Frequency' ? '#f3e5f5' : (product.category === 'Energy' ? '#e8f5e9' : '#fff3e0'),
                color: product.category === 'Frequency' ? '#4a148c' : (product.category === 'Energy' ? '#1b5e20' : '#e65100'),
            }}>
                {product.category} Reserve
            </span>
            <span style={{...pocStyles.badge, ...pocStyles.badgeBlue}}>
                {product.activation} Activation
            </span>
          </div>
        </div>
        <div style={{display: 'flex', gap: '12px'}}>
            <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Settings size={16} /> Manage Product
            </button>
        </div>
      </div>

      <div style={pocStyles.section}>
        <h3 style={pocStyles.sectionTitle}><Info size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Product Description</h3>
        <p style={{lineHeight: '1.6', color: '#172b4d'}}>{product.description}</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px'}}>
          <div style={{...pocStyles.section, marginBottom: 0}}>
            <h3 style={pocStyles.sectionTitle}><BarChart3 size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Aggregated Volume (MW)</h3>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {zoneAnalysis.map(s => (
                    <div key={s.zone} style={styles.statRow}>
                        <div style={styles.statLabel}>{s.zone}</div>
                        <div style={styles.volumeBarContainer}>
                            <div style={{...styles.volumeBarFill, width: `${(s.volume / maxVolume) * 100}%`}} />
                        </div>
                        <div style={styles.statValue}>{s.volume.toFixed(1)} MW</div>
                    </div>
                ))}
            </div>
          </div>

          <div style={{...pocStyles.section, marginBottom: 0}}>
            <h3 style={pocStyles.sectionTitle}><Activity size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Participation Statistics</h3>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={pocStyles.th}>Zone</th>
                        <th style={pocStyles.th}>Qualified SPGs</th>
                        <th style={pocStyles.th}>Qualified CUs</th>
                    </tr>
                </thead>
                <tbody>
                    {zoneAnalysis.map((s, idx) => (
                        <tr key={s.zone} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                            <td style={{...pocStyles.td, fontWeight: 700}}>{s.zone}</td>
                            <td style={pocStyles.td}>{s.spgCount}</td>
                            <td style={pocStyles.td}>{s.cuCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>

      <div style={pocStyles.section}>
        <h3 style={pocStyles.sectionTitle}><Trophy size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Top Portfolios per Bidding Zone</h3>
        <p style={{fontSize: '0.85rem', color: '#6b778c', marginBottom: '20px'}}>
            The three largest Service Providing Groups (SPG) by aggregated volume. 
            Click on <strong>ID Name</strong> to view technical details or the <strong>Actor</strong> for their market profile.
        </p>
        
        <div style={styles.leaderboardGrid}>
            {zoneAnalysis.map(zone => (
                <div key={zone.zone} style={styles.leaderboardCard}>
                    <div style={styles.leaderboardHeader}>
                        <MapPin size={14} /> {zone.zone}
                    </div>
                    <table style={pocStyles.table}>
                        <thead style={{backgroundColor: '#fafbfc'}}>
                            <tr>
                                <th style={{...pocStyles.th, width: '40px'}}>#</th>
                                <th style={pocStyles.th}>SPG / Portfolio (ID Name)</th>
                                <th style={pocStyles.th}>SP / BSP (Actor)</th>
                                <th style={{...pocStyles.th, textAlign: 'right'}}>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zone.leaderboard.length > 0 ? zone.leaderboard.map((entry, idx) => (
                                <tr key={entry.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                    <td style={pocStyles.td}>
                                        <div style={{
                                            ...styles.rankIcon,
                                            backgroundColor: idx === 0 ? '#fffae6' : (idx === 1 ? '#f4f5f7' : '#fff0e6'),
                                            color: idx === 0 ? '#ff8b00' : (idx === 1 ? '#42526e' : '#8c4d00'),
                                            border: `1px solid ${idx === 0 ? '#ffebac' : (idx === 1 ? '#dfe1e6' : '#ffd5b3')}`
                                        }}>
                                            {idx + 1}
                                        </div>
                                    </td>
                                    <td 
                                        style={{...pocStyles.td, cursor: 'pointer'}} 
                                        onClick={() => onNavigateToGroup?.(entry.id)}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6effc'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#0052cc'}}>
                                            <Link2 size={14} style={{flexShrink: 0}} />
                                            <div style={{display: 'flex', gap: '6px', overflow: 'hidden'}}>
                                                <span style={{fontWeight: 700, flexShrink: 0}}>{entry.id}</span>
                                                <span style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', textDecoration: 'underline'}}>{entry.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td 
                                        style={{...pocStyles.td, cursor: 'pointer'}}
                                        onClick={() => onSelectParty?.(entry.sp)}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6effc'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#0052cc', fontSize: '0.85rem'}}>
                                            <Users size={12} /> 
                                            <span style={{textDecoration: 'underline'}}>{entry.sp.length > 20 ? entry.sp.substring(0, 18) + '...' : entry.sp}</span>
                                        </div>
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700}}>
                                        {entry.volume.toFixed(1)} MW
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} style={{...pocStyles.td, textAlign: 'center', color: '#6b778c', fontStyle: 'italic', padding: '16px'}}>
                                        No qualified SPGs in this zone.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
      </div>

      {/* 5. SETTLEMENT HISTORY SECTION */}
      <div style={pocStyles.section}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{...pocStyles.sectionTitle, borderBottom: 'none', marginBottom: 0}}>
                <FileBarChart size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Settlement History (Ex-post)
            </h3>
            <span style={{fontSize: '0.85rem', color: '#6b778c'}}>Verified results for <strong>{productId}</strong></span>
        </div>
        
        <div style={{backgroundColor: '#fafbfc', border: '1px solid #ebecf0', borderRadius: '8px', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '24px'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                <span style={{fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase'}}>Total Capacity Delivered</span>
                <span style={{fontSize: '1.25rem', fontWeight: 800, color: '#172b4d'}}>{settlementTotals.verMW.toFixed(2)} MW</span>
            </div>
            <div style={{width:'1px', height:'30px', backgroundColor:'#dfe1e6'}} />
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                <span style={{fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase'}}>Total Verified Energy</span>
                <span style={{fontSize: '1.25rem', fontWeight: 800, color: '#0052cc'}}>{settlementTotals.verMWh.toFixed(3)} MWh</span>
            </div>
            <div style={{width:'1px', height:'30px', backgroundColor:'#dfe1e6'}} />
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                <span style={{fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase'}}>Total Activations</span>
                <span style={{fontSize: '1.25rem', fontWeight: 800, color: '#172b4d'}}>{settlementHistory.length} Events</span>
            </div>
        </div>

        <table style={pocStyles.table}>
            <thead style={{backgroundColor: '#fafbfc'}}>
                <tr>
                    <th style={pocStyles.th}>Bid ID</th>
                    <th style={pocStyles.th}>BSP (Actor)</th>
                    <th style={pocStyles.th}>Bid Zone</th>
                    <th style={pocStyles.th}>Period</th>
                    <th style={pocStyles.th}>Status</th>
                    <th style={{...pocStyles.th, textAlign: 'right'}}>Bid MW</th>
                    <th style={{...pocStyles.th, textAlign: 'right'}}>Verified MW</th>
                    <th style={{...pocStyles.th, textAlign: 'right'}}>Energy MWh</th>
                    <th style={{...pocStyles.th, textAlign: 'right'}}>Accuracy</th>
                    <th style={pocStyles.th}></th>
                </tr>
            </thead>
            <tbody>
                {settlementHistory.slice(0, 15).map((bid, idx) => {
                    const factor = getSeededDeliveryFactor(bid.id);
                    const accuracy = Math.round(factor * 100);
                    const verMW = bid.volumeMW * factor;
                    const verMWh = verMW * 0.25;
                    
                    const bidTime = new Date(bid.timestamp);
                    const diffHours = (POC_NOW.getTime() - bidTime.getTime()) / (1000 * 60 * 60);
                    const isVerified = diffHours >= 6;

                    let accuracyColor = '#36b37e'; 
                    if (accuracy < 98) accuracyColor = '#ffab00';
                    if (accuracy < 90) accuracyColor = '#bf2600';
                    if (accuracy > 102) accuracyColor = '#403294';

                    return (
                        <tr key={bid.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                            <td 
                                style={{...pocStyles.td, fontWeight: 600, color: '#0052cc', textDecoration: 'underline'}}
                                onClick={() => onSelectBid?.(bid.id)}
                            >
                                {bid.id}
                            </td>
                            <td style={pocStyles.td}>
                                <div 
                                    style={{display:'flex', alignItems:'center', gap:'6px', cursor: 'pointer', color: '#0052cc'}}
                                    onClick={() => onSelectParty?.(bid.bsp)}
                                >
                                    <Briefcase size={12} />
                                    <span style={{textDecoration: 'underline'}}>{bid.bsp.length > 20 ? bid.bsp.substring(0, 18) + '...' : bid.bsp}</span>
                                </div>
                            </td>
                            <td style={pocStyles.td}>{bid.zone}</td>
                            <td style={pocStyles.td}>
                                <div style={{fontSize: '0.8rem'}}>
                                    {bidTime.toLocaleDateString()} {bid.period}
                                </div>
                            </td>
                            <td style={pocStyles.td}>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: isVerified ? '#e3fcef' : '#fff0b3',
                                    color: isVerified ? '#006644' : '#974f0c',
                                    border: `1px solid ${isVerified ? '#36b37e' : '#ffab00'}30`
                                }}>
                                    {isVerified ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                    {isVerified ? 'Verified' : 'Preliminary'}
                                </span>
                            </td>
                            <td style={{...pocStyles.td, textAlign: 'right', color: '#6b778c'}}>{bid.volumeMW.toFixed(1)}</td>
                            <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 600}}>{verMW.toFixed(2)}</td>
                            <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#0052cc'}}>{verMWh.toFixed(3)}</td>
                            <td style={{...pocStyles.td, textAlign: 'right'}}>
                                <span style={{fontWeight: 800, color: accuracyColor}}>{accuracy}%</span>
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
                {settlementHistory.length === 0 && (
                    <tr>
                        <td colSpan={10} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                            No verified settlement records found for this product.
                        </td>
                    </tr>
                )}
            </tbody>
            {settlementHistory.length > 0 && (
                <tfoot style={{ backgroundColor: '#f4f5f7', borderTop: '2px solid #ebecf0' }}>
                    <tr>
                        <td colSpan={5} style={{ ...pocStyles.td, fontWeight: 700, textAlign: 'right' }}>AGGREGATED SETTLEMENT:</td>
                        <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#6b778c' }}>{settlementTotals.bidMW.toFixed(1)} MW</td>
                        <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#172b4d' }}>{settlementTotals.verMW.toFixed(2)} MW</td>
                        <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#0052cc' }}>{settlementTotals.verMWh.toFixed(3)} MWh</td>
                        <td colSpan={2} style={pocStyles.td}></td>
                    </tr>
                </tfoot>
            )}
        </table>
      </div>
      
      <div style={{marginTop: '24px', display: 'flex', gap: '16px'}}>
          <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc'}} onClick={onBack}>
              <ArrowLeft size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> BACK TO LIST
          </button>
      </div>
    </div>
  );
};
