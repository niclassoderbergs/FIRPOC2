
import { BRSData } from '../../types';
import { content110Input, content110Output } from '../../content-definitions';

export const brsFlex110: BRSData = {
  id: "BRS-FLEX-111", // Updated from 110
  previousId: "BRS-FLEX-110",
  title: "SP registrerar SPU",
  purpose: "Att skapa en ny SPU-identitet (Service Providing Unit) i systemet. Detta moment skapar endast behållaren med metadata. Koppling av resurser sker i separata processer.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-111: SP registrerar SPU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RegisterSPU (Namn, Nätområde-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa SPU-objekt (Status: Available)
        FIS-->>SP: RegisterSPUAcknowledgement (SPU-ID, Namn, Nätområde-ID)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX111-1", description: "En SP har registrerat en Service Providing Unit (SPU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX111-2", description: "FIS har registrerat en ny Service Providing Unit (SPU)." },
      { id: "BRSFLEX111-3", description: "SP har mottagit kvittens med SPU-ID." }
    ],
    rejected: [
      { id: "BRSFLEX111-4", description: "Inget SPU-objekt har skapats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX111-5", description: "Nätområde måste vara giltigt (t.ex. SE3).", errorCode: "E_111_INVALID_ZONE" },
    { id: "BRSFLEX111-6", description: "Namnet på SPU måste vara unikt inom SP:s portfölj.", errorCode: "E_111_DUPLICATE_NAME" }
  ],
  process: [
    { id: "BRSFLEX111-7", description: "SP registrerar en ny Service Providing Unit (SPU)." },
    { id: "BRSFLEX111-8", description: "FIS skickar en kvittens till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX111-9", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content110Input, content110Output]
};
