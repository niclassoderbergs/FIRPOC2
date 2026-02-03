
import { BRSData } from '../../types';
import { content402Input, content402Output } from '../../content-definitions';

export const brsFlex402: BRSData = {
  id: "BRS-FLEX-401", // Updated from 402
  previousId: "BRS-FLEX-402",
  title: "DSO registrerar nätbegränsning",
  purpose: "Att registrera en tillfällig begränsning (tak eller golv för effekt) på en eller flera mätpunkter/CU:s för att undvika överlast i nätet (Temporary Limit).",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-401: DSO registrerar nätbegränsning
    participant DSO as DSO
    participant FIS as FIS

    DSO->>FIS: RegisterConstraint (Lista IDn, Period, Limit)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Spara Begränsning
        FIS-->>DSO: Ack
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX401-1", description: "En nätägare (DSO) har registrerat en nätbegränsning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX401-2", description: "FIS har registrerat nätbegränsningen." },
      { id: "BRSFLEX401-3", description: "Nätägaren (DSO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX401-4", description: "Ingen begränsning sparad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX401-5", description: "Resurserna måste finnas och vara aktiva.", errorCode: "E_401_NOT_FOUND" },
    { id: "BRSFLEX401-6", description: "Mätpunkterna måste tillhöra Nätägarens område (valideras mot ägarskap i Master Data).", errorCode: "E_401_WRONG_GRID_AREA" },
    { id: "BRSFLEX401-7", description: "Begränsningen måste innehålla tidsperiod (Start/Slut) samt effektvärde och riktning.", errorCode: "E_401_INVALID_DATA" }
  ],
  process: [
    { id: "BRSFLEX401-8", description: "Nätägaren (DSO) registrerar en nätbegränsning för en eller flera resurser." },
    { id: "BRSFLEX401-9", description: "Flexibilitetsregistret bekräftar registreringen till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX401-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content402Input, content402Output]
};
