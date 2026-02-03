
import { BRSData } from '../../../types';
import { contentDhv815Input, contentDhvGenericOutput } from '../../content-dhv-domain-9';

export const brsDhv816: BRSData = {
  id: "BRS-DHV-816",
  title: "Uppdatera nättariff",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare uppdaterar en nättariff, t.ex. vid prisändringar för en existerande tariff.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-816: Uppdatera nättariff
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Uppdatera tariff (816)
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV->>DHV: Uppdatera
        DHV-->>GO: Bekräftelse
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS816-1", description: "En nätägare har uppdaterat en nättariff." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS816-4", description: "Datahubben har uppdaterat nättariffen." },
      { id: "BRS816-5", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS816-8", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS816-10", description: "Tariff-ID måste existera i datahubben.", errorCode: "The grid tariff ID does not exist in the data hub" },
    { id: "BRS816-11", description: "Startdatum får inte vara tidigare än föregående dygnsskifte.", errorCode: "The validity start date is earlier than the previous day shift" },
    { id: "BRS816-12", description: "Slutdatum måste vara senare än startdatum.", errorCode: "The validity end date is earlier than the validity start date" }
  ],
  process: [
    { id: "BRS816-20", description: "Nätägaren uppdaterar nättariffen." },
    { id: "BRS816-21", description: "Datahubben svarar med bekräftelse." },
    { id: "BRS816-25", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv815Input, contentDhvGenericOutput]
};
