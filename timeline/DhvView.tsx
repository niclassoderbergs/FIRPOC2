
import React, { useState, useMemo } from 'react';
import { GanttChart } from './GanttChart';
import { commonStyles } from './styles';
import { generateDhvData, recalculateGanttDates, getRangeString } from './utils';
import { DhvScenario } from './types';

export const DhvView: React.FC = () => {
    const [dhvScenario, setDhvScenario] = useState<DhvScenario>('opt1');
    const [rkDelayMonths, setRkDelayMonths] = useState<number>(3);
    
    const dhvGanttData = useMemo(() => {
        const newData = generateDhvData(rkDelayMonths, dhvScenario);
        return recalculateGanttDates(newData);
    }, [rkDelayMonths, dhvScenario]);

    return (
        <>
            <div style={{marginBottom: '20px', padding: '16px', backgroundColor: '#e6effc', borderRadius: '4px', fontSize: '0.9rem', color: '#172b4d', borderLeft: '4px solid #0052cc'}}>
                <strong>Scenarioanalys för DHV:</strong> Baserat på regeringsuppdrag (RK) 2025-2026.
                <br/>
                Välj alternativ och justera startfördröjning för att simulera tidslinjen.
            </div>

            <div style={commonStyles.sliderContainer}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <div style={commonStyles.scenarioToggle}>
                        <button 
                            style={{...commonStyles.scenarioBtn, backgroundColor: dhvScenario === 'opt1' ? '#fff' : 'transparent', color: dhvScenario === 'opt1' ? '#0052cc' : '#5e6c84', boxShadow: dhvScenario === 'opt1' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'}}
                            onClick={() => setDhvScenario('opt1')}
                        >
                            Alt 1: Fullständig omstart
                        </button>
                        <button 
                            style={{...commonStyles.scenarioBtn, backgroundColor: dhvScenario === 'opt2' ? '#fff' : 'transparent', color: dhvScenario === 'opt2' ? '#0052cc' : '#5e6c84', boxShadow: dhvScenario === 'opt2' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'}}
                            onClick={() => setDhvScenario('opt2')}
                        >
                            Alt 2: Återanvända EMH
                        </button>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <label style={{fontWeight: 600, color: '#42526e', fontSize: '0.9rem'}}>Startfördröjning (mån):</label>
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
                </div>
                <p style={{fontSize: '0.85rem', color: '#5e6c84', margin: 0}}>
                    {dhvScenario === 'opt1'
                        ? 'Fullständig omstart: Implementering (20m Upphandling + 9/18/24m Genomförande) startar 18 månader in i BRS-arbetet.' 
                        : 'Återanvända EMH: Snabbare uppstart med fokus på komplettering. Migrering startar parallellt med kvarvarande genomförande.'}
                </p>
            </div>

            <div style={commonStyles.rangeHeader}>📅 Period: {getRangeString(dhvGanttData)}</div>
            <GanttChart data={dhvGanttData} startYear={2025} endYear={2035} />

            <h3 style={{margin: '40px 0 20px 0', color: '#172b4d'}}>Händelselista</h3>
            <table style={commonStyles.table}>
                <thead>
                    <tr>
                        <th style={{...commonStyles.th, width: '15%'}}>Start</th>
                        <th style={{...commonStyles.th, width: '15%'}}>Slut</th>
                        <th style={{...commonStyles.th, width: '30%'}}>Aktivitet</th>
                        <th style={{...commonStyles.th, width: '40%'}}>Beskrivning</th>
                    </tr>
                </thead>
                <tbody>
                    {dhvGanttData.map(event => (
                        <tr key={event.id}>
                            <td style={commonStyles.td}>{event.startDate}</td>
                            <td style={commonStyles.td}>{event.endDate}</td>
                            <td style={{...commonStyles.td, fontWeight: 600}}>{event.title}</td>
                            <td style={commonStyles.td}>{event.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
