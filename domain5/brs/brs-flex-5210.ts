
import { BRSData } from '../../types';
import { content5210Input, content5210Output } from '../../content-definitions';

export const brsFlex5210: BRSData = {
  id: "BRS-FLEX-5210",
  title: "FIS beräknar baseline för CU",
  purpose: "Att fastställa en referenskurva (baseline) för en resurs baserat på historisk data. Detta görs antingen för att generera underlag där systemet äger metoden, eller som en jämförande kontrollberäkning för att validera en baseline som rapporterats av SP.",
  actors: [
    { role: "Initiator", description: "FIS (System/Internal)" },
    { role: "Mottagare", description: "System (Database)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-5210: FIS beräknar baseline för CU
    participant FIS as FIS

    Note over FIS: Trigger: Rapporteringsfrist passerad (samma som 7110)
    FIS->>FIS: Hämta CU-konfiguration
    FIS->>FIS: Hämta historisk mp- eller cu-mätdata
    activate FIS
    FIS->>FIS: Exekvera Beräkningsalgoritm
    deactivate FIS
    FIS->>FIS: Spara Baseline Resultat`,
  preConditions: [
    { id: "BRSFLEX5210-1", description: "BRS-FLEX-711 har exekverats (TSO-bud)." },
    { id: "BRSFLEX5210-2", description: "ELLER BRS-FLEX-712 har exekverats (DSO-bud)." },
    { id: "BRSFLEX5210-3", description: "ELLER BRS-FLEX-713 har exekverats (NEMO-bud)." },
    { id: "BRSFLEX5210-4", description: "OCH Rapporteringsfönstret för mätvärden har passerat." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX5210-5", description: "FIS har beräknat och lagrat baseline för perioden." }
    ],
    rejected: [
      { id: "BRSFLEX5210-6", description: "Beräkning misslyckades (larm genereras)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX5210-7", description: "Tillräcklig historik måste finnas för att uppfylla metodens krav.", errorCode: "E_5210_INSUFFICIENT_HISTORY" }
  ],
  process: [
    { id: "BRSFLEX5210-8", description: "FIS identifierar att underlag finns och beräknar baseline för resursen (systemprocess)." },
    { id: "BRSFLEX5210-9", description: "FIS lagrar resultatet." }
  ],
  infoObjects: [content5210Input, content5210Output]
};
