
import { BRSData } from '../../types';
import { content305Input, content305Output } from '../../content-definitions';

export const brsFlex305: BRSData = {
  id: "BRS-FLEX-308", // Updated from 305
  previousId: "BRS-FLEX-305",
  title: "TSO beslutar om produktansökan",
  purpose: "Möjliggör för Systemoperatören (TSO) att registrera sitt administrativa beslut gällande en produktansökan. Om ansökan godkänns (Approve) sätts status till 'Administratively Approved' och processen går vidare (t.ex. notifiering till SP). Vid avslag (Reject) avslutas processen.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-308: TSO beslutar om produktansökan
    participant TSO as TSO
    participant FIS as FIS

    TSO->>FIS: RegisterDecision (Kval-ID, Beslut, [Motivering])
    activate FIS
    FIS->>FIS: Validera att Kval-ID existerar
    FIS->>FIS: Validera att produkt ägs av TSO
    
    alt Beslut = Approve
        FIS->>FIS: Sätt status: 'Administratively Approved'
        FIS-->>TSO: Ack (OK)
    else Beslut = Reject
        FIS->>FIS: Sätt status: 'Rejected'
        FIS-->>TSO: Ack (Avslag registrerat)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX308-1", description: "En produktansökan har status 'Application Received' och TSO har notifierats (via 320)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX308-2", description: "Ansökan har fått status 'Administratively Approved' eller 'Rejected'." }
    ],
    rejected: [
      { id: "BRSFLEX308-4", description: "Ingen statusändring har skett." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX308-5", description: "Endast TSO som ansvarar för produkten får fatta beslut.", errorCode: "E_308_UNAUTHORIZED" },
    { id: "BRSFLEX308-6", description: "Vid avslag (Reject) måste en motivering anges.", errorCode: "E_308_MISSING_REASON" },
    { id: "BRSFLEX308-7", description: "Statusövergång endast tillåten från 'Application Received'.", errorCode: "E_308_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX308-8", description: "TSO registrerar sitt beslut (Approve/Reject) för ansökan." },
    { id: "BRSFLEX308-9", description: "FIS uppdaterar status och initierar notifiering till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX308-10", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content305Input, content305Output]
};
