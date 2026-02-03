
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Link2, ExternalLink, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCUs, mockSPGs } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
    onSelect: (id: string) => void;
    onSelectSPG: (id: string) => void;
    onSelectParty: (name: string) => void;
    onNavigateToParties: () => void;
}

const styles = {
    paginationContainer: {
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #ebecf0',
        backgroundColor: '#fafbfc'
    }
};

export const FirCUList: React.FC<Props> = ({ onSelect, onSelectSPG, onSelectParty, onNavigateToParties }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const filteredCUs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return mockCUs.filter(cu => 
            cu.id.toLowerCase().includes(lower) || 
            cu.name.toLowerCase().includes(lower) ||
            cu.sp.toLowerCase().includes(lower)
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredCUs.length / PAGE_SIZE);
    const pagedCUs = useMemo(() => 
        filteredCUs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, filteredCUs]);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h1 style={{...pocStyles.pageTitle, marginBottom: 0}}>Controllable Units</h1>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New Unit
                </button>
            </div>

            <div style={{backgroundColor: '#e6effc', padding: '12px 16px', borderRadius: '6px', marginBottom: '24px', border: '1px solid #b3d4ff', display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Info size={18} color="#0052cc" />
                <span style={{fontSize: '0.9rem', color: '#0747a6'}}>
                    Managing <strong>{mockCUs.length.toLocaleString()}</strong> resources. Navigating at {PAGE_SIZE} units per page.
                </span>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', marginBottom: '16px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by ID, Name or Party..." 
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
                            <th style={pocStyles.th}>ID</th>
                            <th style={pocStyles.th}>Name</th>
                            <th style={pocStyles.th}>Type</th>
                            <th style={pocStyles.th}>Capacity</th>
                            <th style={pocStyles.th}>Group (SPG)</th>
                            <th style={pocStyles.th}>Status</th>
                            <th style={pocStyles.th}>SP/BSP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedCUs.map((item, idx) => {
                            const spg = mockSPGs.find(s => s.id === item.spgId);
                            
                            return (
                                <tr 
                                    key={item.id} 
                                    style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                    onClick={() => onSelect(item.id)}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6effc'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                                >
                                    <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>{item.id}</td>
                                    <td style={{...pocStyles.td, fontWeight: 500}}>{item.name}</td>
                                    <td style={pocStyles.td}>{item.type}</td>
                                    <td style={pocStyles.td}>{item.capacity} {item.capacityUnit}</td>
                                    <td style={pocStyles.td}>
                                        {spg ? (
                                            <div 
                                                style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#0052cc', cursor: 'pointer'}}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectSPG(spg.id);
                                                }}
                                            >
                                                <Link2 size={12} />
                                                <span style={{fontSize: '0.85rem', fontWeight: 600}}>{spg.name}</span>
                                            </div>
                                        ) : (
                                            <span style={{color: '#6b778c', fontStyle: 'italic', fontSize: '0.8rem'}}>None</span>
                                        )}
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge, 
                                            backgroundColor: item.status === 'Active' ? '#e3fcef' : (item.status === 'Pending' ? '#fff0b3' : '#ffebe6'),
                                            color: item.status === 'Active' ? '#006644' : (item.status === 'Pending' ? '#172b4d' : '#bf2600')
                                        }}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div 
                                            style={{
                                                fontSize: '0.8rem', 
                                                color: '#0052cc', 
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }} 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectParty(item.sp);
                                            }}
                                        >
                                            <ExternalLink size={10} />
                                            {item.sp.length > 20 ? item.sp.substring(0, 18) + '...' : item.sp}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedCUs.length} of {filteredCUs.length} units
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
