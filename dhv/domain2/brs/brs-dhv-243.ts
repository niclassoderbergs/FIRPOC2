
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv243: BRSData = {
  id: "BRS-DHV-243",
  title: "Elleverantör tar emot begäran om utflytt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör tar emot information om en begärd utflyttning. Detta sker när en ny elleverantör rapporterar en inflyttning (211) som överlappar med den befintliga leverantörens leverans.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-243: Begäran om utflytt
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Begäran om utflytt (Move out requested)
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS243-1", description: "En inflyttning har registrerats via BRS-SE-211 med status 'pending existing customer'." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS243-2", description: "Datahubben har skickat begäran om utflytt till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS243-3", description: "En inflyttning registreras och det finns en befintlig kund." },
    { id: "BRS243-4", description: "Datahubben skickar begäran om utflytt till den befintliga elleverantören." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
