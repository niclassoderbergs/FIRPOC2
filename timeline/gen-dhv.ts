
import { GanttEvent, DhvScenario } from './types';
import { addMonths } from './helpers';
import { LEGACY_DURATIONS } from './constants';

export const generateDhvData = (rkDelayMonths: number, scenario: DhvScenario): GanttEvent[] => {
    const rkStart = '2025-09-01';
    const rkEnd = '2026-09-01';
    
    const projectStart = addMonths(rkEnd, rkDelayMonths);
    const realizationStart = addMonths(projectStart, 18);

    const events: GanttEvent[] = [
        {
            id: '1',
            title: 'RK Uppdrag (Ei & Svk)',
            description: 'Regeringsuppdrag att ta fram förslag till centralt datahanteringsverktyg.',
            manualStartDate: rkStart,
            durationMonths: 12,
            startDate: '', endDate: '',
            date: '2025-2026',
            status: 'current',
            responsible: 'Ei/Svk',
            tag: 'Ei-Utredning'
        }
    ];

    if (scenario === 'opt1' || scenario === 'opt3') { // Treat opt3 same as opt1 base for simplicity if not reusing
        events.push(
            {
                id: '2',
                title: 'Projektuppstart & Etablering',
                description: `Etablering av projektorganisation. Startar ${rkDelayMonths} mån efter RK-redovisning.`,
                manualStartDate: projectStart,
                durationMonths: 18,
                startDate: '', endDate: '',
                date: 'Fas 1',
                status: 'planned',
                responsible: 'Svk',
                tag: 'Historik' 
            },
            {
                id: '3',
                title: 'BRS v4.0 Arbete',
                description: 'Framtagande av nya kravspecifikationer. Löper parallellt med uppstart.',
                manualStartDate: projectStart,
                durationMonths: 30,
                startDate: '', endDate: '',
                date: 'Fas 1',
                status: 'planned',
                responsible: 'Svk',
                tag: 'BRS-Arbete'
            }
        );
        
        events.push({
            id: '4',
            title: 'Upphandling',
            description: 'Upphandling av systemleverantör.',
            manualStartDate: realizationStart, // Starts at T+18
            durationMonths: LEGACY_DURATIONS.upphandling,
            startDate: '', endDate: '',
            date: 'Fas 2',
            status: 'planned',
            responsible: 'Svk',
            tag: 'Upphandling'
        });

        events.push({
            id: '5',
            title: 'Genomförande Fas 1',
            description: 'Initial implementation.',
            dependencyId: '4', 
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.gen1,
            startDate: '', endDate: '',
            date: 'Fas 3',
            status: 'planned',
            responsible: 'Lev',
            tag: 'Genomförande'
        });

        events.push({
            id: '6',
            title: 'Genomförande Fas 2',
            description: 'Utökad funktionalitet.',
            dependencyId: '5', 
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.gen2,
            startDate: '', endDate: '',
            date: 'Fas 3',
            status: 'planned',
            responsible: 'Lev',
            tag: 'Genomförande'
        });

        events.push({
            id: '7',
            title: 'Genomförande Fas 3',
            description: 'Slutförande.',
            dependencyId: '6', 
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.gen3,
            startDate: '', endDate: '',
            date: 'Fas 3',
            status: 'planned',
            responsible: 'Lev',
            tag: 'Genomförande'
        });

        events.push({
            id: '8',
            title: 'Migreringsupphandling',
            description: 'Upphandling av migreringsstöd.',
            dependencyId: '5', 
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.migrUpph,
            startDate: '', endDate: '',
            date: 'Migrering',
            status: 'planned',
            responsible: 'Svk',
            tag: 'Migrering'
        });

        events.push({
            id: '9',
            title: 'Migrering Implementation',
            description: 'Teknisk förberedelse.',
            dependencyId: '8',
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.migrImpl,
            startDate: '', endDate: '',
            date: 'Migrering',
            status: 'planned',
            responsible: 'Svk',
            tag: 'Migrering'
        });

        events.push({
            id: '10',
            title: 'Genomförande Migrering',
            description: 'Datamigrering och Go-Live.',
            dependencyId: '9',
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.migr,
            startDate: '', endDate: '',
            date: 'Go-Live',
            status: 'planned',
            responsible: 'Branschen',
            tag: 'Migrering'
        });

    } else if (scenario === 'opt2') {
        const brsStart = addMonths(projectStart, 2);
        const procurementStart = addMonths(projectStart, 4);
        const genBStart = addMonths(procurementStart, 12);

        events.push(
            {
                id: '2',
                title: 'Projektuppstart (Återanvändning)',
                description: `Uppstart 6 mån. Startar ${rkDelayMonths} mån efter RK-redovisning.`,
                manualStartDate: projectStart,
                durationMonths: 6,
                startDate: '', endDate: '',
                date: 'Fas 1',
                status: 'planned',
                responsible: 'Svk',
                tag: 'Historik'
            },
            {
                id: '3',
                title: 'BRS v4.0 (Delta)',
                description: 'Uppdatering av kravbilden (18 mån).',
                manualStartDate: brsStart,
                durationMonths: 18,
                startDate: '', endDate: '',
                date: 'Fas 1',
                status: 'planned',
                responsible: 'Svk',
                tag: 'BRS-Arbete'
            },
            {
                id: '4',
                title: 'Upphandling (Komplettering)',
                description: 'Upphandling 12 mån.',
                manualStartDate: procurementStart,
                durationMonths: 12,
                startDate: '', endDate: '',
                date: 'Fas 2',
                status: 'planned',
                responsible: 'Svk',
                tag: 'Upphandling'
            }
        );

        events.push({
            id: '5',
            title: 'Genomförande Fas B (Kvarvarande)',
            description: 'Färdigställande av historisk Fas B (4 mån).',
            dependencyId: '4',
            lagMonths: 0,
            durationMonths: 4,
            startDate: '', endDate: '',
            date: 'Fas 3',
            status: 'planned',
            responsible: 'Lev',
            tag: 'Genomförande'
        });

        events.push({
            id: '6',
            title: 'Genomförande Fas C',
            description: 'Genomförande Fas C (18 mån).',
            dependencyId: '5',
            lagMonths: 0,
            durationMonths: 18,
            startDate: '', endDate: '',
            date: 'Fas 3',
            status: 'planned',
            responsible: 'Lev',
            tag: 'Genomförande'
        });

        events.push({
            id: '7',
            title: 'Genomförande Fas D',
            description: 'Genomförande Fas D (10 mån). Slutfas.',
            dependencyId: '6',
            lagMonths: 0,
            durationMonths: 10,
            startDate: '', endDate: '',
            date: 'Fas 3',
            status: 'planned',
            responsible: 'Lev',
            tag: 'Genomförande'
        });

        events.push({
            id: '8',
            title: 'Migreringsupphandling',
            description: 'Upphandling av migreringsstöd.',
            manualStartDate: genBStart,
            durationMonths: LEGACY_DURATIONS.migrUpph,
            startDate: '', endDate: '',
            date: 'Migrering',
            status: 'planned',
            responsible: 'Svk',
            tag: 'Migrering'
        });

        events.push({
            id: '9',
            title: 'Migrering Implementation',
            description: 'Teknisk förberedelse.',
            dependencyId: '8',
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.migrImpl,
            startDate: '', endDate: '',
            date: 'Migrering',
            status: 'planned',
            responsible: 'Svk',
            tag: 'Migrering'
        });

        events.push({
            id: '10',
            title: 'Genomförande Migrering',
            description: 'Datamigrering och Go-Live.',
            dependencyId: '9',
            lagMonths: 0,
            durationMonths: LEGACY_DURATIONS.migr,
            startDate: '', endDate: '',
            date: 'Go-Live',
            status: 'planned',
            responsible: 'Branschen',
            tag: 'Migrering'
        });
    }

    return events;
};
