
import { BRSData } from '../../types';
import { content323Input, content323Output } from '../../content-definitions';

export const brsFlex323: BRSData = {
  id: "BRS-FLEX-332", // Updated from 323
  previousId: "BRS-FLEX-323",
  title: "DSO uppdaterar nätförkvalificering",
  purpose: "DSO svarar på förfrågan om nätförkvalificering med status 'Approved', 'Conditionally Approved' eller 'Rejected'.",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-332: Uppdatera resultat av Nätförkvalificering
    participant DSO as DSO
    participant FIS as FIS

    DSO->>FIS: GridQualificationResponse (SPU/CU-ID, Produkt, Status, Villkor)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Uppdatera status (Qualified/Conditional/Rejected)
        FIS-->>DSO: Ack
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX332-1", description: "En nätägare (DSO) har registrerat resultatet av en nätförkvalificering." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX332-2", description: "FIS har uppdaterat status för nätförkvalificeringen." },
      { id: "BRSFLEX332-3", description: "FIS har lagrat eventuella villkor för godkännandet." },
      { id: "BRSFLEX332-4", description: "DSO har mottagit kvittens på uppdateringen." }
    ],
    rejected: [
      { id: "BRSFLEX332-5", description: "Ingen ändring har genomförts." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX332-6", description: "Förfrågan måste finnas och vara öppen.", errorCode: "E_332_NO_REQUEST" },
    { id: "BRSFLEX332-7", description: "Om 'Conditionally Approved', måste villkoren (t.ex. max 50kW eller tidsbegränsning) lagras strukturerat i FIS.", errorCode: "E_332_MISSING_CONDITIONS" }
  ],
  process: [
    { id: "BRSFLEX332-8", description: "Nätägaren (DSO) registrerar resultatet av nätförkvalificeringen." },
    { id: "BRSFLEX332-9", description: "Flexibilitetsregistret bekräftar uppdateringen till Nätägaren." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX332-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content323Input, content323Output]
};
