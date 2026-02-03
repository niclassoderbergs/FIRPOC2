
import { MPSData } from '../../../types';

export const mpsDhv12: MPSData = {
  id: "MPS-DHV-12",
  title: "Begär mätvärdesprognos",
  domain: "Domän 6: Mätvärden",
  purpose: "Denna process beskriver en begäran om mätvärdesprognos i datahubben för en specifik mätpunkt.",
  trigger: "Aktör begär prognos.",
  scenarios: [
    {
      id: "MPS-DHV-12-Sc1",
      title: "Scenario 1 - En elleverantör begär mätvärdesprognos",
      description: "Elleverantör begär prognos.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-12-Sc1: Prognos Elleverantör
    participant Ret as Elleverantör
    participant DHV as Datahubben
    participant Calc as Beräkning

    Ret->>DHV: Begär prognos (642)
    activate DHV
    DHV->>Calc: Beräkna (6002)
    DHV-->>Ret: Prognos
    deactivate DHV`,
      steps: [
        { stepId: "6616 - Sc-1.1", role: "Elleverantör", action: "Begär prognos", description: "Elleverantören begär mätvärdesprognos (Start av process).", refBRS: "BRS-DHV-642", refRule: "BRS642-1" },
        { stepId: "6616 - Sc-1.2", role: "Datahubben", action: "Beräkna", description: "Datahubben beräknar mätvärdesprognos.", refBRS: "BRS-DHV-6002", refRule: "BRS6002-1" },
        { stepId: "6616 - Sc-1.3", role: "Datahubben", action: "Beräknad", description: "Datahubben har beräknat 12 månadsvärden för prognosen.", refBRS: "BRS-DHV-6002", refRule: "BRS6002-3" },
        { stepId: "6616 - Sc-1.4", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärd mätvärdesprognos (Slut på process).", refBRS: "BRS-DHV-642", refRule: "BRS642-3" }
      ]
    },
    {
      id: "MPS-DHV-12-Sc2",
      title: "Scenario 2 - En ESCO begär mätvärdesprognos",
      description: "ESCO begär prognos.",
      steps: [
        { stepId: "6616 - Sc-2.1", role: "ESCO", action: "Begär prognos", description: "ESCO begär mätvärdesprognos (Start av process).", refBRS: "BRS-DHV-682", refRule: "BRS682-1" },
        { stepId: "6616 - Sc-2.2", role: "Datahubben", action: "Beräkna", description: "Datahubben beräknar mätvärdesprognos.", refBRS: "BRS-DHV-6002", refRule: "BRS6002-2" },
        { stepId: "6616 - Sc-2.3", role: "Datahubben", action: "Beräknad", description: "Datahubben har beräknat 12 månadsvärden för prognosen.", refBRS: "BRS-DHV-6002", refRule: "BRS6002-3" },
        { stepId: "6616 - Sc-2.4", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärd mätvärdesprognos (Slut på process).", refBRS: "BRS-DHV-682", refRule: "BRS682-3" }
      ]
    }
  ]
};
