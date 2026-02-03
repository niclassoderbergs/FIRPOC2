
import { BRSData } from '../../types';
import { content133Input, content133Output } from '../../content-definitions';

export const brsFlex1310: BRSData = {
  id: "BRS-FLEX-1310",
  title: "FIS kopplar CU till SPU",
  purpose: "Att säkerställa korrekt koppling mellan CU och SPU i de fall då automatisk hantering inte är möjlig eller vid tvingande datajusteringar för att upprätthålla dataintegritet.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1310: FIS kopplar CU till SPU (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: ForceLinkCUtoSPU (SPU-ID, CU-ID)
    activate FIS
    FIS->>FIS: Validera Elområde (Systemkrav)
    FIS->>FIS: Skapa Relation (Admin Override)
    FIS->>FIS: Uppdatera SPU status (Available -> Active)
    FIS->>FIS: Räkna om kapacitet
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1310-1", description: "Systemadministratören har kopplat en styrbar enhet till en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1310-2", description: "FIS har upprättat kopplingen mellan den styrbara enheten och SPU:n administrativt." }
    ],
    rejected: [
      { id: "BRSFLEX1310-4", description: "Fel vid koppling." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1310-5", description: "FIS kopplar en CU till en SPU administrativt." },
    { id: "BRSFLEX1310-6", description: "FIS initierar notifiering till SP (via separat process)." }
  ],
  infoObjects: [content133Input, content133Output]
};
