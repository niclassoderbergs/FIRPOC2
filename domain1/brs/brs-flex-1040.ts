
import { BRSData } from '../../types';
import { content1040Input } from '../../content-definitions';

export const brsFlex1040: BRSData = {
  id: "BRS-FLEX-1020", // Updated from 1040
  previousId: "BRS-FLEX-1040",
  title: "FIS uppdaterar CU",
  purpose: "Automatisk systemprocess eller administrativ åtgärd där FIS uppdaterar attribut på en Styrbar Enhet (CU). Detta sker som en konsekvens av systemhändelser, till exempel om den underliggande mätpunkten avaktiveras i Datahubben eller vid administrativa beslut som kräver att resursen pausas.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1020: FIS uppdaterar CU (System/Admin)
    participant FIS as FIS
    participant DHV as Datahubben

    Note over FIS: Trigger: Ex. Mätpunkt stängd i DHV
    activate FIS
    FIS->>FIS: Identifiera CU kopplad till Mätpunkt
    FIS->>FIS: Applicera uppdatering (t.ex. inaktivering)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1020-1", description: "Datahubben har notifierat att mätpunkten för CUn har avaktiverats eller annan systemhändelse har inträffat." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1020-2", description: "FIS har uppdaterat den styrbara enhetens status på grund av en extern händelse." }
    ],
    rejected: [
      { id: "BRSFLEX1020-4", description: "Uppdateringen misslyckades (loggas internt)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1020-5", description: "FIS uppdaterar CU-status baserat på extern händelse." }
  ],
  infoObjects: [content1040Input]
};
