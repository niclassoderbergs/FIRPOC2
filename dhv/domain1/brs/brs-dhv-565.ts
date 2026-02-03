
import { BRSData } from '../../../types';
import { contentDhv565Output } from '../../content-dhv-domain-1';

export const brsDhv565: BRSData = {
  id: "BRS-DHV-565",
  title: "Angränsande nätägare tar emot information om utbytespunkt",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en angränsande nätägare tar emot information om att en utbytespunkt har ändrats.",
  actors: [
    { role: "Initiator", description: "Datahub" },
    { role: "Mottagare", description: "Angränsande Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-565: Notifiera Angränsande Nätägare
    participant DHV as Datahub
    participant AdjGO as Angränsande Nätägare

    Note over DHV: Trigger: Uppdatera Utbytespunkt
    DHV->>AdjGO: NotifyExchangeInfo
    AdjGO-->>DHV: Ack`,
  preConditions: [
    { id: "BRS565-1", description: "BRS-SE-113 Registrera utbytespunkt har utförts." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS565-5", description: "Datahubben har skickat information om utbytespunkten till den angränsande nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS565-10", description: "Datahubben skickar information om utbytespunkten till den angränsande nätägaren." }
  ],
  infoObjects: [contentDhv565Output]
};