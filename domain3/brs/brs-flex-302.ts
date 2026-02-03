
import { BRSData } from '../../types';
import { content302Input, content302Output } from '../../content-definitions';

export const brsFlex302: BRSData = {
  id: "BRS-FLEX-304", // Updated from 302
  previousId: "BRS-FLEX-302",
  title: "Lista registrerade marknadsprodukter",
  purpose: "Möjliggör för aktörer att söka fram och lista tillgängliga produkter i systemet för att få en överblick (id och namn). För detaljer används BRS-FLEX-305.",
  actors: [
    { role: "Initiator", description: "SP / TSO" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-304: Lista registrerade marknadsprodukter
    participant Requester as SP/TSO
    participant FIS as FIS

    Requester->>FIS: FindProducts (Filter)
    activate FIS
    FIS->>FIS: Sök i produktkatalog
    FIS-->>Requester: ProductList (ID, Namn)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX304-1", description: "En SP har begärt en lista över tillgängliga marknadsprodukter." },
    { id: "BRSFLEX304-2", description: "En TSO har begärt en lista över tillgängliga marknadsprodukter." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX304-3", description: "FIS har returnerat en lista över tillgängliga marknadsprodukter." }
    ],
    rejected: [
      { id: "BRSFLEX304-4", description: "Ingen data returnerad (t.ex. tomt sökresultat)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX304-5", description: "Aktör begär en lista över tillgängliga marknadsprodukter." },
    { id: "BRSFLEX304-6", description: "Flexibilitetsregistret skickar listan till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX304-7", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content302Input, content302Output]
};
