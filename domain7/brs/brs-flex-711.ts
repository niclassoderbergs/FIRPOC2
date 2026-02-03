
import { BRSData } from '../../types';
import { content711Input, content711Output } from '../../content-definitions';

export const brsFlex711: BRSData = {
  id: "BRS-FLEX-731", // Updated from 711
  previousId: "BRS-FLEX-711",
  title: "TSO registrerar aktiverat energibud",
  purpose: "Marknadsplatsen för Balansmarknaden (TSO) skickar in information om aktiverade energibud (avrop) till FIS. Detta sker efter att marknaden har clearats eller ett manuellt avrop gjorts, för att registrera att en leverans förväntas.",
  actors: [
    { role: "Initiator", description: "TSO (Balansmarknad)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-731: TSO registrerar aktiverat energibud
    participant TSO as TSO (Balansmarknad)
    participant FIS as FIS

    TSO->>FIS: RegisterActivatedEnergyBid (Bud-ID, Budobjekt, Aktiverad Volym)
    activate FIS
    FIS->>FIS: Validera referenser
    
    alt Validering OK
        FIS->>FIS: Lagra aktivering
        FIS-->>TSO: Ack (Mottaget)
    else Validering Fel
        FIS-->>TSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX731-1", description: "En systemoperatör (TSO) har registrerat ett aktiverat energibud." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX731-2", description: "FIS har lagrat det aktiverade energibudet." },
      { id: "BRSFLEX731-3", description: "Systemoperatören (TSO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX731-4", description: "Felaktigt format, aktivering ej sparad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX731-5", description: "Angivet Budobjekt-ID måste existera i FIS.", errorCode: "E_731_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX731-6", description: "Aktiverad volym måste vara större än noll.", errorCode: "E_731_INVALID_VOLUME" },
    { id: "BRSFLEX731-7", description: "Om referens till ursprungligt kapacitetsbud finns, måste aktiveringen rymmas inom dess tidsfönster.", errorCode: "E_731_PERIOD_MISMATCH" },
    { id: "BRSFLEX731-8", description: "Slutdatum för aktiveringen måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" }
  ],
  process: [
    { id: "BRSFLEX731-9", description: "TSO registrerar ett aktiverat energibud (avrop)." },
    { id: "BRSFLEX731-10", description: "FIS bekräftar registreringen till TSO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX731-11", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content711Input, content711Output]
};
