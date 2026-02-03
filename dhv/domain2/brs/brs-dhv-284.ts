
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv284: BRSData = {
  id: "BRS-DHV-284",
  title: "ESCO tar emot 'leverantörsbyte registrerad'",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO tar emot information om ett registrerat leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-284: Leverantörsbyte registrerat
    participant DHV as Datahubben
    participant ESCO as ESCO

    DHV->>ESCO: Notifiera Byte Registrerat
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS284-1", description: "Ett leverantörsbyte har utförts via BRS-SE-215." },
    { id: "BRS284-2", description: "Ett leverantörsbyte har utförts via BRS-SE-2006." },
    { id: "BRS284-3", description: "Ett leverantörsbyte har utförts via BRS-SE-2005." },
    { id: "BRS284-10", description: "Ett leverantörsbyte har återställts via BRS-SE-2011." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS284-4", description: "Datahubben har skickat besked om leverantörsbyte till ESCO." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS284-5", description: "Ett leverantörsbyte registreras." },
    { id: "BRS284-6", description: "Datahubben skickar besked till ESCO." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
