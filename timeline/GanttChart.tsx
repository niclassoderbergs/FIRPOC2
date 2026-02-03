
import React, { useState } from 'react';
import { GanttEvent } from './types';

const styles = {
  ganttWrapper: {
    marginTop: '0px', 
    display: 'flex',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    backgroundColor: '#fff',
    position: 'relative' as const
  },
  labelsColumn: {
    width: '520px', 
    backgroundColor: '#fafbfc',
    borderRight: '1px solid #dfe1e6',
    flexShrink: 0,
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px'
  },
  timelineColumn: {
    flex: 1,
    overflow: 'visible' as const, 
    position: 'relative' as const,
    backgroundColor: '#ffffff',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px'
  },
  ganttHeaderLabel: {
    height: '40px',
    borderBottom: '1px solid #dfe1e6',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px',
    fontWeight: 700,
    color: '#42526e',
    fontSize: '0.85rem',
    backgroundColor: '#f4f5f7'
  },
  ganttHeaderTimeline: {
    display: 'flex',
    height: '40px',
    borderBottom: '1px solid #dfe1e6',
    backgroundColor: '#f4f5f7'
  },
  ganttYear: {
    flex: 1,
    textAlign: 'left' as const,
    fontWeight: 700,
    color: '#6b778c',
    fontSize: '0.8rem',
    borderLeft: '1px solid #dfe1e6',
    paddingLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    minWidth: '50px' 
  },
  ganttBody: {
    position: 'relative' as const,
    minHeight: '300px'
  },
  labelRow: {
    height: '70px', 
    borderBottom: '1px solid #ebecf0',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    fontSize: '0.9rem',
    color: '#172b4d',
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  timelineRow: {
    position: 'relative' as const,
    height: '70px', 
    borderBottom: '1px solid #ebecf0',
    width: '100%'
  },
  ganttBar: {
    position: 'absolute' as const,
    height: '36px', 
    top: '17px',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    transition: 'all 0.2s',
    zIndex: 2
  },
  ganttDeadline: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    width: '4px', // Slightly wider for easier hovering
    backgroundColor: '#bf2600',
    zIndex: 3,
    cursor: 'help', // Indicate interactive
    pointerEvents: 'auto' as const // Allow hover events
  },
  ganttGridLine: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    borderLeft: '1px dashed #ebecf0',
    zIndex: 1,
    pointerEvents: 'none' as const
  },
  tooltip: {
    position: 'absolute' as const,
    backgroundColor: '#172b4d',
    color: 'white',
    padding: '12px',
    borderRadius: '4px',
    zIndex: 1000,
    width: '300px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    fontSize: '0.85rem',
    whiteSpace: 'normal' as const
  },
  roleBadge: {
    fontSize: '0.7rem',
    fontWeight: 700,
    borderRadius: '4px',
    padding: '2px 4px',
    marginRight: '6px',
    width: '12px',
    display: 'inline-block',
    textAlign: 'center' as const
  },
  roleItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2px',
      fontSize: '0.75rem',
      color: '#42526e'
  }
};

const getColor = (tag?: string) => {
    switch(tag) {
        case 'Lagstiftning': return '#6554C0'; 
        case 'Reglering': return '#0052CC'; 
        case 'Kravställning': return '#008DA6'; 
        case 'Specifikation': return '#36B37E'; 
        case 'IT-Utveckling': return '#FF991F'; 
        case 'Driftsättning': return '#BF2600'; 
        case 'Historik': return '#505f79'; 
        case 'Ei-Utredning': return '#8777D9'; 
        case 'BRS-Arbete': return '#00B8D9'; 
        case 'Genomförande': return '#0052CC'; 
        case 'Upphandling': return '#6554C0'; 
        case 'Migrering': return '#FF991F'; 
        case 'Arkitektur': return '#006644'; 
        case 'Utveckling': return '#FF991F'; 
        case 'Extern-Beroende': return '#6554C0'; // Purple for external dependencies
        default: return '#42526E';
    }
};

