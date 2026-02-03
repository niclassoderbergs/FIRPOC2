
import { BRSData } from '../../types';
import { content123Input, content123Output } from '../../content-definitions';

export const brsFlex123: BRSData = {
  id: "BRS-FLEX-123",
  title: "SP avregistrerar SPG",
  purpose: "Att ta bort en marknadsportfölj (SPG) som inte längre används. Detta är endast tillåtet om SPG:n är tom och inte har några aktiva bud.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-123: SP avregistrerar SPG
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: DeregisterSPG (SPG-ID)
    activate FIS
    FIS->>FIS: Kontrollera innehåll (Tom)
    FIS->>FIS: Kontrollera aktiva bud
    
    alt OK
        FIS->>FIS: Sätt status 'Terminated'
        FIS-->>SP: Ack (Terminated)
    else Fel
        FIS-->>SP: Error (Not Empty / Active Bids)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX123-1", description: "En SP har begärt avregistrering av en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX123-2", description: "FIS har avregistrerat SPG-objektet." }
    ],
    rejected: [
      { id: "BRSFLEX123-3", description: "SPG kvarstår." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX123-4", description: "SPG måste vara tom (inga kopplade CUs).", errorCode: "E_123_NOT_EMPTY" },
    { id: "BRSFLEX123-5", description: "SPG får inte ha aktiva bud på marknaden.", errorCode: "E_123_ACTIVE_BIDS" }
  ],
  process: [
    { id: "BRSFLEX123-6", description: "SP begär borttagning av SPG." },
    { id: "BRSFLEX123-7", description: "FIS kontrollerar villkor och utför borttagning." }
  ],
  infoObjects: [content123Input, content123Output]
};
