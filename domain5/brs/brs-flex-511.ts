
import { BRSData } from '../../types';
import { content511Input, content511Output } from '../../content-definitions';

export const brsFlex511: BRSData = {
  id: "BRS-FLEX-511",
  title: "SP registrerar vald baselinemetod för CU",
  purpose: "SP konfigurerar vilken beräkningsmetod som ska användas för en specifik CU vid verifiering av leverans. Detta styr hur den kontrafaktiska kurvan ska beräknas eller valideras, samt vilken mätdata (Huvudmätare eller Undermätare) som ligger till grund.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-511: SP registrerar vald baselinemetod för CU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: SetBaselineConfig (CU-ID, Metod-ID, Källa, Parametrar)
    activate FIS
    FIS->>FIS: Validera affärsregler
    FIS->>FIS: Spara konfiguration för CU
    FIS-->>SP: Ack (Config-ID)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX511-1", description: "En SP har registrerat vald baselinemetod för en styrbar enhet (CU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX511-2", description: "FIS har registrerat vald baselinemetod för den styrbara enheten." },
      { id: "BRSFLEX511-3", description: "SP har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX511-4", description: "Konfiguration ej sparad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX511-5", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_511_CU_NOT_FOUND" },
    { id: "BRSFLEX511-6", description: "Angivet Metod-ID måste existera i FIS.", errorCode: "E_511_METHOD_NOT_FOUND" },
    { id: "BRSFLEX511-8", description: "Vald metod måste vara giltig för resurstypen (om begränsningar finns).", errorCode: "E_511_INVALID_METHOD_FOR_TYPE" },
    { id: "BRSFLEX511-12", description: "CU-ID måste vara korrekt kopplat till ett Mätpunkts-ID i FIS.", errorCode: "E_511_MP_LINK_MISSING" },
    { id: "BRSFLEX511-13", description: "Om Mätkälla är 'CU' (Undermätning) måste resursen vara godkänd för detta (Sub-metering allowed).", errorCode: "E_511_SUBMETERING_NOT_ALLOWED" }
  ],
  process: [
    { id: "BRSFLEX511-9", description: "SP registrerar vilken baselinemetod och mätkälla som ska användas för en specifik styrbar enhet (CU)." },
    { id: "BRSFLEX511-10", description: "FIS bekräftar registreringen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX511-11", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content511Input, content511Output]
};
