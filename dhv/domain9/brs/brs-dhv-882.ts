
import { BRSData } from '../../../types';
import { contentDhvTariffRequestInput, contentDhvTariffRequestOutput } from '../../content-dhv-domain-9';

export const brsDhv882: BRSData = {
  id: "BRS-DHV-882",
  title: "ESCO begär nättariffinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en ESCO begär registrerad nättariffinformation från datahubben.",
  actors: [
    { role: "Initiator", description: "ESCO" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-882: ESCO begär tariffinfo
    participant ESCO as ESCO
    participant DHV as Datahubben

    ESCO->>DHV: Begär info
    activate DHV
    DHV-->>ESCO: Tariffinformation
    deactivate DHV`,
  preConditions: [
    { id: "BRS882-2", description: "En ESCO har begärt nättariffinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS882-5", description: "Information för specifikt tariff-ID har distribuerats." },
      { id: "BRS882-6", description: "Information för alla tariffer i angivet nätområde har distribuerats." }
    ],
    rejected: [
      { id: "BRS882-7", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS882-10", description: "Tariff-ID måste existera i datahubben.", errorCode: "The grid tariff ID does not exist in the data hub" }
  ],
  process: [
    { id: "BRS882-15", description: "ESCO begär nättariffinformation." },
    { id: "BRS882-16", description: "Datahubben svarar med information." },
    { id: "BRS882-19", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvTariffRequestInput, contentDhvTariffRequestOutput]
};
