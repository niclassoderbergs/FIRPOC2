
import { BRSData } from '../../types';
import { content311Input, content311Output } from '../../content-definitions';

export const brsFlex311: BRSData = {
  id: "BRS-FLEX-311",
  title: "SP registrerar produktansökan",
  purpose: "Process för att ansöka om att en SPU/SPG ska få leverera en viss produkt (t.ex. FCR-N, mFRR). Detta initierar kvalificeringsprocessen.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-311: SP registrerar produktansökan
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RequestProductQualification (SPU-ID, Produkt, [CU-Data])
    activate FIS
    FIS->>FIS: Validera att ansökan är komplett
    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        FIS->>FIS: Sätt status: 'Application Received'
        FIS-->>SP: Ack (Kvalificerings-ID)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX311-1", description: "En SP har ansökt om produktförkvalificering." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX311-2", description: "FIS har satt kvalificeringsstatus till 'Application Received'." },
      { id: "BRSFLEX311-4", description: "SP har mottagit kvittens på ansökan." }
    ],
    rejected: [
      { id: "BRSFLEX311-5", description: "Ansökan har avvisats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX311-6", description: "Angivet SPU-ID eller SPG-ID måste existera i FIS.", errorCode: "E_311_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX311-7", description: "SPU/SPG måste vara registrerad och aktiv.", errorCode: "E_311_RESOURCE_NOT_ACTIVE" },
    { id: "BRSFLEX311-8", description: "Resursen får inte redan ha en pågående ansökan för samma produkt.", errorCode: "E_311_DUPLICATE_APPLICATION" },
    { id: "BRSFLEX311-9", description: "Alla CU-IDn som inkluderas i den strukturella datan måste vara kopplade till SPU/SPG.", errorCode: "E_311_CU_NOT_LINKED" },
    { id: "BRSFLEX311-10", description: "Summan av indikativa bidrag per CU får inte avvika orimligt mycket från SPU/SPG totala budbara effekt.", errorCode: "E_311_CAPACITY_MISMATCH" },
    { id: "BRSFLEX311-11", description: "Ansökan måste vara komplett (alla obligatoriska fält ifyllda).", errorCode: "E_311_INCOMPLETE_APPLICATION" }
  ],
  process: [
    { id: "BRSFLEX311-11", description: "SP ansöker om produktförkvalificering för en resurs." },
    { id: "BRSFLEX311-12", description: "Flexibilitetsregistret validerar att ansökan är komplett och bekräftar mottagandet (status Application Received)." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX311-13", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content311Input, content311Output]
};
