
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv244: BRSData = {
  id: "BRS-DHV-244",
  title: "Elleverantör tar emot 'utflyttning registrerad'",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur elleverantören tar emot information om att en utflyttning har registrerats.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-244: Utflyttning registrerad
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Utflyttning Registrerad
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS244-1", description: "En utflyttning har utförts via BRS-SE-213 Rapportera utflytt." },
    { id: "BRS244-2", description: "En utflyttning har utförts via BRS-SE-2002 Datahubben utför utflytt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS244-3", description: "Datahubben har skickat besked om registrerad utflyttning till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS244-4", description: "En utflyttning registreras." },
    { id: "BRS244-5", description: "Datahubben skickar besked till elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
