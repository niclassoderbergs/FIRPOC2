
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2005: BRSData = {
  id: "BRS-DHV-2005",
  title: "Datahubben utför mottagningsplikt - leverantörsbyte",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna funktion är endast tillämplig för mätpunkter som uppfyller kriterierna för mottagningsplikt. En produktionsanläggning måste ha en elleverantör för den producerade energin. Om kunden saknar en leverantör för en sådan punkt, kommer datahubben att verkställa mottagningsplikt mot den elleverantör som ansvarar för den relaterade konsumtionspunkten.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2005: Mottagningsplikt vid byte
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Utför mottagningsplikt (Trigger)
    activate Sys
    Sys->>Sys: Skapa leverans & avtal
    deactivate Sys`,
  preConditions: [
    { id: "BRS2005-1", description: "Ett leverantörsbyte har rapporterats via BRS-SE-215 på konsumtionspunkten och relaterad produktionspunkt har mottagningsplikt." },
    { id: "BRS2005-2", description: "Ett leverantörsbyte har utförts via BRS-SE-2006 (anvisat) på konsumtionspunkten och relaterad produktionspunkt har mottagningsplikt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2005-6", description: "Datahubben har skapat information om kundleveransavtal." },
      { id: "BRS2005-7", description: "Datahubben har skapat leveransinformation med startdatum enligt den initierande processen." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2005-17", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
