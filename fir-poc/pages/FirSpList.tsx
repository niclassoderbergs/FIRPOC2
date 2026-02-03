
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, ShieldCheck, Globe, Info, ChevronLeft, ChevronRight, UserCheck, Briefcase, Zap, TowerControl, UserPlus } from 'lucide-react';
import { mockSPs, mockBSPs, mockREs, mockBRPs, mockDSOs, mockRegResponsibles, mockCUs } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelect: (name: string) => void;
}

export const FirSpList: React.FC<Props> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const processedSPs = useMemo(() => {
        return mockSPs.map(sp => {
            const name = sp.name;
            const resourceCount = mockCUs.filter(cu => cu.sp === name).length;

            return {
                ...sp,
                isREG: mockRegResponsibles.some(r => r.name === name),
                isBSP: mockBSPs.some(b => b.name === name),
                isDSO: mockDSOs.some(d => d.name === name),
                isRE: mockREs.some(r => r.name === name),
                isBRP: mockBRPs.some(br => br.name === name),
                isSP: true,
                resourceCount
            };
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredSPs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return processedSPs.filter(sp => 
            sp.name.toLowerCase().includes(lower) || 
            (sp.code && sp.code.toLowerCase().includes(lower)) ||
            (sp.businessId && sp.businessId.toLowerCase().includes(lower))
        );
    }, [searchTerm, processedSPs]);

    const totalPages = Math.ceil(filteredSPs.length / PAGE_SIZE);
    const pagedItems = filteredSPs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Service Providers (SP)</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Central registry of all authorized Service Providers managing flexibility resources.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by SP name, code or Business ID..." 
                        style={{
                            width: '100%', padding: '10px 10px 10px 40px', borderRadius: '4px', border: '1px solid #dfe1e6', fontSize: '0.9rem', outline: 'none'
                        }} 
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={{...pocStyles.th, width: '30%'}}>SP Actor Name</th>
                            <th style={{...pocStyles.th, width: '30%'}}>Identified Roles</th>
                            <th style={{...pocStyles.th, width: '10%', textAlign: 'center'}}>CUs</th>
                            <th style={{...pocStyles.th, width: '15%'}}>Code / EIC</th>
                            <th style={pocStyles.th}>Country</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((sp, idx) => (
                            <tr 
                                key={idx} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                onClick={() => onSelect(sp.name)}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                        <ShieldCheck size={16} color="#42526e" />
                                        <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                            {sp.name}
                                        </span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', gap:'4px', flexWrap: 'wrap'}}>
                                        <span style={{...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Service Provider">
                                            <ShieldCheck size={10} /> SP
                                        </span>
                                        {sp.isBSP && <span style={{...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Service Provider"><Briefcase size={10} /> BSP</span>}
                                        {sp.isREG && <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Registration Responsible"><UserPlus size={10} /> CU REG RESP</span>}
                                        {sp.isBRP && <span style={{...pocStyles.badge, backgroundColor: '#e8f5e9', color: '#1b5e20', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Responsible"><Briefcase size={10} /> BRP</span>}
                                        {sp.isRE && <span style={{...pocStyles.badge, backgroundColor: '#fff3e0', color: '#e65100', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Retailer"><Zap size={10} /> RE</span>}
                                        {sp.isDSO && <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="DSO"><TowerControl size={10} /> DSO</span>}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'center'}}>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600, color: '#42526e'}}>
                                        <UserCheck size={14} color="#6b778c" />
                                        {sp.resourceCount}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, fontFamily: 'monospace', fontSize: '0.8rem'}}>
                                    {sp.code && sp.code.length > 5 ? sp.code : <span style={{color: '#999', fontStyle: 'italic'}}>Pending</span>}
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Globe size={14} color="#6b778c" />
                                        {sp.country}
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <span style={{...pocStyles.badge, ...pocStyles.badgeGreen}}>Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebecf0', backgroundColor: '#fafbfc'}}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>Showing {pagedItems.length} of {filteredSPs.length} results</span>
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                        <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)} style={{padding: '6px', borderRadius: '4px', border: '1px solid #dfe1e6', backgroundColor: currentPage === 0 ? '#f4f5f7' : '#fff', cursor: currentPage === 0 ? 'not-allowed' : 'pointer'}}>
                            <ChevronLeft size={16} color={currentPage === 0 ? '#a5adba' : '#42526e'} />
                        </button>
                        <span style={{fontSize: '0.85rem', fontWeight: 600, color: '#172b4d', margin: '0 8px'}}>Page {currentPage + 1} of {totalPages || 1}</span>
                        <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)} style={{padding: '6px', borderRadius: '4px', border: '1px solid #dfe1e6', backgroundColor: currentPage >= totalPages - 1 ? '#f4f5f7' : '#fff', cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer'}}>
                            <ChevronRight size={16} color={currentPage >= totalPages - 1 ? '#a5adba' : '#42526e'} />
                        </button>
                    </div>
                </div>
            </div>
            
            <div style={{marginTop: '24px', padding: '16px', backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #b3d4ff', display: 'flex', gap: '12px'}}>
                <Info size={20} color="#0052cc" style={{flexShrink: 0}} />
                <p style={{margin: 0, fontSize: '0.85rem', color: '#172b4d'}}>
                    <strong>Service Providers (SP)</strong> are responsible for managing the commercial agreements with resource owners. They act as the primary interface between the technical resource (CU) and the commercial market aggregation (SPG/SPU).
                </p>
            </div>
        </div>
    );
};
