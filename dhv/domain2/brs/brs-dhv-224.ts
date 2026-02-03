
import { BRSData } from '../../../types';
import { contentDhvCancelInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv224: BRSData = {
  id: "BRS-DHV-224",
  title: "Ångra utflyttning",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör ångrar (cancel) en utflyttning på en anläggning. En leverantör kan endast ångra sina egna anmälda utflyttningar.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-224: Ångra utflytt
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Ångrar utflytt
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS224-1", description: "Elleverantören har ångrat en utflyttning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS224-4", description: "Datahubben har makulerat utflytten." },
      { id: "BRS224-2", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS224-5", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS224-13", description: "Elleverantören måste ha en tidigare registrerad utflytt.", errorCode: "No earlier registered move out by the retailer exists" },
    { id: "BRS224-20", description: "Utflytten får inte redan vara effektuerad.", errorCode: "The move out is already effectuated and can not be cancelled" }
  ],
  process: [
    { id: "BRS224-14", description: "Elleverantören ångrar en utflytt." },
    { id: "BRS224-15", description: "Datahubben bekräftar." },
    { id: "BRS224-16", description: "Datahubben skickar felmeddelande." }
  ],
  infoObjects: [contentDhvCancelInput, contentDhvGenericOutput]
};