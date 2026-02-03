
import { BRSData } from '../../types';
import { content102Input } from '../../content-definitions';

export const brsFlex102: BRSData = {
  id: "BRS-FLEX-102",
  title: "SP uppdaterar CU",
  architecturalNote: "OBS: Denna process ska ändras så att den utförs av CU Registration Responsible (CURR) istället för Service Provider (SP).",
  purpose: "Processen används för att uppdatera stamdata för en befintlig Styrbar Enhet (CU). Detta säkerställer att registret speglar verkligheten vid förändringar (t.ex. utökad effekt).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-102: SP uppdaterar CU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: UpdateControllableUnit (CU-ID, MP-ID, Attribut)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa ny version av CU
        FIS-->>SP: UpdateAcknowledgement (Kvittens)
    else Validering Fel
        FIS-->>SP: Felmeddelande (Error)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX102-1", description: "En SP har uppdaterat attributen för en styrbar enhet." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX102-2", description: "FIS har uppdaterat den styrbara enhetens attribut." },
      { id: "BRSFLEX102-3", description: "FIS har sparat en ny version av enheten i historiken." },
      { id: "BRSFLEX102-13", description: "SP har mottagit kvittens på uppdateringen." }
    ],
    rejected: [
      { id: "BRSFLEX102-4", description: "Inga ändringar har gjorts på CU-objektet." },
      { id: "BRSFLEX102-5", description: "Felmeddelande har skickats till SP." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX102-6", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_102_CU_NOT_FOUND" },
    { id: "BRSFLEX102-7", description: "Angivet Mätpunkts-ID måste matcha det som är kopplat till CU:n (extra verifiering).", errorCode: "E_102_MP_MISMATCH" },
    { id: "BRS-FLEX-102-8", description: "Uppdateringar som påverkar kvalificering måste ha ett ValidityStart minst 10 dagar framåt i tiden (DR NC Art 22(1)).", errorCode: "E_102_TIME_CONSTRAINT" },
    { id: "BRSFLEX102-9", description: "Det är inte tillåtet att ändra kopplat Mätpunkts-ID via denna process.", errorCode: "E_102_MPID_IMMUTABLE" }
  ],
  process: [
    { id: "BRSFLEX102-10", description: "SP uppdaterar informationen för en styrbar enhet (CU)." },
    { id: "BRSFLEX102-11", description: "FIS skickar en kvittens till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX102-12", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content102Input]
};
