
import { BRSData } from '../../types';
import { content117Output } from '../../content-definitions';

export const brsFlex117: BRSData = {
  id: "BRS-FLEX-118", // Updated from 117
  previousId: "BRS-FLEX-117",
  title: "SP notifieras om tillfälligt avstängd SPU",
  purpose: "Att informera Service Provider (SP) om att en SPU har blivit tillfälligt avstängd (Suspended) av systemoperatören eller administratören.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-118: Notifiering om avstängd SPU
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: SPU-status ändrad till Suspended
    activate FIS
    FIS->>FIS: Hämta avstängningsdata
    FIS->>SP: NotifySPUSuspended (SPU-ID, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX118-1", description: "En SPU har stängts av administrativt (via BRS-FLEX-115)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX118-2", description: "SP har mottagit notifiering om avstängningen." }
    ],
    rejected: [
      { id: "BRSFLEX118-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX118-4", description: "FIS skickar information om avstängningen till SP." },
    { id: "BRSFLEX118-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content117Output]
};
