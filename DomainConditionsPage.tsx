
import React, { useMemo } from 'react';
import { BRSData, MPSData } from './types';
import { implementationMap, procedures } from './jwg-data';

interface Props {
  mpsData: MPSData[];
  brsData: BRSData[];
  domainId: string; // E.g., '1', '2'
  domainTitle: string; // E.g., 'Domän 1', 'Domän 2'
  onNavigateToBRS: (id: string) => void;
  onNavigateToMPS: (id: string) => void;
  onNavigateToProcedure: (id: number) => void;
}

const styles = {
  container: {
    padding: '40px 60px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const
  },
  header: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#172b4d'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '64px',
    marginBottom: '16px',
    color: '#172b4d',
    borderBottom: '2px solid #ebecf0',
    paddingBottom: '8px'
  },
  subHeader: {
    fontSize: '1.1rem',
    color: '#5e6c84',
    marginBottom: '32px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontSize: '0.9rem',
    border: '1px solid #dfe1e6',
    marginBottom: '24px'
  },
  th: {
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 16px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #dfe1e6',
    verticalAlign: 'top' as const,
    color: '#172b4d',
    lineHeight: '1.5'
  },
  tag: {
    display: 'inline-block',
    padding: '2px 6px',
    backgroundColor: '#e6effc',
    color: '#0052cc',
    borderRadius: '3px',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  jwgTag: {
    display: 'inline-block',
    padding: '2px 6px',
    backgroundColor: '#f3e5f5', // Light purple
    color: '#4a148c',
    borderRadius: '3px',
    fontSize: '0.7rem',
    fontWeight: 500,
    border: '1px solid #e1bee7',
    marginRight: '4px',
    cursor: 'pointer',
    width: 'fit-content'
  },
  ruleId: {
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#42526e',
    backgroundColor: '#f4f5f7',
    padding: '2px 6px',
    borderRadius: '3px',
    border: '1px solid #ebecf0',
    whiteSpace: 'nowrap' as const,
    cursor: 'help'
  },
  // Status badges for inventory
  statusLinked: {
    display: 'inline-block',
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: '#e3fcef',
    color: '#006644',
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    marginBottom: '4px'
  },
  statusUnlinked: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: '#ffebe6', // Red background for unlinked
    color: '#bf2600',
    fontSize: '0.75rem',
    fontWeight: 600,
    border: '1px solid #ffbdad'
  },
  linkBox: {
    marginBottom: '8px',
    padding: '6px 8px',
    borderLeft: '3px solid #0052cc',
    backgroundColor: '#f9f9f9',
    fontSize: '0.85rem',
    transition: 'background-color 0.2s',
    cursor: 'pointer'
  },
  linkBoxHover: {
    backgroundColor: '#ebecf0'
  },
  crossDomainBox: {
    borderLeft: '3px solid #ffab00',
    backgroundColor: '#fffbf0'
  },
  crossDomainBadge: {
    display: 'inline-block',
    fontSize: '0.6rem',
    fontWeight: 700,
    color: '#172b4d',
    backgroundColor: '#ffab00',
    padding: '1px 4px',
    borderRadius: '2px',
    marginLeft: '6px',
    verticalAlign: 'text-bottom',
    textTransform: 'uppercase' as const
  },
  linkStep: {
    fontWeight: 700,
    color: '#0052cc',
    display: 'block',
    textDecoration: 'underline'
  },
  linkDetail: {
    color: '#5e6c84',
    fontSize: '0.8rem'
  },
  statsBox: {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f4f5f7',
    borderRadius: '8px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#172b4d'
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#5e6c84',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  },
  unmappedRow: {
    backgroundColor: '#fff5f5' // Light red for entire row
  }
};

