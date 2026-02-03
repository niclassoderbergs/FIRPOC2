
import { BRSData } from '../../../types';
import { contentDhv582Input, contentDhv583Output } from '../../content-dhv-domain-1';

export const brsDhv582: BRSData = {
  id: "BRS-DHV-582",
  title: "ESCO begär information om avräkningspunkt",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO begär information om avräkningspunkt / mätpunkt från datahubben.",
  actors: [
    { role: "Initiator", description: "ESCO" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-582: ESCO begär info
    participant ESCO as ESCO
    participant DHV as Datahub

    ESCO->>DHV: RequestInfo
    DHV->>DHV: Validera samtycke
    DHV-->>ESCO: Information`,
  preConditions: [
    { id: "BRS582-1", description: "En ESCO har begärt information om avräkningspunkt / mätpunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS582-2", description: "Information om avräkningspunkt / mätpunkt har distribuerats till ESCO:n." }
    ],
    rejected: [
      { id: "BRS582-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS582-6", description: "ESCO:n måste ha ett samtycke för den angivna avräkningspunkten.", errorCode: "-" }
  ],
  process: [
    { id: "BRS582-10", description: "En ESCO begär information om mätpunkt / avräkningspunkt." },
    { id: "BRS582-11", description: "Datahubben svarar med information om mätpunkt / avräkningspunkt till ESCO:n." }
  ],
  infoObjects: [contentDhv582Input, contentDhv583Output]
};