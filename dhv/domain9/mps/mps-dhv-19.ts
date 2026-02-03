import { MPSData } from '../../../types';

export const mpsDhv19: MPSData = {
  id: "MPS-DHV-19",
  title: "Registrera och distribuera nätavgifter",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver registrering av nätavgifter av en nätägare och distributionen av dessa av datahubben.",
  trigger: "Nätägare registrerar nätavgift.",
  scenarios: [
    {
      id: "MPS-DHV-19-Sc1",
      title: "En nätägare registrerar en nätavgift",
      description: "Scenario 8811 - Sc 1: En nätägare registrerar en nätavgift.",
      diagramCode: `sequenceDiagram
    title Registrera och distribuera nätavgift
    participant GO as Nätägare
    participant DHV as Datahubben
    participant Ret as Elleverantör

    GO->>DHV: Registrera nätavgift (BRS-DHV-811)
    activate DHV
    DHV-->>GO: Bekräftelse
    DHV->>Ret: Distribuera nätavgift (BRS-DHV-841)
    deactivate DHV`,
      steps: [
        { stepId: "8811 - Sc-1.1", role: "Nätägare", action: "Registrera", description: "BRS-SE-811 Registrera nätavgift", refBRS: "BRS-DHV-811", refRule: "BRS811-1" },
        { stepId: "8811 - Sc-1.2", role: "Datahubben", action: "Svara", description: "Datahubben svarar med ett lyckat svar.", refBRS: "BRS-DHV-811", refRule: "BRS811-3" },
        { stepId: "8811 - Sc-1.3", role: "Datahubben", action: "Distribuera", description: "BRS-SE-841 Elleverantör tar emot nätavgift", refBRS: "BRS-DHV-841", refRule: "BRS841-1" },
        { stepId: "8811 - Sc-1.4", role: "Elleverantör", action: "Mottag", description: "Elleverantören tar emot nätavgiften.", refBRS: "BRS-DHV-841", refRule: "BRS841-2" }
      ]
    }
  ]
};