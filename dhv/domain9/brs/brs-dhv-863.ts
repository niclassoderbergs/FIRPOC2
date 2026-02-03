
import { BRSData } from '../../../types';
import { contentDhvAggFeeOutput } from '../../content-dhv-domain-9';

export const brsDhv863: BRSData = {
  id: "BRS-DHV-863",
  title: "Nätägare tar emot aggregerade nätavgifter",
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
  purpose: "Beskriver hur datahubben distribuerar aggregerade nätavgifter till den berörda nätägaren efter att aggregeringsprocessen (8000) har körts.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-863: Nätägare tar emot aggregerade nätavgifter
    participant DHV as Datahubben
    participant GO as Nätägare

    Note over DHV: Trigger: BRS-DHV-8000
    DHV->>GO: Aggregerade nätavgifter
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS863-1", description: "Datahubben har exekverat BRS-DHV-8000 (Datahubben aggregerar nätavgifter)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS863-2", description: "Aggregerade nätavgifter har distribuerats till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS863-5", description: "Datahubben skickar aggregerade nätavgifter till nätägaren." }
  ],
  infoObjects: [contentDhvAggFeeOutput]
};
