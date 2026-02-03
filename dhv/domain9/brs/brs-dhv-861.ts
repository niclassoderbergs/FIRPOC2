
import { BRSData } from '../../../types';
import { contentDhvFeeRequestInput, contentDhv811Input } from '../../content-dhv-domain-9'; // Reuse 811 input structure as output

export const brsDhv861: BRSData = {
  id: "BRS-DHV-861",
  title: "Nätägare begär nätavgift",
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
  purpose: "Beskriver hur en nätägare begär nätavgifter för en specifik anläggning och ett specifikt fakturadatum.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-861: Nätägare begär nätavgift
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär nätavgift (AP-ID, Datum)
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV-->>GO: Nätavgifter
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS861-1", description: "En nätägare har begärt en nätavgift." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS861-2", description: "Nätavgiften har distribuerats till nätägaren." }
    ],
    rejected: [
      { id: "BRS861-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS861-11", description: "Anläggningen (Accounting Point) måste existera i datahubben vid fakturadatumet.", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS861-13", description: "Nätägaren måste, vid fakturadatumet, vara ägare av nätområdet där anläggningen finns.", errorCode: "The specified accounting point is not located in a metering grid area owned by the grid owner at the requested invoice line date" },
    { id: "BRS861-14", description: "Det måste finnas en fakturarad vid det angivna datumet.", errorCode: "No invoice line can be found at the specified invoice line date" }
  ],
  process: [
    { id: "BRS861-20", description: "Nätägaren begär nätavgift." },
    { id: "BRS861-21", description: "Datahubben svarar med nätavgiften." },
    { id: "BRS861-22", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhvFeeRequestInput, contentDhv811Input]
};
