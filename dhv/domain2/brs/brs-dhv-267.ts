
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv267: BRSData = {
  id: "BRS-DHV-267",
  title: "Nätägare tar emot 'leverantörsbyte ångrad'",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare tar emot information om ett annullerat leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-267: Leverantörsbyte ångrat
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Notifiera Byte Ångrat
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS267-1", description: "Ett rapporterat leverantörsbyte har ångrats via BRS-SE-222." },
    { id: "BRS267-2", description: "Ett utfört leverantörsbyte har ångrats via BRS-SE-2008." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS267-3", description: "Datahubben har skickat besked om ångrat leverantörsbyte till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS267-4", description: "Ett leverantörsbyte annulleras." },
    { id: "BRS267-5", description: "Datahubben skickar besked till nätägaren." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
