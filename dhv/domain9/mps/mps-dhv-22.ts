import { MPSData } from '../../../types';

export const mpsDhv22: MPSData = {
  id: "MPS-DHV-22",
  title: "Begär aggregerade nätavgifter",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver hur en elleverantör eller en nätägare begär aggregerade nätavgifter.",
  trigger: "Aktör begär aggregerade nätavgifter.",
  scenarios: [
    {
      id: "MPS-DHV-22-Sc1",
      title: "En elleverantör begär aggregerade nätavgifter",
      description: "Scenario 8814 - Sc 1: Elleverantör begär aggregerade nätavgifter.",
      steps: [
        { stepId: "8814 - Sc-1.1", role: "Elleverantör", action: "Begär", description: "BRS-SE-843 Elleverantör begär aggregerade nätavgifter", refBRS: "BRS-DHV-843", refRule: "BRS843-1" },
        { stepId: "8814 - Sc-1.2", role: "Datahubben", action: "Svara", description: "Datahubben svarar med aggregerade nätavgifter", refBRS: "BRS-DHV-843", refRule: "BRS843-2" }
      ]
    },
    {
      id: "MPS-DHV-22-Sc2",
      title: "En nätägare begär aggregerade nätavgifter",
      description: "Scenario 8814 - Sc 2: Nätägare begär aggregerade nätavgifter.",
      steps: [
        { stepId: "8814 - Sc-2.1", role: "Nätägare", action: "Begär", description: "BRS-SE-862 Nätägare begär aggregerade nätavgifter", refBRS: "BRS-DHV-862", refRule: "BRS862-1" },
        { stepId: "8814 - Sc-2.2", role: "Datahubben", action: "Svara", description: "Datahubben svarar med aggregerade nätavgifter", refBRS: "BRS-DHV-862", refRule: "BRS862-2" }
      ]
    }
  ]
};