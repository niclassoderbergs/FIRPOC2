
import { BRSData } from '../../types';
import { content521Input, content521Output } from '../../content-definitions';

export const brsFlex521: BRSData = {
  id: "BRS-FLEX-521",
  title: "SP registrerar beräknad baseline för CU",
  purpose: "SP skickar in den kontrafaktiska kurvan (vad förbrukningen/produktionen hade varit utan aktivering) för en leveransperiod. Detta används när metoden kräver att SP själv står för beräkningen.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-521: SP registrerar beräknad baseline för CU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: SubmitBaselineData (CU, Period, Värden)
    activate FIS
    FIS->>FIS: Validera affärsregler
    FIS->>FIS: Lagra tidsserie
    FIS-->>SP: Ack
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX521-1", description: "En SP har registrerat beräknad baselinedata." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX521-2", description: "FIS har lagrat mottagen baselinedata." },
      { id: "BRSFLEX521-3", description: "SP har mottagit kvittens på att data lagrats." }
    ],
    rejected: [
      { id: "BRSFLEX521-4", description: "Data avvisad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX521-5", description: "Dataformatet valideras mot den metod som är konfigurerad för CU:n.", errorCode: "E_521_FORMAT_MISMATCH" },
    { id: "BRSFLEX521-6", description: "Tidsupplösningen måste matcha marknadsproduktens krav.", errorCode: "E_521_INVALID_RESOLUTION" }
  ],
  process: [
    { id: "BRSFLEX521-7", description: "SP skickar in beräknad baselinedata för en resurs." },
    { id: "BRSFLEX521-8", description: "FIS bekräftar mottagandet till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX521-9", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content521Input, content521Output]
};
