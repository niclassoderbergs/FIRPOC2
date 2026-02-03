
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Gavel, CheckCircle2, AlertTriangle, Link2, Clock, BarChart3, Info, MapPin, Zap, Calendar, TrendingUp, ChevronLeft, ChevronRight, ShieldAlert, Lightbulb } from 'lucide-react';
import { mockBids, mockCUs, mockMarketStats } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelectBid: (id: string) => void;
  onSelectSPG: (id: string) => void;
  onSelectParty: (name: string) => void;
}

const styles = {
    sectionHeader: {
        fontSize: '1rem',
        fontWeight: 700,
        color: '#172b4d',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center', gap: '10px',
        paddingTop: '24px'
    },
    statusBadge: {
        display: 'inline-flex',
        alignItems: 'center', gap: '4px',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 700
    },
    marketHint: {
        fontSize: '0.65rem',
        color: '#6b778c',
        marginTop: '2px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    paginationContainer: {
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #ebecf0',
        backgroundColor: '#fafbfc'
    },
    rejectionReason: {
        fontSize: '0.7rem',
        color: '#bf2600',
        fontWeight: 600,
        marginTop: '4px',
        display: 'block'
    }
};

// Synced with product-ids in mockData
const PRODUCTS = ['mFRR', 'aFRR', 'FCR-N', 'FCR-D-UP', 'FCR-D-DOWN', 'LOCAL-FLEX'];

const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
    'mFRR': 'mFRR',
    'aFRR': 'aFRR',
    'FCR-N': 'FCR-N',
    'FCR-D-UP': 'FCR-D Up',
    'FCR-D-DOWN': 'FCR-D Down',
    'LOCAL-FLEX': 'Local Flex'
};

