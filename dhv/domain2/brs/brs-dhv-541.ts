
import { BRSData } from '../../../types';
import { contentDhvCustomerOutput } from '../../content-dhv-domain-2';

export const brsDhv541: BRSData = {
  id: "BRS-DHV-541",
  title: "Elleverantör tar emot kundinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS skickar uppdaterad kundinformation till elleverantörer som har pågående eller framtida leveranser.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-541: Lev tar emot kundinfo
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Skicka uppdaterad kundinfo
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS541-1", description: "BRS-SE-511 Uppdatera kundinformation har utförts." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS541-2", description: "Datahubben har skickat uppdaterad kundinformation till relevanta elleverantörer." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS541-3", description: "Datahubben skickar kundinformation till elleverantören." }
  ],
  infoObjects: [contentDhvCustomerOutput]
};
