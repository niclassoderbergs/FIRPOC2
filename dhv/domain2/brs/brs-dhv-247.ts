
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv247: BRSData = {
  id: "BRS-DHV-247",
  title: "Elleverantör tar emot leverantörsbyte start ångrad",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om en annullerad leveransstart på grund av ett ångrat leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-247: Byte Start Ångrad
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Byte Start Ångrad
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS247-1", description: "Ett leverantörsbyte har ångrats via BRS-SE-222." },
    { id: "BRS247-2", description: "Ett leverantörsbyte har ångrats via BRS-SE-2008." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS247-3", description: "Datahubben har skickat besked om ångrad leveransstart till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS247-4", description: "Ett leverantörsbyte annulleras." },
    { id: "BRS247-5", description: "Datahubben skickar besked till elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
