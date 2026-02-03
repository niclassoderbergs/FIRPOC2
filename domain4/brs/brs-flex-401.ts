
import { BRSData } from '../../types';
import { content401Input, content401Output } from '../../content-definitions';

export const brsFlex401: BRSData = {
  id: "BRS-FLEX-404", // Updated from 401
  previousId: "BRS-FLEX-401",
  title: "DSO begär flexibilitetsresurser i nätområde",
  purpose: "För att kunna sätta begränsningar måste Nätägaren (DSO) veta vilka mätpunkter i deras nät som har aktiva flexibilitetsresurser.",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-404: DSO begär flexibilitetsresurser i nätområde
    participant DSO as DSO
    participant FIS as FIS

    DSO->>FIS: GetGridAreaResources (Nätområdes-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Sök Aktiva Resurser (Mätpunkter)
        FIS-->>DSO: ShowResources (Nätområdes-ID, Lista [Mätpunkts-ID])
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX404-1", description: "En nätägare (DSO) har begärt en sammanställning av aktiva resurser i ett nätområde." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX404-2", description: "FIS har returnerat en lista på mätpunkter med aktiva resurser." }
    ],
    rejected: [
      { id: "BRSFLEX404-3", description: "Åtkomst nekad eller ogiltigt ID, ingen data returnerad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX404-4", description: "Angivet Nätområdes-ID måste existera i systemet.", errorCode: "E_404_GRID_AREA_NOT_FOUND" },
    { id: "BRSFLEX404-5", description: "Anropande DSO måste vara registrerad ägare av det angivna nätområdet.", errorCode: "E_404_UNAUTHORIZED_GRID_OWNER" }
  ],
  process: [
    { id: "BRSFLEX404-6", description: "Nätägaren (DSO) begär en lista över aktiva flexibilitetsresurser i ett nätområde." },
    { id: "BRSFLEX404-7", description: "Flexibilitetsregistret skickar listan på mätpunkter till nätägaren." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX404-8", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content401Input, content401Output]
};
