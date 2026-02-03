
import { BRSData } from '../../../types';
import { contentDhvAggFeeRequestInput, contentDhvAggFeeOutput } from '../../content-dhv-domain-9';

export const brsDhv862: BRSData = {
  id: "BRS-DHV-862",
  title: "Nätägare begär aggregerade nätavgifter",
  status: "Legacy - Not implemented",
  tags: ["NON_DHV_2026"],
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare begär aggregerade nätavgifter för en viss månad och elleverantör.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-862: Nätägare begär aggregerade nätavgifter
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär aggregering (Månad, Elleverantör)
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV-->>GO: Aggregerade nätavgifter
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS862-1", description: "En nätägare har begärt aggregerade nätavgifter." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS862-2", description: "Aggregerade nätavgifter har distribuerats till nätägaren." }
    ],
    rejected: [
      { id: "BRS862-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS862-11", description: "Beräkningsmånaden måste vara i det förflutna.", errorCode: "The specified calculation month is in the future, it must be a month that has passed" },
    { id: "BRS862-12", description: "Angiven elleverantör (motpart) måste existera i datahubben.", errorCode: "The specified retailer counterpart does not exist in the data hub" }
  ],
  process: [
    { id: "BRS862-20", description: "Nätägaren begär aggregerade nätavgifter." },
    { id: "BRS862-21", description: "Datahubben svarar med aggregerade nätavgifter." },
    { id: "BRS862-22", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhvAggFeeRequestInput, contentDhvAggFeeOutput]
};
