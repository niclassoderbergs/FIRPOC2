
import { GanttEvent } from './types';
import { NCDR_ACT7_START, NCDR_ACT7_DURATION } from './constants';

// Legacy Data (Historisk Elmarknadshubb)
export const historicalData: GanttEvent[] = [
    // --- Förstudier & policyunderlag (Ei) ---
    {
        id: 'H01',
        title: 'Informationshanteringsmodell, Ei R2014:16',
        description: 'Startpunkt för hela tidslinjen',
        manualStartDate: '2014-12-01',
        durationMonths: 3, // Dec-14 to Mar-15
        startDate: '', endDate: '',
        date: 'dec 2014 - mar 2015',
        status: 'completed',
        responsible: 'Ei',
        tag: 'Ei-Utredning'
    },
    {
        id: 'H02',
        title: 'Elhandlarcentrisk flyttprocess, Ei R2015:05',
        description: 'Kostnadsnyttoanalys',
        manualStartDate: '2014-12-01',
        durationMonths: 3, // Dec-14 to Mar-15
        startDate: '', endDate: '',
        date: 'dec 2014 - mar 2015',
        status: 'completed',
        responsible: 'Ei',
        tag: 'Ei-Utredning'
    },
    {
        id: 'H03',
        title: 'Rapport om ny modell för elmarknaden',
        description: 'Sammanfattande modellarbete',
        manualStartDate: '2015-06-01',
        durationMonths: 24, // Jun-15 to Jun-17
        startDate: '', endDate: '',
        date: 'jun 2015 - jun 2017',
        status: 'completed',
        responsible: 'Ei',
        tag: 'Ei-Utredning'
    },

    // --- Kravarbete – BRS ---
    {
        id: 'H04',
        title: 'BRS v1.0',
        description: 'Första sammanhållna kravbilden',
        manualStartDate: '2015-06-01',
        durationMonths: 12, // Jun-15 to Jun-16
        startDate: '', endDate: '',
        date: 'jun 2015 - jun 2016',
        status: 'completed',
        responsible: 'Svk/Branschen',
        tag: 'BRS-Arbete'
    },
    {
        id: 'H05',
        title: 'BRS v2.0',
        description: 'Fördjupning och revidering',
        manualStartDate: '2016-06-01',
        durationMonths: 15, // Jun-16 to Sep-17
        startDate: '', endDate: '',
        date: 'jun 2016 - sep 2017',
        status: 'completed',
        responsible: 'Svk/Branschen',
        tag: 'BRS-Arbete'
    },
    {
        id: 'H06',
        title: 'BRS v3.0',
        description: 'Slutlig kravbild inför upphandling',
        manualStartDate: '2017-09-01',
        durationMonths: 12, // Sep-17 to Sep-18
        startDate: '', endDate: '',
        date: 'sep 2017 - sep 2018',
        status: 'completed',
        responsible: 'Svk/Branschen',
        tag: 'BRS-Arbete'
    },

    // --- Upphandling ---
    {
        id: 'H07',
        title: 'Upphandling',
        description: 'Parallellt med BRS v3.0',
        manualStartDate: '2017-01-01',
        durationMonths: 20, // Jan-17 to Sep-18
        startDate: '', endDate: '',
        date: 'jan 2017 - sep 2018',
        status: 'completed',
        responsible: 'Svk',
        tag: 'Upphandling'
    },

    // --- Genomförande & migrering ---
    {
        id: 'H08',
        title: 'Genomförandefas 1',
        description: 'Initial implementation',
        manualStartDate: '2018-09-01',
        durationMonths: 9, // Sep-18 to Jun-19
        startDate: '', endDate: '',
        date: 'sep 2018 - jun 2019',
        status: 'completed',
        responsible: 'Lev',
        tag: 'Genomförande'
    },
    {
        id: 'H09',
        title: 'Genomförandefas 2',
        description: 'Utökad funktionalitet',
        manualStartDate: '2019-06-01',
        durationMonths: 18, // Jun-19 to Dec-20
        startDate: '', endDate: '',
        date: 'jun 2019 - dec 2020',
        status: 'completed',
        responsible: 'Lev',
        tag: 'Genomförande'
    },
    {
        id: 'H10',
        title: 'Genomförandefas 3',
        description: 'Slutfas fram till avslut',
        manualStartDate: '2021-01-01',
        durationMonths: 24, // Jan-21 to Dec-22
        startDate: '', endDate: '',
        date: 'jan 2021 - dec 2022',
        status: 'completed',
        responsible: 'Lev',
        tag: 'Genomförande'
    },
    {
        id: 'H11',
        title: 'Migreringsupphandling',
        description: 'Förberedelser för migrering',
        manualStartDate: '2019-06-01',
        durationMonths: 18, // Jun-19 to Dec-20
        startDate: '', endDate: '',
        date: 'jun 2019 - dec 2020',
        status: 'completed',
        responsible: 'Svk',
        tag: 'Migrering'
    },
    {
        id: 'H12',
        title: 'Implementering av migreringssystem',
        description: 'Tekniskt stöd',
        manualStartDate: '2020-12-01',
        durationMonths: 6, // Dec-20 to Jun-21
        startDate: '', endDate: '',
        date: 'dec 2020 - jun 2021',
        status: 'completed',
        responsible: 'Lev',
        tag: 'Migrering'
    },
    {
        id: 'H13',
        title: 'Migrering',
        description: 'Datamigrering och avslut',
        manualStartDate: '2021-06-01',
        durationMonths: 18, // Jun-21 to Dec-22
        startDate: '', endDate: '',
        date: 'jun 2021 - dec 2022',
        status: 'completed',
        responsible: 'Branschen',
        tag: 'Migrering'
    }
];

