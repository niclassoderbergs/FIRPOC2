
import { BRSData } from '../../types';
import { content324Output } from '../../content-definitions';

export const brsFlex324: BRSData = {
  id: "BRS-FLEX-338", // Updated from 324
  previousId: "BRS-FLEX-324",
  title: "SP notifieras om nätförkvalificering",
  purpose: "Att informera SP om resultatet av en nätförkvalificering (Grid Qualification) som rapporterats av Nätägaren (DSO). Detta inkluderar information om eventuella villkor för godkännandet.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-338: Notifiering om nätförkvalificering
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-332
    activate FIS
    FIS->>FIS: Sammanställ resultat och villkor
    FIS->>SP: NotifyGridQualificationResult (ID, Status, Villkor)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX338-1", description: "En DSO har uppdaterat nätförkvalificering (via BRS-FLEX-332)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX338-2", description: "SP har mottagit notifiering om resultatet av nätförkvalificeringen." }
    ],
    rejected: [
      { id: "BRSFLEX338-3", description: "Notifiering misslyckades (loggas)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX338-4", description: "Flexibilitetsregistret skickar notifiering om nätförkvalificeringsresultatet." },
    { id: "BRSFLEX338-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content324Output]
};
