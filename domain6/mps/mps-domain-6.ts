
import { MPSData } from '../../types';

export const mpsFlex600: MPSData = {
  id: "MPS-FLEX-600",
  title: "Hantering av mätvärden",
  domain: "Domän 6: Mätvärden",
  purpose: "Att hantera insamling, validering och distribution av rådata (mätvärden) från mätpunkter och styrenheter.",
  trigger: "Periodisk insamling eller behov av analysdata.",
  scenarios: [
    {
      id: "MPS-FLEX-600-Sc1a",
      title: "Mätvärdesflöde balansmarknad (TSO)",
      description: "Hantering av mätvärden för balansprodukter. SP rapporterar data som distribueras till TSO och BRP.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-600-Sc1a: Mätvärdesflöde TSO
    participant SP as SP
    participant FIS as FIS
    participant TSO as TSO
    participant BRP as BRP

    SP->>FIS: Rapportera mätvärden (BRS-FLEX-601)
    activate FIS
    FIS->>FIS: Lagra tidsserier
    FIS-->>SP: Kvittens (BRS-FLEX-601)
    
    Note over FIS: Trigger: TSO-bud finns (609-2)
    FIS->>TSO: Distribuera mätdata (BRS-FLEX-609)
    FIS->>BRP: Distribuera mätdata
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-600-Sc1a.1", role: "SP", action: "Rapportera Mätvärden", 
          description: "SP rapporterar mätvärden för en resurs.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1a.2", role: "FIS", action: "Spara Data", 
          description: "FIS lagrar mätvärden.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-2" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1a.3", role: "FIS", action: "Kvittens", 
          description: "SP mottar kvittens på rapporteringen.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-3" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1a.4", role: "System", action: "Check TSO-bud", 
          description: "Kontroll om TSO har registrerat energibud (Trigger).", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-2" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1a.5", role: "FIS", action: "Distribuera TSO", 
          description: "FIS skickar mätdata till TSO.", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-5" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1a.6", role: "FIS", action: "Distribuera BRP", 
          description: "FIS skickar mätdata till BRP.", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-7" 
        }
      ]
    },
    {
      id: "MPS-FLEX-600-Sc1b",
      title: "Mätvärdesflöde lokalmarknad (DSO)",
      description: "Hantering av mätvärden för lokala produkter. Data distribueras till DSO och Elleverantör.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-600-Sc1b: Mätvärdesflöde DSO
    participant SP as SP
    participant FIS as FIS
    participant DSO as DSO
    participant Lev as Elleverantör

    SP->>FIS: Rapportera mätvärden (BRS-FLEX-601)
    activate FIS
    FIS->>FIS: Lagra tidsserier
    FIS-->>SP: Kvittens (BRS-FLEX-601)
    
    Note over FIS: Trigger: DSO-bud finns (609-3)
    FIS->>DSO: Distribuera mätdata (BRS-FLEX-609)
    FIS->>Lev: Distribuera mätdata
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-600-Sc1b.1", role: "SP", action: "Rapportera Mätvärden", 
          description: "SP rapporterar mätvärden.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1b.2", role: "FIS", action: "Spara Data", 
          description: "FIS lagrar mätvärden.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-2" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1b.3", role: "FIS", action: "Kvittens", 
          description: "SP mottar kvittens på rapporteringen.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-3" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1b.4", role: "System", action: "Check DSO-bud", 
          description: "Kontroll om DSO har registrerat energibud (Trigger).", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-3" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1b.5", role: "FIS", action: "Distribuera DSO", 
          description: "FIS skickar mätdata till DSO.", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-6" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1b.6", role: "FIS", action: "Distribuera Lev", 
          description: "FIS skickar mätdata till Elleverantör.", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-8" 
        }
      ]
    },
    {
      id: "MPS-FLEX-600-Sc1c",
      title: "Mätvärdesflöde grossistmarknad (NEMO)",
      description: "Distribution av mätvärden kopplade till DA/ID-handel.",
      steps: [
        { 
          stepId: "MPS-FLEX-600-Sc1c.1", role: "SP", action: "Rapportera Mätvärden", 
          description: "SP rapporterar mätvärden.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1c.2", role: "FIS", action: "Spara Data", 
          description: "FIS lagrar mätvärden.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-2" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1c.3", role: "FIS", action: "Kvittens", 
          description: "SP mottar kvittens på rapporteringen.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-3" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1c.4", role: "System", action: "Check NEMO-bud", 
          description: "Kontroll om NEMO-handel finns (Trigger).", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-4" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1c.5", role: "FIS", action: "Distribuera", 
          description: "FIS skickar mätdata till berörda parter.", 
          refBRS: "BRS-FLEX-609", refRule: "BRSFLEX609-1" 
        }
      ]
    },
    {
      id: "MPS-FLEX-600-Sc2",
      title: "Uthämtning av CU-mätvärden (query)",
      description: "SP eller systemfunktion begär ut lagrade tidsserier (sub-metering) för en CU.",
      steps: [
        { 
          stepId: "MPS-FLEX-600-Sc2.1", role: "Berättigad Aktör", action: "Begär Data", 
          description: "En berättigad aktör (SP, TSO, DSO) har begärt mätvärden för en styrbar enhet (CU).", 
          refBRS: "BRS-FLEX-604", refRule: "BRSFLEX604-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc2.2", role: "FIS", action: "Leverera Data", 
          description: "FIS har returnerat efterfrågade mätvärden.", 
          refBRS: "BRS-FLEX-604", refRule: "BRSFLEX604-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-600-Sc3",
      title: "Uthämtning av mätpunktsdata (från DHV)",
      description: "Olika aktörer begär officiella mätvärden. FIS agerar proxy mot Datahubben.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-600-Sc3: Uthämtning av Mätpunktsdata
    participant Req as Aktör
    participant FIS as FIS
    participant DHV as Datahubben

    Req->>FIS: Begär MP-data (BRS-FLEX-624)
    activate FIS
    FIS->>DHV: Hämta
    DHV-->>FIS: Data
    FIS-->>Req: Returnera Data
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-600-Sc3.1a", role: "SP", action: "Begär Data", description: "En SP har begärt mätvärden.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-1" },
        { stepId: "MPS-FLEX-600-Sc3.1b", role: "TSO", action: "Begär Data", description: "En TSO har begärt mätvärden.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-2" },
        { stepId: "MPS-FLEX-600-Sc3.1c", role: "DSO", action: "Begär Data", description: "En DSO har begärt mätvärden.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-3" },
        { stepId: "MPS-FLEX-600-Sc3.1d", role: "BRP", action: "Begär Data", description: "En BRP har begärt mätvärden.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-4" },
        { stepId: "MPS-FLEX-600-Sc3.1e", role: "Elleverantör", action: "Begär Data", description: "En elleverantör har begärt mätvärden.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-5" },
        
        { stepId: "MPS-FLEX-600-Sc3.2", role: "FIS", action: "Hämta (DHV)", description: "FIS har hämtat officiella mätvärden från DHV.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-6" },
        
        { stepId: "MPS-FLEX-600-Sc3.3a", role: "FIS", action: "Leverera SP", description: "FIS har levererat data till SP.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-7" },
        { stepId: "MPS-FLEX-600-Sc3.3b", role: "FIS", action: "Leverera TSO", description: "FIS har levererat data till TSO.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-8" },
        { stepId: "MPS-FLEX-600-Sc3.3c", role: "FIS", action: "Leverera DSO", description: "FIS har levererat data till DSO.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-9" },
        { stepId: "MPS-FLEX-600-Sc3.3d", role: "FIS", action: "Leverera BRP", description: "FIS har levererat data till BRP.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-10" },
        { stepId: "MPS-FLEX-600-Sc3.3e", role: "FIS", action: "Leverera Lev", description: "FIS har levererat data till elleverantör.", refBRS: "BRS-FLEX-624", refRule: "BRSFLEX624-11" }
      ]
    }
  ]
};
