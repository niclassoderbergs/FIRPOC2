
import { BRSData } from '../../types';
import { content101Input, content101Output } from '../../content-definitions';

export const brsFlex101: BRSData = {
  id: "BRS-FLEX-101",
  title: "SP registrerar CU",
  purpose: "Processen används av en SP för att registrera en ny Styrbar Enhet (Controllable Unit - CU) i FIS. Syftet är att skapa en unik identitet för en teknisk resurs och koppla denna till en specifik mätpunkt.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" },
    { role: "Sekundär", description: "DHV – via uppslag" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-101: SP registrerar en CU
    participant SP as SP
    participant FIS as FIS
    participant DHV as DHV

    SP->>FIS: RegisterControllableUnit
    activate FIS
    
    FIS->>DHV: Validera Mätpunkt (Request)
    activate DHV
    DHV-->>FIS: Mätpunkt Status (Response)
    deactivate DHV

    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        FIS->>FIS: Skapa CU (Status: Active/Under Construction)
        FIS-->>SP: RegisterControllableUnitAcknowledgement (CU-ID)
    else Validering Fel
        FIS-->>SP: Felmeddelande (Error)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX101-1", description: "En SP har registrerat en ny styrbar enhet (CU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX101-2", description: "FIS har registrerat den nya styrbara enheten (CU)." },
      { id: "BRSFLEX101-3", description: "SP har mottagit kvittens med den nya enhetens ID." }
    ],
    rejected: [
      { id: "BRSFLEX101-4", description: "Inga data har sparats i FIS." },
      { id: "BRSFLEX101-5", description: "SP har mottagit en negativ kvittens med relevanta felkoder." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX101-6", description: "Mätpunkts-ID måste finnas i DHV och ha status 'Active' eller 'Connected'.", errorCode: "E_101_MP_NOT_FOUND" },
    { id: "BRSFLEX101-7", description: "Angivet Mätpunkts-ID får inte redan vara kopplat till en annan aktiv CU med samma tekniska specifikation som överlappar i tid.", errorCode: "E_101_DUPLICATE_RESOURCE" },
    { id: "BRSFLEX101-8", description: "Tekniska attribut (t.ex. MaxEffekt) får inte vara negativa värden.", errorCode: "E_GEN_INVALID_VALUE" }
  ],
  process: [
    { id: "BRSFLEX101-9", description: "SP registrerar en ny styrbar enhet (CU)." },
    { id: "BRSFLEX101-10", description: "FIS skickar en kvittens till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX101-11", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content101Input, content101Output]
};
