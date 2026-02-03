
import { BRSData } from '../../types';
import { content6110Input, content6110Output } from '../../content-definitions';

export const brsFlex6110: BRSData = {
  id: "BRS-FLEX-6110",
  title: "FIS registrerar beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "En administrativ eller automatisk process där FIS registrerar levererad volym för en aktivering. Detta används när systemet själv beräknar leveransen (t.ex. baserat på mätvärden från DHV för resurser typ FCR) eller vid manuella korrigeringar av administratör.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Database)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-6110: FIS registrerar leveransdata (System/Admin)
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: RegisterDeliveryData (Aktiverings-ID, CU, Volym)
    activate FIS
    FIS->>FIS: Validera koppling till Aktivering
    FIS->>FIS: Lagra Leveransbevis (Källa: System)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX6110-1", description: "En TSO har registrerat ett energibud (via BRS-FLEX-711) och relevanta CU-mätvärden och mätpunkts-mätvärden finns tillgängligt." },
    { id: "BRSFLEX6110-2", description: "En DSO har registrerat ett energibud (via BRS-FLEX-712) och relevanta CU-mätvärden och mätpunkts-mätvärden finns tillgängligt." },
    { id: "BRSFLEX6110-3", description: "En Nemo har registrerat DA/ID handel (via BRS-FLEX-713) och relevanta CU-mätvärden och mätpunkts-mätvärden finns tillgängligt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX6110-4", description: "FIS har beräknat och registrerat systemberäknad leveransdata." }
    ],
    rejected: [
      { id: "BRSFLEX6110-6", description: "Registrering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX6110-7", description: "Systemregistrerad data har företräde framför SP-rapporterad data vid konflikter (loggas som varning).", errorCode: "W_6110_DATA_OVERWRITE" },
    { id: "BRSFLEX6110-8", description: "Tidsserien måste täcka aktiveringsperioden.", errorCode: "E_6110_PERIOD_MISMATCH" },
    { id: "BRSFLEX6110-9", description: "CU måste ha varit aktiv vid tidpunkten för leveransen.", errorCode: "E_6110_CU_NOT_ACTIVE" }
  ],
  process: [
    { id: "BRSFLEX6110-10", description: "FIS beräknar leveransvolym baserat på systemdata (när SP ej rapporterar själv)." },
    { id: "BRSFLEX6110-11", description: "FIS lagrar resultatet." }
  ],
  infoObjects: [content6110Input, content6110Output]
};
