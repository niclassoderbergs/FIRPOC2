
import { BRSData } from '../../../types';
import { contentDhvRequestCustomerInput, contentDhvCustomerOutput } from '../../content-dhv-domain-2';

export const brsDhv546: BRSData = {
  id: "BRS-DHV-546",
  title: "Elleverantör begär kundinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör begär aktuell kundinformation. Används vid osäkerhet om registrerade uppgifter.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-546: Begär kundinfo (Lev)
    participant Ret as Elleverantör
    participant DHV as Datahub

    Ret->>DHV: RequestCustomerInfo
    activate DHV
    DHV->>DHV: Validera relation
    
    alt Godkänd
        DHV-->>Ret: Kundinformation
    else Avslag
        DHV-->>Ret: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS546-1", description: "En elleverantör har begärt kundinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS546-2", description: "Datahubben har distribuerat kundinformationen till elleverantören." }
    ],
    rejected: [
      { id: "BRS546-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS546-7", description: "Angivet kund-ID måste existera i datahubben.", errorCode: "-" },
    { id: "BRS546-12", description: "Elleverantören måste ha en pågående eller framtida leverans för kunden.", errorCode: "-" }
  ],
  process: [
    { id: "BRS546-20", description: "Elleverantören begär kundinformation." },
    { id: "BRS546-21", description: "Elleverantören tar emot kundinformation." },
    { id: "BRS546-22", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvRequestCustomerInput, contentDhvCustomerOutput]
};
