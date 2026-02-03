
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7101: BRSData = {
  id: "BRS-DHV-7101",
  title: "Datahubben beräknar SWE utbyte",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beräknar total import och export för Sverige (SWE) genom att summera utbytet på utlandsförbindelser.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7101: Beräkna SWE Utbyte
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta utlandsförbindelser
    Calc->>Calc: Summera Total Import/Export
    Calc-->>Sys: SWE Net Exchange`,
  preConditions: [
    { id: "BRS7101-1", description: "Mätvärden för utlandsförbindelser finns tillgängliga." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7101-2", description: "Nationellt utbyte har beräknats." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7101-5", description: "Beräkning av nationell statistik." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
