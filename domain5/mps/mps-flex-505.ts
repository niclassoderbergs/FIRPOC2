
import { MPSData } from '../../types';

export const mpsFlex505: MPSData = {
  id: "MPS-FLEX-505",
  title: "Baseline-process & distribution",
  domain: "Domän 5: Baseline",
  purpose: "Att hantera det operativa flödet för referenskurvor (baseline), inklusive beräkning, mottagande av data och distribution till marknadens parter.",
  trigger: "Tidsfrist för leveransperiod eller mottagande av mätdata.",
  scenarios: [
    {
      id: "MPS-FLEX-505-Sc1",
      title: "Etablering av baseline (SP-initierad)",
      description: "SP rapporterar manuellt in en beräknad baseline-kurva för en period. Detta används för baselinemetoder där SP äger modellen eller där data inte finns tillgänglig automatiskt.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-505-Sc1: SP rapporterar Baseline
    participant SP as SP
    participant FIS as FIS

    Note over SP: Baselinemetod kräver SP-rapportering
    SP->>FIS: Skicka Baseline (BRS-FLEX-521)
    activate FIS
    FIS->>FIS: Validera format
    FIS->>FIS: Spara tidsserie
    FIS-->>SP: Kvittens
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-505-Sc1.1", role: "SP", action: "Rapportera", 
          description: "En SP har registrerat beräknad baselinedata (Startvillkor).", 
          refBRS: "BRS-FLEX-521", refRule: "BRSFLEX521-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-505-Sc1.2", role: "FIS", action: "Spara", 
          description: "FIS har lagrat mottagen baselinedata (Slutvillkor).", 
          refBRS: "BRS-FLEX-521", refRule: "BRSFLEX521-2" 
        },
        { 
          stepId: "MPS-FLEX-505-Sc1.3", role: "SP", action: "Mottag Kvittens", 
          description: "SP har mottagit kvittens på att data lagrats (Slutvillkor).", 
          refBRS: "BRS-FLEX-521", refRule: "BRSFLEX521-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-505-Sc2",
      title: "Systemberäkning av baseline",
      description: "FIS beräknar automatiskt baseline baserat på historiska mätvärden och konfigurerad baselinemetod. Detta sker typiskt efter leveransperiodens slut.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-505-Sc2: Systemberäkning
    participant System as Trigger
    participant FIS as FIS

    Note over System: Trigger: Marknadshändelse (TSO/DSO/NEMO)
    System->>FIS: Identifiera aktiverat bud (BRS-FLEX-5210)
    Note over System: Trigger: Tidsfrist
    System->>FIS: Kontrollera mätdatafrist (BRS-FLEX-5210)
    
    activate FIS
    FIS->>FIS: Hämta historisk data
    FIS->>FIS: Exekvera algoritm
    FIS->>FIS: Spara resultat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-505-Sc2.1a", role: "System", action: "Trigger: TSO-bud", 
          description: "TSO har registrerat ett bud (Startvillkor).", 
          refBRS: "BRS-FLEX-5210", refRule: "BRSFLEX5210-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-505-Sc2.1b", role: "System", action: "Trigger: DSO-bud", 
          description: "DSO har registrerat ett bud (Startvillkor).", 
          refBRS: "BRS-FLEX-5210", refRule: "BRSFLEX5210-2",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-505-Sc2.1c", role: "System", action: "Trigger: NEMO-bud", 
          description: "NEMO har registrerat ett bud (Startvillkor).", 
          refBRS: "BRS-FLEX-5210", refRule: "BRSFLEX5210-3",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-505-Sc2.2", role: "System", action: "Trigger: Tid", 
          description: "Rapporteringsfönstret för mätvärden har passerat (Startvillkor).", 
          refBRS: "BRS-FLEX-5210", refRule: "BRSFLEX5210-4",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-505-Sc2.3", role: "FIS", action: "Beräkna & Spara", 
          description: "FIS har beräknat och lagrat baseline för perioden (Slutvillkor).", 
          refBRS: "BRS-FLEX-5210", refRule: "BRSFLEX5210-5" 
        }
      ]
    },
    {
      id: "MPS-FLEX-505-Sc3",
      title: "Distribution av baseline",
      description: "Den fastställda referenskurvan distribueras till marknadens parter för att användas vid verifiering och avräkning.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-505-Sc3: Distribution av Baseline
    participant FIS as FIS
    participant Market as Marknadsaktörer

    Note over FIS: Trigger: Avräkningsunderlag klart
    FIS->>Market: Notifiera Baseline (BRS-FLEX-529)
    activate Market
    Market-->>FIS: Ack
    deactivate Market`,
      steps: [
        { 
          stepId: "MPS-FLEX-505-Sc3.1", role: "System", action: "Trigger: BRP Klar", 
          description: "FIS har allokerat verifierad volym för BRP (Startvillkor).", 
          refBRS: "BRS-FLEX-529", refRule: "BRSFLEX529-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-505-Sc3.2", role: "System", action: "Trigger: Lev Klar", 
          description: "FIS har allokerat verifierad volym för Elleverantör (Startvillkor).", 
          refBRS: "BRS-FLEX-529", refRule: "BRSFLEX529-2",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-505-Sc3.3", role: "BRP", action: "Mottag", 
          description: "FIS har distribuerat baselineinformationen till BRP (Slutvillkor).", 
          refBRS: "BRS-FLEX-529", refRule: "BRSFLEX529-3" 
        },
        { 
          stepId: "MPS-FLEX-505-Sc3.4", role: "Leverantör", action: "Mottag", 
          description: "FIS har distribuerat baselineinformationen till Elleverantör (Slutvillkor).", 
          refBRS: "BRS-FLEX-529", refRule: "BRSFLEX529-4" 
        },
        { 
          stepId: "MPS-FLEX-505-Sc3.5", role: "TSO", action: "Mottag", 
          description: "FIS har distribuerat baselineinformationen till TSO (Slutvillkor).", 
          refBRS: "BRS-FLEX-529", refRule: "BRSFLEX529-5" 
        },
        { 
          stepId: "MPS-FLEX-505-Sc3.6", role: "DSO", action: "Mottag", 
          description: "FIS har distribuerat baselineinformationen till DSO (Slutvillkor).", 
          refBRS: "BRS-FLEX-529", refRule: "BRSFLEX529-6" 
        }
      ]
    }
  ]
};
