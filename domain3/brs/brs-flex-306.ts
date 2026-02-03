
import { BRSData } from '../../types';
import { content306Output } from '../../content-definitions';

export const brsFlex306: BRSData = {
  id: "BRS-FLEX-309", // Updated from 306
  previousId: "BRS-FLEX-306",
  title: "SP notifieras om produktansökan",
  purpose: "Att meddela SP resultatet av den administrativa granskningen av en produktansökan. Detta besked avgör om ansökan går vidare till teknisk kvalificering eller avslutas.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-309: SP notifieras om produktansökan
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-308 eller 348 (Beslut fattat)
    activate FIS
    FIS->>FIS: Hämta beslutsdata
    FIS->>SP: NotifyApplicationDecision (ID, Status, Motivering)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX309-1", description: "Ett administrativt beslut har registrerats (via BRS-FLEX-308 eller 348)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX309-2", description: "SP har mottagit besked om ansökans status." }
    ],
    rejected: [
      { id: "BRSFLEX309-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX309-4", description: "FIS skickar notifiering till SP med resultatet av granskningen." },
    { id: "BRSFLEX309-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content306Output]
};
