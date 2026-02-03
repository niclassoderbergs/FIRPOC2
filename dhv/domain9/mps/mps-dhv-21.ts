import { MPSData } from '../../../types';

export const mpsDhv21: MPSData = {
  id: "MPS-DHV-21",
  title: "Aggregera och distribuera nätavgifter",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver hur datahubben aggregerar nätavgifter och distribuerar dem.",
  trigger: "Tidsstyrd (sjätte dagen i månaden).",
  scenarios: [
    {
      id: "MPS-DHV-21-Sc1",
      title: "Datahubben aggregerar nätavgifter",
      description: "Scenario 8000 - Sc 1: Aggregering och distribution.",
      diagramCode: `sequenceDiagram
    title Aggregera och distribuera
    participant Sys as System
    participant DHV as Datahubben
    participant Ret as Elleverantör
    participant GO as Nätägare

    Sys->>DHV: Aggregera (BRS-DHV-8000)
    activate DHV
    DHV->>DHV: Spara resultat
    DHV->>Ret: Distribuera (BRS-DHV-844)
    DHV->>GO: Distribuera (BRS-DHV-863)
    deactivate DHV`,
      steps: [
        { stepId: "8000 - Sc-1.1", role: "Datahubben", action: "Aggregera", description: "BRS-SE-8000 Datahubben aggregerar nätavgifter", refBRS: "BRS-DHV-8000", refRule: "BRS8000-1" },
        { stepId: "8000 - Sc-1.2", role: "Datahubben", action: "Spara", description: "Datahubben lagrar resultatet av de aggregerade nätavgifterna", refBRS: "BRS-DHV-8000", refRule: "BRS8000-2" },
        { stepId: "8000 - Sc-1.3", role: "Datahubben", action: "Distribuera (Lev)", description: "BRS-SE-844 Elleverantör tar emot aggregerade nätavgifter", refBRS: "BRS-DHV-844", refRule: "BRS844-1" },
        { stepId: "8000 - Sc-1.4", role: "Elleverantör", action: "Mottag", description: "Elleverantören tar emot aggregerade nätavgifter", refBRS: "BRS-DHV-844", refRule: "BRS844-2" },
        { stepId: "8000 - Sc-1.5", role: "Datahubben", action: "Distribuera (Nät)", description: "BRS-SE-863 Nätägare tar emot aggregerade nätavgifter", refBRS: "BRS-DHV-863", refRule: "BRS863-1" },
        { stepId: "8000 - Sc-1.6", role: "Nätägare", action: "Mottag", description: "Nätägaren tar emot aggregerade nätavgifter", refBRS: "BRS-DHV-863", refRule: "BRS863-2" }
      ]
    }
  ]
};