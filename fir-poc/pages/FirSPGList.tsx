
import React, { useMemo, useState, useEffect } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Users, ChevronLeft, ChevronRight, Globe, TowerControl, Layers } from 'lucide-react';
import { mockSPGs, mockCUs, mockSPGProductApplications } from '../mockData';
import { SPG } from '../types';

const PAGE_SIZE = 20;

interface Props {
    onSelect: (id: string) => void;
}

const styles = {
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        marginTop: '32px'
    },
    sectionTitle: {
        fontSize: '1.2rem',
        fontWeight: 700,
        color: '#172b4d',
        margin: 0
    },
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
    const [tsoPage, setTsoPage] = useState(0);
    const [dsoPage, setDsoPage] = useState(0);

    // Reset pagination when searching
    useEffect(() => {
        setTsoPage(0);
        setDsoPage(0);
    }, [searchTerm]);

    const filteredSPGs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return mockSPGs.filter(spg => 
            spg.id.toLowerCase().includes(lower) || 
            spg.name.toLowerCase().includes(lower) ||
            spg.fsp.toLowerCase().includes(lower)
        );
    }, [searchTerm]);

    const { tsoSPGs, dsoSPGs } = useMemo(() => {
        return {
            tsoSPGs: filteredSPGs.filter(s => s.marketType === 'TSO'),
            dsoSPGs: filteredSPGs.filter(s => {
                if (s.marketType !== 'Local') return false;
                // Only include Local SPGs that actually have resources assigned
                const unitsInGroup = mockCUs.filter(cu => cu.spgId === s.id || cu.localSpgId === s.id);
                return unitsInGroup.length > 0;
            })
        };
    }, [filteredSPGs]);

    const pagedTSO = useMemo(() => 
        tsoSPGs.slice(tsoPage * PAGE_SIZE, (tsoPage + 1) * PAGE_SIZE)
    , [tsoPage, tsoSPGs]);

    const pagedDSO = useMemo(() => 
        dsoSPGs.slice(dsoPage * PAGE_SIZE, (dsoPage + 1) * PAGE_SIZE)
    , [dsoPage, dsoSPGs]);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
    };

    const renderTable = (items: SPG[], totalCount: number, currentPage: number, onPageChange: (page: number) => void) => {
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        return (
            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: '24px'}}>
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
                        {items.map((item, idx) => {
                            const unitsInGroup = mockCUs.filter(cu => cu.spgId === item.id || cu.localSpgId === item.id);
                            const totalCapacity = unitsInGroup.reduce((acc, curr) => {
                                const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
                                return acc + val;
                            }, 0).toFixed(1);
                            
                            const hasApprovedApps = mockSPGProductApplications.some(
                                app => app.spgId === item.id && app.status === 'Approved'
                            );
                            const hasQualifications = item.qualifications && item.qualifications.length > 0;
                            const isActuallyActive = hasQualifications || hasApprovedApps;

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
                                            {isActuallyActive ? 'Active' : 'Qualification Pending'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{...pocStyles.td, textAlign: 'center', color: '#6b778c', padding: '32px', fontStyle: 'italic'}}>
                                    No groups found matching the criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {totalCount > PAGE_SIZE && (
                    <div style={styles.paginationContainer}>
                        <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                            Showing {items.length} of {totalCount} groups
                        </span>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <button 
                                disabled={currentPage === 0}
                                onClick={(e) => { e.stopPropagation(); onPageChange(currentPage - 1); }}
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
                                onClick={(e) => { e.stopPropagation(); onPageChange(currentPage + 1); }}
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
                )}
            </div>
        );
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h1 style={{...pocStyles.pageTitle, marginBottom: 0}}>Service Providing Groups</h1>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New SPG
                </button>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search groups by ID, Name or FSP..." 
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

            {/* TSO SECTION */}
            <div style={styles.sectionHeader}>
                <div style={{backgroundColor: '#e6effc', padding: '8px', borderRadius: '8px', color: '#0052cc'}}>
                    <Globe size={20} />
                </div>
                <div>
                    <h2 style={styles.sectionTitle}>TSO Portfolios</h2>
                    <span style={{fontSize: '0.8rem', color: '#6b778c'}}>Transmission System Balancing Markets • {tsoSPGs.length} groups</span>
                </div>
            </div>
            {renderTable(pagedTSO, tsoSPGs.length, tsoPage, setTsoPage)}

            {/* DSO SECTION */}
            <div style={{...styles.sectionHeader, marginTop: '48px'}}>
                <div style={{backgroundColor: '#f3e5f5', padding: '8px', borderRadius: '8px', color: '#4a148c'}}>
                    <TowerControl size={20} />
                </div>
                <div>
                    <h2 style={styles.sectionTitle}>DSO & Local Portfolios</h2>
                    <span style={{fontSize: '0.8rem', color: '#6b778c'}}>Regional Flexibility & Congestion Management • {dsoSPGs.length} groups</span>
                </div>
            </div>
            {renderTable(pagedDSO, dsoSPGs.length, dsoPage, setDsoPage)}

        </div>
    );
};
