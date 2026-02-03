
import { BRSData } from '../../types';
import { content613Output } from '../../content-definitions';

export const brsFlex613: BRSData = {
  id: "BRS-FLEX-619", // Updated from 613
  previousId: "BRS-FLEX-613",
  title: "Notifiering om beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "Att proaktivt distribuera leveransresultatet (aktiverad volym) till berörda parter så snart den har registrerats. Detta möjliggör snabb uppföljning och verifiering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO / BRP / Elleverantör / SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-619: Notifiering om leveransvolym
    participant FIS as FIS
    participant TSO as TSO
    participant DSO as DSO
    participant BRP as BRP
    participant SUP as Elleverantör
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-611 eller 6110
    activate FIS
    FIS->>FIS: Hämta leveransdata
    
    par Distribuera Volym
        FIS->>TSO: NotifyActivationVolume (Aktiverings-ID, Tidsserie)
        FIS->>DSO: NotifyActivationVolume (Aktiverings-ID, Tidsserie)
        FIS->>BRP: NotifyActivationVolume (Aktiverings-ID, Tidsserie)
        FIS->>SUP: NotifyActivationVolume (Aktiverings-ID, Tidsserie)
        FIS->>SP: NotifyActivationVolume (Aktiverings-ID, Tidsserie)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX619-1", description: "Beräknad leveransvolym har registrerats av SP (via BRS-FLEX-611)." },
    { id: "BRSFLEX619-2", description: "Beräknad leveransvolym har registrerats av FIS (via BRS-FLEX-6110)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX619-3", description: "Systemoperatören (TSO) har mottagit flexibilitetsvolym." },
      { id: "BRSFLEX619-4", description: "Nätägaren (DSO) har mottagit flexibilitetsvolym." },
      { id: "BRSFLEX619-5", description: "SP har mottagit flexibilitetsvolym." },
      { id: "BRSFLEX619-6", description: "BRP har mottagit flexibilitetsvolym." },
      { id: "BRSFLEX619-7", description: "Elleverantör har mottagit flexibilitetsvolym." }
    ],
    rejected: [
      { id: "BRSFLEX619-8", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX619-9", description: "FIS distribuerar beräknad leveransvolym." },
    { id: "BRSFLEX619-10", description: "Berörda aktörer (TSO, DSO, BRP, Elleverantör, SP) tar emot informationen." }
  ],
  infoObjects: [content613Output]
};
