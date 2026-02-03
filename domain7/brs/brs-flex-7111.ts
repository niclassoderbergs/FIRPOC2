
import { BRSData } from '../../types';
import { content7111Input, content7111Output } from '../../content-definitions';

export const brsFlex7111: BRSData = {
  id: "BRS-FLEX-7310", // Updated from 7111
  previousId: "BRS-FLEX-7111",
  title: "FIS kontrollerar energibud",
  purpose: "Att säkerställa att ett registrerat energibud (aktivering) har teknisk täckning och inte bryter mot några nätbegränsningar innan det godkänns i systemet. Motsvarar kapacitetskontroll fast för energi.",
  actors: [
    { role: "Initiator", description: "System" },
    { role: "Utförare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7310: FIS kontrollerar energibud
    participant FIS as FIS

    activate FIS
    Note over FIS: Trigger: Nytt energibud inkommit (BRS-FLEX-731/741)
    
    FIS->>FIS: Hämta ingående CUs
    FIS->>FIS: Beräkna tillgänglig energi/effekt
    FIS->>FIS: Validera mot nätbegränsningar
    FIS->>FIS: Spara valideringsresultat
    
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX7310-1", description: "Ett energibud har registrerats av TSO (via BRS-FLEX-731)." },
    { id: "BRSFLEX7310-7", description: "ELLER ett energibud har registrerats av DSO (via BRS-FLEX-741)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7310-2", description: "FIS har beräknat och lagrat resultatet av energibudskontrollen." }
    ],
    rejected: [
      { id: "BRSFLEX7310-3", description: "Tekniskt fel vid beräkning." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX7310-4", description: "FIS validerar det inkomna energibudet (systemprocess)." },
    { id: "BRSFLEX7310-5", description: "FIS lagrar resultatet." }
  ],
  infoObjects: [content7111Input, content7111Output]
};
