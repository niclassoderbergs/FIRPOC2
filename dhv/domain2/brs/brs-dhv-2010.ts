
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2010: BRSData = {
  id: "BRS-DHV-2010",
  title: "Datahubben utför anvisad leverans - inflytt",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna funktion beskriver hur en tidigare rapporterad men ännu ej verkställd inflyttning på en konsumtionspunkt anvisas en leverantör p.g.a. omständigheter där den valda leverantören inte längre kan fullfölja sina åtaganden.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2010: Anvisad leverans vid inflytt
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Utför anvisad leverans (Trigger)
    activate Sys
    Sys->>Sys: Skapa leverans & avtal
    deactivate Sys`,
  preConditions: [
    { id: "BRS2010-1", description: "Datahubbens backoffice har identifierat en framtida inflytt för en leverantör som terminerats från marknaden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2010-2", description: "Datahubben har skapat ett kundleveransavtal med startdatum enligt den framtida inflytten och typen 'anvisad'." },
      { id: "BRS2010-3", description: "Datahubben har skapat leveransinformation med startdatum enligt den framtida inflytten och med den anvisade leverantören." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2010-6", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
