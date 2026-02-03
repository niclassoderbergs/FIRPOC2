
import { GanttEvent, DhvScenario } from './types';
import { addMonths, recalculateGanttDates } from './helpers';
import { NC_DR_DEADLINE } from './constants';
import { generateDhvData } from './gen-dhv';

export const generateFisData = (rkDelayMonths: number, scenario: DhvScenario): GanttEvent[] => {
    const dhvData = recalculateGanttDates(generateDhvData(rkDelayMonths, scenario));
    
    // Default logic
    let platformReadyDate = '';
    
    // FIS Phase 1 (Förstudie) fixed for all scenarios
    let f1Start = '2025-01-01';
    let f1Duration = 12; 
    
    // FIS Phase 2 (Spec) defaults to start after Phase 1
    let f2Start = '2026-01-01';
    let f2Duration = 18;
    
    let f3Start = '';
    let f3Duration = 18; // Default impl duration
    
    // Extract DHV Migration End Date (Event 10)
    const dhvMigration = dhvData.find(e => e.id === '10');
    const dhvGoLiveDate = dhvMigration ? dhvMigration.endDate : '';

    if (scenario === 'opt1' || scenario === 'opt2') {
        const upphandling = dhvData.find(e => e.id === '4');
        if (upphandling) {
            platformReadyDate = addMonths(upphandling.endDate, 6);
        } else {
             platformReadyDate = '2028-01-01'; 
        }
        f3Start = platformReadyDate;

        // NEW LOGIC: Extend F2 to meet F3
        const d1 = new Date(f2Start);
        const d2 = new Date(f3Start);
        if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
             const months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
             if (months > f2Duration) {
                 f2Duration = months;
             }
        }
    } else if (scenario === 'opt3') {
        // Option 3: Standalone FIS
        f2Duration = 12; // 2026 fully for Spec
        f3Start = '2027-01-01'; 
        f3Duration = 45; // Extended implementation to meet deadline alignment
    }

    const events: GanttEvent[] = [
        {
            id: 'F1',
            title: 'Förstudie & Koncept',
            description: 'Analys av behov och koncept.',
            manualStartDate: f1Start,
            durationMonths: f1Duration,
            startDate: '', endDate: '',
            date: 'Fas 0',
            status: 'current',
            responsible: 'Svk',
            tag: 'Analys'
        },
        {
            id: 'F2',
            title: 'FIS Detaljering (BRS)',
            description: 'Detaljering av FIS-specifika krav.',
            manualStartDate: f2Start, 
            durationMonths: f2Duration,
            startDate: '', endDate: '',
            date: 'Fas 1',
            status: 'planned',
            responsible: 'Svk',
            tag: 'Specifikation'
        },
        {
            id: 'F3',
            title: 'FIS Implementation',
            description: (scenario === 'opt3')
                ? `Utveckling av fristående FIS (Förlängd till ${f3Duration} mån för att matcha deadline).`
                : 'Utveckling av FIS (Avhängigt DHV plattform). Startar sent.',
            manualStartDate: f3Start,
            durationMonths: f3Duration,
            startDate: '', endDate: '',
            date: 'Fas 2',
            status: 'planned',
            responsible: 'Lev',
            tag: 'IT-Utveckling'
        },
        {
            id: 'F4',
            title: 'Systemtest & Integration',
            description: 'Integrationstest mot marknadsaktörer.',
            dependencyId: 'F3',
            lagMonths: 0,
            durationMonths: 6,
            startDate: '', endDate: '',
            date: 'Fas 3',
            status: 'planned',
            responsible: 'Svk/Lev',
            tag: 'Test'
        },
        {
            id: 'F5',
            title: 'Pilotdrift',
            description: 'Pilot med utvalda aktörer.',
            dependencyId: 'F4',
            lagMonths: 0,
            durationMonths: 6,
            startDate: '', endDate: '',
            date: 'Fas 4',
            status: 'planned',
            responsible: 'Branschen',
            tag: 'Driftsättning'
        },
        {
            id: 'F99',
            title: 'DEADLINE: NC DR - Fullt operativt FIS',
            description: 'EU-krav: NC DR Artikel 57.3.',
            manualStartDate: NC_DR_DEADLINE,
            durationMonths: 0,
            startDate: '', endDate: '',
            date: 'DEADLINE',
            status: 'planned',
            responsible: 'EU/Ei',
            tag: 'Lagstiftning',
            isDeadline: true
        }
    ];

    if (scenario === 'opt1' || scenario === 'opt2') {
        events.push({
            id: 'F_DEP_PLATFORM',
            title: 'BEROENDE: DHV Plattform Tillgänglig',
            description: 'FIS-utveckling kan ej starta förrän plattformen är levererad/kompletterad (T+6 mån efter upphandling).',
            manualStartDate: platformReadyDate, 
            durationMonths: 0,
            startDate: '', endDate: '',
            date: 'Milstolpe',
            status: 'planned',
            responsible: 'DHV',
            tag: 'Extern-Beroende'
        });
    }

    // Explicitly add DHV Go-Live dependency for both options if applicable (NOT Option 3)
    if (dhvGoLiveDate && (scenario === 'opt1' || scenario === 'opt2')) {
         events.push({
            id: 'F_DHV_READY',
            title: `BEROENDE: DHV ${scenario === 'opt1' ? 'Alt 1' : 'Alt 2'} Driftsatt`,
            description: 'DHV måste vara migrerat och driftsatt innan FIS kan tas i full drift.',
            manualStartDate: dhvGoLiveDate,
            durationMonths: 0,
            startDate: '', endDate: '',
            date: 'Milstolpe',
            status: 'planned',
            responsible: 'DHV-projektet',
            tag: 'Driftsättning',
            isDeadline: true
        });
    }

    // Special event for Option 3: Separate flows
    if (scenario === 'opt3') {
        events.push({
            id: 'F3.5', // Sorting key to place between F3 and F4
            title: 'Etablering av separata flöden (Nätägare)',
            description: 'Nätägare måste bygga direkta integrationer till FIS. Påbörjas under implementering, klar före Systemtest.',
            // Calculated: Systemtest starts after F3 (Oct 2030). Task duration 24m. 
            // So Start = Oct 2028.
            manualStartDate: '2028-10-01', 
            durationMonths: 24, 
            startDate: '', endDate: '',
            date: 'Integration',
            status: 'planned',
            responsible: 'Nätägare',
            tag: 'Genomförande'
        });
    }

    return events;
};
