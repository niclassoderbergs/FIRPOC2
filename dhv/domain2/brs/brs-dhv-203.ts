
import { BRSData } from '../../../types';
import { contentDhv203Output } from '../../content-dhv-domain-2';

export const brsDhv203: BRSData = {
  id: "BRS-DHV-203",
  title: "Elleverantör tar emot information före avtalstecknande",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur datahubben distribuerar information till en elleverantör innan avtalsskrivning, efter att kunden registrerat ett samtycke.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-203: Info före avtal
    participant DHV as Datahubben
    participant Ret as Elleverantör

    DHV->>Ret: Distribuerar information
    activate Ret
    deactivate Ret`,
  preConditions: [
    { id: "BRS203-1", description: "En kund har registrerat ett samtycke för att en elleverantör ska få ta emot information." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS203-2", description: "Datahubben har skickat information om kund, kundleveransavtal och mätpunkt/avräkningspunkt till elleverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS203-15", description: "Datahubben distribuerar information om kund, avtal och anläggning till elleverantören." }
  ],
  infoObjects: [contentDhv203Output]
};