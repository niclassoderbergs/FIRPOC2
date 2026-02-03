
import { BRSData } from '../../../types';
import { contentDhvRequestValuesInput, contentDhvDistributionOutput } from '../../content-dhv-domain-6';

export const brsDhv684: BRSData = {
  id: "BRS-DHV-684",
  title: "ESCO begär mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en ESCO begär historiska mätvärden. Kräver samtycke.",
  actors: [
    { role: "Initiator", description: "ESCO" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-684: Begär mätvärden (ESCO)
    participant ESCO as ESCO
    participant DHV as Datahubben

    ESCO->>DHV: Begär mätvärden
    activate DHV
    DHV->>DHV: Validera Samtycke
    DHV-->>ESCO: Mätvärden
    deactivate DHV`,
  preConditions: [
    { id: "BRS684-1", description: "ESCO har begärt mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS684-3", description: "Datahubben har returnerat mätvärden." }
    ],
    rejected: [
      { id: "BRS684-4", description: "Felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS684-9", description: "ESCO måste ha ett giltigt samtycke vid tidpunkten för begäran.", errorCode: "-" },
    { id: "BRS684-10", description: "Kunden måste ha haft en koppling till punkten under perioden.", errorCode: "-" }
  ],
  process: [
    { id: "BRS684-20", description: "ESCO begär mätvärden." },
    { id: "BRS684-21", description: "Datahubben svarar med mätvärden." }
  ],
  infoObjects: [contentDhvRequestValuesInput, contentDhvDistributionOutput]
};
