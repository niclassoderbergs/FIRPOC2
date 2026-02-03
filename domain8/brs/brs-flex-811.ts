
import { BRSData } from '../../types';
import { content811Input, content811Output } from '../../content-definitions';

export const brsFlex811: BRSData = {
  id: "BRS-FLEX-823", // Updated from 811
  previousId: "BRS-FLEX-811",
  title: "FIS avregistrerar SP (tvingande)",
  purpose: "Att permanent ta bort en SP från marknaden på initiativ av systemägaren (t.ex. vid konkurs eller grovt avtalsbrott). Alla kopplingar avslutas.",
  actors: [
    { role: "Initiator", description: "FIS Admin" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-823: Tvingande avregistrering
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: ForceTerminateActor (SP-ID)
    activate FIS
    FIS->>FIS: Säg upp alla Flexavtal (Trigger BRS-FLEX-2030)
    FIS->>FIS: Ta bort alla bud
    FIS->>FIS: Sätt status 'Terminated'
    FIS-->>Admin: Ack
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX823-1", description: "Beslut om permanent uteslutning har fattats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX823-2", description: "SP-kontot är avslutat och alla underliggande objekt städade." }
    ],
    rejected: [
      { id: "BRSFLEX823-3", description: "Fel vid terminering." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX823-4", description: "Åtgärden är irreversibel via API (kräver databasåtgärd för att häva).", errorCode: "W_823_IRREVERSIBLE" }
  ],
  process: [
    { id: "BRSFLEX823-5", description: "Admin initierar tvingande avslut." },
    { id: "BRSFLEX823-6", description: "FIS stänger alla relationer och terminerar kontot." }
  ],
  infoObjects: [content811Input, content811Output]
};
