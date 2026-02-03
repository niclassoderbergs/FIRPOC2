
import { BRSData } from '../../types';
import { content144Output } from '../../content-definitions';

export const brsFlex144: BRSData = {
  id: "BRS-FLEX-149", // Updated from 144
  previousId: "BRS-FLEX-144",
  title: "SP notifieras om bortkopplad CU från SPG",
  purpose: "Att informera SP om att en CU har kopplats bort från en SPG på grund av en systemhändelse.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-149: Notifiering om bortkopplad SPG-resurs
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-1430
    activate FIS
    FIS->>FIS: Sammanställ notifiering (Orsak, Startdatum, Slutdatum)
    FIS->>SP: NotifyCUUnlinkedFromSPG (Data)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX149-1", description: "En SP har notifierats om att en styrbar enhet kopplats bort från en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX149-2", description: "SP har mottagit information om att en styrbar enhet kopplats bort från en SPG." }
    ],
    rejected: [
      { id: "BRSFLEX149-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX149-4", description: "FIS skickar notifiering om bortkoppling." },
    { id: "BRSFLEX149-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content144Output]
};
