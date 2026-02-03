
import React, { useMemo, useState } from 'react';
import { pocStyles } from '../styles';
import { 
  FilePieChart, 
  Briefcase, 
  Download,
  Info,
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

export const FirBrpSettlement: React.FC<Props> = ({ onSelectBid, onSelectParty }) => {
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

        const brpMap = new Map<string, any>();

        verifiedBids.forEach(bid => {
            const factor = getSeededDeliveryFactor(bid.id);
            const totalVerifiedMWh = bid.volumeMW * factor * 0.25;

            const groupCUs = mockCUs.filter(c => c.spgId === bid.spgId);
            if (groupCUs.length === 0) return;

            const shareMWh = totalVerifiedMWh / groupCUs.length;

            groupCUs.forEach(cu => {
                const brpName = cu.brp;
                const existing = brpMap.get(brpName) || { brp: brpName, count: 0, totalMWh: 0 };
                existing.count += 1;
                existing.totalMWh += shareMWh;
                brpMap.set(brpName, existing);
            });
        });

        return Array.from(brpMap.values()).sort((a, b) => b.totalMWh - a.totalMWh);
    }, []);

    const totalPages = Math.ceil(dailyAggregation.length / PAGE_SIZE);
    const pagedItems = useMemo(() => 
        dailyAggregation.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    , [currentPage, dailyAggregation]);

    const totalVolume = useMemo(() => dailyAggregation.reduce((s, v) => s + v.totalMWh, 0), [dailyAggregation]);

    return (
        <div style={pocStyles.content}>
            <div style={{backgroundColor: '#eae6ff', borderLeft: '4px solid #403294', padding: '24px 32px', borderRadius: '8px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(64, 50, 148, 0.05)'}}>
                <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                    <div style={{backgroundColor: '#403294', padding: '6px', borderRadius: '6px', color: 'white'}}>
                        <FilePieChart size={20} />
                    </div>
                    <strong style={{color: '#403294', fontSize: '1.1rem'}}>BRP Settlement: Overview of Results ({displayDate})</strong>
                </div>
                <p style={{margin: 0, fontSize: '1rem', color: '#172b4d', lineHeight: '1.6'}}>
                    This page provides an <strong>overview of Balance Responsible Party (BRP) settlement results</strong>. It displays the aggregated 
                    volumes required for <strong>imbalance adjustment (neutralization)</strong>. This ensures that BRPs are not financially affected 
                     by flexibility activations performed by other actors within their balance perimeter.
                </p>
            </div>

            <div style={pocStyles.section}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Calendar size={18} color="#403294" />
                        <h3 style={{...pocStyles.sectionTitle, borderBottom: 'none', marginBottom: 0}}>BRP Allocation Summary</h3>
                    </div>
                    <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#403294', border: '1px solid #403294', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem'}}><Download size={14} /> Export BRP XML</button>
                </div>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Balance Responsible Party</th>
                            <th style={{...pocStyles.th, textAlign: 'center'}}>Affected Resources</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Total Neutralization Volume (MWh)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((row, idx) => (
                            <tr key={row.brp} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'8px', color: '#0052cc', cursor: 'pointer', fontWeight: 600}} onClick={() => onSelectParty(row.brp)}>
                                        <Briefcase size={14} color="#6b778c" />
                                        <span style={{textDecoration: 'underline'}}>{row.brp}</span>
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'center'}}>{row.count}</td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#403294'}}>{row.totalMWh.toFixed(3)} MWh</td>
                            </tr>
                        ))}
                        {pagedItems.length === 0 && (
                            <tr>
                                <td colSpan={3} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                    No verified data for selected period.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot style={{ backgroundColor: '#f4f5f7', borderTop: '2px solid #ebecf0' }}>
                        <tr>
                            <td colSpan={2} style={{ ...pocStyles.td, fontWeight: 700, textAlign: 'right' }}>SETTLEMENT TOTALS ({displayDate}):</td>
                            <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#403294' }}>{totalVolume.toFixed(3)} MWh</td>
                        </tr>
                    </tfoot>
                </table>

                <div style={styles.paginationContainer}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>
                        Showing {pagedItems.length} of {dailyAggregation.length} parties
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
            
            <div style={{marginTop: '24px', padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #b3d4ff', display: 'flex', gap: '16px', alignItems: 'center'}}>
                <Info size={20} color="#0052cc" style={{flexShrink: 0}} />
                <p style={{margin: 0, fontSize: '0.85rem', color: '#0747a6', lineHeight: '1.5'}}>
                    <strong>Note on calculation:</strong> Neutralization volumes are calculated per individual resource (CU) by comparing the baseline to actual metered consumption/production during the activation period, then aggregated per BRP.
                </p>
            </div>
        </div>
    );
};
