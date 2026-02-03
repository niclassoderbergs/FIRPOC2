import { BRSData } from '../../../types';
import { contentDhv112Input, contentDhv112Output } from '../../content-dhv-domain-1';

export const brsDhv121: BRSData = {
  id: "BRS-DHV-121",
  title: "Uppdatera nätavtalsinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare uppdaterar nätavtalsinformation, t.ex. med ett slutdatum.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-121: Uppdatera nätavtal
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Uppdatera nätavtal
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
    { id: "BRS121-1", description: "Nätägaren har uppdaterat nätavtalsinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS121-2", description: "Datahubben har registrerat uppdateringen av nätavtalsinformationen." },
      { id: "BRS121-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS121-4", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS121-6", description: "Mätpunkts-ID måste existera.", errorCode: "E_MPM_4001_01" },
    { id: "BRS121-9", description: "Slutdatum måste vara senare än startdatum.", errorCode: "-" },
    { id: "BRS121-13", description: "Nätavtals-ID måste matcha det registrerade avtalet.", errorCode: "-" },
    { id: "BRS121-14", description: "Nätägaren måste vara ägare av mätpunkten.", errorCode: "-" }
  ],
  process: [
    { id: "BRS121-10", description: "Nätägaren uppdaterar tidigare registrerad nätavtalsinformation." },
    { id: "BRS121-11", description: "Datahubben svarar med en bekräftelse." },
    { id: "BRS121-12", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv112Input, contentDhv112Output]
};