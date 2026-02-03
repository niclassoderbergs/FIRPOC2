import React, { useMemo } from 'react';
import { FileText, CheckCircle2, Clock, AlertTriangle, Info, Search, ShieldCheck } from 'lucide-react';
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

export const SpAgreementView: React.FC<Props> = ({ partyName, onSelectCU }) => {
    // I denna POC-logik anses varje CU kopplad till en SP ha ett underliggande flexibilitetsavtal
    const agreements = useMemo(() => 
        mockCUs.filter(cu => cu.sp === partyName)
    , [partyName]);

    const stats = useMemo(() => {
        const total = agreements.length;
        const active = agreements.filter(a => a.status === 'Active').length;
        const pending = agreements.filter(a => a.status === 'Pending').length;
        const suspended = agreements.filter(a => a.status === 'Suspended').length;

        return { total, active, pending, suspended };
    }, [agreements]);

    return (
        <div style={{ ...pocStyles.section, borderLeft: '4px solid #0052cc' }}>
            <h3 style={pocStyles.sectionTitle}>
                <ShieldCheck size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
                Role: Service Provider (SP) — Flexibility Agreements
            </h3>

            <div style={styles.statGrid}>
                <div style={{ ...styles.statCard, borderTop: '4px solid #0052cc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Total Agreements</span>
                        <FileText size={16} color="#0052cc" />
                    </div>
                    <div style={styles.statValue}>{stats.total}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Active commercial relations</div>
                </div>

                <div style={{ ...styles.statCard, borderTop: '4px solid #36b37e' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Active</span>
                        <CheckCircle2 size={16} color="#36b37e" />
                    </div>
                    {/* Fix: Line 80 - corrected style object syntax to merge styles and add color override */}
                    <div style={{ ...styles.statValue, color: '#006644' }}>{stats.active}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Eligible for market</div>
                </div>

                <div style={{ ...styles.statCard, borderTop: '4px solid #ffab00' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Pending Onboarding</span>
                        <Clock size={16} color="#ffab00" />
                    </div>
                    {/* Fix: corrected style object syntax */}
                    <div style={{ ...styles.statValue, color: '#974f0c' }}>{stats.pending}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Awaiting technical setup</div>
                </div>

                <div style={{ ...styles.statCard, borderTop: '4px solid #ff5630' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={styles.statLabel}>Suspended</span>
                        <AlertTriangle size={16} color="#ff5630" />
                    </div>
                    {/* Fix: corrected style object syntax */}
                    <div style={{ ...styles.statValue, color: '#bf2600' }}>{stats.suspended}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>Contractual/Technical block</div>
                </div>
            </div>

            <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#e6effc', borderRadius: '8px', border: '1px solid #b3d4ff', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Info size={18} color="#0052cc" />
                <p style={{ fontSize: '0.85rem', color: '#172b4d', margin: 0 }}>
                    <strong>Flexibility Agreements</strong> grant the Service Provider the legal right to aggregate and trade the technical capacity of a Controllable Unit. FIR validates these against <strong>Grid Contracts in Datahub (DHV)</strong> to ensure customer rights.
                </p>
            </div>

            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#42526e', marginBottom: '12px', textTransform: 'uppercase' }}>Current Agreement Portfolio</h4>
            <table style={pocStyles.table}>
                <thead style={{ backgroundColor: '#fafbfc' }}>
                    <tr>
                        <th style={pocStyles.th}>Contract ID</th>
                        <th style={pocStyles.th}>CU ID / Resource</th>
                        <th style={pocStyles.th}>Customer ID</th>
                        <th style={pocStyles.th}>Start Date</th>
                        <th style={pocStyles.th}>Status</th>
                        <th style={{ ...pocStyles.th, textAlign: 'right' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {agreements.length > 0 ? (
                        agreements.slice(0, 10).map((a, idx) => (
                            <tr 
                                key={a.id} 
                                style={{ ...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff' }}
                                onClick={() => onSelectCU(a.id)}
                            >
                                <td style={{ ...pocStyles.td, fontWeight: 600, color: '#42526e' }}>
                                    F-AGR-{a.id.split('-')[1]}-{idx + 100}
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#0052cc', fontWeight: 600 }}>{a.id}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#6b778c' }}>({a.name})</span>
                                    </div>
                                </td>
                                <td style={{ ...pocStyles.td, fontFamily: 'monospace' }}>{a.ownerId}</td>
                                <td style={pocStyles.td}>{a.flexStartDate}</td>
                                <td style={pocStyles.td}>
                                    <span style={{
                                        ...pocStyles.badge,
                                        backgroundColor: a.status === 'Active' ? '#e3fcef' : (a.status === 'Pending' ? '#fff0b3' : '#ffebe6'),
                                        color: a.status === 'Active' ? '#006644' : (a.status === 'Pending' ? '#172b4d' : '#bf2600')
                                    }}>
                                        {a.status.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ ...pocStyles.td, textAlign: 'right' }}>
                                    <button style={{ border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ ...pocStyles.td, textAlign: 'center', color: '#6b778c', padding: '32px', fontStyle: 'italic' }}>
                                No agreements registered in the current portfolio.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};