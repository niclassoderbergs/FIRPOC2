
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7100: BRSData = {
  id: "BRS-DHV-7100",
  title: "Datahubben beräknar MBA utbyte",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beräknar import, export och transit för budområden (MBA). Detta används för nationell statistik och rapportering till ENTSO-E.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7100: Beräkna MBA Utbyte
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta utbytespunkter mellan MBA
    Calc->>Calc: Summera Import/Export per MBA
    Calc-->>Sys: MBA Net Exchange`,
  preConditions: [
    { id: "BRS7100-1", description: "Mätvärden för utbytespunkter är aggregerade." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7100-2", description: "Utbyte per MBA har beräknats och lagrats." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7100-5", description: "Beräkning av MBA statistik." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
