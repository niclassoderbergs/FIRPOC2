
import { BRSData } from '../../../types';
import { contentDhv7000Output } from '../../content-dhv-domain-7';

export const brsDhv7019: BRSData = {
  id: "BRS-DHV-7019",
  title: "Datahubben beräknar korrigeringsavräkning",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beräknar korrigeringsenergi och kostnader baserat på skillnaden mellan tidigare och nuvarande beräkningsomgång. Detta görs för att hantera sena mätvärdesändringar.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7019: Korrigeringsavräkning
    participant Sys as System
    participant Calc as Beräkning

    Note over Sys: Trigger: Ny avräkningskörning
    Sys->>Calc: Hämta föregående version
    Sys->>Calc: Hämta ny version
    Calc->>Calc: Beräkna delta (Energi & Pengar)
    Calc-->>Sys: Korrigeringsresultat`,
  preConditions: [
    { id: "BRS7019-1", description: "En ny leveransavräkning (7016) har körts för en period som redan avräknats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7019-2", description: "Datahubben har beräknat differenser för energi och kostnad." },
      { id: "BRS7019-3", description: "Resultatet har lagrats för fakturering." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7019-5", description: "Datahubben jämför resultatversioner och beräknar delta." }
  ],
  infoObjects: [contentDhv7000Output]
};
