
import { BRSData } from '../../../types';
import { contentDhvCustomerOutput } from '../../content-dhv-domain-2';

export const brsDhv568: BRSData = {
  id: "BRS-DHV-568",
  title: "Nätägare tar emot kundinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS skickar uppdaterad kundinformation till nätägaren för pågående och framtida leveranser.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-568: Nätägare tar emot kundinfo
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Skicka uppdaterad kundinfo
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS568-1", description: "BRS-SE-511 Uppdatera kundinformation har utförts." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS568-2", description: "Datahubben har skickat uppdaterad kundinformation till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS568-3", description: "Datahubben skickar kundinformation till nätägaren." }
  ],
  infoObjects: [contentDhvCustomerOutput]
};
