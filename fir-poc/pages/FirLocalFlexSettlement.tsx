import React, { useMemo, useState } from 'react';
import { pocStyles } from '../styles';
import { 
  ClipboardCheck, 
  Briefcase, 
  Download, 
  Info,
  Calendar,
  Zap,
  TowerControl,
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { mockBids, mockLocalMarkets, svkProducts, POC_NOW } from '../mockData';
import { isMissingMeterValues } from './FirVerificationList';

interface Props {
  onSelectBid: (id: string) => void;
  onSelectParty: (name: string) => void;
}

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

export const FirLocalFlexSettlement: React.FC<Props> = ({ onSelectBid, onSelectParty }) => {
    const [selectedMarketId, setSelectedMarketId] = useState(mockLocalMarkets[0].id);

    const displayDate = useMemo(() => {
        const targetDate = new Date(POC_NOW);
        targetDate.setUTCDate(POC_NOW.getUTCDate() - 2);
        return targetDate.toLocaleDateString('sv-SE');
    }, []);

    const selectedMarket = useMemo(() => 
        mockLocalMarkets.find(m => m.id === selectedMarketId)
    , [selectedMarketId]);

    const settlementSummary = useMemo(() => {
        const targetDate = new Date(POC_NOW);
        targetDate.setUTCDate(POC_NOW.getUTCDate() - 2);
        const dateStr = targetDate.toISOString().split('T')[0];

        // Filter for local products of the selected market
        const localBids = mockBids.filter(bid => {
            const product = svkProducts.find(p => p.id === bid.productId);
            return bid.timestamp.startsWith(dateStr) && 
                   product?.market === selectedMarket?.name && 
                   bid.selectionStatus === 'Selected' && 
                   bid.status === 'Valid' && 
                   !isMissingMeterValues(bid.id);
        });

        const bspMap = new Map<string, any>();

        localBids.forEach(bid => {
            const factor = getSeededDeliveryFactor(bid.id);
            const verifiedPower = bid.volumeMW * factor;
            const verifiedEnergy = verifiedPower * 0.25; 

            const existing = bspMap.get(bid.bsp) || { 
                bsp: bid.bsp, 
                count: 0, 
                totalVerifiedMW: 0,
                totalVerifiedMWh: 0,
                accuracies: [] 
            };

            existing.count += 1;
            existing.totalVerifiedMW += verifiedPower;
            existing.totalVerifiedMWh += verifiedEnergy;
            existing.accuracies.push(factor * 100);
            
            bspMap.set(bid.bsp, existing);
        });

        return Array.from(bspMap.values()).map(item => ({
            ...item,
            avgAccuracy: Math.round(item.accuracies.reduce((a: number, b: number) => a + b, 0) / item.accuracies.length)
        })).sort((a, b) => b.totalVerifiedMWh - a.totalVerifiedMWh);
    }, [selectedMarket, selectedMarketId]);

    const totals = useMemo(() => {
        return settlementSummary.reduce((acc, curr) => ({
            count: acc.count + curr.count,
            mw: acc.mw + curr.totalVerifiedMW,
            mwh: acc.mwh + curr.totalVerifiedMWh
        }), { count: 0, mw: 0, mwh: 0 });
    }, [settlementSummary]);

    return (
        <div style={pocStyles.content}>
            <div style={{backgroundColor: '#f9f8ff', borderLeft: '4px solid #4a148c', padding: '24px 32px', borderRadius: '8px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(74, 20, 140, 0.05)'}}>
                <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                    <div style={{backgroundColor: '#4a148c', padding: '6px', borderRadius: '6px', color: 'white'}}>
                        <ClipboardCheck size={20} />
                    </div>
                    <strong style={{color: '#4a148c', fontSize: '1.1rem'}}>Local Flex Informational Settlement ({displayDate})</strong>
                </div>
                <p style={{margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.6'}}>
                    Verified delivery statistics for <strong>Local Flexibility Markets (LFM)</strong>. Unlike TSO balancing, DSO-level verification is currently provided for 
                    <strong> informational purposes</strong> to support bilateral clearing, technical monitoring, and local grid management. 
                    Calculations are performed at D-2 based on finalized FIR Domain 6 quantification.
                </p>
            </div>

            {/* Market Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #dfe1e6', paddingBottom: '0' }}>
                {mockLocalMarkets.map(m => (
                    <button
                        key={m.id}
                        onClick={() => setSelectedMarketId(m.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: selectedMarketId === m.id ? '#fff' : 'transparent',
                            color: selectedMarketId === m.id ? '#4a148c' : '#6b778c',
                            border: '1px solid transparent',
                            borderBottom: selectedMarketId === m.id ? '2px solid #4a148c' : '1px solid transparent',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <MapPin size={16} />
                        {m.name}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #dfe1e6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', marginBottom: '8px' }}>Total Local Energy</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4a148c' }}>{totals.mwh.toFixed(3)} MWh</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b778c', marginTop: '4px' }}>Aggregated across all SPs</div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #dfe1e6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', marginBottom: '8px' }}>Market Precision</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1b5e20' }}>{totals.count > 0 ? Math.round(settlementSummary.reduce((a,c)=>a+c.avgAccuracy,0)/settlementSummary.length) : 0}%</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b778c', marginTop: '4px' }}>Average delivery accuracy</div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #dfe1e6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', marginBottom: '8px' }}>LFM Operator</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#172b4d', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TowerControl size={20} color="#6b778c" />
                        {selectedMarket?.owner}
                    </div>
                </div>
            </div>

            <div style={pocStyles.section}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Calendar size={18} color="#4a148c" />
                        <h3 style={{...pocStyles.sectionTitle, borderBottom: 'none', marginBottom: 0}}>
                            Provider Performance Summary
                        </h3>
                    </div>
                    <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#4a148c', border: '1px solid #4a148c', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem'}}>
                        <Download size={14} /> Download Info Report
                    </button>
                </div>
                
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Service Provider</th>
                            <th style={{...pocStyles.th, textAlign: 'center'}}>Local Activations</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Verified Power (MW)</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Verified Energy (MWh)</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Avg. Precision (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {settlementSummary.map((row, idx) => (
                            <tr key={row.bsp} style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}>
                                <td style={pocStyles.td}>
                                    <div 
                                        style={{display:'flex', alignItems:'center', gap:'8px', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}
                                        onClick={() => onSelectParty(row.bsp)}
                                    >
                                        <Briefcase size={14} color="#6b778c" />
                                        <span style={{textDecoration: 'underline'}}>{row.bsp}</span>
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'center'}}>{row.count}</td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 600}}>{row.totalVerifiedMW.toFixed(2)} MW</td>
                                <td style={{...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#4a148c'}}>{row.totalVerifiedMWh.toFixed(3)} MWh</td>
                                <td style={{...pocStyles.td, textAlign: 'right'}}>
                                    <span style={{
                                        fontWeight: 800,
                                        color: row.avgAccuracy >= 75 ? '#006644' : '#bf2600'
                                    }}>
                                        {row.avgAccuracy}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {settlementSummary.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                    No verified activations found for {selectedMarket?.name} in this period.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{marginTop: '24px', padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #b3d4ff', display: 'flex', gap: '16px', alignItems: 'center'}}>
                <Info size={24} color="#0052cc" style={{flexShrink: 0}} />
                <div>
                    <h4 style={{margin: '0 0 4px 0', color: '#0052cc', fontWeight: 700}}>Reporting & Transparency</h4>
                    <p style={{margin: 0, fontSize: '0.85rem', color: '#0747a6', lineHeight: '1.5'}}>
                        DSOs access this data via the <strong>LFM API</strong> to evaluate provider performance. FIR acts as an independent verifier, ensuring that baselines and quantities are calculated identically across all markets in Sweden.
                    </p>
                </div>
            </div>
        </div>
    );
};