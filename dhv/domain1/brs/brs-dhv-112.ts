
import { BRSData } from '../../../types';
import { contentDhv113Input, contentDhv113Output } from '../../content-dhv-domain-1'; // Reusing dismantle content structure

export const brsDhv112: BRSData = {
  id: "BRS-DHV-112",
  title: "Avregistrera kundmätpunkt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare registrerar avveckling (dismantling) av en kundmätpunkt. Giltig från-datumet är inte begränsat i tid men måste avse ett passerat datum. Datahubben uppdaterar informationen.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-112: Avregistrera kundmätpunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Avregistrera (Dismantle)
    activate DHV
    DHV->>DHV: Validera regler

    alt Validering OK
        DHV->>DHV: Sätt status 'Dismantled'
        DHV-->>GO: Bekräftelse (Success)
    else Validering Fel
        DHV-->>GO: Felmeddelande (Error)
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS112-1", description: "En nätägare har avvecklat en kundmätpunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS112-2", description: "Status för kundmätpunkten har uppdaterats till 'Dismantled' från angivet datum." },
      { id: "BRS112-2b", description: "Status för avräkningspunkten har uppdaterats till 'Inactive'." },
      { id: "BRS112-3", description: "Datahubben har svarat med en bekräftelse (Success)." }
    ],
    rejected: [
      { id: "BRS112-4", description: "Datahubben har svarat med ett felmeddelande enligt affärsreglerna." }
    ]
  },
  businessRules: [
    { id: "BRS112-7", description: "Nätägaren måste vara nuvarande ägare av nätområdet.", errorCode: "E_MPM_3001_01" },
    { id: "BRS112-8", description: "Mätpunkts-ID måste existera i datahubben.", errorCode: "E_MPM_4001_01" },
    { id: "BRS112-9", description: "Mätpunktsstatus får inte vara 'Dismantled' vid tidpunkten för begäran.", errorCode: "E_MPM_9008_01" },
    { id: "BRS112-11", description: "Giltig från för avveckling måste vara vid ett dygnsskifte UTC+1.", errorCode: "E_MPM_0012_01" },
    { id: "BRS112-12", description: "Giltig från för avveckling måste vara senast vid föregående dygnsskifte.", errorCode: "E_MPM_9011_01" },
    { id: "BRS112-13", description: "Mätpunkten måste existera i datahubben vid datumet för avveckling.", errorCode: "E_MPM_4001_02" }
  ],
  process: [
    { id: "BRS112-20", description: "Nätägaren avvecklar en kundmätpunkt." },
    { id: "BRS112-21", description: "Datahubben svarar med en bekräftelse." },
    { id: "BRS112-15", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv113Input, contentDhv113Output]
};
