
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, UserPlus, Globe, ChevronLeft, ChevronRight, Box, Settings } from 'lucide-react';
import { mockRegResponsibles, mockSPs, mockCUs } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelect: (name: string) => void;
}

export const FirRegResponsibleList: React.FC<Props> = ({ onSelect }) => {
    // ORDAGRANT: Ändrat från hårdkodat ID till null för att visa tabellen initialt
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    // Process all reg responsibles and match against active units
    const processedList = useMemo(() => {
        return mockRegResponsibles.map(reg => {
            const registeredUnits = mockCUs.filter(cu => cu.registrationResponsible === reg.name);
            const isCommercialSP = mockSPs.some(sp => sp.name === reg.name);
            
            return {
                ...reg,
                count: registeredUnits.length,
                isCommercialSP
            };
        }).sort((a, b) => {
            // Sort by active units first, then alphabetically
            if (b.count !== a.count) return b.count - a.count;
            return a.name.localeCompare(b.name);
        });
    }, []);

    const filtered = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return processedList.filter(r => 
            r.name.toLowerCase().includes(lower) || 
            r.code.toLowerCase().includes(lower) ||
            r.businessId.toLowerCase().includes(lower)
        );
    }, [searchTerm, processedList]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const pagedItems = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    if (selectedId) {
        return (
            <div style={pocStyles.content}>
                <button onClick={() => setSelectedId(null)} style={pocStyles.actionButton}>Back to list</button>
                <div style={{marginTop: '20px'}}>Internal Detail View for {selectedId}</div>
            </div>
        );
    }

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>CU Registration Responsibles</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Central registry of entities authorized to technically onboard resources into the FIR.</p>
                </div>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by registrant name, ID or Business ID..." 
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
                            <th style={{...pocStyles.th, width: '30%'}}>Entity Name</th>
                            <th style={{...pocStyles.th, width: '25%'}}>Role Attributes</th>
                            <th style={{...pocStyles.th, textAlign: 'center'}}>CUs Registered</th>
                            <th style={pocStyles.th}>ID Code</th>
                            <th style={pocStyles.th}>Country</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((item, idx) => (
                            <tr 
                                key={idx} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}} 
                                onClick={() => onSelect(item.name)}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                        <UserPlus size={16} color="#4a148c" />
                                        <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                            {item.name}
                                        </span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', gap:'4px'}}>
                                        <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', fontSize: '0.65rem'}} title="Registration Responsible">REG</span>
                                        {item.isCommercialSP && (
                                            <span style={{...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', fontSize: '0.65rem'}} title="Also Service Provider">SP</span>
                                        )}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'center'}}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', fontWeight: item.count > 0 ? 700 : 400, color: item.count > 0 ? '#172b4d' : '#6b778c'}}>
                                        <Box size={14} color={item.count > 0 ? "#0052cc" : "#6b778c"} />
                                        {item.count.toLocaleString()}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, fontFamily: 'monospace', fontSize: '0.8rem'}}>
                                    {item.code}
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Globe size={14} color="#6b778c" />
                                        {item.country}
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <span style={{...pocStyles.badge, ...pocStyles.badgeGreen}}>Authorized</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebecf0', backgroundColor: '#fafbfc'}}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedItems.length} of {filtered.length} authorized entities
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
            
            <div style={{marginTop: '24px', padding: '16px', backgroundColor: '#f9f8ff', borderRadius: '8px', border: '1px solid #e1bee7', display: 'flex', gap: '12px'}}>
                <Settings size={20} color="#4a148c" style={{flexShrink: 0}} />
                <p style={{margin: 0, fontSize: '0.85rem', color: '#4a148c'}}>
                    <strong>CU Registration Responsible (CURR)</strong> is the role responsible for the technical registration and decommissioning of units. 
                    While most Service Providers (SP) handle this themselves, dedicated technical consultants or installers can also be authorized for this specific role.
                </p>
            </div>
        </div>
    );
};
