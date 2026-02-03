
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv263: BRSData = {
  id: "BRS-DHV-263",
  title: "Nätägare tar emot 'inflyttning ångrad'",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare tar emot information om att en inflyttning är annullerad.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-263: Inflyttning ångrad
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Notifiera Inflyttning Ångrad
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS263-1", description: "En bekräftad inflyttning har ångrats via BRS-SE-221." },
    { id: "BRS263-2", description: "En utförd inflyttning har ångrats via BRS-SE-2003." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS263-4", description: "Datahubben har skickat besked om ångrad inflyttning till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS263-5", description: "En inflyttning är annullerad." },
    { id: "BRS263-6", description: "Datahubben skickar besked till nätägaren." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
