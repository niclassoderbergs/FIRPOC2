
import { BRSData } from '../../types';
import { content314Output } from '../../content-definitions';

export const brsFlex314: BRSData = {
  id: "BRS-FLEX-314",
  title: "TSO notifieras om produktförkvalificering",
  purpose: "Att automatiskt distribuera nödvändigt underlag till Systemoperatören (TSO) för att de ska kunna planera och genomföra fysiska kvalificeringstester. Triggas när en ansökan godkänts i BRS-FLEX-311.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Systemoperatör (TSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-314: Notifiering till TSO (Ansökan)
    participant FIS as FIS
    participant TSO as TSO

    Note over FIS: Trigger: BRS-FLEX-311 (Approved)
    activate FIS
    FIS->>FIS: Identifiera ansvarig TSO
    FIS->>FIS: Sammanställ ansökningsdata (Teknisk data)
    FIS->>TSO: NotifyProductQualificationApplication (ID, SPU, Produkt, Data)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX314-1", description: "En ansökan om produktförkvalificering har godkänts i FIS (via BRS-FLEX-311)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX314-2", description: "TSO har mottagit underlag för kvalificeringstest." }
    ],
    rejected: [
      { id: "BRSFLEX314-3", description: "Notifiering misslyckades (larm till drift)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX314-4", description: "FIS sammanställer teknisk data om SPU/SPG och ingående CUs." },
    { id: "BRSFLEX314-5", description: "FIS skickar notifieringen till relevant TSO baserat på produkt och elområde." }
  ],
  infoObjects: [content314Output]
};
