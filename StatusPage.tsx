
import React, { useState, useMemo } from 'react';
import { BRSData, MPSData, DocStatus } from './types';
import { calculateQuality, QualityReport, SectionScore } from './QualityCalculator';
import { calculateMPSQuality, MPSQualityReport } from './MPSQualityCalculator';
import { renumberingMap } from './id-mapping';

interface StatusPageProps {
  data: BRSData[];
  mpsData?: MPSData[];
  onSelectBRS: (id: string) => void;
  onSelectMPS?: (id: string) => void;
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const
  },
  header: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '24px',
    color: '#172b4d'
  },
  sectionHeader: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginTop: '48px',
    marginBottom: '16px',
    color: '#42526e',
    borderBottom: '2px solid #ebecf0',
    paddingBottom: '8px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontSize: '0.85rem'
  },
  thSortable: {
    cursor: 'pointer',
    userSelect: 'none' as const,
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 12px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600,
    position: 'sticky' as const,
    top: 0,
    whiteSpace: 'nowrap' as const
  },
  thCenterSortable: {
    cursor: 'pointer',
    userSelect: 'none' as const,
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 12px',
    textAlign: 'center' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600,
    position: 'sticky' as const,
    top: 0,
    whiteSpace: 'nowrap' as const
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid #dfe1e6',
    color: '#333',
    verticalAlign: 'middle' as const
  },
  idCell: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: '#0052cc',
    cursor: 'pointer'
  },
  scoreCell: {
    textAlign: 'center' as const,
    fontWeight: 500,
    width: '80px',
    cursor: 'help'
  },
  cellInner: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    minWidth: '36px',
    fontSize: '0.8rem'
  },
  // Integrity Box Styles
  integrityBox: {
    marginBottom: '32px',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid',
  },
  integrityOk: {
    backgroundColor: '#e3fcef',
    borderColor: '#36b37e',
    color: '#006644'
  },
  integrityError: {
    backgroundColor: '#ffebe6',
    borderColor: '#ff5630',
    color: '#bf2600'
  },
  integrityTitle: {
    fontWeight: 700,
    fontSize: '1.2rem',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  errorList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  errorItem: {
    padding: '8px 0',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '12px',
    fontSize: '0.9rem'
  },
  impactBox: {
    backgroundColor: '#e6effc',
    borderColor: '#0052cc',
    color: '#172b4d',
    border: '1px solid',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '32px'
  }
};

const getScoreColor = (score: number) => {
  if (score === 100) return { bg: '#e3fcef', color: '#006644' }; // Green
  if (score >= 80) return { bg: '#fff0b3', color: '#172b4d' }; // Yellow
  if (score >= 50) return { bg: '#ffebd6', color: '#974f0c' }; // Orange
  return { bg: '#ffebe6', color: '#bf2600' }; // Red
};

const ScoreDisplay = ({ data }: { data: SectionScore }) => {
  const colors = getScoreColor(data.score);
  const tooltip = data.issues.length > 0 
    ? data.issues.join('\n') 
    : 'OK';

  return (
    <span 
      title={tooltip}
      style={{ 
        ...styles.cellInner, 
        backgroundColor: colors.bg, 
        color: colors.color 
      }}>
      {data.score}%
    </span>
  );
};

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
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '0.65rem',
      fontWeight: 700,
      backgroundColor: bgColor,
      color: color,
      textTransform: 'uppercase',
      border: `1px solid ${color}20`
    }}>
      {label}
    </span>
  );
};


// --- Integrity Check Function ---
interface IntegrityError {
  mpsId: string;
  scenarioId: string;
  stepId: string;
  refBRS: string;
  refRule?: string;
  type: 'MISSING_BRS' | 'MISSING_RULE';
}

const checkIntegrity = (mpsList: MPSData[], brsList: BRSData[]): IntegrityError[] => {
  const errors: IntegrityError[] = [];
  const brsMap = new Map(brsList.map(b => [b.id, b]));

  mpsList.forEach(mps => {
    mps.scenarios.forEach(sc => {
      sc.steps.forEach(step => {
        if (step.refBRS) {
          const brs = brsMap.get(step.refBRS);
          
          if (!brs) {
            errors.push({
              mpsId: mps.id,
              scenarioId: sc.id,
              stepId: step.stepId,
              refBRS: step.refBRS,
              type: 'MISSING_BRS'
            });
          } else if (step.refRule) {
            // Check if rule exists in BRS (Pre, Post, BusinessRules, Process)
            const allIds = [
              ...brs.preConditions.map(p => typeof p === 'string' ? null : p.id),
              ...brs.businessRules.map(r => r.id),
              ...brs.process.map(p => typeof p === 'string' ? null : p.id),
              ...(Array.isArray(brs.postConditions.accepted) ? brs.postConditions.accepted : [brs.postConditions.accepted]).map((p: any) => p?.id),
              ...(Array.isArray(brs.postConditions.rejected) ? brs.postConditions.rejected : [brs.postConditions.rejected]).map((p: any) => p?.id),
            ].filter(Boolean);

            if (!allIds.includes(step.refRule)) {
               errors.push({
                mpsId: mps.id,
                scenarioId: sc.id,
                stepId: step.stepId,
                refBRS: step.refBRS,
                refRule: step.refRule,
                type: 'MISSING_RULE'
              });
            }
          }
        }
      });
    });
  });

  return errors;
};

