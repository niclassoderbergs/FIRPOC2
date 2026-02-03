
import { MPSData } from '../../types';

export const mpsFlex400: MPSData = {
  id: "MPS-FLEX-400",
  title: "Hantering av nätbegränsningar",
  domain: "Domän 4: Nätbegränsningar",
  purpose: "Att hantera processer för att identifiera, registrera och kommunicera begränsningar i elnätet (Congestion Management). Syftet är att säkerställa driftsäkerheten genom att hindra aktivering av flexibilitet som skulle förvärra en nätflaskhals.",
  trigger: "DSO identifierar ett behov av att begränsa effektuttag/inmatning i ett specifikt nätområde.",
  scenarios: [
    {
      id: "MPS-FLEX-400-Sc1",
      title: "Identifiering och registrering av nätbegränsning",
      description: "Ett sammanhållet flöde där DSO först hämtar en lista på aktiva resurser, registrerar en begränsning, och därefter notifieras berörd SP.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-400-Sc1: Hantering av flaskhals i nätet
    participant DSO as Nätägare (DSO)
    participant FIS as FIS
    participant SP as SP

    Note over DSO: Affärshändelse: Flaskhals detekterad i lokalt nät
    DSO->>FIS: Begär resurslista för område (BRS-FLEX-404)
    FIS-->>DSO: Lista på mätpunkter returneras
    
    DSO->>FIS: Registrera tillfälligt effekttak (BRS-FLEX-401)
    activate FIS
    FIS->>FIS: Lagra begränsning
    FIS->>SP: Notifiera berörd SP om taket (BRS-FLEX-409)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-400-Sc1.1", role: "DSO", action: "Hämta Resurser", 
          description: "DSO begär en sammanställning av resurser i det påverkade nätområdet.", 
          refBRS: "BRS-FLEX-404", refRule: "BRSFLEX404-1" 
        },
        { 
          stepId: "MPS-FLEX-400-Sc1.2", role: "FIS", action: "Returnera Lista", 
          description: "FIS returnerar listan på mätpunkter som har aktiva CUs i området.", 
          refBRS: "BRS-FLEX-404", refRule: "BRSFLEX404-2" 
        },
        { 
          stepId: "MPS-FLEX-400-Sc1.3", role: "DSO", action: "Registrera Begränsning", 
          description: "Baserat på listan registrerar DSO en effektbegränsning.", 
          refBRS: "BRS-FLEX-401", refRule: "BRSFLEX401-1" 
        },
        { 
          stepId: "MPS-FLEX-400-Sc1.4", role: "FIS", action: "Spara Begränsning", 
          description: "FIS validerar och sparar begränsningen.", 
          refBRS: "BRS-FLEX-401", refRule: "BRSFLEX401-2" 
        },
        { 
          stepId: "MPS-FLEX-400-Sc1.5", role: "FIS", action: "Bekräfta till DSO", 
          description: "FIS skickar kvittens till DSO.", 
          refBRS: "BRS-FLEX-401", refRule: "BRSFLEX401-3" 
        },
        { 
          stepId: "MPS-FLEX-400-Sc1.6", role: "FIS", action: "Initiera Notifiering", 
          description: "FIS identifierar berörd SP och skickar information.", 
          refBRS: "BRS-FLEX-409", refRule: "BRSFLEX409-1" 
        },
        { 
          stepId: "MPS-FLEX-400-Sc1.7", role: "SP", action: "Ta emot Notifiering", 
          description: "SP tar emot information om begränsningen.", 
          refBRS: "BRS-FLEX-409", refRule: "BRSFLEX409-2" 
        }
      ]
    }
  ]
};
