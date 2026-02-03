
import { BRSData } from '../../types';
import { content127Output } from '../../content-definitions';

export const brsFlex127: BRSData = {
  id: "BRS-FLEX-128", // Updated from 127
  previousId: "BRS-FLEX-127",
  title: "SP notifieras om tillfällig avstängd SPG",
  purpose: "Att informera Service Provider (SP) om att en SPG har blivit tillfälligt avstängd (Suspended) av systemoperatören eller administratören.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-128: Notifiering om avstängd SPG
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: SPG-status ändrad till Suspended
    activate FIS
    FIS->>FIS: Hämta avstängningsdata
    FIS->>SP: NotifySPGSuspended (SPG-ID, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX128-1", description: "En SPG har stängts av administrativt (via BRS-FLEX-125)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX128-2", description: "SP har mottagit notifiering om avstängningen." }
    ],
    rejected: [
      { id: "BRSFLEX128-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX128-4", description: "FIS skickar information om avstängningen till SP." },
    { id: "BRSFLEX128-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content127Output]
};
