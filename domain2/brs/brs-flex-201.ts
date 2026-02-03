
import { BRSData } from '../../types';
import { content201Input, content201Output } from '../../content-definitions';

export const brsFlex201: BRSData = {
  id: "BRS-FLEX-201",
  title: "SP registrerar flexavtal",
  purpose: "Att koppla en CU till en SP för att kunna sälja flexibilitet.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-201: SP registrerar flexavtal
    participant SP as SP
    participant FIS as FIS
    participant DHV as DHV

    SP->>FIS: RegisterFlexAgreement (CU-ID)
    activate FIS
    FIS->>DHV: Validera kund & anläggning
    DHV-->>FIS: OK
    
    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        FIS->>FIS: Skapa nytt avtal
        FIS-->>SP: Acknowledgement
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX201-1", description: "En SP har registrerat ett nytt flexibilitetsavtal." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX201-2", description: "FIS har registrerat det nya flexibilitetsavtalet." },
      { id: "BRSFLEX201-3", description: "SP har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX201-4", description: "Inget avtal har skapats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX201-5", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_201_CU_NOT_FOUND" },
    { id: "BRSFLEX201-6", description: "Kopplat Mätpunkts-ID måste finnas och vara aktivt i DHV.", errorCode: "E_201_MP_NOT_FOUND_IN_DHV" },
    { id: "BRSFLEX201-7", description: "Angivet Kund-ID måste vara kopplat till Mätpunkten i DHV.", errorCode: "E_201_CUSTOMER_MISMATCH" }
  ],
  process: [
    { id: "BRSFLEX201-8", description: "SP registrerar ett nytt flexibilitetsavtal för en resurs." },
    { id: "BRSFLEX201-9", description: "Flexibilitetsregistret skickar en kvittens till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX201-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content201Input, content201Output]
};
