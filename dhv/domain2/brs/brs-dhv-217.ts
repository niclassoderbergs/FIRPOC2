
import { BRSData } from '../../../types';
import { contentDhv213Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv217: BRSData = {
  id: "BRS-DHV-217",
  title: "Anmäl upphörd leverans",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver avslut av en pågående leverans. Detta kan göras av en elleverantör (enligt marknadsregler) eller av Datahubbens backoffice (t.ex. vid konkurs).",
  actors: [
    { role: "Initiator", description: "Elleverantör / Datahub Backoffice" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-217: Anmäl upphörd leverans
    participant Ret as Elleverantör/Backoffice
    participant DHV as Datahubben

    Ret->>DHV: Anmäler upphörd leverans
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS217-1", description: "Elleverantören har anmält upphörd leverans." },
    { id: "BRS217-2", description: "Datahubbens backoffice har anmält upphörd leverans." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS217-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS217-6", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS217-10", description: "Leverans-ID måste vara kopplat till anläggningen.", errorCode: "The specified delivery ID is not connected to the accounting point" },
    { id: "BRS217-11", description: "Elleverantören måste vara kopplad till leveransen.", errorCode: "The specified retailer is not connected to the specified delivery identifier" },
    { id: "BRS217-12", description: "Slutdatum måste vara tidigast föregående dygnsskifte.", errorCode: "The specified end of delivery is earlier than the previous day shift from the registration date" }
  ],
  process: [
    { id: "BRS217-20", description: "Elleverantören eller backoffice initierar upphörande av leverans." },
    { id: "BRS217-21", description: "Datahubben bekräftar." },
    { id: "BRS217-25", description: "Datahubben skickar felmeddelande." }
  ],
  infoObjects: [contentDhv213Input, contentDhvGenericOutput]
};