
import React, { useMemo } from 'react';
import { pocStyles } from '../styles';
import { 
  Activity, 
  ShieldAlert, 
  Zap, 
  Globe, 
  Layers,
  BarChart3,
  CheckCircle2,
  Briefcase,
  ClipboardList,
  Package,
  LineChart,
  FileBarChart,
  MapPin,
  Box,
  Terminal,
  Target,
  UserCircle,
  ZapOff,
  UserPlus
} from 'lucide-react';
import { 
  mockCUs, 
  mockSPGs, 
  mockGridConstraints, 
  mockBSPs, 
  mockSPGProductApplications, 
  mockSPApplications,
  svkProducts,
  baselineMethods,
  mockBids,
  POC_NOW,
  mockRegResponsibles
} from '../mockData';

interface Props {
    onNavigate: (view: any) => void;
}

const ALL_ZONES = ['SE1', 'SE2', 'SE3', 'SE4'];

const StatCard = ({ title, value, subValue, icon: Icon, color, onClick }: any) => (
    <div 
        onClick={onClick}
        style={{
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid #dfe1e6',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '10px', 
                backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', 
                color: color,
                justifyContent: 'center'
            }}>
                <Icon size={20} />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase' }}>{title}</div>
        </div>
        <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#172b4d' }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b778c', marginTop: '2px' }}>{subValue}</div>
        </div>
    </div>
);

// Deterministic accuracy factor
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

