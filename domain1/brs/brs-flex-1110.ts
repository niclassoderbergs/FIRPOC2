
import { BRSData } from '../../types';
import { content1110Input, content1110Output } from '../../content-definitions';

export const brsFlex1110: BRSData = {
  id: "BRS-FLEX-1110",
  title: "FIS registrerar SPU",
  purpose: "Att registrera en SPU på uppdrag av en aktör eller för att upprätthålla dataintegritet vid systemhändelser som kräver administrativa åtgärder.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1110: FIS registrerar SPU (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: CreateSPU (SP-ID, Namn, Elområde)
    activate FIS
    FIS->>FIS: Skapa SPU-objekt
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1110-1", description: "Systemadministratören har initierat registrering av en Service Providing Unit (SPU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1110-2", description: "FIS har registrerat en Service Providing Unit (SPU) administrativt." }
    ],
    rejected: [
      { id: "BRSFLEX1110-4", description: "Fel vid skapande, inget objekt sparat." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1110-5", description: "FIS registrerar en SPU administrativt." }
  ],
  infoObjects: [content1110Input, content1110Output]
};
