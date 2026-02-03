
import React, { useMemo } from 'react';
import { pocStyles } from '../styles';
import { 
  FileBarChart, 
  CheckCircle2, 
  TrendingUp, 
  ExternalLink, 
  Calendar,
  Briefcase,
  Download,
  Info
} from 'lucide-react';
import { mockBids, POC_NOW } from '../mockData';

interface Props {
  onSelectBid: (id: string) => void;
  onSelectParty: (name: string) => void;
}

const getSeededDeliveryFactor = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r1 = Math.abs(Math.sin(hash));
    const r2 = Math.abs(Math.cos(hash));
    const pseudoRandom = (r1 + r2) / 2; 
    return 0.7 + (pseudoRandom * 0.6);
};

export const FirSettlementResult: React.FC<Props> = ({ onSelectBid, onSelectParty }) => {
    // 1. Identify "Latest Calendar Week" relative to POC_NOW (2025-03-25, Tuesday)
    // Week 12: Mar 17 - Mar 23
    const weekStart = new Date('2025-03-17T00:00:00Z');
    const weekEnd = new Date('2025-03-23T23:59:59Z');

    // 2. Filter Verified (Final) Bids
    const verifiedBids = useMemo(() => {
        return mockBids.filter(bid => {
            const bidTime = new Date(bid.timestamp);
            const diffHours = (POC_NOW.getTime() - bidTime.getTime()) / (1000 * 60 * 60);
            return bid.selectionStatus === 'Selected' && bid.status === 'Valid' && diffHours >= 6;
        });
    }, []);

    // 3. Filter for specific week and group by BSP
    const weeklyAggregation = useMemo(() => {
        const weeklyBids = verifiedBids.filter(bid => {
            const date = new Date(bid.timestamp);
            return date >= weekStart && date <= weekEnd;
        });

        const bspMap = new Map<string, any>();

        weeklyBids.forEach(bid => {
            const factor = getSeededDeliveryFactor(bid.id);
            const verifiedPower = bid.volumeMW * factor;
            const verifiedEnergy = verifiedPower * 0.25; // 15 min MTU

            const existing = bspMap.get(bid.bsp) || { 
                bsp: bid.bsp, 
                count: 0, 
                totalMW: 0, 
                totalMWh: 0,
                avgAccuracy: 0,
                accuracies: [] 
            };

            existing.count += 1;
            existing.totalMW += verifiedPower;
            existing.totalMWh += verifiedEnergy;
            existing.accuracies.push(factor * 100);
            
            bspMap.set(bid.bsp, existing);
        });

        return Array.from(bspMap.values()).map(item => ({
            ...item,
            avgAccuracy: Math.round(item.accuracies.reduce((a: number, b: number) => a + b, 0) / item.accuracies.length)
        })).sort((a, b) => b.totalMWh - a.totalMWh);
    }, [verifiedBids]);

    const recentVerified = useMemo(() => 
        verifiedBids.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 15)
    , [verifiedBids]);

    return (
        <div style={pocStyles.content}>
            <div style={{backgroundColor: '#e3fcef', borderLeft: '4px solid #006644', padding: '16px 20px', borderRadius: '4px', marginBottom: '32px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px'}}>
                    <FileBarChart size={20} color="#006644" />
                    <strong style={{color: '#006644'}}>Settlement Results (Verified Bids)</strong>
                </div>
                <p style={{margin: 0, fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.5'}}>
                    Financial settlement underlying data. All values here are <strong>Final</strong> and based on validated meter readings and baseline quantification.
                </p>
            </div>

            {/* Aggregation Section */}
            <div style={pocStyles.section}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <h3 style={{...pocStyles.sectionTitle, borderBottom: 'none', marginBottom: 0}}>
                        Weekly Summary per BSP (W12: Mar 17 - Mar 23)
                    </h3>
                    <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#0052cc', border: '1px solid #0052cc', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem'}}>
                        <Download size={14} /> Export XML
                    </button>
                </div>
                
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Balance Service Provider</th>
                            <th style={{...pocStyles.th, textAlign: 'center'}}>Verified Bids</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Sum Verified Power (MW)</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Sum Verified Energy (MWh)</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Avg. Delivery Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeklyAggregation.map((row, idx) => (
                            <tr key={row.bsp} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                <td style={pocStyles.td}>
                                    <div 
                                        style={{display:'flex', alignItems:'center', gap:'8px', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}
                                        onClick={() => onSelectParty(row.bsp)}
                                    >
                                        <Briefcase size={14} color="#6b778c" />
                                        {row.bsp}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'center'}}>{row.count}</td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 600}}>{row.totalMW.toFixed(2)} MW</td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#0052cc'}}>{row.totalMWh.toFixed(3)} MWh</td>
                                <td style={{...pocStyles.td, textAlign: 'right'}}>
                                    <span style={{
                                        fontWeight: 800,
                                        color: row.avgAccuracy > 95 && row.avgAccuracy < 105 ? '#006644' : '#974f0c'
                                    }}>
                                        {row.avgAccuracy}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {weeklyAggregation.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                    No verified data found for the selected period.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Individual Verified Bids */}
            <div style={pocStyles.section}>
                <h3 style={pocStyles.sectionTitle}>Recent Verified Bids</h3>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Reference</th>
                            <th style={pocStyles.th}>BSP</th>
                            <th style={pocStyles.th}>Period / MTU</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Bid Volume</th>
                            <th style={pocStyles.th}>Result</th>
                            <th style={pocStyles.th}>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentVerified.map((bid, idx) => {
                            const factor = getSeededDeliveryFactor(bid.id);
                            const deliveryPct = Math.round(factor * 100);
                            let resultColor = '#006644';
                            if (deliveryPct < 95 || deliveryPct > 105) resultColor = '#974f0c';
                            if (deliveryPct < 85 || deliveryPct > 115) resultColor = '#bf2600';

                            return (
                                <tr key={bid.id} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                    <td 
                                        style={{...pocStyles.td, fontWeight: 600, color: '#0052cc', textDecoration: 'underline'}}
                                        onClick={() => onSelectBid(bid.id)}
                                    >
                                        {bid.id}
                                    </td>
                                    <td style={{...pocStyles.td, fontSize: '0.85rem'}}>{bid.bsp}</td>
                                    <td style={pocStyles.td}>
                                        <div style={{fontSize: '0.8rem'}}>
                                            {new Date(bid.timestamp).toLocaleDateString()} {bid.period}
                                        </div>
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700}}>{bid.volumeMW} MW</td>
                                    <td style={pocStyles.td}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            <div style={{width: '50px', height: '6px', backgroundColor: '#ebecf0', borderRadius: '3px', overflow: 'hidden'}}>
                                                <div style={{width: `${Math.min(deliveryPct, 100)}%`, height: '100%', backgroundColor: resultColor}} />
                                            </div>
                                            <span style={{color: resultColor, fontSize: '0.85rem', fontWeight: 700}}>{deliveryPct}%</span>
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <button 
                                            style={{border:'none', background:'none', color:'#0052cc', cursor:'pointer'}}
                                            title="View Verification Details"
                                            onClick={() => onSelectBid(bid.id)}
                                        >
                                            <ExternalLink size={14} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div style={{marginTop: '24px', padding: '16px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #dfe1e6', display: 'flex', gap: '16px'}}>
                <Info size={20} color="#0052cc" style={{flexShrink: 0}} />
                <p style={{margin: 0, fontSize: '0.85rem', color: '#42526e'}}>
                    The <strong>Settlement Results</strong> are finalized when the <strong>Metering Data Frist</strong> has passed (standard 6 hours post-event for pilot). 
                    The data is then made available for Balance Responsibility Parties (BRP) and Suppliers for financial clearing.
                </p>
            </div>
        </div>
    );
};
