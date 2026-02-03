
import { BRSData } from '../../types';
import { content330Output } from '../../content-definitions';

export const brsFlex330: BRSData = {
  id: "BRS-FLEX-329", // Updated from 330
  previousId: "BRS-FLEX-330",
  title: "SP notifieras om påbörjad förkvalificering",
  purpose: "Att informera SP om att den tekniska fasen har startat och begära in nödvändiga tekniska parametrar och testplan inför aktiveringstestet.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-329: Notifiering och databegäran
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-317
    activate FIS
    FIS->>SP: NotifyPrequalificationStarted (Kval-ID, Begäran om Data)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX329-1", description: "Teknisk fas har initierats (via BRS-FLEX-317)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX329-2", description: "SP har mottagit notifiering och begäran om testdata." }
    ],
    rejected: [
      { id: "BRSFLEX329-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX329-4", description: "FIS skickar notifiering till SP." }
  ],
  infoObjects: [content330Output]
};
