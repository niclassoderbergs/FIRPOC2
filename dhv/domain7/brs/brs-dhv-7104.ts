
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7104: BRSData = {
  id: "BRS-DHV-7104",
  title: "Datahubben aggregerar konsumtion per MBA",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Aggregerar all konsumtion inom respektive budområde (MBA) för statistiska ändamål.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7104: MBA Konsumtion
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta MGA Konsumtion
    Calc->>Calc: Summera per MBA
    Calc-->>Sys: MBA Total Consumption`,
  preConditions: [
    { id: "BRS7104-1", description: "Konsumtion per MGA är beräknad (7001)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7104-2", description: "Konsumtionsstatistik per MBA är sparad." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7104-5", description: "Aggregering av konsumtion." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
