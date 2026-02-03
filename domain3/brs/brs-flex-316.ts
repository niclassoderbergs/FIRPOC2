
import { BRSData } from '../../types';
import { content316Output } from '../../content-definitions';

export const brsFlex316: BRSData = {
  id: "BRS-FLEX-320", // Updated from 316
  previousId: "BRS-FLEX-316",
  title: "TSO notifieras om produktansökan",
  purpose: "Att notifiera relevant TSO-handläggare om att en ny ansökan om produktförkvalificering har inkommit och behöver handläggas. Detta sker när produkten ägs av en TSO.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Systemoperatör (TSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-320: FIS notifierar TSO om produktansökan
    participant FIS as FIS
    participant TSO as TSO

    Note over FIS: Trigger: BRS-FLEX-311 (Application Received) & Product Owner = TSO
    activate FIS
    FIS->>FIS: Identifiera ansvarig TSO
    FIS->>TSO: NotifyProductApplication (Kval-ID, Resurs, Produkt)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX320-1", description: "En produktansökan har mottagits (BRS-FLEX-311) för en produkt som ägs av TSO." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX320-2", description: "TSO har mottagit notifiering om ny ansökan." }
    ],
    rejected: [
      { id: "BRSFLEX320-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX320-4", description: "Produkten måste ägas av en TSO.", errorCode: "W_320_NOT_TSO_PRODUCT" }
  ],
  process: [
    { id: "BRSFLEX320-5", description: "FIS identifierar att en ansökan inkommit för en TSO-produkt." },
    { id: "BRSFLEX320-6", description: "FIS skickar notifiering till TSO." }
  ],
  infoObjects: [content316Output]
};
