
import { BRSData } from '../../types';
import { content116Input, content116Output } from '../../content-definitions';

export const brsFlex116: BRSData = {
  id: "BRS-FLEX-114", // Updated from 116
  previousId: "BRS-FLEX-116",
  title: "Begär SPU information",
  purpose: "Möjliggör för behöriga aktörer (främst SP) att hämta aktuell information om en SPU, inklusive status och aggregerad kapacitet.",
  actors: [
    { role: "Initiator", description: "SP eller Behörig Part" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-114: Begär SPU information
    participant Req as SP
    participant FIS as FIS

    Req->>FIS: GetSPUInfo (SPU-ID)
    activate FIS
    FIS->>FIS: Validera behörighet
    FIS-->>Req: SPUData (Status, Kapacitet)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX114-1", description: "En aktör har begärt information om en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX114-2", description: "FIS har returnerat SPU-information." }
    ],
    rejected: [
      { id: "BRSFLEX114-3", description: "Ingen information returnerad (behörighet/ej hittad)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX114-4", description: "SP måste äga SPU:n för att se fullständig information.", errorCode: "E_114_UNAUTHORIZED" }
  ],
  process: [
    { id: "BRSFLEX114-5", description: "Aktör begär information om en SPU." },
    { id: "BRSFLEX114-6", description: "FIS returnerar datan." }
  ],
  infoObjects: [content116Input, content116Output]
};
