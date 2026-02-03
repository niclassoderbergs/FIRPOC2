
import { BRSData } from '../../types';
import { content118Output } from '../../content-definitions';

export const brsFlex118: BRSData = {
  id: "BRS-FLEX-117", // Updated from 118
  previousId: "BRS-FLEX-118",
  title: "SP notifieras om återaktiverad SPU",
  purpose: "Att informera Service Provider (SP) om att en SPU återgått till aktiv status efter en period av suspendering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-117: Notifiering om återaktiverad SPU
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: SPU-status ändrad till Active/Available
    activate FIS
    FIS->>FIS: Hämta SPU-data
    FIS->>SP: NotifySPUReactivated (SPU-ID, Status)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX117-1", description: "En SPU har återaktiverats administrativt (via BRS-FLEX-116)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX117-2", description: "SP har mottagit notifiering om återaktiveringen." }
    ],
    rejected: [
      { id: "BRSFLEX117-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX117-4", description: "FIS skickar information om återaktiveringen till SP." },
    { id: "BRSFLEX117-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content118Output]
};
