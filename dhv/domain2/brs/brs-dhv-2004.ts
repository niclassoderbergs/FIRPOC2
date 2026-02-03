
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2004: BRSData = {
  id: "BRS-DHV-2004",
  title: "Datahubben ångrar utflytt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur datahubben annullerar en utflyttning på en avräkningspunkt. Datahubben återställer tidigare leveransinformation om leveransen avslutades genom en stödprocess.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2004: System ångrar utflytt
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Ångra Utflytt (Trigger)
    activate Sys
    Sys->>Sys: Återställ tidigare slutdatum
    deactivate Sys`,
  preConditions: [
    { id: "BRS2004-6", description: "Den bekräftade inflyttningen ångras via BRS-SE-221 där utflytten utfördes via BRS-SE-2002." },
    { id: "BRS2004-7", description: "En väntande inflyttning ångras via BRS-SE-221 och en begärd utflytt existerar." },
    { id: "BRS2004-10", description: "En inflyttning ångrades via BRS-SE-2003 och en framtida utflytt existerar." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2004-8", description: "Datahubben har ångrat utflytten." },
      { id: "BRS2004-9", description: "Om startvillkor 2004-6 uppfylldes har datahubben återställt det tidigare slutdatumet." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2004-11", description: "Systemklockan i datahubben startar funktionen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
