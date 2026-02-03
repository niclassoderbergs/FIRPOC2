
import { BRSData } from '../../types';
import { content301Input, content301Output } from '../../content-definitions';

export const brsFlex301: BRSData = {
  id: "BRS-FLEX-301",
  title: "TSO registrerar marknadsprodukt",
  purpose: "Att definiera en ny marknadsprodukt (t.ex. mFRR, FCR) i systemet med tillhörande tekniska krav och attribut. Detta möjliggör för SP att ansöka om kvalificering mot denna produkt.",
  actors: [
    { role: "Initiator", description: "Systemoperatör (TSO)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-301: TSO registrerar marknadsprodukt
    participant TSO as TSO
    participant FIS as FIS

    TSO->>FIS: RegisterProduct (Namn, Attribut, Krav)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa Produktdefinition
        FIS-->>TSO: ProductRegistered (Produkt-ID)
    else Validering Fel
        FIS-->>TSO: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX301-1", description: "En systemoperatör (TSO) har registrerat en ny marknadsprodukt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX301-2", description: "FIS har registrerat den nya marknadsprodukten." },
      { id: "BRSFLEX301-3", description: "TSO har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX301-4", description: "Ingen produkt skapad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX301-5", description: "Produktnamn måste vara unikt.", errorCode: "E_301_DUPLICATE_NAME" },
    { id: "BRSFLEX301-6", description: "Tidsupplösning måste vara giltig (t.ex. 15, 60 min).", errorCode: "E_301_INVALID_RESOLUTION" }
  ],
  process: [
    { id: "BRSFLEX301-7", description: "Systemoperatören (TSO) registrerar en ny marknadsprodukt." },
    { id: "BRSFLEX301-8", description: "Flexibilitetsregistret skickar en kvittens till TSO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX301-9", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content301Input, content301Output]
};
