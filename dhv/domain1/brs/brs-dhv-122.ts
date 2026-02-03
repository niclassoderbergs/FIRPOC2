
import { BRSData } from '../../../types';
import { contentDhv113Input, contentDhv113Output } from '../../content-dhv-domain-1';

export const brsDhv122: BRSData = {
  id: "BRS-DHV-122",
  title: "Ta bort nätavtalsinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en nätägare tar bort nätavtalsinformation, t.ex. om det registrerats felaktigt eller om kunden ångrat sig.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-122: Ta bort nätavtal
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Ta bort nätavtal
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV->>DHV: Ta bort
        DHV-->>GO: Bekräftelse
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS122-1", description: "Nätägaren har tagit bort nätavtalsinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS122-2", description: "Datahubben har registrerat borttagning av nätavtalsinformationen." },
      { id: "BRS122-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS122-4", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS122-6", description: "Mätpunkts-ID måste existera.", errorCode: "E_MPM_4001_01" },
    { id: "BRS122-12", description: "Nätavtals-ID måste matcha det registrerade avtalet.", errorCode: "-" },
    { id: "BRS122-13", description: "Nätägaren måste vara ägare av mätpunkten.", errorCode: "-" }
  ],
  process: [
    { id: "BRS122-9", description: "Nätägaren tar bort tidigare registrerad nätavtalsinformation." },
    { id: "BRS122-10", description: "Datahubben svarar med en bekräftelse." },
    { id: "BRS122-11", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv113Input, contentDhv113Output]
};