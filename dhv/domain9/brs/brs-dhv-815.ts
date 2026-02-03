import { BRSData } from '../../../types';
import { contentDhv815Input, contentDhvGenericOutput } from '../../content-dhv-domain-9';

export const brsDhv815: BRSData = {
  id: "BRS-DHV-815",
  title: "Registrera nättariff",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare registrerar en nättariff. En nättariff är en prislista bestående av tariffelement som tillsammans beskriver kostnaden eller ersättningen för att nyttja nätet.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-815: Registrera nättariff
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Registrera tariff (815)
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV->>DHV: Spara tariff
        DHV-->>GO: Bekräftelse
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS815-1", description: "En nätägare har registrerat en nättariff." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS815-4", description: "Datahubben har registrerat nättariffen." },
      { id: "BRS815-5", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS815-8", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS815-10", description: "Tariff-ID får inte redan existera i datahubben.", errorCode: "The grid tariff identifier already exists in the data hub" },
    { id: "BRS815-11", description: "Startdatum får inte vara tidigare än föregående dygnsskifte.", errorCode: "The validity start date is earlier than the previous day shift" }
  ],
  process: [
    { id: "BRS815-20", description: "Nätägaren registrerar en nättariff." },
    { id: "BRS815-21", description: "Datahubben svarar med bekräftelse." },
    { id: "BRS815-25", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv815Input, contentDhvGenericOutput]
};