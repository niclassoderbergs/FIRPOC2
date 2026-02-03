
import { BRSData } from '../../types';
import { content318Input, content318Output } from '../../content-definitions';

export const brsFlex318: BRSData = {
  id: "BRS-FLEX-318",
  title: "TSO genomför aktiveringstest",
  purpose: "TSO registrerar att det fysiska aktiveringstestet har genomförts. Detta loggar händelsen och sätter status till 'Test Completed', vilket indikerar att ett slutgiltigt beslut nu kan fattas.",
  actors: [
    { role: "Initiator", description: "TSO" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-318: Genomförande av aktiveringstest
    participant TSO as TSO
    participant FIS as FIS

    Note over TSO: Fysiskt test utfört
    TSO->>FIS: RegisterTestExecution (Kval-ID, Resultatdata)
    activate FIS
    FIS->>FIS: Spara testlogg
    FIS->>FIS: Sätt status 'Test Completed'
    FIS-->>TSO: Ack
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX318-1", description: "Resursen har status 'Ready for Activation Test'." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX318-2", description: "Testdata sparad." },
      { id: "BRSFLEX318-3", description: "Status uppdaterad till 'Test Completed'." }
    ],
    rejected: [
      { id: "BRSFLEX318-4", description: "Registrering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX318-5", description: "TSO registrerar att test genomförts." },
    { id: "BRSFLEX318-6", description: "FIS uppdaterar ärendet." }
  ],
  infoObjects: [content318Input, content318Output]
};
