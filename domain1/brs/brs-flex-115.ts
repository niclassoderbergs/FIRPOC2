
import { BRSData } from '../../types';
import { content115Input, content115Output } from '../../content-definitions';

export const brsFlex115: BRSData = {
  id: "BRS-FLEX-116", // Updated from 115
  previousId: "BRS-FLEX-115",
  title: "FIS återaktiverar SPU",
  purpose: "Att återställa en SPU till normal driftstatus efter en tillfällig avstängning.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-116: FIS återaktiverar SPU (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: ReactivateSPU (SPU-ID)
    activate FIS
    FIS->>FIS: Validera status (Suspended)
    FIS->>FIS: Sätt status 'Active' (eller 'Available')
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX116-1", description: "En SPU är avstängd och beslut om återaktivering finns." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX116-2", description: "SPU-status är återställd." }
    ],
    rejected: [
      { id: "BRSFLEX116-4", description: "SPU var inte i tillstånd att återaktiveras." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX116-5", description: "Endast 'Suspended' SPU kan återaktiveras.", errorCode: "E_116_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX116-6", description: "FIS administrerar återaktivering av en SPU." },
    { id: "BRSFLEX116-7", description: "Systemet exekverar statusändringen." }
  ],
  infoObjects: [content115Input]
};
