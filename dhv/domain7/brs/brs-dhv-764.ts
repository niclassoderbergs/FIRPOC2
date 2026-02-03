
import { BRSData } from '../../../types';
import { contentDhvNoContractInput, contentDhvAggregatedDataOutput } from '../../content-dhv-domain-7';

export const brsDhv764: BRSData = {
  id: "BRS-DHV-764",
  title: "Nätägare begär aggregerade mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Nätägaren begär aggregerade mätvärden från MGA-balansberäkningen.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  preConditions: [
    { id: "BRS764-1", description: "Nätägaren har begärt aggregerade mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS764-2", description: "Datahubben har skickat aggregerade mätvärden." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS764-7", description: "Nätägaren begär data." },
    { id: "BRS764-8", description: "Datahubben svarar." }
  ],
  infoObjects: [contentDhvNoContractInput, contentDhvAggregatedDataOutput]
};
