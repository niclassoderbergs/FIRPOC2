
import { MPSData } from '../../../types';

export const mpsDhv16: MPSData = {
  id: "MPS-DHV-16",
  title: "Koppla nättariff till nätområde",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver hur en nätägare kopplar en nättariff till ett mätområde (Metering Grid Area).",
  trigger: "Nätägare vill tilldela en tariff till ett område.",
  scenarios: [
    {
      id: "MPS-DHV-16-Sc1",
      title: "En nätägare kopplar en nättariff till ett nätområde",
      description: "Scenario 8819 - Sc 1: Koppling av tariff till nätområde.",
      diagramCode: `sequenceDiagram
    title Koppla tariff till nätområde
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Koppla tariff (BRS-DHV-819)
    activate DHV
    DHV->>DHV: Validera ägarskap
    DHV-->>GO: Bekräftelse
    deactivate DHV`,
      steps: [
        { 
          stepId: "8819 - Sc 1.1", role: "Nätägare", action: "Koppla", 
          description: "Nätägaren kopplar en nättariff till ett nätområde.", 
          refBRS: "BRS-DHV-819", refRule: "BRS819-1" 
        },
        { 
          stepId: "8819 - Sc 1.2", role: "Datahubben", action: "Bekräfta", 
          description: "Datahubben har svarat med en bekräftelse.", 
          refBRS: "BRS-DHV-819", refRule: "BRS819-5" 
        }
      ]
    }
  ]
};
