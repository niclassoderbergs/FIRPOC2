
import { BRSData } from '../../../types';
import { contentDhvTariffRequestInput, contentDhvTariffRequestOutput } from '../../content-dhv-domain-9';

export const brsDhv864: BRSData = {
  id: "BRS-DHV-864",
  title: "Nätägare begär nättariffinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare begär registrerad nättariffinformation från datahubben.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-864: Nätägare begär tariffinfo
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär info
    activate DHV
    DHV-->>GO: Tariffinformation
    deactivate DHV`,
  preConditions: [
    { id: "BRS864-2", description: "En nätägare har begärt nättariffinformation." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS864-5", description: "Information för specifikt tariff-ID har distribuerats." },
      { id: "BRS864-6", description: "Information för alla tariffer i angivet nätområde har distribuerats." }
    ],
    rejected: [
      { id: "BRS864-7", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS864-10", description: "Tariff-ID måste existera i datahubben.", errorCode: "The grid tariff ID does not exist in the data hub" }
  ],
  process: [
    { id: "BRS864-15", description: "Nätägare begär nättariffinformation." },
    { id: "BRS864-16", description: "Datahubben svarar med information." },
    { id: "BRS864-19", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvTariffRequestInput, contentDhvTariffRequestOutput]
};
