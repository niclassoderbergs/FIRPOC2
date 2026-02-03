
import { BRSData } from '../../../types';
import { contentDhv202Input, contentDhv202Output } from '../../content-dhv-domain-2';

export const brsDhv202: BRSData = {
  id: "BRS-DHV-202",
  title: "Begär stamdata före inflytt",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en tillträdande elleverantör begär stamdata (master data) innan inflyttning av en kund. Leverantören begär informationen för att kunna ge kunden ett erbjudande. Denna process är endast avsedd att användas när en kund ska flytta in och leverantören har kännedom om anläggnings-ID. Den ska inte användas vid leverantörsbyten.",
  actors: [
    { role: "Initiator", description: "Tillträdande Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-202: Begär stamdata före inflytt
    participant Ret as Tillträdande Lev
    participant DHV as Datahubben

    Ret->>DHV: Begär stamdata
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Stamdata
    deactivate DHV`,
  preConditions: [
    { id: "BRS202-1", description: "En elleverantör har begärt stamdata före inflyttning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS202-2", description: "Datahubben har svarat med stamdatainformation." }
    ],
    rejected: [
      { id: "BRS202-5", description: "Datahubben har svarat med ett felmeddelande enligt affärsreglerna." }
    ]
  },
  businessRules: [
    { id: "BRS202-10", description: "Anläggningen (Accounting Point) måste existera i datahubben.", errorCode: "The specified accounting point does not exist in the data hub" }
  ],
  process: [
    { id: "BRS202-15", description: "Elleverantören begär stamdata." },
    { id: "BRS202-16", description: "Datahubben svarar med stamdata till elleverantören." },
    { id: "BRS202-18", description: "Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv202Input, contentDhv202Output]
};