export const FirBidsReceived: React.FC<Props> = ({ onSelectBid, onSelectSPG, onSelectParty }) => {
    const [currentPage, setCurrentPage] = useState(0);
    
    const getSpgTotalCapacity = (spgId: string) => {
        const units = mockCUs.filter(cu => cu.spgId === spgId);
        return units.reduce((acc, curr) => {
            const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
            return acc + val;
        }, 0);
    };

    const sortedAllBids = useMemo(() => 
        [...mockBids].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    , []);

    const totalPages = Math.ceil(sortedAllBids.length / PAGE_SIZE);
    const pagedBids = useMemo(() => 
        sortedAllBids.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, sortedAllBids]);

    const productBids = useMemo(() => {
        const map: Record<string, any[]> = {};
        PRODUCTS.forEach(p => {
            map[p] = mockBids
                .filter(b => b.productId === p)
                .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 5); 
        });
        return map;
    }, []);

    const renderBidRows = (bids: any[], isMainList: boolean) => (
        bids.map((bid, idx) => {
            const portfolioCap = getSpgTotalCapacity(bid.spgId);
            const isOverbid = bid.volumeMW > portfolioCap;
            
            // Logic to force 3 rejections on the current page for demo purposes
            const forceReject = isMainList && idx < 3 && currentPage === 0;
            const isValid = bid.status === 'Valid' && !isOverbid && !forceReject;
            
            // Determine rejection reason
            let reason = "";
            if (forceReject) {
                if (idx === 0) reason = "EXCEEDS TECHNICAL CAPACITY";
                if (idx === 1) reason = "GRID CONSTRAINT (AREA RED)";
                if (idx === 2) reason = "TELEMETRY TIMEOUT";
            } else if (isOverbid) {
                reason = "VOLUME > QUALIFIED MW";
            }

            const dateObj = new Date(bid.timestamp);
            const marketStat = mockMarketStats.find(s => s.productId === bid.productId);
            
            return (
                <tr key={bid.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                    <td 
                        style={{...pocStyles.td, fontWeight: 600, color: '#0052cc', textDecoration: 'underline', cursor: 'pointer'}}
                        onClick={() => onSelectBid(bid.id)}
                    >
                        {bid.id}
                    </td>
                    <td style={{...pocStyles.td}}>
                        <div 
                            style={{display:'flex', alignItems:'center', gap:'6px', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}
                            onClick={() => onSelectSPG(bid.spgId)}
                        >
                            <Link2 size={12} />
                            <span style={{textDecoration: 'underline'}}>{bid.spgId}</span>
                        </div>
                        <div style={{fontSize: '0.75rem', color: '#6b778c', marginLeft: '18px'}}>
                            {bid.bsp}
                        </div>
                    </td>
                    <td style={pocStyles.td}>
                        <span style={{...pocStyles.badge, ...pocStyles.badgeBlue, display: 'inline-flex', alignItems: 'center', gap: '4px'}}>
                            <Zap size={10} /> {PRODUCT_DISPLAY_NAMES[bid.productId] || bid.productId}
                        </span>
                    </td>
                    <td style={pocStyles.td}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#42526e', fontWeight: 600}}>
                            <MapPin size={12} /> {bid.zone}
                        </div>
                    </td>
                    <td style={pocStyles.td}>
                        <div style={{display:'flex', flexDirection:'column', gap:'2px'}}>
                            <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize: '0.8rem', color: '#172b4d', fontWeight: 600}}>
                                <Calendar size={12} color="#6b778c" />
                                {dateObj.toLocaleDateString()}
                            </div>
                            <div style={{display:'flex', alignItems:'center', gap:'4px', fontSize: '0.8rem', color: '#6b778c'}}>
                                <Clock size={12} />
                                MTU {bid.period}
                            </div>
                        </div>
                    </td>
                    <td style={{...pocStyles.td, textAlign: 'right'}}>
                        <span style={{fontWeight: 700, color: '#6b778c'}}>{bid.availableCapacityMW.toFixed(1)} MW</span>
                    </td>
                    <td style={{...pocStyles.td, textAlign: 'right'}}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <span style={{fontWeight: 800, color: isOverbid ? '#bf2600' : '#172b4d'}}>{bid.volumeMW.toFixed(1)} MW</span>
                            {marketStat && (
                                <div style={styles.marketHint} title="Average bid size in the Swedish market for this product">
                                    <TrendingUp size={10} /> Mkt Avg: {marketStat.avgBidSizeMW} MW
                                </div>
                            )}
                        </div>
                    </td>
                    <td style={pocStyles.td}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span style={{
                                ...styles.statusBadge,
                                backgroundColor: isValid ? '#e3fcef' : '#ffebe6',
                                color: isValid ? '#006644' : '#bf2600',
                                border: `1px solid ${isValid ? '#36b37e' : '#ff5630'}50`,
                                width: 'fit-content'
                            }}>
                                {isValid ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                                {isValid ? 'VALID' : 'INVALID'}
                            </span>
                            {!isValid && reason && (
                                <span style={styles.rejectionReason}>
                                    {reason}
                                </span>
                            )}
                        </div>
                    </td>
                </tr>
            );
        })
    );

    return (
        <div style={pocStyles.content}>
            <div style={{backgroundColor: '#e6effc', borderLeft: '4px solid #0052cc', padding: '24px 32px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 4px 12px rgba(0, 82, 204, 0.08)'}}>
                <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                    <div style={{ backgroundColor: '#0052cc', padding: '6px', borderRadius: '6px', color: 'white' }}>
                        <Lightbulb size={20} />
                    </div>
                    <strong style={{color: '#0747a6', fontSize: '1.1rem'}}>CONCEPT PROPOSAL — BRS-FLEX-7010: Automated Capacity Check</strong>
                </div>
                <p style={{margin: 0, fontSize: '1rem', color: '#172b4d', lineHeight: '1.6'}}>
                    This is a conceptual proposal on how <strong>FIR can assist TSOs and DSOs</strong> in effectively controlling the bids they receive. 
                    Incoming bids are automatically validated against the <strong>aggregated technical capacity</strong> of the resources (CUs) included in the portfolio. 
                    The system also cross-references with <strong>BRS-FLEX-401</strong> (Grid Constraints) in real-time to ensure operational security before the bid is accepted on the market.
                </p>
            </div>

            <h2 style={{...styles.sectionHeader, paddingTop: 0}}>
                <BarChart3 size={20} color="#0052cc" /> Received Bids Queue
            </h2>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: '32px'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Bid Reference</th>
                            <th style={pocStyles.th}>Portfolio (SPG)</th>
                            <th style={pocStyles.th}>Product</th>
                            <th style={pocStyles.th}>Bid Zone</th>
                            <th style={pocStyles.th}>Period</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Available (MW)</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Bid (MW)</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderBidRows(pagedBids, true)}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedBids.length} of {sortedAllBids.length} bids
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

            <div style={{borderTop: '1px solid #ebecf0', marginTop: '48px', paddingTop: '24px'}}>
                <h2 style={{fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px'}}>Latest activity per product (Preview)</h2>
                {PRODUCTS.map(p => (
                    <div key={p}>
                        <h3 style={styles.sectionHeader}>
                            <Gavel size={18} color="#42526e" /> {PRODUCT_DISPLAY_NAMES[p] || p} Recent Validation
                        </h3>
                        <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: '16px'}}>
                            <table style={pocStyles.table}>
                                <thead style={{backgroundColor: '#fafbfc'}}>
                                    <tr>
                                        <th style={pocStyles.th}>Reference</th>
                                        <th style={pocStyles.th}>Portfolio (SPG)</th>
                                        <th style={pocStyles.th}>Period</th>
                                        <th style={{...pocStyles.th, textAlign: 'right'}}>Available (MW)</th>
                                        <th style={{...pocStyles.th, textAlign: 'right'}}>Bid (MW)</th>
                                        <th style={pocStyles.th}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderBidRows(productBids[p], false)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
