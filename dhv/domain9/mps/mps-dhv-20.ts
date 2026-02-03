import { MPSData } from '../../../types';

export const mpsDhv20: MPSData = {
  id: "MPS-DHV-20",
  title: "Begär nätavgift",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver hur en elleverantör eller en nätägare begär nätavgifter.",
  trigger: "Aktör begär nätavgift.",
  scenarios: [
    {
      id: "MPS-DHV-20-Sc1",
      title: "En elleverantör begär nätavgift",
      description: "Scenario 8813 - Sc 1: Elleverantör begär nätavgift.",
      steps: [
        { stepId: "8813 - Sc-1.1", role: "Elleverantör", action: "Begär", description: "BRS-SE-842 Elleverantör begär nätavgift", refBRS: "BRS-DHV-842", refRule: "BRS842-1" },
        { stepId: "8813 - Sc-1.2", role: "Datahubben", action: "Svara", description: "Datahubben svarar med en nätavgift", refBRS: "BRS-DHV-842", refRule: "BRS842-2" }
      ]
    },
    {
      id: "MPS-DHV-20-Sc2",
      title: "En nätägare begär nätavgift",
      description: "Scenario 8813 - Sc 2: Nätägare begär nätavgift.",
      steps: [
        { stepId: "8813 - Sc-2.1", role: "Nätägare", action: "Begär", description: "BRS-SE-861 Nätägare begär nätavgift", refBRS: "BRS-DHV-861", refRule: "BRS861-1" },
        { stepId: "8813 - Sc-2.2", role: "Datahubben", action: "Svara", description: "Datahubben svarar med en nätavgift", refBRS: "BRS-DHV-861", refRule: "BRS861-2" }
      ]
    }
  ]
};