
import { BRSData } from '../../../types';
import { contentDhv514Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv514: BRSData = {
  id: "BRS-DHV-514",
  title: "Registrera kundleveransavtal",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör registrerar ett nytt kundleveransavtal. Används t.ex. vid förlängning.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-514: Registrera avtal
    participant Ret as Elleverantör
    participant DHV as Datahub

    Ret->>DHV: RegisterContract
    activate DHV
    DHV->>DHV: Spara kontrakt
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS514-1", description: "Leverantör registrerar avtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS514-2", description: "Avtalet skapat." },
      { id: "BRS514-3", description: "Bekräftelse skickad." }
    ],
    rejected: [
      { id: "BRS514-4", description: "Felmeddelande skickas." }
    ]
  },
  businessRules: [
    { id: "BRS514-10", description: "Leverantören måste vara ansluten till leveransen.", errorCode: "E_DLV_3004_01" }
  ],
  process: [
    { id: "BRS514-20", description: "Leverantör registrerar avtal." },
    { id: "BRS514-21", description: "Datahubben bekräftar." }
  ],
  infoObjects: [contentDhv514Input, contentDhvGenericOutput]
};
