import React, { useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Activity, Zap, CheckCircle2, Link2, Clock, FileX } from 'lucide-react';
import { mockSPGProductApplications } from '../mockData';

interface Props {
    onSelectSPG: (id: string) => void;
}

export const FirSPGProductApplications: React.FC<Props> = ({ onSelectSPG }) => {
    
    const ongoingApplications = useMemo(() => 
        mockSPGProductApplications.filter(app => app.status !== 'Approved')
    , []);

    const approvedApplications = useMemo(() => 
        mockSPGProductApplications.filter(app => app.status === 'Approved')
    , []);

    const getPhaseBadge = (status: string) => {
        if (status === 'Approved') return { bg: '#e3fcef', color: '#006644', icon: <CheckCircle2 size={12} /> };
        if (status === 'Rejected') return { bg: '#ffebe6', color: '#bf2600', icon: <FileX size={12} /> };
        if (status === 'Technical Testing' || status === 'Ready for Activation Test') return { bg: '#e6effc', color: '#0052cc', icon: <Activity size={12} /> };
        return { bg: '#fff0b3', color: '#974f0c', icon: <Clock size={12} /> };
    };

    const renderApplicationTable = (apps: typeof mockSPGProductApplications, isApproved: boolean) => (
        <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: isApproved ? '0' : '48px'}}>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={pocStyles.th}>ID</th>
                        <th style={pocStyles.th}>Group (SPG)</th>
                        <th style={pocStyles.th}>Product</th>
                        <th style={pocStyles.th}>Applied</th>
                        <th style={pocStyles.th}>Phase</th>
                        <th style={pocStyles.th}>Progress</th>
                        <th style={pocStyles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {apps.map((app, idx) => {
                        const badge = getPhaseBadge(app.status);
                        const isRejected = app.status === 'Rejected';
                        return (
                            <tr 
                                key={app.id} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>{app.id}</td>
                                <td style={pocStyles.td}>
                                    <div 
                                        style={{display:'flex', flexDirection:'column', cursor: 'pointer', color: '#0052cc'}}
                                        onClick={() => onSelectSPG(app.spgId)}
                                        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                                            <Link2 size={12} />
                                            <span style={{fontWeight: 600}}>{app.spgName}</span>
                                        </div>
                                        <span style={{fontSize: '0.75rem', color: '#6b778c', paddingLeft: '16px'}}>ID: {app.spgId}</span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Zap size={14} color="#d97706" />
                                        <span style={{fontWeight: 700}}>{app.product}</span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>{app.appliedDate}</td>
                                <td style={pocStyles.td}>
                                    <span style={{
                                        ...pocStyles.badge, 
                                        backgroundColor: badge.bg, 
                                        color: badge.color,
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        width: 'fit-content'
                                    }}>
                                        {badge.icon} {app.status}
                                    </span>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                        <div style={{flex: 1, height: '6px', backgroundColor: '#ebecf0', borderRadius: '3px', width: '60px'}}>
                                            <div style={{
                                                width: `${app.progress}%`, 
                                                height: '100%', 
                                                backgroundColor: isRejected ? '#bf2600' : (app.status === 'Approved' ? '#36b37e' : '#0052cc'), 
                                                borderRadius: '3px'
                                            }}></div>
                                        </div>
                                        <span style={{fontSize:'0.75rem', fontWeight: 600}}>{app.progress}%</span>
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'right'}}>
                                    <button style={{border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}>
                                        {isApproved ? 'View Certificate' : (isRejected ? 'View Reason' : 'Process')}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {apps.length === 0 && (
                        <tr>
                            <td colSpan={7} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                No applications found in this category.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>SPG Product Applications</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Market qualification pipeline for aggregate groups.</p>
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New Product Application
                </button>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search applications..." 
                        style={{
                            width: '100%', padding: '10px 10px 10px 40px', borderRadius: '4px', border: '1px solid #dfe1e6', fontSize: '0.9rem', outline: 'none'
                        }} 
                    />
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* SECTION 1: ONGOING */}
            <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Clock size={20} color="#0052cc" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0}}>Ongoing & Evaluated Qualifications</h2>
                <span style={{...pocStyles.badge, ...pocStyles.badgeBlue, marginLeft: '8px'}}>{ongoingApplications.length}</span>
            </div>
            {renderApplicationTable(ongoingApplications, false)}

            {/* SECTION 2: APPROVED */}
            <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <CheckCircle2 size={20} color="#006644" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0}}>Historical Approvals</h2>
                <span style={{...pocStyles.badge, ...pocStyles.badgeGreen, marginLeft: '8px'}}>{approvedApplications.length}</span>
            </div>
            {renderApplicationTable(approvedApplications, true)}

        </div>
    );
};
