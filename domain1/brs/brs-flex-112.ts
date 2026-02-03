
import { BRSData } from '../../types';
import { content112Input, content112Output } from '../../content-definitions';

export const brsFlex112: BRSData = {
  id: "BRS-FLEX-112",
  title: "SP uppdaterar SPU",
  purpose: "Möjliggör för SP att ändra namn eller andra attribut på en befintlig SPU. Elområde kan ej ändras då det är en strukturell egenskap.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-112: SP uppdaterar SPU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: UpdateSPU (SPU-ID, Nytt Namn)
    activate FIS
    FIS->>FIS: Validera att SPU existerar och tillhör SP
    FIS->>FIS: Uppdatera namn i databas
    FIS-->>SP: Ack (Uppdaterat)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX112-1", description: "En SP har initierat uppdatering av en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX112-2", description: "FIS har uppdaterat SPU-objektet." },
      { id: "BRSFLEX112-3", description: "SP har mottagit bekräftelse." }
    ],
    rejected: [
      { id: "BRSFLEX112-4", description: "Ingen ändring gjord." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX112-5", description: "Angivet SPU-ID måste existera och tillhöra SP.", errorCode: "E_112_NOT_FOUND" },
    { id: "BRSFLEX112-6", description: "Det nya namnet måste vara unikt inom SP:s portfölj.", errorCode: "E_112_DUPLICATE_NAME" }
  ],
  process: [
    { id: "BRSFLEX112-7", description: "SP skickar begäran om uppdatering." },
    { id: "BRSFLEX112-8", description: "FIS validerar och sparar ändringen." }
  ],
  infoObjects: [content112Input, content112Output]
};
