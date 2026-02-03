
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, TowerControl, Globe, ChevronLeft, ChevronRight, Map as MapIcon } from 'lucide-react';
import { mockDSOs, mockREs, mockBRPs, mockBSPs } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelect: (name: string) => void;
}

export const FirDsoList: React.FC<Props> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    // Aggregate unique DSOs from the MGA list
    const uniqueDSOs = useMemo(() => {
        const dsoMap = new Map<string, { name: string, country: string, mgaCount: number }>();
        
        mockDSOs.forEach(dso => {
            if (dsoMap.has(dso.name)) {
                const existing = dsoMap.get(dso.name)!;
                existing.mgaCount += 1;
            } else {
                dsoMap.set(dso.name, {
                    name: dso.name,
                    country: dso.country,
                    mgaCount: 1
                });
            }
        });

        return Array.from(dsoMap.values()).sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
    }, []);

    const filteredDSOs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return uniqueDSOs.filter(dso => dso.name.toLowerCase().includes(lower));
    }, [searchTerm, uniqueDSOs]);

    const totalPages = Math.ceil(filteredDSOs.length / PAGE_SIZE);
    const pagedItems = filteredDSOs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Distribution System Operators (DSO)</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Official registry of legal entities operating electricity distribution networks.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by DSO name..." 
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
                            <th style={{...pocStyles.th, width: '35%'}}>DSO Name</th>
                            <th style={{...pocStyles.th, width: '30%'}}>Identified Roles</th>
                            <th style={{...pocStyles.th, width: '15%'}}>Managed Areas</th>
                            <th style={pocStyles.th}>Country</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((dso, idx) => {
                            const name = dso.name;
                            const isRE = mockREs.some(r => r.name === name);
                            const isBRP = mockBRPs.some(b => b.name === name);
                            const isBSP = mockBSPs.some(s => s.name === name);

                            return (
                                <tr 
                                    key={idx} 
                                    style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                    onClick={() => onSelect(dso.name)}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                                >
                                    <td style={{...pocStyles.td, fontWeight: 600}}>
                                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                            <TowerControl size={16} color="#42526e" />
                                            <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                                {dso.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', gap:'4px'}}>
                                            <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', fontSize: '0.65rem'}} title="DSO">DSO</span>
                                            {isBSP && <span style={{...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', fontSize: '0.65rem'}} title="Balance Service Provider">BSP</span>}
                                            {isRE && <span style={{...pocStyles.badge, backgroundColor: '#fff3e0', color: '#e65100', fontSize: '0.65rem'}} title="Retailer">RE</span>}
                                            {isBRP && <span style={{...pocStyles.badge, backgroundColor: '#e8f5e9', color: '#1b5e20', fontSize: '0.65rem'}} title="Balance Responsible">BRP</span>}
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', alignItems:'center', gap:'6px', fontWeight: 600, color: '#42526e'}}>
                                            <MapIcon size={14} color="#6b778c" />
                                            {dso.mgaCount} {dso.mgaCount === 1 ? 'Area' : 'Areas'}
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                            <Globe size={14} color="#6b778c" />
                                            {dso.country}
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{...pocStyles.badge, ...pocStyles.badgeGreen}}>Active</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
                {/* Pagination Controls */}
                <div style={{padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebecf0', backgroundColor: '#fafbfc'}}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedItems.length} of {filteredDSOs.length} operators
                    </span>
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                        <button 
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(p => p - 1)}
                            style={{
                                padding: '6px', borderRadius: '4px', border: '1px solid #dfe1e6', 
                                backgroundColor: currentPage === 0 ? '#f4f5f7' : '#fff',
                                cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <ChevronLeft size={16} color={currentPage === 0 ? '#a5adba' : '#42526e'} />
                        </button>
                        <span style={{fontSize: '0.85rem', fontWeight: 600, color: '#172b4d', margin: '0 8px'}}>
                            Page {currentPage + 1} of {totalPages || 1}
                        </span>
                        <button 
                            disabled={currentPage >= totalPages - 1}
                            onClick={() => setCurrentPage(p => p + 1)}
                            style={{
                                padding: '6px', borderRadius: '4px', border: '1px solid #dfe1e6', 
                                backgroundColor: currentPage >= totalPages - 1 ? '#f4f5f7' : '#fff',
                                cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <ChevronRight size={16} color={currentPage >= totalPages - 1 ? '#a5adba' : '#42526e'} />
                        </button>
                    </div>
                </div>
            </div>
            <p style={{textAlign: 'center', color: '#6b778c', fontSize: '0.8rem', marginTop: '16px'}}>
                Click on a DSO name to view detailed Metering Grid Area (MGA) associations and bidding zone connectivity.
            </p>
        </div>
    );
};
