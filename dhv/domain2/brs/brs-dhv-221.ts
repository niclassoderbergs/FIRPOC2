
import { BRSData } from '../../../types';
import { contentDhvCancelInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv221: BRSData = {
  id: "BRS-DHV-221",
  title: "Ångra inflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör ångrar (cancel) en inflyttning på en anläggning. En leverantör kan endast ångra sina egna anmälda inflyttningar. Används när kunden vill nyttja ångerrätt eller vid felregistrering.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-221: Ångra inflytt
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Ångrar inflytt
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS221-1", description: "Elleverantören har ångrat en inflyttning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS221-4", description: "Datahubben har makulerat inflyttningen." },
      { id: "BRS221-2", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS221-5", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS221-10", description: "Leverans-ID måste vara kopplat till anläggningen.", errorCode: "The specified delivery identifier is not connected to the accounting point" },
    { id: "BRS221-12", description: "Elleverantören måste vara kopplad till leveransen.", errorCode: "The specified delivery identifier is not connected to the retailer" },
    { id: "BRS221-18", description: "Inflyttningen får inte redan vara effektuerad (startad).", errorCode: "The move in is already effectuated and can not be cancelled" },
    { id: "BRS221-19", description: "Det måste finnas en framtida inflytt.", errorCode: "The specified delivery identifier does not have a future move in" }
  ],
  process: [
    { id: "BRS221-15", description: "Elleverantören ångrar en inflytt." },
    { id: "BRS221-16", description: "Datahubben bekräftar." },
    { id: "BRS221-17", description: "Datahubben skickar felmeddelande." }
  ],
  infoObjects: [contentDhvCancelInput, contentDhvGenericOutput]
};