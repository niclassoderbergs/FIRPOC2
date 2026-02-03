
import { MPSData } from '../../types';

export const mpsFlex305: MPSData = {
  id: "MPS-FLEX-305",
  title: "Produktförkvalificering (marknad)",
  domain: "Domän 3: Produkt & förkvalificering",
  purpose: "Att hantera processen för att kvalificera en resurs mot en specifik marknadsprodukt. Detta inkluderar ansökan, administrativ granskning av TSO/DSO samt genomförande av fysiska funktionstester.",
  trigger: "SP ansöker om att få leverera en produkt.",
  scenarios: [
    {
      id: "MPS-FLEX-305-Sc1",
      title: "Produktförkvalificering (TSO) - godkänd",
      description: "Huvudflöde för att testa och godkänna en resurs mot en TSO-produkt (t.ex. FCR/mFRR). Inkluderar administrativ granskning och fysiskt funktionstest.",
      refJWG: "Proc 20 & 25",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-305-Sc1: Produktförkvalificering (Godkänd)
    participant SP as SP
    participant FIS as FIS
    participant TSO as Systemoperatör (TSO)

    Note over SP: Fas 1: Ansökan
    SP->>FIS: Ansök om kvalificering (BRS-FLEX-311)
    activate FIS
    FIS-->>SP: Kvittens (Application Received)
    FIS->>TSO: Notifiera om ny ansökan (BRS-FLEX-320)
    
    Note over TSO: Fas 2: Administrativ Granskning
    TSO->>FIS: Beslut: Administrativt Godkänd (BRS-FLEX-308)
    FIS->>FIS: Uppdatera status
    FIS->>SP: Notifiera om beslut (BRS-FLEX-309)
    
    Note over TSO: Fas 3: Teknisk Testning
    TSO->>FIS: Initiera teknisk fas (BRS-FLEX-317)
    FIS->>SP: Begär teknisk data/testplan (BRS-FLEX-329)
    SP->>FIS: Skicka in testdata (BRS-FLEX-321)
    FIS->>FIS: Spara teknisk data
    FIS->>TSO: Distribuera testdata (BRS-FLEX-314)
    
    Note over TSO: Fysiskt funktionstest genomförs
    TSO->>FIS: Rapportera testresultat: Qualified (BRS-FLEX-319)
    FIS->>FIS: Spara testdata
    FIS->>SP: Skicka kvalificeringsbevis (BRS-FLEX-328)
    deactivate FIS`,
      steps: [
        // Fas 1: Ansökan
        { 
          stepId: "MPS-FLEX-305-Sc1.1", role: "SP", action: "Initiera Ansökan", 
          description: "SP skickar in ansökan om produktförkvalificering.", 
          refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.2", role: "FIS", action: "Bekräfta Mottagande", 
          description: "FIS validerar ansökan och sätter status till 'Application Received'.", 
          refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-2" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.3", role: "SP", action: "Mottag Kvittens", 
          description: "SP tar emot kvittens på att ansökan är mottagen.", 
          refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-4" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.4", role: "FIS", action: "Notifiera TSO", 
          description: "FIS notifierar TSO om att en ny ansökan inkommit.", 
          refBRS: "BRS-FLEX-320", refRule: "BRSFLEX320-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.5", role: "TSO", action: "Mottag Notifiering", 
          description: "TSO tar emot ärendet för granskning.", 
          refBRS: "BRS-FLEX-320", refRule: "BRSFLEX320-2" 
        },

        // Fas 2: Administrativt Beslut
        { 
          stepId: "MPS-FLEX-305-Sc1.6", role: "TSO", action: "Administrativt Beslut", 
          description: "TSO granskar ansökan och godkänner den administrativt.", 
          refBRS: "BRS-FLEX-308", refRule: "BRSFLEX308-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.7", role: "FIS", action: "Uppdatera Status", 
          description: "FIS uppdaterar status till 'Administratively Approved'.", 
          refBRS: "BRS-FLEX-308", refRule: "BRSFLEX308-2" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.8", role: "FIS", action: "Notifiera SP om Beslut", 
          description: "FIS skickar besked om administrativt godkännande till SP.", 
          refBRS: "BRS-FLEX-309", refRule: "BRSFLEX309-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.9", role: "SP", action: "Mottag Beslut", 
          description: "SP tar emot beskedet och inväntar nästa steg.", 
          refBRS: "BRS-FLEX-309", refRule: "BRSFLEX309-2" 
        },

        // Fas 3: Teknisk Fas
        { 
          stepId: "MPS-FLEX-305-Sc1.10", role: "TSO", action: "Starta Teknisk Fas", 
          description: "TSO indikerar att testfasen ska inledas.", 
          refBRS: "BRS-FLEX-317", refRule: "BRSFLEX317-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.11", role: "FIS", action: "Sätt Status", 
          description: "FIS sätter status till 'Prequalification Started'.", 
          refBRS: "BRS-FLEX-317", refRule: "BRSFLEX317-2" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.12", role: "FIS", action: "Begär Testdata", 
          description: "FIS notifierar SP om att skicka in tekniska parametrar och testplan.", 
          refBRS: "BRS-FLEX-329", refRule: "BRSFLEX329-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.13", role: "SP", action: "Mottag Begäran", 
          description: "SP tar emot begäran om teknisk data.", 
          refBRS: "BRS-FLEX-329", refRule: "BRSFLEX329-2" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.14", role: "SP", action: "Skicka Testdata", 
          description: "SP laddar upp teknisk data och föreslagen testtidpunkt.", 
          refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.15", role: "FIS", action: "Spara Teknisk Data", 
          description: "FIS sparar den inkomna tekniska datan.", 
          refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-2" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.16", role: "FIS", action: "Sätt Status (Ready)", 
          description: "FIS uppdaterar status till 'Ready for Test'.", 
          refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-3" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.17", role: "FIS", action: "Distribuera till TSO", 
          description: "FIS skickar SP:s tekniska data och testplan till TSO för godkännande.", 
          refBRS: "BRS-FLEX-314", refRule: "BRSFLEX314-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.18", role: "TSO", action: "Mottag Underlag", 
          description: "TSO tar emot tekniskt underlag inför test.", 
          refBRS: "BRS-FLEX-314", refRule: "BRSFLEX314-2" 
        },

        // Fas 4: Genomförande & Resultat
        { 
          stepId: "MPS-FLEX-305-Sc1.19", role: "TSO", action: "Genomför Test", 
          description: "Det fysiska testet genomförs av TSO.", 
          refBRS: "BRS-FLEX-318", refRule: "BRSFLEX318-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.20", role: "FIS", action: "Spara Testdata", 
          description: "FIS sparar testresultatdata.", 
          refBRS: "BRS-FLEX-318", refRule: "BRSFLEX318-2" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.21", role: "FIS", action: "Logga Test", 
          description: "Status uppdateras till 'Test Completed'.", 
          refBRS: "BRS-FLEX-318", refRule: "BRSFLEX318-3" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.22", role: "TSO", action: "Rapportera Resultat", 
          description: "TSO skickar in resultatet 'Qualified'.", 
          refBRS: "BRS-FLEX-319", refRule: "BRSFLEX319-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.23", role: "FIS", action: "Fastställ Status", 
          description: "FIS sätter status 'Qualified'.", 
          refBRS: "BRS-FLEX-319", refRule: "BRSFLEX319-2" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.24", role: "FIS", action: "Slutgiltig Notifiering", 
          description: "FIS notifierar SP om kvalificeringsresultatet.", 
          refBRS: "BRS-FLEX-328", refRule: "BRSFLEX328-1" 
        },
        { 
          stepId: "MPS-FLEX-305-Sc1.25", role: "SP", action: "Mottag Slutbesked", 
          description: "SP tar emot bekräftelse på kvalificering.", 
          refBRS: "BRS-FLEX-328", refRule: "BRSFLEX328-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-305-Sc2",
      title: "Produktförkvalificering (lokal produkt)",
      description: "Fullständig kvalificering mot en lokal produkt (t.ex. Lokalflex) där DSO är köpare. Innefattar både administrativ granskning och fysiskt funktionstest.",
      refJWG: "Proc 20 & 25",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-305-Sc2: Kvalificering mot lokal produkt
    participant SP as SP
    participant FIS as FIS
    participant DSO as DSO

    SP->>FIS: Ansökan (BRS-FLEX-311)
    activate FIS
    FIS->>DSO: Notifiera ansökan (BRS-FLEX-349)
    DSO->>FIS: Administrativt Beslut (BRS-FLEX-348)
    FIS->>SP: Notifiera beslut (BRS-FLEX-309)
    
    Note over DSO: Teknisk fas & Funktionstest
    DSO->>FIS: Starta teknisk fas (BRS-FLEX-317)
    FIS->>SP: Begär testdata (BRS-FLEX-329)
    SP->>FIS: Skicka data (BRS-FLEX-321)
    FIS->>DSO: Distribuera data (BRS-FLEX-314)
    DSO->>FIS: Rapportera testresultat (BRS-FLEX-319)
    FIS->>SP: Slutresultat (BRS-FLEX-328)
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-305-Sc2.1", role: "SP", action: "Ansökan", description: "SP ansöker om kvalificering.", refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-1" },
        { stepId: "MPS-FLEX-305-Sc2.2", role: "FIS", action: "Spara Ansökan", description: "FIS sparar ansökan.", refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-2" },
        { stepId: "MPS-FLEX-305-Sc2.3", role: "SP", action: "Mottag Kvittens", description: "SP tar emot kvittens.", refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-4" },
        { stepId: "MPS-FLEX-305-Sc2.4", role: "FIS", action: "Notifiera DSO", description: "FIS notifierar DSO om produktansökan.", refBRS: "BRS-FLEX-349", refRule: "BRSFLEX349-1" },
        { stepId: "MPS-FLEX-305-Sc2.5", role: "DSO", action: "Mottag Ärende", description: "DSO tar emot ansökan.", refBRS: "BRS-FLEX-349", refRule: "BRSFLEX349-2" },
        { stepId: "MPS-FLEX-305-Sc2.6", role: "DSO", action: "Beslut", description: "DSO fattar administrativt beslut.", refBRS: "BRS-FLEX-348", refRule: "BRSFLEX348-1" },
        { stepId: "MPS-FLEX-305-Sc2.7", role: "FIS", action: "Spara Beslut", description: "FIS uppdaterar status.", refBRS: "BRS-FLEX-348", refRule: "BRSFLEX348-2" },
        { stepId: "MPS-FLEX-305-Sc2.8", role: "FIS", action: "Notifiera SP", description: "FIS meddelar SP.", refBRS: "BRS-FLEX-309", refRule: "BRSFLEX309-1" },
        { stepId: "MPS-FLEX-305-Sc2.9", role: "SP", action: "Mottag Beslut", description: "SP tar emot beslutet.", refBRS: "BRS-FLEX-309", refRule: "BRSFLEX309-2" },
        { stepId: "MPS-FLEX-305-Sc2.10", role: "DSO", action: "Starta Teknisk Fas", description: "DSO indikerar teststart.", refBRS: "BRS-FLEX-317", refRule: "BRSFLEX317-8" },
        { stepId: "MPS-FLEX-305-Sc2.11", role: "FIS", action: "Sätt Status", description: "FIS sätter status 'Prequalification Started'.", refBRS: "BRS-FLEX-317", refRule: "BRSFLEX317-2" },
        { stepId: "MPS-FLEX-305-Sc2.12", role: "FIS", action: "Begär Testdata", description: "FIS begär tekniska parametrar.", refBRS: "BRS-FLEX-329", refRule: "BRSFLEX329-1" },
        { stepId: "MPS-FLEX-305-Sc2.13", role: "SP", action: "Skicka Testdata", description: "SP laddar upp data.", refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-1" },
        { stepId: "MPS-FLEX-305-Sc2.14", role: "FIS", action: "Spara Data", description: "FIS sparar teknisk data.", refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-2" },
        { stepId: "MPS-FLEX-305-Sc2.15", role: "DSO", action: "Genomför Test", description: "DSO utför funktionstestet.", refBRS: "BRS-FLEX-318", refRule: "BRSFLEX318-1" },
        { stepId: "MPS-FLEX-305-Sc2.16", role: "FIS", action: "Spara Testdata", description: "FIS sparar testdata.", refBRS: "BRS-FLEX-318", refRule: "BRSFLEX318-2" },
        { stepId: "MPS-FLEX-305-Sc2.17", role: "DSO", action: "Rapportera Resultat", description: "DSO rapporterar godkänt/avslag.", refBRS: "BRS-FLEX-319", refRule: "BRSFLEX319-1" },
        { stepId: "MPS-FLEX-305-Sc2.18", role: "FIS", action: "Slutgiltig Notifiering", description: "FIS notifierar SP.", refBRS: "BRS-FLEX-328", refRule: "BRSFLEX328-1" },
        { stepId: "MPS-FLEX-305-Sc2.19", role: "SP", action: "Mottag Resultat", description: "SP tar emot notifiering.", refBRS: "BRS-FLEX-328", refRule: "BRSFLEX328-2" }
      ]
    },
    {
      id: "MPS-FLEX-305-Sc3",
      title: "Avslag på produktansökan (administrativt)",
      description: "Scenario för när en ansökan nekas redan vid den administrativa granskningen.",
      refJWG: "Proc 25",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-305-Sc3: Avslag på ansökan
    participant TSO as TSO
    participant FIS as FIS
    participant SP as SP

    Note over TSO: Granskning visar brister
    TSO->>FIS: Beslut: Rejected (BRS-FLEX-308)
    activate FIS
    FIS->>FIS: Sätt status 'Rejected'
    FIS->>SP: Notifiera avslag med motivering (BRS-FLEX-309)
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-305-Sc3.1", role: "TSO", action: "Avslå", description: "TSO avslår ansökan med motivering.", refBRS: "BRS-FLEX-308", refRule: "BRSFLEX308-1" },
        { stepId: "MPS-FLEX-305-Sc3.2", role: "FIS", action: "Spara Avslag", description: "Status sätts till 'Rejected'.", refBRS: "BRS-FLEX-308", refRule: "BRSFLEX308-2" }, 
        { stepId: "MPS-FLEX-305-Sc3.3", role: "FIS", action: "Notifiera SP", description: "SP informeras om avslag.", refBRS: "BRS-FLEX-309", refRule: "BRSFLEX309-1" },
        { stepId: "MPS-FLEX-305-Sc3.4", role: "SP", action: "Mottag Besked", description: "SP tar emot avslag.", refBRS: "BRS-FLEX-309", refRule: "BRSFLEX309-2" }
      ]
    },
    {
      id: "MPS-FLEX-305-Sc4",
      title: "Underkänt kvalificeringstest",
      description: "Scenario för när resursen inte klarar det fysiska testet.",
      refJWG: "Proc 20",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-305-Sc4: Underkänt Test
    participant TSO as TSO
    participant FIS as FIS
    participant SP as SP

    Note over TSO: Testresultat underkänt
    TSO->>FIS: Resultat: Rejected (BRS-FLEX-319)
    activate FIS
    FIS->>FIS: Spara status 'Rejected'
    FIS->>SP: Notifiera resultat (BRS-FLEX-328)
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-305-Sc4.1", role: "TSO", action: "Rapportera Underkänt", description: "TSO rapporterar 'Rejected' efter test.", refBRS: "BRS-FLEX-319", refRule: "BRSFLEX319-1" },
        { stepId: "MPS-FLEX-305-Sc4.2", role: "FIS", action: "Spara Resultat", description: "Status sätts till 'Rejected'.", refBRS: "BRS-FLEX-319", refRule: "BRSFLEX319-2" }, 
        { stepId: "MPS-FLEX-305-Sc4.3", role: "FIS", action: "Notifiera SP", description: "SP informeras om resultatet.", refBRS: "BRS-FLEX-328", refRule: "BRSFLEX328-1" },
        { stepId: "MPS-FLEX-305-Sc4.4", role: "SP", action: "Mottag Resultat", description: "SP tar emot notifiering om resultatet.", refBRS: "BRS-FLEX-328", refRule: "BRSFLEX328-2" }
      ]
    }
  ]
};
