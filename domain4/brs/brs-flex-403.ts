
import { BRSData } from '../../types';
import { content403Output } from '../../content-definitions';

export const brsFlex403: BRSData = {
  id: "BRS-FLEX-409", // Updated from 403
  previousId: "BRS-FLEX-403",
  title: "SP notifieras om nätbegränsning",
  purpose: "Att delge SP information om nätbegränsningar så att de kan undvika att buda in otillgänglig kapacitet på marknaden.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-409: Notifiering om nätbegränsning
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-401
    activate FIS
    FIS->>FIS: Identifiera påverkade CU
    FIS->>FIS: Sammanställ begränsningsdata
    FIS->>SP: NotifyGridConstraint (CU-ID, MP-ID, Period, Limit)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX409-1", description: "DSO har registrerat en nätbegränsning (via BRS-FLEX-401)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX409-2", description: "SP har mottagit information om nätbegränsningen." }
    ],
    rejected: [
      { id: "BRSFLEX409-3", description: "Notifiering kunde inte levereras." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX409-4", description: "Flexibilitetsregistret skickar notifiering om en registrerad nätbegränsning." },
    { id: "BRSFLEX409-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content403Output]
};
