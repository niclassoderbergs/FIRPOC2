
import { BRSData } from '../../../types';
import { contentDhvAggFeeOutput } from '../../content-dhv-domain-9';

export const brsDhv844: BRSData = {
  id: "BRS-DHV-844",
  title: "Elleverantör tar emot aggregerade nätavgifter",
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
  purpose: "Beskriver hur datahubben distribuerar aggregerade nätavgifter till berörda elleverantörer efter att aggregeringsprocessen (8000) har körts.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-844: Elleverantör tar emot aggregerade nätavgifter
    participant DHV as Datahubben
    participant Ret as Elleverantör

    Note over DHV: Trigger: BRS-DHV-8000
    DHV->>Ret: Aggregerade nätavgifter
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS844-1", description: "Datahubben har exekverat BRS-DHV-8000 (Datahubben aggregerar nätavgifter)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS844-2", description: "Aggregerade nätavgifter har distribuerats till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS844-5", description: "Datahubben skickar aggregerade nätavgifter till elleverantören." }
  ],
  infoObjects: [contentDhvAggFeeOutput]
};
