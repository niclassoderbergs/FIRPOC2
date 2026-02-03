
import React, { useMemo, useState } from 'react';
import { pocStyles } from '../styles';
import { 
  FilePieChart, 
  Zap, 
  Download,
  Info,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockBids, mockCUs, POC_NOW } from '../mockData';
import { isMissingMeterValues } from './FirVerificationList';

const PAGE_SIZE = 20;

interface Props {
  onSelectBid: (id: string) => void;
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

export const FirReSettlement: React.FC<Props> = ({ onSelectBid, onSelectParty }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const displayDate = useMemo(() => {
        const targetDate = new Date(POC_NOW);
        targetDate.setUTCDate(POC_NOW.getUTCDate() - 2);
        return targetDate.toLocaleDateString('sv-SE');
    }, []);

    const dailyAggregation = useMemo(() => {
        const targetDate = new Date(POC_NOW);
        targetDate.setUTCDate(POC_NOW.getUTCDate() - 2);
        const dateStr = targetDate.toISOString().split('T')[0];

        const verifiedBids = mockBids.filter(bid => {
            return bid.timestamp.startsWith(dateStr) && 
                   bid.selectionStatus === 'Selected' && 
                   bid.status === 'Valid' && 
                   !isMissingMeterValues(bid.id);
        });

        const reMap = new Map<string, any>();

        verifiedBids.forEach(bid => {
            const factor = getSeededDeliveryFactor(bid.id);
            const totalVerifiedMWh = bid.volumeMW * factor * 0.25;

            const groupCUs = mockCUs.filter(c => c.spgId === bid.spgId);
            if (groupCUs.length === 0) return;

            const shareMWh = totalVerifiedMWh / groupCUs.length;

            groupCUs.forEach(cu => {
                const reName = cu.re;
                const existing = reMap.get(reName) || { re: reName, count: 0, totalMWh: 0 };
                existing.count += 1;
                existing.totalMWh += shareMWh;
                reMap.set(reName, existing);
            });
        });

        return Array.from(reMap.values()).sort((a, b) => b.totalMWh - a.totalMWh);
    }, []);

    const totalPages = Math.ceil(dailyAggregation.length / PAGE_SIZE);
    const pagedItems = useMemo(() => 
        dailyAggregation.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, dailyAggregation]);

    const totalVolume = useMemo(() => dailyAggregation.reduce((s, v) => s + v.totalMWh, 0), [dailyAggregation]);

    return (
        <div style={pocStyles.content}>
            <div style={{backgroundColor: '#fffbe6', borderLeft: '4px solid #d4a017', padding: '24px 32px', borderRadius: '8px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(212, 160, 23, 0.05)'}}>
                <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                    <div style={{backgroundColor: '#d4a017', padding: '6px', borderRadius: '6px', color: 'white'}}>
                        <Zap size={20} />
                    </div>
                    <strong style={{color: '#856404', fontSize: '1.1rem'}}>RE Settlement: Overview of Results ({displayDate})</strong>
                </div>
                <p style={{margin: 0, fontSize: '1rem', color: '#172b4d', lineHeight: '1.6'}}>
                    This page provides an <strong>overview of Retail Entity (RE / Supplier) settlement results</strong>. It displays the aggregated 
                    <strong> verified energy volumes</strong> that serve as the basis for financial compensation to suppliers for lost revenue 
                    due to flexibility activations in their portfolio.
                </p>
            </div>

            <div style={pocStyles.section}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Calendar size={18} color="#d4a017" />
                        <h3 style={{...pocStyles.sectionTitle, borderBottom: 'none', marginBottom: 0}}>Retailer Compensation Summary</h3>
                    </div>
                    <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#d4a017', border: '1px solid #d4a017', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem'}}><Download size={14} /> Export RE XML</button>
                </div>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Retail Entity (Supplier)</th>
                            <th style={{...pocStyles.th, textAlign: 'center'}}>Affected Points</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Total Compensation Basis (MWh)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((row, idx) => (
                            <tr key={row.re} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'8px', color: '#0052cc', cursor: 'pointer', fontWeight: 600}} onClick={() => onSelectParty(row.re)}>
                                        <Briefcase size={14} color="#6b778c" />
                                        <span style={{textDecoration: 'underline'}}>{row.re}</span>
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'center'}}>{row.count}</td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#d97706'}}>{row.totalMWh.toFixed(3)} MWh</td>
                            </tr>
                        ))}
                        {pagedItems.length === 0 && (
                            <tr>
                                <td colSpan={3} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                    No verified data found for selected period.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot style={{ backgroundColor: '#f4f5f7', borderTop: '2px solid #ebecf0' }}>
                        <tr>
                            <td colSpan={2} style={{ ...pocStyles.td, fontWeight: 700, textAlign: 'right' }}>SETTLEMENT TOTALS ({displayDate}):</td>
                            <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#d97706' }}>{totalVolume.toFixed(3)} MWh</td>
                        </tr>
                    </tfoot>
                </table>

                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedItems.length} of {dailyAggregation.length} suppliers
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

            <div style={{marginTop: '24px', padding: '20px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #dfe1e6', display: 'flex', gap: '16px', alignItems: 'center'}}>
                <Info size={20} color="#0052cc" style={{flexShrink: 0}} />
                <p style={{margin: 0, fontSize: '0.85rem', color: '#42526e', lineHeight: '1.5'}}>
                    <strong>Note on calculation:</strong> Compensation basis reflects the energy difference between the counterfactual baseline and the actual metered values at the accounting point level, specifically for units participating in flexibility services.
                </p>
            </div>
        </div>
    );
};
