
import { BRSData } from '../../types';
import { content125Input, content125Output } from '../../content-definitions';

export const brsFlex125: BRSData = {
  id: "BRS-FLEX-126", // Updated from 125
  previousId: "BRS-FLEX-125",
  title: "FIS återaktiverar SPG",
  purpose: "Att återställa en SPG till normal driftstatus efter en tillfällig avstängning, vilket möjliggör budgivning igen.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-126: FIS återaktiverar SPG (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: ReactivateSPG (SPG-ID)
    activate FIS
    FIS->>FIS: Validera status (Suspended)
    FIS->>FIS: Sätt status 'Active' (eller 'Available')
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX126-1", description: "En SPG är avstängd och beslut om återaktivering finns." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX126-2", description: "SPG-status är återställd." }
    ],
    rejected: [
      { id: "BRSFLEX126-4", description: "SPG var inte i tillstånd att återaktiveras." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX126-5", description: "Endast 'Suspended' SPG kan återaktiveras.", errorCode: "E_126_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX126-6", description: "FIS administrerar återaktivering av en SPG." },
    { id: "BRSFLEX126-7", description: "Systemet exekverar statusändringen." }
  ],
  infoObjects: [content125Input]
};
