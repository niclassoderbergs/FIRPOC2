
import { BRSData } from '../../types';
import { content114Input, content114Output } from '../../content-definitions';

export const brsFlex114: BRSData = {
  id: "BRS-FLEX-115", // Updated from 114
  previousId: "BRS-FLEX-114",
  title: "FIS stänger tillfälligt av SPU",
  purpose: "Att administrativt stänga av en SPU (Service Providing Unit). Detta förhindrar att enheten används för nya åtaganden, t.ex. vid tekniska fel eller utredning.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-115: FIS stänger tillfälligt av SPU (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: SuspendSPU (SPU-ID, Orsak)
    activate FIS
    FIS->>FIS: Sätt status 'Suspended'
    FIS-->>Admin: Ack (Status Updated)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX115-1", description: "En administratör har beslutat att stänga av en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX115-2", description: "SPU-status har satts till 'Suspended'." }
    ],
    rejected: [
      { id: "BRSFLEX115-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX115-5", description: "SPU-ID måste existera.", errorCode: "E_115_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX115-6", description: "FIS administrerar avstängning av en SPU." },
    { id: "BRSFLEX115-7", description: "Systemet exekverar statusändringen." }
  ],
  infoObjects: [content114Input, content114Output]
};
