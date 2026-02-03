
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Zap, Search, Filter, Globe, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { mockDSOs, mockREs, mockBRPs, mockBSPs } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelect: (name: string) => void;
}

export const FirReList: React.FC<Props> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const sortedData = useMemo(() => {
        return [...mockREs].sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredREs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return sortedData.filter(re => 
            re.name.toLowerCase().includes(lower) || 
            re.code.toLowerCase().includes(lower) ||
            (re as any).brp?.toLowerCase().includes(lower)
        );
    }, [searchTerm, sortedData]);

    const totalPages = Math.ceil(filteredREs.length / PAGE_SIZE);
    const pagedItems = filteredREs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Retail Entities (RE)</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Electricity suppliers holding the primary delivery contracts with customers.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by name, RE code or BRP..." 
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
                            <th style={{...pocStyles.th, width: '25%'}}>Company Name</th>
                            <th style={{...pocStyles.th, width: '20%'}}>Identified Roles</th>
                            <th style={pocStyles.th}>RE Code</th>
                            <th style={{...pocStyles.th, width: '20%'}}>Balance Responsible (BRP)</th>
                            <th style={pocStyles.th}>Scheme</th>
                            <th style={pocStyles.th}>Country</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((re, idx) => {
                            const name = re.name;
                            const isDSO = mockDSOs.some(d => d.name === name);
                            const isBRP = mockBRPs.some(b => b.name === name);
                            const isBSP = mockBSPs.some(s => s.name === name);
                            const brp = (re as any).brp;

                            return (
                                <tr 
                                    key={idx} 
                                    style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                    onClick={() => onSelect(re.name)}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                                >
                                    <td style={{...pocStyles.td, fontWeight: 600}}>
                                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                            <Zap size={16} color="#d97706" />
                                            <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                                {re.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', gap:'4px', flexWrap: 'wrap'}}>
                                            <span style={{...pocStyles.badge, backgroundColor: '#fff3e0', color: '#e65100', fontSize: '0.65rem'}} title="Retailer">RE</span>
                                            {isBSP && <span style={{...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', fontSize: '0.65rem'}} title="Balance Service Provider">BSP</span>}
                                            {isDSO && <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', fontSize: '0.65rem'}} title="DSO">DSO</span>}
                                            {isBRP && <span style={{...pocStyles.badge, backgroundColor: '#e8f5e9', color: '#1b5e20', fontSize: '0.65rem'}} title="Balance Responsible">BRP</span>}
                                        </div>
                                    </td>
                                    <td style={{...pocStyles.td, fontFamily: 'monospace'}}>{re.code}</td>
                                    <td style={pocStyles.td}>
                                        {brp ? (
                                            <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                                <Briefcase size={12} color="#4b2c85"/>
                                                <span style={{fontSize: '0.85rem'}}>{brp}</span>
                                            </div>
                                        ) : (
                                            <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.8rem'}}>-</span>
                                        )}
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{...pocStyles.badge, fontSize: '0.7rem'}}>{re.scheme}</span>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                            <Globe size={14} color="#6b778c" />
                                            {re.country}
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
                        Showing {pagedItems.length} of {filteredREs.length} retailers
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
        </div>
    );
};
