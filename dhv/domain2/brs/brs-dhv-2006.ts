
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2006: BRSData = {
  id: "BRS-DHV-2006",
  title: "Datahubben utför anvisad leverans - leverantörsbyte",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna funktion beskriver hur en konsumtionspunkt anvisas en leverantör på grund av omständigheter där den av kunden valda leverantören antingen har avslutat leveransen eller inte längre kan fullfölja sina åtaganden.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2006: Anvisad leverans vid byte
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Utför anvisad leverans (Trigger)
    activate Sys
    Sys->>Sys: Skapa leverans & avtal
    deactivate Sys`,
  preConditions: [
    { id: "BRS2006-1", description: "BRS-SE-217 Anmäl upphörd leverans har utförts och det finns en pågående leverans." },
    { id: "BRS2006-10", description: "Datahubbens backoffice har identifierat ett pågående eller framtida byte för en leverantör som terminerats från marknaden." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2006-2", description: "Datahubben har skapat information om kundleveransavtal." },
      { id: "BRS2006-3", description: "Datahubben har skapat leveransinformation med startdatum enligt den initierande processen." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2006-6", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
