
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv285: BRSData = {
  id: "BRS-DHV-285",
  title: "ESCO tar emot 'leverantörsbyte ångrad'",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO tar emot information om ett annullerat leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-285: Leverantörsbyte ångrat
    participant DHV as Datahubben
    participant ESCO as ESCO

    DHV->>ESCO: Notifiera Byte Ångrat
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS285-1", description: "Ett rapporterat leverantörsbyte har ångrats via BRS-SE-222." },
    { id: "BRS285-2", description: "Ett utfört leverantörsbyte har ångrats via BRS-SE-2008." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS285-3", description: "Datahubben har skickat besked om ångrat leverantörsbyte till ESCO." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS285-4", description: "Ett leverantörsbyte annulleras." },
    { id: "BRS285-5", description: "Datahubben skickar besked till ESCO." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
