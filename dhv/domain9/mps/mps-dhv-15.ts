
import { MPSData } from '../../../types';

export const mpsDhv15: MPSData = {
  id: "MPS-DHV-15",
  title: "Registrera nättariff",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver hur en nätägare registrerar en nättariff.",
  trigger: "Nätägare behöver registrera en ny tariff.",
  scenarios: [
    {
      id: "MPS-DHV-15-Sc1",
      title: "En nätägare registrerar en nättariff",
      description: "Scenario 8815 - Sc 1: Nätägaren skickar in registreringsunderlag för en tariff.",
      diagramCode: `sequenceDiagram
    title Registrera nättariff
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Registrera tariff (BRS-DHV-815)
    activate DHV
    DHV->>DHV: Validera data
    DHV-->>GO: Bekräftelse
    deactivate DHV`,
      steps: [
        { 
          stepId: "8815 - Sc 1.1", role: "Nätägare", action: "Registrera", 
          description: "Nätägaren registrerar en nättariff.", 
          refBRS: "BRS-DHV-815", refRule: "BRS815-1" 
        },
        { 
          stepId: "8815 - Sc 1.2", role: "Datahubben", action: "Bekräfta", 
          description: "Datahubben har svarat med en bekräftelse.", 
          refBRS: "BRS-DHV-815", refRule: "BRS815-5" 
        }
      ]
    }
  ]
};
