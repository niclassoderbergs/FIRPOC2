
import { BRSData } from '../../../types';
import { contentDhv562Input, contentDhv111Output } from '../../content-dhv-domain-1'; // Använder 111 output som generisk platshållare

export const brsDhv562: BRSData = {
  id: "BRS-DHV-562",
  title: "Nätägare begär information om kundmätpunkt",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare begär information om kundmätpunkt / avräkningspunkt från datahubben.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-562: Nätägare begär info
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: RequestInfo
    activate DHV
    DHV->>DHV: Validera Ägare
    DHV-->>GO: MP Information
    deactivate DHV`,
  preConditions: [
    { id: "BRS562-1", description: "En nätägare har begärt information om kundmätpunkt / avräkningspunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS562-2", description: "Information om kundmätpunkt / avräkningspunkt har distribuerats till nätägaren." }
    ],
    rejected: [
      { id: "BRS562-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS562-6", description: "Nätägaren måste vara nuvarande ägare av nätområdet.", errorCode: "E_MPM_3001_01" }
  ],
  process: [
    { id: "BRS562-10", description: "En nätägare begär information om kundmätpunkt / avräkningspunkt." },
    { id: "BRS562-11", description: "Datahubben svarar med information om mätpunkt / avräkningspunkt till nätägaren." }
  ],
  infoObjects: [contentDhv562Input]
};