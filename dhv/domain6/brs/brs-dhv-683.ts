
import { BRSData } from '../../../types';
import { contentDhvDistributionOutput } from '../../content-dhv-domain-6';

export const brsDhv683: BRSData = {
  id: "BRS-DHV-683",
  title: "ESCO tar emot mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur registrerade mätvärden distribueras till ESCO (om samtycke finns).",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-683: Distribution till ESCO
    participant DHV as Datahubben
    participant ESCO as ESCO

    Note over DHV: Trigger: BRS-DHV-6001 klar
    DHV->>ESCO: Distribuera mätvärden
    ESCO-->>DHV: Ack`,
  preConditions: [
    { id: "BRS683-1", description: "BRS-DHV-6001 har validerat och lagrat mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS683-2", description: "Datahubben har distribuerat mätvärden till ESCO med giltigt samtycke." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS683-5", description: "Datahubben distribuerar mätvärden till anslutna ESCOs." }
  ],
  infoObjects: [contentDhvDistributionOutput]
};
