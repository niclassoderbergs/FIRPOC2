
import { BRSData } from '../../../types';
import { contentDhvRequestContractInput, contentDhvContractOutput } from '../../content-dhv-domain-2';

export const brsDhv580: BRSData = {
  id: "BRS-DHV-580",
  title: "ESCO begär avtalsinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Beskriver hur en ESCO begär information om kundleveransavtal. Kräver ett aktivt samtycke.",
  actors: [
    { role: "Initiator", description: "ESCO" },
    { role: "Mottagare", description: "Datahub" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-580: Begär avtalsinfo (ESCO)
    participant ESCO as ESCO
    participant DHV as Datahub

    ESCO->>DHV: RequestContractInfo
    activate DHV
    DHV->>DHV: Validera Samtycke
    
    alt Godkänd
        DHV-->>ESCO: Avtalsinformation
    else Avslag
        DHV-->>ESCO: Felmeddelande (Inget samtycke)
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS580-1", description: "En ESCO har begärt avtalsinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS580-2", description: "Avtalsinformation för aktiva och framtida leveranser har distribuerats till ESCO." }
    ],
    rejected: [
      { id: "BRS580-3", description: "Felmeddelande skickat." }
    ]
  },
  businessRules: [
    { id: "BRS580-11", description: "Avräkningspunkten måste existera.", errorCode: "-" },
    { id: "BRS580-12", description: "ESCO måste ha ett giltigt samtycke för avräkningspunkten.", errorCode: "-" }
  ],
  process: [
    { id: "BRS580-20", description: "ESCO begär avtalsinformation." },
    { id: "BRS580-21", description: "ESCO tar emot avtalsinformation." },
    { id: "BRS580-22", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvRequestContractInput, contentDhvContractOutput]
};
