
import { MPSData } from '../../types';

export const mpsFlex205: MPSData = {
  id: "MPS-FLEX-205",
  title: "Avtalsavslut & hävning",
  domain: "Domän 2: Avtal & marknad",
  purpose: "Att hantera avvecklingen av flexibilitetsavtal. Detta kan ske frivilligt av SP, tvingande av systemet (t.ex. vid utflytt) eller på initiativ av slutkund. Processen inkluderar även städning av aggregeringar.",
  trigger: "SP begäran, Slutkundsbegäran eller Systemhändelse (Datahub).",
  scenarios: [
    {
      id: "MPS-FLEX-205-Sc1",
      title: "Frivilligt avslut av flexavtal (SP-initierad)",
      description: "SP avslutar avtalet på egen begäran. Detta triggar automatiskt städning av eventuella SPU/SPG-kopplingar.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-205-Sc1: Uppsägning med städning
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Avsluta tjänst för CU
    SP->>FIS: Avsluta avtal (BRS-FLEX-203)
    activate FIS
    FIS->>FIS: Sätt status 'Terminated'
    
    rect rgb(240, 240, 240)
    Note right of FIS: Automatisk städning
    FIS->>FIS: Koppla bort från SPU/SPG (BRS-FLEX-1330/1430)
    FIS->>SP: Notifiera bortkoppling (BRS-FLEX-139/149)
    end
    
    FIS-->>SP: Bekräftelse på avslut
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-205-Sc1.1", role: "SP", action: "Begäran om avslut", 
          description: "SP skickar begäran om att terminera ett aktivt avtal.", 
          refBRS: "BRS-FLEX-203", refRule: "BRSFLEX203-1" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc1.2", role: "FIS", action: "Terminera", 
          description: "FIS uppdaterar avtalet med slutdatum och sätter status 'Terminated'.", 
          refBRS: "BRS-FLEX-203", refRule: "BRSFLEX203-2" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc1.3", role: "System", action: "Städning (Start)", 
          description: "Systemet triggar bortkoppling från SPU/SPG p.g.a. avtalsavslut.", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-1" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc1.4", role: "FIS", action: "Städning (Stopp)", 
          description: "FIS har verkställt bortkopplingen av resursen.", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-5" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc1.5", role: "FIS", action: "Notifiera Unlink", 
          description: "FIS skickar notifiering om bortkopplingen.", 
          refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-1" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc1.6", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar avtalsavslutet till SP.", 
          refBRS: "BRS-FLEX-203", refRule: "BRSFLEX203-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-205-Sc2",
      title: "Tvingande avslut (systeminitierat/flytt)",
      description: "Hantering av 'Move-out' eller andra händelser i Datahubben som ogiltigförklarar avtalet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-205-Sc2: Tvingande avslut vid flytt
    participant DHV as Datahub (DHV)
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Systemtrigger: Flytt/Byte
    DHV->>FIS: Notifiering (Move-out händelse)
    activate FIS
    FIS->>FIS: Stäng aktivt avtal (BRS-FLEX-2030)
    
    rect rgb(240, 240, 240)
    Note right of FIS: Systemstädning
    FIS->>FIS: Ta bort från SPU/SPG
    end

    FIS->>SP: Notifiera avtal stängt (BRS-FLEX-209)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-205-Sc2.1", role: "System", action: "Trigger (DHV)", 
          description: "Datahub indikerar att förutsättningarna för avtalet upphört.", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-2" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc2.2", role: "FIS", action: "Avsluta Avtal", 
          description: "FIS sätter slutdatum och status 'Terminated'.", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-3" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc2.3", role: "System", action: "Städning (Start)", 
          description: "Systemet kopplar tvingande bort resursen från aggregeringar.", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-2" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc2.4", role: "FIS", action: "Notifiera Avtal (Start)", 
          description: "FIS skickar notifiering om att avtalet stängts.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-1" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc2.5", role: "SP", action: "Notifiera Avtal (Stopp)", 
          description: "SP mottar information om stängt avtal.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-205-Sc3",
      title: "Slutkundsinitierat avslut",
      description: "Slutkunden väljer att avsluta tjänsten via Datahubben. Hanterar även städning.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-205-Sc3: Kundavslut via Mina Sidor
    participant Kund as Slutkund
    participant DHV as Datahub (DHV)
    participant FIS as FIS
    participant SP as SP

    Kund->>DHV: Avsluta tjänst
    DHV->>FIS: Begäran om avslut (BRS-FLEX-208)
    activate FIS
    FIS->>FIS: Avsluta avtal (Terminated)
    FIS->>SP: Notifiera Avtal (BRS-FLEX-209)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-205-Sc3.1", role: "DHV", action: "Begäran från kund", 
          description: "Datahubben förmedlar kundens önskan om avslut.", 
          refBRS: "BRS-FLEX-208", refRule: "BRSFLEX208-1" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc3.2", role: "FIS", action: "Avsluta avtal", 
          description: "FIS verkställer avslutet baserat på DHV-signalen.", 
          refBRS: "BRS-FLEX-208", refRule: "BRSFLEX208-3" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc3.3", role: "FIS", action: "Notifiera Avtal (Start)", 
          description: "FIS notifierar SP om att kunden avslutat tjänsten.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-1" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc3.4", role: "SP", action: "Notifiera Avtal (Stopp)", 
          description: "SP tar emot notifiering.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-205-Sc4",
      title: "Hävning av avtal (regret)",
      description: "SP ångrar en registrering innan startdatumet har infallit. Ingen städning behövs då resursen ej hunnit aktiveras.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-205-Sc4: Hävning (Regret)
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Felaktig registrering, makulera innan start
    SP->>FIS: Häv avtal (BRS-FLEX-207)
    activate FIS
    FIS->>FIS: Validera Startdatum > Nu
    FIS->>FIS: Sätt status 'Cancelled'
    FIS-->>SP: Bekräftelse
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-205-Sc4.1", role: "SP", action: "Begäran om hävning", 
          description: "SP begär att häva ett avtal som ännu inte trätt i kraft.", 
          refBRS: "BRS-FLEX-207", refRule: "BRSFLEX207-1" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc4.2", role: "FIS", action: "Makulera", 
          description: "FIS sätter avtalets status till 'Cancelled'.", 
          refBRS: "BRS-FLEX-207", refRule: "BRSFLEX207-2" 
        },
        { 
          stepId: "MPS-FLEX-205-Sc4.3", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar hävningen.", 
          refBRS: "BRS-FLEX-207", refRule: "BRSFLEX207-3" 
        }
      ]
    }
  ]
};
