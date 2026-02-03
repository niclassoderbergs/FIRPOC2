
import { BRSData } from '../../../types';
import { contentDhv583Output } from '../../content-dhv-domain-1';

export const brsDhv583: BRSData = {
  id: "BRS-DHV-583",
  title: "ESCO tar emot information om kundmätpunkt",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO tar emot information om att en kundmätpunkt har ändrats.",
  actors: [
    { role: "Initiator", description: "Datahub" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-583: Notifiera ESCO
    participant DHV as Datahub
    participant ESCO as ESCO

    Note over DHV: Trigger: Uppdatera MP
    DHV->>ESCO: NotifyInfo
    ESCO-->>DHV: Ack`,
  preConditions: [
    { id: "BRS583-1", description: "BRS-SE-112 Avregistrera kundmätpunkt har utförts." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS583-5", description: "Datahubben har skickat information om kundmätpunkten till ESCOs med ett kundsamtycke." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS583-10", description: "Datahubben skickar information om kundmätpunkt / avräkningspunkt till ESCO." }
  ],
  infoObjects: [contentDhv583Output]
};