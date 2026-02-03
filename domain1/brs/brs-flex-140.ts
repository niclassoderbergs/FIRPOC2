
import { BRSData } from '../../types';
import { content140Input, content140Output } from '../../content-definitions';

export const brsFlex140: BRSData = {
  id: "BRS-FLEX-141", // Updated from 140
  previousId: "BRS-FLEX-140",
  title: "SP kopplar CU till SPG",
  architecturalNote: "OBS: Denna process ska ändras så att den utförs av CU Registration Responsible (CURR) istället för Service Provider (SP).",
  purpose: "Att inkludera en CU i en marknadsportfölj (SPG). Om CU redan ligger i en annan SPG flyttas den.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-141: SP kopplar CU till SPG
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: LinkCUtoSPG (SPG-ID, CU-ID, Startdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        FIS->>FIS: Skapa Relation
        FIS->>FIS: Uppdatera SPG status (Available -> Active)
        FIS-->>SP: Ack (SPG-ID, CU-ID, Startdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX141-1", description: "En SP har kopplat en styrbar enhet till en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX141-2", description: "FIS har upprättat kopplingen mellan den styrbara enheten och SPG:n." },
      { id: "BRSFLEX141-3", description: "FIS har uppdaterat SPG:ns status till aktiv." }
    ],
    rejected: [
      { id: "BRSFLEX141-4", description: "Ingen länk har skapats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX141-5", description: "Angivet SPG-ID måste existera i FIS.", errorCode: "E_141_SPG_NOT_FOUND" },
    { id: "BRSFLEX141-6", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_141_CU_NOT_FOUND" },
    { id: "BRSFLEX141-7", description: "CU måste ha status Active.", errorCode: "E_141_INVALID_CU_STATUS" },
    { id: "BRSFLEX141-8", description: "SPG måste ha status Active eller Available.", errorCode: "E_141_INVALID_SPG_STATUS" },
    { id: "BRSFLEX141-9", description: "CU måste ha en godkänd produktförkvalificering.", errorCode: "E_141_NOT_PREQUALIFIED" },
    { id: "BRSFLEX141-10", description: "CU och SPG måste ligga i samma elområde.", errorCode: "E_141_ZONE_MISMATCH" }
  ],
  process: [
    { id: "BRSFLEX141-11", description: "SP begär koppling av en CU till en SPG." },
    { id: "BRSFLEX141-12", description: "FIS bekräftar kopplingen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX141-13", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content140Input, content140Output]
};
