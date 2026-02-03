
import { BRSData } from '../../../types';
import { contentDhv514Input, contentDhvGenericOutput } from '../../content-dhv-domain-2'; // Återanvänder input struktur

export const brsDhv515: BRSData = {
  id: "BRS-DHV-515",
  title: "Uppdatera kundleveransavtal",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör uppdaterar ett kundleveransavtal.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-515: Uppdatera avtal
    participant Ret as Elleverantör
    participant DHV as Datahub

    Ret->>DHV: UpdateContract
    activate DHV
    DHV->>DHV: Uppdatera
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS515-1", description: "Leverantör uppdaterar avtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS515-2", description: "Avtalet uppdaterat." },
      { id: "BRS515-3", description: "Bekräftelse skickad." }
    ],
    rejected: [
      { id: "BRS515-4", description: "Felmeddelande skickas." }
    ]
  },
  businessRules: [
    { id: "BRS515-19", description: "Leverantören måste vara ansluten till leveransen.", errorCode: "E_DLV_3004_01" }
  ],
  process: [
    { id: "BRS515-20", description: "Leverantör uppdaterar avtal." },
    { id: "BRS515-21", description: "Datahubben bekräftar." }
  ],
  infoObjects: [contentDhv514Input, contentDhvGenericOutput]
};
