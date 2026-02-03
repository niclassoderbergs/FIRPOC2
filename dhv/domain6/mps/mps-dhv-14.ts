
import { MPSData } from '../../../types';

export const mpsDhv14: MPSData = {
  id: "MPS-DHV-14",
  title: "Begär detaljer om ej kompletta mätvärden",
  domain: "Domän 6: Mätvärden",
  purpose: "Denna process beskriver hur en nätägare begär detaljer om sina ej kompletta mätvärdesregistreringar från datahubben.",
  trigger: "Nätägare begär detaljer om ej kompletta.",
  scenarios: [
    {
      id: "MPS-DHV-14-Sc1",
      title: "Scenario 1 - En nätägare begär detaljer om ej kompletta mätvärden",
      description: "Nätägare får detaljerad lista över saknade/temporära värden.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-14-Sc1: Ej kompletta detaljer
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär detaljer (618)
    DHV-->>GO: Detaljer`,
      steps: [
        { stepId: "6618 - Sc-1.1", role: "Nätägare", action: "Begär detaljer", description: "Begär detaljer om ej kompletta mätvärden (Start av process).", refBRS: "BRS-DHV-618", refRule: "BRS618-1" },
        { stepId: "6618 - Sc-1.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med detaljer om ej kompletta mätvärden (Slut på process).", refBRS: "BRS-DHV-618", refRule: "BRS618-3" }
      ]
    }
  ]
};
