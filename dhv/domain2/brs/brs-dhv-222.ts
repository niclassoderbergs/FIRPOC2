
import { BRSData } from '../../../types';
import { contentDhvCancelInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv222: BRSData = {
  id: "BRS-DHV-222",
  title: "Ångra leverantörsbyte",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör ångrar (cancel) ett leverantörsbyte på en anläggning. Datahubben återställer den tidigare leveransinformationen. En leverantör kan endast ångra sina egna anmälningar.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-222: Ångra leverantörsbyte
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Ångrar byte
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS222-1", description: "Elleverantören har ångrat ett leverantörsbyte." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS222-5", description: "Datahubben har makulerat leverantörsbytet." },
      { id: "BRS222-6", description: "Datahubben har återställt tidigare leveransinformation." },
      { id: "BRS222-7", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS222-10", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS222-15", description: "Anläggningen måste existera.", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS222-19", description: "Leverantörsbytet får inte redan vara effektuerat.", errorCode: "The retailer switch is already effectuated and can not be cancelled" },
    { id: "BRS222-20", description: "Det måste finnas ett framtida leverantörsbyte.", errorCode: "The specified delivery identifier does not have a future retailer switch" }
  ],
  process: [
    { id: "BRS222-25", description: "Elleverantören ångrar ett byte." },
    { id: "BRS222-26", description: "Datahubben bekräftar." },
    { id: "BRS222-27", description: "Datahubben skickar felmeddelande." }
  ],
  infoObjects: [contentDhvCancelInput, contentDhvGenericOutput]
};