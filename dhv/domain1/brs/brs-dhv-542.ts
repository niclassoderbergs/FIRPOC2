
import { BRSData } from '../../../types';
import { contentDhv542Input, contentDhv543Output } from '../../content-dhv-domain-1';

export const brsDhv542: BRSData = {
  id: "BRS-DHV-542",
  title: "Elleverantör begär information om avräkningspunkt",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör begär registrerad information om en avräkningspunkt / mätpunkt från datahubben. Används när elleverantören tar emot information om inflyttning, byte eller uppdatering.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-542: Elleverantör begär info
    participant Ret as Elleverantör
    participant DHV as Datahub

    Ret->>DHV: RequestAccountingPointInfo
    activate DHV
    DHV->>DHV: Validera relation
    
    alt Godkänd
        DHV-->>Ret: Information om Avräkningspunkt / MP
    else Avslag
        DHV-->>Ret: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS542-1", description: "En elleverantör har begärt information om en avräkningspunkt / mätpunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS542-2", description: "Information om avräkningspunkt / mätpunkt har distribuerats till elleverantören." }
    ],
    rejected: [
      { id: "BRS542-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS542-5", description: "Avräkningspunkts-ID måste existera.", errorCode: "E_MPM_4000_01" },
    { id: "BRS542-6", description: "Elleverantör med endast framtida leveranser får endast begära den nuvarande versionen.", errorCode: "E_MPM_3001_02" }
  ],
  process: [
    { id: "BRS542-10", description: "En elleverantör begär information om mätpunkt / avräkningspunkt." },
    { id: "BRS542-11", description: "Datahubben svarar med information om mätpunkt / avräkningspunkt till elleverantören." }
  ],
  infoObjects: [contentDhv542Input, contentDhv543Output]
};