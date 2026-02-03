import { BRSData } from '../../../types';
import { contentDhv611Input, contentDhv611Output } from '../../content-dhv-domain-6';

export const brsDhv611: BRSData = {
  id: "BRS-DHV-611",
  title: "Registrera mätvärden",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare registrerar mätvärden för en eller flera observationsperioder. Mätvärden består av både energikvantiteter (för avräkning) och mätarställningar (för kundinformation).",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-611: Registrera mätvärden
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Registrera mätvärden
    activate DHV
    DHV->>DHV: Syntaxvalidering
    
    alt OK
        DHV->>DHV: Spara & Validera (6001)
        DHV-->>GO: Accepterad (vidare behandling)
    else Fel
        DHV-->>GO: Syntaxfel
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS611-1", description: "Nätägaren har registrerat mätvärden för en eller flera mätpunkter." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS611-5", description: "Datahubben har svarat att meddelandet är accepterat." }
    ],
    rejected: [
      { id: "BRS611-8", description: "Datahubben har svarat med syntaxfel." }
    ]
  },
  businessRules: [
    { id: "BRS611-10", description: "Varje observationsperiod måste innehålla ett transaktions-ID.", errorCode: "E_MVM_0013_01" }
  ],
  process: [
    { id: "BRS611-20", description: "Nätägaren registrerar mätvärden." },
    { id: "BRS611-21", description: "Datahubben bekräftar mottagandet." },
    { id: "BRS611-25", description: "Datahubben svarar med syntaxfel." }
  ],
  infoObjects: [contentDhv611Input, contentDhv611Output]
};