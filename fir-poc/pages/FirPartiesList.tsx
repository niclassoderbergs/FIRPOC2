
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Briefcase, Zap, TowerControl, Globe, Users, ChevronLeft, ChevronRight, UserPlus, ShieldCheck } from 'lucide-react';
import { mockDSOs, mockREs, mockBRPs, mockBSPs, mockCUs } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelect: (name: string) => void;
}

// Simple deterministic MWh mocker
const getMockedMWh = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 4500) + 120;
};

export const FirPartiesList: React.FC<Props> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    // Aggregate all unique party names across all registries and sort
    const aggregatedParties = useMemo(() => {
        const nameSet = new Set<string>();
        
        mockDSOs.forEach(d => nameSet.add(d.name));
        mockREs.forEach(r => nameSet.add(r.name));
        mockBRPs.forEach(b => nameSet.add(b.name));
        mockBSPs.forEach(s => nameSet.add(s.name));
        mockCUs.forEach(c => nameSet.add(c.registrationResponsible));

        const list = Array.from(nameSet).map(name => {
            const isBSP = mockBSPs.some(s => s.name === name);
            const isSP = isBSP || mockCUs.some(c => c.sp === name); // Requirement: All BSP are also SP

            return {
                name,
                isDSO: mockDSOs.some(d => d.name === name),
                isRE: mockREs.some(r => r.name === name),
                isBRP: mockBRPs.some(b => b.name === name),
                isBSP,
                isSP,
                isREG: mockCUs.some(c => c.registrationResponsible === name),
                mwh: getMockedMWh(name),
                country: 'SE' 
            };
        });

        return list.sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredParties = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return aggregatedParties.filter(p => p.name.toLowerCase().includes(lower));
    }, [searchTerm, aggregatedParties]);

    const totalPages = Math.ceil(filteredParties.length / PAGE_SIZE);
    const pagedItems = filteredParties.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Global Parties Overview</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Central registry aggregating all registered market actors and their identified roles.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search for a company (e.g. Vattenfall, E.ON, Bixia)..." 
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
                            <th style={{...pocStyles.th, width: '30%'}}>Company Name</th>
                            <th style={{...pocStyles.th, width: '30%'}}>Identified Roles</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Activity (MWh)</th>
                            <th style={pocStyles.th}>Country</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((party, idx) => (
                            <tr 
                                key={idx} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                onClick={() => onSelect(party.name)}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                        <Users size={16} color="#42526e" />
                                        <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                            {party.name}
                                        </span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', gap:'6px', flexWrap: 'wrap'}}>
                                        {party.isREG && (
                                            <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Registration Responsible">
                                                <UserPlus size={10} /> CU REG RESP
                                            </span>
                                        )}
                                        {party.isSP && (
                                            <span style={{...pocStyles.badge, backgroundColor: '#e6fffa', color: '#006d5b', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Service Provider">
                                                <ShieldCheck size={10} /> SP
                                            </span>
                                        )}
                                        {party.isBSP && (
                                            <span style={{...pocStyles.badge, backgroundColor: '#deebff', color: '#0747a6', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Service Provider">
                                                <Briefcase size={10} /> BSP
                                            </span>
                                        )}
                                        {party.isDSO && (
                                            <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Grid Owner">
                                                <TowerControl size={10} /> DSO
                                            </span>
                                        )}
                                        {party.isRE && (
                                            <span style={{...pocStyles.badge, backgroundColor: '#fff3e0', color: '#e65100', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Retailer">
                                                <Zap size={10} /> RE
                                            </span>
                                        )}
                                        {party.isBRP && (
                                            <span style={{...pocStyles.badge, backgroundColor: '#e8f5e9', color: '#1b5e20', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Responsible">
                                                <Briefcase size={10} /> BRP
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#42526e'}}>
                                    {party.mwh.toLocaleString()} MWh
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Globe size={14} color="#6b778c" />
                                        {party.country}
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <span style={{...pocStyles.badge, ...pocStyles.badgeGreen}}>Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div style={{padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebecf0', backgroundColor: '#fafbfc'}}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedItems.length} of {filteredParties.length} entities
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
            <div style={{padding: '16px', color: '#6b778c', fontSize: '0.8rem', textAlign: 'center'}}>
                Aggregation logic: Entities with Balance Service Provider (BSP) status are automatically identified as Service Providers (SP).
            </div>
        </div>
    );
};
