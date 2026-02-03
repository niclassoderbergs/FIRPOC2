
import { BRSData } from '../../types';
import { content315Input } from '../../content-definitions';

export const brsFlex315: BRSData = {
  id: "BRS-FLEX-317", // Updated from 315
  previousId: "BRS-FLEX-315",
  title: "TSO initierar produktförkvalificering",
  purpose: "Att officiellt starta den tekniska fasen av en produktförkvalificering efter att den administrativa granskningen är godkänd. Detta moment ändrar status till 'Prequalification Started'.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-317: Starta teknisk kvalificering
    participant TSO as TSO
    participant FIS as FIS

    TSO->>FIS: InitiateTechnicalPhase (Kval-ID)
    activate FIS
    FIS->>FIS: Validera status (Måste vara Admin Approved)
    FIS->>FIS: Sätt status 'Prequalification Started'
    FIS-->>TSO: Ack
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX317-1", description: "Ansökan har status 'Administratively Approved' av TSO (via BRS-FLEX-308)." },
    { id: "BRSFLEX317-8", description: "Eller: Ansökan har status 'Administratively Approved' av DSO (via BRS-FLEX-348)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX317-2", description: "Status uppdaterad till 'Prequalification Started'." }
    ],
    rejected: [
      { id: "BRSFLEX317-4", description: "Status ej ändrad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX317-5", description: "Endast behörig TSO kan starta processen.", errorCode: "E_317_UNAUTHORIZED" }
  ],
  process: [
    { id: "BRSFLEX317-6", description: "TSO indikerar att teknisk fas ska inledas." },
    { id: "BRSFLEX317-7", description: "FIS uppdaterar status." }
  ],
  infoObjects: [content315Input]
};
