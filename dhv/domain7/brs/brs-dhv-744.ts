
import { BRSData } from '../../../types';
import { contentDhvNoContractInput, contentDhvNoContractOutput } from '../../content-dhv-domain-7';

export const brsDhv744: BRSData = {
  id: "BRS-DHV-744",
  title: "Elleverantör begär mätvärden utan avtal",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Elleverantör begär data för anläggningar som saknar avtal.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  preConditions: [
    { id: "BRS744-1", description: "Elleverantören har begärt mätvärden för anläggningar utan avtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS744-2", description: "Datahubben har svarat med mätvärden." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS744-5", description: "Begäran skickas." },
    { id: "BRS744-6", description: "Svar mottas." }
  ],
  infoObjects: [contentDhvNoContractInput, contentDhvNoContractOutput]
};
