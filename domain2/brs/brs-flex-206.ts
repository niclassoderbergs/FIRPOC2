
import { BRSData } from '../../types';
import { content206Input, content206Output } from '../../content-definitions';

export const brsFlex206: BRSData = {
  id: "BRS-FLEX-204", // Updated from 206 (Read -> 204)
  previousId: "BRS-FLEX-206",
  title: "SP begär flexavtalsinformation",
  purpose: "Möjliggör för SP att hämta detaljerad information om sina registrerade Flexavtal. Detta används för avstämning av portfölj och giltighetstider.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-204: SP begär flexavtalsinformation
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: GetFlexAgreementView (Flexibilitetsavtals-ID eller Filter)
    activate FIS
    FIS->>FIS: Validera regler och behörighet
    FIS->>FIS: Hämta Avtalsdata
    
    alt Data hittad och behörig
        FIS-->>SP: ShowFlexAgreementView (Data)
    else Ej behörig eller hittas ej
        FIS-->>SP: Error (Not Found / Unauthorized)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX204-1", description: "En SP har begärt information om flexibilitetsavtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX204-2", description: "FIS har skickat begärd avtalsinformation till SP." }
    ],
    rejected: [
      { id: "BRSFLEX204-3", description: "Ingen data returnerad p.g.a. behörighetsfel, valideringsfel eller felaktigt ID." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX204-4", description: "Angivet Flexibilitetsavtals-ID måste existera i systemet.", errorCode: "E_204_AGREEMENT_NOT_FOUND" },
    { id: "BRSFLEX204-5", description: "SP måste vara registrerad på angivet Flexibilitetsavtals-ID.", errorCode: "E_204_UNAUTHORIZED" },
    { id: "BRSFLEX204-6", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_204_CU_NOT_FOUND" },
    { id: "BRSFLEX204-7", description: "Angivet Flexibilitetsavtals-ID måste vara kopplat till angivet CU-ID.", errorCode: "E_204_MISMATCH_AGREEMENT_CU" }
  ],
  process: [
    { id: "BRSFLEX204-8", description: "SP begär information om sina flexibilitetsavtal." },
    { id: "BRSFLEX204-9", description: "Flexibilitetsregistret skickar begärd information till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX204-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content206Input, content206Output]
};
