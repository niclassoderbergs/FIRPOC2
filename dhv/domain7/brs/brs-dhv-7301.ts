
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7301: BRSData = {
  id: "BRS-DHV-7301",
  title: "Datahubben beräknar MBA leveransobalans",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Kontrollerar diskrepanser i leveransstrukturen genom att jämföra summerad leveransavräkning med den fysiska omsättningen i budområdet.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7301: MBA Leveransobalans
    participant Sys as System
    participant QA as Kvalitetssäkring

    Sys->>QA: Hämta Leveransavräkning (Summa BRP)
    Sys->>QA: Hämta Fysisk Omsättning
    QA->>QA: Diff = Leverans - Fysisk
    QA-->>Sys: MBA Delivery Imbalance`,
  preConditions: [
    { id: "BRS7301-1", description: "Leveransavräkning och statistikberäkningar är klara." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7301-2", description: "Leveransobalans beräknad." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7301-5", description: "Kvalitetskontroll av leveransavräkning." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
