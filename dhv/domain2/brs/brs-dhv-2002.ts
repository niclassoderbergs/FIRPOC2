
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2'; // Using generic for system trigger

export const brsDhv2002: BRSData = {
  id: "BRS-DHV-2002",
  title: "Datahubben utför utflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en utflyttning utförs som en följd av en annan process. Datahubben skapar utflyttningen.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2002: System utför utflytt
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Utför utflyttning (Trigger)
    activate Sys
    Sys->>Sys: Uppdatera leveransinformation
    deactivate Sys`,
  preConditions: [
    { id: "BRS2002-1", description: "Det finns en pågående leverans och en nedmontering av mätpunkt har rapporterats." },
    { id: "BRS2002-2", description: "Det finns en pågående leverans och en inflyttning har utförts." },
    { id: "BRS2002-3", description: "Det finns en pågående leverans och status för anläggningen har ändrats från aktiv till inaktiv." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2002-8", description: "Datahubben har uppdaterat leveransinformation med slutdatum från den initierande processen." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2002-18", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
