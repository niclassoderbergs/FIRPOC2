
import { BRSData } from '../../types';
import { content132Input, content132Output } from '../../content-definitions';

export const brsFlex1320: BRSData = {
  id: "BRS-FLEX-1330", // Updated from 1320
  previousId: "BRS-FLEX-1320",
  title: "FIS tar bort CU från SPU",
  purpose: "Automatisk systemprocess för att koppla bort en CU från en SPU. Detta sker antingen när flexavtalet upphör, när resursen flyttas till en ny SPU, eller om den kopplas till en SPG som kräver utträde ur nuvarande SPU.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1330: FIS tar bort CU från SPU (Admin/System)
    participant Init as FIS (System/Admin)
    participant FIS as FIS

    Init->>FIS: ForceUnlinkCUfromSPU (SPU-ID, CU-ID)
    activate FIS
    FIS->>FIS: Validera relation
    FIS->>FIS: Ta bort koppling
    FIS->>FIS: Uppdatera SPU kapacitet
    FIS-->>Init: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1330-1", description: "SP har avslutat ett flexibilitetsavtal (via BRS-FLEX-203) för en CU som är med i en SPU." },
    { id: "BRSFLEX1330-2", description: "FIS har avslutat ett flexibilitetsavtal (via BRS-FLEX-2030) för en CU som är med i en SPU." },
    { id: "BRSFLEX1330-3", description: "SP har kopplat en CU till en SPU (via BRS-FLEX-131) som tidigare var kopplad till annan SPU." },
    { id: "BRSFLEX1330-4", description: "SP har kopplat en CU till en SPG (via BRS-FLEX-141) som tidigare var kopplad till SPU." },
    { id: "BRSFLEX1330-PRE-803", description: "SP har begärt avregistrering (via BRS-FLEX-803), vilket kräver att alla resurser kopplas loss." },
    { id: "BRSFLEX1330-PRE-823", description: "Admin har initierat tvingande avregistrering (Revocation) av SP (via BRS-FLEX-823)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1330-5", description: "FIS har avslutat kopplingen mellan den styrbara enheten och SPU:n på grund av en systemhändelse." }
    ],
    rejected: [
      { id: "BRSFLEX1330-6", description: "Fel vid borttagning." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1330-7", description: "FIS kopplar bort en CU från en SPU (pga systemhändelse)." },
    { id: "BRSFLEX1330-8", description: "FIS initierar notifiering till SP (via separat process)." }
  ],
  infoObjects: [content132Input, content132Output]
};
