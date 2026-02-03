
import { BRSData } from '../../types';
import { content716Output } from '../../content-definitions';

export const brsFlex716: BRSData = {
  id: "BRS-FLEX-749", // Updated from 716
  previousId: "BRS-FLEX-716",
  title: "DSO notifieras om verifierat energibud",
  purpose: "Att informera DSO och ansvarig för avräkning (Settlement) om resultatet av verifieringen för ett aktiverat lokalt energibud. Detta meddelande bekräftar om leveransen skett enligt plan eller om avvikelse detekterats, vilket utgör underlag för ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare A", description: "DSO (Beställare)" },
    { role: "Mottagare B", description: "Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-749: DSO notifieras om verifierat energibud
    participant FIS as FIS
    participant DSO as DSO / Settlement

    Note over FIS: Trigger: BRS-FLEX-7320 (Verifiering klar)
    activate FIS
    FIS->>FIS: Kontrollera: Är det ett DSO-bud?
    FIS->>DSO: NotifyVerificationResult (Status, Avvikelse, Godkänd Volym)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX749-1", description: "Systemet har verifierat ett aktiverat energibud (DSO) (via BRS-FLEX-7320)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX749-2", description: "Nätägaren (DSO) har mottagit verifieringsresultatet." },
      { id: "BRSFLEX749-3", description: "Settlement Responsible har mottagit verifieringsresultatet." }
    ],
    rejected: [
      { id: "BRSFLEX749-4", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX749-5", description: "FIS skickar verifieringsresultatet (leverans vs bud)." },
    { id: "BRSFLEX749-6", description: "DSO och Settlement Responsible tar emot informationen." }
  ],
  infoObjects: [content716Output]
};
