
import { BRSData } from '../../types';
import { content122Input, content122Output } from '../../content-definitions';

export const brsFlex122: BRSData = {
  id: "BRS-FLEX-122",
  title: "SP uppdaterar SPG",
  purpose: "Möjliggör för SP att ändra namn eller attribut på en befintlig SPG.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-122: SP uppdaterar SPG
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: UpdateSPG (SPG-ID, Nytt Namn)
    activate FIS
    FIS->>FIS: Validera ägarskap och namn
    FIS->>FIS: Uppdatera SPG
    FIS-->>SP: Ack (Uppdaterad)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX122-1", description: "En SP har initierat uppdatering av en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX122-2", description: "FIS har uppdaterat SPG-objektet." },
      { id: "BRSFLEX122-3", description: "SP har mottagit bekräftelse." }
    ],
    rejected: [
      { id: "BRSFLEX122-4", description: "Ingen ändring gjord." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX122-5", description: "Angivet SPG-ID måste existera och tillhöra SP.", errorCode: "E_122_NOT_FOUND" },
    { id: "BRSFLEX122-6", description: "Det nya namnet måste vara unikt inom SP:s portfölj.", errorCode: "E_122_DUPLICATE_NAME" }
  ],
  process: [
    { id: "BRSFLEX122-7", description: "SP skickar begäran om uppdatering." },
    { id: "BRSFLEX122-8", description: "FIS validerar och sparar ändringen." }
  ],
  infoObjects: [content122Input, content122Output]
};
