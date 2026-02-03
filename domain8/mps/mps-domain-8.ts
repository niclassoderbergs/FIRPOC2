
import { MPSData } from '../../types';

export const mpsFlex800: MPSData = {
  id: "MPS-FLEX-800",
  title: "Livscykelhantering aktör",
  domain: "Domän 8: Aktörsadministration",
  purpose: "Att beskriva processerna för en marknadsaktörs (SP) väg in i, underhåll av, och väg ut ur systemet.",
  trigger: "Affärsbeslut av SP eller administrativt beslut av Systemägare.",
  scenarios: [
    {
      id: "MPS-FLEX-800-Sc1",
      title: "Onboarding av ny SP",
      description: "Processen från registrering till godkänd marknadsaktör.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc1: Onboarding
    participant SP as SP
    participant FIS as FIS
    participant Admin as FIS Admin

    SP->>FIS: Registrering (BRS-FLEX-801)
    FIS-->>SP: Konto skapat (Registered)
    
    SP->>FIS: Ansökan om kvalificering (BRS-FLEX-807)
    FIS->>Admin: Notifiera om granskning
    Admin->>FIS: Godkänn kvalificering
    FIS-->>SP: Notifiera Status Active (807-3)`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc1.1", role: "SP", action: "Registrera", 
          description: "SP registrerar företagsuppgifter.", 
          refBRS: "BRS-FLEX-801", refRule: "BRSFLEX801-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc1.2", role: "FIS", action: "Skapa konto", 
          description: "Systemet skapar ett konto med status Registered.", 
          refBRS: "BRS-FLEX-801", refRule: "BRSFLEX801-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc1.3", role: "SP", action: "Ansök", 
          description: "SP skickar in kvalificeringsunderlag.", 
          refBRS: "BRS-FLEX-807", refRule: "BRSFLEX807-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc1.4", role: "Admin", action: "Godkänn", 
          description: "Administratör godkänner ansökan och sätter status Active.", 
          refBRS: "BRS-FLEX-807", refRule: "BRSFLEX807-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc1.5", role: "SP", action: "Mottag Besked", 
          description: "SP mottar notifiering om att kvalificeringen godkänts.", 
          refBRS: "BRS-FLEX-807", refRule: "BRSFLEX807-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-800-Sc2",
      title: "Administrativa åtgärder (avstängning/återaktivering)",
      description: "Hantering av regelbrott eller tekniska problem.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc2: Avstängning och Återaktivering
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Note over Admin: Problem upptäckt
    Admin->>FIS: Stäng av SP (BRS-FLEX-815)
    FIS->>SP: Notifiera avstängning (BRS-FLEX-819)
    
    Note over SP: SP åtgärdar problem
    Admin->>FIS: Återaktivera SP (BRS-FLEX-816)
    FIS->>SP: Notifiera återaktivering (BRS-FLEX-817)`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc2.1", role: "Admin", action: "Stäng av", 
          description: "Admin initierar tillfällig avstängning.", 
          refBRS: "BRS-FLEX-815", refRule: "BRSFLEX815-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.2", role: "FIS", action: "Verkställ", 
          description: "Systemet sätter status Suspended.", 
          refBRS: "BRS-FLEX-815", refRule: "BRSFLEX815-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.3", role: "FIS", action: "Notifiera Avstängning", 
          description: "Systemet skickar notifiering om suspendering till SP.", 
          refBRS: "BRS-FLEX-819", refRule: "BRSFLEX819-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.4", role: "SP", action: "Mottag Avstängning", 
          description: "SP tar emot information om suspenderingen.", 
          refBRS: "BRS-FLEX-819", refRule: "BRSFLEX819-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.5", role: "Admin", action: "Återaktivera", 
          description: "Admin återställer status när problemet är löst.", 
          refBRS: "BRS-FLEX-816", refRule: "BRSFLEX816-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.6", role: "FIS", action: "Verkställ", 
          description: "Systemet sätter status Active.", 
          refBRS: "BRS-FLEX-816", refRule: "BRSFLEX816-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.7", role: "FIS", action: "Notifiera Återaktivering", 
          description: "Systemet skickar notifiering om återaktivering till SP.", 
          refBRS: "BRS-FLEX-817", refRule: "BRSFLEX817-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.8", role: "SP", action: "Mottag Återaktivering", 
          description: "SP tar emot information om återaktiveringen.", 
          refBRS: "BRS-FLEX-817", refRule: "BRSFLEX817-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-800-Sc3",
      title: "Avregistrering (frivilligt utträde)",
      description: "SP lämnar marknaden på egen begäran. Detta triggar automatisk avslut av avtal och städning av kopplingar.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc3: Frivilligt utträde
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: Begär utträde (BRS-FLEX-803)
    activate FIS
    FIS->>FIS: Kontrollera beroenden (Pågående bud)
    
    par Systemstädning & Notifiering
        FIS->>FIS: Avsluta Flexavtal (BRS-FLEX-2030)
        FIS->>SP: Notifiera avtal slut (BRS-FLEX-209)
        
        FIS->>FIS: Koppla bort CUs från SPU (BRS-FLEX-1330)
        FIS->>SP: Notifiera SPU unlink (BRS-FLEX-139)
        
        FIS->>FIS: Koppla bort CUs från SPG (BRS-FLEX-1430)
        FIS->>SP: Notifiera SPG unlink (BRS-FLEX-149)
    end
    
    FIS-->>SP: Bekräfta datum
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc3.1", role: "SP", action: "Begär utträde", 
          description: "SP begär att få avsluta sitt engagemang (Startvillkor).", 
          refBRS: "BRS-FLEX-803", refRule: "BRSFLEX803-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.2", role: "FIS", action: "Validera", 
          description: "Systemet kontrollerar att inga låsta bud hindrar.", 
          refBRS: "BRS-FLEX-803", refRule: "BRSFLEX803-5" 
        },
        // Avtal
        { 
          stepId: "MPS-FLEX-800-Sc3.3a", role: "System", action: "Trigger Avtalsavslut", 
          description: "Systemet upptäcker att avtal måste avslutas pga avregistrering (Startvillkor).", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-PRE-803" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.3b", role: "System", action: "Verkställ Avtalsavslut", 
          description: "Systemet terminerar alla aktiva flexavtal per avslutsdatumet (Slutvillkor).", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-3" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.3c", role: "FIS", action: "Notifiera Avtal", 
          description: "Systemet notifierar SP om att avtalen avslutats.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-1" 
        },
        // SPU
        { 
          stepId: "MPS-FLEX-800-Sc3.4a", role: "System", action: "Trigger SPU Städ", 
          description: "Systemet triggar bortkoppling från SPU pga avregistrering (Startvillkor).", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-PRE-803" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.4b", role: "System", action: "Verkställ SPU Städ", 
          description: "Systemet har kopplat bort resurser från SP:s SPU:er (Slutvillkor).", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-5" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.4c", role: "FIS", action: "Notifiera SPU Unlink", 
          description: "Systemet notifierar SP om bortkoppling från SPU.", 
          refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-1" 
        },
        // SPG
        { 
          stepId: "MPS-FLEX-800-Sc3.5a", role: "System", action: "Trigger SPG Städ", 
          description: "Systemet triggar bortkoppling från SPG pga avregistrering (Startvillkor).", 
          refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-PRE-803" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.5b", role: "System", action: "Verkställ SPG Städ", 
          description: "Systemet har kopplat bort resurser från SP:s SPG:er (Slutvillkor).", 
          refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-5" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.5c", role: "FIS", action: "Notifiera SPG Unlink", 
          description: "Systemet notifierar SP om bortkoppling från SPG.", 
          refBRS: "BRS-FLEX-149", refRule: "BRSFLEX149-1" 
        },
        // Final
        { 
          stepId: "MPS-FLEX-800-Sc3.6", role: "FIS", action: "Bekräfta", 
          description: "Systemet schemalägger avslut av kontot (Slutvillkor).", 
          refBRS: "BRS-FLEX-803", refRule: "BRSFLEX803-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-800-Sc4",
      title: "Uppdatering av aktörsinformation",
      description: "SP underhåller sin profilinformation (t.ex. kontaktuppgifter) under livscykeln.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc4: Profiluppdatering
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: Uppdatera Profil (BRS-FLEX-802)
    activate FIS
    FIS->>FIS: Validera och Spara
    FIS-->>SP: Kvittens
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc4.1", role: "SP", action: "Initiera Uppdatering", 
          description: "SP skickar in nya profiluppgifter.", 
          refBRS: "BRS-FLEX-802", refRule: "BRSFLEX802-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc4.2", role: "FIS", action: "Spara", 
          description: "FIS uppdaterar aktörsinformationen.", 
          refBRS: "BRS-FLEX-802", refRule: "BRSFLEX802-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc4.3", role: "FIS", action: "Kvittens", 
          description: "SP mottar bekräftelse på ändringen (Implicit via API-svar).", 
          refBRS: "BRS-FLEX-802", refRule: "BRSFLEX802-5" 
        }
      ]
    },
    {
      id: "MPS-FLEX-800-Sc5",
      title: "Tvingande avregistrering (revocation)",
      description: "Administrativt beslut att permanent avsluta en aktörs medverkan (t.ex. vid konkurs).",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc5: Revocation
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: Tvingande Avslut (BRS-FLEX-823)
    activate FIS
    
    par Systemstädning
        FIS->>FIS: Avsluta Flexavtal (BRS-FLEX-2030)
        FIS->>SP: Notifiera (BRS-FLEX-209)
        
        FIS->>FIS: Koppla bort CUs från SPU (BRS-FLEX-1330)
        FIS->>SP: Notifiera (BRS-FLEX-139)
        
        FIS->>FIS: Koppla bort CUs från SPG (BRS-FLEX-1430)
        FIS->>SP: Notifiera (BRS-FLEX-149)
    end

    FIS->>FIS: Avsluta Konto
    FIS->>SP: Notifiera Avslut (BRS-FLEX-829)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc5.1", role: "Admin", action: "Initiera Revocation", 
          description: "Admin begär tvingande avslut av SP (Startvillkor).", 
          refBRS: "BRS-FLEX-823", refRule: "BRSFLEX823-1" 
        },
        // Avtal
        { 
          stepId: "MPS-FLEX-800-Sc5.2a", role: "System", action: "Trigger Avtalsavslut", 
          description: "Systemet avslutar avtal pga tvingande avregistrering (Startvillkor).", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-PRE-823" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.2b", role: "System", action: "Verkställ Avtalsavslut", 
          description: "Systemet terminerar alla aktiva flexavtal (Slutvillkor).", 
          refBRS: "BRS-FLEX-2030", refRule: "BRSFLEX2030-3" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.2c", role: "FIS", action: "Notifiera Avtal", 
          description: "FIS notifierar SP om tvingande avtalsavslut.", 
          refBRS: "BRS-FLEX-209", refRule: "BRSFLEX209-1" 
        },
        // SPU
        { 
          stepId: "MPS-FLEX-800-Sc5.3a", role: "System", action: "Trigger SPU Städ", 
          description: "Systemet kopplar bort SPU pga tvingande avregistrering (Startvillkor).", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-PRE-823" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.3b", role: "System", action: "Verkställ SPU Städ", 
          description: "Systemet har kopplat bort resurser från SP:s SPU:er (Slutvillkor).", 
          refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-5" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.3c", role: "FIS", action: "Notifiera SPU Unlink", 
          description: "FIS notifierar SP om tvingande bortkoppling från SPU.", 
          refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-1" 
        },
        // SPG
        { 
          stepId: "MPS-FLEX-800-Sc5.4a", role: "System", action: "Trigger SPG Städ", 
          description: "Systemet kopplar bort SPG pga tvingande avregistrering (Startvillkor).", 
          refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-PRE-823" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.4b", role: "System", action: "Verkställ SPG Städ", 
          description: "Systemet har kopplat bort resurser från SP:s SPG:er (Slutvillkor).", 
          refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-5" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.4c", role: "FIS", action: "Notifiera SPG Unlink", 
          description: "FIS notifierar SP om tvingande bortkoppling från SPG.", 
          refBRS: "BRS-FLEX-149", refRule: "BRSFLEX149-1" 
        },
        // Final
        { 
          stepId: "MPS-FLEX-800-Sc5.5", role: "FIS", action: "Verkställ Avslut", 
          description: "Systemet terminerar kontot permanent (Slutvillkor).", 
          refBRS: "BRS-FLEX-823", refRule: "BRSFLEX823-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.6", role: "FIS", action: "Notifiera Avslut", 
          description: "FIS skickar notifiering om permanent avstängning (Startvillkor).", 
          refBRS: "BRS-FLEX-829", refRule: "BRSFLEX829-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc5.7", role: "SP", action: "Mottag Besked", 
          description: "SP mottar information om att kontot stängts (Slutvillkor).", 
          refBRS: "BRS-FLEX-829", refRule: "BRSFLEX829-2" 
        }
      ]
    }
  ]
};