const LinkableText = ({ text, onNavigate }: { text: string, onNavigate: (id: string) => void }) => {
  if (!text) return null;
  const regex = /(BRS-FLEX-\d+)/g;
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => {
        if (regex.test(part)) {
          return (
            <span 
              key={i} 
              onClick={(e) => { 
                  e.stopPropagation(); 
                  onNavigate(part); 
              }}
              style={{
                  color: '#0052cc', 
                  cursor: 'pointer', 
                  textDecoration: 'underline', 
                  fontWeight: 500
              }}
              title={`Gå till ${part}`}
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export const DomainConditionsPage: React.FC<Props> = ({ mpsData, brsData, domainId, domainTitle, onNavigateToBRS, onNavigateToMPS, onNavigateToProcedure }) => {
  
  // 1. Filter Data for Selected Domain and Sort Numerically
  const activeBRS = useMemo(() => {
    return brsData
      .filter(b => b.id.startsWith(`BRS-FLEX-${domainId}`))
      .sort((a, b) => {
        // Extract numeric part for proper sorting (e.g. 104 < 1020)
        // Removes non-digits and parses as integer
        const getNum = (id: string) => parseInt(id.replace(/\D/g, '') || '0', 10);
        return getNum(a.id) - getNum(b.id);
      });
  }, [brsData, domainId]);

  // 2. Build Mapping: Condition ID -> List of specific steps where it is used
  const conditionUsage = useMemo(() => {
    // Only map Explicit usages (direct reference to the Rule ID)
    const map: Record<string, { mpsId: string, scenarioId: string, stepId: string, title: string, mpsDomain: string }[]> = {};

    const addUsage = (id: string, usage: any) => {
        if (!map[id]) map[id] = [];
        // Avoid duplicates if same step referenced multiple times
        if (!map[id].some(u => u.scenarioId === usage.scenarioId && u.stepId === usage.stepId)) {
            map[id].push(usage);
        }
    };

    // Iterate over ALL MPS data to find cross-domain references
    mpsData.forEach(mps => {
        // Extract domain from MPS ID (e.g. MPS-FLEX-200 -> 2)
        const mpsDomainMatch = mps.id.match(/MPS-FLEX-(\d)/);
        const mpsDomain = mpsDomainMatch ? mpsDomainMatch[1] : '?';

        mps.scenarios.forEach(sc => {
            sc.steps.forEach((step) => {
                const usageBase = {
                    mpsId: mps.id,
                    scenarioId: sc.id,
                    stepId: step.stepId,
                    title: sc.title,
                    mpsDomain: mpsDomain
                };

                // STRICT: Only map if the step explicitly references the specific Rule ID.
                if (step.refRule) {
                    addUsage(step.refRule, usageBase);
                } 
            });
        });
    });
    return map;
  }, [mpsData]);

  // Helper to find linked JWG procedures for a BRS
  const getJwgProcedures = (brsId: string) => {
    const matchedIds: number[] = [];
    Object.entries(implementationMap).forEach(([procId, brsList]) => {
        if (brsList.includes(brsId)) {
            matchedIds.push(Number(procId));
        }
    });
    return matchedIds.sort((a, b) => a - b);
  };

  // 3. Calculate Stats
  const stats = useMemo(() => {
    let totalPre = 0;
    let coveredPre = 0;
    let totalPost = 0;
    let coveredPost = 0;

    activeBRS.forEach(brs => {
        // Pre-conditions
        brs.preConditions.forEach(c => {
            totalPre++;
            const cId = typeof c === 'string' ? null : c.id;
            if (cId && conditionUsage[cId] && conditionUsage[cId].length > 0) {
                coveredPre++;
            }
        });

        // Post-conditions (Accepted)
        const accepted = Array.isArray(brs.postConditions.accepted) 
            ? brs.postConditions.accepted 
            : [brs.postConditions.accepted].filter(Boolean);
        
        accepted.forEach(c => {
            totalPost++;
            const cId = typeof c === 'string' ? null : c.id;
            if (cId && conditionUsage[cId] && conditionUsage[cId].length > 0) {
                coveredPost++;
            }
        });
    });

    return { totalPre, coveredPre, totalPost, coveredPost };
  }, [activeBRS, conditionUsage]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>MPS/BRS översikt: {domainTitle}</h1>
      <p style={styles.subHeader}>
        Översikt över processer i {domainTitle}. Denna vy identifierar gap mellan kravställning (BRS) och processflöden (MPS).
      </p>

      <div style={{marginBottom: '24px', color: '#5e6c84', fontSize: '0.95rem'}}>
        Här listas alla definierade start- och slutvillkor i <strong>{domainTitle}</strong>. 
        Rader markerade med <strong>rött</strong> saknar en explicit koppling till ett steg i en marknadsprocess (MPS).
        <br/><br/>
        <em>Obs: Täckningen kontrolleras mot <strong>alla</strong> MPS:er i systemet. Kopplingar från andra domäner markeras med <span style={{backgroundColor: '#ffab00', color:'#172b4d', padding: '0 4px', borderRadius:'2px', fontWeight:700, fontSize:'0.7rem'}}>ORANGE</span>.</em>
      </div>

      <div style={styles.statsBox}>
        <div style={styles.statItem}>
            <span style={styles.statLabel}>Totalt Antal Villkor</span>
            <span style={styles.statValue}>{stats.totalPre + stats.totalPost}</span>
        </div>
        <div style={styles.statItem}>
            <span style={styles.statLabel}>Täckta av MPS</span>
            <span style={{...styles.statValue, color: '#006644'}}>{stats.coveredPre + stats.coveredPost}</span>
        </div>
        <div style={styles.statItem}>
            <span style={styles.statLabel}>Saknar Koppling</span>
            <span style={{...styles.statValue, color: '#bf2600'}}>
                {(stats.totalPre + stats.totalPost) - (stats.coveredPre + stats.coveredPost)}
            </span>
        </div>
        <div style={{...styles.statItem, marginLeft: 'auto', textAlign: 'right'}}>
            <span style={styles.statLabel}>Täckningsgrad</span>
            <span style={styles.statValue}>
                {Math.round(((stats.coveredPre + stats.coveredPost) / (stats.totalPre + stats.totalPost || 1)) * 100)}%
            </span>
        </div>
      </div>

      <h3 style={{fontSize: '1.2rem', color: '#172b4d', marginBottom: '12px'}}>Alla Startvillkor (Pre-conditions)</h3>
      <table style={styles.table}>
        <thead>
            <tr>
                <th style={{...styles.th, width: '20%'}}>BRS & JWG</th>
                <th style={{...styles.th, width: '10%'}}>Villkors-ID</th>
                <th style={{...styles.th, width: '42%'}}>Beskrivning</th>
                <th style={{...styles.th, width: '28%'}}>MPS Täckning (Explicit Ref)</th>
            </tr>
        </thead>
        <tbody>
            {activeBRS.flatMap(brs => {
                const jwgIds = getJwgProcedures(brs.id);
                return brs.preConditions.map((cond: any, idx) => {
                    const cId = typeof cond === 'string' ? null : cond.id;
                    const desc = typeof cond === 'string' ? cond : cond.description;
                    const usages = cId ? conditionUsage[cId] : null;
                    const isUnmapped = !usages || usages.length === 0;

                    return (
                        <tr key={`${brs.id}-${idx}`} style={isUnmapped ? styles.unmappedRow : {}}>
                            <td style={styles.td}>
                                <div 
                                    style={styles.tag} 
                                    onClick={() => onNavigateToBRS(brs.id)}
                                >
                                    {brs.id}
                                </div>
                                {jwgIds.length > 0 && (
                                    <div style={{marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px'}}>
                                        {jwgIds.map(pid => {
                                            const procName = procedures.find(p => p.id === pid)?.name || '';
                                            return (
                                                <div 
                                                    key={pid} 
                                                    style={styles.jwgTag}
                                                    title={`Gå till JWG Procedure ${pid}: ${procName}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onNavigateToProcedure(pid);
                                                    }}
                                                >
                                                    <span style={{fontWeight: 700}}>JWG {pid}:</span> {procName}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </td>
                            <td style={styles.td}>
                                {cId ? (
                                    <span style={styles.ruleId} title={desc}>{cId}</span>
                                ) : (
                                    <span style={{fontStyle: 'italic', color: '#999', fontSize: '0.8rem'}}>N/A (Text)</span>
                                )}
                            </td>
                            <td style={styles.td}>
                                <LinkableText text={desc} onNavigate={onNavigateToBRS} />
                            </td>
                            <td style={styles.td}>
                                {usages && usages.length > 0 ? (
                                    usages.map((u, uIdx) => {
                                        const isCrossDomain = u.mpsDomain && u.mpsDomain !== domainId;
                                        return (
                                            <div 
                                                key={uIdx} 
                                                style={{
                                                    ...styles.linkBox,
                                                    ...(isCrossDomain ? styles.crossDomainBox : {})
                                                }}
                                                onClick={() => onNavigateToMPS(u.stepId)}
                                                title={`Gå till scenario ${u.scenarioId}, steg ${u.stepId}`}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ebecf0'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isCrossDomain ? '#fffbf0' : '#f9f9f9'}
                                            >
                                                <span style={styles.linkStep}>
                                                    Steg {u.stepId}
                                                    {isCrossDomain && <span style={styles.crossDomainBadge}>Domän {u.mpsDomain}</span>}
                                                </span>
                                                <span style={styles.linkDetail}>{u.mpsId}: {u.title}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span style={styles.statusUnlinked}>Ej kopplad i MPS</span>
                                )}
                            </td>
                        </tr>
                    );
                })
            })}
        </tbody>
      </table>

      <h3 style={{fontSize: '1.2rem', color: '#172b4d', marginBottom: '12px', marginTop: '40px'}}>Alla Slutvillkor (Post-conditions: Accepted)</h3>
      <table style={styles.table}>
        <thead>
            <tr>
                <th style={{...styles.th, width: '20%'}}>BRS & JWG</th>
                <th style={{...styles.th, width: '10%'}}>Villkors-ID</th>
                <th style={{...styles.th, width: '42%'}}>Beskrivning</th>
                <th style={{...styles.th, width: '28%'}}>MPS Täckning (Explicit Ref)</th>
            </tr>
        </thead>
        <tbody>
            {activeBRS.flatMap(brs => {
                const jwgIds = getJwgProcedures(brs.id);
                const conditions = Array.isArray(brs.postConditions.accepted) 
                    ? brs.postConditions.accepted 
                    : [brs.postConditions.accepted].filter(Boolean);

                return conditions.map((cond: any, idx: number) => {
                    const cId = typeof cond === 'string' ? null : cond.id;
                    const desc = typeof cond === 'string' ? cond : cond.description;
                    const usages = cId ? conditionUsage[cId] : null;
                    const isUnmapped = !usages || usages.length === 0;

                    return (
                        <tr key={`${brs.id}-post-${idx}`} style={isUnmapped ? styles.unmappedRow : {}}>
                            <td style={styles.td}>
                                <div 
                                    style={styles.tag} 
                                    onClick={() => onNavigateToBRS(brs.id)}
                                >
                                    {brs.id}
                                </div>
                                {jwgIds.length > 0 && (
                                    <div style={{marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px'}}>
                                        {jwgIds.map(pid => {
                                            const procName = procedures.find(p => p.id === pid)?.name || '';
                                            return (
                                                <div 
                                                    key={pid} 
                                                    style={styles.jwgTag}
                                                    title={`Gå till JWG Procedure ${pid}: ${procName}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onNavigateToProcedure(pid);
                                                    }}
                                                >
                                                    <span style={{fontWeight: 700}}>JWG {pid}:</span> {procName}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </td>
                            <td style={styles.td}>
                                {cId ? (
                                    <span style={styles.ruleId} title={desc}>{cId}</span>
                                ) : (
                                    <span style={{fontStyle: 'italic', color: '#999', fontSize: '0.8rem'}}>N/A (Text)</span>
                                )}
                            </td>
                            <td style={styles.td}>
                                <LinkableText text={desc} onNavigate={onNavigateToBRS} />
                            </td>
                            <td style={styles.td}>
                                {usages && usages.length > 0 ? (
                                    usages.map((u, uIdx) => {
                                        const isCrossDomain = u.mpsDomain && u.mpsDomain !== domainId;
                                        return (
                                            <div 
                                                key={uIdx} 
                                                style={{
                                                    ...styles.linkBox,
                                                    ...(isCrossDomain ? styles.crossDomainBox : {})
                                                }}
                                                onClick={() => onNavigateToMPS(u.stepId)}
                                                title={`Gå till scenario ${u.scenarioId}, steg ${u.stepId}`}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ebecf0'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isCrossDomain ? '#fffbf0' : '#f9f9f9'}
                                            >
                                                <span style={styles.linkStep}>
                                                    Steg {u.stepId}
                                                    {isCrossDomain && <span style={styles.crossDomainBadge}>Domän {u.mpsDomain}</span>}
                                                </span>
                                                <span style={styles.linkDetail}>{u.mpsId}: {u.title}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span style={styles.statusUnlinked}>Ej kopplad i MPS</span>
                                )}
                            </td>
                        </tr>
                    );
                });
            })}
        </tbody>
      </table>

    </div>
  );
};
