
import { BRSData } from '../../../types';
import { contentDhvStatsOutput } from '../../content-dhv-domain-7';

export const brsDhv7302: BRSData = {
  id: "BRS-DHV-7302",
  title: "Datahubben beräknar MBA obalans",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beräknar den fysiska obalansen per budområde (MBA). Detta är en aggregering av MGA-obalanser inom området.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7302: MBA Obalans
    participant Sys as System
    participant QA as Kvalitetssäkring

    Sys->>QA: Hämta MGA Obalanser i MBA
    QA->>QA: Summera
    QA-->>Sys: MBA Imbalance`,
  preConditions: [
    { id: "BRS7302-1", description: "MGA obalanser är beräknade (7300)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7302-2", description: "MBA obalans beräknad." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7302-5", description: "Aggregering av obalanser." }
  ],
  infoObjects: [contentDhvStatsOutput]
};
