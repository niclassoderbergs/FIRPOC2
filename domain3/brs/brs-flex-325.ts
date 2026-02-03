
import { BRSData } from '../../types';
import { content325Input, content325Output } from '../../content-definitions';

export const brsFlex325: BRSData = {
  id: "BRS-FLEX-348", // Updated from 325
  previousId: "BRS-FLEX-325",
  title: "DSO beslutar om produktansökan",
  purpose: "Möjliggör för Nätägaren (DSO) att registrera sitt administrativa beslut gällande en produktansökan för lokala flexibilitetsprodukter. Om ansökan godkänns (Approve) går processen vidare till teknisk kvalificering. Vid avslag (Reject) avslutas processen.",
  actors: [
    { role: "Initiator", description: "Nätägare (DSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-348: DSO beslutar om produktansökan
    participant DSO as DSO
    participant FIS as FIS

    DSO->>FIS: RegisterDecision (Kval-ID, Beslut, [Motivering])
    activate FIS
    FIS->>FIS: Validera att Kval-ID existerar
    FIS->>FIS: Validera att produkt ägs av DSO
    
    alt Beslut = Approve
        FIS->>FIS: Sätt status: 'Administratively Approved'
        FIS-->>DSO: Ack (OK)
    else Beslut = Reject
        FIS->>FIS: Sätt status: 'Rejected'
        FIS-->>DSO: Ack (Avslag registrerat)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX348-1", description: "En produktansökan har status 'Application Received' och DSO har notifierats (via 349)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX348-2", description: "Ansökan har fått status 'Administratively Approved' eller 'Rejected'." }
    ],
    rejected: [
      { id: "BRSFLEX348-4", description: "Ingen statusändring har skett." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX348-5", description: "Endast ansvarig DSO får fatta beslut.", errorCode: "E_348_UNAUTHORIZED" },
    { id: "BRSFLEX348-6", description: "Vid avslag (Reject) måste en motivering anges.", errorCode: "E_348_MISSING_REASON" },
    { id: "BRSFLEX348-7", description: "Statusövergång endast tillåten från 'Application Received'.", errorCode: "E_348_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX348-8", description: "DSO registrerar sitt beslut (Approve/Reject) för ansökan." },
    { id: "BRSFLEX348-9", description: "FIS uppdaterar status." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX348-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content325Input, content325Output]
};
