
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv264: BRSData = {
  id: "BRS-DHV-264",
  title: "Nätägare tar emot 'utflyttning registrerad'",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare tar emot information om en registrerad utflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-264: Utflyttning registrerad
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Notifiera Utflyttning Registrerad
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS264-1", description: "En utflyttning har utförts via BRS-SE-213." },
    { id: "BRS264-2", description: "En utflyttning har utförts via BRS-SE-2002." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS264-3", description: "Datahubben har skickat besked om registrerad utflyttning till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS264-4", description: "En utflyttning registreras." },
    { id: "BRS264-5", description: "Datahubben skickar besked till nätägaren." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
