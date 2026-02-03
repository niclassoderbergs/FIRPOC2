
import { BRSData } from '../../types';
import { content713Input, content713Output } from '../../content-definitions';

export const brsFlex713: BRSData = {
  id: "BRS-FLEX-751", // Updated from 713
  previousId: "BRS-FLEX-713",
  title: "NEMO registrerar DA/ID handel",
  purpose: "NEMO skickar in bud från Day-Ahead eller Intraday-marknaden för registrering i FIS.",
  actors: [
    { role: "Initiator", description: "NEMO" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-751: NEMO registrerar DA/ID handel
    participant NEMO as NEMO
    participant FIS as FIS

    NEMO->>FIS: RegisterWholesaleBid (Bud-ID, Marknad, Volym)
    activate FIS
    FIS->>FIS: Validera format
    
    alt Validering OK
        FIS->>FIS: Lagra bud
        FIS-->>NEMO: Ack
    else Validering Fel
        FIS-->>NEMO: Error
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX751-1", description: "En marknadsaktör (NEMO) har registrerat grossisthandel." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX751-2", description: "FIS har lagrat grossistbudet." },
      { id: "BRSFLEX751-3", description: "Marknadsaktören (NEMO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX751-4", description: "Fel vid registrering." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX751-5", description: "Angivet Budobjekt-ID måste existera i FIS och vara en giltig SPU eller SPG.", errorCode: "E_751_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX751-6", description: "Marknadstypen måste vara 'Day-Ahead' eller 'Intraday'.", errorCode: "E_751_INVALID_MARKET" },
    { id: "BRSFLEX751-7", description: "Pris måste anges och valutan måste vara EUR.", errorCode: "E_751_INVALID_PRICE_CURRENCY" },
    { id: "BRSFLEX751-8", description: "Slutdatum för handeln måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" }
  ],
  process: [
    { id: "BRSFLEX751-9", description: "NEMO registrerar ett grossistbud." },
    { id: "BRSFLEX751-10", description: "FIS bekräftar registreringen till NEMO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX751-11", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content713Input, content713Output]
};
