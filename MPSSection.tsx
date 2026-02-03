
import React, { useEffect, useRef, useMemo } from 'react';
import { MPSData, BRSData, Scenario, DocStatus, Revision } from './types';
import { MermaidDiagram } from './MermaidDiagram';
import { procedures, implementationMap } from './jwg-data';

interface MPSSectionProps {
  activeMPS: MPSData;
  brsList: BRSData[];
  styles: any;
  onNavigateToBRS: (brsId: string) => void;
  onNavigateToProcedure: (procId: number) => void;
  scrollToId?: string | null;
  // Navigation props
  prevMPS?: { id: string; title: string };
  nextMPS?: { id: string; title: string };
  onNavigateToMPS: (id: string) => void;
}

const StatusBadge = ({ status }: { status?: DocStatus }) => {
  let bgColor = '#e3fcef'; // Default Green (Active)
  let color = '#006644';
  let label = status || 'ACTIVE';

  if (status === 'LEGACY') {
    bgColor = '#f4f5f7'; // Gray
    color = '#505f79';
  } else if (status === 'DRAFT') {
    bgColor = '#fff0b3'; // Yellow
    color = '#172b4d';
  } else if (status === 'Legacy - Implemented') {
    bgColor = '#e3fcef'; // Green
    color = '#006644';
  } else if (status === 'Legacy - Partially implemented') {
    bgColor = '#fff0b3'; // Yellow
    color = '#172b4d';
  } else if (status === 'Legacy - Not implemented') {
    bgColor = '#ffebe6'; // Red
    color = '#bf2600';
  }

  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 700,
      backgroundColor: bgColor,
      color: color,
      marginLeft: '12px',
      textTransform: 'uppercase',
      verticalAlign: 'middle',
      border: `1px solid ${color}20`
    }}>
      {label}
    </span>
  );
};

