
import { BRSData } from '../../../types';
import { contentDhvPrognosisInput, contentDhvPrognosisOutput } from '../../content-dhv-domain-6';

export const brsDhv682: BRSData = {
  id: "BRS-DHV-682",
  title: "ESCO begär mätvärdesprognos",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en ESCO begär prognos. Kräver samtycke.",
  actors: [
    { role: "Initiator", description: "ESCO" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-682: Begär prognos (ESCO)
    participant ESCO as ESCO
    participant DHV as Datahubben

    ESCO->>DHV: Begär prognos
    activate DHV
    DHV->>DHV: Validera Samtycke
    DHV->>DHV: Beräkna (6002)
    DHV-->>ESCO: Prognos
    deactivate DHV`,
  preConditions: [
    { id: "BRS682-1b", description: "ESCO har begärt prognos." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS682-3", description: "Datahubben har svarat med 12 månatliga prognosvärden." }
    ],
    rejected: [
      { id: "BRS682-4", description: "Felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS682-7", description: "ESCO måste ha ett giltigt samtycke.", errorCode: "-" }
  ],
  process: [
    { id: "BRS682-10", description: "ESCO begär prognos." },
    { id: "BRS682-11", description: "Datahubben svarar med prognos." }
  ],
  infoObjects: [contentDhvPrognosisInput, contentDhvPrognosisOutput]
};
