
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv248: BRSData = {
  id: "BRS-DHV-248",
  title: "Elleverantör tar emot leverantörsbyte slut registrerad",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om ett leveransslut på grund av ett registrerat leverantörsbyte (frånträdande).",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-248: Byte Slut Registrerad
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Byte Slut
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS248-1", description: "Ett leverantörsbyte har exekverats via BRS-SE-215." },
    { id: "BRS248-2", description: "Ett leverantörsbyte har exekverats via BRS-SE-2006." },
    { id: "BRS248-3", description: "Ett leverantörsbyte har exekverats via BRS-SE-2005." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS248-4", description: "Datahubben har skickat besked om leveransslut till den frånträdande elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS248-5", description: "Ett leverantörsbyte registreras." },
    { id: "BRS248-6", description: "Datahubben skickar besked till den frånträdande elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