const HistoryTable = ({ history }: { history?: Revision[] }) => {
  if (!history || history.length === 0) return null;

  return (
    <div style={{ marginTop: '48px', borderTop: '2px solid #ebecf0', paddingTop: '24px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#172b4d', marginBottom: '16px' }}>Revisionshistorik</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f5f7', color: '#42526e' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6', width: '100px' }}>Version</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6', width: '120px' }}>Datum</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6', width: '150px' }}>Författare</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6' }}>Beskrivning</th>
          </tr>
        </thead>
        <tbody>
          {history.map((rev, idx) => (
            <tr key={idx}>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0', fontWeight: 600 }}>{rev.version}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0', color: '#6b778c' }}>{rev.date}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0' }}>{rev.author}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0' }}>{rev.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const navBtnStyle = {
    padding: '8px 16px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#0052cc',
    fontWeight: 600,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
};

export const MPSSection: React.FC<MPSSectionProps> = ({ 
    activeMPS, brsList, styles, 
    onNavigateToBRS, onNavigateToProcedure, onNavigateToMPS,
    scrollToId, prevMPS, nextMPS 
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  // Filter scenarios to exclude failure cases
  const visibleScenarios = useMemo(() => {
    return activeMPS.scenarios.filter(sc => {
         const t = sc.title.toLowerCase();
         return !(t.includes('misslyckad') || t.includes('avslag') || t.includes('underkänt'));
    });
  }, [activeMPS.scenarios]);

  // Reset scroll position when switching MPS
  useEffect(() => {
    if (rootRef.current && !scrollToId) {
        // Find the scrollable container (the mainScroll div in index.tsx)
        let parent = rootRef.current.parentElement;
        while (parent) {
            const style = window.getComputedStyle(parent);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                parent.scrollTop = 0;
                break;
            }
            parent = parent.parentElement;
            if (parent === document.body) break; 
        }
    }
  }, [activeMPS.id, scrollToId]);

  // Scroll to specific ID if provided
  useEffect(() => {
    if (scrollToId) {
        setTimeout(() => {
            const element = document.getElementById(scrollToId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Add temporary highlight effect
                const originalBg = element.style.backgroundColor;
                element.style.backgroundColor = '#fff7d6';
                element.style.transition = 'background-color 0.5s';
                
                setTimeout(() => { 
                    element.style.backgroundColor = originalBg; 
                }, 2000);
            }
        }, 100);
    }
  }, [scrollToId, activeMPS.id]);
  
  const getBRS = (brsId?: string) => {
    if (!brsId) return null;
    return brsList.find(b => b.id === brsId);
  }

  const scrollToScenario = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getRuleDescription = (brsId?: string, ruleId?: string) => {
    if (!brsId || !ruleId) return null;
    const brs = getBRS(brsId);
    if (!brs) return null;

    const findIn = (list: any[]) => {
        if (!list || !Array.isArray(list)) return null;
        return list.find(item => typeof item !== 'string' && item.id === ruleId);
    };

    const pre = findIn(brs.preConditions);
    if (pre) return pre.description;

    const postAcc = findIn(Array.isArray(brs.postConditions.accepted) ? brs.postConditions.accepted : []);
    if (postAcc) return postAcc.description;

    const postRej = findIn(Array.isArray(brs.postConditions.rejected) ? brs.postConditions.rejected : []);
    if (postRej) return postRej.description;

    const rule = findIn(brs.businessRules);
    if (rule) return rule.description;

    const proc = findIn(brs.process);
    if (proc) return proc.description;

    return null;
  };

  const getJwgProcedures = (brsId: string): number[] => {
    if (!brsId) return [];
    const matchedIds: number[] = [];
    Object.entries(implementationMap).forEach(([procId, brsList]) => {
        if (brsList.includes(brsId)) {
            matchedIds.push(Number(procId));
        }
    });
    return matchedIds.sort((a, b) => a - b);
  };

  const getScenarioJwgIds = (scenario: Scenario): number[] => {
    const ids = new Set<number>();
    
    // Explicit refs in data (legacy/manual)
    if (scenario.refJWG) {
        const matches = scenario.refJWG.match(/\d+/g);
        if (matches) matches.forEach(m => ids.add(parseInt(m, 10)));
    }

    // Derived refs from steps (automatic)
    scenario.steps.forEach(step => {
        if (step.refBRS) {
            const stepJwgs = getJwgProcedures(step.refBRS);
            stepJwgs.forEach(id => ids.add(id));
        }
    });

    return Array.from(ids).sort((a, b) => a - b);
  };

  const localStyles = {
    prerequisiteRow: {
        backgroundColor: '#fff8e1',
        color: '#42526e'
    },
    prerequisiteBadge: {
        fontSize: '0.65rem',
        textTransform: 'uppercase' as const,
        fontWeight: 700,
        backgroundColor: '#ffab00',
        color: '#172b4d',
        padding: '2px 6px',
        borderRadius: '3px',
        display: 'inline-block',
        marginTop: '4px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
    },
    brokenLink: {
        color: '#bf2600',
        fontWeight: 600,
        textDecoration: 'line-through',
        cursor: 'not-allowed'
    },
    brokenTooltip: {
        fontSize: '0.7rem',
        color: '#bf2600',
        display: 'block'
    },
    anchorLink: {
        background: 'none',
        border: 'none',
        padding: 0,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: '#0052cc',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
    },
    jwgButton: {
        backgroundColor: '#e3fcef', 
        color: '#006644', 
        padding: '2px 6px', 
        borderRadius: '3px', 
        fontSize: '0.8rem', 
        fontWeight: 600, 
        whiteSpace: 'nowrap' as const,
        border: '1px solid #36b37e',
        cursor: 'pointer',
        marginRight: '4px',
        marginBottom: '2px',
        display: 'inline-block'
    },
    stepJwgButton: {
        backgroundColor: '#f3e5f5', 
        color: '#4a148c',
        border: '1px solid #e1bee7',
        borderRadius: '3px',
        fontSize: '0.65rem',
        padding: '1px 4px',
        cursor: 'pointer',
        fontWeight: 500,
        whiteSpace: 'nowrap' as const,
    }
  };

  return (
    <div ref={rootRef}>
      {/* Navigation Buttons */}
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
         <div>
            {prevMPS && (
                <button 
                    style={navBtnStyle}
                    onClick={() => onNavigateToMPS(prevMPS.id)}
                    title={prevMPS.title}
                >
                    <span>←</span> {prevMPS.id}
                </button>
            )}
         </div>
         <div>
            {nextMPS && (
                <button 
                    style={navBtnStyle}
                    onClick={() => onNavigateToMPS(nextMPS.id)}
                    title={nextMPS.title}
                >
                    {nextMPS.id} <span>→</span>
                </button>
            )}
         </div>
      </div>

      <div style={styles.docId}>{activeMPS.id} <StatusBadge status={activeMPS.status} /></div>
      <h1 style={styles.docTitle}>{activeMPS.title}</h1>
      
      <div style={{
          backgroundColor: '#f4f5f7', 
          padding: '16px', 
          borderRadius: '4px', 
          marginBottom: '24px',
          borderLeft: '4px solid #0052cc'
      }}>
          <div style={{fontWeight: 600, color: '#555', marginBottom: '4px'}}>Domain</div>
          <div style={{marginBottom: '12px'}}>{activeMPS.domain}</div>
          
          <div style={{fontWeight: 600, color: '#555', marginBottom: '4px'}}>Trigger</div>
          <div>{activeMPS.trigger}</div>
      </div>

      <section>
        <h2 style={styles.sectionHeader}>Process Description</h2>
        <p style={styles.paragraph}>{activeMPS.purpose}</p>

        {activeMPS.actors && activeMPS.actors.length > 0 && (
          <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '16px' }}>
             <strong>Actors:</strong> 
             <span style={{marginLeft: '4px'}}>
               {activeMPS.actors.map(a => a.role).join(', ')}
             </span>
          </div>
        )}
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Scenario Overview</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, width: '15%'}}>ID</th>
              <th style={{...styles.th, width: '25%'}}>Title</th>
              <th style={{...styles.th, width: '15%'}}>JWG Ref</th>
              <th style={{...styles.th, width: '45%'}}>Description</th>
            </tr>
          </thead>
          <tbody>
            {visibleScenarios.map((sc, idx) => {
                const jwgIds = getScenarioJwgIds(sc);

                return (
                  <tr key={sc.id} style={idx % 2 === 1 ? styles.trEven : {}}>
                    <td style={styles.td}>
                        <button 
                            onClick={() => scrollToScenario(sc.id)}
                            style={localStyles.anchorLink}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                            {sc.id}
                        </button>
                    </td>
                    <td style={styles.td}>{sc.title}</td>
                    <td style={styles.td}>
                        {jwgIds.length > 0 ? (
                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {jwgIds.map(id => {
                                const proc = procedures.find(p => p.id === id);
                                const tooltip = proc ? `JWG ${id}: ${proc.name}` : `Gå till JWG Procedure ${id}`;
                                
                                return (
                                <button
                                    key={id}
                                    style={localStyles.jwgButton}
                                    onClick={() => onNavigateToProcedure(id)}
                                    title={tooltip}
                                >
                                    JWG {id}
                                </button>
                            )})}
                            </div>
                        ) : (
                            <span style={{color: '#999', fontSize: '0.8rem'}}>-</span>
                        )}
                    </td>
                    <td style={styles.td}>{sc.description}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Scenarios</h2>
        {visibleScenarios.map((scenario, index) => {
            const jwgIds = getScenarioJwgIds(scenario);
            
            return (
              <div 
                key={scenario.id} 
                id={scenario.id}
                style={{
                    marginBottom: '40px',
                    scrollMarginTop: '80px' // Offset for sticky header
                }}
              >
                <h3 style={styles.subHeader}>{scenario.id} - {scenario.title}</h3>
                {jwgIds.length > 0 && (
                    <div style={{marginBottom: '12px', display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <span style={{fontSize: '0.85rem', color: '#555', fontWeight: 600, marginRight: '8px'}}>JWG Reference:</span>
                        {jwgIds.map(id => {
                            const proc = procedures.find(p => p.id === id);
                            const tooltip = proc ? `JWG ${id}: ${proc.name}` : `Gå till JWG Procedure ${id}`;

                            return (
                            <button
                                key={id}
                                style={localStyles.jwgButton}
                                onClick={() => onNavigateToProcedure(id)}
                                title={tooltip}
                            >
                                JWG {id}
                            </button>
                        )})}
                    </div>
                )}
                {scenario.description && <p style={{...styles.paragraph, fontStyle: 'italic', color: '#666'}}>{scenario.description}</p>}
                
                {scenario.diagramCode && (
                  <div style={{ ...styles.diagramWrapper, marginBottom: '24px' }}>
                    <MermaidDiagram key={`${activeMPS.id}-${scenario.id}`} chart={scenario.diagramCode} />
                  </div>
                )}

                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={{...styles.th, width: '8%'}}>Step</th>
                      <th style={{...styles.th, width: '12%'}}>Role</th>
                      <th style={{...styles.th, width: '15%'}}>Action</th>
                      <th style={{...styles.th, width: '40%'}}>Description</th>
                      <th style={{...styles.th, width: '25%'}}>References</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenario.steps.map((step, sIdx) => {
                      const ruleDesc = getRuleDescription(step.refBRS, step.refRule);
                      const isPre = step.isPrerequisite;
                      const brsExists = step.refBRS ? !!getBRS(step.refBRS) : true;
                      const stepJwgIds = step.refBRS ? getJwgProcedures(step.refBRS) : [];
                      
                      let rowStyle = sIdx % 2 === 1 ? styles.trEven : {};
                      if (isPre) {
                          rowStyle = { ...rowStyle, ...localStyles.prerequisiteRow };
                      }

                      const descStyle = isPre ? { fontStyle: 'italic', color: '#505f79' } : {};

                      return (
                        <tr key={sIdx} id={step.stepId} style={rowStyle}>
                            <td style={styles.td}>
                                <strong>{step.stepId}</strong>
                                {isPre && <div style={localStyles.prerequisiteBadge}>Prerequisite</div>}
                            </td>
                            <td style={styles.td}>{step.role}</td>
                            <td style={styles.td}>{step.action}</td>
                            <td style={{...styles.td, ...descStyle}}>{step.description}</td>
                            <td style={styles.td}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                                {step.refBRS && (
                                    brsExists ? (
                                        <>
                                            <button 
                                                onClick={() => onNavigateToBRS(step.refBRS!)}
                                                style={{
                                                    background: 'none', 
                                                    border: 'none', 
                                                    color: isPre ? '#172b4d' : '#0052cc', 
                                                    textDecoration: 'underline', 
                                                    cursor: 'pointer', 
                                                    padding: 0,
                                                    fontFamily: 'inherit',
                                                    fontSize: '0.85rem',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                {step.refBRS}
                                            </button>
                                            
                                            {/* JWG Tags for Step */}
                                            {stepJwgIds.length > 0 && (
                                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
                                                    {stepJwgIds.map(pid => (
                                                        <button
                                                            key={pid}
                                                            style={localStyles.stepJwgButton}
                                                            onClick={() => onNavigateToProcedure(pid)}
                                                            title={`Related to JWG Procedure ${pid}`}
                                                        >
                                                            JWG {pid}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div>
                                            <span style={localStyles.brokenLink}>{step.refBRS}</span>
                                            <span style={localStyles.brokenTooltip}>⚠️ Missing Reference</span>
                                        </div>
                                    )
                                )}
                                {step.refRule && (
                                    <>
                                        <span 
                                            style={{
                                                fontSize: '0.8rem', 
                                                color: isPre ? '#42526e' : '#666', 
                                                fontFamily: 'monospace', 
                                                fontWeight: 600,
                                                cursor: 'help'
                                            }}
                                            title={ruleDesc || ''}
                                        >
                                            {step.refRule}
                                        </span>
                                        {ruleDesc ? (
                                            <span style={{fontSize: '0.75rem', color: isPre ? '#505f79' : '#555', fontStyle: 'italic', lineHeight: '1.2', marginTop: '2px'}}>
                                                {ruleDesc}
                                            </span>
                                        ) : (
                                            step.refBRS && brsExists && <span style={{fontSize: '0.7rem', color: '#bf2600'}}>Rule not found</span>
                                        )}
                                    </>
                                )}
                            </div>
                            </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
        })}
      </section>
      
      <HistoryTable history={activeMPS.history} />
    </div>
  );
};
