
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2007: BRSData = {
  id: "BRS-DHV-2007",
  title: "Datahubben utför inflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver när en leverans sätts till aktiv av datahubben i processen kundinflyttning.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2007: Utför inflyttning
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Utför inflyttning (Trigger)
    activate Sys
    Sys->>Sys: Sätt leverans till Aktiv
    deactivate Sys`,
  preConditions: [
    { id: "BRS2007-1", description: "Datahubben har svarat med en bekräftelse på grund av rapporterad inflyttning via BRS-SE-211." },
    { id: "BRS2007-2", description: "BRS-SE-519 har ändrat status från Available for contract till Active och en väntande inflytt finns." },
    { id: "BRS2007-3", description: "Varken avvisad utflytt eller utflytt har rapporterats inom 7 dagar och en väntande inflytt finns." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2007-8", description: "Datahubben har uppdaterat leveransinformationen till aktiv med ett startdatum enligt den begärda inflyttningen." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2007-12", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
