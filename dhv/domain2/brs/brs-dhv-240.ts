
import { BRSData } from '../../../types';
import { contentDhv240Output } from '../../content-dhv-domain-2';

export const brsDhv240: BRSData = {
  id: "BRS-DHV-240",
  title: "Elleverantör tar emot besked om väntande inflytt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Beskriver hur en elleverantör får information om att en anmäld inflyttning är parkerad (pending) på grund av pågående leverans eller att anläggningen inte är klar.",
  actors: [
    { role: "Initiator", description: "Datahub" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-240: Väntande inflytt
    participant DHV as Datahub
    participant Ret as Elleverantör

    Note over DHV: Trigger: Inflytt (211) mot aktiv kund/nybyggnad
    DHV->>Ret: NotifyMoveInPending (Orsak)
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS240-1", description: "En inflyttning har registrerats (BRS-SE-211) med status 'pending existing customer'." },
    { id: "BRS240-2", description: "En inflyttning har registrerats (BRS-SE-211) med status 'pending under construction'." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS240-3", description: "Datahubben har skickat besked om väntande inflytt till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS240-4", description: "Elleverantören anmäler en inflytt och det finns antingen en befintlig kund eller anläggningen är under konstruktion." },
    { id: "BRS240-5", description: "Datahubben svarar med 'move in pending'." }
  ],
  infoObjects: [contentDhv240Output]
};
