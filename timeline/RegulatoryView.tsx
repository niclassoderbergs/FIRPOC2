
import React, { useState, useMemo } from 'react';
import { GanttChart } from './GanttChart';
import { commonStyles } from './styles';
import { generateRegulatoryData, recalculateGanttDates, getRangeString } from './utils';
import { DhvScenario } from './types';

export const RegulatoryView: React.FC = () => {
    const [dhvScenario, setDhvScenario] = useState<DhvScenario>('opt1');
    const [rkDelayMonths, setRkDelayMonths] = useState<number>(3);

    const regulatoryGanttData = useMemo(() => {
        const newData = generateRegulatoryData(rkDelayMonths, dhvScenario);
        return recalculateGanttDates(newData);
    }, [rkDelayMonths, dhvScenario]);

    return (
        <>
            <div style={{marginBottom: '20px', padding: '16px', backgroundColor: '#e6effc', borderRadius: '4px', fontSize: '0.9rem', color: '#172b4d', borderLeft: '4px solid #6554C0'}}>
                <strong>Regulatoriska förutsättningar:</strong> Visualiserar hur lagstiftning, föreskrifter och avtal måste harmoniseras med systemutvecklingen.
                <br/>
                <br/>
                <em>Strategisk notering:</em> <strong>Uppdaterad Ellag (Prop & Beslut)</strong> bör vara på plats så tidigt som möjligt för att ge legala förutsättningar för projektet, senast innan genomförandefasen startar.
                Registerlagar måste synkroniseras med teknisk utveckling och migrering.
            </div>

            <div style={commonStyles.sliderContainer}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <div style={commonStyles.scenarioToggle}>
                        <button 
                            style={{...commonStyles.scenarioBtn, backgroundColor: dhvScenario === 'opt1' ? '#fff' : 'transparent', color: dhvScenario === 'opt1' ? '#0052cc' : '#5e6c84', boxShadow: dhvScenario === 'opt1' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'}}
                            onClick={() => setDhvScenario('opt1')}
                        >
                            Alt 1: Omstart
                        </button>
                        <button 
                            style={{...commonStyles.scenarioBtn, backgroundColor: dhvScenario === 'opt2' ? '#fff' : 'transparent', color: dhvScenario === 'opt2' ? '#0052cc' : '#5e6c84', boxShadow: dhvScenario === 'opt2' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'}}
                            onClick={() => setDhvScenario('opt2')}
                        >
                            Alt 2: Återanvändning
                        </button>
                        <button 
                            style={{...commonStyles.scenarioBtn, backgroundColor: dhvScenario === 'opt3' ? '#fff' : 'transparent', color: dhvScenario === 'opt3' ? '#0052cc' : '#5e6c84', boxShadow: dhvScenario === 'opt3' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'}}
                            onClick={() => setDhvScenario('opt3')}
                        >
                            Alt 3: Fristående FIS
                        </button>
                    </div>
                    {dhvScenario !== 'opt3' && (
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                            <label style={{fontWeight: 600, color: '#42526e', fontSize: '0.9rem'}}>Fördröjning (mån):</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="12" 
                                value={rkDelayMonths} 
                                onChange={(e) => setRkDelayMonths(parseInt(e.target.value))}
                                style={{width: '150px'}}
                            />
                            <span style={{fontWeight: 700, width: '20px'}}>{rkDelayMonths}</span>
                        </div>
                    )}
                </div>
                <p style={{fontSize: '0.85rem', color: '#5e6c84', margin: 0}}>
                    Notera: Tidslinjen justeras dynamiskt baserat på beroenden till DHV och FIS milstolpar (t.ex. Migrering och Pilotdrift).
                </p>
            </div>

            <div style={commonStyles.rangeHeader}>📅 Period: {getRangeString(regulatoryGanttData)}</div>
            <GanttChart data={regulatoryGanttData} startYear={2025} endYear={2033} />

            <h3 style={{margin: '40px 0 20px 0', color: '#172b4d'}}>Detaljerad Lista</h3>
            <table style={commonStyles.table}>
                <thead>
                    <tr>
                        <th style={{...commonStyles.th, width: '15%'}}>Start</th>
                        <th style={{...commonStyles.th, width: '15%'}}>Slut</th>
                        <th style={{...commonStyles.th, width: '30%'}}>Regelverk/Aktivitet</th>
                        <th style={{...commonStyles.th, width: '40%'}}>Beskrivning</th>
                    </tr>
                </thead>
                <tbody>
                    {regulatoryGanttData.map(event => (
                        <tr key={event.id} style={event.isDeadline ? {backgroundColor: '#fff0f0'} : {}}>
                            <td style={commonStyles.td}>{event.startDate}</td>
                            <td style={commonStyles.td}>{event.endDate}</td>
                            <td style={{...commonStyles.td, fontWeight: 600, color: event.isDeadline ? '#bf2600' : 'inherit'}}>
                                {event.title}
                                {event.article && <div style={{fontSize: '0.75rem', fontWeight: 400, color: '#666', marginTop: '2px'}}>{event.article}</div>}
                            </td>
                            <td style={commonStyles.td}>{event.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
