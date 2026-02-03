
import React, { useState, useMemo } from 'react';
import { 
  ChevronRight,
  HelpCircle,
  Clock,
  Link2,
  ShieldCheck,
  Zap,
  Info,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Activity,
  Box,
  FileText,
  Lock,
  Users,
  History,
  Database,
  Calendar,
  Hash,
  User,
  FileSearch,
  ArrowDown,
  Briefcase,
  ChevronLeft,
  UserPlus,
  Globe,
  TowerControl
} from 'lucide-react';
import { pocStyles } from '../styles';
import { CU, mockSPGs, mockGridConstraints, mockSPGProductApplications, baselineMethods, mockBids, POC_NOW, mockCUs, svkProducts } from '../mockData';

interface Props {
  cu: CU;
  prevCU: CU | null;
  nextCU: CU | null;
  onSelectCU: (id: string) => void;
  onBack: () => void;
  onNavigateToGroup: (id: string) => void;
  onSelectParty: (name: string) => void;
  onSelectBid: (id: string) => void;
}

const VERIFICATION_PAGE_SIZE = 5;

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
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px 48px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#6b778c',
    textTransform: 'uppercase' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  value: {
    fontSize: '0.95rem',
    color: '#172b4d',
    fontWeight: 400
  },
  iconSmall: {
    width: '14px',
    height: '14px',
    color: '#a5adba',
    cursor: 'help'
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: '#5e6c84',
    cursor: 'pointer'
  },
  link: {
    color: '#0052cc',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    width: 'fit-content'
  },
  partyLink: {
    color: '#0052cc',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  },
  verifiedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#e3fcef',
    color: '#006644',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontWeight: 600,
    border: '1px solid #b3dfc1'
  },
  inheritanceNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f4f5f7',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    color: '#42526e',
    marginBottom: '16px',
    border: '1px solid #dfe1e6'
  },
  constraintBox: {
    backgroundColor: '#fff1f0',
    border: '1px solid #ffa39e',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  warningBox: {
    backgroundColor: '#fff7e6',
    border: '1px solid #ffbb96',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#ebecf0',
    borderRadius: '3px',
    marginTop: '8px',
    overflow: 'hidden'
  },
  subSectionTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#42526e',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderBottom: '1px solid #ebecf0',
    paddingBottom: '8px'
  },
  historyToggle: {
    display: 'flex',
    alignItems: 'center', gap: '8px',
    background: 'none',
    border: 'none',
    color: '#0052cc',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginTop: '16px',
    padding: '8px 0'
  },
  historyItem: {
    display: 'flex',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px dashed #ebecf0'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
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
  qualCard: {
    display: 'flex', 
    flexDirection: 'column' as const,
    gap: '8px', 
    padding: '12px', 
    borderRadius: '6px', 
    border: '1px solid #e3fcef', 
    backgroundColor: '#f4fbf8',
    minHeight: '70px',
    justifyContent: 'center'
  },
  dhvMasterBox: {
    marginTop: '12px',
    padding: '16px',
    backgroundColor: '#f0f7ff',
    borderRadius: '8px',
    border: '1px solid #b3d4ff',
    boxShadow: 'inset 0 1px 2px rgba(0,82,204,0.05)'
  },
  dhvAttribute: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px'
  },
  dhvAttrLabel: {
    fontSize: '0.65rem',
    fontWeight: 700,
    color: '#0052cc',
    textTransform: 'uppercase' as const
  },
  dhvAttrValue: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#0747a6'
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  overviewItem: {
    padding: '16px',
    backgroundColor: '#fafbfc',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  overviewLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#6b778c',
    textTransform: 'uppercase' as const
  },
  overviewValue: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#172b4d',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  relationGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '32px'
  },
  relationCard: {
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #dfe1e6',
    backgroundColor: '#fff'
  },
  relationHeader: {
    fontSize: '0.85rem',
    fontWeight: 700,
    marginBottom: '16px',
    textTransform: 'uppercase' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  changedCell: {
    backgroundColor: '#fff9e6',
    color: '#d46b08',
    fontWeight: 700,
    padding: '2px 4px',
    borderRadius: '4px'
  },
  actorMiniLabel: {
    fontSize: '0.7rem',
    color: '#42526e',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '2px'
  },
  paginationContainer: {
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #ebecf0',
    backgroundColor: '#fafbfc'
  }
};

