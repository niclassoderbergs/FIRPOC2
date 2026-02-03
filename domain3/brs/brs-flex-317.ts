
import { BRSData } from '../../types';
import { content317Input, content317Output } from '../../content-definitions';

export const brsFlex317: BRSData = {
  id: "BRS-FLEX-321", // Updated from 317
  previousId: "BRS-FLEX-317",
  title: "SP registrerar testdata",
  purpose: "SP skickar in de tekniska parametrar (t.ex. rampningstider, uthållighet) och förslag på testplan som TSO efterfrågat. När detta är klart sätts status till 'Ready for Activation Test'.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-321: SP registrerar testdata
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: SubmitTestData (Kval-ID, Parametrar)
    activate FIS
    FIS->>FIS: Validera att data är komplett
    FIS->>FIS: Sätt status 'Ready for Activation Test'
    FIS-->>SP: Ack
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX321-1", description: "SP har mottagit begäran om data (BRS-FLEX-329)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX321-2", description: "Teknisk data sparad." },
      { id: "BRSFLEX321-3", description: "Status uppdaterad till 'Ready for Activation Test'." }
    ],
    rejected: [
      { id: "BRSFLEX321-4", description: "Data avvisad (formatfel)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX321-5", description: "Kvalificerings-ID måste vara giltigt och i fas 'Prequalification Started'.", errorCode: "E_321_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX321-6", description: "SP skickar in tekniska data." },
    { id: "BRSFLEX321-7", description: "FIS bekräftar och uppdaterar status." }
  ],
  infoObjects: [content317Input, content317Output]
};
