
import { BRSData } from '../../types';
import { content105Input, content105Output } from '../../content-definitions';

export const brsFlex105: BRSData = {
  id: "BRS-FLEX-107", // Updated from 105
  previousId: "BRS-FLEX-105",
  title: "SP begär återaktivering av CU",
  architecturalNote: "OBS: Denna process ska ändras så att den utförs av CU Registration Responsible (CURR) istället för Service Provider (SP).",
  purpose: "SP begär att en suspenderad CU ska återaktiveras efter att orsaken till suspenderingen har åtgärdats.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-107: SP begär återaktivering av CU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RequestReactivation (CU-ID, Kommentar)
    activate FIS
    FIS->>FIS: Validera ägarskap och status
    FIS->>FIS: Skapa ärende för granskning
    FIS-->>SP: Ack (Mottaget)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX107-1", description: "CU har status 'Suspended'." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX107-2", description: "Ärende om återaktivering har skapats." },
      { id: "BRSFLEX107-3", description: "SP har mottagit bekräftelse på att begäran är mottagen." }
    ],
    rejected: [
      { id: "BRSFLEX107-4", description: "Begäran avvisad (t.ex. felaktigt ID eller ej suspenderad)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX107-5", description: "Endast resursens ägare (SP) får begära återaktivering.", errorCode: "E_107_UNAUTHORIZED" },
    { id: "BRSFLEX107-6", description: "Resursen måste vara i status 'Suspended'.", errorCode: "E_107_INVALID_STATUS" }
  ],
  process: [
    { id: "BRSFLEX107-7", description: "SP skickar begäran om återaktivering." },
    { id: "BRSFLEX107-8", description: "FIS validerar och skapar ett ärende." }
  ],
  infoObjects: [content105Input, content105Output]
};