export const GanttChart: React.FC<{ data: GanttEvent[]; startYear: number; endYear: number }> = ({ data, startYear, endYear }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const totalYears = endYear - startYear + 1;
    const years = Array.from({ length: totalYears }, (_, i) => startYear + i);

    const getPosition = (dateStr: string) => {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return 0;

        const year = d.getFullYear();
        const month = d.getMonth(); 
        
        const totalMonths = totalYears * 12;
        const passedMonths = (year - startYear) * 12 + month;
        
        return Math.max(0, Math.min((passedMonths / totalMonths) * 100, 100));
    };

    return (
        <div style={styles.ganttWrapper}>
            <div style={styles.labelsColumn}>
                <div style={{...styles.ganttHeaderLabel, paddingRight: 0}}>
                    <div style={{flex: 1}}>Aktivitet</div>
                    <div style={{width: '220px', paddingLeft: '10px', height: '100%', display: 'flex', alignItems: 'center', borderLeft: '1px solid #dfe1e6'}}>Roller (A / B / G)</div>
                </div>
                {data.map(event => (
                    <div key={event.id} style={{
                        ...styles.labelRow,
                        paddingRight: 0,
                        backgroundColor: hoveredId === event.id ? '#e6effc' : (event.isDeadline ? '#fff0f0' : 'transparent')
                    }}>
                        <div style={{flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px', color: event.isDeadline ? '#bf2600' : 'inherit'}} title={event.title}>
                            {event.isDeadline && <span style={{marginRight: '6px'}}>⚠️</span>}
                            {event.title}
                        </div>
                        <div style={{
                            width: '220px', 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            paddingLeft: '10px',
                            borderLeft: '1px solid #ebecf0',
                            overflow: 'hidden'
                        }}>
                             <div style={styles.roleItem} title={`Ansvarig: ${event.responsible}`}>
                                <span style={{...styles.roleBadge, backgroundColor: '#deebff', color: '#0052cc'}}>A</span>
                                {event.responsible}
                             </div>
                             {event.contributing && event.contributing !== '-' && (
                                <div style={styles.roleItem} title={`Bidrar: ${event.contributing}`}>
                                    <span style={{...styles.roleBadge, backgroundColor: '#ebecf0', color: '#42526e'}}>B</span>
                                    {event.contributing}
                                </div>
                             )}
                             {event.approving && event.approving !== '-' && (
                                <div style={styles.roleItem} title={`Godkänner: ${event.approving}`}>
                                    <span style={{...styles.roleBadge, backgroundColor: '#e3fcef', color: '#006644'}}>G</span>
                                    {event.approving}
                                </div>
                             )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.timelineColumn}>
                <div style={styles.ganttHeaderTimeline}>
                    {years.map(year => (
                        <div key={year} style={styles.ganttYear}>{year}</div>
                    ))}
                </div>

                <div style={styles.ganttBody}>
                    {years.map((_, i) => (
                        <div 
                            key={i} 
                            style={{
                                ...styles.ganttGridLine, 
                                left: `${(i / totalYears) * 100}%`
                            }} 
                        />
                    ))}

                    {data.map((event, index) => {
                        const startPct = getPosition(event.startDate);
                        const endPct = event.isDeadline ? startPct : getPosition(event.endDate);
                        const widthPct = Math.max(endPct - startPct, event.isDeadline ? 0.2 : 1); 

                        const isHovered = hoveredId === event.id;
                        const isRightSide = startPct > 60;
                        const isBottomRow = index >= data.length - 3;

                        return (
                            <div key={event.id} style={{
                                ...styles.timelineRow,
                                backgroundColor: hoveredId === event.id ? 'rgba(230, 239, 252, 0.3)' : (event.isDeadline ? '#fff0f0' : 'transparent'),
                                zIndex: isHovered ? 10 : 'auto'
                            }}>
                                {event.isDeadline ? (
                                    <div 
                                        style={{
                                            ...styles.ganttDeadline,
                                            left: `${startPct}%`,
                                        }}
                                        onMouseEnter={() => setHoveredId(event.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    >
                                        <div style={{position: 'absolute', top: '-10px', left: '-5px', fontSize: '1rem'}}>🚩</div>
                                    </div>
                                ) : (
                                    <div 
                                        style={{
                                            ...styles.ganttBar,
                                            left: `${startPct}%`,
                                            width: `${widthPct}%`,
                                            backgroundColor: getColor(event.tag),
                                            transform: isHovered ? 'scaleY(1.1)' : 'none',
                                            opacity: hoveredId && !isHovered ? 0.6 : 1
                                        }}
                                        onMouseEnter={() => setHoveredId(event.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    />
                                )}
                                
                                {isHovered && (
                                    <div style={{
                                        ...styles.tooltip,
                                        left: isRightSide ? 'auto' : `${startPct}%`,
                                        right: isRightSide ? `${100 - endPct}%` : 'auto',
                                        top: isBottomRow ? 'auto' : '50px',
                                        bottom: isBottomRow ? '50px' : 'auto', 
                                    }}>
                                        <div style={{fontWeight: 700, marginBottom: '4px'}}>{event.title}</div>
                                        <div style={{marginBottom: '8px', opacity: 0.9}}>{event.startDate} {event.endDate !== event.startDate ? `— ${event.endDate}` : ''}</div>
                                        
                                        <div style={{display:'grid', gridTemplateColumns: '70px 1fr', gap: '4px', marginBottom: '8px', fontSize: '0.8rem'}}>
                                            <span style={{color: '#4c9aff', fontWeight: 600}}>Ansvarig:</span><span>{event.responsible}</span>
                                            {event.contributing && event.contributing !== '-' && <><span style={{color: '#aaa', fontWeight: 600}}>Bidrar:</span><span>{event.contributing}</span></>}
                                            {event.approving && event.approving !== '-' && <><span style={{color: '#36b37e', fontWeight: 600}}>Godkänner:</span><span>{event.approving}</span></>}
                                        </div>

                                        {event.article && event.article !== '-' && <div style={{marginBottom: '8px', fontWeight: 600}}>Regelverk: {event.article}</div>}
                                        <div style={{lineHeight: '1.4'}}>{event.description}</div>
                                        {event.dependencyId && (
                                            <div style={{marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '8px', fontSize: '0.75rem'}}>
                                                {event.dependencyId ? `Beroende av: ${event.dependencyId} (${event.lagMonths}m lag)` : 'Baserat på beslutsdatum'}
                                                <br/>
                                                Varaktighet: {event.durationMonths} månader
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
