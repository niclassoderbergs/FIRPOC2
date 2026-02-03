
import { MPSData } from '../../../types';

export const mpsDhv24: MPSData = {
  id: "MPS-DHV-24",
  title: "Begär aggregerade mätvärden",
  domain: "Domän 7: Nätavräkning",
  purpose: "Beskriver hur aktörer (Elleverantör, Nätägare, BRP) begär aggregerad data för ett specifikt nätområde och period.",
  trigger: "Aktör behöver underlag för avstämning.",
  scenarios: [
    {
      id: "MPS-DHV-24-Sc1",
      title: "Elleverantör begär aggregerad data",
      description: "Scenario 6743: En elleverantör begär aggregerad data för sitt ansvarsområde.",
      steps: [
        { stepId: "1.1", role: "Elleverantör", action: "Begär data", description: "Skicka förfrågan.", refBRS: "BRS-DHV-743", refRule: "BRS743-1" },
        { stepId: "1.2", role: "Datahub", action: "Svara", description: "Returnera aggregerad data.", refBRS: "BRS-DHV-743", refRule: "BRS743-2" }
      ]
    },
    {
      id: "MPS-DHV-24-Sc2",
      title: "Nätägare begär aggregerad data",
      description: "Scenario 6764: En nätägare begär aggregerad data för sitt nätområde.",
      steps: [
        { stepId: "2.1", role: "Nätägare", action: "Begär data", description: "Skicka förfrågan.", refBRS: "BRS-DHV-764", refRule: "BRS764-1" },
        { stepId: "2.2", role: "Datahub", action: "Svara", description: "Returnera aggregerad data.", refBRS: "BRS-DHV-764", refRule: "BRS764-2" }
      ]
    },
    {
      id: "MPS-DHV-24-Sc3",
      title: "Balansansvarig begär aggregerad data",
      description: "Scenario 6781: En BRP begär data för sina elleverantörer.",
      steps: [
        { stepId: "3.1", role: "BRP", action: "Begär data", description: "Skicka förfrågan.", refBRS: "BRS-DHV-781", refRule: "BRS781-1" },
        { stepId: "3.2", role: "Datahub", action: "Svara", description: "Returnera aggregerad data.", refBRS: "BRS-DHV-781", refRule: "BRS781-2" }
      ]
    }
  ]
};
