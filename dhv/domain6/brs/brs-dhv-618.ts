
import { BRSData } from '../../../types';
import { contentDhv617Input, contentDhvGenericOutput } from '../../content-dhv-domain-6';

export const brsDhv618: BRSData = {
  id: "BRS-DHV-618",
  title: "Begär detaljer om ej kompletta mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Ger nätägaren en lista på vilka mätpunkter som saknar värden eller har temporära värden.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-618: Ej kompletta mätvärden
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär detaljer
    DHV-->>GO: Lista på saknade värden`,
  preConditions: [
    { id: "BRS618-1", description: "Nätägare begär detaljer." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS618-3", description: "Datahubben returnerar detaljer." }
    ],
    rejected: [
      { id: "BRS618-4", description: "Felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS618-10b", description: "Måste vara nätägare för området.", errorCode: "-" },
    { id: "BRS618-10c", description: "Endast historik.", errorCode: "-" }
  ],
  process: [
    { id: "BRS618-20", description: "Nätägaren begär detaljer." },
    { id: "BRS618-21", description: "Datahubben svarar." }
  ],
  infoObjects: [contentDhv617Input, contentDhvGenericOutput]
};
