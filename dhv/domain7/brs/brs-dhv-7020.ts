
import { BRSData } from '../../../types';
import { contentDhv7000Output } from '../../content-dhv-domain-7';

export const brsDhv7020: BRSData = {
  id: "BRS-DHV-7020",
  title: "Datahubben beräknar fakturaunderlag (Correction)",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Skapar fakturarader baserat på resultatet från korrigeringsavräkningen. Dessa rader används av marknadens parter för ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7020: Skapa Fakturaunderlag
    participant Sys as System
    participant DB as Databas

    Sys->>DB: Hämta Korrigeringsresultat (7019)
    Sys->>Sys: Mappa till prislistor
    Sys->>Sys: Generera fakturarader
    Sys->>DB: Spara Invoice Data`,
  preConditions: [
    { id: "BRS7020-1", description: "Korrigeringsavräkning (7019) är genomförd." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7020-2", description: "Fakturaunderlag har skapats och finns tillgängligt för nedladdning." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7020-5", description: "Datahubben genererar fakturarader." }
  ],
  infoObjects: [contentDhv7000Output]
};
