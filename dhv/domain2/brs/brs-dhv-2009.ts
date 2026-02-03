
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2009: BRSData = {
  id: "BRS-DHV-2009",
  title: "Datahubben utför mottagningsplikt - inflytt",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna funktion är endast tillämplig för mätpunkter som uppfyller kriterierna för mottagningsplikt. Funktionen initieras i samband med registrering av start av leverans för den relaterade konsumtionspunkten.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2009: Mottagningsplikt vid inflytt
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Utför mottagningsplikt (Trigger)
    activate Sys
    Sys->>Sys: Skapa leverans & avtal
    deactivate Sys`,
  preConditions: [
    { id: "BRS2009-1", description: "En inflytt har verkställts via BRS-SE-2007 på konsumtionspunkten och relaterad produktionspunkt har mottagningsplikt." },
    { id: "BRS2009-2", description: "En produktionspunkt har uppdaterats via BRS-SE-519 med avseende på mottagningsplikt/status, och relaterad konsumtion har pågående leverans." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2009-6", description: "Datahubben har skapat information om kundleveransavtal." },
      { id: "BRS2009-7", description: "Datahubben har skapat leveransinformation med startdatum satt till det senaste av konsumtionsleveransens startdatum eller uppdateringsdatumet för produktionspunkten." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2009-10", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
