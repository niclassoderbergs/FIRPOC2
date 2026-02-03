
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv282: BRSData = {
  id: "BRS-DHV-282",
  title: "ESCO tar emot 'utflyttning registrerad'",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO tar emot information om en registrerad utflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-282: Utflyttning registrerad
    participant DHV as Datahubben
    participant ESCO as ESCO

    DHV->>ESCO: Notifiera Utflyttning Registrerad
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS282-1", description: "En utflyttning har utförts via BRS-SE-213." },
    { id: "BRS282-2", description: "En utflyttning har utförts via BRS-SE-2002." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS282-3", description: "Datahubben har skickat besked om registrerad utflyttning till ESCO." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS282-4", description: "En utflyttning registreras." },
    { id: "BRS282-5", description: "Datahubben skickar besked till ESCO." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
