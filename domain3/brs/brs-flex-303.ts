
import { BRSData } from '../../types';
import { content303Input, content303Output } from '../../content-definitions';

export const brsFlex303: BRSData = {
  id: "BRS-FLEX-305", // Updated from 303
  previousId: "BRS-FLEX-303",
  title: "Begär detaljerad produktinfo",
  purpose: "Att hämta fullständig teknisk specifikation och attribut för en specifik produkt baserat på Produkt-ID.",
  actors: [
    { role: "Initiator", description: "SP / TSO" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-305: Begär detaljerad produktinfo
    participant Requester as SP/TSO
    participant FIS as FIS

    Requester->>FIS: GetProductDetails (Produkt-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Hämta attribut
        FIS-->>Requester: ProductDetails (Alla attribut)
    else Validering Fel
        FIS-->>Requester: Error (Not Found)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX305-1", description: "En SP har begärt detaljerad information om en marknadsprodukt." },
    { id: "BRSFLEX305-2", description: "En TSO har begärt detaljerad information om en marknadsprodukt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX305-3", description: "FIS har returnerat detaljerad information om marknadsprodukten." }
    ],
    rejected: [
      { id: "BRSFLEX305-4", description: "Produkt ej hittad eller behörighet saknas." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX305-5", description: "Angivet Produkt-ID måste existera.", errorCode: "E_305_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX305-6", description: "Aktör begär detaljerad information om en specifik marknadsprodukt." },
    { id: "BRSFLEX305-7", description: "Flexibilitetsregistret skickar produktinformationen till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX305-8", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content303Input, content303Output]
};
