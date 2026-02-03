
import { GridConstraint } from '../types';

const now = new Date();
const todayStr = now.toISOString().split('T')[0];

const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0];

const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);
const nextWeekStr = nextWeek.toISOString().split('T')[0];

export const mockGridConstraints: GridConstraint[] = [
  // --- ACTIVE ---
  { 
    id: 'GC-ACT-001', 
    gridOwner: 'Ellevio AB', 
    limitValue: 0, 
    limitUnit: 'MW', 
    startTime: `${todayStr}T08:00:00Z`, 
    endTime: `${todayStr}T16:00:00Z`, 
    status: 'Active', 
    affectedUnits: ['CU-10001', 'CU-10006'], 
    reason: 'Emergency cable repair in Stockholm Central' 
  },
  { 
    id: 'GC-ACT-002', 
    gridOwner: 'E.ON Energidistribution AB', 
    limitValue: 1.5, 
    limitUnit: 'MW', 
    startTime: `${yesterdayStr}T00:00:00Z`, 
    endTime: `${todayStr}T23:59:59Z`, 
    status: 'Active', 
    affectedUnits: ['CU-10003'], 
    reason: 'Local transformer overload due to industrial ramp-up' 
  },

  // --- PLANNED ---
  {
    id: 'GC-PLAN-001',
    gridOwner: 'Vattenfall Eldistribution AB',
    limitValue: 5.0,
    limitUnit: 'MW',
    startTime: `${nextWeekStr}T10:00:00Z`,
    endTime: `${nextWeekStr}T14:00:00Z`,
    status: 'Planned',
    affectedUnits: ['CU-10002', 'CU-10015', 'CU-10022'],
    reason: 'Scheduled maintenance on 40kV Luleå Line'
  },
  {
    id: 'GC-PLAN-002',
    gridOwner: 'Göteborg Energi Nät AB',
    limitValue: 0.8,
    limitUnit: 'MW',
    startTime: `${nextWeekStr}T06:00:00Z`,
    endTime: `${nextWeekStr}T18:00:00Z`,
    status: 'Planned',
    affectedUnits: ['CU-10045', 'CU-10046'],
    reason: 'Grid reinforcement project - Phase 4'
  },

  // --- EXPIRED / HISTORICAL (Extensive list) ---
  {
    id: 'GC-HIST-502',
    gridOwner: 'Ellevio AB',
    limitValue: 2.5,
    limitUnit: 'MW',
    startTime: '2025-01-15T09:00:00Z',
    endTime: '2025-01-15T12:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10001'],
    reason: 'Winter peak demand protective capping'
  },
  {
    id: 'GC-HIST-503',
    gridOwner: 'Vattenfall Eldistribution AB',
    limitValue: 0,
    limitUnit: 'MW',
    startTime: '2025-02-10T14:00:00Z',
    endTime: '2025-02-10T15:30:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10010', 'CU-10011', 'CU-10012'],
    reason: 'Transient stability issues detected after storm'
  },
  {
    id: 'GC-HIST-504',
    gridOwner: 'E.ON Energidistribution AB',
    limitValue: 3.0,
    limitUnit: 'MW',
    startTime: '2024-12-01T08:00:00Z',
    endTime: '2024-12-01T20:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10050'],
    reason: 'Maintenance of substation 404'
  },
  {
    id: 'GC-HIST-505',
    gridOwner: 'Skellefteå Kraft Elnät AB',
    limitValue: 10.0,
    limitUnit: 'MW',
    startTime: '2024-11-20T00:00:00Z',
    endTime: '2024-11-21T00:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10080', 'CU-10081'],
    reason: 'Regional transmission constraint'
  },
  {
    id: 'GC-HIST-506',
    gridOwner: 'Ellevio AB',
    limitValue: 1.2,
    limitUnit: 'MW',
    startTime: '2025-03-05T07:00:00Z',
    endTime: '2025-03-05T09:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10006'],
    reason: 'Voltage regulation pilot test'
  },
  {
    id: 'GC-HIST-507',
    gridOwner: 'Mälarenergi Elnät AB',
    limitValue: 0,
    limitUnit: 'MW',
    startTime: '2024-10-12T11:00:00Z',
    endTime: '2024-10-12T13:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10020'],
    reason: 'Underground cable replacement'
  },
  {
    id: 'GC-HIST-508',
    gridOwner: 'Umeå Energi Elnät AB',
    limitValue: 4.5,
    limitUnit: 'MW',
    startTime: '2025-01-22T17:00:00Z',
    endTime: '2025-01-22T19:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10110', 'CU-10115'],
    reason: 'Localized congestion during heating peak'
  },
  {
    id: 'GC-HIST-509',
    gridOwner: 'E.ON Energidistribution AB',
    limitValue: 2.0,
    limitUnit: 'MW',
    startTime: '2024-09-15T09:00:00Z',
    endTime: '2024-09-15T15:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10003'],
    reason: 'Switchgear inspection'
  },
  {
    id: 'GC-HIST-510',
    gridOwner: 'Vattenfall Eldistribution AB',
    limitValue: 0,
    limitUnit: 'MW',
    startTime: '2025-03-10T08:00:00Z',
    endTime: '2025-03-10T12:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10200', 'CU-10201'],
    reason: 'Fiber installation proximity protection'
  },
  {
    id: 'GC-HIST-511',
    gridOwner: 'Göteborg Energi Nät AB',
    limitValue: 1.0,
    limitUnit: 'MW',
    startTime: '2024-08-01T10:00:00Z',
    endTime: '2024-08-01T14:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10300'],
    reason: 'Distribution transformer tap changer repair'
  },
  {
    id: 'GC-HIST-512',
    gridOwner: 'Ellevio AB',
    limitValue: 0.5,
    limitUnit: 'MW',
    startTime: '2025-02-28T18:00:00Z',
    endTime: '2025-02-28T21:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10001', 'CU-10002'],
    reason: 'N-1 contingency protection active'
  },
  {
    id: 'GC-HIST-513',
    gridOwner: 'E.ON Energidistribution AB',
    limitValue: 2.2,
    limitUnit: 'MW',
    startTime: '2024-07-20T12:00:00Z',
    endTime: '2024-07-20T16:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10400'],
    reason: 'Overhead line vegetation clearance'
  },
  {
    id: 'GC-HIST-514',
    gridOwner: 'Vattenfall Eldistribution AB',
    limitValue: 0,
    limitUnit: 'MW',
    startTime: '2025-01-05T02:00:00Z',
    endTime: '2025-01-05T05:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10015'],
    reason: 'Emergency transformer coolant leak'
  },
  {
    id: 'GC-HIST-515',
    gridOwner: 'Skellefteå Kraft Elnät AB',
    limitValue: 15.0,
    limitUnit: 'MW',
    startTime: '2024-11-10T08:00:00Z',
    endTime: '2024-11-10T12:00:00Z',
    status: 'Expired',
    affectedUnits: ['CU-10080'],
    reason: 'Power quality monitoring calibration'
  }
];
