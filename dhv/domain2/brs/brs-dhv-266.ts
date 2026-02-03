
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv266: BRSData = {
  id: "BRS-DHV-266",
  title: "Nätägare tar emot 'leverantörsbyte registrerad'",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare tar emot information om ett registrerat leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-266: Leverantörsbyte registrerat
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Notifiera Byte Registrerat
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS266-1", description: "Ett leverantörsbyte har utförts via BRS-SE-215." },
    { id: "BRS266-2", description: "Ett leverantörsbyte har utförts via BRS-SE-2006 (anvisad)." },
    { id: "BRS266-3", description: "Ett leverantörsbyte har utförts via BRS-SE-2005 (mottagningsplikt)." },
    { id: "BRS266-10", description: "Ett leverantörsbyte har återställts via BRS-SE-2011." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS266-4", description: "Datahubben har skickat besked om leverantörsbyte till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS266-5", description: "Ett leverantörsbyte registreras." },
    { id: "BRS266-6", description: "Datahubben skickar besked till nätägaren." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
