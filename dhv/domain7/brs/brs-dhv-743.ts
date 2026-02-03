
import { BRSData } from '../../../types';
import { contentDhv743Input, contentDhvAggregatedDataOutput } from '../../content-dhv-domain-7';

export const brsDhv743: BRSData = {
  id: "BRS-DHV-743",
  title: "Elleverantör begär aggregerade mätvärden",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Elleverantören begär aggregerade mätvärden för ett specifikt område och tidsperiod för att verifiera sin fakturering eller balans.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-743: Begär aggregerad data
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär aggregering (Period, Område)
    activate DHV
    DHV->>DHV: Validera behörighet
    
    alt Godkänd
        DHV-->>Ret: Aggregerade mätvärden
    else Avslag
        DHV-->>Ret: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS743-1", description: "Elleverantören har begärt aggregerade mätvärden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS743-2", description: "Datahubben har svarat med aggregerade mätvärden." }
    ],
    rejected: [
      { id: "BRS743-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS743-4", description: "Elleverantören måste ha en relation till nätområdet.", errorCode: "-" },
    { id: "BRS743-9", description: "Perioden får inte ligga i framtiden.", errorCode: "-" }
  ],
  process: [
    { id: "BRS743-5", description: "Elleverantören begär aggregerade mätvärden." },
    { id: "BRS743-6", description: "Datahubben levererar data." },
    { id: "BRS743-7", description: "Exception: Datahubben skickar felmeddelande." }
  ],
  infoObjects: [contentDhv743Input, contentDhvAggregatedDataOutput]
};
