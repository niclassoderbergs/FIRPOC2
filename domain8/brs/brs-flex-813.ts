
import { BRSData } from '../../types';
import { content813Output } from '../../content-definitions';

export const brsFlex813: BRSData = {
  id: "BRS-FLEX-819", // Updated from 813
  previousId: "BRS-FLEX-813",
  title: "SP notifieras om tillfällig avstängning",
  purpose: "Att informera Service Provider (SP) om att deras rättigheter att agera på marknaden har blivit tillfälligt indragna (Suspended) av systemoperatören eller administratören.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-819: Notifiering om avstängning
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-815
    activate FIS
    FIS->>FIS: Sammanställ beslut och orsak
    FIS->>SP: NotifySuspension (Orsak, Startdatum)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX819-1", description: "En SP har stängts av administrativt (via BRS-FLEX-815)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX819-2", description: "SP har mottagit notifiering om avstängningen." }
    ],
    rejected: [
      { id: "BRSFLEX819-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX819-4", description: "FIS skickar information om avstängningen till SP." },
    { id: "BRSFLEX819-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content813Output]
};
