
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv249: BRSData = {
  id: "BRS-DHV-249",
  title: "Elleverantör tar emot leverantörsbyte slut ångrad",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om ett annullerat leveransslut på grund av ett ångrat leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-249: Byte Slut Ångrad
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Byte Slut Ångrad
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS249-1", description: "Ett leverantörsbyte har ångrats via BRS-SE-222." },
    { id: "BRS249-2", description: "Ett leverantörsbyte har ångrats via BRS-SE-2008." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS249-3", description: "Datahubben har skickat besked om ångrat leveransslut till den tidigare frånträdande elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS249-4", description: "Ett leverantörsbyte annulleras." },
    { id: "BRS249-5", description: "Datahubben skickar besked till elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
