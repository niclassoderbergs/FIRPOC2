
import { BRSData } from '../../types';
import { content718Output } from '../../content-definitions';

export const brsFlex718: BRSData = {
  id: "BRS-FLEX-748", // Updated from 718
  previousId: "BRS-FLEX-718",
  title: "DSO notifieras om energibudskontroll",
  purpose: "Att informera DSO om resultatet av valideringen för ett lokalt energibud (7310).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "DSO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-748: DSO notifieras om energibudskontroll
    participant FIS as FIS
    participant DSO as DSO

    Note over FIS: Trigger: BRS-FLEX-7310 (Resultat klart)
    activate FIS
    FIS->>FIS: Hämta kontrollresultat
    FIS->>DSO: NotifyEnergyBidResult (ID, Status, Kapacitet)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX748-1", description: "Systemet har kontrollerat ett energibud från DSO (via BRS-FLEX-7310)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX748-2", description: "DSO har mottagit notifiering om resultatet." }
    ],
    rejected: [
      { id: "BRSFLEX748-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX748-4", description: "FIS skickar notifiering till DSO." }
  ],
  infoObjects: [content718Output]
};
