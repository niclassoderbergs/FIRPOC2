
import { MPSData } from '../../../types';

export const mpsDhv28: MPSData = {
  id: "MPS-DHV-28",
  title: "Kvalitetssäkring",
  domain: "Domän 7: Nätavräkning",
  purpose: "Beräkning av obalanser (Imbalance) för att kontrollera kvaliteten på avräkningen. Obalansen bör vara noll om alla beräkningar stämmer.",
  trigger: "Tidsstyrd (efter statistik och avräkning).",
  scenarios: [
    {
      id: "MPS-DHV-28-Sc1",
      title: "Beräkna obalans (Imbalance Calculation)",
      description: "Datahubben kontrollerar differensen mellan produktion, konsumtion och utbyte.",
      diagramCode: `sequenceDiagram
    title Kvalitetssäkring
    participant Sys as System

    Sys->>Sys: Beräkna MGA Obalans (7300)
    Sys->>Sys: Beräkna MBA Obalans (7302)
    Sys->>Sys: Beräkna SWE Obalans (7303)
    Sys->>Sys: Beräkna Korrigerings-obalans (7304)`,
      steps: [
        { stepId: "1", role: "System", action: "MGA Obalans", description: "Beräkna obalans per nätområde.", refBRS: "BRS-DHV-7300", refRule: "-" },
        { stepId: "2", role: "System", action: "MBA Obalans", description: "Beräkna obalans per budområde.", refBRS: "BRS-DHV-7302", refRule: "-" },
        { stepId: "3", role: "System", action: "SWE Obalans", description: "Beräkna nationell obalans.", refBRS: "BRS-DHV-7303", refRule: "-" },
        { stepId: "4", role: "System", action: "MBA Leveransobalans", description: "Beräkna leveransobalans.", refBRS: "BRS-DHV-7301", refRule: "-" }
      ]
    }
  ]
};
