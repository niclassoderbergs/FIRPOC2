
import { BRSData } from '../../types';
import { content108Output } from '../../content-definitions';

export const brsFlex108: BRSData = {
  id: "BRS-FLEX-108",
  title: "SP notifieras om suspenderad CU",
  purpose: "Att informera SP om att en CU har blivit avstängd (Suspended) av systemet eller en administratör.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-108: Notifiering om suspenderad CU
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-105
    activate FIS
    FIS->>FIS: Hämta avstängningsdata
    FIS->>SP: NotifyCUSuspended (CU-ID, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX108-1", description: "En CU har stängts av administrativt (via BRS-FLEX-105)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX108-2", description: "SP har mottagit notifiering om suspenderingen." }
    ],
    rejected: [
      { id: "BRSFLEX108-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX108-4", description: "FIS skickar information om suspenderingen till SP." },
    { id: "BRSFLEX108-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content108Output]
};
