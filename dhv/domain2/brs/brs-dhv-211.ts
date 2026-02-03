
import { BRSData } from '../../../types';
import { contentDhv211Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv211: BRSData = {
  id: "BRS-DHV-211",
  title: "Anmäl inflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör anmäler en inflyttning på en anläggning (Accounting Point). Datahubben skapar leveransstrukturen. Denna BRS är avsedd att användas när en kund önskar flytta in.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-211: Anmäl inflyttning
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Anmäler inflytt
    activate DHV
    DHV->>DHV: Validering
    
    alt Ingen aktiv kund
        DHV-->>Ret: Status 'confirmed'
    else Tillgänglig för kontrakt
        DHV-->>Ret: Status 'pending under construction'
    else Pågående leverans
        DHV-->>Ret: Status 'pending existing customer'
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS211-1", description: "En elleverantör har anmält en inflyttning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS211-2", description: "Datahubben har svarat med status 'confirmed' om det inte finns någon aktiv kund." },
      { id: "BRS211-2a", description: "Datahubben har svarat med status 'pending under construction' om anläggningen har status 'available for contract'." },
      { id: "BRS211-2b", description: "Datahubben har svarat med status 'pending existing customer' om anläggningen har en pågående leverans." },
      { id: "BRS211-2c", description: "Datahubben har skapat leveransinformation." }
    ],
    rejected: [
      { id: "BRS211-3", description: "Datahubben har svarat med felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS211-6", description: "Elleverantören får inte vara avstängd från att teckna nya avtal.", errorCode: "The specified retailer is suspended from signing new contracts" },
    { id: "BRS211-7", description: "Elleverantören måste ha ett giltigt nätavtal med nätägaren för anläggningen.", errorCode: "The specified retailer has no retailer grid contractwith the concerned grid owner" },
    { id: "BRS211-8", description: "Det måste finnas en balansansvarig (BRP) för elleverantören vid leveransstart.", errorCode: "The specified retailer has no balance responsible party registered in the data hub" },
    { id: "BRS211-9", description: "Anläggningen måste existera i datahubben.", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS211-10", description: "Anläggningens status måste vara aktiv eller tillgänglig för kontrakt.", errorCode: "The specified accounting point's status must be status active or available for contract" },
    { id: "BRS211-13a", description: "Det får inte redan finnas en inflytt med status 'pending existing customer'.", errorCode: "A move in with status pending due to existing customer already exists" },
    { id: "BRS211-19", description: "Startdatum får vara tidigast föregående dygnsskifte.", errorCode: "The specified start of delivery is too early, it can not be earlier than the previous day shift" },
    { id: "BRS211-20", description: "Startdatum måste vara inom sex månader.", errorCode: "The specified start of delivery is not within six months from the registration date" }
  ],
  process: [
    { id: "BRS211-24", description: "Elleverantören anmäler inflyttning." },
    { id: "BRS211-25", description: "Datahubben svarar med bekräftelse." },
    { id: "BRS211-26", description: "Datahubben svarar med status 'pending'." },
    { id: "BRS211-27", description: "Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv211Input, contentDhvGenericOutput]
};