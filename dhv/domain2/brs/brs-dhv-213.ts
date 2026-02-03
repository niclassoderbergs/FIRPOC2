
import { BRSData } from '../../../types';
import { contentDhv213Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv213: BRSData = {
  id: "BRS-DHV-213",
  title: "Anmäl utflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör anmäler en utflyttning på en anläggning. En elleverantör har också möjlighet att justera en redan anmäld utflyttning. Används när kunden önskar flytta ut.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-213: Anmäl utflytt
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Anmäler utflytt
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS213-1", description: "En elleverantör har anmält en utflyttning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS213-3", description: "Datahubben har uppdaterat leveransinformationen." },
      { id: "BRS213-2", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS213-5", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS213-13", description: "Anläggningen måste existera i datahubben.", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS213-14", description: "Leverans-ID måste vara kopplat till anläggningen.", errorCode: "The specified delivery ID is not connected to the accounting point" },
    { id: "BRS213-15", description: "Elleverantören måste vara kopplad till leverans-ID.", errorCode: "The specified retailer is not connected to the specified delivery identifier" },
    { id: "BRS213-16", description: "Slutdatum får inte vara tidigare än nästa dygnsskifte från registreringsdatum.", errorCode: "The specified end of delivery is earlier than the next day shift from the registration date" }
  ],
  process: [
    { id: "BRS213-25", description: "Elleverantören anmäler utflyttning." },
    { id: "BRS213-26", description: "Datahubben svarar med bekräftelse." },
    { id: "BRS213-30", description: "Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv213Input, contentDhvGenericOutput]
};