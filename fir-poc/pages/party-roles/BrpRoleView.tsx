import React, { useMemo, useState } from 'react';
import { 
  Briefcase, 
  PieChart, 
  Zap, 
  Scale, 
  ChevronDown, 
  ChevronUp, 
  Box, 
  Layers, 
  Activity,
  Clock,
  ArrowRight,
  Info,
  FileText,
  ChevronLeft
} from 'lucide-react';
import { pocStyles } from '../../styles';
import { mockBids, mockCUs, POC_NOW } from '../../mockData';

interface Props {
  balanceCUs: any[];
  brpStatsByRE: any[];
  onSelectCU: (id: string) => void;
}

const DETAIL_PAGE_SIZE = 20;

// Consistent delivery factor logic
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

export const BrpRoleView: React.FC<Props> = ({ balanceCUs, brpStatsByRE, onSelectCU }) => {
  const [expandedRe, setExpandedRe] = useState<string | null>(null);
  const [detailPage, setDetailPage] = useState(0);

  const handleToggleRe = (name: string) => {
    if (expandedRe === name) {
        setExpandedRe(null);
    } else {
        setExpandedRe(name);
        setDetailPage(0); // Reset page on expansion
    }
  };

  // Synchronize time window with mock data availability (Last 7 days from POC_NOW)
  const { weekStart, weekEnd, weekLabel } = useMemo(() => {
    const end = new Date(POC_NOW);
    const start = new Date(POC_NOW);
    start.setDate(start.getDate() - 7);
    
    const format = (d: Date) => d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
    return { 
        weekStart: start, 
        weekEnd: end, 
        weekLabel: `${format(start)} - ${format(end)}` 
    };
  }, []);

  // Central Logic: Find and quantify all activations within BRP perimeter
  const settlementData = useMemo(() => {
    const reMap = new Map<string, { totalMWh: number, activations: any[] }>();
    let totalVolumeMWh = 0;

    // 1. Get all SPGs where this BRP has at least one CU
    const mySpgIds = new Set(balanceCUs.map(cu => cu.spgId).filter(Boolean));

    // 2. Filter verified bids for these SPGs within the time window
    const relevantBids = mockBids.filter(bid => {
        const bidDate = new Date(bid.timestamp);
        const diffHours = (POC_NOW.getTime() - bidDate.getTime()) / (1000 * 60 * 60);
        
        return mySpgIds.has(bid.spgId) &&
               bidDate >= weekStart && bidDate <= weekEnd &&
               bid.selectionStatus === 'Selected' &&
               bid.status === 'Valid' &&
               bid.activationStatus === 'Activated' &&
               diffHours >= 6;
    });

    relevantBids.forEach(bid => {
        const factor = getSeededDeliveryFactor(bid.id);
        const totalVerifiedMWh = bid.volumeMW * factor * 0.25;

        // Find CUs in this SPG that belong to this BRP
        const allSpgCUs = mockCUs.filter(c => c.spgId === bid.spgId);
        const mySpgCUs = allSpgCUs.filter(c => balanceCUs.some(bc => bc.id === c.id));
        
        if (mySpgCUs.length > 0) {
            // Group my CUs by Retailer to show breakdown
            const reGroup = new Map<string, string[]>();
            mySpgCUs.forEach(c => {
                const list = reGroup.get(c.re) || [];
                list.push(c.id);
                reGroup.set(c.re, list);
            });

            reGroup.forEach((cuIds, reName) => {
                const share = cuIds.length / allSpgCUs.length;
                const portionMWh = totalVerifiedMWh * share;

                const existing = reMap.get(reName) || { totalMWh: 0, activations: [] };
                existing.totalMWh += portionMWh;
                existing.activations.push({
                    bidId: bid.id,
                    product: bid.productId,
                    spg: bid.spgId,
                    date: new Date(bid.timestamp).toLocaleDateString('sv-SE'),
                    cuIds: cuIds,
                    volumeMWh: portionMWh
                });
                reMap.set(reName, existing);
                totalVolumeMWh += portionMWh;
            });
        }
    });

    return {
        reMap,
        totalVolumeMWh,
        totalCorrectionMWh: totalVolumeMWh // BRP usually gets 1:1 neutralization
    };
  }, [balanceCUs, weekStart, weekEnd]);

  const totalCUsInPerimeter = balanceCUs.length;

  return (
    <div style={{ ...pocStyles.section, borderLeft: '4px solid #403294' }}>
      <h3 style={pocStyles.sectionTitle}>
        <Briefcase size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
        Role: Balance Responsible Party (BRP)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#f3f0ff', padding: '24px', borderRadius: '12px', border: '1px solid #dcd7f7', boxShadow: '0 2px 4px rgba(64, 50, 148, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Scale size={20} color="#403294" />
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#403294', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Neutralization Volume (Week)</h4>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#172b4d' }}>{settlementData.totalCorrectionMWh.toFixed(3)} MWh</div>
            <p style={{ fontSize: '0.8rem', color: '#6b778c', marginTop: '8px', lineHeight: '1.4' }}>
                Verified adjustment basis for imbalance settlement during <strong>{weekLabel}</strong>.
            </p>
        </div>
        
        <div style={{ backgroundColor: '#f4f5f7', padding: '24px', borderRadius: '12px', border: '1px solid #dfe1e6', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Activity size={20} color="#42526e" />
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Balanced Resources</h4>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#172b4d' }}>{totalCUsInPerimeter} Units</div>
            <p style={{ fontSize: '0.8rem', color: '#6b778c', marginTop: '8px' }}>
                Total controllable units currently registered in your balance perimeter.
            </p>
        </div>
      </div>

      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fafbfc', borderRadius: '8px', border: '1px solid #ebecf0', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Info size={18} color="#0052cc" />
          <p style={{ fontSize: '0.85rem', color: '#42526e', margin: 0 }}>
            Neutralization volume is added back to the BRP's balance to ensure financial neutrality against flexibility activations.
          </p>
      </div>

      <div style={{ border: '1px solid #ebecf0', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', backgroundColor: '#fafbfc', borderBottom: '1px solid #ebecf0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PieChart size={14} color="#6b778c" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#42526e' }}>Retailer Breakdown (Balanced Perimeter)</span>
        </div>
        <table style={pocStyles.table}>
          <thead>
            <tr>
              <th style={{ ...pocStyles.th, width: '40px' }}></th>
              <th style={pocStyles.th}>Retailer (RE)</th>
              <th style={pocStyles.th}>CUs</th>
              <th style={{ ...pocStyles.th, textAlign: 'right' }}>Verified Volume (MWh)</th>
              <th style={{ ...pocStyles.th, width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {brpStatsByRE.map((stat) => {
              const isExpanded = expandedRe === stat.name;
              const reSettlement = settlementData.reMap.get(stat.name) || { totalMWh: 0, activations: [] };
              
              const totalActivations = reSettlement.activations.length;
              const totalDetailPages = Math.ceil(totalActivations / DETAIL_PAGE_SIZE);
              const pagedActivations = reSettlement.activations.slice(detailPage * DETAIL_PAGE_SIZE, (detailPage + 1) * DETAIL_PAGE_SIZE);

              return (
                <React.Fragment key={stat.name}>
                  <tr 
                    style={{ ...pocStyles.row, backgroundColor: isExpanded ? '#f3f0ff' : 'transparent' }}
                    onClick={() => handleToggleRe(stat.name)}
                  >
                    <td style={pocStyles.td}>
                        {isExpanded ? <ChevronUp size={16} color="#403294" /> : <ChevronDown size={16} color="#a5adba" />}
                    </td>
                    <td style={{ ...pocStyles.td, fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={14} color="#d97706" />
                        {stat.name}
                      </div>
                    </td>
                    <td style={pocStyles.td}>{stat.count}</td>
                    <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 600, color: reSettlement.totalMWh > 0 ? '#1b5e20' : '#6b778c' }}>
                        {reSettlement.totalMWh.toFixed(3)} MWh
                    </td>
                    <td style={pocStyles.td}>
                        <ArrowRight size={14} color="#0052cc" style={{ opacity: isExpanded ? 1 : 0.3 }} />
                    </td>
                  </tr>
                  
                  {isExpanded && (
                    <tr>
                      <td colSpan={5} style={{ padding: '0', backgroundColor: '#f9f8ff' }}>
                        <div style={{ padding: '24px', borderBottom: '2px solid #dcd7f7' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Activity size={16} color="#403294" />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#403294', textTransform: 'uppercase' }}>
                                        Verified Resource Activations for {stat.name}
                                    </span>
                                </div>
                                {totalActivations > DETAIL_PAGE_SIZE && (
                                    <div style={{ fontSize: '0.75rem', color: '#6b778c', fontStyle: 'italic' }}>
                                        Showing {pagedActivations.length} of {totalActivations} activations
                                    </div>
                                )}
                            </div>
                            
                            {totalActivations > 0 ? (
                                <>
                                <table style={{ ...pocStyles.table, backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #dcd7f7' }}>
                                    <thead style={{ backgroundColor: '#f3f0ff' }}>
                                        <tr>
                                            <th style={{ ...pocStyles.th, fontSize: '0.75rem' }}>Resource (CU)</th>
                                            <th style={{ ...pocStyles.th, fontSize: '0.75rem' }}>Source</th>
                                            <th style={{ ...pocStyles.th, fontSize: '0.75rem' }}>Portfolio (SPG)</th>
                                            <th style={{ ...pocStyles.th, fontSize: '0.75rem' }}>Product</th>
                                            <th style={{ ...pocStyles.th, fontSize: '0.75rem' }}>Date</th>
                                            <th style={{ ...pocStyles.th, fontSize: '0.75rem', textAlign: 'right' }}>Quantified (MWh)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedActivations.map((detail: any, dIdx: number) => {
                                            const firstId = detail.cuIds[0];
                                            const isCuSource = (parseInt(firstId.split('-').pop() || '0')) % 2 === 0;

                                            return (
                                                <tr key={dIdx}>
                                                    <td style={{ ...pocStyles.td, fontSize: '0.8rem' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                            {detail.cuIds.map((id: string) => (
                                                                <div 
                                                                  key={id} 
                                                                  onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onSelectCU(id);
                                                                  }}
                                                                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0052cc', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                                                                >
                                                                    <Box size={10} /> {id}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td style={pocStyles.td}>
                                                        <span style={{
                                                            ...pocStyles.badge,
                                                            backgroundColor: isCuSource ? '#e6effc' : '#fff7e6',
                                                            color: isCuSource ? '#0052cc' : '#d46b08',
                                                            fontSize: '0.65rem',
                                                            fontWeight: 800,
                                                            border: `1px solid ${isCuSource ? '#0052cc' : '#d46b08'}30`
                                                        }}>
                                                            {isCuSource ? 'CU' : 'MP'}
                                                        </span>
                                                    </td>
                                                    <td style={{ ...pocStyles.td, fontSize: '0.8rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <Layers size={12} color="#6b778c" />
                                                            {detail.spg}
                                                        </div>
                                                    </td>
                                                    <td style={pocStyles.td}>
                                                        <span style={{ ...pocStyles.badge, ...pocStyles.badgeBlue, fontSize: '0.65rem' }}>{detail.product}</span>
                                                    </td>
                                                    <td style={pocStyles.td}>
                                                        <div style={{ fontSize: '0.75rem', color: '#6b778c' }}>
                                                            {detail.date}
                                                        </div>
                                                    </td>
                                                    <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, color: '#1b5e20' }}>
                                                        +{detail.volumeMWh.toFixed(3)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    {totalActivations <= DETAIL_PAGE_SIZE && (
                                        <tfoot style={{ backgroundColor: '#fafbfc' }}>
                                            <tr>
                                                <td colSpan={5} style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 700, fontSize: '0.8rem' }}>RE TOTAL:</td>
                                                <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#1b5e20' }}>{reSettlement.totalMWh.toFixed(3)} MWh</td>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>

                                {/* Pagination Controls for Detail */}
                                {totalActivations > DETAIL_PAGE_SIZE && (
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center', 
                                        marginTop: '16px',
                                        padding: '12px 16px',
                                        backgroundColor: '#fff',
                                        borderRadius: '6px',
                                        border: '1px solid #dcd7f7'
                                    }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#403294' }}>
                                            RE TOTAL: {reSettlement.totalMWh.toFixed(3)} MWh
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <button 
                                                disabled={detailPage === 0}
                                                onClick={(e) => { e.stopPropagation(); setDetailPage(p => p - 1); }}
                                                style={{
                                                    padding: '4px', borderRadius: '4px', border: '1px solid #dcd7f7', 
                                                    backgroundColor: detailPage === 0 ? '#f4f5f7' : '#fff',
                                                    cursor: detailPage === 0 ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                <ChevronLeft size={14} color={detailPage === 0 ? '#a5adba' : '#403294'} />
                                            </button>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#172b4d' }}>
                                                Page {detailPage + 1} of {totalDetailPages}
                                            </span>
                                            <button 
                                                disabled={detailPage >= totalDetailPages - 1}
                                                onClick={(e) => { e.stopPropagation(); setDetailPage(p => p + 1); }}
                                                style={{
                                                    padding: '4px', borderRadius: '4px', border: '1px solid #dcd7f7', 
                                                    backgroundColor: detailPage >= totalDetailPages - 1 ? '#f4f5f7' : '#fff',
                                                    cursor: detailPage >= totalDetailPages - 1 ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                <ArrowRight size={14} color={detailPage >= totalDetailPages - 1 ? '#a5adba' : '#403294'} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                </>
                            ) : (
                                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '6px', border: '1px dashed #dcd7f7', color: '#6b778c', fontSize: '0.85rem' }}>
                                    No verified activations found for this retailer in the current period.
                                </div>
                            )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot style={{ backgroundColor: '#f4f5f7', borderTop: '2px solid #ebecf0' }}>
            <tr>
              <td style={pocStyles.td}></td>
              <td style={{ ...pocStyles.td, fontWeight: 700 }}>TOTAL PERIMETER</td>
              <td style={{ ...pocStyles.td, fontWeight: 700 }}>{totalCUsInPerimeter} Units</td>
              <td style={{ ...pocStyles.td, textAlign: 'right', fontWeight: 800, color: '#1b5e20' }}>
                {settlementData.totalVolumeMWh.toFixed(3)} MWh
              </td>
              <td style={pocStyles.td}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button style={{ ...pocStyles.actionButton, backgroundColor: '#fff', color: '#403294', border: '1px solid #403294', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <FileText size={14} /> Download BRP Settlement XML
          </button>
      </div>
    </div>
  );
};