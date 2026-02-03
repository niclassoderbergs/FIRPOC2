
import React, { useState, useMemo } from 'react';
import { GanttChart } from './GanttChart';
import { commonStyles } from './styles';
import { generateFisData, recalculateGanttDates, getRangeString, NC_DR_DEADLINE } from './utils';
import { DhvScenario } from './types';

export const FisView: React.FC = () => {
    const [dhvScenario, setDhvScenario] = useState<DhvScenario>('opt1');
    const [rkDelayMonths, setRkDelayMonths] = useState<number>(3);

    const fisGanttData = useMemo(() => {
        const newData = generateFisData(rkDelayMonths, dhvScenario);
        return recalculateGanttDates(newData);
    }, [rkDelayMonths, dhvScenario]);
  
    const isFisLate = useMemo(() => {
       const lastEvent = fisGanttData.find(e => e.id === 'F5'); // Pilot
       if (!lastEvent) return false;
       return new Date(lastEvent.endDate) > new Date(NC_DR_DEADLINE);
    }, [fisGanttData]);

    const getScenarioDescription = () => {
        switch(dhvScenario) {
            case 'opt1': return 'Vid fullständig omstart kan FIS-utvecklingen tidigast påbörjas när grundplattformen är upphandlad och har viss funktionalitet.';
            case 'opt2': return 'Vid återanvändning kan FIS-utvecklingen ske parallellt med DHV-kompletteringar då plattformen redan existerar.';
            case 'opt3': return 'Vid fristående lösning byggs FIS separat från DHV. Detta kräver att nätägare etablerar dubbla dataflöden (ett till DHV, ett till FIS).';
            default: return '';
        }
    };

    return (
        <>
            <div style={{marginBottom: '20px', padding: '16px', backgroundColor: '#e6effc', borderRadius: '4px', fontSize: '0.9rem', color: '#172b4d', borderLeft: '4px solid #0052cc'}}>
                <strong>Färdplan FIS (NC DR):</strong> Utvecklingen av flexibilitetsregistret är beroende av vald DHV-strategi.
                <br/>
                Kravet (NC DR Art 57.3) stipulerar att ett fullt operativt FIS ska finnas på plats senast: <strong>{NC_DR_DEADLINE}</strong>.
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
                            <label style={{fontWeight: 600, color: '#42526e', fontSize: '0.9rem'}}>DHV Fördröjning (mån):</label>
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
                <div style={{
                    marginTop: '12px', 
                    padding: '8px 12px', 
                    backgroundColor: isFisLate ? '#ffebe6' : '#e3fcef', 
                    borderRadius: '4px', 
                    color: isFisLate ? '#bf2600' : '#006644',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: isFisLate ? '1px solid #ffbdad' : '1px solid #36b37e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    {isFisLate ? (
                        <>
                            ⚠️ VARNING: Tidsplanen överskrider NC DR Deadline!
                            <span style={{fontSize: '0.8rem', fontWeight: 400, color: '#bf2600'}}>
                                (Driftsättning: {fisGanttData.find(e => e.id === 'F5')?.endDate || '?'})
                            </span>
                        </>
                    ) : (
                        <>
                            ✅ Tidsplanen håller deadline.
                            <span style={{fontSize: '0.8rem', fontWeight: 400, color: '#505f79'}}>
                                FIS kan vara färdigutvecklat samtidigt som DHV driftsätts.
                            </span>
                        </>
                    )}
                </div>
                <p style={{fontSize: '0.85rem', color: '#5e6c84', margin: '8px 0 0 0'}}>
                    {getScenarioDescription()}
                </p>
            </div>
            
            <div style={commonStyles.rangeHeader}>📅 Period: {getRangeString(fisGanttData)}</div>
            <GanttChart data={fisGanttData} startYear={2025} endYear={2033} />

            <h3 style={{margin: '40px 0 20px 0', color: '#172b4d'}}>Händelselista FIS</h3>
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
                    {fisGanttData.map(event => (
                        <tr key={event.id} style={event.isDeadline ? {backgroundColor: '#fff0f0'} : {}}>
                            <td style={commonStyles.td}>{event.startDate}</td>
                            <td style={commonStyles.td}>{event.endDate}</td>
                            <td style={{...commonStyles.td, fontWeight: 600, color: event.isDeadline ? '#bf2600' : 'inherit'}}>{event.title}</td>
                            <td style={commonStyles.td}>{event.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
