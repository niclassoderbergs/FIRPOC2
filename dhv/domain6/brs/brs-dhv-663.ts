
import { BRSData } from '../../../types';
import { contentDhvDistributionOutput } from '../../content-dhv-domain-6';

export const brsDhv663: BRSData = {
  id: "BRS-DHV-663",
  title: "Angränsande nätägare tar emot mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur registrerade mätvärden distribueras till angränsande nätägare (för utbytespunkter).",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Angränsande Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-663: Distribution till Granne
    participant DHV as Datahubben
    participant AdjGO as Angr. Nätägare

    Note over DHV: Trigger: BRS-DHV-6001 klar
    DHV->>AdjGO: Distribuera mätvärden
    AdjGO-->>DHV: Ack`,
  preConditions: [
    { id: "BRS663-1", description: "BRS-DHV-6001 har validerat och lagrat mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS663-2", description: "Datahubben har distribuerat mätvärden till angränsande nätägare." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS663-5", description: "Datahubben distribuerar mätvärden till angränsande nätägare." }
  ],
  infoObjects: [contentDhvDistributionOutput]
};
