
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2008: BRSData = {
  id: "BRS-DHV-2008",
  title: "Datahubben avbryter leverantörsbyte",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur datahubben annullerar ett leverantörsbyte på en avräkningspunkt.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2008: System avbryter leverantörsbyte
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Avbryt Byte (Trigger)
    activate Sys
    Sys->>Sys: Återställ tidigare tillstånd
    deactivate Sys`,
  preConditions: [
    { id: "BRS2008-1", description: "En tidigare utflytt har utförts via BRS-SE-2002." },
    { id: "BRS2008-2", description: "En tidigare utflytt har utförts via BRS-SE-213." },
    { id: "BRS2008-3", description: "Kundens inflyttning har ångrats via BRS-SE-221." },
    { id: "BRS2008-6", description: "Ett leverantörsbyte har ångrats via BRS-SE-222 och en relaterad avräkningspunkt finns." },
    { id: "BRS2008-7", description: "Datahubbens backoffice har identifierat att elleverantören har terminerats från marknaden." },
    { id: "BRS2008-9", description: "En kundinflyttning har ångrats via BRS-SE-2003." },
    { id: "BRS2008-10", description: "Ett leverantörsbyte har registrerats via BRS-SE-215 för en produktionspunkt och en mottagningsplikt finns vid samma datum." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2008-4", description: "Datahubben har avbrutit leverantörsbytet." },
      { id: "BRS2008-5", description: "Om startvillkor var BRS2008-6 har datahubben återställt tidigare leveransinformation." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2008-8", description: "Systemklockan i datahubben startar funktionen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
