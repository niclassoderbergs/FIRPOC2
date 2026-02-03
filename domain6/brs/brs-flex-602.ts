
import { BRSData } from '../../types';
import { content602Input, content602Output } from '../../content-definitions';

export const brsFlex602: BRSData = {
  id: "BRS-FLEX-604", // Updated from 602
  previousId: "BRS-FLEX-602",
  title: "Begär CU-mätvärden",
  purpose: "Möjliggör för en berättigad aktör (t.ex. SP, TSO, DSO, BRP, Elleverantör) att hämta lagrade mätvärden (sub-metering) för en resurs för verifiering eller analys.",
  actors: [
    { role: "Initiator", description: "SP / TSO / DSO / BRP / Elleverantör" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-604: Begär Mätdata
    participant Req as Berättigad Aktör
    participant FIS as FIS

    Req->>FIS: GetMeterData (CU-ID, Period)
    activate FIS
    FIS->>FIS: Validera relation (Ägare/Systemansvarig/Nätägare/BRP/Lev)
    
    alt Behörig och Data finns
        FIS->>FIS: Hämta tidsserie
        FIS-->>Req: MeterDataResponse (Värden)
    else Ej behörig eller Tomt
        FIS-->>Req: Error / Empty
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX604-1", description: "En SP har begärt mätvärden för en styrbar enhet (CU)." },
    { id: "BRSFLEX604-2", description: "En TSO har begärt mätvärden för en styrbar enhet (CU)." },
    { id: "BRSFLEX604-3", description: "En DSO har begärt mätvärden för en styrbar enhet (CU)." },
    { id: "BRSFLEX604-4", description: "En BRP har begärt mätvärden för en styrbar enhet (CU)." },
    { id: "BRSFLEX604-5", description: "En Elleverantör har begärt mätvärden för en styrbar enhet (CU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX604-6", description: "FIS har returnerat efterfrågade mätvärden." }
    ],
    rejected: [
      { id: "BRSFLEX604-7", description: "Ingen data funnen eller behörighet saknas." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX604-8", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_604_CU_NOT_FOUND" },
    { id: "BRSFLEX604-9", description: "Anropande part måste ha en aktiv relation till resursen (Ägare, Nätägare, Systemoperatör, BRP eller Elleverantör) för den angivna perioden.", errorCode: "E_604_UNAUTHORIZED" },
    { id: "BRSFLEX604-10", description: "Slutdatum för perioden måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" }
  ],
  process: [
    { id: "BRSFLEX604-11", description: "Berättigad aktör begär mätvärden för en styrbar enhet (CU)." },
    { id: "BRSFLEX604-12", description: "FIS validerar behörighet och skickar mätvärdena till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX604-13", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content602Input, content602Output]
};
