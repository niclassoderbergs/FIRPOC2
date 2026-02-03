
import { BRSData } from '../../types';
import { content603Output } from '../../content-definitions';

export const brsFlex603: BRSData = {
  id: "BRS-FLEX-609", // Updated from 603
  previousId: "BRS-FLEX-603",
  title: "Notifiering om registrerade CU-mätvärden",
  purpose: "Att distribuera inkomna mätvärden (sub-metering) till berörda parter (t.ex. TSO, DSO eller balansansvarig) för att möjliggöra verifiering och avräkning. Detta säkerställer att alla parter har tillgång till samma underlag.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO / BRP / Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-609: Notifiering om registrerade CU-mätvärden
    participant FIS as FIS
    participant TSO as TSO
    participant DSO as DSO
    participant BRP as BRP
    participant SUP as Elleverantör

    Note over FIS: Trigger: BRS-FLEX-601 (Inkomna mätvärden)
    activate FIS
    FIS->>FIS: Identifiera prenumeranter
    
    par Distribuera Data
        FIS->>TSO: NotifyMeterData (CU-ID, Tidsserie)
        FIS->>DSO: NotifyMeterData (CU-ID, Tidsserie)
        FIS->>BRP: NotifyMeterData (CU-ID, Tidsserie)
        FIS->>SUP: NotifyMeterData (CU-ID, Tidsserie)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX609-1", description: "En SP har registrerat mätvärden för en CU (via BRS-FLEX-601)." },
    { id: "BRSFLEX609-2", description: "En TSO har registrerat ett energibud (via BRS-FLEX-731) och det finns CU-mätvärden." },
    { id: "BRSFLEX609-3", description: "eller en DSO har registrerat ett energibud (via BRS-FLEX-741) och det finns CU-mätvärden." },
    { id: "BRSFLEX609-4", description: "eller en Nemo har registrerat DA/ID handel (via BRS-FLEX-751) och det finns CU-mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX609-5", description: "Systemoperatören (TSO) har mottagit CU-mätvärden." },
      { id: "BRSFLEX609-6", description: "Nätägaren (DSO) har mottagit CU-mätvärden." },
      { id: "BRSFLEX609-7", description: "BRP har mottagit CU-mätvärden." },
      { id: "BRSFLEX609-8", description: "Elleverantör har mottagit CU-mätvärden." }
    ],
    rejected: [
      { id: "BRSFLEX609-9", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX609-10", description: "Endast aktörer med en aktiv relation till mätpunkten/CU:n under perioden ska notifieras.", errorCode: "W_609_NO_VALID_RECIPIENT" },
    { id: "BRSFLEX609-11", description: "Mätvärden måste valideras som kompletta innan distribution.", errorCode: "E_609_DATA_INCOMPLETE" }
  ],
  process: [
    { id: "BRSFLEX609-12", description: "FIS distribuerar registrerade mätvärden." },
    { id: "BRSFLEX609-13", description: "Berörda aktörer (TSO, DSO, BRP, Elleverantör) tar emot informationen." }
  ],
  infoObjects: [content603Output]
};
