
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7303: BRSData = {
  id: "BRS-DHV-7303",
  title: "Datahubben beräknar SWE obalans",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beräknar den totala fysiska obalansen för Sverige. Bör vara noll om all mätning och beräkning är korrekt.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7303: SWE Obalans
    participant Sys as System
    participant QA as Kvalitetssäkring

    Sys->>QA: Hämta MBA Obalanser
    QA->>QA: Summera
    QA-->>Sys: SWE Imbalance`,
  preConditions: [
    { id: "BRS7303-1", description: "MBA obalanser är beräknade (7302)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7303-2", description: "Nationell obalans beräknad." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7303-5", description: "Total kontroll av balans." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
