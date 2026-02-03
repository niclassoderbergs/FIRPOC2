
import { BRSData } from '../../types';
import { content701Input, content701Output } from '../../content-definitions';

export const brsFlex701: BRSData = {
  id: "BRS-FLEX-701",
  title: "TSO registrerar kapacitetsbud",
  purpose: "Marknadsplatsen för Balansmarknaden (TSO) skickar in inkomna kapacitetsbud (för upphandling av reserver) till FIS för registrering.",
  actors: [
    { role: "Initiator", description: "TSO (Balansmarknad)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-701: TSO registrerar kapacitetsbud
    participant TSO as TSO (Balansmarknad)
    participant FIS as FIS

    TSO->>FIS: RegisterCapacityBid (Bud-ID, Budobjekt, Volym MW)
    activate FIS
    FIS->>FIS: Validera format och referenser
    
    alt Validering OK
        FIS->>FIS: Lagra bud
        FIS-->>TSO: Ack (Mottaget)
    else Validering Fel
        FIS-->>TSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX701-1", description: "En systemoperatör (TSO) har registrerat ett kapacitetsbud." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX701-2", description: "FIS har lagrat kapacitetsbudet." },
      { id: "BRSFLEX701-3", description: "Systemoperatören (TSO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX701-4", description: "Tekniskt fel vid mottagande." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX701-5", description: "Angivet Budobjekt-ID (SPU/SPG) måste existera och vara aktivt i FIS.", errorCode: "E_701_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX701-6", description: "Budvolymen måste vara större än noll.", errorCode: "E_701_INVALID_VOLUME" },
    { id: "BRSFLEX701-7", description: "Slutdatum för budperioden måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" },
    { id: "BRSFLEX701-8", description: "Angiven produkt måste vara godkänd för budobjektet (förkvalificerad).", errorCode: "E_701_PRODUCT_NOT_QUALIFIED" },
    { id: "BRSFLEX701-9", description: "Marknadstidsenhet (MTU) måste matcha produktens definition.", errorCode: "E_701_INVALID_MTU" }
  ],
  process: [
    { id: "BRSFLEX701-10", description: "Systemoperatören (TSO) skickar budinformation till Flexibilitetsregistret." },
    { id: "BRSFLEX701-11", description: "FIS bekräftar mottagandet till TSO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX701-12", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content701Input, content701Output]
};
