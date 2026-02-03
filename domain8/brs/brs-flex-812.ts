
import { BRSData } from '../../types';
import { content812Input, content812Output } from '../../content-definitions';

export const brsFlex812: BRSData = {
  id: "BRS-FLEX-816", // Updated from 812
  previousId: "BRS-FLEX-812",
  title: "FIS återaktiverar SP",
  purpose: "Att återställa en avstängd ('Suspended') aktör till aktiv status ('Active') efter att orsakerna till avstängningen åtgärdats.",
  actors: [
    { role: "Initiator", description: "FIS Admin" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-816: FIS återaktiverar SP
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: ReactivateActor (SP-ID)
    activate FIS
    FIS->>FIS: Validera aktuell status (måste vara Suspended)
    FIS->>FIS: Sätt status 'Active'
    FIS->>FIS: Trigger BRS-FLEX-817 (Notify SP)
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX816-1", description: "SP har status 'Suspended' och beslut om återaktivering finns." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX816-2", description: "SP-status är återställd till 'Active'." },
      { id: "BRSFLEX816-3", description: "Notifieringsprocess (BRS-FLEX-817) är initierad." }
    ],
    rejected: [
      { id: "BRSFLEX816-4", description: "Felaktig statusövergång (t.ex. från Terminated)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX816-5", description: "Endast 'Suspended' aktörer kan återaktiveras.", errorCode: "E_816_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX816-6", description: "Admin återaktiverar SP." },
    { id: "BRSFLEX816-7", description: "FIS häver spärrar och initierar notifiering." }
  ],
  infoObjects: [content812Input, content812Output]
};
