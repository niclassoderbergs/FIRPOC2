
import { MPSData } from '../../../types';

export const mpsDhv13: MPSData = {
  id: "MPS-DHV-13",
  title: "Begär översikt av mätvärdesregistrering",
  domain: "Domän 6: Mätvärden",
  purpose: "Denna process beskriver hur en nätägare begär en översikt över mätvärdesregistrering från datahubben.",
  trigger: "Nätägare begär översikt.",
  scenarios: [
    {
      id: "MPS-DHV-13-Sc1",
      title: "Scenario 1 - En nätägare begär översikt av mätvärdesregistrering",
      description: "Nätägare får en översikt över registrerade värden.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-13-Sc1: Registreringsöversikt
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär översikt (617)
    DHV-->>GO: Översikt`,
      steps: [
        { stepId: "6617 - Sc-1.1", role: "Nätägare", action: "Begär översikt", description: "Begär översikt av mätvärdesregistrering (Start av process).", refBRS: "BRS-DHV-617", refRule: "BRS617-1" },
        { stepId: "6617 - Sc-1.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärd översikt av mätvärdesregistrering (Slut på process).", refBRS: "BRS-DHV-617", refRule: "BRS617-3" }
      ]
    }
  ]
};
