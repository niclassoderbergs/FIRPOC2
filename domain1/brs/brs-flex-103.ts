
import { BRSData } from '../../types';
import { content103Input, content103Output } from '../../content-definitions';

export const brsFlex103: BRSData = {
  id: "BRS-FLEX-104", // Updated from 103
  previousId: "BRS-FLEX-103",
  title: "Begär CU-information",
  purpose: "Möjliggör för behöriga aktörer att hämta aktuell masterdata för en specifik enhet. Strikt behörighetsstyrd för att skydda affärskritisk information.",
  actors: [
    { role: "Initiator", description: "SP eller Systemoperatör (SO)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-104: Begär CU-information
    participant Requester as SP eller SO
    participant FIS as FIS

    Requester->>FIS: GetControllableUnitView (Filter eller ID)
    activate FIS
    FIS->>FIS: Validera behörighet och regler
    
    alt Behörig
        FIS->>FIS: Hämta Data från DB
        FIS->>FIS: Filtrera baserat på Roll
        FIS-->>Requester: ShowControllableUnitView (Data)
    else Ej Behörig eller Fel
        FIS-->>Requester: Nekad Åtkomst (Error)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX104-1", description: "En SP har begärt information om en styrbar enhet." },
    { id: "BRSFLEX104-2", description: "Systemet har begärt information om en styrbar enhet." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX104-3", description: "FIS har skickat begärd information om den styrbara enheten till aktören." }
    ],
    rejected: [
      { id: "BRSFLEX104-4", description: "Meddelande om nekad åtkomst eller 'ej hittad' har skickats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX104-5", description: "Om ett specifikt CU-ID anges måste det existera i FIS.", errorCode: "E_104_NOT_FOUND" },
    { id: "BRSFLEX104-6", description: "Om en SP begär information behöver denne vara ägaren till CU vid begäran.", errorCode: "E_104_UNAUTHORIZED_RESOURCE" },
    { id: "BRSFLEX104-7", description: "En SO (DSO/TSO) får endast se CU:s kopplade till mätpunkter inom deras eget nätområde.", errorCode: "E_104_OUT_OF_GRID_AREA" }
  ],
  process: [
    { id: "BRSFLEX104-8", description: "Aktör begär information om en styrbar enhet (CU)." },
    { id: "BRSFLEX104-9", description: "FIS skickar begärd information till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX104-10", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content103Input, content103Output]
};
