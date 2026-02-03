
import { BRSData } from '../../types';
import { content326Output } from '../../content-definitions';

export const brsFlex326: BRSData = {
  id: "BRS-FLEX-349", // Updated from 326
  previousId: "BRS-FLEX-326",
  title: "DSO notifieras om produktansökan",
  purpose: "Att notifiera relevant DSO-handläggare om att en ny ansökan om produktförkvalificering har inkommit och behöver handläggas. Detta sker när produkten ägs av en DSO (t.ex. lokal flexibilitet).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Nätägare (DSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-349: FIS notifierar DSO om produktansökan
    participant FIS as FIS
    participant DSO as DSO

    Note over FIS: Trigger: BRS-FLEX-311 (Application Received) & Product Owner = DSO
    activate FIS
    FIS->>FIS: Identifiera ansvarig DSO (baserat på produkt/nätområde)
    FIS->>DSO: NotifyProductApplication (Kval-ID, Resurs, Produkt)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX349-1", description: "En produktansökan har mottagits (BRS-FLEX-311) för en produkt som ägs av en DSO." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX349-2", description: "DSO har mottagit notifiering om ny ansökan." }
    ],
    rejected: [
      { id: "BRSFLEX349-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX349-4", description: "Produkten måste ägas av en DSO.", errorCode: "W_349_NOT_DSO_PRODUCT" },
    { id: "BRSFLEX349-5", description: "Resursen måste befinna sig i DSO:ns nätområde.", errorCode: "E_349_GRID_AREA_MISMATCH" }
  ],
  process: [
    { id: "BRSFLEX349-6", description: "FIS identifierar att en ansökan inkommit för en DSO-produkt." },
    { id: "BRSFLEX349-7", description: "FIS skickar notifiering till DSO." }
  ],
  infoObjects: [content326Output]
};
