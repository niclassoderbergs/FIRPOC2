
import { BRSData } from '../../../types';
import { contentDhv811Input, contentDhvGenericOutput } from '../../content-dhv-domain-9';

export const brsDhv811: BRSData = {
  id: "BRS-DHV-811",
  title: "Registrera nätavgift",
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
  purpose: "Beskriver hur en nätägare registrerar en nätavgift (Grid fee).",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-811: Registrera nätavgift
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Registrera nätavgift
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV->>DHV: Spara nätavgift
        DHV-->>GO: Bekräftelse
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS811-1", description: "En nätägare har registrerat en nätavgift i datahubben." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS811-2", description: "Datahubben har lagrat nätavgiften." },
      { id: "BRS811-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS811-4", description: "Datahubben har svarat med ett felmeddelande enligt affärsregler." }
    ]
  },
  businessRules: [
    { id: "BRS811-11", description: "Anläggningen (Accounting Point) måste existera i datahubben under fakturaradens period.", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS811-12", description: "Nätägaren måste vara ägare av nätområdet där anläggningen finns vid rapporteringstillfället.", errorCode: "The specified accounting point is located in a metering grid area not owned by the reporting grid owner" },
    { id: "BRS811-13", description: "Fakturaradsperioden får inte överlappa en leveransändring (byte, utflytt eller inflytt).", errorCode: "The specified invoice line period overlaps a retailer switch, a move out or a move in" },
    { id: "BRS811-14", description: "Om avtalstypen är anvisad leverans måste anläggningens status vara aktiv.", errorCode: "Grid fees can not be reported when the contract type is designated delivery and the accounting point's status is not active" }
  ],
  process: [
    { id: "BRS811-20", description: "Nätägaren registrerar en nätavgift." },
    { id: "BRS811-21", description: "Datahubben svarar med en bekräftelse." },
    { id: "BRS811-22", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv811Input, contentDhvGenericOutput]
};
