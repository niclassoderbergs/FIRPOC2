
import { BRSData } from '../../types';
import { content7121Input, content7121Output } from '../../content-definitions';

export const brsFlex7121: BRSData = {
  id: "BRS-FLEX-7620", // Updated from 7121
  previousId: "BRS-FLEX-7121",
  title: "FIS allokerar verifierad volym per elleverantör",
  purpose: "En intern systemprocess för att fördela (allokera) den verifierade flexibilitetsvolymen på berörda Elleverantörer (Suppliers). Eftersom en aktivering av flexibilitet påverkar energivolymen för mätpunkten, behöver Elleverantören underlag för den ekonomiska kompensationen de kommer få.",
  actors: [
    { role: "Initiator", description: "System (Triggered by 7320)" },
    { role: "Utförare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7620: Allokering för Kompensation (Leverantör)
    participant FIS as FIS

    Note over FIS: Trigger: BRS-FLEX-7320 (Resultat klart)
    activate FIS
    FIS->>FIS: Hämta Verifierat Resultat
    
    loop För varje CU
        FIS->>FIS: Slå upp Mätpunkt
        FIS->>FIS: Slå upp Elleverantör för Mätpunkt
        FIS->>FIS: Addera CU-volym till Leverantörs-total
    end

    FIS->>FIS: Spara Kompensationsunderlag (Lev-ID, Summa Volym)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX7620-1", description: "Verifiering av energibud är slutförd (via BRS-FLEX-7320)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7620-2", description: "FIS har allokerat verifierad volym per Elleverantör." },
      { id: "BRSFLEX7620-3", description: "FIS har lagrat underlag för kompensation." }
    ],
    rejected: [
      { id: "BRSFLEX7620-4", description: "Allokering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX7620-5", description: "FIS fördelar (allokerar) verifierad volym per Elleverantör (systemprocess)." },
    { id: "BRSFLEX7620-6", description: "FIS lagrar underlag för kompensation." }
  ],
  infoObjects: [content7121Input, content7121Output]
};