const Field: React.FC<{ label: string; value: React.ReactNode; help?: boolean }> = ({ label, value, help }) => (
  <div style={styles.field}>
    <div style={styles.label}>
      {label}
      {help && <HelpCircle style={styles.iconSmall} />}
    </div>
    <div style={styles.value}>{value}</div>
  </div>
);

// Seeded normal distribution simulation centered at 1.0 (replicated for consistency)
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

export const FirCUDetail: React.FC<Props> = ({ cu, prevCU, nextCU, onSelectCU, onBack, onNavigateToGroup, onSelectParty, onSelectBid }) => {
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [verificationPage, setVerificationPage] = useState(0);
  const currentSpg = mockSPGs.find(s => s.id === cu.spgId);
  
  // Grid Constraints Logic
  const allRelatedConstraints = mockGridConstraints.filter(gc => gc.affectedUnits.includes(cu.id));
  const activeAndPlannedConstraints = allRelatedConstraints.filter(gc => gc.status !== 'Expired');
  
  // Find all applications for this SPG
  const spgApplications = cu.spgId 
    ? mockSPGProductApplications.filter(app => app.spgId === cu.spgId)
    : [];

  const newlyApprovedProducts = spgApplications
    .filter(app => app.status === 'Approved')
    .map(app => app.product);
  
  const activeQualifications = [...new Set([...(currentSpg?.qualifications || []), ...newlyApprovedProducts])];
  
  // Separation logic for TSO vs DSO products
  const { tsoQualifications, dsoQualifications } = useMemo(() => {
    const tso: any[] = [];
    const dso: any[] = [];
    
    activeQualifications.forEach(productId => {
      const productMeta = svkProducts.find(p => p.id === productId);
      const isConfigured = cu.productBaselines.some(pb => pb.productId === productId);
      
      const item = { productId, isConfigured };
      
      if (productMeta?.market.includes('TSO')) {
        tso.push(item);
      } else {
        dso.push(item);
      }
    });

    return { tsoQualifications: tso, dsoQualifications: dso };
  }, [activeQualifications, cu.productBaselines]);

  // Calculate Historical Verifications for this CU
  const historicalVerifications = useMemo(() => {
    if (!cu.spgId) return [];
    
    // Units in the same group to calculate "share"
    const groupUnits = mockCUs.filter(c => c.spgId === cu.spgId);
    const share = 1 / (groupUnits.length || 1);

    return mockBids.filter(bid => {
        const bidTime = new Date(bid.timestamp);
        const diffHours = (POC_NOW.getTime() - bidTime.getTime()) / (1000 * 60 * 60);
        return bid.spgId === cu.spgId && 
               bid.selectionStatus === 'Selected' && 
               bid.status === 'Valid' && 
               bid.activationStatus === 'Activated' &&
               diffHours >= 6;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(bid => {
        const cuFactor = getNormalDistributedFactor(bid.id + cu.id);
        const verifiedPower = bid.volumeMW * share * cuFactor;
        const verifiedEnergy = verifiedPower * 0.25; // 15 min MTU

        // Match history for actors at the time of the bid
        const bidTimestamp = new Date(bid.timestamp).getTime();
        const historyRecord = cu.relationshipHistory?.find(record => {
            const start = new Date(record.startDate).getTime();
            const end = record.endDate === 'Present' ? POC_NOW.getTime() : new Date(record.endDate).getTime();
            return bidTimestamp >= start && bidTimestamp <= end;
        });

        return {
            bidId: bid.id,
            productId: bid.productId,
            timestamp: bid.timestamp,
            period: bid.period,
            totalBidMW: bid.volumeMW,
            cuShareMW: verifiedPower,
            cuEnergyMWh: verifiedEnergy,
            accuracyPct: Math.round(cuFactor * 100),
            // Historical Actors
            affectedSP: historyRecord?.sp || cu.sp,
            affectedRE: historyRecord?.re || cu.re,
            affectedBRP: historyRecord?.brp || cu.brp
        };
    });
  }, [cu.id, cu.spgId, cu.relationshipHistory, cu.sp, cu.re, cu.brp]);

  const totalVerificationPages = Math.ceil(historicalVerifications.length / VERIFICATION_PAGE_SIZE);
  const pagedVerifications = historicalVerifications.slice(
      verificationPage * VERIFICATION_PAGE_SIZE,
      (verificationPage + 1) * VERIFICATION_PAGE_SIZE
  );

  const productComplianceData = activeQualifications.map(productId => {
      const config = cu.productBaselines.find(pb => pb.productId === productId);
      return {
          productId,
          isConfigured: !!config
      };
  });

  const isGridQualified = cu.status === 'Active';

  const getChangedStyle = (current: string, previous: string | undefined) => {
    if (previous !== undefined && current !== previous) {
      return styles.changedCell;
    }
    return {};
  };

  const isCuSource = (parseInt(cu.id.split('-').pop() || '0')) % 2 === 0;

  // Shared component for ID display to ensure consistency
  const IdentityDisplay = ({ id }: { id: string }) => (
    <div style={{display: 'flex', alignItems: 'center'}}>
        {id ? (
            <>
                <span>{id}</span>
                <span style={{...styles.verifiedBadge, marginLeft: '8px'}} title="Commercial and Grid ID consistency verified">
                    <ShieldCheck size={10} /> Verified Sync
                </span>
            </>
        ) : (
            <span style={{ color: '#6b778c', fontStyle: 'italic' }}>N/A (Unassigned)</span>
        )}
    </div>
  );

  const renderQualCard = (pd: { productId: string; isConfigured: boolean }) => (
    <div key={pd.productId} style={{
        ...styles.qualCard,
        backgroundColor: !pd.isConfigured ? '#fff9e6' : '#f4fbf8',
        borderColor: !pd.isConfigured ? '#ffab00' : '#36b37e'
    }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Zap size={18} color={!pd.isConfigured ? '#d46b08' : '#36b37e'} />
                <span style={{fontSize: '0.9rem', fontWeight: 600, color: '#172b4d'}}>{pd.productId}</span>
            </div>
            <span style={{
                ...pocStyles.badge, 
                backgroundColor: !pd.isConfigured ? '#ffebe6' : '#e3fcef',
                color: !pd.isConfigured ? '#bf2600' : '#006644',
                fontSize: '0.65rem'
            }}>
                {!pd.isConfigured ? 'BASELINE MISSING' : 'READY'}
            </span>
        </div>
    </div>
  );

  return (
    <div style={pocStyles.content}>
        {/* STICKY HEADER & NAVIGATION */}
        <div style={styles.stickyHeader}>
            <div style={styles.breadcrumb}>
                <span onClick={onBack}>Home</span>
                <ChevronRight size={14} />
                <span onClick={onBack} style={{textDecoration:'underline'}}>Controllable units</span>
                <ChevronRight size={14} />
                <span style={{color: '#172b4d', fontWeight: 500}}>{cu.id}</span>
            </div>
            <div style={{display: 'flex', gap: '8px'}}>
                <button 
                    style={{...styles.navButton, opacity: prevCU ? 1 : 0.4, cursor: prevCU ? 'pointer' : 'not-allowed'}}
                    disabled={!prevCU}
                    onClick={() => prevCU && onSelectCU(prevCU.id)}
                    title={prevCU ? `Previous: ${prevCU.id}` : 'Start of list'}
                >
                    <ArrowLeft size={16} /> Prev
                </button>
                <button 
                    style={{...styles.navButton, opacity: nextCU ? 1 : 0.4, cursor: nextCU ? 'pointer' : 'not-allowed'}}
                    disabled={!nextCU}
                    onClick={() => nextCU && onSelectCU(nextCU.id)}
                    title={nextCU ? `Next: ${nextCU.id}` : 'End of list'}
                >
                    Next <ArrowRight size={16} />
                </button>
            </div>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: '32px'}}>
             <div>
                <h1 style={{...pocStyles.pageTitle, marginBottom: '4px'}}>{cu.name}</h1>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <span style={{fontSize: '0.9rem', color: '#6b778c', fontWeight: 500}}>ID: {cu.id}</span>
                </div>
             </div>
             <div style={{display:'flex', gap:'12px'}}>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6'}}>Edit Unit</button>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc'}}>Action</button>
             </div>
        </div>

        {/* 1. OPERATIONAL ALERTS & CURRENT CONSTRAINTS */}
        <div style={pocStyles.section}>
            <h3 style={{...pocStyles.sectionTitle, color: '#cf1322', borderBottomColor: '#ffa39e'}}>
                <ShieldAlert size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Operational Alerts & Current Constraints
            </h3>
            {activeAndPlannedConstraints.length > 0 ? (
                activeAndPlannedConstraints.map(gc => (
                    <div key={gc.id} style={styles.constraintBox}>
                        <div style={{backgroundColor: '#ff4d4f', padding: '10px', borderRadius: '8px', color: 'white', height: 'fit-content'}}>
                            <ShieldAlert size={24} />
                        </div>
                        <div style={{flex: 1}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                                <span style={{fontWeight: 700, color: '#820014'}}>{gc.id} - {gc.gridOwner}</span>
                                <span style={{...pocStyles.badge, backgroundColor: '#fff', border: '1px solid #ffa39e', color: '#cf1322'}}>{gc.status}</span>
                            </div>
                            <p style={{margin: '0 0 12px 0', fontSize: '0.9rem', color: '#172b4d'}}>{gc.reason}</p>
                            <div style={{display: 'flex', gap: '24px', fontSize: '0.85rem'}}>
                                <span style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#820014', fontWeight: 600}}>
                                    <Zap size={14}/> Max {gc.limitValue} {gc.limitUnit}
                                </span>
                                <span style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#6b778c'}}>
                                    <Clock size={14}/> {new Date(gc.startTime).toLocaleString()} - {new Date(gc.endTime).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{color: '#6b778c', fontStyle: 'italic', fontSize: '0.9rem'}}>
                    No active or planned grid constraints for this unit.
                </div>
            )}
        </div>

        {/* 2. OVERVIEW */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}>Overview</h3>
            <div style={styles.overviewGrid}>
                <div style={styles.overviewItem}>
                    <span style={styles.overviewLabel}>Active Flexibility Agreement</span>
                    <span style={styles.overviewValue}>
                        <CheckCircle2 size={14} color="#36b37e" /> Yes
                    </span>
                </div>
                <div style={styles.overviewItem}>
                    <span style={styles.overviewLabel}>Grid Qualification: Status</span>
                    <span style={styles.overviewValue}>
                        {isGridQualified ? <CheckCircle2 size={14} color="#36b37e" /> : <Clock size={14} color="#ffab00" />}
                        {isGridQualified ? 'Qualified' : 'Pending'}
                    </span>
                </div>
                <div style={styles.overviewItem}>
                    <span style={styles.overviewLabel}>Qualification status: Overall</span>
                    <span style={{
                        ...styles.overviewValue,
                        color: cu.status === 'Active' ? '#006644' : (cu.status === 'Pending' ? '#856404' : '#bf2600')
                    }}>
                        {cu.status.toUpperCase()}
                    </span>
                </div>
                <div style={styles.overviewItem}>
                    <span style={styles.overviewLabel}>SPG Member</span>
                    <span style={styles.overviewValue}>
                        {cu.spgId ? (
                            <div 
                                style={{color: '#0052cc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}
                                onClick={() => onNavigateToGroup(cu.spgId!)}
                            >
                                <Link2 size={14} /> Yes ({cu.spgId})
                            </div>
                        ) : 'No'}
                    </span>
                </div>
            </div>
        </div>

        {/* 3. MARKET PRODUCT QUALIFICATIONS */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}>
                <Activity size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Market Product Qualifications
            </h3>
            
            {currentSpg ? (
                <>
                    <div style={styles.inheritanceNote}>
                        <span style={{display:'flex', alignItems:'center', gap:'8px'}}>
                           <Info size={16} color="#0052cc" />
                           <span>Inherited market product qualifications from group <strong>{currentSpg.name}</strong>.</span>
                        </span>
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '24px'}}>
                        {/* TSO SECTION */}
                        <div>
                            <span style={styles.subSectionTitle}>
                                <Globe size={16} color="#0052cc" /> TSO Balancing Products
                            </span>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px'}}>
                                {tsoQualifications.length > 0 ? tsoQualifications.map(renderQualCard) : (
                                    <div style={{color: '#6b778c', fontStyle: 'italic', fontSize: '0.9rem', padding: '12px'}}>No TSO products qualified.</div>
                                )}
                            </div>
                        </div>

                        {/* DSO SECTION */}
                        <div>
                            <span style={styles.subSectionTitle}>
                                <TowerControl size={16} color="#4a148c" /> DSO Local Products
                            </span>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px'}}>
                                {dsoQualifications.length > 0 ? dsoQualifications.map(renderQualCard) : (
                                    <div style={{color: '#6b778c', fontStyle: 'italic', fontSize: '0.9rem', padding: '12px'}}>No DSO products qualified.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{color: '#6b778c', fontStyle: 'italic', fontSize: '0.9rem'}}>
                    This unit is not part of a Service Providing Group.
                </div>
            )}
        </div>

        {/* 4. RELATIONSHIPS & BUSINESS AGREEMENTS */}
        <div style={styles.relationGroup}>
            {/* DHV RELATIONS */}
            <div style={{...styles.relationCard, borderTop: '4px solid #0052cc'}}>
                <div style={{...styles.relationHeader, color: '#0052cc'}}>
                    <Database size={16} /> DHV Relations
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <Field label="Grid Owner (DSO)" value={<span style={styles.partyLink} onClick={() => onSelectParty(cu.gridOwner)}>{cu.gridOwner} <ExternalLink size={12}/></span>} />
                    <Field label="Electricity Supplier (RE)" value={<span style={styles.partyLink} onClick={() => onSelectParty(cu.re)}>{cu.re} <ExternalLink size={12}/></span>} />
                    <Field label="Balance Responsible (BRP)" value={<span style={styles.partyLink} onClick={() => onSelectParty(cu.brp)}>{cu.brp} <ExternalLink size={12}/></span>} />
                    <Field label="SSN / ORGNR" value={<IdentityDisplay id={cu.ownerId} />} />
                </div>
            </div>

            {/* FLEXIBILITY RELATIONS */}
            <div style={{...styles.relationCard, borderTop: '4px solid #4a148c'}}>
                <div style={{...styles.relationHeader, color: '#4a148c'}}>
                    <Activity size={16} /> Flexibility Relations
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <Field label="CU Registration Responsible" value={<span style={{...styles.partyLink, color: '#4a148c'}} onClick={() => onSelectParty(cu.registrationResponsible)}>{cu.registrationResponsible} <UserPlus size={12}/></span>} />
                    <Field label="Service Provider" value={
                        cu.sp ? (
                            <span style={{...styles.partyLink, color: '#4a148c'}} onClick={() => onSelectParty(cu.sp)}>{cu.sp} <ExternalLink size={12}/></span>
                        ) : (
                            <span style={{ color: '#d97706', fontWeight: 600 }}>UNASSIGNED</span>
                        )
                    } />
                    <Field label="SSN / ORGNR" value={<IdentityDisplay id={cu.ownerId} />} />
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                        <Field label="Start Date" value={<div style={{display:'flex', alignItems:'center', gap:'4px'}}><Calendar size={14} color="#6b778c"/> {cu.flexStartDate || 'N/A'}</div>} />
                        <Field label="End Date" value={<div style={{display:'flex', alignItems:'center', gap:'4px'}}><Calendar size={14} color="#6b778c"/> {cu.flexEndDate || 'N/A'}</div>} />
                    </div>
                </div>
            </div>
        </div>

        {/* 5. TECHNICAL IDENTITY & BASE QUALIFICATION */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}>
                <Box size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Technical Identity & Base Qualification
            </h3>
            
            <div style={styles.fieldGrid}>
                <Field label="System ID" value={cu.id} help />
                <Field label="Business UUID" value={cu.businessId} help />
                <Field label="Resource Type" value={cu.type} />
                <Field label="Capacity" value={`${cu.capacity} ${cu.capacityUnit}`} />
                <Field label="Bidding Zone" value={cu.biddingZone} />
                <Field label="Grid Area" value={<div style={{display:'flex', alignItems:'center', gap:'6px'}}><MapPin size={14} color="#6b778c"/> {cu.gridArea}</div>} />
                
                <div style={{gridColumn: 'span 2'}}>
                    <div style={styles.field}>
                        <div style={styles.label}>Accounting Point (GSRN) <HelpCircle size={14} color="#a5adba" /></div>
                        <div style={{...styles.value, fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace'}}>{cu.accountingPoint}</div>
                        
                        <div style={styles.dhvMasterBox}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(0,82,204,0.1)', paddingBottom: '8px'}}>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                    <Database size={16} color="#0052cc" />
                                    <span style={{fontSize: '0.85rem', fontWeight: 700, color: '#0052cc'}}>DHV Master Data</span>
                                </div>
                                <span style={{fontSize: '0.7rem', color: '#6b778c', display: 'flex', alignItems: 'center', gap: '4px'}}>
                                    <Clock size={10} /> Last synced: Today, 04:12 CET
                                </span>
                            </div>
                            <div style={{display:'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px'}}>
                                <div style={styles.dhvAttribute}>
                                    <span style={styles.dhvAttrLabel}>Main Fuse</span>
                                    <span style={styles.dhvAttrValue}>{cu.mainFuse || 'N/A'}</span>
                                </div>
                                <div style={styles.dhvAttribute}>
                                    <span style={styles.dhvAttrLabel}>Metering Int.</span>
                                    <span style={styles.dhvAttrValue}>{cu.meteringInterval || 'N/A'}</span>
                                </div>
                                <div style={styles.dhvAttribute}>
                                    <span style={styles.dhvAttrLabel}>Reporting Int.</span>
                                    <span style={styles.dhvAttrValue}>{cu.reportingInterval || 'N/A'}</span>
                                </div>
                                <div style={styles.dhvAttribute}>
                                    <span style={styles.dhvAttrLabel}>Phases</span>
                                    <span style={styles.dhvAttrValue}>{cu.numberOfPhases || 'N/A'}</span>
                                </div>
                                <div style={styles.dhvAttribute}>
                                    <span style={styles.dhvAttrLabel}>Voltage</span>
                                    <span style={styles.dhvAttrValue}>{cu.voltageLevel || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 6. BASELINE & COMPLIANCE */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}><TrendingUp size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Baseline & Compliance</h3>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={{...pocStyles.th, width: '20%'}}>Product</th>
                        <th style={{...pocStyles.th, width: '15%'}}>Meter Source</th>
                        <th style={{...pocStyles.th, width: '35%'}}>Assigned Baseline Method</th>
                        <th style={{...pocStyles.th, width: '20%'}}>Compliance Status</th>
                        <th style={{...pocStyles.th, width: '10%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    {productComplianceData.length > 0 ? (
                        productComplianceData.map((data, idx) => {
                            const config = cu.productBaselines.find(pb => pb.productId === data.productId);
                            const method = config ? baselineMethods.find(m => m.id === config.methodId) : null;
                            
                            return (
                                <tr key={data.productId} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', alignItems:'center', gap:'8px', fontWeight: 600}}>
                                            <Zap size={14} color="#d97706" />
                                            {data.productId}
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
                                        {method ? (
                                            <div style={{display:'flex', flexDirection:'column'}}>
                                                <span style={{fontWeight: 600, color: '#0052cc'}}>{method.name}</span>
                                                <span style={{fontSize: '0.75rem', color: '#6b778c'}}>ID: {method.id}</span>
                                            </div>
                                        ) : (
                                            <span style={{color: '#6b778c', fontStyle: 'italic'}}>No baseline assigned</span>
                                        )}
                                    </td>
                                    <td style={pocStyles.td}>
                                        {data.isConfigured ? (
                                            <span style={{...pocStyles.badge, ...pocStyles.badgeGreen, display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content'}}>
                                                <CheckCircle2 size={12} /> Compliant
                                            </span>
                                        ) : (
                                            <span style={{...pocStyles.badge, backgroundColor: '#ffebe6', color: '#bf2600', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content'}}>
                                                <AlertTriangle size={12} /> Configuration missing
                                            </span>
                                        )}
                                    </td>
                                    <td style={pocStyles.td}>
                                        <button style={{border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem'}}>Manage</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>No product qualifications active for this unit.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* 7. RECENT VERIFICATIONS */}
        <div style={pocStyles.section}>
            <h3 style={pocStyles.sectionTitle}><CheckCircle2 size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Recent Verifications (Ex-post)</h3>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={pocStyles.th}>Reference</th>
                        <th style={pocStyles.th}>Product</th>
                        <th style={pocStyles.th}>Period / MTU</th>
                        <th style={{...pocStyles.th, textAlign: 'right'}}>CU Share (MW)</th>
                        <th style={{...pocStyles.th, textAlign: 'right'}}>Energy (MWh)</th>
                        <th style={{...pocStyles.th, textAlign: 'right'}}>Accuracy</th>
                        <th style={pocStyles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {pagedVerifications.length > 0 ? pagedVerifications.map((item, idx) => (
                        <tr key={item.bidId} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                            <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc', textDecoration:'underline'}} onClick={() => onSelectBid(item.bidId)}>{item.bidId}</td>
                            <td style={pocStyles.td}><span style={{...pocStyles.badge, ...pocStyles.badgeBlue}}>{item.productId}</span></td>
                            <td style={pocStyles.td}>
                                <div style={{fontSize: '0.8rem'}}>
                                    {new Date(item.timestamp).toLocaleDateString()} {item.period}
                                </div>
                            </td>
                            <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 600}}>{item.cuShareMW.toFixed(3)}</td>
                            <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#0052cc'}}>{item.cuEnergyMWh.toFixed(3)}</td>
                            <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 800, color: item.accuracyPct >= 98 ? '#006644' : '#974f0c'}}>
                                {item.accuracyPct}%
                            </td>
                            <td style={pocStyles.td}>
                                <button style={{border:'none', background:'none', color:'#0052cc', cursor:'pointer'}} onClick={() => onSelectBid(item.bidId)}>
                                    <FileSearch size={16} />
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={7} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>No verification history for this unit.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalVerificationPages > 1 && (
                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>Showing {pagedVerifications.length} of {historicalVerifications.length} results</span>
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                        <button disabled={verificationPage === 0} onClick={() => setVerificationPage(v => v - 1)} style={styles.navButton}><ChevronLeft size={16}/></button>
                        <span style={{fontSize: '0.85rem', fontWeight: 600}}>Page {verificationPage + 1} of {totalVerificationPages}</span>
                        <button disabled={verificationPage >= totalVerificationPages - 1} onClick={() => setVerificationPage(v => v + 1)} style={styles.navButton}><ChevronRight size={16}/></button>
                    </div>
                </div>
            )}
        </div>

        {/* 8. RELATIONSHIP HISTORY */}
        <div style={pocStyles.section}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 style={{...pocStyles.sectionTitle, borderBottom: 'none', marginBottom: 0}}>
                    <History size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Relationship History
                </h3>
                <button style={styles.historyToggle} onClick={() => setHistoryExpanded(!historyExpanded)}>
                    {historyExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {historyExpanded ? 'Collapse' : 'Expand History'}
                </button>
            </div>
            
            {historyExpanded && (
                <div style={{marginTop: '20px', borderTop: '1px solid #ebecf0', paddingTop: '20px'}}>
                    <table style={pocStyles.table}>
                        <thead style={{backgroundColor: '#fafbfc'}}>
                            <tr>
                                <th style={pocStyles.th}>Period</th>
                                <th style={pocStyles.th}>Service Provider (SP)</th>
                                <th style={pocStyles.th}>Supplier (RE)</th>
                                <th style={pocStyles.th}>BRP</th>
                                <th style={pocStyles.th}>SSN / ORGNR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cu.relationshipHistory?.map((record, idx) => {
                                const nextRecord = cu.relationshipHistory?.[idx + 1];
                                return (
                                    <tr key={idx} style={{...pocStyles.row, backgroundColor: idx === 0 ? '#f4f8fd' : '#fff'}}>
                                        <td style={pocStyles.td}>
                                            <div style={{fontSize: '0.8rem', fontWeight: idx === 0 ? 700 : 400}}>
                                                {record.startDate} — {record.endDate}
                                            </div>
                                        </td>
                                        <td style={pocStyles.td}>
                                            <div style={getChangedStyle(record.sp, nextRecord?.sp)}>{record.sp}</div>
                                        </td>
                                        <td style={pocStyles.td}>
                                            <div style={getChangedStyle(record.re, nextRecord?.re)}>{record.re}</div>
                                        </td>
                                        <td style={pocStyles.td}>
                                            <div style={getChangedStyle(record.brp, nextRecord?.brp)}>{record.brp}</div>
                                        </td>
                                        <td style={pocStyles.td}>{record.ssnOrgnr}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  );
};
