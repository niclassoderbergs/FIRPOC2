
import { BRSData } from '../../types';
import { content203Input, content203Output } from '../../content-definitions';

export const brsFlex203: BRSData = {
  id: "BRS-FLEX-202", // Updated from 203 (Update -> 202)
  previousId: "BRS-FLEX-203",
  title: "SP uppdaterar flexavtal",
  purpose: "Att ändra administrativa detaljer på kopplingen, t.ex. förlänga giltighetstid.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-202: SP uppdaterar flexavtal
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: UpdateFlexAgreement (Data)
    activate FIS
    FIS->>FIS: Uppdatera information
    FIS-->>SP: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX202-1", description: "En SP har uppdaterat ett flexibilitetsavtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX202-2", description: "FIS har uppdaterat flexibilitetsavtalets information." },
      { id: "BRSFLEX202-3", description: "SP har mottagit kvittens på uppdateringen." }
    ],
    rejected: [
      { id: "BRSFLEX202-4", description: "Inga ändringar har sparats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX202-5", description: "Angivet Flexibilitetsavtals-ID måste existera i FIS.", errorCode: "E_202_NOT_FOUND" },
    { id: "BRSFLEX202-6", description: "Endast administrativa detaljer (slutdatum) får ändras. CU-ID och SP-ID är låsta.", errorCode: "E_202_IMMUTABLE_FIELD" },
    { id: "BRSFLEX202-7", description: "Nytt slutdatum måste vara senare än startdatum.", errorCode: "E_202_INVALID_DATE" }
  ],
  process: [
    { id: "BRSFLEX202-8", description: "SP uppdaterar informationen för ett befintligt flexibilitetsavtal." },
    { id: "BRSFLEX202-9", description: "Flexibilitetsregistret bekräftar uppdateringen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX202-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content203Input, content203Output]
};
