
import { BRSData } from '../../../types';
import { contentDhv7000Output } from '../../content-dhv-domain-7';

export const brsDhv7016: BRSData = {
  id: "BRS-DHV-7016",
  title: "Datahubben beräknar leveransavräkning",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Associerar elleverantörer och balansansvariga till leveranspunkter och beräknar aggregerade tidsserier per aktör och MGA. Detta utgör grunden för balansavräkningen.",
  actors: [
    { role: "Initiator", description: "System (Datahub)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-7016: Leveransavräkning
    participant Sys as System
    participant Calc as Beräkning

    Sys->>Calc: Hämta mätdata & Avtalsrelationer
    Calc->>Calc: Aggregera per RE/BRP & MGA
    Calc-->>Sys: Leveransavräkning`,
  preConditions: [
    { id: "BRS7016-1", description: "Mätvärden och profilerad förbrukning finns tillgängligt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS7016-2", description: "Datahubben har beräknat leveransavräkning per MGA, typ och RE/BRP." },
      { id: "BRS7016-3", description: "Datahubben har aggregerat resultatet per RE/BRP (BRS-DHV-7017)." }
    ],
    rejected: []
  },
  businessRules: [
    { id: "BRS7016-5", description: "Aggregering ska ske för Produktion och Konsumtion per aktör.", errorCode: "-" }
  ],
  process: [
    { id: "BRS7016-6", description: "Datahubben beräknar leveransavräkning." },
    { id: "BRS7016-7", description: "Datahubben beräknar leveransavräkning för budområden (BRS-DHV-7018)." }
  ],
  infoObjects: [contentDhv7000Output]
};
