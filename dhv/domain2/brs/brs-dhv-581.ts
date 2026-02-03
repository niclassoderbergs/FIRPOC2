
import { BRSData } from '../../../types';
import { contentDhvContractOutput } from '../../content-dhv-domain-2';

export const brsDhv581: BRSData = {
  id: "BRS-DHV-581",
  title: "ESCO tar emot information om kundleveransavtal",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS skickar information om kundleveransavtal till en ESCO.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-581: ESCO tar emot avtalsinfo
    participant DHV as Datahubben
    participant ESCO as ESCO

    DHV->>ESCO: Skicka avtalsinfo
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS581-1", description: "BRS-SE-514 Registrera kundleveransavtal har utförts." },
    { id: "BRS581-2", description: "BRS-SE-515 Uppdatera kundleveransavtal har utförts." },
    { id: "BRS581-3", description: "BRS-SE-518 Ta bort kundleveransavtal har utförts." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS581-4", description: "Datahubben har skickat information om kundleveransavtal till ESCO." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS581-6", description: "Datahubben distribuerar avtalsinformation till ESCO." }
  ],
  infoObjects: [contentDhvContractOutput]
};
