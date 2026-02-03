
import { BRSData } from '../../types';
import { content715Output } from '../../content-definitions';

export const brsFlex714: BRSData = {
  id: "BRS-FLEX-739", // Updated from 714
  previousId: "BRS-FLEX-714",
  title: "SP notifieras om verifierat energibud",
  purpose: "Att informera Service Provider (SP) om resultatet av verifieringen för ett aktiverat energibud. Detta inkluderar information om status (Verified/Deviation) och den fastställda volymen som ligger till grund för den ekonomiska regleringen.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP (Resursägare)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-739: SP notifieras om verifierat energibud
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-7320 (Verifiering klar)
    activate FIS
    FIS->>FIS: Sammanställ verifieringsdata för SP
    FIS->>SP: NotifyVerificationResult (Status, Avvikelse, Godkänd Volym)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX739-1", description: "Systemet har verifierat ett aktiverat energibud (TSO/DSO) (via BRS-FLEX-7320)." },
    { id: "BRSFLEX739-5", description: "Systemet har verifierat DA/ID handel (via BRS-FLEX-7320)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX739-2", description: "Service Provider (SP) har mottagit verifieringsresultatet." }
    ],
    rejected: [
      { id: "BRSFLEX739-4", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX739-6", description: "FIS skickar verifieringsresultatet till berörd SP." },
    { id: "BRSFLEX739-7", description: "SP tar emot informationen." }
  ],
  infoObjects: [content715Output] // Återanvänder struktur från 715 då datamängden är identisk
};
