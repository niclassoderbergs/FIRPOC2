
import { BRSData } from '../../../types';
import { contentDhv563Input, contentDhv563Output } from '../../content-dhv-domain-2';

export const brsDhv563: BRSData = {
  id: "BRS-DHV-563",
  title: "Nätägare begär leveransstruktur",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare begär information om kundleveransstrukturen, t.ex. för att verifiera vilka aktörer som är kopplade till en punkt.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-563: Begär leveransstruktur
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: RequestDeliveryStructure
    activate DHV
    DHV->>DHV: Validera Ägarskap
    
    alt Godkänd
        DHV-->>GO: Leveransstruktur
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS563-1", description: "En nätägare har begärt leveransstrukturinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS563-2", description: "Datahubben har skickat leveransstrukturinformation till nätägaren." }
    ],
    rejected: [
      { id: "BRS563-3", description: "Felmeddelande skickat." }
    ]
  },
  businessRules: [
    { id: "BRS563-4", description: "Avräkningspunkten måste existera.", errorCode: "E_DLV_4001_01" },
    { id: "BRS563-5", description: "Nätägaren måste vara ägare av nätområdet.", errorCode: "E_DLV_3003_01" }
  ],
  process: [
    { id: "BRS563-6", description: "Nätägaren begär leveransstruktur." },
    { id: "BRS563-7", description: "Datahubben svarar med leveransstruktur." },
    { id: "BRS563-8", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhv563Input, contentDhv563Output]
};
