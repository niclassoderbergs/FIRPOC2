
import { BRSData } from '../../../types';
import { contentDhvAggFeeOutput, contentDhvGenericOutput } from '../../content-dhv-domain-9'; // Generic input placeholder

export const brsDhv8000: BRSData = {
  id: "BRS-DHV-8000",
  title: "Datahubben aggregerar nätavgifter",
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
  purpose: "Beskriver hur datahubben aggregerar nätavgifter. Detta sker den sjätte dagen varje månad. Funktionen summerar alla fakturarader som inkommit till datahubben sedan funktionen senast kördes. Aggregering görs per nätägare och elleverantör och används av nätägaren för att fakturera elleverantören.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-8000: Aggregering av nätavgifter
    participant Sys as System
    participant DB as Databas

    Note over Sys: Trigger: 6:e dagen i månaden
    Sys->>DB: Hämta nya fakturarader
    Sys->>Sys: Aggregera per GO och Retailer
    Sys->>DB: Spara aggregerat resultat
    Sys->>Sys: Trigger distribution (844/863)`,
  preConditions: [
    { id: "BRS8000-1", description: "Systemklockan i datahubben har startat processen." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS8000-2", description: "Datahubben har lagrat det aggregerade resultatet i datahubben." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS8000-3", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvAggFeeOutput]
};
