
import { BRSData } from '../../../types';
import { contentDhvPrognosisInput, contentDhvPrognosisOutput } from '../../content-dhv-domain-6';

export const brsDhv642: BRSData = {
  id: "BRS-DHV-642",
  title: "Elleverantör begär mätvärdesprognos",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör begär en prognos över mätvärden. Prognosen är aggregerad per månad och består av 12 månadsvärden. Används t.ex. vid inflytt eller leverantörsbyte.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-642: Begär prognos
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär prognos
    activate DHV
    DHV->>DHV: Beräkna (6002)
    DHV-->>Ret: 12 månaders prognos
    deactivate DHV`,
  preConditions: [
    { id: "BRS642-1", description: "En elleverantör har begärt mätvärdesprognos." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS642-3", description: "Datahubben har svarat med 12 månatliga prognosvärden." }
    ],
    rejected: [
      { id: "BRS642-4", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS642-6", description: "Elleverantören måste ha en pågående eller framtida leverans.", errorCode: "E_MVM_3000_05" },
    { id: "BRS642-8", description: "Anläggnings-ID måste existera.", errorCode: "E_MVM_4000_01" }
  ],
  process: [
    { id: "BRS642-10", description: "Elleverantören begär prognos." },
    { id: "BRS642-11", description: "Datahubben svarar med prognos." },
    { id: "BRS642-12", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvPrognosisInput, contentDhvPrognosisOutput]
};
