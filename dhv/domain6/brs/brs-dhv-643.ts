
import { BRSData } from '../../../types';
import { contentDhvDistributionOutput } from '../../content-dhv-domain-6';

export const brsDhv643: BRSData = {
  id: "BRS-DHV-643",
  title: "Elleverantör tar emot mätvärden",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Beskriver hur registrerade mätvärden distribueras till elleverantören.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-643: Distribution till Lev
    participant DHV as Datahubben
    participant Ret as Elleverantör

    Note over DHV: Trigger: BRS-DHV-6001 klar
    DHV->>Ret: Distribuera mätvärden
    Ret-->>DHV: Ack`,
  preConditions: [
    { id: "BRS643-1", description: "BRS-DHV-6001 har validerat och lagrat mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS643-2", description: "Datahubben har distribuerat mätvärden (Active/Reactive In/Out) till relevant elleverantör." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS643-5", description: "Datahubben distribuerar mätvärden till anslutna elleverantörer." }
  ],
  infoObjects: [contentDhvDistributionOutput]
};
