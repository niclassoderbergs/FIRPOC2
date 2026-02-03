
import { BRSData } from '../../types';
import { content104Input, content104Output } from '../../content-definitions';

export const brsFlex104: BRSData = {
  id: "BRS-FLEX-105", // Updated from 104
  previousId: "BRS-FLEX-104",
  title: "FIS stänger tillfälligt av CU",
  purpose: "Att administrativt stänga av en CU (Controllable Unit). Detta förhindrar att enheten används för nya åtaganden, t.ex. vid tekniska fel, regelbrott eller på begäran av systemoperatör.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-105: FIS stänger tillfälligt av CU
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: SuspendCU (CU-ID, Orsak)
    activate FIS
    FIS->>FIS: Validera status
    FIS->>FIS: Sätt status 'Suspended'
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX105-1", description: "En administratör har beslutat att stänga av en CU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX105-2", description: "CU-status har satts till 'Suspended'." }
    ],
    rejected: [
      { id: "BRSFLEX105-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX105-5", description: "CU-ID måste existera.", errorCode: "E_105_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX105-6", description: "FIS administrerar avstängning av en CU." }
  ],
  infoObjects: [content104Input, content104Output]
};
