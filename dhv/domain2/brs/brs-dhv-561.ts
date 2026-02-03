
import { BRSData } from '../../../types';
import { contentDhvContractOutput } from '../../content-dhv-domain-2';

export const brsDhv561: BRSData = {
  id: "BRS-DHV-561",
  title: "Nätägare tar emot information om kundleveransavtal",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS skickar information om kundleveransavtal till nätägaren.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-561: Nätägare tar emot avtalsinfo
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Skicka avtalsinfo
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS561-1", description: "BRS-SE-514 Registrera kundleveransavtal har utförts." },
    { id: "BRS561-2", description: "BRS-SE-515 Uppdatera kundleveransavtal har utförts." },
    { id: "BRS561-3", description: "BRS-SE-518 Ta bort kundleveransavtal har utförts." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS561-4", description: "Datahubben har skickat information om kundleveransavtal till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS561-6", description: "Datahubben distribuerar avtalsinformation till nätägaren." }
  ],
  infoObjects: [contentDhvContractOutput]
};