// --- Impact Analysis Function ---
interface ImpactItem {
    mpsId: string;
    stepId: string;
    oldRef: string;
    newRef: string;
}

const checkRenumberingImpact = (mpsList: MPSData[]): ImpactItem[] => {
    const impacts: ImpactItem[] = [];
    const changeMap = new Map(renumberingMap.filter(m => m.type !== 'no_change').map(m => [`BRS-FLEX-${m.oldId}`, `BRS-FLEX-${m.newId}`]));
    
    // Create a set of all valid NEW IDs to filter false positives (where IDs are reused)
    const validNewIds = new Set(renumberingMap.map(m => `BRS-FLEX-${m.newId}`));

    mpsList.forEach(mps => {
        mps.scenarios.forEach(sc => {
            sc.steps.forEach(step => {
                // Logic: 
                // 1. It must match an entry in changeMap (meaning it's an old ID for something).
                // 2. BUT if it matches a validNewId, we assume it has already been migrated to point to the new process with that ID.
                if (step.refBRS && changeMap.has(step.refBRS)) {
                    // Check if it's a false positive (reused ID)
                    if (!validNewIds.has(step.refBRS)) {
                        impacts.push({
                            mpsId: mps.id,
                            stepId: step.stepId,
                            oldRef: step.refBRS,
                            newRef: changeMap.get(step.refBRS)!
                        });
                    }
                }
            });
        });
    });
    return impacts;
}

type SortKey = 'id' | 'title' | 'status' | 'purpose' | 'diagram' | 'startConditions' | 'stopConditions' | 'businessRules' | 'flows' | 'content' | 'total' 
             | 'meta' | 'scenarios' | 'traceability' | 'conditionCoverage'; 

