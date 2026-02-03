
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Link2, ExternalLink, Info, ChevronLeft, ChevronRight, ShieldAlert, AlertTriangle } from 'lucide-react';
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
    },
    unassignedHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginTop: '48px',
        marginBottom: '16px',
        padding: '12px 16px',
        backgroundColor: '#fff1f0',
        borderRadius: '8px',
        border: '1px solid #ffa39e'
    }
};

export const FirCUList: React.FC<Props> = ({ onSelect, onSelectSPG, onSelectParty, onNavigateToParties }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [unassignedPage, setUnassignedPage] = useState(0);

    const filteredCUs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return mockCUs.filter(cu => 
            cu.id.toLowerCase().includes(lower) || 
            cu.name.toLowerCase().includes(lower) ||
            cu.sp.toLowerCase().includes(lower)
        );
    }, [searchTerm]);

    const unassignedCUs = useMemo(() => {
        return mockCUs.filter(cu => !cu.sp || cu.sp.trim() === '');
    }, []);

    const totalPages = Math.ceil(filteredCUs.length / PAGE_SIZE);
    const pagedCUs = useMemo(() => 
        filteredCUs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, filteredCUs]);

    const totalUnassignedPages = Math.ceil(unassignedCUs.length / PAGE_SIZE);
    const pagedUnassigned = useMemo(() =>
        unassignedCUs.slice(unassignedPage * PAGE_SIZE, (unassignedPage + 1) * PAGE_SIZE)
    , [unassignedPage, unassignedCUs]);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
        setUnassignedPage(0);
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

            {/* MAIN LIST SECTION */}
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
                            <th style={pocStyles.th}>SP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedCUs.map((item, idx) => {
                            const spg = mockSPGs.find(s => s.id === item.spgId);
                            const hasNoSp = !item.sp || item.sp.trim() === '';
                            
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
                                        {hasNoSp ? (
                                            <span style={{...pocStyles.badge, backgroundColor: '#fff1f0', color: '#cf1322', display: 'inline-flex', alignItems: 'center', gap: '4px'}}>
                                                <AlertTriangle size={10} /> NO SP
                                            </span>
                                        ) : (
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
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

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

            {/* UNASSIGNED SECTION */}
            <div style={styles.unassignedHeader}>
                <ShieldAlert size={24} color="#cf1322" />
                <div>
                    <h2 style={{margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#820014'}}>Action Required: Resources Lacking Service Provider</h2>
                    <p style={{margin: 0, fontSize: '0.85rem', color: '#a8071a'}}>
                        These <strong>{unassignedCUs.length}</strong> resources are registered but lack a commercial agreement with a Service Provider.
                    </p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fff1f0'}}>
                        <tr>
                            <th style={{...pocStyles.th, color: '#820014'}}>CU ID</th>
                            <th style={{...pocStyles.th, color: '#820014'}}>Name</th>
                            <th style={{...pocStyles.th, color: '#820014'}}>Type</th>
                            <th style={{...pocStyles.th, color: '#820014'}}>Capacity</th>
                            <th style={{...pocStyles.th, color: '#820014'}}>Grid Owner</th>
                            <th style={{...pocStyles.th, color: '#820014'}}>Registration Responsible</th>
                            <th style={{...pocStyles.th, color: '#820014', textAlign: 'right'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedUnassigned.map((item, idx) => (
                            <tr 
                                key={item.id} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fff9f9' : '#fff'}}
                                onClick={() => onSelect(item.id)}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600, color: '#cf1322'}}>{item.id}</td>
                                <td style={{...pocStyles.td, fontWeight: 500}}>{item.name}</td>
                                <td style={pocStyles.td}>{item.type}</td>
                                <td style={pocStyles.td}>{item.capacity} {item.capacityUnit}</td>
                                <td style={pocStyles.td}>{item.gridOwner}</td>
                                <td style={pocStyles.td}>
                                    <div 
                                        style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#0052cc', cursor: 'pointer', fontSize: '0.85rem'}}
                                        onClick={(e) => { e.stopPropagation(); onSelectParty(item.registrationResponsible); }}
                                    >
                                        <ExternalLink size={10} />
                                        {item.registrationResponsible}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'right'}}>
                                    <span style={{...pocStyles.badge, backgroundColor: '#ffd666', color: '#874d00'}}>UNLINKED</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedUnassigned.length} of {unassignedCUs.length} unassigned units
                    </span>
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                        <button 
                            disabled={unassignedPage === 0}
                            onClick={() => setUnassignedPage(p => p - 1)}
                            style={{
                                padding: '6px', borderRadius: '4px', border: '1px solid #ffa39e', 
                                backgroundColor: unassignedPage === 0 ? '#fff1f0' : '#fff',
                                cursor: unassignedPage === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <ChevronLeft size={16} color={unassignedPage === 0 ? '#ffa39e' : '#cf1322'} />
                        </button>
                        <span style={{fontSize: '0.85rem', fontWeight: 600, color: '#820014', margin: '0 8px'}}>
                            Page {unassignedPage + 1} of {totalUnassignedPages || 1}
                        </span>
                        <button 
                            disabled={unassignedPage >= totalUnassignedPages - 1}
                            onClick={() => setUnassignedPage(p => p + 1)}
                            style={{
                                padding: '6px', borderRadius: '4px', border: '1px solid #ffa39e', 
                                backgroundColor: unassignedPage >= totalUnassignedPages - 1 ? '#fff1f0' : '#fff',
                                cursor: unassignedPage >= totalUnassignedPages - 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <ChevronRight size={16} color={unassignedPage >= totalUnassignedPages - 1 ? '#ffa39e' : '#cf1322'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
