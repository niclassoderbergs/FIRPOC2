
import { BRSData } from '../../types';
import { content313Output } from '../../content-definitions';

export const brsFlex313: BRSData = {
  id: "BRS-FLEX-328", // Updated from 313
  previousId: "BRS-FLEX-313",
  title: "SP notifieras om produktförkvalificeringsresultat",
  purpose: "Att informera SP om det slutgiltiga resultatet av produktförkvalificeringen (Godkänd/Avslagen) efter teknisk granskning och test.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-328: SP notifieras om resultat
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-319
    activate FIS
    FIS->>FIS: Sammanställ resultat
    FIS->>SP: NotifyQualificationResult (Kval-ID, Status, GiltigTill)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX328-1", description: "TSO har rapporterat testresultat (via BRS-FLEX-319)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX328-2", description: "SP har mottagit notifiering om resultatet." }
    ],
    rejected: [
      { id: "BRSFLEX328-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX328-4", description: "Flexibilitetsregistret skickar notifiering om resultatet." },
    { id: "BRSFLEX328-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content313Output]
};
