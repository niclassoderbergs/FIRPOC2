
import { MPSData } from '../../../types';

export const mpsDhv09: MPSData = {
  id: "MPS-DHV-09",
  title: "Registrering och distribution av mätvärden",
  domain: "Domän 6: Mätvärden",
  purpose: "Denna process beskriver registrering av mätvärden av nätägaren i datahubben samt distribution av mätvärden från datahubben till behöriga aktörer.",
  trigger: "Nätägare registrerar mätvärden.",
  scenarios: [
    {
      id: "MPS-DHV-09-Sc1",
      title: "Scenario 1 - En nätägare registrerar mätvärden för en kundmätpunkt",
      description: "Registrering och distribution för en kundmätpunkt.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-09-Sc1: Kundmätpunkt
    participant GO as Nätägare
    participant DHV as Datahubben
    participant Ret as Elleverantör
    participant ESCO as ESCO

    GO->>DHV: Registrera mätvärde (611)
    activate DHV
    DHV->>DHV: Validera (6001)
    DHV-->>GO: Kvittens (612)
    
    par Distribution
        DHV->>Ret: Mätvärden (643)
        DHV->>ESCO: Mätvärden (683)
    end
    deactivate DHV`,
      steps: [
        { 
          stepId: "6611 - Sc-1.1", role: "Nätägare", action: "Registrera mätvärde", 
          description: "Registrera mätvärde (Start av process).", 
          refBRS: "BRS-DHV-611", refRule: "BRS611-1" 
        },
        { 
          stepId: "6611 - Sc-1.2", role: "Datahubben", action: "Svar accepterat", 
          description: "Datahubben har svarat att meddelandet är mottaget (Slut på mottagning).", 
          refBRS: "BRS-DHV-611", refRule: "BRS611-5" 
        },
        { 
          stepId: "6611 - Sc-1.3", role: "Datahubben", action: "Validera mätvärde", 
          description: "Datahubben validerar mätvärdet (Start av validering).", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-1" 
        },
        { 
          stepId: "6611 - Sc-1.4", role: "Datahubben", action: "Lagra mätvärden", 
          description: "Datahubben har lagrat mätvärden i datahubben för giltiga transaktioner (Slut på validering).", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-5" 
        },
        { 
          stepId: "6611 - Sc-1.5", role: "Datahubben", action: "Spara lyckat svar", 
          description: "Datahubben har sparat ett lyckat svar för giltiga transaktioner.", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-6" 
        },
        { 
          stepId: "6611 - Sc-1.6", role: "Datahubben", action: "Spara felmeddelande", 
          description: "Datahubben har sparat ett felmeddelande enligt affärsreglerna för ogiltiga transaktioner.", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-10" 
        },
        { 
          stepId: "6611 - Sc-1.7", role: "Nätägare", action: "Ta emot kvittens", 
          description: "Nätägaren tar emot mätvärdeskvittens (Start av Ack).", 
          refBRS: "BRS-DHV-612", refRule: "BRS612-1" 
        },
        { 
          stepId: "6611 - Sc-1.8", role: "Datahubben", action: "Skicka kvittens", 
          description: "Datahubben har skickat mätvärdeskvittens till nätägaren (Slut på Ack).", 
          refBRS: "BRS-DHV-612", refRule: "BRS612-5" 
        },
        { 
          stepId: "6611 - Sc-1.9", role: "Elleverantör", action: "Ta emot mätvärden", 
          description: "Elleverantören tar emot mätvärden (Start av Dist).", 
          refBRS: "BRS-DHV-643", refRule: "BRS643-1" 
        },
        { 
          stepId: "6611 - Sc-1.10", role: "Datahubben", action: "Distribuera produktion", 
          description: "Datahubben har distribuerat mätvärden för avräkningspunkt av typ produktion till elleverantören.", 
          refBRS: "BRS-DHV-643", refRule: "BRS643-2" 
        },
        { 
          stepId: "6611 - Sc-1.11", role: "Datahubben", action: "Distribuera konsumtion", 
          description: "Datahubben har distribuerat mätvärden för avräkningspunkt av typ konsumtion till elleverantören (Slut på Dist).", 
          refBRS: "BRS-DHV-643", refRule: "BRS643-3" 
        },
        { 
          stepId: "6611 - Sc-1.12", role: "ESCO", action: "Ta emot mätvärden", 
          description: "ESCO tar emot mätvärden (Start av Dist ESCO).", 
          refBRS: "BRS-DHV-683", refRule: "BRS683-1" 
        },
        { 
          stepId: "6611 - Sc-1.13", role: "Datahubben", action: "Distribuera produktion", 
          description: "Datahubben har distribuerat mätvärden för avräkningspunkt av typ produktion till energitjänsteföretaget (ESCO).", 
          refBRS: "BRS-DHV-683", refRule: "BRS683-2" 
        },
        { 
          stepId: "6611 - Sc-1.14", role: "Datahubben", action: "Distribuera konsumtion", 
          description: "Datahubben har distribuerat mätvärden för avräkningspunkt av typ konsumtion till ESCO (Slut på Dist ESCO).", 
          refBRS: "BRS-DHV-683", refRule: "BRS683-3" 
        }
      ]
    },
    {
      id: "MPS-DHV-09-Sc2",
      title: "Scenario 2 - En nätägare registrerar mätvärden för en utbytespunkt",
      description: "Registrering och distribution för en utbytespunkt.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-09-Sc2: Utbytespunkt
    participant GO as Nätägare
    participant DHV as Datahubben
    participant AdjGO as Angränsande nätägare

    GO->>DHV: Registrera mätvärde (611)
    activate DHV
    DHV->>DHV: Validera (6001)
    DHV-->>GO: Kvittens (612)
    DHV->>AdjGO: Mätvärden (663)
    deactivate DHV`,
      steps: [
        { 
          stepId: "6611 - Sc-2.1", role: "Nätägare", action: "Registrera mätvärde", 
          description: "Registrera mätvärde (Start av process).", 
          refBRS: "BRS-DHV-611", refRule: "BRS611-33" 
        },
        { 
          stepId: "6611 - Sc-2.2", role: "Datahubben", action: "Svar accepterat", 
          description: "Datahubben svarar med ett lyckat svar (Slut på mottagning).", 
          refBRS: "BRS-DHV-611", refRule: "BRS611-37" 
        },
        { 
          stepId: "6611 - Sc-2.3", role: "Datahubben", action: "Validera mätvärde", 
          description: "Datahubben validerar mätvärdet (Start av validering).", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-1" 
        },
        { 
          stepId: "6611 - Sc-2.4", role: "Datahubben", action: "Lagra mätvärden", 
          description: "Datahubben har lagrat mätvärden i datahubben för giltiga transaktioner (Slut på validering).", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-5" 
        },
        { 
          stepId: "6611 - Sc-2.5", role: "Datahubben", action: "Spara lyckat svar", 
          description: "Datahubben har sparat ett lyckat svar för giltiga transaktioner.", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-6" 
        },
        { 
          stepId: "6611 - Sc-2.6", role: "Datahubben", action: "Spara felmeddelande", 
          description: "Datahubben har sparat ett felmeddelande enligt affärsreglerna för ogiltiga transaktioner.", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-10" 
        },
        { 
          stepId: "6611 - Sc-2.7", role: "Nätägare", action: "Ta emot kvittens", 
          description: "Nätägaren tar emot mätvärdeskvittens (Start av Ack).", 
          refBRS: "BRS-DHV-612", refRule: "BRS612-1" 
        },
        { 
          stepId: "6611 - Sc-2.8", role: "Datahubben", action: "Skicka kvittens", 
          description: "Datahubben har skickat mätvärdeskvittens till nätägaren (Slut på Ack).", 
          refBRS: "BRS-DHV-612", refRule: "BRS612-5" 
        },
        { 
          stepId: "6611 - Sc-2.9", role: "Angränsande nätägare", action: "Ta emot mätvärden", 
          description: "Angränsande nätägare tar emot mätvärden (Start av Dist).", 
          refBRS: "BRS-DHV-663", refRule: "BRS663-1" 
        },
        { 
          stepId: "6611 - Sc-2.10", role: "Datahubben", action: "Distribuera utbytesvärden", 
          description: "Datahubben har distribuerat mätvärden för utbytespunkten till angränsande nätägare (Slut på Dist).", 
          refBRS: "BRS-DHV-663", refRule: "BRS663-2" 
        }
      ]
    }
  ]
};
