
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-6';

export const brsDhv6002: BRSData = {
  id: "BRS-DHV-6002",
  title: "Datahubben beräknar mätvärdesprognos",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur datahubben beräknar prognos baserat på begäran från BRS-DHV-642 eller 682. Prognosen baseras på historiska värden eller nätägarens uppskattade årsförbrukning.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-6002: Beräkna prognos
    participant Sys as System
    participant DB as Databas

    Sys->>DB: Hämta historik / Årsförbrukning
    Sys->>Sys: Beräkna månadsvärden
    Sys->>DB: Spara resultat`,
  preConditions: [
    { id: "BRS6002-1", description: "Prognos har begärts via BRS-DHV-642." },
    { id: "BRS6002-2", description: "Prognos har begärts via BRS-DHV-682." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS6002-3", description: "Datahubben har beräknat och sparat 12 månadsvärden." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS6002-4", description: "Systemklockan startar funktionen." },
    { id: "BRS6002-7", description: "Datahubben beräknar aggregerade månadsvärden." },
    { id: "BRS6002-8", description: "Om 12 månaders historik saknas används nätägarens uppskattade årsförbrukning delat på 12." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
