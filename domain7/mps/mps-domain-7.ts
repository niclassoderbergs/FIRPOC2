
import { MPSData } from '../../types';

// --- MPS-FLEX-700: Budgivning ---
export const mpsFlex700: MPSData = {
  id: "MPS-FLEX-700",
  title: "Budgivning och kapacitetskontroll",
  domain: "Domän 7: Verifiering & Budgivning",
  purpose: "Att hantera inskick av bud från olika marknadsplatser samt validera att det finns teknisk täckning (kapacitet) för dessa bud innan de accepteras slutgiltigt.",
  trigger: "Marknadsaktör skickar in bud inför Gate Closure.",
  scenarios: [
    {
      id: "MPS-FLEX-700-Sc1a",
      title: "Hantering av kapacitetsbud (TSO)",
      description: "Process för att ta emot och validera bud från balansmarknaden.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-700-Sc1a: Teknisk kontroll av bud på balansmarknaden
    participant TSO as TSO (Balansmarknad)
    participant FIS as FIS

    Note over TSO: Affärshändelse: Gate Closure närmar sig för nästa marknadsperiod
    TSO->>FIS: Registrera kapacitetsbud (BRS-FLEX-701)
    activate FIS
    FIS->>FIS: Beräkna aktuell aggregerad kapacitet (BRS-FLEX-7010)
    FIS->>TSO: Skicka valideringsbesked (BRS-FLEX-709)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-700-Sc1a.1", role: "TSO", action: "Registrera Bud", 
          description: "TSO skickar in ett kapacitetsbud.", 
          refBRS: "BRS-FLEX-701", refRule: "BRSFLEX701-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.2", role: "FIS", action: "Lagra Bud", 
          description: "FIS lagrar budet preliminärt.", 
          refBRS: "BRS-FLEX-701", refRule: "BRSFLEX701-2" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.3", role: "TSO", action: "Ta emot Kvittens", 
          description: "TSO tar emot kvittens på registreringen.", 
          refBRS: "BRS-FLEX-701", refRule: "BRSFLEX701-3" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.4", role: "FIS", action: "Kapacitetskontroll", 
          description: "Systemet beräknar om resurserna täcker budet (aggregerad nivå).", 
          refBRS: "BRS-FLEX-7010", refRule: "BRSFLEX7010-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.5", role: "FIS", action: "Lagra Resultat", 
          description: "FIS lagrar resultatet av kapacitetskontrollen.", 
          refBRS: "BRS-FLEX-7010", refRule: "BRSFLEX7010-3" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.6", role: "FIS", action: "Notifiera Resultat", 
          description: "FIS meddelar TSO om budet är tekniskt godkänt (Valid/Invalid).", 
          refBRS: "BRS-FLEX-709", refRule: "BRSFLEX709-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.7", role: "TSO", action: "Ta emot Resultat", 
          description: "TSO tar emot notifiering om budets kapacitet.", 
          refBRS: "BRS-FLEX-709", refRule: "BRSFLEX709-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-700-Sc1b",
      title: "Hantering av kapacitetsbud (DSO)",
      description: "Process för att ta emot och validera bud från lokala flexibilitetsmarknader.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-700-Sc1b: Teknisk kontroll av lokala bud
    participant DSO as DSO (Lokalmarknad)
    participant FIS as FIS

    Note over DSO: Affärshändelse: Lokalt behov identifierat
    DSO->>FIS: Registrera kapacitetsbud (BRS-FLEX-711)
    activate FIS
    FIS->>FIS: Beräkna kapacitet (BRS-FLEX-7010)
    FIS->>DSO: Skicka valideringsbesked (BRS-FLEX-719)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-700-Sc1b.1", role: "DSO", action: "Registrera Bud", 
          description: "DSO skickar in ett lokalt kapacitetsbud.", 
          refBRS: "BRS-FLEX-711", refRule: "BRSFLEX711-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1b.2", role: "FIS", action: "Lagra Bud", 
          description: "FIS lagrar det lokala budet.", 
          refBRS: "BRS-FLEX-711", refRule: "BRSFLEX711-2" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1b.3", role: "DSO", action: "Ta emot Kvittens", 
          description: "DSO tar emot kvittens på registreringen.", 
          refBRS: "BRS-FLEX-711", refRule: "BRSFLEX711-3" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1b.4", role: "FIS", action: "Kapacitetskontroll", 
          description: "Systemet beräknar kapacitet och kontrollerar mot nätbegränsningar.", 
          refBRS: "BRS-FLEX-7010", refRule: "BRSFLEX7010-2" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1b.5", role: "FIS", action: "Lagra Resultat", 
          description: "FIS lagrar resultatet av kontrollen.", 
          refBRS: "BRS-FLEX-7010", refRule: "BRSFLEX7010-3" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1b.6", role: "FIS", action: "Notifiera Resultat", 
          description: "FIS meddelar DSO om budet är tekniskt godkänt.", 
          refBRS: "BRS-FLEX-719", refRule: "BRSFLEX719-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1b.7", role: "DSO", action: "Ta emot Resultat", 
          description: "DSO tar emot notifiering om budets kapacitet.", 
          refBRS: "BRS-FLEX-719", refRule: "BRSFLEX719-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-700-Sc2",
      title: "Hantering av grossistbud (NEMO)",
      description: "Registrering av bud från Day-Ahead eller Intraday-marknaden via NEMO.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-700-Sc2: Registrering av NEMO-handel
    participant NEMO as NEMO
    participant FIS as FIS

    NEMO->>FIS: Registrera DA/ID handel (BRS-FLEX-751)
    activate FIS
    FIS->>FIS: Lagra buddata
    FIS-->>NEMO: Kvittens
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-700-Sc2.1", role: "NEMO", action: "Registrera Handel", 
          description: "NEMO registrerar grossisthandel.", 
          refBRS: "BRS-FLEX-751", refRule: "BRSFLEX751-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc2.2", role: "FIS", action: "Lagra Bud", 
          description: "FIS lagrar handelsinformationen.", 
          refBRS: "BRS-FLEX-751", refRule: "BRSFLEX751-2" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc2.3", role: "NEMO", action: "Ta emot Kvittens", 
          description: "NEMO tar emot kvittens på registreringen.", 
          refBRS: "BRS-FLEX-751", refRule: "BRSFLEX751-3" 
        }
      ]
    }
  ]
};

