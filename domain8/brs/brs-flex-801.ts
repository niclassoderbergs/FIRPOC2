
import { BRSData } from '../../types';
import { content801Input, content801Output } from '../../content-definitions';

export const brsFlex801: BRSData = {
  id: "BRS-FLEX-801",
  title: "SP registrerar sig",
  purpose: "Möjliggör för en ny aktör att registrera sig som Service Provider (SP) i systemet. Detta är det första steget i onboarding-processen för att få tillgång till marknaden.",
  actors: [
    { role: "Initiator", description: "Potentiell SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-801: SP registrerar sig
    participant SP as Potentiell SP
    participant FIS as FIS

    SP->>FIS: RegisterActor (OrgNr, Namn, Kontakt)
    activate FIS
    FIS->>FIS: Validera OrgNr format
    FIS->>FIS: Kontrollera dubbletter
    
    alt Validering OK
        FIS->>FIS: Skapa SP-konto (Status: Registered)
        FIS-->>SP: RegistrationAck (SP-ID)
    else Validering Fel
        FIS-->>SP: Error (Invalid Data / Exists)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX801-1", description: "En extern part har initierat registrering för att bli en SP." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX801-2", description: "FIS har skapat en ny aktörspost med status 'Registered'." },
      { id: "BRSFLEX801-3", description: "SP har tilldelats ett SP-ID och fått inloggningsuppgifter." }
    ],
    rejected: [
      { id: "BRSFLEX801-4", description: "Ingen aktör skapad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX801-5", description: "Organisationsnummer måste vara unikt i systemet.", errorCode: "E_801_DUPLICATE_ORG" },
    { id: "BRSFLEX801-6", description: "E-postadress för kontakt måste vara giltig.", errorCode: "E_801_INVALID_EMAIL" }
  ],
  process: [
    { id: "BRSFLEX801-7", description: "Aktör skickar registreringsbegäran." },
    { id: "BRSFLEX801-8", description: "FIS validerar och skapar konto." }
  ],
  infoObjects: [content801Input, content801Output]
};
