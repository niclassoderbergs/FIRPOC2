
import { MPSData } from '../../types';

export const mpsFlex310: MPSData = {
  id: "MPS-FLEX-310",
  title: "Nätförkvalificering (nätanalys)",
  domain: "Domän 3: Produkt & förkvalificering",
  purpose: "Att hantera processen där Nätägaren (DSO) kontrollerar om en resurs eller grupp av resurser kan aktiveras utan att skapa problem i det lokala elnätet (Grid Prequalification).",
  trigger: "SP begär nätanalys, ofta som försteg till en produktansökan.",
  scenarios: [
    {
      id: "MPS-FLEX-310-Sc1",
      title: "Nätförkvalificering (nätanalys) - godkänd",
      description: "Topologisk kontroll utförd av DSO. Detta är en skrivbordsanalys för att säkerställa att elnätet klarar den tänkta effekten. Inget fysiskt test av resursen ingår här.",
      refJWG: "Proc 19",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-310-Sc1: Nätanalys av flexibilitetsresurs
    participant SP as SP
    participant FIS as FIS
    participant DSO as Nätägare (DSO)

    Note over SP: Affärshändelse: Begäran om nätförkvalificering
    SP->>FIS: Begär nätförkvalificering (BRS-FLEX-331)
    activate FIS
    FIS-->>SP: Kvittens (Pending Grid Check)
    FIS->>DSO: Skicka begäran om nätanalys (BRS-FLEX-339)
    
    Note over DSO: Nätanalys (Power Flow) utförs
    DSO->>FIS: Rapportera analyssvar: Approved (BRS-FLEX-332)
    FIS->>FIS: Spara eventuella villkor för aktivering
    FIS-->>DSO: Kvittens
    FIS->>SP: Skicka besked om nätgodkännande (BRS-FLEX-338)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-310-Sc1.1", role: "SP", action: "Begäran", 
          description: "SP begär nätförkvalificering för en eller flera resurser.", 
          refBRS: "BRS-FLEX-331", refRule: "BRSFLEX331-1" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.2", role: "FIS", action: "Spara Begäran", 
          description: "FIS sparar begäran och sätter status till 'Pending Grid Check'.", 
          refBRS: "BRS-FLEX-331", refRule: "BRSFLEX331-2" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.3", role: "SP", action: "Mottag Kvittens", 
          description: "SP mottar bekräftelse på begäran.", 
          refBRS: "BRS-FLEX-331", refRule: "BRSFLEX331-3" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.4", role: "FIS", action: "Notifiera DSO (Analys)", 
          description: "FIS skickar underlag för topologisk nätanalys till DSO.", 
          refBRS: "BRS-FLEX-339", refRule: "BRSFLEX339-1" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.5", role: "DSO", action: "Mottag Underlag", 
          description: "DSO tar emot data för analys.", 
          refBRS: "BRS-FLEX-339", refRule: "BRSFLEX339-2" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.6", role: "DSO", action: "Rapportera Analys", 
          description: "DSO utför nätanalys (ej fysiskt test) och rapporterar 'Approved'.", 
          refBRS: "BRS-FLEX-332", refRule: "BRSFLEX332-1" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.7", role: "FIS", action: "Uppdatera Status", 
          description: "FIS uppdaterar status till Grid Qualified.", 
          refBRS: "BRS-FLEX-332", refRule: "BRSFLEX332-2" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.8", role: "FIS", action: "Spara Villkor", 
          description: "FIS sparar eventuella villkor kopplade till godkännandet.", 
          refBRS: "BRS-FLEX-332", refRule: "BRSFLEX332-3" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.9", role: "DSO", action: "Mottag Kvittens", 
          description: "DSO tar emot kvittens på att resultatet sparats.", 
          refBRS: "BRS-FLEX-332", refRule: "BRSFLEX332-4" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.10", role: "FIS", action: "Notifiera SP", 
          description: "FIS notifierar SP om utfallet och eventuella begränsningar.", 
          refBRS: "BRS-FLEX-338", refRule: "BRSFLEX338-1" 
        },
        { 
          stepId: "MPS-FLEX-310-Sc1.11", role: "SP", action: "Mottag Resultat", 
          description: "SP tar emot nätanalysresultatet.", 
          refBRS: "BRS-FLEX-338", refRule: "BRSFLEX338-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-310-Sc2",
      title: "Avslag på nätförkvalificering",
      description: "Scenario där DSO nekar aktivering på grund av nätbegränsningar.",
      refJWG: "Proc 19",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-310-Sc2: Nätavslag
    participant DSO as DSO
    participant FIS as FIS
    participant SP as SP

    Note over DSO: Nätanalys visar flaskhalsar
    DSO->>FIS: Resultat: Rejected (BRS-FLEX-332)
    activate FIS
    FIS->>FIS: Spara status 'Rejected'
    FIS->>SP: Notifiera SP (BRS-FLEX-338)
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-310-Sc2.1", role: "DSO", action: "Avslå", description: "DSO rapporterar 'Rejected'.", refBRS: "BRS-FLEX-332", refRule: "BRSFLEX332-1" },
        { stepId: "MPS-FLEX-310-Sc2.2", role: "FIS", action: "Spara", description: "Status sätts till 'Rejected'.", refBRS: "BRS-FLEX-332", refRule: "BRSFLEX332-2" },
        { stepId: "MPS-FLEX-310-Sc2.3", role: "FIS", action: "Notifiera SP", description: "SP informeras om avslaget.", refBRS: "BRS-FLEX-338", refRule: "BRSFLEX338-1" },
        { stepId: "MPS-FLEX-310-Sc2.4", role: "SP", action: "Mottag Resultat", description: "SP tar emot besked.", refBRS: "BRS-FLEX-338", refRule: "BRSFLEX338-2" }
      ]
    }
  ]
};