// NCDR Initial Data
export const rawInitialData: GanttEvent[] = [
    {
        id: '1',
        title: '1. EU Beslut & Ikraftträdande',
        description: 'Network Code Demand Response träder i kraft.',
        manualStartDate: '2026-02-28',
        durationMonths: 0,
        startDate: '', endDate: '',
        date: 'Q1 2026',
        status: 'planned',
        responsible: 'EU',
        contributing: 'EU',
        approving: 'EU',
        tag: 'Lagstiftning',
        isDeadline: true
    },
    {
        id: '2',
        title: '2. Nationella procedurregler',
        description: 'Ei tar fram föreskrifter och procedurregler (12 månader).',
        dependencyId: '1',
        lagMonths: 0,
        durationMonths: 12,
        startDate: '', endDate: '',
        date: '2026-2027',
        status: 'planned',
        responsible: 'Ei',
        contributing: 'Svk, DSOs',
        approving: 'Ei',
        tag: 'Reglering'
    },
    {
        id: '3',
        title: '3. Villkor tjänsteleverantörer',
        description: 'Nationella villkor för BSP/FSP fastställs.',
        dependencyId: '2',
        lagMonths: 0,
        durationMonths: 9,
        startDate: '', endDate: '',
        date: '2027',
        status: 'planned',
        responsible: 'Svk, DSOs',
        contributing: 'Svk, DSOs',
        approving: 'Ei',
        tag: 'Kravställning'
    },
    {
        id: '4',
        title: '4. Metoder för referensprofil',
        description: 'Fastställande av baseline-metodik.',
        dependencyId: '2',
        lagMonths: 0,
        durationMonths: 9,
        startDate: '', endDate: '',
        date: '2027',
        status: 'planned',
        responsible: 'Svk, DSOs',
        contributing: 'Svk, DSOs',
        approving: 'Ei',
        tag: 'Kravställning'
    },
    {
        id: '5',
        title: '5. Nationella villkor för FIS',
        description: 'Regelverk och specifikation för flexibilitetsregistret.',
        dependencyId: '2',
        lagMonths: 0,
        durationMonths: 18,
        startDate: '', endDate: '',
        date: '2027-2028',
        status: 'planned',
        responsible: 'Svk, DSOs',
        contributing: 'Svk, DSOs',
        approving: 'Ei',
        tag: 'Specifikation'
    },
    {
        id: '6',
        title: '6. Uppgradering infosystem',
        description: 'Implementering och anpassning av IT-system hos aktörer och centralt.',
        manualStartDate: '2028-09-01',
        durationMonths: 24,
        startDate: '', endDate: '',
        date: '2028-2030',
        status: 'planned',
        responsible: 'TSO',
        contributing: 'IT-lev',
        approving: 'TSO',
        tag: 'IT-Utveckling'
    },
    {
        id: '7',
        title: '7. Fullt operativt FIS',
        description: 'Driftsättning och marknadsstart för flexibilitetsregistret. (Styrande deadline)',
        manualStartDate: NCDR_ACT7_START,
        durationMonths: NCDR_ACT7_DURATION,
        startDate: '', endDate: '',
        date: '2029-2031',
        status: 'planned',
        responsible: 'TSO',
        contributing: 'Aktörer',
        approving: 'Ei',
        tag: 'Driftsättning',
        isDeadline: false
    }
];
