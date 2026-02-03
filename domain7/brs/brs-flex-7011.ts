
import { BRSData } from '../../types';
import { content7011Input, content7011Output } from '../../content-definitions';

export const brsFlex7011: BRSData = {
  id: "BRS-FLEX-7010", // Updated from 7011
  previousId: "BRS-FLEX-7011",
  title: "FIS kontrollerar budets kapacitet",
  purpose: "Att säkerställa att inkomna bud har täckning i faktiska resurser och inte bryter mot några nätbegränsningar innan de skickas vidare till marknaden.",
  actors: [
    { role: "Initiator", description: "System" },
    { role: "Utförare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7010: FIS kontrollerar budets kapacitet
    participant FIS as FIS

    activate FIS
    Note over FIS: Trigger: Nytt bud inkommit (BRS-FLEX-701/711)
    
    FIS->>FIS: Hämta ingående CUs för Budobjektet
    FIS->>FIS: Beräkna aggregerad kapacitet inkl nätbegränsningar
    FIS->>FIS: Validera Kapacitet vs Budvolym
    FIS->>FIS: Spara Kapacitetsresultat
    
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX7010-1", description: "En TSO har registrerat ett kapacitetbud (via BRS-FLEX-701)." },
    { id: "BRSFLEX7010-2", description: "En DSO har registrerat ett kapacitetbud (via BRS-FLEX-711)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7010-3", description: "FIS har beräknat och lagrat resultatet av kapacitetskontrollen." }
    ],
    rejected: [
      { id: "BRSFLEX7010-4", description: "Tekniskt fel vid beräkning (loggas)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX7010-5", description: "FIS beräknar den aggregerade kapaciteten för ett bud och validerar mot nätbegränsningar (systemprocess)." },
    { id: "BRSFLEX7010-6", description: "FIS lagrar resultatet." }
  ],
  infoObjects: [content7011Input, content7011Output]
};
