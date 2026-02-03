
import { BRSData } from '../../types';
import { content702Input, content702Output } from '../../content-definitions';

export const brsFlex702: BRSData = {
  id: "BRS-FLEX-711", // Updated from 702
  previousId: "BRS-FLEX-702",
  title: "DSO registrerar kapacitetsbud",
  purpose: "Marknadsplatsen för lokala flexibilitetsmarknader (DSO eller ombud) skickar in kapacitetsbud för lokal flexibilitet till FIS.",
  actors: [
    { role: "Initiator", description: "DSO (Lokal flexibilitetsmarknad)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-711: DSO registrerar kapacitetsbud
    participant DSO as DSO (Lokal Flexmarknad)
    participant FIS as FIS

    DSO->>FIS: RegisterLocalCapacityBid (Bud-ID, Budobjekt, Volym MW)
    activate FIS
    FIS->>FIS: Validera format och referenser
    
    alt Validering OK
        FIS->>FIS: Lagra bud
        FIS-->>DSO: Ack (Mottaget)
    else Validering Fel
        FIS-->>DSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX711-1", description: "En nätägare (DSO) har registrerat ett lokalt kapacitetsbud." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX711-2", description: "FIS har lagrat det lokala kapacitetsbudet." },
      { id: "BRSFLEX711-3", description: "Nätägaren (DSO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX711-4", description: "Bud ej sparat." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX711-5", description: "Angivet Budobjekt-ID måste existera och vara aktivt i FIS.", errorCode: "E_711_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX711-6", description: "Budvolymen måste vara större än noll.", errorCode: "E_711_INVALID_VOLUME" },
    { id: "BRSFLEX711-7", description: "Budet måste referera till ett giltigt Nätområde som matchar resursens placering.", errorCode: "E_711_INVALID_GRID_AREA" },
    { id: "BRSFLEX711-8", description: "Slutdatum för budperioden måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" },
    { id: "BRSFLEX711-9", description: "Budvolymen får inte överstiga resursens totala kvalificerade kapacitet.", errorCode: "E_711_CAPACITY_EXCEEDED" }
  ],
  process: [
    { id: "BRSFLEX711-10", description: "Nätägaren (DSO) skickar budinformation till Flexibilitetsregistret." },
    { id: "BRSFLEX711-11", description: "FIS bekräftar mottagandet till DSO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX711-12", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content702Input, content702Output]
};
