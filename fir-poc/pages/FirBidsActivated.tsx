
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { 
  Zap, 
  ZapOff, 
  Link2, 
  Clock, 
  Calendar, 
  Activity, 
  BarChart3,
  AlertCircle,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockBids } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelectBid: (id: string) => void;
  onSelectSPG: (id: string) => void;
  onSelectParty: (name: string) => void;
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

const getActivationBadge = (status: string) => {
    switch (status) {
        case 'Scheduled':
            return { 
                label: 'Scheduled', 
                color: '#0747a6', 
                bg: '#deebff', 
                icon: <Calendar size={12} />,
                desc: 'Future delivery'
            };
        case 'Activated':
            return { 
                label: 'Activated', 
                color: '#006644', 
                bg: '#e3fcef', 
                icon: <Zap size={12} />,
                desc: 'Confirmed activation'
            };
        case 'Not Activated':
            return { 
                label: 'Not Activated', 
                color: '#42526e', 
                bg: '#f4f5f7', 
                icon: <ZapOff size={12} />,
                desc: 'Selected as reserve but not called'
            };
        default:
            return { 
                label: 'Unknown', 
                color: '#6b778c', 
                bg: '#ebecf0', 
                icon: <AlertCircle size={12} />,
                desc: '-'
            };
    }
};

export const FirBidsActivated: React.FC<Props> = ({ onSelectBid, onSelectSPG, onSelectParty }) => {
    const [pageActivated, setPageActivated] = useState(0);
    const [pageScheduled, setPageScheduled] = useState(0);

    const marketSelectedBids = useMemo(() => 
        mockBids.filter(b => b.selectionStatus === 'Selected' && b.status === 'Valid')
            .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    , []);

    const activatedBids = useMemo(() => 
        marketSelectedBids.filter(b => b.activationStatus === 'Activated')
    , [marketSelectedBids]);

    const nonActivatedBids = useMemo(() => 
        marketSelectedBids.filter(b => b.activationStatus !== 'Activated')
    , [marketSelectedBids]);

    const pagedActivated = useMemo(() => 
        activatedBids.slice(pageActivated * PAGE_SIZE, (pageActivated + 1) * PAGE_SIZE)
    , [pageActivated, activatedBids]);

    const pagedScheduled = useMemo(() => 
        nonActivatedBids.slice(pageScheduled * PAGE_SIZE, (pageScheduled + 1) * PAGE_SIZE)
    , [pageScheduled, nonActivatedBids]);

    const stats = useMemo(() => {
        const future = marketSelectedBids.filter(b => b.activationStatus === 'Scheduled').length;
        const activated = marketSelectedBids.filter(b => b.activationStatus === 'Activated').length;
        const notActivated = marketSelectedBids.filter(b => b.activationStatus === 'Not Activated').length;
        return { future, activated, notActivated };
    }, [marketSelectedBids]);

    const renderTable = (bids: any[], currentPage: number, onPageChange: (p: number) => void, totalCount: number) => {
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        
        return (
            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: '32px'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Bid Reference</th>
                            <th style={pocStyles.th}>Portfolio (SPG)</th>
                            <th style={pocStyles.th}>Product</th>
                            <th style={pocStyles.th}>Bid Zone</th>
                            <th style={pocStyles.th}>Delivery Period</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Awarded Vol (MW)</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid, idx) => {
                            const actBadge = getActivationBadge(bid.activationStatus);
                            const dateObj = new Date(bid.timestamp);
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
                                            <Zap size={10} /> {bid.productId}
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
                                    <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#172b4d'}}>
                                        {bid.volumeMW} MW
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge,
                                            backgroundColor: actBadge.bg,
                                            color: actBadge.color,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            width: 'fit-content',
                                            border: `1px solid ${actBadge.color}20`
                                        }}>
                                            {actBadge.icon}
                                            {actBadge.label.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {bids.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                    No entries to display.
                                </td>
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
                                onClick={() => onPageChange(currentPage - 1)}
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
                                onClick={() => onPageChange(currentPage + 1)}
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
            <div style={{backgroundColor: '#e6effc', borderLeft: '4px solid #0052cc', padding: '16px 20px', borderRadius: '4px', marginBottom: '32px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px'}}>
                    <BarChart3 size={20} color="#0052cc" />
                    <strong style={{color: '#0747a6'}}>Market Dispatch & Activation Registry</strong>
                </div>
                <p style={{margin: 0, fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.5'}}>
                    Tracking bids selected by the TSO. This view displays current delivery obligations (Scheduled) and historical outcomes. Paginated at {PAGE_SIZE} per page.
                </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px'}}>
                <div style={{backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #dfe1e6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}>
                    <div style={{fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', marginBottom: '4px'}}>Scheduled (Future)</div>
                    <div style={{fontSize: '1.5rem', fontWeight: 800, color: '#0747a6'}}>{stats.future}</div>
                </div>
                <div style={{backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #dfe1e6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}>
                    <div style={{fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', marginBottom: '4px'}}>Activated (Confirmed)</div>
                    <div style={{fontSize: '1.5rem', fontWeight: 800, color: '#006644'}}>{stats.activated}</div>
                </div>
                <div style={{backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #dfe1e6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}>
                    <div style={{fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', marginBottom: '4px'}}>Not Activated (Reserves)</div>
                    <div style={{fontSize: '1.5rem', fontWeight: 800, color: '#42526e'}}>{stats.notActivated}</div>
                </div>
            </div>

            <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <CheckCircle2 size={20} color="#006644" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#172b4d'}}>Confirmed Activations</h2>
                <span style={{...pocStyles.badge, ...pocStyles.badgeGreen, marginLeft: '8px'}}>{activatedBids.length}</span>
            </div>
            {renderTable(pagedActivated, pageActivated, setPageActivated, activatedBids.length)}

            <div style={{marginTop: '48px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Clock size={20} color="#0747a6" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#172b4d'}}>Scheduled & Reserves</h2>
                <span style={{...pocStyles.badge, ...pocStyles.badgeBlue, marginLeft: '8px'}}>{nonActivatedBids.length}</span>
            </div>
            {renderTable(pagedScheduled, pageScheduled, setPageScheduled, nonActivatedBids.length)}

            <div style={{marginTop: '32px', padding: '20px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #dfe1e6', display: 'flex', gap: '16px'}}>
                <div style={{backgroundColor: '#e6effc', padding: '10px', borderRadius: '50%', height: 'fit-content'}}>
                    <Activity size={24} color="#0052cc" />
                </div>
                <div>
                    <h4 style={{margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 700}}>Operational State</h4>
                    <p style={{margin: 0, fontSize: '0.85rem', color: '#42526e', lineHeight: '1.6'}}>
                        This page represents the real-time operational state of the market. For ex-post verification of delivered flexibility against baselines, please refer to the <strong>Settlement</strong> section.
                    </p>
                </div>
            </div>
        </div>
    );
};
