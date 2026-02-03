
import { BRSData } from '../../types';
import { content612Input, content612Output } from '../../content-definitions';

export const brsFlex612: BRSData = {
  id: "BRS-FLEX-614", // Updated from 612
  previousId: "BRS-FLEX-612",
  title: "Begär beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "Möjliggör för behöriga aktörer (SP, TSO, DSO, BRP, Elleverantör) att hämta den registrerade leveransvolymen för en specifik aktivering. Detta används vid verifiering och ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "SP / TSO / DSO / BRP / Elleverantör" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-614: Begär Leveransvolym
    participant Req as Berättigad Aktör
    participant FIS as FIS

    Req->>FIS: GetActivationVolume (Aktiverings-ID)
    activate FIS
    FIS->>FIS: Validera behörighet
    
    alt Behörig och Data finns
        FIS->>FIS: Hämta volymdata
        FIS-->>Req: ActivationVolumeResponse (Tidsserie)
    else Ej Behörig eller Saknas
        FIS-->>Req: Error (Not Found / Unauthorized)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX614-1", description: "En SP har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX614-2", description: "En TSO har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX614-3", description: "En DSO har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX614-4", description: "En BRP har begärt leveransvolym för en aktivering." },
    { id: "BRSFLEX614-5", description: "En elleverantör har begärt leveransvolym för en aktivering." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX614-6", description: "FIS har returnerat efterfrågad flexibilitetsvolym till SP." },
      { id: "BRSFLEX614-7", description: "FIS har returnerat efterfrågad flexibilitetsvolym till TSO." },
      { id: "BRSFLEX614-8", description: "FIS har returnerat efterfrågad flexibilitetsvolym till DSO." },
      { id: "BRSFLEX614-9", description: "FIS har returnerat efterfrågad flexibilitetsvolym till BRP." },
      { id: "BRSFLEX614-10", description: "FIS har returnerat efterfrågad flexibilitetsvolym till elleverantör." }
    ],
    rejected: [
      { id: "BRSFLEX614-11", description: "Ingen data eller nekad åtkomst." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX614-12", description: "Aktiverings-ID måste existera.", errorCode: "E_614_NOT_FOUND" },
    { id: "BRSFLEX614-13", description: "Anropande part måste ha behörighet (SP, TSO, DSO, BRP, Elleverantör) till resursen eller aktiveringen.", errorCode: "E_614_UNAUTHORIZED" }
  ],
  process: [
    { id: "BRSFLEX614-14", description: "Berättigad aktör begär beräknad leveransvolym för en aktivering." },
    { id: "BRSFLEX614-15", description: "FIS skickar volymdata till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX614-16", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content612Input, content612Output]
};
