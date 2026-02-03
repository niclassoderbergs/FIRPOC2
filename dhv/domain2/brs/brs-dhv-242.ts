
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv242: BRSData = {
  id: "BRS-DHV-242",
  title: "Elleverantör tar emot 'inflyttning ångrad'",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om att en inflyttning har blivit annullerad (cancelled).",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-242: Inflytt ångrad notis
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Notifiera Inflytt Ångrad
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS242-1", description: "Ett avvisande av utflytt har registrerats (BRS-SE-212)." },
    { id: "BRS242-2", description: "En anmäld inflytt har ångrats (BRS-SE-221)." },
    { id: "BRS242-3", description: "En utförd inflytt har ångrats av systemet (BRS-SE-2003)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS242-4", description: "Datahubben har skickat besked om ångrad inflyttning till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS242-5", description: "En inflyttning annulleras." },
    { id: "BRS242-6", description: "Datahubben skickar besked till elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
