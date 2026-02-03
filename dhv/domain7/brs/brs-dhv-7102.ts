
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7102: BRSData = {
  id: "BRS-DHV-7102",
  title: "Datahubben aggregerar produktion per MBA",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Aggregerar all produktion inom respektive budområde (MBA) för statistiska ändamål.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7102: MBA Produktion
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta MGA Produktion
    Calc->>Calc: Summera per MBA
    Calc-->>Sys: MBA Total Production`,
  preConditions: [
    { id: "BRS7102-1", description: "Produktion per MGA är beräknad (7001)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7102-2", description: "Produktionsstatistik per MBA är sparad." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7102-5", description: "Aggregering av produktion." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
