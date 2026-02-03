
import { MPSData } from '../../types';

export const mpsFlex200: MPSData = {
  id: "MPS-FLEX-200",
  title: "Avtalskonfiguration",
  domain: "Domän 2: Avtal & marknad",
  purpose: "Att hantera etablering och underhåll av den kommersiella kopplingen mellan en SP och en CU (Flexibilitetsavtal). Detta inkluderar nytecknande, leverantörsbyte (switching) och uppdatering av attribut.",
  trigger: "Affärshändelse (Nytt kontrakt med kund).",
  scenarios: [
    {
      id: "MPS-FLEX-200-Sc1",
      title: "Registrering av nytt flexavtal",
      description: "SP registrerar ett nytt avtal för att kunna handla med en resurs. Detta är en förutsättning för att senare kunna koppla resursen till en SPU/SPG.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-200-Sc1: Tecknande av Flexavtal
    participant SP as SP
    participant FIS as FIS
    participant DHV as Datahub (DHV)

    Note over SP: Affärshändelse: Kontrakt tecknat med kund
    SP->>FIS: Registrera avtal (BRS-FLEX-201)
    activate FIS
    FIS->>DHV: Verifiera kundrelation på mätpunkt
    DHV-->>FIS: Kundrelation bekräftad
    FIS->>FIS: Lagra flexavtal
    FIS-->>SP: Kvittens med avtals-ID
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-200-Sc1.1", role: "SP", action: "Registrering", 
          description: "SP skickar in uppgifter om nytt avtal (CU + Startdatum).", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc1.2", role: "FIS", action: "Validera & Spara", 
          description: "FIS validerar mot Datahub och sparar avtalet.", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-2" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar registreringen.", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-200-Sc2",
      title: "Leverantörsbyte (switching)",
      description: "En ny SP registrerar ett avtal för en resurs som redan har ett aktivt avtal. Systemet detekterar överlappet, avslutar det gamla avtalet och registrerar det nya.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-200-Sc2: Leverantörsbyte (Switching)
    participant NewSP as SP (Ny)
    participant FIS as FIS
    participant OldSP as SP (Gammal)

    Note over NewSP: Affärshändelse: Nytt avtal
    NewSP->>FIS: Registrera (BRS-FLEX-201)
    activate FIS
    FIS->>FIS: Detektera konflikt (BRS-FLEX-2030)
    
    par Hantera Gammal
        FIS->>FIS: Avsluta gammalt avtal (Terminated)
        FIS->>FIS: Städa SPU/SPG (BRS-FLEX-1330/1430)
        FIS->>OldSP: Notifiera avslut (BRS-FLEX-209)
    and Hantera Ny
        FIS->>FIS: Skapa nytt avtal
        FIS-->>NewSP: Kvittens (BRS-FLEX-201)
    end
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-200-Sc2.1", role: "SP (Ny)", action: "Registrering", 
          description: "Ny SP skickar in begäran om nytt avtal.", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.2", role: "System", action: "Detektera konflikt", 
          description: "Systemet upptäcker aktivt avtal för resursen.", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.3", role: "FIS", action: "Avsluta Gammalt Avtal", 
          description: "FIS terminerar det existerande avtalet.", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-3" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.4", role: "System", action: "Städning SPU/SPG (Start)", 
          description: "Systemet triggar bortkoppling av resurs från gammal SPU/SPG.", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-2" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.5", role: "FIS", action: "Verkställ Städning (Stop)", 
          description: "FIS har verkställt bortkopplingen från SPU/SPG.", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-5" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.6", role: "FIS", action: "Notifiera Gammal SP (Start)", 
          description: "Gammal SP informeras om att avtalet upphört p.g.a. byte.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.7", role: "SP (Gammal)", action: "Ta emot Notifiering (Stop)", 
          description: "Gammal SP har mottagit besked om avtalsavslut.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-2" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.8", role: "FIS", action: "Registrera Nytt Avtal", 
          description: "Det nya avtalet sparas och aktiveras.", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-2" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc2.9", role: "FIS", action: "Kvittens Ny SP", 
          description: "Ny SP får bekräftelse på registreringen.", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-200-Sc3",
      title: "Uppdatering av avtalsinformation",
      description: "SP uppdaterar administrativa detaljer på ett pågående avtal (t.ex. förlänger slutdatum).",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-200-Sc3: Uppdatering av avtal
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: Uppdatera avtal (BRS-FLEX-202)
    activate FIS
    FIS->>FIS: Validera ändring
    FIS->>FIS: Spara ny version
    FIS-->>SP: Bekräftelse
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-200-Sc3.1", role: "SP", action: "Begäran om uppdatering", 
          description: "SP skickar ändrade attribut för ett befintligt avtal.", 
          refBRS: "BRS-FLEX-202", refRule: "BRSFLEX202-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc3.2", role: "FIS", action: "Spara ändring", 
          description: "FIS uppdaterar avtalsinformationen.", 
          refBRS: "BRS-FLEX-202", refRule: "BRSFLEX202-2" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc3.3", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar uppdateringen.", 
          refBRS: "BRS-FLEX-202", refRule: "BRSFLEX202-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-200-Sc4",
      title: "Portföljavstämning (läs)",
      description: "SP hämtar lista eller detaljer om sina avtal för avstämning.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-200-Sc4: Hämta avtalsinformation
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: Hämta avtalsdata (BRS-FLEX-204)
    activate FIS
    FIS->>FIS: Hämta från DB
    FIS-->>SP: Avtalslista / Detaljer
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-200-Sc4.1", role: "SP", action: "Begäran", 
          description: "SP begär information om sina flexavtal.", 
          refBRS: "BRS-FLEX-204", refRule: "BRSFLEX204-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc4.2", role: "FIS", action: "Svar", 
          description: "FIS returnerar efterfrågad data.", 
          refBRS: "BRS-FLEX-204", refRule: "BRSFLEX204-2" 
        }
      ]
    }
  ]
};
