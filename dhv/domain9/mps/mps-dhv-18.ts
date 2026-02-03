
import { MPSData } from '../../../types';

export const mpsDhv18: MPSData = {
  id: "MPS-DHV-18",
  title: "Uppdatera nättariff",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver hur en nätägare uppdaterar en nättariff och hur informationen distribueras till berörda aktörer.",
  trigger: "Prisjustering eller ändring av villkor.",
  scenarios: [
    {
      id: "MPS-DHV-18-Sc1",
      title: "En nätägare uppdaterar en nättariff",
      description: "Scenario 8816 - Sc 1: Uppdatering och distribution.",
      diagramCode: `sequenceDiagram
    title Uppdatera nättariff
    participant GO as Nätägare
    participant DHV as Datahubben
    participant Ret as Elleverantör
    participant ESCO as ESCO

    GO->>DHV: Uppdatera (BRS-DHV-816)
    activate DHV
    DHV-->>GO: Bekräftelse
    
    par Notifiering
        DHV->>Ret: Info (BRS-DHV-845)
        DHV->>ESCO: Info (BRS-DHV-881)
    end
    deactivate DHV`,
      steps: [
        { stepId: "8816 - Sc 1.1", role: "Nätägare", action: "Uppdatera", description: "Nätägaren uppdaterar en nättariff.", refBRS: "BRS-DHV-816", refRule: "BRS816-1" },
        { stepId: "8816 - Sc 1.2", role: "Datahubben", action: "Bekräfta", description: "Datahubben har svarat med en bekräftelse.", refBRS: "BRS-DHV-816", refRule: "BRS816-5" },
        { stepId: "8816 - Sc 1.3", role: "Datahubben", action: "Notifiera Lev", description: "Datahubben skickar tariffinformation till elleverantören.", refBRS: "BRS-DHV-845", refRule: "BRS845-2" },
        { stepId: "8816 - Sc 1.4", role: "Elleverantör", action: "Mottag", description: "Elleverantören tar emot uppdaterad tariffinformation.", refBRS: "BRS-DHV-845", refRule: "BRS845-5" },
        { stepId: "8816 - Sc 1.5", role: "Datahubben", action: "Notifiera ESCO", description: "Datahubben skickar tariffinformation till ESCO.", refBRS: "BRS-DHV-881", refRule: "BRS881-2" },
        { stepId: "8816 - Sc 1.6", role: "ESCO", action: "Mottag", description: "ESCO tar emot uppdaterad tariffinformation.", refBRS: "BRS-DHV-881", refRule: "BRS881-5" }
      ]
    }
  ]
};
