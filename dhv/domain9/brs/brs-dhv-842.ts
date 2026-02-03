
import { BRSData } from '../../../types';
import { contentDhvFeeRequestInput, contentDhv841Output } from '../../content-dhv-domain-9';

export const brsDhv842: BRSData = {
  id: "BRS-DHV-842",
  title: "Elleverantör begär nätavgift",
  status: "Legacy - Not implemented",
  tags: ["NON_DHV_2026"],
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör begär nätavgifter för en specifik anläggning och ett specifikt fakturadatum.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-842: Elleverantör begär nätavgift
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär nätavgift (AP-ID, Datum)
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV-->>Ret: Nätavgifter
    else Avslag
        DHV-->>Ret: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS842-1", description: "En elleverantör har begärt en nätavgift." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS842-2", description: "Nätavgiften har distribuerats till elleverantören." }
    ],
    rejected: [
      { id: "BRS842-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS842-11", description: "Anläggningen (Accounting Point) måste existera i datahubben vid fakturadatumet.", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS842-13", description: "Elleverantören måste ha en relation till anläggningen vid fakturadatumet.", errorCode: "The retailer is not connected to the specified accounting point at the requested invoice line date" },
    { id: "BRS842-14", description: "Det måste finnas en fakturarad vid det angivna datumet.", errorCode: "No invoice line can be found at the specified invoice line date" }
  ],
  process: [
    { id: "BRS842-20", description: "Elleverantören begär nätavgift." },
    { id: "BRS842-21", description: "Datahubben svarar med nätavgiften." },
    { id: "BRS842-22", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhvFeeRequestInput, contentDhv841Output]
};
