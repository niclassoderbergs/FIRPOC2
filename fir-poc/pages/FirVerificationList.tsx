
import { BRSData } from '../../../types';
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { 
  CheckCircle2, 
  Clock, 
  Activity as ActivityIcon,
  Zap,
  MapPin,
  Calendar,
  Link2,
  FileSearch,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { mockBids, POC_NOW } from '../mockData';

const PAGE_SIZE = 20;

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

const getSeededDeliveryFactor = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    let sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += Math.sin(hash * i * 9876.5432);
    }
    const avg = sum / 10; 
    return 1.0 + (avg * 0.4); 
};

/**
 * Shared logic to determine if a bid is missing data (30% probability)
 */
export const isMissingMeterValues = (bidId: string) => {
    const bidNum = parseInt(bidId.split('-').pop() || '0', 10);
    return (bidNum % 10) < 3; // 0, 1, 2 = 30%
};

/**
 * Logik för att avgöra verifieringsstatus.
 * Inkluderar simulering av att ca 30% av buden saknar mätvärden.
 */
const getVerificationStatus = (bid: any) => {
    const bidTime = new Date(bid.timestamp);
    if (bidTime > POC_NOW) return { label: 'Scheduled', color: '#6b778c', bg: '#f4f5f7', icon: <Clock size={12} /> };
    
    // Simulera saknade mätvärden
    if (isMissingMeterValues(bid.id)) {
        return { label: 'Missing Meter Values', color: '#bf2600', bg: '#ffebe6', icon: <AlertCircle size={12} /> };
    }

    const diffMs = POC_NOW.getTime() - bidTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // 6-timmarsregeln för mätvärdesbearbetning
    if (diffHours < 6) {
        return { label: 'Awaiting Meter Values', color: '#974f0c', bg: '#fff0b3', icon: <ActivityIcon size={12} /> };
    }
    
    return { label: 'Verified', color: '#006644', bg: '#e3fcef', icon: <CheckCircle2 size={12} /> };
};

interface Props {
  onSelectBid: (id: string) => void;
  onSelectSPG: (id: string) => void;
  onSelectParty: (name: string) => void;
}

