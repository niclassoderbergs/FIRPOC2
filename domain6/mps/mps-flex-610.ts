
import { MPSData } from '../../types';

export const mpsFlex610: MPSData = {
  id: "MPS-FLEX-610",
  title: "Hantering av leveransvolym",
  domain: "Domän 6: Mätvärden",
  purpose: "Att fastställa och distribuera den faktiskt levererade volymen för en aktivering. Detta ligger till grund för verifiering (7110).",
  trigger: "Leveransperiod avslutad och mätdata inkommit.",
  scenarios: [
    {
      id: "MPS-FLEX-610-Sc1",
      title: "Rapportering av aktiverad volym (SP)",
      description: "SP skickar in beräknad levererad volym för en specifik aktivering (när SP äger beräkningen).",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-610-Sc1: Rapportering av leveransbevis
    participant SP as SP
    participant FIS as FIS
    participant SO as Marknadens Parter

    Note over SP: Beslut: Leverans för avrop är beräknad
    SP->>FIS: Rapportera levererad volym (BRS-FLEX-611)
    activate FIS
    FIS->>FIS: Lagra bevis för verifiering
    FIS-->>SP: Bekräftat
    
    Note over FIS: Systemtrigger: Volym ska distribueras
    FIS->>SO: Notifiera om fastställd volym (BRS-FLEX-619)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-610-Sc1.1", role: "SP", action: "Rapportera Volym", 
          description: "En SP har registrerat leveransdata för en aktivering.", 
          refBRS: "BRS-FLEX-611", refRule: "BRSFLEX611-1" 
        },
        { 
          stepId: "MPS-FLEX-610-Sc1.2", role: "FIS", action: "Spara Data", 
          description: "FIS har lagrat leveransdata kopplad till aktiveringen.", 
          refBRS: "BRS-FLEX-611", refRule: "BRSFLEX611-2" 
        },
        { 
          stepId: "MPS-FLEX-610-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "SP har mottagit kvittens på lagringen.", 
          refBRS: "BRS-FLEX-611", refRule: "BRSFLEX611-3" 
        },
        { 
          stepId: "MPS-FLEX-610-Sc1.4", role: "System", action: "Trigger Distribution", 
          description: "Beräknad leveransvolym har registrerats av SP.", 
          refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-1" 
        },
        { stepId: "MPS-FLEX-610-Sc1.5a", role: "FIS", action: "Distribuera TSO", description: "TSO har mottagit flexibilitetsvolym.", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-3" },
        { stepId: "MPS-FLEX-610-Sc1.5b", role: "FIS", action: "Distribuera DSO", description: "DSO har mottagit flexibilitetsvolym.", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-4" },
        { stepId: "MPS-FLEX-610-Sc1.5c", role: "FIS", action: "Distribuera BRP", description: "BRP har mottagit flexibilitetsvolym.", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-6" },
        { stepId: "MPS-FLEX-610-Sc1.5d", role: "FIS", action: "Distribuera Lev", description: "Elleverantör har mottagit flexibilitetsvolym.", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-7" }
      ]
    },
    {
      id: "MPS-FLEX-610-Sc2a",
      title: "Systemberäkning av volym - balansmarknad (TSO)",
      description: "FIS beräknar levererad volym för TSO-bud baserat på systemdata (baseline och mätvärden).",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-610-Sc2a: Systemberäkning TSO
    participant System as FIS (Calc)
    participant FIS as FIS (Admin)
    participant TSO as TSO

    Note over System: Trigger: TSO-bud & Mätdata
    System->>FIS: Beräkna volym (BRS-FLEX-6110)
    activate FIS
    FIS->>FIS: Lagra Systemvolym
    FIS->>TSO: Notifiera Volym (BRS-FLEX-619)
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-610-Sc2a.1", role: "System", action: "Trigger: TSO-bud", description: "Ett TSO-bud har registrerats och mätdata finns.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-1" },
        { stepId: "MPS-FLEX-610-Sc2a.2", role: "FIS", action: "Spara Beräkning", description: "FIS har beräknat och registrerat volym.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-4" },
        { stepId: "MPS-FLEX-610-Sc2a.3", role: "System", action: "Trigger Distribution", description: "Beräknad volym finns (Trigger).", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-2" },
        { stepId: "MPS-FLEX-610-Sc2a.4", role: "FIS", action: "Distribuera TSO", description: "TSO mottar volym.", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-3" },
        { stepId: "MPS-FLEX-610-Sc2a.5", role: "FIS", action: "Distribuera SP", description: "SP mottar volym (feedback).", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-5" }
      ]
    },
    {
      id: "MPS-FLEX-610-Sc2b",
      title: "Systemberäkning av volym - lokalmarknad (DSO)",
      description: "FIS beräknar levererad volym för DSO-bud.",
      steps: [
        { stepId: "MPS-FLEX-610-Sc2b.1", role: "System", action: "Trigger: DSO-bud", description: "Ett DSO-bud har registrerats.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-2" },
        { stepId: "MPS-FLEX-610-Sc2b.2", role: "FIS", action: "Spara Beräkning", description: "FIS har beräknat och registrerat volym.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-4" },
        { stepId: "MPS-FLEX-610-Sc2b.3", role: "FIS", action: "Distribuera DSO", description: "DSO mottar volym.", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-4" },
        { stepId: "MPS-FLEX-610-Sc2b.4", role: "FIS", action: "Distribuera SP", description: "SP mottar volym.", refBRS: "BRS-FLEX-619", refRule: "BRSFLEX619-5" }
      ]
    },
    {
      id: "MPS-FLEX-610-Sc2c",
      title: "Systemberäkning av volym - grossistmarknad (NEMO)",
      description: "FIS beräknar levererad volym för NEMO-bud.",
      steps: [
        { stepId: "MPS-FLEX-610-Sc2c.1", role: "System", action: "Trigger: NEMO-bud", description: "Ett NEMO-bud har registrerats.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-3" },
        { stepId: "MPS-FLEX-610-Sc2c.2", role: "FIS", action: "Spara Beräkning", description: "FIS har beräknat och registrerat volym.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-4" }
      ]
    },
    {
      id: "MPS-FLEX-610-Sc3",
      title: "Uthämtning av leveransvolym (query)",
      description: "Olika aktörer begär ut fastställd leveransvolym för en aktivering.",
      steps: [
        { stepId: "MPS-FLEX-610-Sc3.1a", role: "SP", action: "Begär Data", description: "SP begär volym.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-1" },
        { stepId: "MPS-FLEX-610-Sc3.1b", role: "TSO", action: "Begär Data", description: "TSO begär volym.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-2" },
        { stepId: "MPS-FLEX-610-Sc3.1c", role: "DSO", action: "Begär Data", description: "DSO begär volym.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-3" },
        { stepId: "MPS-FLEX-610-Sc3.1d", role: "BRP", action: "Begär Data", description: "BRP begär volym.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-4" },
        { stepId: "MPS-FLEX-610-Sc3.1e", role: "Lev", action: "Begär Data", description: "Elleverantör begär volym.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-5" },
        
        { stepId: "MPS-FLEX-610-Sc3.2a", role: "FIS", action: "Lev till SP", description: "Leverans till SP.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-6" },
        { stepId: "MPS-FLEX-610-Sc3.2b", role: "FIS", action: "Lev till TSO", description: "Leverans till TSO.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-7" },
        { stepId: "MPS-FLEX-610-Sc3.2c", role: "FIS", action: "Lev till DSO", description: "Leverans till DSO.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-8" },
        { stepId: "MPS-FLEX-610-Sc3.2d", role: "FIS", action: "Lev till BRP", description: "Leverans till BRP.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-9" },
        { stepId: "MPS-FLEX-610-Sc3.2e", role: "FIS", action: "Lev till Lev", description: "Leverans till Elleverantör.", refBRS: "BRS-FLEX-614", refRule: "BRSFLEX614-10" }
      ]
    }
  ]
};
