
import { BRSData } from '../../types';
import { content7120Input, content7120Output } from '../../content-definitions';

export const brsFlex7120: BRSData = {
  id: "BRS-FLEX-7610", // Updated from 7120
  previousId: "BRS-FLEX-7120",
  title: "FIS allokerar verifierad volym per BRP",
  purpose: "En intern systemprocess för att fördela (allokera) den verifierade flexibilitetsvolymen på berörda Balansansvariga (BRP). Syftet är att skapa underlag för obalansjustering (Imbalance Adjustment) så att BRP inte drabbas ekonomiskt för obalanser orsakade av flexibilitetsaktiveringar som de inte själva initierat.",
  actors: [
    { role: "Initiator", description: "System (Triggered by 7320)" },
    { role: "Utförare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7610: Allokering för Obalansjustering (BRP)
    participant FIS as FIS

    Note over FIS: Trigger: BRS-FLEX-7320 (Resultat klart)
    activate FIS
    FIS->>FIS: Hämta Verifierat Resultat (CUs & Volymer)
    
    loop För varje CU
        FIS->>FIS: Slå upp Mätpunkt (i DB)
        FIS->>FIS: Slå upp BRP för Mätpunkt (Master Data)
        FIS->>FIS: Addera CU-volym till BRP-total
    end

    FIS->>FIS: Spara Obalansunderlag (BRP-ID, Summa Volym)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX7610-1", description: "Verifiering av energibud är slutförd (via BRS-FLEX-7320)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7610-2", description: "FIS har allokerat verifierad volym per BRP och elleverantör." },
      { id: "BRSFLEX7610-3", description: "FIS har lagrat underlag för obalansjustering av BRP." }
    ],
    rejected: [
      { id: "BRSFLEX7610-4", description: "Allokering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX7610-5", description: "FIS fördelar (allokerar) verifierad volym per Balansansvarig (BRP) (systemprocess)." },
    { id: "BRSFLEX7610-6", description: "FIS lagrar underlag för obalansjustering." }
  ],
  infoObjects: [content7120Input, content7120Output]
};