// --- MPS-FLEX-710: Aktivering och Verifiering ---
export const mpsFlex710: MPSData = {
  id: "MPS-FLEX-710",
  title: "Aktivering och verifiering",
  domain: "Domän 7: Verifiering & Budgivning",
  purpose: "Att registrera att en leverans (aktivering) har skett och därefter verifiera utfallet genom att jämföra mätvärden mot bud och baseline.",
  trigger: "Marknadshändelse (Avrop) och efterföljande tidsfrist för mätvärden.",
  scenarios: [
    {
      id: "MPS-FLEX-710-Sc0a",
      title: "Registrering av aktivering (TSO - balansmarknad)",
      description: "TSO rapporterar till FIS att en aktivering har skett (avrop) på balansmarknaden. Detta skapar underlaget som verifieringen senare körs mot.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-710-Sc0a: Registrering av TSO Aktivering
    participant TSO as TSO
    participant FIS as FIS

    TSO->>FIS: Registrera aktiverat energibud (BRS-FLEX-731)
    FIS->>FIS: Energikontroll (BRS-FLEX-7310)
    FIS->>TSO: Notifiera resultat (BRS-FLEX-738)`,
      steps: [
        { 
          stepId: "MPS-FLEX-710-Sc0a.1", role: "TSO", action: "Reg. Aktivering", 
          description: "TSO registrerar avrop (energibud).", 
          refBRS: "BRS-FLEX-731", refRule: "BRSFLEX731-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0a.2", role: "FIS", action: "Spara", 
          description: "FIS lagrar TSO-aktivering.", 
          refBRS: "BRS-FLEX-731", refRule: "BRSFLEX731-2" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0a.3", role: "FIS", action: "Starta Energikontroll", 
          description: "Systemet initierar energivalidering mot nätbegränsningar.", 
          refBRS: "BRS-FLEX-7310", refRule: "BRSFLEX7310-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0a.4", role: "FIS", action: "Spara Kontrollresultat", 
          description: "Resultatet av energikontrollen lagras.", 
          refBRS: "BRS-FLEX-7310", refRule: "BRSFLEX7310-2" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0a.5", role: "FIS", action: "Notifiera TSO", 
          description: "Svar på energikontroll skickas till TSO.", 
          refBRS: "BRS-FLEX-738", refRule: "BRSFLEX738-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0a.6", role: "TSO", action: "Ta emot Svar", 
          description: "TSO tar emot valideringsresultatet.", 
          refBRS: "BRS-FLEX-738", refRule: "BRSFLEX738-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-710-Sc0b",
      title: "Registrering av aktivering (DSO - lokalmarknad)",
      description: "DSO rapporterar till FIS att en aktivering har skett (avrop) på den lokala flexibilitetsmarknaden.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-710-Sc0b: Registrering av DSO Aktivering
    participant DSO as DSO
    participant FIS as FIS

    DSO->>FIS: Registrera aktiverat lokalt bud (BRS-FLEX-741)
    FIS->>FIS: Energikontroll (BRS-FLEX-7310)
    FIS->>DSO: Notifiera resultat (BRS-FLEX-748)`,
      steps: [
        { 
          stepId: "MPS-FLEX-710-Sc0b.1", role: "DSO", action: "Reg. Aktivering", 
          description: "DSO registrerar avrop (lokalt energibud).", 
          refBRS: "BRS-FLEX-741", refRule: "BRSFLEX741-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0b.2", role: "FIS", action: "Spara", 
          description: "FIS lagrar DSO-aktivering.", 
          refBRS: "BRS-FLEX-741", refRule: "BRSFLEX741-2" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0b.3", role: "FIS", action: "Starta Energikontroll", 
          description: "Systemet initierar energivalidering mot nätbegränsningar.", 
          refBRS: "BRS-FLEX-7310", refRule: "BRSFLEX7310-7" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0b.4", role: "FIS", action: "Spara Kontrollresultat", 
          description: "Resultatet av energikontrollen lagras.", 
          refBRS: "BRS-FLEX-7310", refRule: "BRSFLEX7310-2" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0b.5", role: "FIS", action: "Notifiera DSO", 
          description: "Svar på energikontroll skickas till DSO.", 
          refBRS: "BRS-FLEX-748", refRule: "BRSFLEX748-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc0b.6", role: "DSO", action: "Ta emot Svar", 
          description: "DSO tar emot valideringsresultatet.", 
          refBRS: "BRS-FLEX-748", refRule: "BRSFLEX748-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-710-Sc1a",
      title: "Verifiering av balansprodukt (TSO)",
      description: "Hela flödet från att systemet beräknar volym tills TSO får verifieringsresultatet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-710-Sc1a: Verifiering TSO
    participant FIS as FIS
    participant SP as SP
    participant TSO as TSO

    Note over FIS: Trigger: Mätdata OK
    activate FIS
    FIS->>FIS: Beräkna volym (BRS-FLEX-6110)
    FIS->>FIS: Jämför mot bud (BRS-FLEX-7320)
    FIS->>SP: Skicka resultat (BRS-FLEX-739)
    FIS->>TSO: Skicka resultat (BRS-FLEX-737)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-710-Sc1a.1", role: "System", action: "Starta Volymberäkning", 
          description: "Systemet initierar beräkning baserat på TSO-aktivering och mätdata.", 
          refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.2", role: "FIS", action: "Spara Volym", 
          description: "FIS beräknar och lagrar levererad volym.", 
          refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-4",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.3", role: "System", action: "Trigger Verifiering", 
          description: "Verifieringsprocessen triggas av att volymberäkningen är klar.", 
          refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-5"
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.4", role: "FIS", action: "Resultat Klart", 
          description: "FIS har beräknat och lagrat verifieringsresultatet.", 
          refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-6" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.5", role: "FIS", action: "Underlag Skapat", 
          description: "FIS har skapat underlag för avräkning.", 
          refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-7" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.6", role: "FIS", action: "Notifiera SP", 
          description: "FIS skickar verifieringsresultatet till Service Provider.", 
          refBRS: "BRS-FLEX-739", refRule: "BRSFLEX739-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.7", role: "SP", action: "Ta emot Resultat", 
          description: "SP tar emot verifieringsresultatet.", 
          refBRS: "BRS-FLEX-739", refRule: "BRSFLEX739-2" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.8", role: "FIS", action: "Notifiera TSO", 
          description: "FIS skickar verifieringsresultatet (Status & Volym) till TSO.", 
          refBRS: "BRS-FLEX-737", refRule: "BRSFLEX737-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.9", role: "TSO", action: "Ta emot Resultat", 
          description: "TSO tar emot verifieringsresultatet.", 
          refBRS: "BRS-FLEX-737", refRule: "BRSFLEX737-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-710-Sc1b",
      title: "Verifiering av lokal flexibilitet (DSO)",
      description: "Verifieringsflöde för DSO-aktiverade produkter.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-710-Sc1b: Verifiering DSO
    participant FIS as FIS
    participant SP as SP
    participant DSO as DSO

    activate FIS
    FIS->>FIS: Beräkna volym (BRS-FLEX-6110)
    FIS->>FIS: Jämför mot DSO-bud (BRS-FLEX-7320)
    FIS->>SP: Skicka resultat (BRS-FLEX-739)
    FIS->>DSO: Skicka resultat (BRS-FLEX-749)
    deactivate FIS`,
      steps: [
        { stepId: "MPS-FLEX-710-Sc1b.1", role: "System", action: "Starta Volymberäkning", description: "Systemet beräknar volym för DSO-aktivering.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-2", isPrerequisite: true },
        { stepId: "MPS-FLEX-710-Sc1b.2", role: "FIS", action: "Spara Volym", description: "FIS lagrar volymen.", refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-4", isPrerequisite: true },
        { stepId: "MPS-FLEX-710-Sc1b.3", role: "FIS", action: "Verifiera", description: "Jämför mot bud.", refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-9" },
        { stepId: "MPS-FLEX-710-Sc1b.4", role: "FIS", action: "Spara Resultat", description: "Lagrar verifieringsstatus.", refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-10" },
        { stepId: "MPS-FLEX-710-Sc1b.5", role: "FIS", action: "Notifiera SP", description: "SP får resultatet.", refBRS: "BRS-FLEX-739", refRule: "BRSFLEX739-1" },
        { stepId: "MPS-FLEX-710-Sc1b.6", role: "SP", action: "Ta emot Resultat", description: "SP tar emot verifieringsresultatet.", refBRS: "BRS-FLEX-739", refRule: "BRSFLEX739-2" },
        { stepId: "MPS-FLEX-710-Sc1b.7", role: "FIS", action: "Notifiera DSO", description: "DSO får resultatet.", refBRS: "BRS-FLEX-749", refRule: "BRSFLEX749-5" },
        { stepId: "MPS-FLEX-710-Sc1b.8", role: "DSO", action: "Ta emot", description: "DSO tar emot resultatet.", refBRS: "BRS-FLEX-749", refRule: "BRSFLEX749-6" }
      ]
    }
  ]
};

// --- MPS-FLEX-720: Avräkning och Allokering ---
export const mpsFlex720: MPSData = {
  id: "MPS-FLEX-720",
  title: "Avräkning och allokering",
  domain: "Domän 7: Verifiering & Budgivning",
  purpose: "Att allokera de verifierade volymerna på berörda aktörer (BRP och Elleverantör) och distribuera detta underlag för ekonomisk reglering och prognosjustering.",
  trigger: "Verifiering (MPS-FLEX-710) är slutförd.",
  scenarios: [
    {
      id: "MPS-FLEX-720-Sc1",
      title: "Allokering och distribution av avräkningsunderlag",
      description: "Processen där verifierad volym delas upp per aktör och skickas ut.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-720-Sc1: Ekonomisk allokering och distribution
    participant FIS as FIS
    participant DHV as Datahubben (DHV)
    participant BRP as BRP
    participant SUP as Elleverantör

    Note over FIS: Trigger: Verifieringsresultat fastställt och underlag för avräkning genererat
    
    activate FIS
    FIS->>FIS: Allokera volym per BRP för obalansjustering (BRS-FLEX-7610)
    FIS->>FIS: Allokera volym per Elleverantör för kompensation (BRS-FLEX-7620)
    
    FIS->>DHV: Skicka underlag för nätavräkning (BRS-FLEX-779)
    DHV-->>FIS: Bekräftat
    
    FIS->>BRP: Skicka data för prognosjustering (BRS-FLEX-789)
    BRP-->>FIS: Bekräftat

    FIS->>SUP: Skicka data för kompensationsutbetalning (BRS-FLEX-799)
    SUP-->>FIS: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-720-Sc1.1", role: "System", action: "Volymberäkning klar", 
          description: "Volymberäkning från systemet är genomförd.", 
          refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-5",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.2", role: "System", action: "Resultat lagrat", 
          description: "Verifieringsresultat är beräknat och lagrat.", 
          refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-6",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.3", role: "System", action: "Underlag skapat", 
          description: "Underlag för avräkning har genererats.", 
          refBRS: "BRS-FLEX-7320", refRule: "BRSFLEX7320-7",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.4", role: "FIS", action: "Initiera Allokering BRP", 
          description: "FIS summerar volymer per BRP for obalansjustering (Start).", 
          refBRS: "BRS-FLEX-7610", refRule: "BRSFLEX7610-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.5", role: "FIS", action: "Beräkna BRP-allokering", 
          description: "FIS har beräknat och allokerat volym per BRP (Resultat).", 
          refBRS: "BRS-FLEX-7610", refRule: "BRSFLEX7610-2" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.6", role: "FIS", action: "Lagra BRP-underlag", 
          description: "FIS lagrar underlag för obalansjustering av BRP.", 
          refBRS: "BRS-FLEX-7610", refRule: "BRSFLEX7610-3" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.7", role: "FIS", action: "Initiera Allokering Lev", 
          description: "FIS summerar volymer per Elleverantör för kompensations (Start).", 
          refBRS: "BRS-FLEX-7620", refRule: "BRSFLEX7620-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.8", role: "FIS", action: "Beräkna Lev-allokering", 
          description: "FIS har beräknat och allokerat volym per Elleverantör (Resultat).", 
          refBRS: "BRS-FLEX-7620", refRule: "BRSFLEX7620-2" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.9", role: "FIS", action: "Lagra Lev-underlag", 
          description: "FIS lagrar underlag för kompensation.", 
          refBRS: "BRS-FLEX-7620", refRule: "BRSFLEX7620-3" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.10", role: "FIS", action: "Till DHV", 
          description: "FIS skickar obalansunderlag till Datahubben (TSO).", 
          refBRS: "BRS-FLEX-779", refRule: "BRSFLEX779-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.11", role: "DHV", action: "Ta emot Underlag", 
          description: "Datahubben tar emot underlag för nätavräkning.", 
          refBRS: "BRS-FLEX-779", refRule: "BRSFLEX779-3" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.12", role: "FIS", action: "Till BRP", 
          description: "FIS skickar prognosjusteringsunderlag till BRP.", 
          refBRS: "BRS-FLEX-789", refRule: "BRSFLEX789-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.13", role: "BRP", action: "Ta emot Data", 
          description: "BRP tar emot neutraliseringsdata.", 
          refBRS: "BRS-FLEX-789", refRule: "BRSFLEX789-2" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.14", role: "FIS", action: "Till Leverantör", 
          description: "FIS skickar kompensationsunderlag till Elleverantör.", 
          refBRS: "BRS-FLEX-799", refRule: "BRSFLEX799-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.15", role: "Leverantör", action: "Ta emot Data", 
          description: "Elleverantör tar emot kompensationsunderlag.", 
          refBRS: "BRS-FLEX-799", refRule: "BRSFLEX799-2" 
        }
      ]
    }
  ]
};
