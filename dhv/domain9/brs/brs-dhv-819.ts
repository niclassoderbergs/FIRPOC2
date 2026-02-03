
import { BRSData } from '../../../types';
import { contentDhv819Input, contentDhvGenericOutput } from '../../content-dhv-domain-9';

export const brsDhv819: BRSData = {
  id: "BRS-DHV-819",
  title: "Koppla nättariff till nätområde",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare kopplar en nättariff till ett nätområde (Metering Grid Area).",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-819: Koppla tariff till nätområde
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Koppla (Tariff-ID, MGA-ID)
    activate DHV
    DHV->>DHV: Validera ägarskap
    
    alt Godkänd
        DHV->>DHV: Skapa koppling
        DHV-->>GO: Bekräftelse
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS819-1", description: "En nätägare har registrerat en tariffkoppling till noll eller flera nätområden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS819-4", description: "Datahubben har registrerat kopplingen mellan nättariff och nätområden." },
      { id: "BRS819-5", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS819-8", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS819-10", description: "Tariff-ID måste existera i datahubben.", errorCode: "The grid tariff ID does not exist in the data hub" },
    { id: "BRS819-11", description: "Rapporterande nätägare måste vara ägare av angivna nätområden.", errorCode: "The reporting grid owner is not the owner of one or many of the specified metering grid area(s)" },
    { id: "BRS819-12", description: "Startdatum får inte vara tidigare än föregående dygnsskifte.", errorCode: "The validity start date is earlier than the previous day shift" },
    { id: "BRS819-13", description: "Slutdatum måste vara senare än startdatum.", errorCode: "The validity end date is earlier than the validity start date" }
  ],
  process: [
    { id: "BRS819-20", description: "Nätägaren registrerar koppling mellan tariff och nätområde." },
    { id: "BRS819-21", description: "Datahubben svarar med bekräftelse." },
    { id: "BRS819-25", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv819Input, contentDhvGenericOutput]
};
