
import { MPSData } from '../../types';

export const mpsFlex500: MPSData = {
  id: "MPS-FLEX-500",
  title: "Baseline-konfiguration",
  domain: "Domän 5: Baseline",
  purpose: "Att hantera master data och konfiguration för referenskurvor (baseline). Detta inkluderar definition av godkända metoder och koppling till resurser.",
  trigger: "Behov av konfiguration av ny resurs eller regelverksändring.",
  scenarios: [
    {
      id: "MPS-FLEX-500-Sc1",
      title: "Administration av katalog för baselinemetoder",
      description: "Process där systemadministratör eller TSO registrerar nya godkända baselinemetoder i systemets katalog, vilket gör dem valbara för aktörer.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-500-Sc1: Administration av Katalog för Baselinemetoder
    participant Admin as TSO/Admin
    participant FIS as FIS

    Note over Admin: Ny baselinemetod godkänd av myndighet
    Admin->>FIS: Registrera baselinemetod (BRS-FLEX-501)
    activate FIS
    FIS->>FIS: Validera och spara
    FIS-->>Admin: Kvittens (Baselinemetod-ID)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-500-Sc1.1", role: "Admin", action: "Registrera", 
          description: "Admin har registrerat en ny godkänd baselinemetod (Startvillkor).", 
          refBRS: "BRS-FLEX-501", refRule: "BRSFLEX501-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-500-Sc1.2", role: "FIS", action: "Spara", 
          description: "FIS har registrerat den nya baselinemetoden (Slutvillkor).", 
          refBRS: "BRS-FLEX-501", refRule: "BRSFLEX501-2" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "Administratör har mottagit kvittens på registreringen (Slutvillkor).", 
          refBRS: "BRS-FLEX-501", refRule: "BRSFLEX501-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-500-Sc2",
      title: "Konfiguration av baseline för resurs",
      description: "SP väljer vilken baselinemetod som ska gälla för en specifik resurs (CU). Valet distribueras till berörda marknadsaktörer.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-500-Sc2: Konfiguration av Baseline
    participant SP as SP
    participant FIS as FIS
    participant SO as Marknadsaktörer (TSO/DSO)

    Note over SP: Beslut: Val av baselinemetod för ny resurs
    SP->>FIS: Registrera val av baselinemetod (BRS-FLEX-511)
    activate FIS
    FIS->>FIS: Lagra konfiguration
    FIS->>SO: Notifiera val av baselinemetod (BRS-FLEX-519)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-500-Sc2.1", role: "SP", action: "Välj Metod", 
          description: "SP har registrerat vald baselinemetod för en styrbar enhet (Startvillkor).", 
          refBRS: "BRS-FLEX-511", refRule: "BRSFLEX511-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.2", role: "FIS", action: "Spara Konfiguration", 
          description: "FIS har registrerat vald baselinemetod för den styrbara enheten (Slutvillkor).", 
          refBRS: "BRS-FLEX-511", refRule: "BRSFLEX511-2" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.3", role: "FIS", action: "Kvittens", 
          description: "SP har mottagit kvittens på registreringen (Slutvillkor).", 
          refBRS: "BRS-FLEX-511", refRule: "BRSFLEX511-3" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.4", role: "System", action: "Trigger Notifiering", 
          description: "Vald baselinemetod har registrerats för en CU (Startvillkor för notifiering).", 
          refBRS: "BRS-FLEX-519", refRule: "BRSFLEX519-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.5", role: "TSO", action: "Ta emot Info", 
          description: "TSO har mottagit information om vald baselinemetod (Slutvillkor).", 
          refBRS: "BRS-FLEX-519", refRule: "BRSFLEX519-2" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.6", role: "DSO", action: "Ta emot Info", 
          description: "DSO har mottagit information om vald baselinemetod (Slutvillkor).", 
          refBRS: "BRS-FLEX-519", refRule: "BRSFLEX519-3" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.7", role: "BRP", action: "Ta emot Info", 
          description: "BRP har mottagit information om vald baselinemetod (Slutvillkor).", 
          refBRS: "BRS-FLEX-519", refRule: "BRSFLEX519-4" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.8", role: "Elleverantör", action: "Ta emot Info", 
          description: "Elleverantör har mottagit information om vald baselinemetod (Slutvillkor).", 
          refBRS: "BRS-FLEX-519", refRule: "BRSFLEX519-5" 
        }
      ]
    },
    {
      id: "MPS-FLEX-500-Sc3",
      title: "Informationsutbyte baselinemetoder",
      description: "SP hämtar information om vilka baselinemetoder som är tillgängliga och deras tekniska specifikationer.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-500-Sc3: Informationsutbyte Baselinemetoder
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: Lista baselinemetoder (BRS-FLEX-504)
    FIS-->>SP: Lista över baselinemetoder
    
    SP->>FIS: Hämta detaljer (BRS-FLEX-505)
    FIS-->>SP: Specifikation för baselinemetod`,
      steps: [
        { 
          stepId: "MPS-FLEX-500-Sc3.1", role: "SP", action: "Lista", 
          description: "SP har begärt en lista över tillgängliga baselinemetoder (Startvillkor).", 
          refBRS: "BRS-FLEX-504", refRule: "BRSFLEX504-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-500-Sc3.2", role: "FIS", action: "Svara Lista", 
          description: "FIS har returnerat listan över godkända metoder (Slutvillkor).", 
          refBRS: "BRS-FLEX-504", refRule: "BRSFLEX504-2" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc3.3", role: "SP", action: "Hämta Detaljer", 
          description: "SP har begärt detaljerad information om en baselinemetod (Startvillkor).", 
          refBRS: "BRS-FLEX-505", refRule: "BRSFLEX505-1",
          isPrerequisite: true 
        },
        { 
          stepId: "MPS-FLEX-500-Sc3.4", role: "FIS", action: "Svara Detaljer", 
          description: "FIS har returnerat detaljerad metodinformation (Slutvillkor).", 
          refBRS: "BRS-FLEX-505", refRule: "BRSFLEX505-2" 
        }
      ]
    }
  ]
};
