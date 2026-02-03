
import { BRSData } from '../../../types';
import { contentDhv7000Output } from '../../content-dhv-domain-7';

export const brsDhv7003: BRSData = {
  id: "BRS-DHV-7003",
  title: "Datahubben beräknar MGA-residual",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "MGA-residualen beräknas för att möjliggöra avräkning av icke-mätt energi (profilerad förbrukning) tillsammans med kvartsmätt energi. Residualen motsvarar volymen av icke-mätt energi som måste avräknas.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7003: Beräkna Residual
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta Aggregat (Total In - Total Ut)
    Calc->>Calc: Beräkna Residual
    Calc-->>Sys: MGA Residual`,
  preConditions: [
    { id: "BRS7003-1", description: "Mätvärden har aggregerats per MGA (BRS-DHV-7002)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7003-2", description: "Datahubben har beräknat och sparat MGA-residualen." }
    ],
    rejected: []
  },
  businessRules: [
    { id: "BRS7003-5", description: "Residual = (Total Inmatning + Import) - (Total Uttag + Export).", errorCode: "-" }
  ],
  process: [
    { id: "BRS7003-6", description: "Datahubben beräknar MGA-residual." },
    { id: "BRS7003-7", description: "Datahubben räknar om MGA-residual (BRS-DHV-7007) efter uppdateringar." }
  ],
  infoObjects: [contentDhv7000Output]
};
