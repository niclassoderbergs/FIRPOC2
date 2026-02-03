
import { BRSData } from '../../../types';
import { contentDhv114Input, contentDhv114Output } from '../../content-dhv-domain-1';

export const brsDhv123: BRSData = {
  id: "BRS-DHV-123",
  title: "Begär nätavtalsinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare begär information från datahubben om registrerade nätavtal.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-123: Begär nätavtalsinfo
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Begär info
    activate DHV
    DHV->>DHV: Validera
    DHV-->>GO: Nätavtalsinformation
    deactivate DHV`,
  preConditions: [
    { id: "BRS123-1", description: "En nätägare har begärt nätavtalsinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS123-2", description: "Nätavtalsinformation har distribuerats till nätägaren." },
      { id: "BRS123-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS123-4", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS123-5", description: "Mätpunkts-ID måste existera.", errorCode: "E_MPM_4001_01" },
    { id: "BRS123-6", description: "Attributet 'Need for customer grid contract' måste vara 'Yes'.", errorCode: "-" },
    { id: "BRS123-7", description: "Nätägaren måste vara ägare av mätpunkten.", errorCode: "-" }
  ],
  process: [
    { id: "BRS123-10", description: "Nätägaren begär nätavtalsinformation." },
    { id: "BRS123-11", description: "Datahubben svarar med nätavtalsinformation." },
    { id: "BRS123-12", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv114Input, contentDhv114Output]
};