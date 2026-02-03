
import { BRSData } from '../../../types';
import { contentDhvRequestCustomerInput, contentDhvCustomerOutput } from '../../content-dhv-domain-2';

export const brsDhv569: BRSData = {
  id: "BRS-DHV-569",
  title: "Nätägare begär kundinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare begär aktuell kundinformation. Används för att verifiera kunddata.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-569: Begär kundinfo (GO)
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: RequestCustomerInfo
    activate DHV
    DHV->>DHV: Validera relation (Leverans i nätområde)
    
    alt Godkänd
        DHV-->>GO: Kundinformation
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS569-1", description: "En nätägare har begärt kundinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS569-2", description: "Datahubben har distribuerat kundinformation till nätägaren." }
    ],
    rejected: [
      { id: "BRS569-3", description: "Felmeddelande skickat." }
    ]
  },
  businessRules: [
    { id: "BRS569-7", description: "Kund-ID måste existera i datahubben.", errorCode: "-" },
    { id: "BRS569-13", description: "Kunden måste ha en pågående eller framtida leverans inom nätägarens område.", errorCode: "-" }
  ],
  process: [
    { id: "BRS569-20", description: "Nätägaren begär kundinformation." },
    { id: "BRS569-21", description: "Nätägaren tar emot kundinformation." },
    { id: "BRS569-22", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvRequestCustomerInput, contentDhvCustomerOutput]
};
