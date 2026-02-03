
import { BRSData } from '../../types';
import { content1210Input, content1210Output } from '../../content-definitions';

export const brsFlex1210: BRSData = {
  id: "BRS-FLEX-1210",
  title: "FIS registrerar SPG",
  purpose: "Att skapa en SPG administrativt, initierat av FIS. Används för administrativa syften eller tvångsåtgärder.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1210: FIS registrerar SPG (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: CreateSPG (SP-ID, Metadata)
    activate FIS
    FIS->>FIS: Skapa SPG
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1210-1", description: "Systemadministratören har initierat registrering av en Service Providing Group (SPG)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1210-2", description: "FIS har registrerat en Service Providing Group (SPG) administrativt." }
    ],
    rejected: [
      { id: "BRSFLEX1210-4", description: "Fel vid skapande, inget objekt sparat." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1210-5", description: "FIS registrerar en SPG administrativt." }
  ],
  infoObjects: [content1210Input, content1210Output]
};
