
import { BRSData } from '../../../types';
import { contentDhvNoContractInput, contentDhvNoContractOutput } from '../../content-dhv-domain-7';

export const brsDhv763: BRSData = {
  id: "BRS-DHV-763",
  title: "Nätägare begär mätvärden utan avtal",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Nätägaren kontrollerar förbrukning på anläggningar som saknar avtal.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  preConditions: [
    { id: "BRS763-1", description: "Nätägare begär data." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS763-2", description: "Datahubben svarar med mätvärden." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS763-7", description: "Begäran skickas." },
    { id: "BRS763-8", description: "Svar mottas." }
  ],
  infoObjects: [contentDhvNoContractInput, contentDhvNoContractOutput]
};
