
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7300: BRSData = {
  id: "BRS-DHV-7300",
  title: "Datahubben beräknar MGA obalans",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beräknar den fysiska obalansen per nätområde (MGA) för att kvalitetssäkra mätvärden. Obalansen är skillnaden mellan total inmatning (produktion + import) och totalt uttag (konsumtion + export + förluster).",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7300: MGA Obalans
    participant Sys as System
    participant QA as Kvalitetssäkring

    Sys->>QA: Hämta summor (Prod, Kons, Utbyte, Förlust)
    QA->>QA: Obalans = (Prod + Imp) - (Kons + Exp + Förlust)
    QA-->>Sys: MGA Imbalance`,
  preConditions: [
    { id: "BRS7300-1", description: "Alla aggregat och förlustberäkningar är klara." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7300-2", description: "Obalans per MGA beräknad." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7300-5", description: "Beräkning av obalans för kvalitetssäkring." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
