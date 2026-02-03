
import { BRSData } from '../../../types';
import { contentDhv113Input, contentDhv113Output } from '../../content-dhv-domain-1'; // Reuse Dismantle content

export const brsDhv114: BRSData = {
  id: "BRS-DHV-114",
  title: "Avregistrera utbytespunkt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare registrerar avveckling (dismantling) av en utbytespunkt. Datahubben uppdaterar informationen.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-114: Avregistrera utbytespunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Avregistrera utbytespunkt
    activate DHV
    DHV->>DHV: Validera

    alt Validering OK
        DHV->>DHV: Sätt status 'Dismantled'
        DHV-->>GO: Bekräftelse
    else Validering Fel
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS114-1", description: "En nätägare har avvecklat en utbytespunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS114-2", description: "Status för utbytespunkten har uppdaterats till 'Dismantled' i datahubben." },
      { id: "BRS114-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS114-4", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS114-10", description: "Nätägaren måste vara ägare av nätområdet där utbytespunkten är registrerad.", errorCode: "E_MPM_3001_01" },
    { id: "BRS114-11", description: "Utbytespunkts-ID måste existera i datahubben.", errorCode: "E_MPM_4001_01" },
    { id: "BRS114-12", description: "Status får inte redan vara 'Dismantled'.", errorCode: "E_MPM_9008_01" }
  ],
  process: [
    { id: "BRS114-20", description: "Nätägaren avvecklar en utbytespunkt." },
    { id: "BRS114-21", description: "Datahubben svarar med en bekräftelse." },
    { id: "BRS114-25", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv113Input, contentDhv113Output]
};
