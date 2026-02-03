
import { BRSData } from '../../types';
import { content802Input, content802Output } from '../../content-definitions';

export const brsFlex802: BRSData = {
  id: "BRS-FLEX-807", // Updated from 802
  previousId: "BRS-FLEX-802",
  title: "SP ansöker om kvalificering",
  purpose: "En registrerad SP måste genomgå en kvalificeringsprocess (t.ex. finansiell prövning och teknisk anslutningstest) innan de får status 'Active' och kan agera på marknaden.",
  actors: [
    { role: "Initiator", description: "SP (Registered)" },
    { role: "Mottagare", description: "FIS (Admin)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-807: SP ansöker om kvalificering
    participant SP as SP
    participant FIS as FIS
    participant Admin as FIS Admin

    SP->>FIS: SubmitQualificationDocs (Dokument)
    activate FIS
    FIS->>FIS: Sätt status 'Pending Review'
    FIS-->>SP: Ack
    deactivate FIS

    Note over Admin: Manuell granskning
    Admin->>FIS: ApproveQualification (SP-ID)
    activate FIS
    FIS->>FIS: Sätt status 'Active'
    FIS->>SP: NotifyStatusChange (Active)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX807-1", description: "SP har status 'Registered' eller 'Pending Review'." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX807-2", description: "FIS har uppdaterat SP-status till 'Active'." },
      { id: "BRSFLEX807-3", description: "SP har notifierats om godkännandet." }
    ],
    rejected: [
      { id: "BRSFLEX807-4", description: "Ansökan avslagen, status återgår till 'Registered' eller 'Rejected'." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX807-5", description: "Alla obligatoriska dokument måste vara uppladdade.", errorCode: "E_807_MISSING_DOCS" },
    { id: "BRSFLEX807-6", description: "Endast behörig administratör får godkänna kvalificering.", errorCode: "E_GEN_AUTH_FAILED" }
  ],
  process: [
    { id: "BRSFLEX807-7", description: "SP skickar in underlag för kvalificering." },
    { id: "BRSFLEX807-8", description: "Administratör granskar och godkänner." }
  ],
  infoObjects: [content802Input, content802Output]
};
