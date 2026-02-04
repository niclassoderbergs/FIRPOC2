
import React, { useMemo } from 'react';
import { pocStyles } from '../styles';
import { 
  ArrowLeft, 
  MapPin, 
  TowerControl, 
  Info, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Globe,
  Database,
  CheckCircle2,
  AlertCircle,
  Clock,
  Coins
} from 'lucide-react';
import { mockLocalMarkets, mockDSOs } from '../mockData';

interface Props {
  id: string;
  onBack: () => void;
}

const styles = {
    sectionHeader: {
        fontSize: '0.9rem',
        fontWeight: 700,
        color: '#42526e',
        textTransform: 'uppercase' as const,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '1px solid #ebecf0',
        paddingBottom: '12px',
        marginBottom: '20px'
    },
    gridAreaCard: {
        padding: '12px 16px',
        backgroundColor: '#fff',
        border: '1px solid #dfe1e6',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.9rem'
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    },
    productCard: {
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #dfe1e6',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px'
    },
    productSubHeader: {
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#6b778c',
        textTransform: 'uppercase' as const,
        marginBottom: '4px'
    },
    criteriaBox: {
        backgroundColor: '#f4f5f7',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        border: '1px solid #dfe1e6'
    }
};

export const FirLocalMarketDetail: React.FC<Props> = ({ id, onBack }) => {
  const market = useMemo(() => mockLocalMarkets.find(m => m.id === id), [id]);

  const validMGAs = useMemo(() => {
    if (!market) return [];
    return mockDSOs.filter(dso => dso.name === market.owner);
  }, [market]);

  if (!market) return <div style={pocStyles.content}>Market not found.</div>;

  return (
    <div style={pocStyles.content}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onBack}
            style={{ 
              backgroundColor: '#fff', 
              border: '1px solid #dfe1e6', 
              padding: '8px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#42526e'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ ...pocStyles.pageTitle, marginBottom: '4px' }}>{market.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.9rem', color: '#6b778c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TowerControl size={14} /> Operated by <strong>{market.owner}</strong>
              </span>
              <span style={{ ...pocStyles.badge, ...pocStyles.badgeGreen }}>{market.status}</span>
            </div>
          </div>
        </div>
        <button style={{ ...pocStyles.actionButton, backgroundColor: '#0052cc' }}>Open Market Dashboard</button>
      </div>

      {/* Participation Requirements */}
      <div style={styles.criteriaBox}>
          <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px'}}>
              <Info size={18} color="#0052cc" />
              <span style={{fontWeight: 700, fontSize: '0.9rem', color: '#172b4d'}}>General participation requirements for all products</span>
          </div>
          <ul style={{margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#42526e', display:'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              <li style={{display:'flex', gap:'8px'}}><CheckCircle2 size={12} color="#36b37e" style={{marginTop:'4px', flexShrink:0}} /> Deliver at least 0.1 MWh/h to the affected grid point.</li>
              <li style={{display:'flex', gap:'8px'}}><CheckCircle2 size={12} color="#36b37e" style={{marginTop:'4px', flexShrink:0}} /> Flexibility must be delivered for at least one hour.</li>
              <li style={{display:'flex', gap:'8px'}}><CheckCircle2 size={12} color="#36b37e" style={{marginTop:'4px', flexShrink:0}} /> Provide accurate meter values for delivered flexibility.</li>
          </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        <div className="space-y-6">
          <div style={pocStyles.section}>
            <h3 style={styles.sectionHeader}><Info size={16} /> Market Description</h3>
            <p style={{ lineHeight: '1.6', color: '#334155', fontSize: '0.95rem' }}>{market.description}</p>
            
            <div style={{marginTop: '32px'}}>
                <h4 style={styles.sectionHeader}><Zap size={16} /> Available Products</h4>
                <div style={styles.productGrid}>
                    {market.detailedProducts?.map(prod => (
                        <div key={prod.name} style={{
                            ...styles.productCard,
                            borderTop: `4px solid ${prod.type === 'Activation' ? '#008da6' : '#6554c0'}`
                        }}>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                                <h5 style={{margin:0, fontWeight: 800, fontSize: '1.1rem'}}>{prod.name}</h5>
                                <span style={{...pocStyles.badge, fontSize:'0.65rem', backgroundColor: prod.type === 'Activation' ? '#e6f7ff' : '#f9f0ff', color: prod.type === 'Activation' ? '#0050b3' : '#531dab'}}>
                                    {prod.type.toUpperCase()}
                                </span>
                            </div>

                            <div>
                                <div style={styles.productSubHeader}><Clock size={10} style={{display:'inline', marginRight:'4px'}}/> Time Horizon</div>
                                <div style={{fontSize: '0.85rem', color: '#334155'}}>{prod.timeHorizon}</div>
                            </div>

                            <div>
                                <div style={styles.productSubHeader}><Coins size={10} style={{display:'inline', marginRight:'4px'}}/> Remuneration</div>
                                <div style={{fontSize: '0.85rem', color: '#334155'}}>{prod.remuneration}</div>
                            </div>

                            <div style={{backgroundColor: '#fafbfc', padding: '12px', borderRadius: '6px', border: '1px solid #ebecf0'}}>
                                <div style={styles.productSubHeader}><ShieldCheck size={10} style={{display:'inline', marginRight:'4px'}}/> Qualification</div>
                                <div style={{fontSize: '0.8rem', color: '#6b778c'}}>{prod.qualification}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div style={pocStyles.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ ...styles.sectionHeader, borderBottom: 'none', marginBottom: 0 }}>
                    <Globe size={18} color="#0052cc" /> Valid Grid Areas (MGA)
                </h3>
                <span style={{ ...pocStyles.badge, backgroundColor: '#f4f5f7' }}>{validMGAs.length} Areas</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6b778c', marginBottom: '20px' }}>
                This market is exclusively valid in grid areas owned by <strong>{market.owner}</strong>. Resources in these areas are automatically identified as eligible for participation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {validMGAs.map(mga => (
                    <div key={mga.mgaCode} style={styles.gridAreaCard}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#f4f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b778c' }}>
                            <MapPin size={16} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#172b4d' }}>{mga.mgaCode}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>{mga.mgaName}</div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <div style={pocStyles.section}>
                <h3 style={styles.sectionHeader}><Database size={16} /> Market Statistics</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b778c', marginBottom: '4px' }}>Eligible Resources (D-2)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>1,245 CUs</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b778c', marginBottom: '4px' }}>Potential Volume (Estimated)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>45.2 MW</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b778c', marginBottom: '4px' }}>Connected Aggregators</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>14 SPs</div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#fff', border: '1px solid #dfe1e6', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#172b4d', marginBottom: '12px' }}>Technical Constraints</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#42526e', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Settlement via <strong>DHV Domain 7</strong></li>
                    <li>Quantification via <strong>FIR Domain 6</strong></li>
                    <li>Minimum bid size: <strong>0.1 MW</strong></li>
                    <li>Gate Closure: <strong>D-1 12:00 CET</strong></li>
                </ul>
            </div>

            <div style={{...pocStyles.section, backgroundColor: '#fff7e6', borderColor: '#ffbb96'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px', color: '#d46b08'}}>
                    <AlertCircle size={18} />
                    <span style={{fontWeight: 700, fontSize: '0.9rem'}}>Cross-Market Rule</span>
                </div>
                <p style={{fontSize:'0.8rem', color:'#873800', margin:0, lineHeight:'1.4'}}>
                    The system automatically blocks bids in local markets if the resource is already activated at the TSO level to prevent double payment.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
