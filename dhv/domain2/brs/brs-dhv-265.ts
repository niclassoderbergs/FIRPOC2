
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv265: BRSData = {
  id: "BRS-DHV-265",
  title: "Nätägare tar emot 'utflyttning ångrad'",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare tar emot information om en annullerad utflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-265: Utflyttning ångrad
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Notifiera Utflyttning Ångrad
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS265-1", description: "En rapporterad utflyttning har ångrats via BRS-SE-224." },
    { id: "BRS265-2", description: "En utförd utflyttning har ångrats via BRS-SE-2004." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS265-3", description: "Datahubben har skickat besked om ångrad utflyttning till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS265-4", description: "En utflyttning annulleras." },
    { id: "BRS265-5", description: "Datahubben skickar besked till nätägaren." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
