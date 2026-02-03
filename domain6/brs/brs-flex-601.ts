
import { BRSData } from '../../types';
import { content601Input, content601Output } from '../../content-definitions';

export const brsFlex601: BRSData = {
  id: "BRS-FLEX-601",
  title: "SP registrerar CU-mätvärden",
  purpose: "SP rapporterar uppmätt data från enheten (Sub-metering) för verifiering. Detta krävs när huvudmätaren (från DHV) inte ger tillräcklig upplösning eller avser en större anläggning än själva flexibilitetsresursen.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-601: SP registrerar CU-mätvärden
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: SubmitMeterData (CU, Värden)
    activate FIS
    FIS->>FIS: Validera CU och Flexavtal
    FIS->>FIS: Validera upplösning och period
    
    alt Validering OK
        FIS->>FIS: Lagra mätvärden
        FIS-->>SP: Ack
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX601-1", description: "En SP har registrerat mätvärden för en styrbar enhet (CU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX601-2", description: "FIS har lagrat mottagna CU-mätvärden." },
      { id: "BRSFLEX601-3", description: "SP har mottagit kvittens på lagringen." }
    ],
    rejected: [
      { id: "BRSFLEX601-4", description: "Data avvisad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX601-5", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_601_CU_NOT_FOUND" },
    { id: "BRSFLEX601-6", description: "SP måste ha ett aktivt flexavtal för resursen som täcker den tidsperiod mätvärdena avser.", errorCode: "E_601_NO_AGREEMENT" },
    { id: "BRSFLEX601-7", description: "Tidsserier måste matcha upplösningen i produkten (t.ex. 15 min eller 1 timme).", errorCode: "E_601_INVALID_RESOLUTION" },
    { id: "BRSFLEX601-8", description: "Mätvärden får inte överstiga registrerad maximal kapacitet (varningsflagga).", errorCode: "W_601_CAPACITY_EXCEEDED" }
  ],
  process: [
    { id: "BRSFLEX601-9", description: "SP registrerar mätvärden för en styrbar enhet (CU)." },
    { id: "BRSFLEX601-10", description: "FIS bekräftar registreringen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX601-11", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content601Input, content601Output]
};
