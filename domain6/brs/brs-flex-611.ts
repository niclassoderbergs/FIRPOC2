
import { BRSData } from '../../types';
import { content611Input, content611Output } from '../../content-definitions';

export const brsFlex611: BRSData = {
  id: "BRS-FLEX-611",
  title: "SP registrerar beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "SP skickar in specifik mätdata kopplad till en genomförd aktivering. Syftet är att tillhandahålla underlag för verifiering av att den sålda flexibiliteten faktiskt levererades. Detta skiljer sig från löpande mätvärdesinsamling (601) då denna data är hårt knuten till ett affärshändelse-ID.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-611: Registrera leveransdata
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: SubmitDeliveryData (Aktiverings-ID, CU-ID, Tidsserie)
    activate FIS
    FIS->>FIS: Validera Aktiverings-ID
    FIS->>FIS: Validera Täckning (Period)
    
    alt Validering OK
        FIS->>FIS: Lagra Leveransbevis
        FIS-->>SP: Ack (Transaktions-ID)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX611-1", description: "En SP har registrerat leveransdata för en aktivering." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX611-2", description: "FIS har lagrat leveransdata kopplad till aktiveringen." },
      { id: "BRSFLEX611-3", description: "SP har mottagit kvittens på lagringen." }
    ],
    rejected: [
      { id: "BRSFLEX611-4", description: "Data avvisad (t.ex. felaktigt format eller saknad referens)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX611-5", description: "Datan måste täcka hela aktiveringsperioden.", errorCode: "E_611_INCOMPLETE_PERIOD" },
    { id: "BRSFLEX611-6", description: "Upplösningen på tidsserien måste matcha produktens krav för verifiering.", errorCode: "E_611_INVALID_RESOLUTION" },
    { id: "BRSFLEX611-7", description: "Aktiverings-ID måste vara giltigt och tillhöra SP.", errorCode: "E_611_INVALID_ACTIVATION_ID" },
    { id: "BRSFLEX611-8", description: "Det refererade budet måste vara accepterat av köparen (t.ex. TSO för balansmarknaden).", errorCode: "E_611_BID_NOT_ACCEPTED" }
  ],
  process: [
    { id: "BRSFLEX611-9", description: "SP registrerar beräknad leveransvolym för en aktivering." },
    { id: "BRSFLEX611-10", description: "FIS bekräftar registreringen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX611-11", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content611Input, content611Output]
};
