
import { BRSData } from '../../types';
import { content7110Input, content7110Output } from '../../content-definitions';

export const brsFlex7110: BRSData = {
  id: "BRS-FLEX-7320", // Updated from 7110
  previousId: "BRS-FLEX-7110",
  title: "FIS verifierar aktiverat energibud",
  purpose: "Att fastställa det officiella utfallet av en flexibilitetsaktivering för att möjliggöra korrekt ekonomisk avräkning. Detta inkluderar att validera leveransen genom att jämföra rapporterad data mot systemberäknade kontrollvärden (baseline) för att identifiera avvikelser.",
  actors: [
    { role: "Initiator", description: "System (Time Trigger)" },
    { role: "Utförare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-7320: FIS verifierar aktiverat energibud
    participant FIS as FIS

    Note over FIS: Trigger: BRS-FLEX-6110 (System Volume) klar
    activate FIS
    FIS->>FIS: Hämta budvolym
    FIS->>FIS: Identifiera ingående CUs
    FIS->>FIS: Hämta beräknad aktiverad flexibilitetsvolym för CUs

    FIS->>FIS: Beräkna Diff : System(Total) vs Budvolym
    
    alt Diff Inom tolerans
        FIS->>FIS: Status = Verified
    else Avvikelse
        FIS->>FIS: Status = Deviation
    end

    FIS->>FIS: Spara Resultat (Status, Diffar, Antal CUs)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX7320-5", description: "BRS-FLEX-6110 (System Calculated Volume) har exekverats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX7320-6", description: "FIS har beräknat och lagrat verifieringsresultat." },
      { id: "BRSFLEX7320-7", description: "FIS har skapat underlag för avräkning." }
    ],
    rejected: [
      { id: "BRSFLEX7320-8", description: "Verifiering kunde ej genomföras (t.ex. systemfel)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX7320-9", description: "FIS jämför leveransdata mot budad volym och fastställer verifieringsresultat (systemprocess)." },
    { id: "BRSFLEX7320-10", description: "FIS lagrar resultatet." }
  ],
  infoObjects: [content7110Input, content7110Output]
};
