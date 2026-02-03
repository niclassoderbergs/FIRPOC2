
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2003: BRSData = {
  id: "BRS-DHV-2003",
  title: "Datahubben avbryter inflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur datahubben avbryter en inflyttning på en anläggning. Datahubben återställer tidigare leveransinformation om leveransen avslutades via en stödprocess.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2003: System avbryter inflytt
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Avbryt inflyttning (Trigger)
    activate Sys
    Sys->>Sys: Återställ tidigare tillstånd
    deactivate Sys`,
  preConditions: [
    { id: "BRS2003-1", description: "Det finns en framtida inflyttning och en nedmontering av mätpunkt har rapporterats." },
    { id: "BRS2003-2", description: "Det finns en framtida inflyttning och anläggningens status har uppdaterats till Inaktiv." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2003-3", description: "Datahubben har avbrutit inflyttningen." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2003-8", description: "Systemklockan i datahubben startar funktionen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
