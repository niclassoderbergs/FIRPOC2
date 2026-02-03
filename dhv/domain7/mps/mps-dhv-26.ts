
import { MPSData } from '../../../types';

export const mpsDhv26: MPSData = {
  id: "MPS-DHV-26",
  title: "Begär avräkningsresultat",
  domain: "Domän 7: Nätavräkning",
  purpose: "Beskriver hur elleverantörer begär resultat från korrigeringsavräkningen (Correction Settlement). Detta används för att stämma av fakturaunderlag.",
  trigger: "Elleverantör behöver underlag för ekonomisk avstämning.",
  scenarios: [
    {
      id: "MPS-DHV-26-Sc1",
      title: "Elleverantör begär korrigeringsavräkning",
      description: "Scenario 6741: Elleverantör hämtar korrigerade volymer och belopp.",
      diagramCode: `sequenceDiagram
    title Begär Korrigeringsavräkning
    participant Ret as Elleverantör
    participant DHV as Datahub

    Note right of DHV: BRS-DHV-7019/7020 har körts
    Ret->>DHV: Begär resultat (BRS-DHV-741)
    DHV-->>Ret: Korrigeringsdata`,
      steps: [
        { stepId: "1.1", role: "System", action: "Beräkna", description: "Datahubben beräknar korrigeringsavräkning.", refBRS: "BRS-DHV-7019", refRule: "-" },
        { stepId: "1.2", role: "System", action: "Faktura", description: "Datahubben skapar fakturaunderlag.", refBRS: "BRS-DHV-7020", refRule: "-" },
        { stepId: "1.3", role: "Elleverantör", action: "Begär resultat", description: "Skicka förfrågan.", refBRS: "BRS-DHV-741", refRule: "BRS741-1" },
        { stepId: "1.4", role: "Datahub", action: "Svara", description: "Returnera resultat.", refBRS: "BRS-DHV-741", refRule: "BRS741-2" }
      ]
    }
  ]
};
