
import { BRSData } from '../../../types';
import { contentDhv562Input } from '../../content-dhv-domain-1'; // Återanvänder input-struktur

export const brsDhv564: BRSData = {
  id: "BRS-DHV-564",
  title: "Nätägare begär information om utbytespunkt",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare begär information om en utbytespunkt från datahubben.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-564: Begär info om utbytespunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: RequestExchangeInfo
    DHV-->>GO: Exchange MP Data`,
  preConditions: [
    { id: "BRS564-1", description: "En nätägare har begärt information om en utbytespunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS564-2", description: "Information om utbytespunkten har distribuerats till nätägaren." }
    ],
    rejected: [
      { id: "BRS564-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRS564-10", description: "En nätägare begär information om en utbytespunkt." },
    { id: "BRS564-11", description: "Datahubben svarar med information om utbytespunkten till nätägaren." }
  ],
  infoObjects: [contentDhv562Input]
};