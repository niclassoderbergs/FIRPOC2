
import { MPSData } from '../../../types';

export const mpsDhv17: MPSData = {
  id: "MPS-DHV-17",
  title: "Begär nättariffinformation",
  domain: "Domän 9: Nättariffer",
  purpose: "Denna process beskriver hur en aktör begär information om nättariffer.",
  trigger: "Aktör behöver prisinformation.",
  scenarios: [
    {
      id: "MPS-DHV-17-Sc1",
      title: "En elleverantör begär nättariffinformation",
      description: "Scenario 8818 - Sc 1: Elleverantör hämtar data.",
      steps: [
        { stepId: "8818 - Sc-1.1", role: "Elleverantör", action: "Begär info", description: "Elleverantören begär nättariffinformation.", refBRS: "BRS-DHV-846", refRule: "BRS846-2" },
        { stepId: "8818 - Sc-1.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärd information.", refBRS: "BRS-DHV-846", refRule: "BRS846-5" }
      ]
    },
    {
      id: "MPS-DHV-17-Sc2",
      title: "En nätägare begär nättariffinformation",
      description: "Scenario 8818 - Sc 2: Nätägare hämtar data.",
      steps: [
        { stepId: "8818 - Sc-2.1", role: "Nätägare", action: "Begär info", description: "Nätägaren begär nättariffinformation.", refBRS: "BRS-DHV-864", refRule: "BRS864-2" },
        { stepId: "8818 - Sc-2.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärd information.", refBRS: "BRS-DHV-864", refRule: "BRS864-5" }
      ]
    },
    {
      id: "MPS-DHV-17-Sc3",
      title: "En ESCO begär nättariffinformation",
      description: "Scenario 8818 - Sc 3: ESCO hämtar data.",
      steps: [
        { stepId: "8818 - Sc-3.1", role: "ESCO", action: "Begär info", description: "ESCO begär nättariffinformation.", refBRS: "BRS-DHV-882", refRule: "BRS882-2" },
        { stepId: "8818 - Sc-3.2", role: "Datahubben", action: "Svara", description: "Datahubben har svarat med begärd information.", refBRS: "BRS-DHV-882", refRule: "BRS882-5" }
      ]
    }
  ]
};
