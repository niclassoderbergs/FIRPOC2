
import React, { useState } from 'react';
import { GanttChart } from './GanttChart';
import { commonStyles } from './styles';
import { historicalData, recalculateGanttDates, getRangeString } from './utils';
import { GanttEvent } from './types';

export const LegacyView: React.FC = () => {
    const [historicalGanttData] = useState<GanttEvent[]>(() => {
        // We use the data as-is from utils because it is now already sorted/grouped correctly
        // by the manual definition (image order).
        // Recalculate is mostly for startDate/endDate logic if dependencyId was used, 
        // but here we use manualStartDate heavily.
        return recalculateGanttDates(historicalData);
    });

    return (
        <>
            <div style={{marginBottom: '20px', padding: '16px', backgroundColor: '#f4f5f7', borderRadius: '4px', fontSize: '0.9rem', color: '#172b4d'}}>
                <strong>Om historisk data:</strong> Nedan visas en tidslinje över händelser och leveranser inom det tidigare Elmarknadshubb-projektet (2014–2022) enligt projektets ursprungliga fasindelning.
            </div>
            <div style={commonStyles.rangeHeader}>📅 Period: {getRangeString(historicalGanttData)}</div>
            <GanttChart data={historicalGanttData} startYear={2014} endYear={2022} />
            
            <h3 style={{margin: '40px 0 20px 0', color: '#172b4d'}}>Historiklista</h3>
            <table style={commonStyles.table}>
                <thead>
                    <tr>
                        <th style={{...commonStyles.th, width: '15%'}}>Period</th>
                        <th style={{...commonStyles.th, width: '15%'}}>Ansvarig</th>
                        <th style={{...commonStyles.th, width: '30%'}}>Fas / Leverans</th>
                        <th style={{...commonStyles.th, width: '40%'}}>Kommentar</th>
                    </tr>
                </thead>
                <tbody>
                    {historicalGanttData.map(event => (
                        <tr key={event.id}>
                            <td style={commonStyles.td}>{event.date}</td>
                            <td style={commonStyles.td}>{event.responsible}</td>
                            <td style={{...commonStyles.td, fontWeight: 600}}>{event.title}</td>
                            <td style={commonStyles.td}>{event.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
