
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv281: BRSData = {
  id: "BRS-DHV-281",
  title: "ESCO tar emot 'inflyttning ångrad'",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO tar emot information om en annullerad inflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-281: Inflyttning ångrad
    participant DHV as Datahubben
    participant ESCO as ESCO

    DHV->>ESCO: Notifiera Inflyttning Ångrad
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS281-1", description: "En rapporterad inflyttning har ångrats via BRS-SE-221." },
    { id: "BRS281-2", description: "En utförd inflyttning har ångrats via BRS-SE-2003." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS281-3", description: "Datahubben har skickat besked om ångrad inflyttning till ESCO." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS281-4", description: "En inflyttning annulleras." },
    { id: "BRS281-5", description: "Datahubben skickar besked till ESCO." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
