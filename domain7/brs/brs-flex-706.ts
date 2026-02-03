
import { BRSData } from '../../types';
import { content706Output } from '../../content-definitions';

export const brsFlex706: BRSData = {
  id: "BRS-FLEX-719", // Updated from 706
  previousId: "BRS-FLEX-706",
  title: "DSO notifieras om budets kapacitet",
  purpose: "Att informera DSO om resultatet av kapacitetskontrollen (BRS-FLEX-7010) för ett inkommet lokalflexbud. Detta svar avgör om budet kan accepteras tekniskt på den lokala flexmarknaden.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Nätägare (DSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-719: DSO notifieras om budets kapacitet
    participant FIS as FIS
    participant DSO as DSO

    Note over FIS: Trigger: BRS-FLEX-7010 (Kapacitetskontroll DSO-bud)
    activate FIS
    FIS->>FIS: Hämta kontrollresultat
    FIS->>DSO: NotifyBidCapacityResult (Bud-ID, Status, Kapacitet)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX719-1", description: "Systemet har fastställt kapaciteten för ett DSO-bud (via BRS-FLEX-7010)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX719-2", description: "Nätägaren (DSO) har mottagit notifiering om budets kapacitet." }
    ],
    rejected: [
      { id: "BRSFLEX719-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX719-4", description: "FIS skickar notifiering med resultatet av kapacitetskontrollen." },
    { id: "BRSFLEX719-5", description: "DSO tar emot informationen." }
  ],
  infoObjects: [content706Output]
};
