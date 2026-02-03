
import { BRSData } from '../../../types';
import { contentDhv212Input, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv212: BRSData = {
  id: "BRS-DHV-212",
  title: "Avvisa begärd utflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör avvisar en begärd utflyttning på en anläggning. Detta används när en kund inte flyttar ut, trots att en 'begäran om utflytt' har mottagits (t.ex. pga. felaktig inflytt från annan part).",
  actors: [
    { role: "Initiator", description: "Befintlig Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-212: Avvisa begärd utflytt
    participant Ret as Befintlig Lev
    participant DHV as Datahubben

    Ret->>DHV: Avvisar begärd utflytt
    activate DHV
    DHV->>DHV: Validering
    DHV-->>Ret: Bekräftelse
    deactivate DHV`,
  preConditions: [
    { id: "BRS212-1", description: "Den befintliga elleverantören har avvisat den begärda utflytten." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS212-2", description: "Datahubben har avbrutit den väntande inflytten." },
      { id: "BRS212-3", description: "Datahubben har svarat med en bekräftelse." }
    ],
    rejected: [
      { id: "BRS212-6", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS212-13", description: "Anläggningen måste existera i datahubben.", errorCode: "The specified accounting point does not exist in the data hub" },
    { id: "BRS212-14", description: "Leverans-ID måste vara kopplat till anläggningen.", errorCode: "The specified delivery identifier is not connected to the accounting point" },
    { id: "BRS212-15", description: "Leveransen måste ha status 'begärd utflytt'.", errorCode: "The specified delivery has no requested move out" },
    { id: "BRS212-16", description: "Elleverantören måste vara kopplad till leverans-ID.", errorCode: "The specified retailer is not connected to the specified delivery identifier" }
  ],
  process: [
    { id: "BRS212-20", description: "Befintlig elleverantör avvisar begäran om utflytt." },
    { id: "BRS212-21", description: "Datahubben svarar med bekräftelse." },
    { id: "BRS212-25", description: "Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv212Input, contentDhvGenericOutput]
};
