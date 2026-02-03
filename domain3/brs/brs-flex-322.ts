
import { BRSData } from '../../types';
import { content322Output } from '../../content-definitions';

export const brsFlex322: BRSData = {
  id: "BRS-FLEX-339", // Updated from 322
  previousId: "BRS-FLEX-322",
  title: "DSO notifieras om nätförkvalificering",
  purpose: "Att informera Nätägaren (DSO) om att en SP har begärt nätförkvalificering för en eller flera resurser i nätområdet. Notifieringen innehåller detaljerad information om ingående enheter (CU) och deras indikativa bidrag för att DSO ska kunna utföra nätanalys.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Nätägare (DSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-339: Notifiering till DSO (Begäran om nätförkvalificering)
    participant FIS as FIS
    participant DSO as DSO

    Note over FIS: Trigger: BRS-FLEX-331
    activate FIS
    FIS->>FIS: Identifiera DSO baserat på Mätpunkter
    FIS->>FIS: Sammanställ teknisk data (CU, Max effekt, Bidrag)
    FIS->>DSO: NotifyGridQualificationRequest (Data)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX339-1", description: "En SP har begärt nätförkvalificering för en resurs (via BRS-FLEX-331)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX339-2", description: "DSO har mottagit notifiering och underlag för nätanalys." }
    ],
    rejected: [
      { id: "BRSFLEX339-3", description: "Notifiering misslyckades (loggas)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX339-4", description: "Flexibilitetsregistret skickar begäran om nätanalys (inklusive teknisk data) till berörd Nätägare (DSO)." },
    { id: "BRSFLEX339-5", description: "Nätägaren (DSO) tar emot underlaget." }
  ],
  infoObjects: [content322Output]
};
