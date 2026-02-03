
import { BRSData } from '../../types';
import { content715Output } from '../../content-definitions';

export const brsFlex715: BRSData = {
  id: "BRS-FLEX-737", // Updated from 715 (TSO Notification)
  previousId: "BRS-FLEX-715",
  title: "TSO notifieras om verifierat energibud",
  purpose: "Att informera TSO och ansvarig för avräkning (Settlement) om resultatet av verifieringen för ett aktiverat energibud. Detta meddelande bekräftar om leveransen skett enligt plan eller om avvikelse detekterats, vilket utgör underlag för ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare A", description: "TSO (Beställare)" },
    { role: "Mottagare B", description: "Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-737: TSO notifieras om verifierat energibud
    participant FIS as FIS
    participant TSO as TSO / Settlement

    Note over FIS: Trigger: BRS-FLEX-7320 (Verifiering klar)
    activate FIS
    FIS->>FIS: Kontrollera: Är det ett TSO-bud?
    FIS->>TSO: NotifyVerificationResult (Status, Avvikelse, Godkänd Volym)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX737-1", description: "Systemet har verifierat ett aktiverat energibud (TSO) (via BRS-FLEX-7320)." },
    { id: "BRSFLEX737-5", description: "Systemet har verifierat DA/ID handel (via BRS-FLEX-7320)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX737-2", description: "Systemoperatören (TSO) har mottagit verifieringsresultatet." },
      { id: "BRSFLEX737-3", description: "Settlement Responsible har mottagit verifieringsresultatet." }
    ],
    rejected: [
      { id: "BRSFLEX737-4", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX737-6", description: "FIS skickar verifieringsresultatet (leverans vs bud)." },
    { id: "BRSFLEX737-7", description: "TSO och Settlement Responsible tar emot informationen." }
  ],
  infoObjects: [content715Output]
};
