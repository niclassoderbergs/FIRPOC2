
import { BRSData } from '../../types';
import { content712Input, content712Output } from '../../content-definitions';

export const brsFlex712: BRSData = {
  id: "BRS-FLEX-741", // Updated from 712
  previousId: "BRS-FLEX-712",
  title: "DSO registrerar aktiverat energibud",
  purpose: "Marknadsplatsen för lokala flexibilitetsmarknader (DSO) skickar in information om aktiverade lokala energibud till FIS. Detta bekräftar att en resurs har avropats för att lösa ett lokalt behov.",
  actors: [
    { role: "Initiator", description: "DSO (Lokal flexibilitetsmarknad)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-741: DSO registrerar aktiverat energibud
    participant DSO as DSO (Lokal Flexmarknad)
    participant FIS as FIS

    DSO->>FIS: RegisterActivatedLocalBid (Bud-ID, Budobjekt, Aktiverad Volym)
    activate FIS
    FIS->>FIS: Validera referenser
    
    alt Validering OK
        FIS->>FIS: Lagra aktivering
        FIS-->>DSO: Ack (Mottaget)
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX741-1", description: "En nätägare (DSO) har registrerat ett aktiverat lokalt energibud." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX741-2", description: "FIS har lagrat det aktiverade lokala energibudet." },
      { id: "BRSFLEX741-3", description: "Nätägaren (DSO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX741-4", description: "Aktivering ej sparad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX741-5", description: "Angivet Budobjekt-ID måste existera i FIS.", errorCode: "E_741_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX741-6", description: "Aktiverad volym måste vara större än noll.", errorCode: "E_741_INVALID_VOLUME" },
    { id: "BRSFLEX741-7", description: "Nätområde för aktiveringen måste matcha resursens nätområde.", errorCode: "E_741_GRID_AREA_MISMATCH" },
    { id: "BRSFLEX741-8", description: "Slutdatum för aktiveringen måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" },
    { id: "BRSFLEX741-9", description: "Resursen får inte vara blockerad av ett annat motstridigt avrop under samma period.", errorCode: "E_741_RESOURCE_BLOCKED" }
  ],
  process: [
    { id: "BRSFLEX741-10", description: "DSO registrerar ett aktiverat lokalt energibud." },
    { id: "BRSFLEX741-11", description: "FIS bekräftar registreringen till DSO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX741-12", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content712Input, content712Output]
};
