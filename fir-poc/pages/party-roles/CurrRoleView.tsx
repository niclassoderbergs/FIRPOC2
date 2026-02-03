
import React, { useMemo } from 'react';
import { UserPlus, Box, ShieldAlert, UserCheck, UserX, Info, ExternalLink, Activity } from 'lucide-react';
import { pocStyles } from '../../styles';
import { mockCUs } from '../../mockData';

interface Props {
  partyName: string;
  onSelectCU: (id: string) => void;
}

const styles = {
    statGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
    },
    statCard: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #dfe1e6',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
    },
    statLabel: {
        fontSize: '0.7rem',
        fontWeight: 700,
        color: '#6b778c',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px'
    },
    statValue: {
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#172b4d'
    }
};

export const CurrRoleView: React.FC<Props> = ({ partyName, onSelectCU }) => {
    const myRegisteredCUs = useMemo(() => 
        mockCUs.filter(cu => cu.registrationResponsible === partyName)
    , [partyName]);

    const stats = useMemo(() => {
        const total = myRegisteredCUs.length;
        const notQualified = myRegisteredCUs.filter(cu => cu.status !== 'Active').length;
        const hasSp = myRegisteredCUs.filter(cu => cu.sp && cu.sp.trim().length > 0).length;
        const missingSp = total - hasSp;

        return { total, notQualified, hasSp, missingSp };
    }, [myRegisteredCUs]);

    if (myRegisteredCUs.length === 0) return null;

    return (
        <div style={{ ...pocStyles.section, borderLeft: '4px solid #4a148c' }}>
            <h3 style={pocStyles.sectionTitle}>
                <UserPlus size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
                Role: CU Registration Responsible (CURR)
            </h3>

            <div style={styles.statGrid}>
                <div style={{ ...styles.statCard, borderTop: '4px solid #4a148c' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Registered CUs</span>
                        <Box size={16} color="#4a148c" />
                    </div>
                    <div style={styles.statValue}>{stats.total}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Total technical onboards</div>
                </div>

                <div style={{ ...styles.statCard, borderTop: '4px solid #bf2600' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Pending Grid PQ</span>
                        <ShieldAlert size={16} color="#bf2600" />
                    </div>
                    <div style={{ ...styles.statValue, color: stats.notQualified > 0 ? '#bf2600' : '#172b4d' }}>{stats.notQualified}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Units awaiting DSO approval</div>
                </div>

                <div style={{ ...styles.statCard, borderTop: '4px solid #006644' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Assigned to SP</span>
                        <UserCheck size={16} color="#006644" />
                    </div>
                    <div style={{ ...styles.statValue, color: '#006644' }}>{stats.hasSp}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Commercial link established</div>
                </div>

                <div style={{ ...styles.statCard, borderTop: '4px solid #ffab00' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Lacking SP</span>
                        <UserX size={16} color="#ffab00" />
                    </div>
                    <div style={{ ...styles.statValue, color: stats.missingSp > 0 ? '#d97706' : '#172b4d' }}>{stats.missingSp}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Units without market actor</div>
                </div>
            </div>

            <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9f8ff', borderRadius: '8px', border: '1px solid #e1bee7', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Info size={18} color="#4a148c" />
                <p style={{ fontSize: '0.85rem', color: '#4a148c', margin: 0 }}>
                    As a <strong>Registration Responsible</strong>, you are the technical owner of the onboarding process. Ensure all units complete <strong>Grid Prequalification</strong> and are assigned to a <strong>Service Provider</strong> to enable market participation.
                </p>
            </div>

            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#42526e', marginBottom: '12px', textTransform: 'uppercase' }}>Recent Technical Registrations</h4>
            <table style={pocStyles.table}>
                <thead style={{ backgroundColor: '#fafbfc' }}>
                    <tr>
                        <th style={pocStyles.th}>CU ID</th>
                        <th style={pocStyles.th}>Resource Name</th>
                        <th style={pocStyles.th}>Grid Area</th>
                        <th style={pocStyles.th}>Grid PQ</th>
                        <th style={pocStyles.th}>Assigned SP</th>
                        <th style={{ ...pocStyles.th, textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myRegisteredCUs.slice(0, 10).map((cu, idx) => (
                        <tr 
                            key={cu.id} 
                            style={{ ...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff' }}
                            onClick={() => onSelectCU(cu.id)}
                        >
                            <td style={{ ...pocStyles.td, fontWeight: 600, color: '#0052cc' }}>{cu.id}</td>
                            <td style={pocStyles.td}>{cu.name}</td>
                            <td style={pocStyles.td}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                                    <Activity size={12} color="#6b778c" />
                                    {cu.gridArea}
                                </div>
                            </td>
                            <td style={pocStyles.td}>
                                <span style={{
                                    ...pocStyles.badge,
                                    backgroundColor: cu.status === 'Active' ? '#e3fcef' : '#fff0b3',
                                    color: cu.status === 'Active' ? '#006644' : '#172b4d'
                                }}>
                                    {cu.status === 'Active' ? 'QUALIFIED' : cu.status.toUpperCase()}
                                </span>
                            </td>
                            <td style={pocStyles.td}>
                                {cu.sp ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#172b4d' }}>
                                        <UserCheck size={14} color="#006644" />
                                        {cu.sp.length > 20 ? cu.sp.substring(0, 18) + '...' : cu.sp}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#d97706', fontWeight: 600 }}>
                                        <UserX size={14} />
                                        UNASSIGNED
                                    </div>
                                )}
                            </td>
                            <td style={{ ...pocStyles.td, textAlign: 'right' }}>
                                <button style={{ border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                                    Manage <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
