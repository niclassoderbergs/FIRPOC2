
import { BRSData } from '../../../types';
import { contentDhv543Output } from '../../content-dhv-domain-1';

export const brsDhv543: BRSData = {
  id: "BRS-DHV-543",
  title: "Elleverantör tar emot information om kundmätpunkt",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om att en kundmätpunkt har ändrats.",
  actors: [
    { role: "Initiator", description: "Datahub" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-543: Notifiera Elleverantör
    participant DHV as Datahub
    participant Ret as Elleverantör

    Note over DHV: Trigger: Uppdatering/Avregistrering av MP
    DHV->>Ret: NotifyCustomerMeteringPointInfo
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS543-1", description: "BRS-SE-112 Avregistrera kundmätpunkt har utförts." },
    { id: "BRS543-2", description: "BRS-SE-519 Uppdatera kundmätpunkt har utförts." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS543-5", description: "Datahubben har skickat information om kundmätpunkten till elleverantörer med pågående och framtida leveranser." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS543-10", description: "Datahubben skickar information om kundmätpunkt / avräkningspunkt till elleverantör." }
  ],
  infoObjects: [contentDhv543Output]
};