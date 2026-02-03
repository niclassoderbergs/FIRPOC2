
import { BRSData } from '../../../types';
import { contentDhv7000Output } from '../../content-dhv-domain-7';

export const brsDhv7015: BRSData = {
  id: "BRS-DHV-7015",
  title: "Datahubben beräknar nätförluster",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beräknar nätförluster per MGA baserat på skillnaden mellan inmatad energi och uttagen energi (inklusive profilerad förbrukning).",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7015: Beräkna Nätförluster
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta Load Profile & Consumption
    Calc->>Calc: Beräkna Förlust
    Calc-->>Sys: MGA Grid Loss`,
  preConditions: [
    { id: "BRS7015-1", description: "MGA Load Profile har skapats (BRS-DHV-7008)." },
    { id: "BRS7015-2", description: "Preliminär profilerad förbrukning har beräknats (BRS-DHV-7009)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7015-3", description: "Datahubben har beräknat MGA nätförluster." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS7015-5", description: "Datahubben beräknar nätförluster per MGA." }
  ],
  infoObjects: [contentDhv7000Output]
};
