
import { BRSData } from '../../types';
import { content124Input, content124Output } from '../../content-definitions';

export const brsFlex124: BRSData = {
  id: "BRS-FLEX-125", // Updated from 124
  previousId: "BRS-FLEX-124",
  title: "FIS stänger tillfälligt av SPG",
  purpose: "Att administrativt stänga av en SPG (Service Providing Group). Detta spärrar portföljen från att användas i budgivning.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-125: FIS stänger tillfälligt av SPG (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: SuspendSPG (SPG-ID, Orsak)
    activate FIS
    FIS->>FIS: Sätt status 'Suspended'
    FIS-->>Admin: Ack (Status Updated)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX125-1", description: "En administratör har beslutat att stänga av en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX125-2", description: "SPG-status har satts till 'Suspended'." }
    ],
    rejected: [
      { id: "BRSFLEX125-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX125-5", description: "SPG-ID måste existera.", errorCode: "E_125_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX125-6", description: "FIS administrerar avstängning av en SPG." },
    { id: "BRSFLEX125-7", description: "Systemet exekverar statusändringen." }
  ],
  infoObjects: [content124Input, content124Output]
};
