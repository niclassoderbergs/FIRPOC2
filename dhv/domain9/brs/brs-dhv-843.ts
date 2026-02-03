
import { BRSData } from '../../../types';
import { contentDhvAggFeeRequestInput, contentDhvAggFeeOutput } from '../../content-dhv-domain-9';

export const brsDhv843: BRSData = {
  id: "BRS-DHV-843",
  title: "Elleverantör begär aggregerade nätavgifter",
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
  purpose: "Beskriver hur en elleverantör begär aggregerade nätavgifter för en viss månad och elleverantör.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-843: Elleverantör begär aggregerade nätavgifter
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär aggregering (Månad, Nätägare)
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV-->>Ret: Aggregerade nätavgifter
    else Avslag
        DHV-->>Ret: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS843-1", description: "En elleverantör har begärt aggregerade nätavgifter." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS843-2", description: "Aggregerade nätavgifter har distribuerats till elleverantören." }
    ],
    rejected: [
      { id: "BRS843-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS843-11", description: "Beräkningsmånaden måste vara i det förflutna.", errorCode: "The specified calculation month is in the future, it must be a month that has passed" },
    { id: "BRS843-12", description: "Angiven nätägare (motpart) måste existera i datahubben.", errorCode: "The specified grid owner counterpart does not exist in the data hub" }
  ],
  process: [
    { id: "BRS843-20", description: "Elleverantören begär aggregerade nätavgifter." },
    { id: "BRS843-21", description: "Datahubben svarar med aggregerade nätavgifter." },
    { id: "BRS843-22", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhvAggFeeRequestInput, contentDhvAggFeeOutput]
};
