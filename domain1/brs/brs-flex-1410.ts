
import { BRSData } from '../../types';
import { content143Input, content143Output } from '../../content-definitions';

export const brsFlex1410: BRSData = {
  id: "BRS-FLEX-1410",
  title: "FIS kopplar CU till SPG",
  purpose: "Att säkerställa korrekt koppling mellan CU och SPG i de fall då automatisk hantering inte är möjlig eller vid tvingande datajusteringar för att upprätthålla dataintegritet (t.ex. vid flytt av resurser).",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1410: FIS kopplar CU till SPG (Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: ForceLinkCUtoSPG (SPG-ID, CU-ID)
    activate FIS
    FIS->>FIS: Validera Elområde (Systemkrav)
    FIS->>FIS: Skapa Relation (Admin Override)
    FIS->>FIS: Uppdatera SPG status (Available -> Active)
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1410-1", description: "Systemadministratören har kopplat en styrbar enhet till en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1410-2", description: "FIS har upprättat kopplingen mellan den styrbara enheten och SPG:n administrativt." }
    ],
    rejected: [
      { id: "BRSFLEX1410-4", description: "Fel vid koppling." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1410-5", description: "FIS kopplar en CU till en SPG administrativt." },
    { id: "BRSFLEX1410-6", description: "FIS initierar notifiering till SP (via separat process)." }
  ],
  infoObjects: [content143Input, content143Output]
};
