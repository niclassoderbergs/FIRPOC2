
import { BRSData } from '../../../types';
import { contentDhvTariffDistOutput } from '../../content-dhv-domain-9';

export const brsDhv845: BRSData = {
  id: "BRS-DHV-845",
  title: "Elleverantör tar emot nättariffinformation",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur datahubben distribuerar nättariffinformation till elleverantörer som är kopplade till en avräkningspunkt som påverkas av den uppdaterade tariffen.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-845: Distribuera tariffinfo till Lev
    participant DHV as Datahubben
    participant Ret as Elleverantör

    Note over DHV: Trigger: Uppdatering (816)
    DHV->>Ret: Nättariffinformation
    activate Ret
    Ret-->>DHV: Ack
    deactivate Ret`,
  preConditions: [
    { id: "BRS845-2", description: "BRS-SE-816 Uppdatera nättariff har exekverats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS845-5", description: "Datahubben har skickat nättariffinformation till påverkade elleverantörer." }
    ],
    rejected: [
      { id: "BRS845-14", description: "Datahubben svarar med felmeddelande (vid tekniskt fel)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRS845-10", description: "Datahubben skickar tariffinformation till påverkade elleverantörer." }
  ],
  infoObjects: [contentDhvTariffDistOutput]
};
