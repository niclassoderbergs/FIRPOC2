
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv283: BRSData = {
  id: "BRS-DHV-283",
  title: "ESCO tar emot 'utflyttning ångrad'",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO tar emot information om en annullerad utflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-283: Utflyttning ångrad
    participant DHV as Datahubben
    participant ESCO as ESCO

    DHV->>ESCO: Notifiera Utflyttning Ångrad
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS283-1", description: "En rapporterad utflyttning har ångrats via BRS-SE-224." },
    { id: "BRS283-2", description: "En utförd utflyttning har ångrats via BRS-SE-2004." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS283-3", description: "Datahubben har skickat besked om ångrad utflyttning till ESCO." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS283-4", description: "En utflyttning annulleras." },
    { id: "BRS283-5", description: "Datahubben skickar besked till ESCO." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