export const FirVerificationList: React.FC<Props> = ({ onSelectBid, onSelectSPG, onSelectParty }) => {
    const [currentPage, setCurrentPage] = useState(0);

    // Filter logic: Only show bids from TWO days ago (D-2)
    const filteredBids = useMemo(() => {
        const targetDate = new Date(POC_NOW);
        targetDate.setUTCDate(POC_NOW.getUTCDate() - 2);
        const dateStr = targetDate.toISOString().split('T')[0];

        return mockBids.filter(b => 
            b.selectionStatus === 'Selected' && 
            b.status === 'Valid' && 
            b.timestamp.startsWith(dateStr)
        ).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, []);

    const totalPages = Math.ceil(filteredBids.length / PAGE_SIZE);
    
    const pagedBids = useMemo(() => 
        filteredBids.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, filteredBids]);

    const totals = useMemo(() => {
        return filteredBids.reduce((acc, curr) => {
            const status = getVerificationStatus(curr);
            const factor = getSeededDeliveryFactor(curr.id);
            const verifiedMW = curr.volumeMW * factor;
            
            const isVerified = status.label === 'Verified';

            return {
                bidMW: acc.bidMW + curr.volumeMW,
                // Addera endast mätvärden om status är 'Verified'
                verMW: acc.verMW + (isVerified ? verifiedMW : 0),
                verMWh: acc.verMWh + (isVerified ? (verifiedMW * 0.25) : 0),
                verifiedCount: acc.verifiedCount + (isVerified ? 1 : 0)
            };
        }, { bidMW: 0, verMW: 0, verMWh: 0, verifiedCount: 0 });
    }, [filteredBids]);

    const displayDate = useMemo(() => {
        const targetDate = new Date(POC_NOW);
        targetDate.setUTCDate(POC_NOW.getUTCDate() - 2);
        return targetDate.toLocaleDateString('sv-SE');
    }, []);

    return (
        <div style={pocStyles.content}>
            <div style={{backgroundColor: '#f3f0ff', borderLeft: '4px solid #403294', padding: '16px 20px', borderRadius: '4px', marginBottom: '32px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px'}}>
                    <CheckCircle2 size={20} color="#403294" />
                    <strong style={{color: '#403294'}}>Settlement Verification (Ex-post) — Final Results for {displayDate}</strong>
                </div>
                <p style={{margin: 0, fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.5'}}>
                    Verifiering av levererad flexibilitet mot baselines. För att säkerställa högsta datakvalitet och att mätvärdesfönstret passerats för samtliga aktörer visar denna vy bud från <strong>D-2 ({displayDate})</strong>. 
                    Bud markerade med <span style={{color: '#bf2600', fontWeight: 600}}>MISSING METER VALUES</span> saknar fullständigt underlag och exkluderas från de summerade totalerna.
                </p>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Bid Reference</th>
                            <th style={pocStyles.th}>Portfolio (SPG)</th>
                            <th style={pocStyles.th}>Product</th>
                            <th style={pocStyles.th}>Period</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Bid (MW)</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Verified (MW)</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Energy (MWh)</th>
                            <th style={pocStyles.th}>Status</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Accuracy</th>
                            <th style={pocStyles.th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedBids.map((bid, idx) => {
                            const ver = getVerificationStatus(bid);
                            const factor = getSeededDeliveryFactor(bid.id);
                            const deliveryPct = Math.round(factor * 100);
                            const verifiedMW = bid.volumeMW * factor;
                            const verifiedMWh = verifiedMW * 0.25;
                            const dateObj = new Date(bid.timestamp);
                            
                            const isNotVerified = ver.label !== 'Verified';

                            let resultColor = '#36b37e'; 
                            if (deliveryPct < 98) resultColor = '#ffab00'; 
                            if (deliveryPct < 90) resultColor = '#bf2600'; 

                            return (
                                <tr key={bid.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                    <td 
                                        style={{...pocStyles.td, fontWeight: 600, color: '#0052cc', textDecoration: 'underline', cursor: 'pointer'}}
                                        onClick={() => onSelectBid(bid.id)}
                                    >
                                        {bid.id}
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div 
                                            style={{display:'flex', alignItems:'center', gap:'4px', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}
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
                                            <Zap size={10} /> {bid.productId}
                                        </span>
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
                                    <td style={{...pocStyles.td, textAlign: 'right', color: '#6b778c'}}>
                                        {bid.volumeMW.toFixed(1)}
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: isNotVerified ? '#a5adba' : '#172b4d'}}>
                                        {isNotVerified ? '-' : verifiedMW.toFixed(2)}
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 800, color: isNotVerified ? '#a5adba' : '#0052cc'}}>
                                        {isNotVerified ? '-' : verifiedMWh.toFixed(3)}
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge,
                                            backgroundColor: ver.bg,
                                            color: ver.color,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            border: `1px solid ${ver.color}40`,
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {ver.icon}
                                            {ver.label.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right'}}>
                                        {!isNotVerified ? (
                                            <span style={{fontWeight: 800, color: resultColor}}>{deliveryPct}%</span>
                                        ) : (
                                            <span style={{color: '#6b778c', fontSize: '0.8rem', fontStyle: 'italic'}}>N/A</span>
                                        )}
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right'}}>
                                        <button 
                                            style={{border:'none', background:'none', color:'#0052cc', cursor:'pointer'}}
                                            onClick={() => onSelectBid(bid.id)}
                                        >
                                            <FileSearch size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot style={{ backgroundColor: '#f4f5f7', borderTop: '2px solid #ebecf0' }}>
                        <tr>
                            <td colSpan={4} style={{ ...pocStyles.td, fontWeight: 700, textAlign: 'right' }}>
                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <span>FINAL TOTALS FOR {displayDate}</span>
                                    <span style={{fontSize: '0.75rem', fontWeight: 400, color: '#6b778c'}}>({totals.verifiedCount} of {filteredBids.length} bids verified)</span>
                                </div>
                            </td>
                            <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#6b778c' }}>{totals.bidMW.toFixed(1)} MW</td>
                            <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#172b4d' }}>{totals.verMW.toFixed(2)} MW</td>
                            <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#0052cc' }}>{totals.verMWh.toFixed(3)} MWh</td>
                            <td colSpan={3} style={pocStyles.td}></td>
                        </tr>
                    </tfoot>
                </table>

                {/* Pagination Controls */}
                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedBids.length} of {filteredBids.length} bids for {displayDate}
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
