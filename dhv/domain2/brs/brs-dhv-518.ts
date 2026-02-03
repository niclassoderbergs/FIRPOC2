
import { BRSData } from '../../../types';
import { contentDhv514Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv518: BRSData = {
  id: "BRS-DHV-518",
  title: "Ta bort kundleveransavtal",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör raderar ett kundleveransavtal.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-518: Ta bort avtal
    participant Ret as Elleverantör
    participant DHV as Datahub

    Ret->>DHV: DeleteContract
    activate DHV
    DHV->>DHV: Radera
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS518-1", description: "Leverantör raderar avtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS518-2", description: "Avtalet raderat." },
      { id: "BRS518-3", description: "Bekräftelse skickad." }
    ],
    rejected: [
      { id: "BRS518-4", description: "Felmeddelande skickas." }
    ]
  },
  businessRules: [
    { id: "BRS518-15", description: "Leverantören måste vara ansluten till leveransen.", errorCode: "E_DLV_3004_01" }
  ],
  process: [
    { id: "BRS518-20", description: "Leverantör raderar avtal." },
    { id: "BRS518-21", description: "Datahubben bekräftar." }
  ],
  infoObjects: [contentDhv514Input, contentDhvGenericOutput]
};
