
import { BRSData } from '../../types';
import { content502Input, content502Output } from '../../content-definitions';

export const brsFlex502: BRSData = {
  id: "BRS-FLEX-504", // Updated from 502
  previousId: "BRS-FLEX-502",
  title: "Lista godkända baselinemetoder",
  purpose: "Möjliggör för aktörer (SP, TSO, DSO) att se vilka baselinemetoder som finns tillgängliga att välja för resurser.",
  actors: [
    { role: "Initiator", description: "SP / TSO / DSO" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-504: Lista godkända baselinemetoder
    participant Requester as SP/TSO/DSO
    participant FIS as FIS

    Requester->>FIS: ListBaselineMethods (Filter)
    activate FIS
    FIS->>FIS: Hämta aktiva metoder
    FIS-->>Requester: BaselineMethodList (ID, Namn)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX504-1", description: "En SP har begärt en lista över tillgängliga baselinemetoder." },
    { id: "BRSFLEX504-2", description: "En TSO har begärt en lista över tillgängliga baselinemetoder." },
    { id: "BRSFLEX504-3", description: "En DSO har begärt en lista över tillgängliga baselinemetoder." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX504-4", description: "FIS har returnerat listan över godkända metoder." }
    ],
    rejected: [
      { id: "BRSFLEX504-5", description: "Ingen data returnerad." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX504-6", description: "Aktör begär en lista över tillgängliga baselinemetoder." },
    { id: "BRSFLEX504-7", description: "Flexibilitetsregistret skickar listan till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX504-8", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content502Input, content502Output]
};
