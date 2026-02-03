
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Briefcase, Globe, Info, ChevronLeft, ChevronRight, TowerControl, Zap, UserPlus, ShieldCheck } from 'lucide-react';
import { mockBSPs, mockSPs, mockDSOs, mockREs, mockBRPs, mockRegResponsibles } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelect: (name: string) => void;
}

export const FirBspList: React.FC<Props> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const processedBSPs = useMemo(() => {
        return mockBSPs.map(bsp => {
            const name = bsp.name;
            return {
                ...bsp,
                isREG: mockRegResponsibles.some(r => r.name === name),
                isSP: mockSPs.some(s => s.name === name),
                isDSO: mockDSOs.some(d => d.name === name),
                isRE: mockREs.some(r => r.name === name),
                isBRP: mockBRPs.some(b => b.name === name),
                isBSP: true 
            };
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredBSPs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return processedBSPs.filter(bsp => 
            bsp.name.toLowerCase().includes(lower) || 
            bsp.code.toLowerCase().includes(lower) ||
            bsp.businessId.toLowerCase().includes(lower)
        );
    }, [searchTerm, processedBSPs]);

    const totalPages = Math.ceil(filteredBSPs.length / PAGE_SIZE);
    const pagedItems = filteredBSPs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Balance Service Providers (BSP)</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Official registry of qualified Balance Service Providers authorized to submit market bids.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by BSP name, code or Business ID..." 
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
                            <th style={{...pocStyles.th, width: '25%'}}>Actor Name</th>
                            <th style={{...pocStyles.th, width: '35%'}}>Identified Roles</th>
                            <th style={{...pocStyles.th, width: '15%'}}>Code (Ediel)</th>
                            <th style={pocStyles.th}>Country</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((bsp, idx) => (
                            <tr 
                                key={idx} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                onClick={() => onSelect(bsp.name)}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                        <Briefcase size={16} color="#42526e" />
                                        <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                            {bsp.name}
                                        </span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', gap:'6px', flexWrap: 'wrap'}}>
                                        <span style={{...pocStyles.badge, backgroundColor: '#deebff', color: '#0747a6', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Service Provider">
                                            <Briefcase size={10} /> BSP
                                        </span>
                                        {bsp.isSP && <span style={{...pocStyles.badge, backgroundColor: '#e6fffa', color: '#006d5b', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Service Provider"><ShieldCheck size={10} /> SP</span>}
                                        {bsp.isREG && <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Registration Responsible"><UserPlus size={10} /> CU REG RESP</span>}
                                        {bsp.isBRP && <span style={{...pocStyles.badge, backgroundColor: '#e8f5e9', color: '#1b5e20', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Responsible"><Briefcase size={10} /> BRP</span>}
                                        {bsp.isRE && <span style={{...pocStyles.badge, backgroundColor: '#fff3e0', color: '#e65100', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Retailer"><Zap size={10} /> RE</span>}
                                        {bsp.isDSO && <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="DSO"><TowerControl size={10} /> DSO</span>}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, fontFamily: 'monospace'}}>{bsp.code}</td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Globe size={14} color="#6b778c" />
                                        {bsp.country}
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
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedItems.length} of {filteredBSPs.length} results
                    </span>
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
            
            <div style={{marginTop: '24px', padding: '16px', backgroundColor: '#e6effc', borderRadius: '8px', border: '1px solid #b3d4ff', display: 'flex', gap: '12px'}}>
                <Info size={20} color="#0052cc" style={{flexShrink: 0}} />
                <p style={{margin: 0, fontSize: '0.85rem', color: '#172b4d'}}>
                    Registered Balance Service Providers are eligible to submit bids for balancing services and manage flexibility resources.
                </p>
            </div>
        </div>
    );
};
