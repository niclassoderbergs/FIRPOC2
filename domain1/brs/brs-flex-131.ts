
import { BRSData } from '../../types';
import { content131Input, content131Output } from '../../content-definitions';

export const brsFlex131: BRSData = {
  id: "BRS-FLEX-133", // Updated from 131
  previousId: "BRS-FLEX-131",
  title: "SP tar bort CU från SPU",
  purpose: "Att ta bort en CU från en SPU. Detta bryter kopplingen mellan resursen och aggregeringsenheten.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-133: SP tar bort CU från SPU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: UnlinkCUfromSPU (SPU-ID, CU-ID, Slutdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Ta bort relation
        FIS->>FIS: Räkna om kapacitet
        FIS-->>SP: UnlinkAcknowledgement (Startdatum, Slutdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX133-1", description: "En SP har tagit bort en styrbar enhet från en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX133-2", description: "FIS har avslutat kopplingen mellan den styrbara enheten och SPU:n." },
      { id: "BRSFLEX133-3", description: "FIS har räknat om SPU:ns aggregerade kapacitet." }
    ],
    rejected: [
      { id: "BRSFLEX133-4", description: "Relationen kvarstår." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX133-5", description: "Relationen mellan CU och SPU måste existera.", errorCode: "E_133_NO_RELATION" },
    { id: "BRSFLEX133-6", description: "SPU får inte vara låst i ett aktivt bud för stunden.", errorCode: "E_133_RESOURCE_LOCKED" },
    { id: "BRSFLEX133-7", description: "Slutdatum måste anges och vara giltigt.", errorCode: "E_133_INVALID_DATE" }
  ],
  process: [
    { id: "BRSFLEX133-8", description: "SP begär bortkoppling av en CU från en SPU." },
    { id: "BRSFLEX133-9", description: "FIS bekräftar bortkopplingen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX133-10", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content131Input, content131Output]
};
