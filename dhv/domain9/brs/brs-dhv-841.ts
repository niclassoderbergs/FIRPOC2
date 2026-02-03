
import { BRSData } from '../../../types';
import { contentDhv841Output } from '../../content-dhv-domain-9';

export const brsDhv841: BRSData = {
  id: "BRS-DHV-841",
  title: "Elleverantör tar emot nätavgift",
  status: "Legacy - Not implemented",
  tags: ["NON_DHV_2026"],
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör tar emot en registrerad nätavgift.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-841: Elleverantör tar emot nätavgift
    participant DHV as Datahubben
    participant Ret as Elleverantör

    Note over DHV: Trigger: BRS-DHV-811
    DHV->>Ret: Nätavgift
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS841-1", description: "BRS-DHV-811 Registrera nätavgift har exekverats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS841-2", description: "En nätavgift har distribuerats till en elleverantör av datahubben." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS841-3", description: "Datahubben skickar nätavgiften till elleverantören." }
  ],
  infoObjects: [contentDhv841Output]
};
