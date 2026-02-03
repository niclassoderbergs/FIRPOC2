
import { BRSData } from '../../types';
import { content814Output } from '../../content-definitions';

export const brsFlex814: BRSData = {
  id: "BRS-FLEX-829", // Updated from 814
  previousId: "BRS-FLEX-814",
  title: "SP notifieras om permanent avstängning",
  purpose: "Att informera Service Provider (SP) om att deras konto har avslutats permanent (Revocation) på initiativ av systemoperatören eller administratören.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-829: Notifiering om permanent avstängning
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-823
    activate FIS
    FIS->>FIS: Sammanställ beslut
    FIS->>SP: NotifyRevocation (Orsak, Avslutsdatum)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX829-1", description: "En SP har avregistrerats administrativt (via BRS-FLEX-823)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX829-2", description: "SP har mottagit notifiering om avregistreringen." }
    ],
    rejected: [
      { id: "BRSFLEX829-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX829-4", description: "FIS skickar information om den permanenta avstängningen till SP." },
    { id: "BRSFLEX829-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content814Output]
};
