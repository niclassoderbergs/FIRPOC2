
import { BRSData } from '../../types';
import { content321Input, content321Internal, content321Output } from '../../content-definitions';

export const brsFlex321: BRSData = {
  id: "BRS-FLEX-331", // Updated from 321
  previousId: "BRS-FLEX-321",
  title: "SP begär nätförkvalificering",
  purpose: "Att be Nätägaren (DSO) kontrollera om aktivering av dessa resurser skapar lokala nätproblem (Grid Pre-qualification), enligt DR NC Artikel 49.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-331: SP begär nätförkvalificering
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RequestGridQualification (CU-ID / SPU-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Identifiera berörda nätområden
        FIS->>FIS: Sätt status 'Pending Grid Check'
        FIS-->>SP: Ack
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX331-1", description: "En SP har begärt nätförkvalificering för en resurs." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX331-2", description: "FIS har satt status till 'Pending Grid Check'." },
      { id: "BRSFLEX331-3", description: "SP har mottagit bekräftelse på begäran." }
    ],
    rejected: [
      { id: "BRSFLEX331-4", description: "Fel vid routing, förfrågan ej skickad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX331-5", description: "Angivet SPU-ID eller CU-ID måste existera i FIS.", errorCode: "E_331_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX331-6", description: "Resurserna måste vara kopplade till mätpunkter för att nätområde ska kunna identifieras.", errorCode: "E_331_MISSING_MP" },
    { id: "BRSFLEX331-7", description: "Mätpunkts-ID måste kunna matchas mot en registrerad Nätägare (DSO) för routing.", errorCode: "E_331_ROUTING_FAILED" }
  ],
  process: [
    { id: "BRSFLEX331-8", description: "SP begär nätförkvalificering för en resurs." },
    { id: "BRSFLEX331-9", description: "Flexibilitetsregistret bekräftar begäran till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX331-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content321Input, content321Internal, content321Output]
};
