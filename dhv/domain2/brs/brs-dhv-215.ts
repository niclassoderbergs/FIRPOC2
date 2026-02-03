
import { BRSData } from '../../../types';
import { contentDhv211Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv215: BRSData = {
  id: "BRS-DHV-215",
  title: "Anmäl leverantörsbyte",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör anmäler ett byte (switch) på en anläggning. Datahubben skapar leveransstrukturen. Används när en kund önskar byta elleverantör.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-215: Anmäl leverantörsbyte
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Anmäler byte
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS215-1", description: "En elleverantör har anmält ett leverantörsbyte." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS215-4", description: "Datahubben har skapat leveransinformation." },
      { id: "BRS215-4b", description: "Datahubben har uppdaterat befintlig leveransinformation." },
      { id: "BRS215-2", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS215-5", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS215-8", description: "Elleverantören får inte vara avstängd.", errorCode: "The specified retailer is suspended from signing new contracts" },
    { id: "BRS215-12", description: "Anläggningen måste ha status 'Aktiv' vid datumet för bytet.", errorCode: "The specified accounting point's status must be active" },
    { id: "BRS215-21a", description: "Startdatum måste vara minst 14 dagar framåt i tiden.", errorCode: "The specified start of delivery is too early, it can not be earlier than 14 days into the future" }
  ],
  process: [
    { id: "BRS215-25", description: "Elleverantören anmäler leverantörsbyte." },
    { id: "BRS215-26", description: "Datahubben bekräftar." },
    { id: "BRS215-27", description: "Datahubben skickar felmeddelande." }
  ],
  infoObjects: [contentDhv211Input, contentDhvGenericOutput]
};