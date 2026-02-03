
import { BRSData } from '../../../types';
import { contentDhvRequestValuesInput, contentDhvDistributionOutput } from '../../content-dhv-domain-6';

export const brsDhv644: BRSData = {
  id: "BRS-DHV-644",
  title: "Elleverantör begär mätvärden",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör begär historiska mätvärden (t.ex. vid nytecknande eller verifiering).",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-644: Begär mätvärden (Lev)
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär mätvärden (Period)
    activate DHV
    DHV->>DHV: Validera relation
    DHV-->>Ret: Mätvärden
    deactivate DHV`,
  preConditions: [
    { id: "BRS644-1a", description: "Elleverantör begär mätvärden för specifik avräkningspunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS644-3a", description: "Datahubben har returnerat begärda mätvärden." }
    ],
    rejected: [
      { id: "BRS644-4", description: "Felmeddelande (t.ex. ingen relation)." }
    ]
  },
  businessRules: [
    { id: "BRS644-10", description: "Avräkningspunkten måste existera.", errorCode: "E_MVM_4000_01" },
    { id: "BRS644-13", description: "Starttid får inte vara senare än sluttid.", errorCode: "E_MVM_0002_01" }
  ],
  process: [
    { id: "BRS644-20", description: "Elleverantören begär mätvärden." },
    { id: "BRS644-21", description: "Datahubben svarar med mätvärden." }
  ],
  infoObjects: [contentDhvRequestValuesInput, contentDhvDistributionOutput]
};
