
import { BRSData } from '../../../types';
import { contentDhvTariffRequestInput, contentDhvTariffRequestOutput } from '../../content-dhv-domain-9';

export const brsDhv846: BRSData = {
  id: "BRS-DHV-846",
  title: "Elleverantör begär nättariffinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör begär registrerad nättariffinformation från datahubben.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-846: Elleverantör begär tariffinfo
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär info (ID/Område)
    activate DHV
    DHV->>DHV: Validera
    
    alt Godkänd
        DHV-->>Ret: Tariffinformation
    else Avslag
        DHV-->>Ret: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS846-2", description: "En elleverantör har begärt nättariffinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS846-5", description: "Information för specifikt tariff-ID har distribuerats." },
      { id: "BRS846-6", description: "Information för alla tariffer i angivet nätområde har distribuerats." }
    ],
    rejected: [
      { id: "BRS846-7", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS846-10", description: "Tariff-ID måste existera i datahubben.", errorCode: "The grid tariff ID does not exist in the data hub" }
  ],
  process: [
    { id: "BRS846-15", description: "Elleverantör begär nättariffinformation." },
    { id: "BRS846-16", description: "Datahubben svarar med information." },
    { id: "BRS846-19", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvTariffRequestInput, contentDhvTariffRequestOutput]
};
