
import React, { useMemo } from 'react';
import { 
  ChevronRight, 
  ShieldAlert, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  Users,
  Box,
  Zap,
  Info,
  Link2,
  ChevronLeft
} from 'lucide-react';
import { pocStyles } from '../styles';
import { mockGridConstraints, mockCUs, mockSPGs } from '../mockData';
import { GridConstraint } from '../types';

interface Props {
  id: string;
  prevConstraint: GridConstraint | null;
  nextConstraint: GridConstraint | null;
  onSelectConstraint: (id: string) => void;
  onBack: () => void;
  onSelectCU: (id: string) => void;
  onSelectSPG: (id: string) => void;
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
  vulnerabilityBox: {
    backgroundColor: '#fff1f0',
    border: '1px solid #ffa39e',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  impactIndicator: {
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 700,
    backgroundColor: '#ff4d4f',
    color: 'white',
    textTransform: 'uppercase' as const
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  capacityBar: {
    height: '12px',
    backgroundColor: '#f4f5f7',
    borderRadius: '6px',
    overflow: 'hidden',
    display: 'flex',
    marginTop: '8px'
  },
  capacityFillNet: {
    height: '100%',
    backgroundColor: '#36b37e', // Green for what's actually left
    transition: 'width 0.5s'
  },
  capacityFillBlocked: {
    height: '100%',
    backgroundColor: '#ff4d4f', // Red for blocked
    transition: 'width 0.5s'
  }
};

export const FirGridConstraintDetail: React.FC<Props> = ({ id, prevConstraint, nextConstraint, onSelectConstraint, onBack, onSelectCU, onSelectSPG }) => {
    const constraint = mockGridConstraints.find(gc => gc.id === id);
    
    const affectedCUs = useMemo(() => {
        if (!constraint) return [];
        return mockCUs.filter(cu => constraint.affectedUnits.includes(cu.id));
    }, [constraint]);

    const affectedSPGs = useMemo(() => {
        const spgSet = new Set<string>();
        affectedCUs.forEach(cu => { if (cu.spgId) spgSet.add(cu.spgId); });
        
        return Array.from(spgSet).map(spgId => {
            const spg = mockSPGs.find(s => s.id === spgId);
            const allCUsInSpg = mockCUs.filter(cu => cu.spgId === spgId);
            const CUsUnderThisConstraint = allCUsInSpg.filter(cu => constraint?.affectedUnits.includes(cu.id));
            
            const grossMW = allCUsInSpg.reduce((acc, cu) => {
                const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
                return acc + val;
            }, 0);

            const blockedMW = CUsUnderThisConstraint.reduce((acc, cu) => {
                const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
                return acc + val;
            }, 0);

            const netMW = Math.max(0, grossMW - blockedMW);

            return {
                ...spg!,
                grossMW,
                netMW,
                blockedMW,
                unitCount: allCUsInSpg.length,
                affectedCount: CUsUnderThisConstraint.length
            };
        });
    }, [affectedCUs, constraint]);

    if (!constraint) return <div>Constraint not found</div>;

    return (
        <div style={pocStyles.content}>
            {/* STICKY HEADER NAVIGATION */}
            <div style={styles.stickyHeader}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#5e6c84', cursor: 'pointer'}}>
                    <span onClick={onBack}>Home</span>
                    <ChevronRight size={14} />
                    <span onClick={onBack} style={{textDecoration:'underline'}}>Temporary Grid Constraints</span>
                    <ChevronRight size={14} />
                    <span style={{color: '#172b4d', fontWeight: 500}}>{id}</span>
                </div>
                <div style={{display: 'flex', gap: '8px'}}>
                    <button 
                        style={{...styles.navButton, opacity: prevConstraint ? 1 : 0.4, cursor: prevConstraint ? 'pointer' : 'not-allowed'}}
                        disabled={!prevConstraint}
                        onClick={() => prevConstraint && onSelectConstraint(prevConstraint.id)}
                    >
                        <ArrowLeft size={16} /> Prev
                    </button>
                    <button 
                        style={{...styles.navButton, opacity: nextConstraint ? 1 : 0.4, cursor: nextConstraint ? 'pointer' : 'not-allowed'}}
                        disabled={!nextConstraint}
                        onClick={() => nextConstraint && onSelectConstraint(nextConstraint.id)}
                    >
                        Next <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <div style={styles.vulnerabilityBox}>
                <div style={{backgroundColor: '#ff4d4f', padding: '16px', borderRadius: '12px', color: 'white'}}>
                    <ShieldAlert size={32} />
                </div>
                <div style={{flex: 1}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <h1 style={{...pocStyles.pageTitle, marginBottom: 0}}>Constraint {id}</h1>
                        <span style={styles.impactIndicator}>{constraint.status}</span>
                    </div>
                    <p style={{fontSize: '1.1rem', fontWeight: 500, color: '#820014', marginBottom: '16px'}}>
                        {constraint.reason}
                    </p>
                    <div style={{display:'flex', gap:'32px', color: '#172b4d'}}>
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <Zap size={18} color="#cf1322"/> 
                            <strong>Limit: {constraint.limitValue} {constraint.limitUnit}</strong>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <Clock size={18} color="#6b778c"/> 
                            <span>{new Date(constraint.startTime).toLocaleString()} — {new Date(constraint.endTime).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.statGrid}>
                <div style={styles.statCard}>
                    <div style={{fontSize: '0.75rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase'}}>Total Affected Units</div>
                    <div style={{fontSize: '1.8rem', fontWeight: 700, color: '#172b4d'}}>{affectedCUs.length}</div>
                </div>
                <div style={styles.statCard}>
                    <div style={{fontSize: '0.75rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase'}}>Affected Portfolios</div>
                    <div style={{fontSize: '1.8rem', fontWeight: 700, color: '#172b4d'}}>{affectedSPGs.length}</div>
                </div>
                <div style={styles.statCard}>
                    <div style={{fontSize: '0.75rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase'}}>DSO (Reporter)</div>
                    <div style={{fontSize: '1.2rem', fontWeight: 700, color: '#172b4d', marginTop: '8px'}}>{constraint.gridOwner}</div>
                </div>
            </div>

            {/* Affected SPGs Section */}
            <div style={pocStyles.section}>
                <h3 style={pocStyles.sectionTitle}>Affected Service Providing Groups (Market Portfolios)</h3>
                <p style={{fontSize: '0.85rem', color: '#6b778c', marginBottom: '20px'}}>
                    Bids from these groups will be automatically capped by the system during the constraint period.
                </p>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>SPG ID / Name</th>
                            <th style={pocStyles.th}>Actor</th>
                            <th style={pocStyles.th}>Brutto (MW)</th>
                            <th style={pocStyles.th}>Netto (MW)</th>
                            <th style={pocStyles.th}>Impact Visualization</th>
                        </tr>
                    </thead>
                    <tbody>
                        {affectedSPGs.map((spg, idx) => {
                            const blockedPct = (spg.blockedMW / spg.grossMW) * 100;
                            const netPct = 100 - blockedPct;

                            return (
                                <tr 
                                    key={spg.id} 
                                    style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                    onClick={() => onSelectSPG(spg.id)}
                                >
                                    <td style={pocStyles.td}>
                                        <div style={{display: 'flex', alignItems:'center', gap:'8px', color: '#0052cc', fontWeight: 600}}>
                                            <Link2 size={14} />
                                            {spg.id} - {spg.name}
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>{spg.fsp}</td>
                                    <td style={{...pocStyles.td, fontWeight: 500}}>{spg.grossMW.toFixed(1)} MW</td>
                                    <td style={{...pocStyles.td, fontWeight: 700, color: '#006644'}}>{spg.netMW.toFixed(1)} MW</td>
                                    <td style={{...pocStyles.td, width: '200px'}}>
                                        <div style={{fontSize: '0.7rem', color: '#6b778c', display: 'flex', justifyContent: 'space-between'}}>
                                            <span>Net: {netPct.toFixed(0)}%</span>
                                            <span style={{color: '#cf1322'}}>Blocked: {blockedPct.toFixed(0)}%</span>
                                        </div>
                                        <div style={styles.capacityBar}>
                                            <div style={{...styles.capacityFillNet, width: `${netPct}%`}} />
                                            <div style={{...styles.capacityFillBlocked, width: `${blockedPct}%`}} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Affected CUs Section */}
            <div style={pocStyles.section}>
                <h3 style={pocStyles.sectionTitle}>Directly Affected Units (CU)</h3>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>CU ID</th>
                            <th style={pocStyles.th}>Name</th>
                            <th style={pocStyles.th}>Type</th>
                            <th style={pocStyles.th}>Capacity</th>
                            <th style={pocStyles.th}>Retailer (RE)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {affectedCUs.map((cu, idx) => (
                            <tr 
                                key={cu.id} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                onClick={() => onSelectCU(cu.id)}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                        <Box size={14} color="#6b778c"/>
                                        {cu.id}
                                    </div>
                                </td>
                                <td style={pocStyles.td}>{cu.name}</td>
                                <td style={pocStyles.td}>{cu.type}</td>
                                <td style={pocStyles.td}>{cu.capacity} {cu.capacityUnit}</td>
                                <td style={pocStyles.td}>{cu.re}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{marginTop: '24px'}}>
                <button 
                    style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}
                    onClick={onBack}
                >
                    <ArrowLeft size={16} /> Back to List
                </button>
            </div>
        </div>
    );
};
