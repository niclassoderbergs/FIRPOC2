
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Gavel, CheckCircle2, AlertTriangle, Link2, Clock, BarChart3, Info, MapPin, Zap, Calendar, TrendingUp, ChevronLeft, ChevronRight, ShieldAlert, Lightbulb, Globe, TowerControl } from 'lucide-react';
import { mockBids, mockCUs, mockMarketStats, svkProducts } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelectBid: (id: string) => void;
  onSelectSPG: (id: string) => void;
  onSelectParty: (name: string) => void;
}

const styles = {
    sectionHeader: {
        fontSize: '1.2rem',
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

const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
    'mFRR': 'mFRR',
    'aFRR': 'aFRR',
    'FCR-N': 'FCR-N',
    'FCR-D-UP': 'FCR-D Up',
    'FCR-D-DOWN': 'FCR-D Down',
    'LOCAL-FLEX': 'Local Flex'
};

export const FirBidsReceived: React.FC<Props> = ({ onSelectBid, onSelectSPG, onSelectParty }) => {
    const [pageTso, setPageTso] = useState(0);
    const [pageDso, setPageDso] = useState(0);
    
    const getSpgTotalCapacity = (spgId: string) => {
        const units = mockCUs.filter(cu => cu.spgId === spgId || cu.localSpgId === spgId);
        return units.reduce((acc, curr) => {
            const val = curr.capacityUnit === 'kW' ? curr.capacity / 1000 : curr.capacity;
            return acc + val;
        }, 0);
    };

    const { tsoBids, dsoBids } = useMemo(() => {
        const sorted = [...mockBids].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return {
            tsoBids: sorted.filter(b => !b.productId.startsWith('LM-')),
            dsoBids: sorted.filter(b => b.productId.startsWith('LM-'))
        };
    }, []);

    const pagedTsoBids = useMemo(() => 
        tsoBids.slice(pageTso * PAGE_SIZE, (pageTso + 1) * PAGE_SIZE)
    , [pageTso, tsoBids]);

    const pagedDsoBids = useMemo(() => 
        dsoBids.slice(pageDso * PAGE_SIZE, (pageDso + 1) * PAGE_SIZE)
    , [pageDso, dsoBids]);

    const renderBidRows = (bids: any[], isDso: boolean) => (
        bids.map((bid, idx) => {
            const portfolioCap = getSpgTotalCapacity(bid.spgId);
            const isOverbid = bid.volumeMW > portfolioCap;
            
            // Artificial demo logic for rejections in first few rows of first page
            const isFirstPage = (isDso ? pageDso : pageTso) === 0;
            const forceReject = idx < 3 && isFirstPage;
            const isValid = bid.status === 'Valid' && !isOverbid && !forceReject;
            
            let reason = "";
            if (forceReject) {
                if (idx === 0) reason = "EXCEEDS TECHNICAL CAPACITY";
                if (idx === 1) reason = "GRID CONSTRAINT (AREA RED)";
                if (idx === 2) reason = isDso ? "CROSS-MARKET CONFLICT (CU ACTIVE IN TSO)" : "CROSS-MARKET CONFLICT (CU ACTIVE IN DSO)";
            } else if (isOverbid) {
                reason = "VOLUME > QUALIFIED MW";
            }

            const dateObj = new Date(bid.timestamp);
            const marketStat = mockMarketStats.find(s => s.productId === bid.productId);
            const productMeta = svkProducts.find(p => p.id === bid.productId);
            
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
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#172b4d', fontWeight: 600}}>
                                {isDso ? <TowerControl size={12} color="#4a148c" /> : <Globe size={12} color="#0052cc" />}
                                {productMeta?.market || (isDso ? 'Local Market' : 'TSO Balancing')}
                            </div>
                        </div>
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
                                <div style={styles.marketHint}>
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

    const renderBidTable = (title: string, icon: any, bids: any[], currentPage: number, setPage: (p: number) => void, totalCount: number, isDso: boolean) => {
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        return (
            <>
                <h2 style={styles.sectionHeader}>
                    {icon} {title}
                </h2>
                <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: '32px'}}>
                    <table style={pocStyles.table}>
                        <thead style={{backgroundColor: '#fafbfc'}}>
                            <tr>
                                <th style={pocStyles.th}>Bid Reference</th>
                                <th style={pocStyles.th}>Portfolio (SPG)</th>
                                <th style={pocStyles.th}>Product</th>
                                <th style={pocStyles.th}>Market</th>
                                <th style={pocStyles.th}>Bid Zone</th>
                                <th style={pocStyles.th}>Period</th>
                                <th style={{...pocStyles.th, textAlign: 'right'}}>Available (MW)</th>
                                <th style={{...pocStyles.th, textAlign: 'right'}}>Bid (MW)</th>
                                <th style={pocStyles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids.length > 0 ? renderBidRows(bids, isDso) : (
                                <tr>
                                    <td colSpan={9} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>No bids found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {totalCount > PAGE_SIZE && (
                        <div style={styles.paginationContainer}>
                            <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                                Showing {bids.length} of {totalCount} bids
                            </span>
                            <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                <button 
                                    disabled={currentPage === 0}
                                    onClick={() => setPage(currentPage - 1)}
                                    style={{
                                        padding: '6px', borderRadius: '4px', border: '1px solid #dfe1e6', 
                                        backgroundColor: currentPage === 0 ? '#f4f5f7' : '#fff',
                                        cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <ChevronLeft size={16} color={currentPage === 0 ? '#a5adba' : '#42526e'} />
                                </button>
                                <span style={{fontSize: '0.85rem', fontWeight: 600, color: '#172b4d', margin: '0 8px'}}>
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <button 
                                    disabled={currentPage >= totalPages - 1}
                                    onClick={() => setPage(currentPage + 1)}
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
            </>
        );
    };

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
                    Incoming bids are automatically validated against the <strong>aggregated technical capacity</strong> of the resources (CUs) included in the portfolio. 
                    The system also cross-references with <strong>BRS-FLEX-401</strong> (Grid Constraints) and identifies <strong>cross-market conflicts</strong> in real-time.
                </p>
            </div>

            {renderBidTable("TSO Balancing Bids", <Globe size={20} color="#0052cc" />, pagedTsoBids, pageTso, setPageTso, tsoBids.length, false)}
            
            <div style={{ height: '24px' }} />

            {renderBidTable("DSO Local Market Bids", <TowerControl size={20} color="#4a148c" />, pagedDsoBids, pageDso, setPageDso, dsoBids.length, true)}
        </div>
    );
};
