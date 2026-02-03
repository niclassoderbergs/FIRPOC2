
import { BRSData } from '../../types';
import { content113Input, content113Output } from '../../content-definitions';

export const brsFlex113: BRSData = {
  id: "BRS-FLEX-113",
  title: "SP avregistrerar SPU",
  purpose: "Att ta bort en teknisk aggregeringsenhet (SPU) som inte längre används. Detta är endast tillåtet om SPU:n är tom (inga kopplade resurser).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-113: SP avregistrerar SPU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: DeregisterSPU (SPU-ID)
    activate FIS
    FIS->>FIS: Kontrollera innehåll (Måste vara tom)
    
    alt SPU är tom
        FIS->>FIS: Sätt status 'Terminated' / Ta bort
        FIS-->>SP: Ack (Terminated)
    else SPU har kopplade CUs
        FIS-->>SP: Error (Not Empty)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX113-1", description: "En SP har begärt avregistrering av en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX113-2", description: "FIS har avregistrerat SPU-objektet." }
    ],
    rejected: [
      { id: "BRSFLEX113-3", description: "SPU kvarstår (t.ex. för att den inte var tom)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX113-4", description: "SPU måste vara tom (inga kopplade CUs).", errorCode: "E_113_NOT_EMPTY" },
    { id: "BRSFLEX113-5", description: "SPU får inte vara del av en pågående kvalificering.", errorCode: "E_113_LOCKED_BY_QUALIFICATION" }
  ],
  process: [
    { id: "BRSFLEX113-6", description: "SP begär borttagning av SPU." },
    { id: "BRSFLEX113-7", description: "FIS kontrollerar villkor och utför borttagning." }
  ],
  infoObjects: [content113Input, content113Output]
};
