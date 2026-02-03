
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv280: BRSData = {
  id: "BRS-DHV-280",
  title: "ESCO tar emot 'inflyttning registrerad'",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO tar emot information om en registrerad inflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-280: Inflyttning registrerad
    participant DHV as Datahubben
    participant ESCO as ESCO

    DHV->>ESCO: Notifiera Inflyttning Registrerad
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS280-1", description: "En inflyttning har utförts via BRS-SE-2007." },
    { id: "BRS280-2", description: "En inflyttning har utförts via BRS-SE-2009." },
    { id: "BRS280-10", description: "En inflyttning har utförts via BRS-SE-2010." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS280-3", description: "Datahubben har skickat besked om registrerad inflyttning till ESCO." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS280-4", description: "En inflyttning registreras." },
    { id: "BRS280-5", description: "Datahubben skickar besked till ESCO." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
