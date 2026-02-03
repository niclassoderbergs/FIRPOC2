
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv245: BRSData = {
  id: "BRS-DHV-245",
  title: "Elleverantör tar emot 'utflyttning ångrad'",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om att en utflyttning har blivit annullerad (cancelled).",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-245: Utflyttning ångrad
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Utflytt Ångrad
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS245-1", description: "Ett avvisande av utflytt har registrerats via BRS-SE-212." },
    { id: "BRS245-2", description: "En rapporterad utflytt har ångrats via BRS-SE-224 Ångra utflytt." },
    { id: "BRS245-3", description: "En utförd utflytt har ångrats via BRS-SE-2004 Datahubben ångrar utflytt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS245-4", description: "Datahubben har skickat besked om ångrad utflyttning till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS245-5", description: "En utflyttning annulleras." },
    { id: "BRS245-6", description: "Datahubben skickar besked till elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
