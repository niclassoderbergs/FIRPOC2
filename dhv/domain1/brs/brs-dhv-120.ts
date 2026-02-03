import { BRSData } from '../../../types';
import { contentDhv111Input, contentDhv111Output } from '../../content-dhv-domain-1'; // Using generic content as placeholder for contract info

export const brsDhv120: BRSData = {
  id: "BRS-DHV-120",
  title: "Registrera nätavtalsinformation",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare registrerar att ett separat nätavtal har tecknats, om detta krävs innan kunden tecknar elhandelsavtal.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-120: Registrera nätavtal
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Registrera nätavtal (Signed)
    activate DHV
    DHV->>DHV: Validera 'Need for contract'
    
    alt Validering OK
        DHV->>DHV: Registrera info
        DHV-->>GO: Bekräftelse
    else Validering Fel
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS120-1", description: "Nätägaren har registrerat nätavtalsinformation." },
    { id: "BRS111-Sc1", description: "Mätpunkten måste ha attributet 'Need for customer grid contract' satt till 'Yes'." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS120-2", description: "Datahubben har registrerat nätavtalsinformationen." },
      { id: "BRS120-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS120-4", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS120-6", description: "Mätpunkts-ID måste existera i datahubben.", errorCode: "E_MPM_4001_01" },
    { id: "BRS120-7", description: "Attributet 'Need for customer grid contract' måste vara 'Yes'.", errorCode: "-" },
    { id: "BRS120-8", description: "Giltig från får inte vara tidigare än föregående dygnsskifte.", errorCode: "-" },
    { id: "BRS120-9", description: "Giltig från måste vara inom 36 månader från registreringsdatum.", errorCode: "-" },
    { id: "BRS120-10", description: "Ett befintligt nätavtal måste ha ett slutdatum innan nytt kan registreras.", errorCode: "-" },
    { id: "BRS120-11", description: "Ett befintligt nätavtal får inte ha ett slutdatum senare än det nya avtalets startdatum.", errorCode: "-" },
    { id: "BRS120-12", description: "Nätägaren måste vara ägare av mätpunkten.", errorCode: "-" },
    { id: "BRS120-13", description: "Kund-ID måste följa angivet format.", errorCode: "-" }
  ],
  process: [
    { id: "BRS120-15", description: "Nätägaren registrerar att ett nätavtal är tecknat." },
    { id: "BRS120-16", description: "Datahubben svarar med en bekräftelse." },
    { id: "BRS120-17", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv111Input, contentDhv111Output]
};