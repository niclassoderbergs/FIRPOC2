
import { BRSData } from '../../types';
import { content128Output } from '../../content-definitions';

export const brsFlex128: BRSData = {
  id: "BRS-FLEX-127", // Updated from 128
  previousId: "BRS-FLEX-128",
  title: "SP notifieras om återaktiverad SPG",
  purpose: "Att informera Service Provider (SP) om att en SPG återgått till aktiv status efter en period av suspendering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-127: Notifiering om återaktiverad SPG
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: SPG-status ändrad till Active/Available
    activate FIS
    FIS->>FIS: Hämta SPG-data
    FIS->>SP: NotifySPGReactivated (SPG-ID, Status)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX127-1", description: "En SPG har återaktiverats administrativt (via BRS-FLEX-126)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX127-2", description: "SP har mottagit notifiering om återaktiveringen." }
    ],
    rejected: [
      { id: "BRSFLEX127-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX127-4", description: "FIS skickar information om återaktiveringen till SP." },
    { id: "BRSFLEX127-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content128Output]
};
