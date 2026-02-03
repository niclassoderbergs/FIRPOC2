
import { MPSData } from '../../types';

export const mpsFlex300: MPSData = {
  id: "MPS-FLEX-300",
  title: "Produktkonfiguration",
  domain: "Domän 3: Produkt & förkvalificering",
  purpose: "Att hantera master data för marknadsprodukter. Detta innefattar definition av tekniska krav, attribut och regler för de produkter (t.ex. mFRR, FCR, Lokalflex) som handlas på marknaden.",
  trigger: "Behov av ny produkt eller uppdatering av regelverk.",
  scenarios: [
    {
      id: "MPS-FLEX-300-Sc1",
      title: "Administration av marknadsprodukter",
      description: "TSO:ns process för att definiera och publicera produkter som SP kan kvalificera sig mot.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-300-Sc1: Hantering av Produkter
    participant TSO as TSO
    participant FIS as FIS
    participant SP as SP

    Note over TSO: Ny marknadsprodukt definieras
    TSO->>FIS: Registrera Produkt (BRS-FLEX-301)
    activate FIS
    FIS-->>TSO: Produkt skapad
    deactivate FIS
    
    Note over SP: SP söker information
    SP->>FIS: Lista Produkter (BRS-FLEX-304)
    activate FIS
    FIS-->>SP: Produktlista
    deactivate FIS
    
    SP->>FIS: Hämta Detaljer (BRS-FLEX-305)
    activate FIS
    FIS-->>SP: Tekniska krav
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-300-Sc1.1", role: "TSO", action: "Registrera Produkt", description: "TSO definierar en ny produkt.", refBRS: "BRS-FLEX-301", refRule: "BRSFLEX301-1" },
        { stepId: "MPS-FLEX-300-Sc1.2", role: "FIS", action: "Spara Produkt", description: "FIS lagrar produktdefinitionen.", refBRS: "BRS-FLEX-301", refRule: "BRSFLEX301-2" },
        { stepId: "MPS-FLEX-300-Sc1.3", role: "TSO", action: "Mottag Kvittens", description: "TSO får bekräftelse.", refBRS: "BRS-FLEX-301", refRule: "BRSFLEX301-3" },
        { stepId: "MPS-FLEX-300-Sc1.4", role: "SP", action: "Lista Produkter", description: "SP listar tillgängliga produkter.", refBRS: "BRS-FLEX-304", refRule: "BRSFLEX304-1" },
        { stepId: "MPS-FLEX-300-Sc1.5", role: "FIS", action: "Returnera Lista", description: "FIS returnerar listan.", refBRS: "BRS-FLEX-304", refRule: "BRSFLEX304-2" },
        { stepId: "MPS-FLEX-300-Sc1.6", role: "SP", action: "Hämta Detaljer", description: "SP hämtar specifik kravbild.", refBRS: "BRS-FLEX-305", refRule: "BRSFLEX305-1" },
        { stepId: "MPS-FLEX-300-Sc1.7", role: "FIS", action: "Returnera Detaljer", description: "FIS returnerar produktens attribut.", refBRS: "BRS-FLEX-305", refRule: "BRSFLEX305-2" }
      ]
    }
  ]
};
