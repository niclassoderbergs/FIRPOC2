
import { BRSData } from '../../../types';
import { contentDhvRequestValuesInput, contentDhvDistributionOutput } from '../../content-dhv-domain-6';

export const brsDhv664: BRSData = {
  id: "BRS-DHV-664",
  title: "Nätägare begär mätvärden",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare begär mätvärden för att veta vad som registrerats i datahubben.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-664: Begär mätvärden (GO)
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär mätvärden
    activate DHV
    DHV->>DHV: Validera Ägare
    DHV-->>GO: Mätvärden
    deactivate DHV`,
  preConditions: [
    { id: "BRS664-1a", description: "Nätägare begär mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS664-3a", description: "Datahubben har returnerat begärda mätvärden." }
    ],
    rejected: [
      { id: "BRS664-4", description: "Felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS664-11", description: "Nätägaren måste vara ägare vid tidpunkten för mätvärdena.", errorCode: "E_MVM_3000_01" }
  ],
  process: [
    { id: "BRS664-20", description: "Nätägaren begär mätvärden." },
    { id: "BRS664-21", description: "Datahubben svarar med mätvärden." }
  ],
  infoObjects: [contentDhvRequestValuesInput, contentDhvDistributionOutput]
};