export const StatusPage: React.FC<StatusPageProps> = ({ data, mpsData = [], onSelectBRS, onSelectMPS }) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'id', direction: 'asc' });
  const [mpsSortConfig, setMpsSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'id', direction: 'asc' });

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleMpsSort = (key: SortKey) => {
    setMpsSortConfig(prev => {
        if (prev.key === key) {
          return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
        }
        return { key, direction: 'asc' };
      });
  }

  const getSortIcon = (key: SortKey, currentConfig: any) => {
    if (currentConfig.key !== key) return null;
    return currentConfig.direction === 'asc' ? ' ↓' : ' ↑';
  };

  // --- Calculations ---
  const processedData = useMemo(() => {
    return data.map(brs => ({
      ...brs,
      report: calculateQuality(brs)
    }));
  }, [data]);

  const sortedData = useMemo(() => {
    const sorted = [...processedData];
    const { key, direction } = sortConfig;
    const multiplier = direction === 'asc' ? 1 : -1;

    sorted.sort((a, b) => {
      if (key === 'id') {
        const getNum = (idStr: string) => {
          const match = idStr.match(/BRS-[A-Z]+-(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        };
        const numA = getNum(a.id);
        const numB = getNum(b.id);
        if (numA !== numB) return (numA - numB) * multiplier;
        return a.id.localeCompare(b.id) * multiplier;
      }
      if (key === 'title') return a.title.localeCompare(b.title) * multiplier;
      if (key === 'status') return (a.status || '').localeCompare(b.status || '') * multiplier;
      if (key === 'total') return (a.report.total - b.report.total) * multiplier;

      const scoreA = (a.report as any)[key]?.score ?? 0;
      const scoreB = (b.report as any)[key]?.score ?? 0;
      return (scoreA - scoreB) * multiplier;
    });
    return sorted;
  }, [processedData, sortConfig]);

  const processedMPS = useMemo(() => {
    return mpsData.map(mps => ({
        ...mps,
        report: calculateMPSQuality(mps, data) 
    }));
  }, [mpsData, data]);

  const sortedMPS = useMemo(() => {
    const sorted = [...processedMPS];
    const { key, direction } = mpsSortConfig;
    const multiplier = direction === 'asc' ? 1 : -1;

    sorted.sort((a, b) => {
        if (key === 'id') return a.id.localeCompare(b.id) * multiplier;
        if (key === 'title') return a.title.localeCompare(b.title) * multiplier;
        if (key === 'status') return (a.status || '').localeCompare(b.status || '') * multiplier;
        if (key === 'total') return (a.report.total - b.report.total) * multiplier;

        const scoreA = (a.report as any)[key]?.score ?? 0;
        const scoreB = (b.report as any)[key]?.score ?? 0;
        return (scoreA - scoreB) * multiplier;
    });
    return sorted;
  }, [processedMPS, mpsSortConfig]);

  // Run Integrity Check
  const integrityErrors = useMemo(() => checkIntegrity(mpsData, data), [mpsData, data]);
  
  // Run Renumbering Impact Analysis
  const renumberingImpacts = useMemo(() => checkRenumberingImpact(mpsData), [mpsData]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Quality Assurance Dashboard</h1>
      
      {/* Integrity Check Panel */}
      <div style={{
        ...styles.integrityBox,
        ...(integrityErrors.length > 0 ? styles.integrityError : styles.integrityOk)
      }}>
        <div style={styles.integrityTitle}>
          {integrityErrors.length > 0 ? '⚠️ Integrity Issues Found' : '✅ System Integrity OK'}
        </div>
        
        {integrityErrors.length > 0 ? (
          <div>
            <p style={{marginTop: 0, marginBottom: '16px'}}>
              Följande <strong>{integrityErrors.length}</strong> referenser i MPS-scenarier pekar på BRS-objekt eller regler som inte existerar. 
              Detta kan bero på att BRS-filer har bytt namn eller ID (t.ex. 104 &rarr; 1040).
            </p>
            <ul style={styles.errorList}>
              {integrityErrors.map((err, idx) => (
                <li key={idx} style={styles.errorItem}>
                  <div style={{minWidth: '150px', fontWeight: 600}}>{err.mpsId}</div>
                  <div style={{minWidth: '80px'}}>{err.stepId}</div>
                  <div style={{flex: 1}}>
                    {err.type === 'MISSING_BRS' 
                      ? <span>References missing BRS: <code style={{backgroundColor: 'rgba(255,255,255,0.5)', padding: '2px 4px'}}>{err.refBRS}</code></span>
                      : <span>References missing Rule: <code style={{backgroundColor: 'rgba(255,255,255,0.5)', padding: '2px 4px'}}>{err.refRule}</code> in {err.refBRS}</span>
                    }
                  </div>
                  <button 
                    onClick={() => onSelectMPS && onSelectMPS(err.mpsId)}
                    style={{
                      background: 'transparent', border: '1px solid currentColor', borderRadius: '4px', 
                      cursor: 'pointer', fontSize: '0.75rem', padding: '2px 8px', color: 'inherit'
                    }}
                  >
                    Fix
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{margin: 0}}>Alla MPS-steg refererar till existerande BRS-ID:n och regler.</p>
        )}
      </div>

      <p style={{marginBottom: '24px', color: '#666'}}>
        Nedan visas kvalitetsmätningar för BRS och MPS.
      </p>
      
      <h2 style={styles.sectionHeader}>BRS - Business Requirement Specifications</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thSortable} onClick={() => handleSort('id')}>ID{getSortIcon('id', sortConfig)}</th>
            <th style={styles.thSortable} onClick={() => handleSort('title')}>Titel{getSortIcon('title', sortConfig)}</th>
            <th style={styles.thSortable} onClick={() => handleSort('status')}>Status{getSortIcon('status', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('purpose')}>Syfte{getSortIcon('purpose', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('diagram')}>Diagram{getSortIcon('diagram', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('startConditions')}>Start{getSortIcon('startConditions', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('stopConditions')}>Stopp{getSortIcon('stopConditions', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('businessRules')}>Regler{getSortIcon('businessRules', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('flows')}>Flöde{getSortIcon('flows', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('content')}>Data{getSortIcon('content', sortConfig)}</th>
            <th style={styles.thCenterSortable} onClick={() => handleSort('total')}>Totalt{getSortIcon('total', sortConfig)}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(item => {
            const report = item.report;
            const totalColor = getScoreColor(report.total);
            return (
              <tr key={item.id}>
                <td style={styles.td}>
                  <span style={styles.idCell} onClick={() => onSelectBRS(item.id)}>{item.id}</span>
                </td>
                <td style={styles.td}>{item.title}</td>
                <td style={styles.td}><StatusBadge status={item.status} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.purpose} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.diagram} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.startConditions} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.stopConditions} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.businessRules} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.flows} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.content} /></td>
                <td style={{...styles.td, textAlign: 'center', fontWeight: 700, color: totalColor.color}}>{report.total}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {sortedMPS.length > 0 && (
        <>
            <h2 style={styles.sectionHeader}>MPS - Market Process Scenarios</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.thSortable} onClick={() => handleMpsSort('id')}>ID{getSortIcon('id', mpsSortConfig)}</th>
                        <th style={styles.thSortable} onClick={() => handleMpsSort('title')}>Titel{getSortIcon('title', mpsSortConfig)}</th>
                        <th style={styles.thSortable} onClick={() => handleMpsSort('status')}>Status{getSortIcon('status', mpsSortConfig)}</th>
                        <th style={styles.thCenterSortable} onClick={() => handleMpsSort('meta')}>Meta{getSortIcon('meta', mpsSortConfig)}</th>
                        <th style={styles.thCenterSortable} onClick={() => handleMpsSort('diagram')}>Diagram{getSortIcon('diagram', mpsSortConfig)}</th>
                        <th style={styles.thCenterSortable} onClick={() => handleMpsSort('scenarios')}>Struktur{getSortIcon('scenarios', mpsSortConfig)}</th>
                        <th style={styles.thCenterSortable} onClick={() => handleMpsSort('traceability')}>Spårbarhet{getSortIcon('traceability', mpsSortConfig)}</th>
                        <th style={styles.thCenterSortable} onClick={() => handleMpsSort('conditionCoverage')}>Villkor (Start / Stopp){getSortIcon('conditionCoverage', mpsSortConfig)}</th>
                        <th style={styles.thCenterSortable} onClick={() => handleMpsSort('total')}>Totalt{getSortIcon('total', mpsSortConfig)}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedMPS.map(item => {
                        const report = item.report;
                        const totalColor = getScoreColor(report.total);
                        const totalStart = report.scenarioMetrics.reduce((sum, m) => sum + m.startConditions, 0);
                        const totalStop = report.scenarioMetrics.reduce((sum, m) => sum + m.stopConditions, 0);

                        return (
                            <React.Fragment key={item.id}>
                                {/* Huvudrad för MPS */}
                                <tr style={{backgroundColor: '#fafbfc'}}>
                                    <td style={styles.td}>
                                        <span style={{...styles.idCell, fontSize: '1rem'}} onClick={() => onSelectMPS && onSelectMPS(item.id)}>{item.id}</span>
                                    </td>
                                    <td style={{...styles.td, fontWeight: 600}}>{item.title}</td>
                                    <td style={styles.td}><StatusBadge status={item.status} /></td>
                                    <td style={styles.scoreCell}><ScoreDisplay data={report.meta} /></td>
                                    <td style={styles.scoreCell}><ScoreDisplay data={report.diagram} /></td>
                                    <td style={styles.scoreCell}><ScoreDisplay data={report.scenarios} /></td>
                                    <td style={styles.scoreCell}><ScoreDisplay data={report.traceability} /></td>
                                    <td style={{...styles.scoreCell, color: '#333'}}>
                                        <span style={{fontWeight: 700}}>{totalStart} / {totalStop}</span>
                                    </td>
                                    <td style={{...styles.td, textAlign: 'center', fontWeight: 700, color: totalColor.color}}>{report.total}%</td>
                                </tr>
                                {/* Scenarier rader */}
                                {report.scenarioMetrics.map(sc => (
                                    <tr key={sc.id} style={{backgroundColor: '#ffffff'}}>
                                        <td style={{...styles.td, paddingLeft: '40px', fontSize: '0.85rem'}}>
                                            ↳ <span 
                                                style={{...styles.idCell, color: '#0052cc', cursor: 'pointer', textDecoration: 'underline'}} 
                                                onClick={() => onSelectMPS && onSelectMPS(sc.id)}
                                              >
                                                {sc.id}
                                              </span>
                                        </td>
                                        <td style={{...styles.td, color: '#555', fontStyle: 'italic'}}>{sc.title}</td>
                                        <td style={styles.td}></td>
                                        <td style={styles.td}></td>
                                        <td style={styles.td}></td>
                                        <td style={styles.td}></td>
                                        <td style={styles.td}></td>
                                        <td style={{...styles.scoreCell, backgroundColor: '#fff'}}>
                                            <span style={{
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                                color: (sc.startConditions > 0 && sc.stopConditions > 0) ? '#006644' : '#bf2600'
                                            }}>
                                                {sc.startConditions} / {sc.stopConditions}
                                            </span>
                                            { (sc.startConditions === 0 || sc.stopConditions === 0) && 
                                                <span style={{fontSize: '0.7rem', color: '#bf2600', display: 'block'}}>Saknas</span>
                                            }
                                        </td>
                                        <td style={styles.td}></td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </>
      )}
    </div>
  );
};