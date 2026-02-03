
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv262: BRSData = {
  id: "BRS-DHV-262",
  title: "Nätägare tar emot 'inflyttning registrerad'",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare tar emot information om en registrerad inflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-262: Inflyttning registrerad
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Notifiera Inflyttning Registrerad
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS262-1", description: "En inflyttning har utförts via BRS-SE-2007." },
    { id: "BRS262-2", description: "En inflyttning har utförts via BRS-SE-2009." },
    { id: "BRS262-10", description: "En inflyttning har utförts via BRS-SE-2010." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS262-3", description: "Datahubben har skickat besked om registrerad inflyttning till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS262-4", description: "En inflyttning har utförts." },
    { id: "BRS262-5", description: "Datahubben skickar besked till nätägaren." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