export const FirDashboard: React.FC<Props> = ({ onNavigate }) => {
    const stats = useMemo(() => {
        let totalMWNum = 0;
        mockCUs.forEach(cu => {
            const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
            totalMWNum += val;
        });

        const potential = { Hybrid: 0, FCR_Total: 0, FRR_Total: 0 };
        const zoneBreakdown: Record<string, number> = { SE1: 0, SE2: 0, SE3: 0, SE4: 0 };
        
        const zoneProductBreakdown: Record<string, Record<string, number>> = {
          SE1: {}, SE2: {}, SE3: {}, SE4: {}
        };

        mockCUs.forEach(cu => {
            const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
            
            const isFCR = cu.productBaselines.some(pb => pb.productId.startsWith('FCR'));
            const isFRR = cu.productBaselines.some(pb => ['mFRR', 'aFRR'].includes(pb.productId));

            if (isFCR) potential.FCR_Total += val;
            if (isFRR) potential.FRR_Total += val;
            if (isFCR && isFRR) potential.Hybrid += val;

            const zone = cu.biddingZone;
            if (zoneBreakdown[zone] !== undefined) {
                zoneBreakdown[zone] += val;
                cu.productBaselines.forEach(pb => {
                    zoneProductBreakdown[zone][pb.productId] = (zoneProductBreakdown[zone][pb.productId] || 0) + val;
                });
            }
        });

        const ongoingGridPq = mockCUs.filter(cu => cu.status === 'Pending').length;
        const ongoingProductPq = mockSPGProductApplications.filter(app => app.status !== 'Approved').length;
        const ongoingSpApps = mockSPApplications.filter(app => app.status === 'Review').length;

        const currentConstraints = mockGridConstraints.filter(c => c.status === 'Active');
        const futureConstraints = mockGridConstraints.filter(c => c.status === 'Planned');

        const tsoProductCount = svkProducts.filter(p => p.market.includes('TSO')).length;
        const dsoProductCount = svkProducts.filter(p => p.market.includes('DSO')).length;

        return {
            totalMWNum,
            totalMW: totalMWNum.toFixed(1),
            cuCount: mockCUs.length.toLocaleString(),
            spBspCount: mockBSPs.length,
            regResponsibleCount: mockRegResponsibles.length,
            activeConstraintsCount: currentConstraints.length,
            productCount: svkProducts.length,
            tsoProductCount,
            dsoProductCount,
            baselineCount: baselineMethods.length,
            potential,
            zoneBreakdown,
            zoneProductBreakdown,
            ongoing: {
                gridPq: ongoingGridPq,
                productPq: ongoingProductPq,
                spApps: ongoingSpApps
            },
            gridAlerts: {
                active: currentConstraints,
                planned: futureConstraints
            }
        };
    }, []);

    // Settlement Summary Logic (Latest Week) grouped by Product then Zone
    const settlementSummary = useMemo(() => {
        const weekAgo = new Date(POC_NOW.getTime() - (7 * 24 * 60 * 60 * 1000));
        
        const recentVerifiedBids = mockBids.filter(bid => {
            const date = new Date(bid.timestamp);
            const diffHours = (POC_NOW.getTime() - date.getTime()) / (1000 * 60 * 60);
            return date >= weekAgo && 
                   bid.selectionStatus === 'Selected' && 
                   bid.status === 'Valid' && 
                   bid.activationStatus === 'Activated' &&
                   diffHours >= 6;
        });

        const productMap: Record<string, Record<string, any>> = {};
        recentVerifiedBids.forEach(bid => {
            if (!productMap[bid.productId]) productMap[bid.productId] = {};
            if (!productMap[bid.productId][bid.zone]) {
                productMap[bid.productId][bid.zone] = {
                    biddedMW: 0,
                    verifiedMW: 0,
                    verifiedMWh: 0
                };
            }
            const factor = getSeededDeliveryFactor(bid.id);
            const metrics = productMap[bid.productId][bid.zone];
            metrics.biddedMW += bid.volumeMW;
            metrics.verifiedMW += bid.volumeMW * factor;
            metrics.verifiedMWh += (bid.volumeMW * factor * 0.25);
        });

        return productMap;
    }, []);

    const globalMaxProductVal = useMemo(() => {
        let max = 0;
        Object.values(stats.zoneProductBreakdown).forEach(zoneMap => {
            Object.values(zoneMap).forEach(val => {
                if (val > max) max = val;
            });
        });
        return max || 1;
    }, [stats.zoneProductBreakdown]);

    return (
        <div style={pocStyles.content}>
            {/* WELCOME INFO BOX */}
            <div style={{
                backgroundColor: '#fff',
                border: '1px solid #dfe1e6',
                borderLeft: '6px solid #0052cc',
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '40px',
                boxShadow: '0 4px 20px rgba(0, 82, 204, 0.08)',
                background: 'linear-gradient(to right, #f0f7ff, #ffffff)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ backgroundColor: '#0052cc', padding: '8px', borderRadius: '8px', color: 'white' }}>
                        <Globe size={24} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#172b4d' }}>
                        Welcome to FIR POC – The Future Flexibility Register
                    </h2>
                </div>

                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#334155', marginBottom: '24px' }}>
                    This platform is a Proof of Concept (POC) designed to visualize and validate the processes within the upcoming European regulatory framework for demand response (NC DR).
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {/* System Context & Roles */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0747a6', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <UserCircle size={18} /> System Context & Roles
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>You are logged in as a <strong>Registry Administrator</strong> with full visibility of all data.</li>
                            <li>In production, the majority of information exchange occurs via <strong>APIs</strong> directly to and from market actors' systems.</li>
                            <li>The interface applies <strong>access control</strong> so that actors only see data relevant to their own organization.</li>
                        </ul>
                    </div>

                    {/* Focus Areas */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#006644', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <Target size={18} /> Focus Areas
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><strong>Registration & Aggregation:</strong> How resources (CUs) are linked to bidding groups (SPGs).</li>
                            <li><strong>Qualification:</strong> Technical approval process for different markets.</li>
                            <li><strong>Settlement:</strong> The flow from activated bid to economic distribution.</li>
                        </ul>
                    </div>
                </div>

                {/* Warning / Note blocks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
                    <div style={{ 
                        padding: '16px 20px', 
                        backgroundColor: '#fff7e6', 
                        border: '1px solid #ffbb96', 
                        borderRadius: '8px',
                        display: 'flex',
                        gap: '16px'
                    }}>
                        <ShieldAlert size={24} color="#d46b08" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#873800' }}>
                            <strong>TEST DATA NOTE:</strong> The focus in this environment is on demonstrating processes and relationships between objects and actors. Please disregard the accuracy of specific quantitative data (volumes, number of units, etc.), as these figures are fictitious and generated solely to illustrate system logic.
                        </div>
                    </div>

                    <div style={{ 
                        padding: '16px 20px', 
                        backgroundColor: '#f5f5f5', 
                        border: '1px solid #d1d1d1', 
                        borderRadius: '8px',
                        display: 'flex',
                        gap: '16px'
                    }}>
                        <ZapOff size={24} color="#666" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#444' }}>
                            <strong>LOCAL FLEXIBILITY MARKETS NOTE:</strong> Local DSO-level flexibility markets are currently not implemented in this POC. In a production FIR, all resources and bids from local markets will be integrated. This enables cross-market validation to prevent double-activations and ensure that market signals do not conflict with local grid security.
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '24px', borderTop: '1px solid #ebecf0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Created by: <strong>Niclas Söderberg</strong> (niclas.soderberg@svk.se)
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0052cc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Terminal size={14} /> POC VERSION 1.4.2
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ ...pocStyles.pageTitle, marginBottom: '4px' }}>System Overview</h1>
                    <p style={{ color: '#6b778c', margin: 0 }}>National aggregation of the Swedish flexibility portfolio</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#e3fcef', padding: '8px 16px', borderRadius: '8px', color: '#006644', fontSize: '0.85rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} /> Data Integrity: Verified
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <StatCard 
                    title="Total Capacity" 
                    value={`${stats.totalMW} MW`} 
                    subValue="Aggregated physical potential"
                    icon={Zap} 
                    color="#0052cc" 
                    onClick={() => onNavigate('cus')} 
                />
                <StatCard 
                    title="Total Resources" 
                    value={`${stats.cuCount} CUs`} 
                    subValue="Registered technical units"
                    icon={Box} 
                    color="#008da6" 
                    onClick={() => onNavigate('cus')} 
                />
                <StatCard 
                    title="Registered SP" 
                    value={stats.spBspCount} 
                    subValue="Market authorized actors"
                    icon={Briefcase} 
                    color="#4a148c" 
                    onClick={() => onNavigate('sp')} 
                />
                <StatCard 
                    title="CU Reg. Responsibles" 
                    value={stats.regResponsibleCount} 
                    subValue="Authorized on-boarders"
                    icon={UserPlus} 
                    color="#6554c0" 
                    onClick={() => onNavigate('reg_responsible')} 
                />
                <StatCard 
                    title="Active Constraints" 
                    value={stats.activeConstraintsCount} 
                    subValue="Current grid limitations"
                    icon={ShieldAlert} 
                    color="#bf2600" 
                    onClick={() => onNavigate('grid_constraints')} 
                />
                <StatCard 
                    title="Market Readiness" 
                    value={`${mockSPGs.length} SPGs`} 
                    subValue="Aggregated portfolios"
                    icon={Layers} 
                    color="#6554c0" 
                    onClick={() => onNavigate('spgs')} 
                />
                <StatCard 
                    title="Products" 
                    value={
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.65rem', color: '#6b778c', textTransform: 'uppercase', fontWeight: 700, marginBottom: '-4px' }}>TSO</span>
                          <span>{stats.tsoProductCount}</span>
                        </div>
                        <div style={{ width: '1px', height: '22px', backgroundColor: '#dfe1e6', alignSelf: 'center' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.65rem', color: '#6b778c', textTransform: 'uppercase', fontWeight: 700, marginBottom: '-4px' }}>DSO</span>
                          <span>{stats.dsoProductCount}</span>
                        </div>
                      </div>
                    } 
                    subValue={`${stats.productCount} Market products`}
                    icon={Package} 
                    color="#008da6" 
                    onClick={() => onNavigate('prod_types')} 
                />
                <StatCard 
                    title="Baselines" 
                    value={stats.baselineCount} 
                    subValue="Approved methods"
                    icon={LineChart} 
                    color="#36b37e" 
                    onClick={() => onNavigate('baselines')} 
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div style={pocStyles.section}>
                    <h3 style={styles.sectionHeader}>
                        <BarChart3 size={18} color="#0052cc" /> Market Capability Breakdown
                    </h3>
                    <p style={{fontSize: '0.8rem', color: '#6b778c', marginBottom: '20px'}}>Total qualified potential (MW). Categories overlap for hybrid resources.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Gate A: Hybrid Potential (FCR + FRR)</span>
                                <span style={{ fontWeight: 800 }}>{stats.potential.Hybrid.toFixed(1)} MW</span>
                            </div>
                            <div style={{ height: '10px', backgroundColor: '#ebecf0', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: `${(stats.potential.Hybrid / stats.totalMWNum) * 100}%`, height: '100%', backgroundColor: '#6554c0' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Total Frequency Potential (FCR)</span>
                                <span style={{ fontWeight: 800 }}>{stats.potential.FCR_Total.toFixed(1)} MW</span>
                            </div>
                            <div style={{ height: '10px', backgroundColor: '#ebecf0', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: `${(stats.potential.FCR_Total / stats.totalMWNum) * 100}%`, height: '100%', backgroundColor: '#0052cc' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Total Energy Potential (mFRR/aFRR)</span>
                                <span style={{ fontWeight: 800 }}>{stats.potential.FRR_Total.toFixed(1)} MW</span>
                            </div>
                            <div style={{ height: '10px', backgroundColor: '#ebecf0', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: `${(stats.potential.FRR_Total / stats.totalMWNum) * 100}%`, height: '100%', backgroundColor: '#36b37e' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={pocStyles.section}>
                    <h3 style={styles.sectionHeader}>
                        <ClipboardList size={18} color="#0052cc" /> Ongoing Assessments
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                        <div 
                            onClick={() => onNavigate('sp_applications')}
                            style={styles.ongoingItem}
                        >
                            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                                <Briefcase size={16} color="#6b778c" />
                                <span style={{fontSize: '0.9rem', fontWeight: 500}}>Actor Onboarding</span>
                            </div>
                            <span style={styles.ongoingBadge}>{stats.ongoing.spApps}</span>
                        </div>
                        <div 
                            onClick={() => onNavigate('prequalification')}
                            style={styles.ongoingItem}
                        >
                            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                                <Activity size={16} color="#6b778c" />
                                <span style={{fontSize: '0.9rem', fontWeight: 500}}>Grid Prequalification (CU)</span>
                            </div>
                            <span style={styles.ongoingBadge}>{stats.ongoing.gridPq}</span>
                        </div>
                        <div 
                            onClick={() => onNavigate('spg_applications')}
                            style={styles.ongoingItem}
                        >
                            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                                <Layers size={16} color="#6b778c" />
                                <span style={{fontSize: '0.9rem', fontWeight: 500}}>Product Qualification (SPG)</span>
                            </div>
                            <span style={styles.ongoingBadge}>{stats.ongoing.productPq}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SETTLEMENT SUMMARY GRID (PRODUCT BRICKS) */}
            <div style={{...pocStyles.section, backgroundColor: '#fafbfc'}}>
                <h3 style={{...styles.sectionHeader, borderBottom: 'none'}}>
                    <FileBarChart size={18} color="#0052cc" /> Weekly Settlement Summary (Verified)
                </h3>
                <p style={{fontSize: '0.8rem', color: '#6b778c', marginBottom: '24px'}}>High-level verification results per product and bidding zone for the last 7 days. All products and zones are shown to ensure market transparency.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
                    {svkProducts.map(product => {
                        const zoneMap = settlementSummary[product.id] || {};
                        
                        return (
                            <div key={product.id} style={{ backgroundColor: '#fff', border: '1px solid #dfe1e6', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                                <div style={{ backgroundColor: '#f4f5f7', padding: '12px 16px', borderBottom: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Zap size={16} color="#0052cc" />
                                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#172b4d' }}>{product.name}</span>
                                </div>
                                <div style={{ padding: '0px' }}>
                                    <table style={{ ...pocStyles.table, borderTop: 'none' }}>
                                        <thead style={{ backgroundColor: '#fafbfc' }}>
                                            <tr>
                                                <th style={{ ...pocStyles.th, padding: '8px 12px' }}>Zone</th>
                                                <th style={{ ...pocStyles.th, padding: '8px 12px', textAlign: 'right' }}>Bid MW</th>
                                                <th style={{ ...pocStyles.th, padding: '8px 12px', textAlign: 'right' }}>Ver MW</th>
                                                <th style={{ ...pocStyles.th, padding: '8px 12px', textAlign: 'right' }}>Volume MWh</th>
                                                <th style={{ ...pocStyles.th, padding: '8px 12px', textAlign: 'right' }}>Acc %</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ALL_ZONES.map((zone, zIdx) => {
                                                const data = zoneMap[zone] || { biddedMW: 0, verifiedMW: 0, verifiedMWh: 0 };
                                                const hasActivity = data.biddedMW > 0;
                                                const accuracy = hasActivity ? (data.verifiedMW / data.biddedMW) * 100 : 0;
                                                
                                                let accuracyColor = '#36b37e'; 
                                                if (accuracy < 98) accuracyColor = '#ffab00';
                                                if (accuracy < 90) accuracyColor = '#bf2600';

                                                return (
                                                    <tr key={zone} style={{ ...pocStyles.row, backgroundColor: zIdx % 2 === 1 ? '#fafbfc' : '#fff', opacity: hasActivity ? 1 : 0.6 }}>
                                                        <td style={{ ...pocStyles.td, padding: '8px 12px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: hasActivity ? 600 : 400 }}>
                                                                <MapPin size={10} color={hasActivity ? "#6b778c" : "#a5adba"} />
                                                                {zone}
                                                            </div>
                                                        </td>
                                                        <td style={{ ...pocStyles.td, padding: '8px 12px', textAlign: 'right', color: hasActivity ? '#6b778c' : '#c1c7d0' }}>
                                                            {data.biddedMW.toFixed(1)}
                                                        </td>
                                                        <td style={{ ...pocStyles.td, padding: '8px 12px', textAlign: 'right', fontWeight: hasActivity ? 600 : 400, color: hasActivity ? '#172b4d' : '#c1c7d0' }}>
                                                            {data.verifiedMW.toFixed(1)}
                                                        </td>
                                                        <td style={{ ...pocStyles.td, padding: '8px 12px', textAlign: 'right', fontWeight: 700, color: hasActivity ? '#0052cc' : '#c1c7d0' }}>
                                                            {data.verifiedMWh.toFixed(3)}
                                                        </td>
                                                        <td style={{ ...pocStyles.td, padding: '8px 12px', textAlign: 'right', fontWeight: 800, color: hasActivity ? accuracyColor : '#c1c7d0' }}>
                                                            {hasActivity ? `${Math.round(accuracy)}%` : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{...pocStyles.section, backgroundColor: '#fafbfc'}}>
                <h3 style={{...styles.sectionHeader, borderBottom: 'none'}}>
                    <Globe size={18} color="#0052cc" /> Capacity Breakdown per Bidding Zone & Product
                </h3>
                <p style={{fontSize: '0.85rem', color: '#6b778c', marginBottom: '24px'}}>Aggregated qualified capacity (MW) for each market product across bidding zones.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    {Object.entries(stats.zoneProductBreakdown).map(([zone, productMap]) => {
                        const zoneTotal = stats.zoneBreakdown[zone] || 0;
                        return (
                            <div key={zone} style={{ 
                                backgroundColor: '#fff', 
                                border: '1px solid #dfe1e6', 
                                borderRadius: '8px', 
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column' as const,
                                gap: '16px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ebecf0', paddingBottom: '8px' }}>
                                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#172b4d' }}>{zone}</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b778c' }}>Total: {zoneTotal.toFixed(1)} MW</span>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                                    {svkProducts.filter(p => !p.market.includes('Lokal')).map(product => {
                                        const val = productMap[product.id] || 0;
                                        const pct = (val / globalMaxProductVal) * 100;
                                        const color = product.category === 'Frequency' ? '#6554c0' : (product.category === 'Energy' ? '#36b37e' : '#ffab00');
                                        
                                        return (
                                            <div key={product.id}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem' }}>
                                                    <span style={{ fontWeight: 600, color: '#42526e' }}>{product.name}</span>
                                                    <span style={{ fontWeight: 700, color: '#172b4d' }}>{val.toFixed(1)} MW</span>
                                                </div>
                                                <div style={{ height: '6px', backgroundColor: '#f4f5f7', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ 
                                                        width: `${pct}%`, 
                                                        height: '100%', 
                                                        backgroundColor: color,
                                                        opacity: val > 0 ? 1 : 0.2
                                                    }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const styles = {
    ongoingItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#fafbfc',
        borderRadius: '8px',
        border: '1px solid #ebecf0',
        cursor: 'pointer'
    },
    ongoingBadge: {
        backgroundColor: '#0052cc',
        color: '#fff',
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 700
    },
    sectionHeader: {
        fontSize: '0.9rem',
        fontWeight: 700,
        color: '#42526e',
        textTransform: 'uppercase' as const,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '1px solid #ebecf0',
        paddingBottom: '12px',
        marginBottom: '12px'
    }
};
