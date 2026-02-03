
import { BRSData } from '../../../types';
import { contentDhv520Input, contentDhv112Output } from '../../content-dhv-domain-1';

export const brsDhv520: BRSData = {
  id: "BRS-DHV-520",
  title: "Uppdatera utbytespunkt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare uppdaterar information om en utbytespunkt. Datahubben uppdaterar informationen.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-520: Uppdatera utbytespunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: UpdateExchangeMeteringPoint
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV->>DHV: Uppdatera information
        DHV-->>GO: Bekräftelse
    else Avslag
        DHV-->>GO: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS520-1", description: "En nätägare har uppdaterat information för en utbytespunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS520-2", description: "Informationen om utbytespunkten har uppdaterats i datahubben." },
      { id: "BRS520-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS520-4", description: "Datahubben har svarat med ett felmeddelande enligt affärsreglerna." }
    ]
  },
  businessRules: [
    { id: "BRS520-10", description: "Nätägaren måste vara ägare av nätområdet.", errorCode: "E_MPM_3001_01" },
    { id: "BRS520-11", description: "Nätområdet måste existera i datahubben.", errorCode: "-" }
  ],
  process: [
    { id: "BRS520-30", description: "Nätägaren uppdaterar information för en utbytespunkt." },
    { id: "BRS520-31", description: "Datahubben svarar med en bekräftelse." }
  ],
  infoObjects: [contentDhv520Input, contentDhv112Output]
};
