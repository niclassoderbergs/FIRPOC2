
import { BRSData } from '../../types';
import { content208Input, content208Output } from '../../content-definitions';

export const brsFlex208: BRSData = {
  id: "BRS-FLEX-208",
  title: "Slutkund avslutar flexavtal",
  purpose: "Att hantera processen där en slutkund aktivt väljer att avsluta sitt engagemang med en flexibilitetsleverantör via Datahubbens 'Mina sidor'. Detta säkerställer att kundens vilja respekteras och triggar notifiering till SP.",
  actors: [
    { role: "Initiator", description: "Slutkund (via DHV)" },
    { role: "Mottagare", description: "FIS (System)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-208: Slutkund avslutar flexavtal
    participant Kund as Slutkund
    participant DHV as Datahub (Mina Sidor)
    participant FIS as FIS

    Kund->>DHV: Välj "Avsluta Tjänst" (Anläggning)
    activate DHV
    DHV->>FIS: RequestTermination (Anläggnings-ID, Slutdatum)
    activate FIS
    FIS->>FIS: Identifiera aktivt Flexavtal på Anläggning
    FIS->>FIS: Validera Kund-ID (mot avtal)
    
    alt Avtal Hittas
        FIS->>FIS: Sätt status 'Terminated'
        FIS->>FIS: Trigger BRS-FLEX-205 (Notify SP)
        FIS-->>DHV: OK
        DHV-->>Kund: Bekräftelse
    else Inget Avtal
        FIS-->>DHV: Error (Finns ej)
        DHV-->>Kund: Felmeddelande
    end
    deactivate FIS
    deactivate DHV`,
  preConditions: [
    { id: "BRSFLEX208-1", description: "Ett aktivt flexibilitetsavtal finns registrerat på anläggningen." },
    { id: "BRSFLEX208-2", description: "Slutkunden är autentiserad i Datahubben." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX208-3", description: "Flexibilitetsavtalet har status 'Terminated' i FIS." },
      { id: "BRSFLEX208-4", description: "FIS har initierat notifiering till SP (via BRS-FLEX-205)." }
    ],
    rejected: [
      { id: "BRSFLEX208-5", description: "Ingen ändring har skett (felaktig anläggning eller behörighet)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX208-6", description: "Slutkunden har alltid rätt att avsluta flexibilitetstjänster kopplade till sin anläggning.", errorCode: "-" },
    { id: "BRSFLEX208-7", description: "Avslutet träder i kraft vid det angivna slutdatumet (som default sätts till dagens datum om inget annat anges).", errorCode: "E_208_INVALID_DATE" }
  ],
  process: [
    { id: "BRSFLEX208-8", description: "Slutkunden initierar avslut via Datahubbens gränssnitt." },
    { id: "BRSFLEX208-9", description: "DHV skickar begäran till FIS." },
    { id: "BRSFLEX208-10", description: "FIS avslutar avtalet." }
  ],
  infoObjects: [content208Input, content208Output]
};
