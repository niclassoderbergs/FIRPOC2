
import { BRSData } from '../../types';
import { content803Input, content803Output } from '../../content-definitions';

export const brsFlex803: BRSData = {
  id: "BRS-FLEX-802", // Updated from 803
  previousId: "BRS-FLEX-803",
  title: "SP uppdaterar profilinformation",
  purpose: "Möjliggör för SP att underhålla sina kontaktuppgifter och administrativa data.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-802: SP uppdaterar profil
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: UpdateActorDetails (Nya uppgifter)
    activate FIS
    FIS->>FIS: Validera data
    FIS->>FIS: Uppdatera register
    FIS-->>SP: Ack
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX802-1", description: "En SP har registrerat ny aktörsinformation" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX802-2", description: "FIS har uppdaterat aktörsinformationen." }
    ],
    rejected: [
      { id: "BRSFLEX802-3", description: "Inga ändringar sparade." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX802-4", description: "Vissa fält (t.ex. OrgNr) får inte ändras via denna process.", errorCode: "E_802_IMMUTABLE_FIELD" }
  ],
  process: [
    { id: "BRSFLEX802-5", description: "SP begär uppdatering av profil." },
    { id: "BRSFLEX802-6", description: "FIS sparar ändringarna." }
  ],
  infoObjects: [content803Input, content803Output]
};
