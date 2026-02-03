
import { BRSData } from '../../../types';
import { contentDhv612Output } from '../../content-dhv-domain-6';

export const brsDhv612: BRSData = {
  id: "BRS-DHV-612",
  title: "Nätägare tar emot mätvärdeskvittens",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Beskriver hur nätägaren tar emot en kvittens (acknowledgement) på tidigare inskickade mätvärden. Kvittensen innehåller resultatet av valideringen som gjordes i BRS-DHV-6001.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-612: Mätvärdeskvittens
    participant DHV as Datahubben
    participant GO as Nätägare

    Note over DHV: Trigger: BRS-DHV-6001 klar
    DHV->>GO: Skicka Kvittens (Ack/Nack)
    activate GO
    GO-->>DHV: Bekräftelse
    deactivate GO`,
  preConditions: [
    { id: "BRS612-1", description: "Validering av mätvärden har utförts via BRS-DHV-6001." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS612-5", description: "Datahubben har skickat mätvärdeskvittens till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS612-10", description: "Datahubben skickar mätvärdeskvittens till nätägaren." }
  ],
  infoObjects: [contentDhv612Output]
};
