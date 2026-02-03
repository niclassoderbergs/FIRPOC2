
import { BRSData } from '../../../types';
import { contentDhv120Input, contentDhv120Output } from '../../content-dhv-domain-1'; // Reuse Exchange Point content

export const brsDhv113: BRSData = {
  id: "BRS-DHV-113",
  title: "Registrera utbytespunkt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare registrerar en utbytespunkt (Exchange Metering Point). En utbytespunkt består inte av några avräkningspunkter.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-113: Registrera utbytespunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Registrera utbytespunkt
    activate DHV
    DHV->>DHV: Validera data

    alt Validering OK
        DHV->>DHV: Registrera mätpunkt
        DHV-->>GO: Bekräftelse
    else Validering Fel
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS113-1", description: "En nätägare har registrerat en utbytespunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS113-2", description: "Datahubben har registrerat utbytespunkten." },
      { id: "BRS113-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS113-4", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS113-10", description: "Nätägaren måste vara ägare av nätområdet där utbytespunkten registreras.", errorCode: "E_MPM_3001_01" },
    { id: "BRS113-11", description: "Nätområdet måste existera i datahubben.", errorCode: "-" },
    { id: "BRS113-12", description: "Angränsande nätområde måste existera i datahubben.", errorCode: "-" },
    { id: "BRS113-13", description: "Utbytespunkts-ID får inte redan existera.", errorCode: "E_MPM_9007_01" },
    { id: "BRS113-14", description: "Adresskombinationen måste vara unik.", errorCode: "E_MPM_9006_01" },
    { id: "BRS113-15", description: "Utbytespunkts-ID måste vara en giltig GS1-kod.", errorCode: "E_MPM_0008_01" },
    { id: "BRS113-16", description: "Valid from måste vara inom perioden för retroaktivitet (12 dagar) och föregående dygnsskifte.", errorCode: "-" }
  ],
  process: [
    { id: "BRS113-20", description: "Nätägaren registrerar en utbytespunkt." },
    { id: "BRS113-21", description: "Datahubben svarar med en bekräftelse." },
    { id: "BRS113-22", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv120Input, contentDhv120Output]
};
