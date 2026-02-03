
import { BRSData } from '../../../types';
import { contentDhvNoContractInput, contentDhvAggregatedDataOutput } from '../../content-dhv-domain-7';

export const brsDhv781: BRSData = {
  id: "BRS-DHV-781",
  title: "BRP begär aggregerade mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Balansansvarig begär aggregerade mätvärden för sina ansvarsområden.",
  actors: [
    { role: "Initiator", description: "BRP" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  preConditions: [
    { id: "BRS781-1", description: "BRP har begärt data." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS781-2", description: "Datahubben har skickat data." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS781-10", description: "BRP begär data." },
    { id: "BRS781-11", description: "Datahubben svarar." }
  ],
  infoObjects: [contentDhvNoContractInput, contentDhvAggregatedDataOutput]
};
