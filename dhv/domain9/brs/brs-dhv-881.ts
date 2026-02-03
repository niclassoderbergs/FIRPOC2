
import { BRSData } from '../../../types';
import { contentDhvTariffDistOutput } from '../../content-dhv-domain-9';

export const brsDhv881: BRSData = {
  id: "BRS-DHV-881",
  title: "ESCO tar emot nättariffinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur datahubben distribuerar nättariffinformation till ESCOs som är kopplade till en avräkningspunkt som påverkas av den uppdaterade tariffen.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "ESCO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-881: Distribuera tariffinfo till ESCO
    participant DHV as Datahubben
    participant ESCO as ESCO

    Note over DHV: Trigger: Uppdatering (816)
    DHV->>ESCO: Nättariffinformation
    activate ESCO
    ESCO-->>DHV: Ack
    deactivate ESCO`,
  preConditions: [
    { id: "BRS881-2", description: "BRS-SE-816 Uppdatera nättariff har exekverats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS881-6", description: "Datahubben har skickat nättariffinformation till påverkade ESCOs." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS881-10", description: "Datahubben skickar tariffinformation till påverkade ESCOs." },
    { id: "BRS881-14", description: "Exception: Felmeddelande." }
  ],
  infoObjects: [contentDhvTariffDistOutput]
};
