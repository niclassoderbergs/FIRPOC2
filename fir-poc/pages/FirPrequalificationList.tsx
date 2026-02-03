import React, { useMemo, useState } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Clock, CheckCircle2, MapPin, Box, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCUs } from '../mockData';

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

export const FirPrequalificationList: React.FC<Props> = ({ onSelect }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const pendingCUs = useMemo(() => mockCUs.filter(cu => cu.status === 'Pending'), []);
    const approvedCUs = useMemo(() => mockCUs.filter(cu => cu.status === 'Active'), []); 

    const allRequests = useMemo(() => {
        const combined = [...pendingCUs, ...approvedCUs];
        if (!searchTerm) return combined;
        const lower = searchTerm.toLowerCase();
        return combined.filter(cu => 
            cu.id.toLowerCase().includes(lower) || 
            cu.name.toLowerCase().includes(lower) ||
            cu.gridOwner.toLowerCase().includes(lower)
        );
    }, [pendingCUs, approvedCUs, searchTerm]);

    const totalPages = Math.ceil(allRequests.length / PAGE_SIZE);
    const pagedRequests = useMemo(() => 
        allRequests.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, allRequests]);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>General Grid Prequalification</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Manage base technical authorization from DSOs for market participation.</p>
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New Request
                </button>
            </div>

            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by ID, Name or DSO..." 
                        style={{
                            width: '100%', padding: '10px 10px 10px 40px', borderRadius: '4px', border: '1px solid #dfe1e6', fontSize: '0.9rem', outline: 'none'
                        }} 
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div style={{display: 'flex', gap: '8px'}}>
                    <button style={{...pocStyles.badge, ...pocStyles.badgeBlue, padding: '8px 16px', fontSize: '0.85rem'}}>
                        Awaiting Assessment ({pendingCUs.length})
                    </button>
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={{...pocStyles.th, width: '100px'}}>CU ID</th>
                            <th style={pocStyles.th}>Resource Name</th>
                            <th style={pocStyles.th}>Grid Area</th>
                            <th style={pocStyles.th}>DSO (Auditor)</th>
                            <th style={pocStyles.th}>Prequalification Status</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedRequests.map((cu, idx) => {
                            const isPending = cu.status === 'Pending';
                            return (
                                <tr 
                                    key={cu.id} 
                                    style={{
                                        ...pocStyles.row, 
                                        backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff',
                                        borderLeft: isPending ? '4px solid #ff991f' : '4px solid transparent'
                                    }}
                                    onClick={() => onSelect(cu.id)}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6effc'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                                >
                                    <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            <Box size={14} color="#6b778c"/>
                                            {cu.id}
                                        </div>
                                    </td>
                                    <td style={{...pocStyles.td, fontWeight: 500}}>{cu.name}</td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize: '0.9rem'}}>
                                            <MapPin size={14} color="#6b778c"/> {cu.gridArea}
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>{cu.gridOwner}</td>
                                    <td style={pocStyles.td}>
                                        {isPending ? (
                                            <span style={{
                                                ...pocStyles.badge, 
                                                backgroundColor: '#fff0b3', 
                                                color: '#172b4d', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '4px',
                                                width: 'fit-content'
                                            }}>
                                                <Clock size={12} /> Pending Assessment
                                            </span>
                                        ) : (
                                            <span style={{
                                                ...pocStyles.badge, 
                                                ...pocStyles.badgeGreen,
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '4px',
                                                width: 'fit-content'
                                            }}>
                                                <CheckCircle2 size={12} /> Technical Approved
                                            </span>
                                        )}
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right'}}>
                                        <button style={{border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}>
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedRequests.length} of {allRequests.length} requests
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

            <div style={{marginTop: '24px', padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #b3d4ff', display: 'flex', gap: '16px'}}>
                <Info size={24} color="#0052cc" style={{flexShrink: 0}} />
                <div>
                    <h4 style={{margin: '0 0 6px 0', color: '#0052cc', fontWeight: 700}}>Architectural Note: General vs Product PQ</h4>
                    <p style={{margin: 0, fontSize: '0.85rem', color: '#172b4d', lineHeight: '1.5'}}>
                        <strong>Grid Prequalification</strong> is a general technical approval granted by the DSO to the resource (CU). It verifies that the local grid can handle the resource's capacity. 
                        This is separate from <strong>Product Prequalification</strong>, which tests the resource's ability to deliver specific market products like mFRR or FCR.
                        <br/><br/>
                        <span style={{fontWeight: 700}}>Rule Check:</span> Only resources with status <span style={{color: '#006644'}}>'Active'</span> (Technical Approved) are eligible to be assigned to a Service Providing Group (SPG) for market participation.
                    </p>
                </div>
            </div>
        </div>
    );
};