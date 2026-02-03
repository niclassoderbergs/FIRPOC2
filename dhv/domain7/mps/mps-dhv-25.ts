
import { MPSData } from '../../../types';

export const mpsDhv25: MPSData = {
  id: "MPS-DHV-25",
  title: "Begär mätvärden utan avtal",
  domain: "Domän 7: Nätavräkning",
  purpose: "Beskriver hur aktörer begär mätvärden för anläggningar som saknar avtal (t.ex. för att verifiera tomma anläggningar).",
  trigger: "Behov av att kontrollera förbrukning på avtalslösa anläggningar.",
  scenarios: [
    {
      id: "MPS-DHV-25-Sc1",
      title: "Elleverantör begär data utan avtal",
      description: "Scenario 6744: Elleverantör kontrollerar 'Accounting points without contract'.",
      steps: [
        { stepId: "1.1", role: "Elleverantör", action: "Begär data", description: "Skicka förfrågan.", refBRS: "BRS-DHV-744", refRule: "BRS744-1" },
        { stepId: "1.2", role: "Datahub", action: "Svara", description: "Returnera lista och mätvärden.", refBRS: "BRS-DHV-744", refRule: "BRS744-2" }
      ]
    },
    {
      id: "MPS-DHV-25-Sc2",
      title: "Nätägare begär data utan avtal",
      description: "Scenario 6763: Nätägare kontrollerar förbrukning på anläggningar utan avtal.",
      steps: [
        { stepId: "2.1", role: "Nätägare", action: "Begär data", description: "Skicka förfrågan.", refBRS: "BRS-DHV-763", refRule: "BRS763-1" },
        { stepId: "2.2", role: "Datahub", action: "Svara", description: "Returnera mätvärden.", refBRS: "BRS-DHV-763", refRule: "BRS763-2" }
      ]
    }
  ]
};
