
import { BRSData } from '../../types';
import { content202Input, content202Output } from '../../content-definitions';

export const brsFlex202: BRSData = {
  id: "BRS-FLEX-203", // Updated from 202 (Terminate -> 203)
  previousId: "BRS-FLEX-202",
  title: "SP avslutar flexavtal",
  purpose: "SP avslutar sin tjänst för en CU (t.ex. vid avtalsslut med kund).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-203: SP avslutar flexavtal
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: TerminateFlexAgreement (Flexavtals-ID, CU-ID, Slutdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler och behörighet
    
    alt Validering OK
        FIS->>FIS: Sätt slutdatum
        FIS-->>SP: Acknowledgement (CU-ID, Urspr. Startdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX203-1", description: "En SP har avslutat ett flexibilitetsavtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX203-2", description: "FIS har registrerat slutdatum för flexibilitetsavtalet." },
      { id: "BRSFLEX203-3", description: "SP har mottagit kvittens på avslutet." }
    ],
    rejected: [
      { id: "BRSFLEX203-4", description: "Ingen ändring har genomförts." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX203-5", description: "Angivet Flexibilitetsavtals-ID måste existera i FIS.", errorCode: "E_203_AGREEMENT_NOT_FOUND" },
    { id: "BRSFLEX203-6", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_203_CU_NOT_FOUND" },
    { id: "BRSFLEX203-7", description: "Angivet Flexibilitetsavtals-ID måste vara kopplat till angivet CU-ID.", errorCode: "E_203_MISMATCH_AGREEMENT_CU" },
    { id: "BRSFLEX203-8", description: "Avtalet måste vara aktivt.", errorCode: "E_203_ALREADY_INACTIVE" },
    { id: "BRSFLEX203-9", description: "Slutdatum måste anges.", errorCode: "E_203_MISSING_DATE" },
    { id: "BRSFLEX203-10", description: "SP måste vara registrerad på angivet Flexibilitetsavtals-ID.", errorCode: "E_203_UNAUTHORIZED" }
  ],
  process: [
    { id: "BRSFLEX203-11", description: "SP begär avslut av ett flexibilitetsavtal." },
    { id: "BRSFLEX203-12", description: "Flexibilitetsregistret bekräftar avslutet till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX203-13", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content202Input, content202Output]
};
