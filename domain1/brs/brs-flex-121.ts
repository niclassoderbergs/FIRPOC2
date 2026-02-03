
import { BRSData } from '../../types';
import { content121Output } from '../../content-definitions';

export const brsFlex121: BRSData = {
  id: "BRS-FLEX-129", // Updated from 121
  previousId: "BRS-FLEX-121",
  title: "SP notifieras om administrativt registrerad SPG",
  purpose: "Att informera SP om att en SPG har skapats åt dem administrativt av systemet eller en administratör.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-129: Notifiering om ny SPG (Admin)
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-1210
    activate FIS
    FIS->>FIS: Sammanställ SPG-data
    FIS->>SP: NotifySPGCreated (SPG-ID, Namn, Elområde, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX129-1", description: "En SPG har registrerats administrativt (via BRS-FLEX-1210)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX129-2", description: "SP har mottagit information om den nya SPG:n." }
    ],
    rejected: [
      { id: "BRSFLEX129-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX129-4", description: "FIS skickar notifiering om den nya SPG:n." },
    { id: "BRSFLEX129-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content121Output]
};
