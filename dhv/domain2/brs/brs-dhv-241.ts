
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv241: BRSData = {
  id: "BRS-DHV-241",
  title: "Elleverantör tar emot 'inflyttning registrerad'",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur elleverantören tar emot information om en leveransstart orsakad av en registrerad inflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-241: Inflytt registrerad notis
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Inflytt Registrerad
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS241-1", description: "En inflyttning har exekverats via BRS-SE-2007 (Datahubben utför inflytt)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS241-3", description: "Datahubben har skickat besked om registrerad inflyttning till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS241-4", description: "En inflyttning utförs." },
    { id: "BRS241-5", description: "Datahubben skickar besked om inflyttning till elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
