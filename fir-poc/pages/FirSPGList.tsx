import React, { useMemo, useState } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockSPGs, mockCUs, mockSPGProductApplications } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
    onSelect: (id: string) => void;
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

export const FirSPGList: React.FC<Props> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const filteredSPGs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return mockSPGs.filter(spg => 
            spg.id.toLowerCase().includes(lower) || 
            spg.name.toLowerCase().includes(lower) ||
            spg.fsp.toLowerCase().includes(lower)
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredSPGs.length / PAGE_SIZE);
    const pagedSPGs = useMemo(() => 
        filteredSPGs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, filteredSPGs]);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h1 style={{...pocStyles.pageTitle, marginBottom: 0}}>Service Providing Groups</h1>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New SPG
                </button>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search groups..." 
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
                            <th style={pocStyles.th}>FSP / BSP</th>
                            <th style={pocStyles.th}>Bidding Zone</th>
                            <th style={{ ...pocStyles.th, textAlign: 'right' }}>Total Effekt (MW)</th>
                            <th style={pocStyles.th}>Units</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedSPGs.map((item, idx) => {
                            const unitsInGroup = mockCUs.filter(cu => cu.spgId === item.id);
                            const totalCapacity = unitsInGroup.reduce((acc, curr) => {
                                const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
                                return acc + val;
                            }, 0).toFixed(1);
                            
                            const hasApprovedApps = mockSPGProductApplications.some(
                                app => app.spgId === item.id && app.status === 'Approved'
                            );
                            const hasQualifications = item.qualifications && item.qualifications.length > 0;
                            
                            const isActuallyActive = hasQualifications || hasApprovedApps;
                            const displayStatus = isActuallyActive ? 'Active' : 'Qualification Pending';

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
                                    <td style={pocStyles.td}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                                            <Users size={14} color="#6b778c"/> {item.fsp}
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{fontWeight: 700, color: '#42526e'}}>{item.zone}</span>
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700}}>{totalCapacity} MW</td>
                                    <td style={pocStyles.td}>{unitsInGroup.length}</td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge, 
                                            backgroundColor: isActuallyActive ? '#e3fcef' : '#fff0b3',
                                            color: isActuallyActive ? '#006644' : '#172b4d'
                                        }}>
                                            {displayStatus}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedSPGs.length} of {filteredSPGs.length} groups
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