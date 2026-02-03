
import { BRSData } from '../../../types';
import { contentDhv201Input, contentDhv201Output } from '../../content-dhv-domain-2';

export const brsDhv201: BRSData = {
  id: "BRS-DHV-201",
  title: "Begär avräkningspunkts-ID",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör begär avräkningspunkts-ID (Accounting Point ID) genom att ange kundens adress. Denna process är endast avsedd att användas när en kund är på väg att flytta in och ännu inte har tillgång till det nya anläggnings-ID:t. Den ska inte användas för att bistå en kund vid leverantörsbyte (switch).",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-201: Begär avräkningspunkts-ID
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär AP ID (Adress)
    activate DHV
    DHV->>DHV: Validering
    
    alt Adress Unik
        DHV-->>Ret: Avräkningspunkts-ID
    else Adress Ej Unik
        DHV-->>Ret: Fel/Flera träffar
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS201-1", description: "Elleverantören har begärt avräkningspunkts-ID genom att ange en adress." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS201-3a", description: "Datahubben har svarat med ett avräkningspunkts-ID om adressen var unik." },
      { id: "BRS201-3b", description: "Datahubben har svarat med ett meddelande om att adressen inte är unik och behöver specificeras ytterligare." }
    ],
    rejected: [
      { id: "BRS201-4", description: "Datahubben har svarat med ett felmeddelande enligt affärsreglerna." }
    ]
  },
  businessRules: [
    { id: "BRS201-7", description: "Elleverantören får inte vara avstängd från att teckna nya avtal.", errorCode: "The specified retailer is suspended from signing new contracts" },
    { id: "BRS201-8", description: "Begäran måste göras av en elleverantör.", errorCode: "The request is not made by a retailer" },
    { id: "BRS201-9", description: "Mätpunktsadressen måste finnas i datahubben.", errorCode: "The metering point address does not exist in the data hub" },
    { id: "BRS201-11", description: "Adressen måste vara tillräckligt detaljerad för att ge en unik träff.", errorCode: "To many accounting points were found on the address. Enter more details about the address to narrow the search." }
  ],
  process: [
    { id: "BRS201-12", description: "Elleverantören begär avräkningspunkts-ID genom att ange en adress." },
    { id: "BRS201-13", description: "Datahubben svarar med ett lyckat resultat." },
    { id: "BRS201-14", description: "Elleverantören begär avräkningspunkts-ID." },
    { id: "BRS201-15", description: "Datahubben svarar med maskerade IDn och uppmanar till mer detaljerad adress." },
    { id: "BRS201-16", description: "Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv201Input, contentDhv201Output]
};