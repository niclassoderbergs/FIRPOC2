
import React, { useState } from 'react';
import { GanttChart } from './GanttChart';
import { commonStyles } from './styles';
import { rawInitialData, recalculateGanttDates, getRangeString } from './utils';
import { GanttEvent } from './types';

export const NcdrView: React.FC = () => {
    const [ganttData, setGanttData] = useState<GanttEvent[]>(recalculateGanttDates(rawInitialData));
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateEvent = (id: string, field: keyof GanttEvent, value: string | number) => {
        const updatedData = ganttData.map(e => {
            if (e.id === id) {
                if (field === 'durationMonths' || field === 'lagMonths') {
                    return { ...e, [field]: Number(value) };
                }
                if (field === 'dependencyId') {
                    return { ...e, dependencyId: value === 'none' ? undefined : String(value) };
                }
                return { ...e, [field]: value };
            }
            return e;
        });
        setGanttData(recalculateGanttDates(updatedData as GanttEvent[]));
    };

    return (
        <>
            <div style={commonStyles.rangeHeader}>📅 Period: {getRangeString(ganttData)}</div>
            <GanttChart data={ganttData} startYear={2025} endYear={2031} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px'}}>
                <div>
                    <h3 style={{margin: 0, color: '#172b4d'}}>Detaljerad planering (Logikstyrd)</h3>
                    <p style={{margin: '4px 0 0 0', fontSize: '0.85rem', color: '#666'}}>
                        Tidplanen beräknas automatiskt baserat på varaktighet och beroenden.
                    </p>
                </div>
                <button 
                    style={commonStyles.editButton} 
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Spara ändringar' : '✏️ Redigera planering'}
                </button>
            </div>

            <table style={commonStyles.table}>
                <thead>
                    <tr>
                        <th style={{...commonStyles.th, width: '20%'}}>Steg</th>
                        <th style={{...commonStyles.th, width: '8%'}}>Månader</th>
                        <th style={{...commonStyles.th, width: '15%'}}>Beroende / Start</th>
                        <th style={{...commonStyles.th, width: '10%'}}>Start</th>
                        <th style={{...commonStyles.th, width: '10%'}}>Slut</th>
                        <th style={{...commonStyles.th, width: '15%'}}>Roller (A/B/G)</th>
                        <th style={{...commonStyles.th, width: '22%'}}>Beskrivning</th>
                    </tr>
                </thead>
                <tbody>
                    {ganttData.map(event => (
                        <tr key={event.id}>
                            <td style={{...commonStyles.td, fontWeight: 600}}>
                                {isEditing ? (
                                    <input style={commonStyles.input} value={event.title} onChange={(e) => handleUpdateEvent(event.id, 'title', e.target.value)} />
                                ) : event.title}
                            </td>
                            <td style={commonStyles.td}>
                                {isEditing ? (
                                    <input 
                                        type="number" 
                                        min="1"
                                        style={commonStyles.input} 
                                        value={event.durationMonths} 
                                        onChange={(e) => handleUpdateEvent(event.id, 'durationMonths', e.target.value)} 
                                        title="Varaktighet i månader"
                                    />
                                ) : `${event.durationMonths} mån`}
                            </td>
                            <td style={commonStyles.td}>
                                {isEditing ? (
                                    <div style={{display: 'flex', gap: '4px', flexDirection: 'column'}}>
                                        <select 
                                            style={commonStyles.select}
                                            value={event.dependencyId || 'none'}
                                            onChange={(e) => handleUpdateEvent(event.id, 'dependencyId', e.target.value)}
                                        >
                                            <option value="none">Inget (Manuellt startdatum)</option>
                                            {ganttData.filter(e => e.id !== event.id).map(e => (
                                                <option key={e.id} value={e.id}>{e.id}. {e.title.substring(0, 20)}...</option>
                                            ))}
                                        </select>
                                        {!event.dependencyId && (
                                            <>
                                             <label style={{fontSize: '0.7rem', fontWeight: 600, color: '#42526e'}}>Beslutsdatum:</label>
                                             <input 
                                                type="date" 
                                                style={commonStyles.input} 
                                                value={event.manualStartDate} 
                                                onChange={(e) => handleUpdateEvent(event.id, 'manualStartDate', e.target.value)} 
                                                title="Ange beslutsdatum"
                                             />
                                            </>
                                        )}
                                        {event.dependencyId && (
                                            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                                                <span style={{fontSize:'0.8rem'}}>Lag:</span>
                                                <input 
                                                    type="number" 
                                                    style={{...commonStyles.input, width: '60px'}} 
                                                    value={event.lagMonths || 0} 
                                                    onChange={(e) => handleUpdateEvent(event.id, 'lagMonths', e.target.value)} 
                                                    title="Fördröjning i månader efter föregående slut"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    event.dependencyId 
                                        ? `Efter steg ${event.dependencyId} (${event.lagMonths ? `+${event.lagMonths}m` : '0m'})` 
                                        : <span style={{fontWeight: 600, color: '#0052cc'}}>Beslutsdatum</span>
                                )}
                            </td>
                            <td style={{...commonStyles.td, color: '#5e6c84', fontSize: '0.85rem'}}>
                                {event.startDate}
                            </td>
                            <td style={{...commonStyles.td, color: '#0052cc', fontWeight: 600, fontSize: '0.85rem'}}>
                                {event.endDate}
                            </td>
                            <td style={commonStyles.td}>
                                {isEditing ? (
                                    <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                                        <input placeholder="Ansvarig" style={commonStyles.input} value={event.responsible} onChange={(e) => handleUpdateEvent(event.id, 'responsible', e.target.value)} />
                                        <input placeholder="Bidrar" style={commonStyles.input} value={event.contributing || ''} onChange={(e) => handleUpdateEvent(event.id, 'contributing', e.target.value)} />
                                        <input placeholder="Godkänner" style={commonStyles.input} value={event.approving || ''} onChange={(e) => handleUpdateEvent(event.id, 'approving', e.target.value)} />
                                    </div>
                                ) : (
                                    <div style={{fontSize:'0.8rem'}}>
                                        <div><strong>A:</strong> {event.responsible}</div>
                                        {event.contributing && event.contributing !== '-' && <div style={{color:'#666'}}><strong>B:</strong> {event.contributing}</div>}
                                        {event.approving && event.approving !== '-' && <div style={{color:'#006644'}}><strong>G:</strong> {event.approving}</div>}
                                    </div>
                                )}
                            </td>
                            <td style={commonStyles.td}>
                                {isEditing ? (
                                    <textarea style={{...commonStyles.input, resize: 'vertical'}} value={event.description} onChange={(e) => handleUpdateEvent(event.id, 'description', e.target.value)} />
                                ) : event.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
