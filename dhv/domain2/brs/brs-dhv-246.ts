
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv246: BRSData = {
  id: "BRS-DHV-246",
  title: "Elleverantör tar emot leverantörsbyte start registrerad",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om leveransstart på grund av ett registrerat leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-246: Byte Start Registrerad
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Byte Start
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS246-1", description: "Ett leverantörsbyte har exekverats via BRS-SE-215." },
    { id: "BRS246-2", description: "Ett leverantörsbyte har exekverats via BRS-SE-2006 (Anvisad)." },
    { id: "BRS246-3", description: "Ett leverantörsbyte har exekverats via BRS-SE-2005 (Mottagningsplikt)." },
    { id: "BRS246-10", description: "Ett byte har återställts via BRS-SE-2011." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS246-4", description: "Datahubben har skickat besked om leveransstart (byte) till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS246-5", description: "Ett leverantörsbyte registreras." },
    { id: "BRS246-6", description: "Datahubben skickar besked till elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
