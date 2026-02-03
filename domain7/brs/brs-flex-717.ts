
import { BRSData } from '../../types';
import { content717Output } from '../../content-definitions';

export const brsFlex717: BRSData = {
  id: "BRS-FLEX-738", // Updated from 717
  previousId: "BRS-FLEX-717",
  title: "TSO notifieras om energibudskontroll",
  purpose: "Att informera TSO om resultatet av valideringen för ett energibud (7310). Detta bekräftar om budet är tekniskt genomförbart.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-738: TSO notifieras om energibudskontroll
    participant FIS as FIS
    participant TSO as TSO

    Note over FIS: Trigger: BRS-FLEX-7310 (Resultat klart)
    activate FIS
    FIS->>FIS: Hämta kontrollresultat
    FIS->>TSO: NotifyEnergyBidResult (ID, Status, Kapacitet)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX738-1", description: "Systemet har kontrollerat ett energibud från TSO (via BRS-FLEX-7310)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX738-2", description: "TSO har mottagit notifiering om resultatet." }
    ],
    rejected: [
      { id: "BRSFLEX738-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX738-4", description: "FIS skickar notifiering till TSO." }
  ],
  infoObjects: [content717Output]
};
