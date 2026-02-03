
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
  Database
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
    }
};

export const FirLocalMarketDetail: React.FC<Props> = ({ id, onBack }) => {
  const market = useMemo(() => mockLocalMarkets.find(m => m.id === id), [id]);

  // Dynamic logic: Find all Grid Areas (MGAs) where E.ON is the owner
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        <div className="space-y-6">
          <div style={pocStyles.section}>
            <h3 style={styles.sectionHeader}><Info size={16} /> Market Description</h3>
            <p style={{ lineHeight: '1.6', color: '#334155' }}>{market.description}</p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, padding: '16px', backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #b3d4ff' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0052cc', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Market Products</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                   {market.products.map(p => (
                     <span key={p} style={{ ...pocStyles.badge, backgroundColor: '#fff', border: '1px solid #b3d4ff', color: '#0052cc' }}>
                       <Zap size={10} style={{ display: 'inline', marginRight: '4px' }} /> {p}
                     </span>
                   ))}
                </div>
              </div>
              <div style={{ flex: 1, padding: '16px', backgroundColor: '#f4fbf8', borderRadius: '8px', border: '1px solid #b3dfc1' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#006644', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Integration Status</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: '#006644', fontWeight: 700 }}>
                   <ShieldCheck size={18} /> FIR-Link Active
                </div>
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
        </div>
      </div>
    </div>
  );
};
