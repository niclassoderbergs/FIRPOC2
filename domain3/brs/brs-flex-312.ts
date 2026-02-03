
import { BRSData } from '../../types';
import { content312Input, content312Output } from '../../content-definitions';

export const brsFlex312: BRSData = {
  id: "BRS-FLEX-319", // Updated from 312
  previousId: "BRS-FLEX-312",
  title: "TSO rapporterar testresultat",
  purpose: "Att registrera det slutgiltiga resultatet (Qualified/Rejected) baserat på det genomförda testet. Detta avslutar kvalificeringsprocessen.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-319: TSO rapporterar testresultat
    participant TSO as TSO
    participant FIS as FIS

    TSO->>FIS: ReportTestResult (Kval-ID, Slutresultat, GiltigTill)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Uppdatera status (Qualified/Rejected)
        FIS-->>TSO: Ack
    else Validering Fel
        FIS-->>TSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX319-1", description: "Aktiveringstest har genomförts (status 'Test Completed')." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX319-2", description: "FIS har uppdaterat kvalificeringsstatusen till slutgiltigt läge." }
    ],
    rejected: [
      { id: "BRSFLEX319-4", description: "Ingen ändring har genomförts." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX319-5", description: "Ansökan måste finnas i fasen 'Test Completed'.", errorCode: "E_319_INVALID_STATE" },
    { id: "BRSFLEX319-6", description: "Om Godkänt, måste ett slutdatum för kvalificeringen anges.", errorCode: "E_319_MISSING_EXPIRY" }
  ],
  process: [
    { id: "BRSFLEX319-8", description: "TSO registrerar slutresultatet av kvalificeringen." },
    { id: "BRSFLEX319-9", description: "FIS uppdaterar status för kvalificeringen." }
  ],
  infoObjects: [content312Input, content312Output]
};
