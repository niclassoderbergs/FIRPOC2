
import { GanttEvent, DhvScenario } from './types';
import { addMonths, recalculateGanttDates } from './helpers';
import { NC_DR_DEADLINE } from './constants';
import { generateDhvData } from './gen-dhv';
import { generateFisData } from './gen-fis';

export const generateRegulatoryData = (rkDelayMonths: number, scenario: DhvScenario): GanttEvent[] => {
    // Determine calculated dates based on DHV scenario to align legislation
    const dhvData = recalculateGanttDates(generateDhvData(rkDelayMonths, scenario));
    const fisData = recalculateGanttDates(generateFisData(rkDelayMonths, scenario));

    const dhvGoLive = dhvData.find(e => e.id === '10')?.endDate || '2031-01-01'; // Default fallback
    const dhvImplStart = dhvData.find(e => e.id === '5')?.startDate || '2028-01-01'; // Genomförande Start
    const migrImplStart = dhvData.find(e => e.id === '9')?.startDate || '2030-01-01'; // Migrering Impl Start
    const fisPilotStart = fisData.find(e => e.id === 'F5')?.startDate || '2030-01-01'; // Pilot Start
    
    // NC DR fixed dates
    const ncdrEntry = '2026-03-01'; // Estimated
    
    const events: GanttEvent[] = [
        // --- 01-09: NC DR Related (Grouped Top) ---
        {
            id: 'REG_01',
            title: '1. NC DR Träder i kraft',
            description: 'EU-förordning Network Code Demand Response blir gällande lag.',
            manualStartDate: ncdrEntry,
            durationMonths: 1,
            startDate: '', endDate: '',
            date: '2026',
            status: 'planned',
            responsible: 'EU',
            tag: 'Lagstiftning',
            article: 'Entry into force'
        },
        {
            id: 'REG_01b', // Corresponds to Step 2 in NC DR View
            title: '2. Nationella procedurregler',
            description: 'Ei tar fram föreskrifter. Frist är 12 månader efter ikraftträdande.',
            dependencyId: 'REG_01',
            lagMonths: 0,
            durationMonths: 12,
            startDate: '', endDate: '',
            date: 'T+12m',
            status: 'planned',
            responsible: 'Ei',
            tag: 'Reglering',
            article: 'Art. 4'
        },
        {
            id: 'REG_02', // Corresponds to Step 3 in NC DR View
            title: '3. Villkor Tjänsteleverantörer',
            description: 'Nationella villkor för FSP (Art 11) ska vara fastställda 12 månader efter att nationella regler är klara.',
            dependencyId: 'REG_01b',
            lagMonths: 0,
            durationMonths: 12,
            startDate: '', endDate: '',
            date: 'T+24m',
            status: 'planned',
            responsible: 'Svk/Ei',
            tag: 'Kravställning',
            article: 'Art. 11',
            isDeadline: false 
        },
        {
            id: 'REG_03', // Corresponds to Step 4 in NC DR View
            title: '4. Metod för Baseline',
            description: 'Metodik för referensprofil (Art 14) ska vara fastställd 12 månader efter att nationella regler är klara.',
            dependencyId: 'REG_01b',
            lagMonths: 0,
            durationMonths: 12,
            startDate: '', endDate: '',
            date: 'T+24m',
            status: 'planned',
            responsible: 'Svk/Ei',
            tag: 'Kravställning',
            article: 'Art. 14'
        },
        {
            id: 'REG_04', // Corresponds to Step 5 in NC DR View
            title: '5. Specifikation av FIS',
            description: 'Funktionella krav på registret (Art 24). Ska vara klart 18 månader efter att nationella regler är klara.',
            dependencyId: 'REG_01b',
            lagMonths: 0,
            durationMonths: 18,
            startDate: '', endDate: '',
            date: 'T+30m',
            status: 'planned',
            responsible: 'Svk/DSO',
            tag: 'Specifikation',
            article: 'Art. 24'
        }
    ];

    if (scenario === 'opt3') {
         // Option 3: Frikopplad tidsplan ankrad mot NC DR Deadline (2031-10-01) för att garantera färdigställande
         events.push(
            {
                id: 'REG_10',
                title: 'Uppdaterad Ellag (FIS)',
                description: 'Justeringar i Ellagen för att möjliggöra fristående flexibilitetsmarknad. Klart 48 månader innan deadline.',
                manualStartDate: addMonths(NC_DR_DEADLINE, -48), // Oct 2027
                durationMonths: 18,
                startDate: '', endDate: '',
                date: 'Lagstiftning',
                status: 'planned',
                responsible: 'Regeringen/Ei',
                tag: 'Lagstiftning',
                isDeadline: false
            },
            {
                id: 'REG_11', // Replaces old REG_13 position
                title: 'Registerlag för FIS (Fristående)',
                description: 'Initial lagstiftning för att möjliggöra ett fristående flexibilitetsregister. Klart 36 månader innan deadline.',
                manualStartDate: addMonths(NC_DR_DEADLINE, -36), // Oct 2028
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Registerlag',
                status: 'planned',
                responsible: 'Regeringen',
                tag: 'Lagstiftning',
                isDeadline: false
            },
            {
                id: 'REG_12',
                title: 'Nya föreskrifter (FIS)',
                description: 'Föreskrifter för fristående FIS. Klart 30 månader innan deadline.',
                manualStartDate: addMonths(NC_DR_DEADLINE, -30), // Apr 2029
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Reglering',
                status: 'planned',
                responsible: 'Ei',
                tag: 'Reglering',
                isDeadline: false
            },
            {
                id: 'REG_13', // Replaces old REG_20 position
                title: 'Uppdaterade Avtal (BRP/BSP)',
                description: 'Revidering av balansansvarsavtal och leverantörsavtal för FIS. Klart 24 månader innan deadline.',
                manualStartDate: addMonths(NC_DR_DEADLINE, -24), // Oct 2029
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Avtal',
                status: 'planned',
                responsible: 'Svk/Branschen',
                tag: 'Reglering',
                isDeadline: false
            },
            {
                id: 'REG_13_DEADLINE',
                title: '⚠️DEADLINE: NC DR - Fullt operativt FIS',
                description: 'EU-krav: NC DR Artikel 57.3.',
                manualStartDate: NC_DR_DEADLINE,
                durationMonths: 0,
                startDate: '', endDate: '',
                date: 'DEADLINE',
                status: 'planned',
                responsible: 'EU/Ei',
                tag: 'Lagstiftning',
                isDeadline: true
            },
            {
                id: 'REG_14', // Replaces old REG_10b position
                title: 'Uppdaterad Ellag (Anpassning DHV)',
                description: 'Ytterligare justeringar i Ellagen för att harmonisera FIS med kommande Datahub.',
                manualStartDate: addMonths(dhvImplStart, -18),
                durationMonths: 18,
                startDate: '', endDate: '',
                date: 'Inför DHV',
                status: 'planned',
                responsible: 'Regeringen',
                tag: 'Lagstiftning',
                isDeadline: false
            },
            {
                id: 'REG_15', // Replaces old REG_12b position
                title: 'Uppdaterade föreskrifter (Anpassning DHV)',
                description: 'Uppdatering av EIFS för att inkludera Datahubbens roll i flexibilitetsmarknaden.',
                manualStartDate: addMonths(dhvGoLive, -24),
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Inför DHV',
                status: 'planned',
                responsible: 'Ei',
                tag: 'Reglering',
                isDeadline: false
            },
            {
                id: 'REG_16', // Replaces old REG_13b position
                title: 'Anpassning av FIS-regelverk till DHV',
                description: 'Uppdatering av lagar och föreskrifter för att integrera FIS med Datahubben när denna tas i drift.',
                manualStartDate: addMonths(dhvGoLive, -18),
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Inför DHV Go-Live',
                status: 'planned',
                responsible: 'Regeringen/Ei',
                tag: 'Reglering',
                isDeadline: false
            },
            {
                id: 'REG_99',
                title: 'Milstolpe: DHV Driftstart',
                description: 'Referenspunkt för när det nya regelverket måste tillämpas fullt ut i systemen.',
                manualStartDate: dhvGoLive,
                durationMonths: 0,
                startDate: '', endDate: '',
                date: 'Go-Live',
                status: 'planned',
                responsible: 'DHV',
                tag: 'Driftsättning',
                isDeadline: true
            }
         );
    } else {
        // Standard flow for Opt 1 & 2
        events.push(
            {
                id: 'REG_10',
                title: 'Uppdaterad Ellag (Prop & Beslut)',
                description: 'Riksdagsbeslut om ändringar i Ellagen. Fördelaktigt att den är klar innan DHV genomförande påbörjas.',
                manualStartDate: addMonths(dhvImplStart, -18), 
                durationMonths: 18, 
                startDate: '', endDate: '',
                date: 'Lagstiftning',
                status: 'planned',
                responsible: 'Regeringen/Ei',
                tag: 'Lagstiftning',
                isDeadline: false
            },
            {
                id: 'REG_11',
                title: 'Registerlag för DHV',
                description: 'Specifik lagstiftning som reglerar Datahubbens ansvar och datahantering. Måste vara klar innan teknisk migrering påbörjas.',
                manualStartDate: addMonths(migrImplStart, -12),
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Före Migrering',
                status: 'planned',
                responsible: 'Regeringen',
                tag: 'Lagstiftning',
                isDeadline: false
            },
            {
                id: 'REG_12',
                title: 'Nya föreskrifter (EIFS)',
                description: 'Ersätter EIFS 2025:1. Måste vara klara 12 månader innan driftstart.',
                manualStartDate: addMonths(dhvGoLive, -24),
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Reglering',
                status: 'planned',
                responsible: 'Ei',
                tag: 'Reglering',
                isDeadline: false
            },
            {
                id: 'REG_13', 
                title: 'Registerlag för FIS',
                description: 'Lagstiftning för Flexibilitetsregistret. Måste vara klar 6 månader innan pilotdrift.',
                manualStartDate: addMonths(fisPilotStart, -18),
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Pilot - 6m',
                status: 'planned',
                responsible: 'Regeringen',
                tag: 'Lagstiftning',
                isDeadline: false
            },
            {
                id: 'REG_20',
                title: 'Uppdaterade Avtal (BRP/BSP)',
                description: 'Revidering av balansansvarsavtal och leverantörsavtal. Måste vara klart 6 månader innan Go-Live.',
                manualStartDate: addMonths(dhvGoLive, -18), 
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Go-Live - 6m',
                status: 'planned',
                responsible: 'Svk/Branschen',
                tag: 'Reglering',
                isDeadline: false
            },
            {
                id: 'REG_DEADLINE_STD',
                title: '⚠️DEADLINE: NC DR - Fullt operativt FIS',
                description: 'EU-krav: NC DR Artikel 57.3. FIS måste vara i drift.',
                manualStartDate: NC_DR_DEADLINE,
                durationMonths: 0,
                startDate: '', endDate: '',
                date: 'DEADLINE',
                status: 'planned',
                responsible: 'EU/Ei',
                tag: 'Lagstiftning',
                isDeadline: true
            },
            {
                id: 'REG_99',
                title: 'Milstolpe: DHV Driftstart',
                description: 'Referenspunkt för när det nya regelverket måste tillämpas fullt ut i systemen.',
                manualStartDate: dhvGoLive,
                durationMonths: 0,
                startDate: '', endDate: '',
                date: 'Go-Live',
                status: 'planned',
                responsible: 'DHV',
                tag: 'Driftsättning',
                isDeadline: true
            }
        );
    }

    return events;
};
