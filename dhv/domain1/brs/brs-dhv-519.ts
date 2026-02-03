
import { BRSData } from '../../../types';
import { contentDhv519Input, contentDhv112Output } from '../../content-dhv-domain-1';

export const brsDhv519: BRSData = {
  id: "BRS-DHV-519",
  title: "Uppdatera kundmätpunkt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare uppdaterar information om en kundmätpunkt eller dess avräkningspunkt. Datahubben registrerar den uppdaterade informationen och skapar en ny version av mätpunkten. Används när en befintlig mätpunkt har ändrats.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-519: Uppdatera kundmätpunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: UpdateCustomerMeteringPoint (ID, Ändringar)
    activate DHV
    DHV->>DHV: Validering
    
    alt Godkänd
        DHV->>DHV: Registrera uppdatering / Ny version
        DHV-->>GO: Bekräftelse
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS519-1", description: "En nätägare har uppdaterat information för en kundmätpunkt eller en avräkningspunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS519-2", description: "Informationen om kundmätpunkten / avräkningspunkten har uppdaterats i datahubben." },
      { id: "BRS519-2b", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS519-3", description: "Datahubben har svarat med ett felmeddelande enligt affärsreglerna." }
    ]
  },
  businessRules: [
    { id: "BRS519-6", description: "Nätägaren måste vara nuvarande ägare av nätområdet.", errorCode: "E_MPM_3001_01" },
    { id: "BRS519-7", description: "Avräkningspunkts-ID för konsumtion måste vara samma som mätpunkts-ID.", errorCode: "E_MPM_0003_01" },
    { id: "BRS519-28", description: "Uppdateringens 'giltig från' måste vara vid ett dygnsskifte UTC+1.", errorCode: "E_MPM_0012_02" },
    { id: "BRS519-36", description: "Mätpunkten måste existera i datahubben vid det giltiga startdatumet.", errorCode: "E_MPM_4001_02" }
  ],
  process: [
    { id: "BRS519-30", description: "Nätägaren registrerar uppdaterad information för en kundmätpunkt eller avräkningspunkt." },
    { id: "BRS519-31", description: "Datahubben svarar med en bekräftelse." }
  ],
  infoObjects: [contentDhv519Input, contentDhv112Output]
};
