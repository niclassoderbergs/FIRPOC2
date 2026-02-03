
import { BRSData } from '../../types';
import { content111Output } from '../../content-definitions';

export const brsFlex111: BRSData = {
  id: "BRS-FLEX-119", // Updated from 111
  previousId: "BRS-FLEX-111",
  title: "SP notifieras om administrativt registrerad SPU",
  purpose: "Att informera SP om att en SPU har skapats åt dem administrativt av systemet eller en administratör.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-119: Notifiering om ny SPU (Admin)
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-1110
    activate FIS
    FIS->>FIS: Sammanställ SPU-data
    FIS->>SP: NotifySPUCreated (SPU-ID, Namn, Elområde, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX119-1", description: "En SPU har registrerats administrativt (via BRS-FLEX-1110)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX119-2", description: "SP har mottagit information om den nya SPU:n." }
    ],
    rejected: [
      { id: "BRSFLEX119-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX119-4", description: "FIS skickar notifiering om den nya SPU:n." },
    { id: "BRSFLEX119-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content111Output]
};
