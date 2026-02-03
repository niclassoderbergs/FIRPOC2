
import { BRSData } from '../../types';
import { content503Input, content503Output } from '../../content-definitions';

export const brsFlex503: BRSData = {
  id: "BRS-FLEX-505", // Updated from 503
  previousId: "BRS-FLEX-503",
  title: "Begär detaljerad baselinemetod information",
  purpose: "Hämtar den tekniska specifikationen för en metod, inklusive vilka parametrar som krävs vid konfiguration.",
  actors: [
    { role: "Initiator", description: "SP / TSO / DSO" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-505: Hämta Metoddetaljer
    participant Requester as SP/TSO/DSO
    participant FIS as FIS

    Requester->>FIS: GetBaselineMethodDetails (Metod-ID)
    activate FIS
    FIS->>FIS: Hämta definition
    FIS-->>Requester: MethodDetails (Namn, Parametrar, Beskrivning)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX505-1", description: "En SP har begärt detaljerad information om en baselinemetod." },
    { id: "BRSFLEX505-2", description: "En TSO har begärt detaljerad information om en baselinemetod." },
    { id: "BRSFLEX505-3", description: "En DSO har begärt detaljerad information om en baselinemetod." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX505-4", description: "FIS har returnerat detaljerad metodinformation." }
    ],
    rejected: [
      { id: "BRSFLEX505-5", description: "Metod hittades ej." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX505-6", description: "Metod-ID måste existera.", errorCode: "E_505_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX505-7", description: "Aktör begär detaljerad information om en specifik baselinemetod." },
    { id: "BRSFLEX505-8", description: "Flexibilitetsregistret skickar metodinformationen till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX505-9", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content503Input, content503Output]
};
