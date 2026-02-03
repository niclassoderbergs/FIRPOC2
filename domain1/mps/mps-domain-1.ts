
import { MPSData } from '../../types';

// --- MPS-FLEX-100: Livscykelhantering av Styrbara Enheter ---
export const mpsFlex100: MPSData = {
  id: "MPS-FLEX-100",
  title: "Hantering av styrbara enheter (CU)",
  domain: "Domän 1: Master Data",
  purpose: "Att beskriva de processer som krävs för att registrera, uppdatera och förvalta tekniska resurser (CUs) i registret. Inkluderar även informationsinhämtning.",
  trigger: "SP initierar registrering eller ändring, alternativt systemhändelse.",
  scenarios: [
    {
      id: "MPS-FLEX-100-Sc1",
      title: "Nyregistrering av CU",
      description: "Processen för att registrera en ny resurs och koppla den till en mätpunkt.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc1: Nyregistrering av CU
    participant SP as SP
    participant FIS as FIS
    participant DHV as Datahubben (DHV)

    Note over SP: Affärshändelse: Ny teknisk resurs ska anslutas
    SP->>FIS: Registrering (BRS-FLEX-101)
    activate FIS
    FIS->>DHV: Validera Mätpunkt
    DHV-->>FIS: OK (Mätpunkt existerar)
    FIS->>FIS: Skapa resurs (CU)
    FIS-->>SP: Kvittens med CU-ID
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc1.1", role: "SP", action: "Registrering", 
          description: "SP skickar begäran om att registrera en ny CU.", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-1" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc1.2", role: "FIS", action: "Skapa Resurs", 
          description: "FIS validerar och registrerar den nya styrbara enheten.", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-2" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "FIS skickar kvittens med den nya enhetens ID till SP.", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc2",
      title: "Uppdatering av CU",
      description: "Processen för att ändra attribut på en befintlig resurs (t.ex. justera effekt).",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc2: Uppdatering av CU-attribut
    participant SP as SP
    participant FIS as FIS

    Note over SP: Affärshändelse: Tekniska specifikationer har ändrats
    SP->>FIS: Uppdatering (BRS-FLEX-102)
    activate FIS
    FIS->>FIS: Validera och spara ny version
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc2.1", role: "SP", action: "Uppdatering", 
          description: "SP begär uppdatering av CU-information.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-1" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc2.2", role: "FIS", action: "Spara ändring", 
          description: "FIS uppdaterar attributen och skapar ny version.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-2" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc2.3", role: "FIS", action: "Versionshistorik", 
          description: "FIS arkiverar den tidigare versionen i historiken.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-3" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc2.4", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar uppdateringen till SP.", 
          refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-13" 
        }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc3",
      title: "Systemuppdatering av CU",
      description: "Process där systemet tvingande uppdaterar en CU baserat på externa händelser i Datahubben.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc3: Systemdriven Statusändring
    participant DHV as Datahubben (DHV)
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Systemtrigger: Mätpunkt inaktiverad i Datahubben
    DHV->>FIS: Notifiering (Mätpunkt inaktiv)
    activate FIS
    FIS->>FIS: Sätt resurs till 'Inactive' (BRS-FLEX-1020)
    FIS->>SP: Skicka notifiering (BRS-FLEX-109)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc3.1", role: "System", action: "Trigger (Datahub)", 
          description: "Datahubben har notifierat att mätpunkten för CUn har avaktiverats.", 
          refBRS: "BRS-FLEX-1020", refRule: "BRSFLEX1020-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-100-Sc3.2", role: "FIS", action: "Uppdatera Status", 
          description: "FIS har uppdaterat den styrbara enhetens status på grund av en extern händelse.", 
          refBRS: "BRS-FLEX-1020", refRule: "BRSFLEX1020-2" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc3.3", role: "FIS", action: "Notifiering (Start)", 
          description: "En CU har uppdaterats via systemhändelse (Trigger för notifiering).", 
          refBRS: "BRS-FLEX-109", refRule: "BRSFLEX109-6" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc3.4", role: "SP", action: "Ta emot Notifiering", 
          description: "SP har mottagit notifiering om statusändring.", 
          refBRS: "BRS-FLEX-109", refRule: "BRSFLEX109-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc4",
      title: "Begäran om CU-information",
      description: "Aktör hämtar teknisk data om en resurs.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-100-Sc4: Informationsutbyte
    participant User as SP / Systemoperatör
    participant FIS as FIS

    Note over User: Behov: Hämta aktuell masterdata för resurs
    User->>FIS: Begär information (BRS-FLEX-104)
    activate FIS
    FIS->>FIS: Validera åtkomstbehörighet
    FIS-->>User: Leverera data (Status, Kapacitet, Nätposition)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-100-Sc4.1", role: "Aktör", action: "Förfrågan", 
          description: "Behörig aktör begär information om en eller flera CU.", 
          refBRS: "BRS-FLEX-104", refRule: "BRSFLEX104-1" 
        },
        { 
          stepId: "MPS-FLEX-100-Sc4.2", role: "FIS", action: "Svar", 
          description: "FIS validerar behörighet och returnerar data.", 
          refBRS: "BRS-FLEX-104", refRule: "BRSFLEX104-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc5",
      title: "Misslyckad registrering (Avslag)",
      description: "Hantering av fel vid registrering, t.ex. ogiltig mätpunkt.",
      steps: [
        { stepId: "MPS-FLEX-100-Sc5.1", role: "FIS", action: "Validera", description: "Validering misslyckas.", refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-6" },
        { stepId: "MPS-FLEX-100-Sc5.2", role: "FIS", action: "Neka", description: "Inga data sparas.", refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-4" },
        { stepId: "MPS-FLEX-100-Sc5.3", role: "FIS", action: "Felmeddelande", description: "SP får felkod.", refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-5" }
      ]
    },
    {
      id: "MPS-FLEX-100-Sc6",
      title: "Misslyckad uppdatering",
      description: "Hantering av fel vid uppdatering, t.ex. ogiltigt värde.",
      steps: [
        { stepId: "MPS-FLEX-100-Sc6.1", role: "FIS", action: "Neka", description: "Inga ändringar gjorda.", refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-4" },
        { stepId: "MPS-FLEX-100-Sc6.2", role: "FIS", action: "Felmeddelande", description: "SP får felkod.", refBRS: "BRS-FLEX-102", refRule: "BRSFLEX102-5" }
      ]
    }
  ]
};

// --- MPS-FLEX-105: Administrativ Livscykelhantering av CU ---
export const mpsFlex105: MPSData = {
  id: "MPS-FLEX-105",
  title: "Administrativ livscykelhantering av CU",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera avvikelser och administrativa ingrepp på en styrbar enhet, inklusive suspendering och återaktivering.",
  trigger: "Administrativt beslut eller teknisk avvikelse.",
  scenarios: [
    {
      id: "MPS-FLEX-105-Sc1",
      title: "FIS stänger tillfälligt av CU",
      description: "Systemadministratör tvingar en resurs till status 'Suspended'.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-105-Sc1: Administrativ suspendering
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Note over Admin: Beslut: Resurs måste pausas (Tekniskt fel)
    Admin->>FIS: Suspendera (BRS-FLEX-105)
    activate FIS
    FIS->>FIS: Uppdatera status till Suspended
    FIS->>SP: Notifiera SP (BRS-FLEX-108)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-105-Sc1.1", role: "Admin", action: "Beslut om suspendering", 
          description: "En administratör har beslutat att stänga av en CU.", 
          refBRS: "BRS-FLEX-105", refRule: "BRSFLEX105-1" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc1.2", role: "FIS", action: "Verkställ", 
          description: "CU-status har satts till 'Suspended'.", 
          refBRS: "BRS-FLEX-105", refRule: "BRSFLEX105-2" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc1.3", role: "FIS", action: "Notifiera SP (Start)", 
          description: "En CU har stängts av administrativt (Trigger för notifiering).", 
          refBRS: "BRS-FLEX-108", refRule: "BRSFLEX108-1" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc1.4", role: "SP", action: "Ta emot Notifiering", 
          description: "SP har mottagit notifiering om suspenderingen.", 
          refBRS: "BRS-FLEX-108", refRule: "BRSFLEX108-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-105-Sc2",
      title: "SP begär återaktivering",
      description: "SP meddelar att problem är lösta och begär återaktivering.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-105-Sc2: Begäran om återaktivering
    participant SP as SP
    participant FIS as FIS

    Note over SP: Problem åtgärdat
    SP->>FIS: Begär återaktivering (BRS-FLEX-107)
    activate FIS
    FIS->>FIS: Skapa granskningsärende
    FIS-->>SP: Mottaget
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-105-Sc2.1", role: "SP", action: "Begäran", 
          description: "CU har status 'Suspended' och SP begär återaktivering.", 
          refBRS: "BRS-FLEX-107", refRule: "BRSFLEX107-1" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc2.2", role: "FIS", action: "Skapa ärende", 
          description: "Ärende om återaktivering har skapats.", 
          refBRS: "BRS-FLEX-107", refRule: "BRSFLEX107-2" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc2.3", role: "SP", action: "Mottagande", 
          description: "SP har mottagit bekräftelse på att begäran är mottagen.", 
          refBRS: "BRS-FLEX-107", refRule: "BRSFLEX107-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-105-Sc3",
      title: "FIS återaktiverar CU",
      description: "Administratör godkänner återaktivering och systemet notifierar SP.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-105-Sc3: Verkställ återaktivering
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: Godkänn återaktivering (BRS-FLEX-106)
    activate FIS
    FIS->>FIS: Sätt status Active
    FIS->>SP: Notifiera (BRS-FLEX-109)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-105-Sc3.1", role: "Admin", action: "Godkänn", 
          description: "Beslut om återaktivering har fattats.", 
          refBRS: "BRS-FLEX-106", refRule: "BRSFLEX106-1" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc3.2", role: "FIS", action: "Verkställ", 
          description: "CU-status har uppdaterats till 'Active'.", 
          refBRS: "BRS-FLEX-106", refRule: "BRSFLEX106-2" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc3.3", role: "FIS", action: "Notifiera SP (Start)", 
          description: "En CU har återaktiverats administrativt (Trigger för notifiering).", 
          refBRS: "BRS-FLEX-109", refRule: "BRSFLEX109-1" 
        },
        { 
          stepId: "MPS-FLEX-105-Sc3.4", role: "SP", action: "Ta emot Notifiering", 
          description: "SP har mottagit notifiering om statusändring.", 
          refBRS: "BRS-FLEX-109", refRule: "BRSFLEX109-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-105-Sc4",
      title: "Avslag på återaktivering",
      description: "Administratör/System nekar återaktivering (t.ex. felaktigt ägarskap).",
      steps: [
        { stepId: "MPS-FLEX-105-Sc4.1", role: "FIS", action: "Avvisa", description: "Begäran avslås.", refBRS: "BRS-FLEX-107", refRule: "BRSFLEX107-4" }
      ]
    }
  ]
};

// --- MPS-FLEX-110: Hantering av Aggregeringsstrukturer ---
export const mpsFlex110: MPSData = {
  id: "MPS-FLEX-110",
  title: "Etablering av aggregeringsstrukturer",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera skapandet av logiska grupper (SPU och SPG) som används för aggregering.",
  trigger: "Behov av ny aggregeringsnivå.",
  scenarios: [
    {
      id: "MPS-FLEX-110-Sc1",
      title: "Registrering av SPU (Technical Unit)",
      description: "Skapande av en ny teknisk aggregeringsenhet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-110-Sc1: Etablering av SPU
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Ny teknisk gruppering behövs
    SP->>FIS: Registrera SPU (BRS-FLEX-111)
    activate FIS
    FIS->>FIS: Skapa logiskt objekt
    FIS-->>SP: Bekräftat (SPU-ID)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-110-Sc1.1", role: "SP", action: "Registrering", 
          description: "SP begär registrering av a ny SPU.", 
          refBRS: "BRS-FLEX-111", refRule: "BRSFLEX111-1" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc1.2", role: "FIS", action: "Skapa SPU", 
          description: "FIS skapar SPU-objektet i systemet.", 
          refBRS: "BRS-FLEX-111", refRule: "BRSFLEX111-2" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "FIS skickar kvittens med SPU-ID till SP.", 
          refBRS: "BRS-FLEX-111", refRule: "BRSFLEX111-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-110-Sc2",
      title: "Registrering av SPG (Market Group)",
      description: "Skapande av en ny marknadsgrupp för budgivning.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-110-Sc2: Etablering av SPG
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Ny marknadsportfölj för elområde behövs
    SP->>FIS: Registrera SPG (BRS-FLEX-121)
    activate FIS
    FIS->>FIS: Skapa marknadsobjekt
    FIS-->>SP: Bekräftat (SPG-ID)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-110-Sc2.1", role: "SP", action: "Registrering", 
          description: "SP begär registrering av en ny SPG.", 
          refBRS: "BRS-FLEX-121", refRule: "BRSFLEX121-1" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc2.2", role: "FIS", action: "Skapa SPG", 
          description: "FIS skapar SPG-objektet i systemet.", 
          refBRS: "BRS-FLEX-121", refRule: "BRSFLEX121-2" 
        },
        { 
          stepId: "MPS-FLEX-110-Sc2.3", role: "FIS", action: "Kvittens", 
          description: "FIS skickar kvittens med SPG-ID till SP.", 
          refBRS: "BRS-FLEX-121", refRule: "BRSFLEX121-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-110-Sc3",
      title: "Misslyckad SPU-registrering",
      description: "Fel vid skapande av SPU.",
      steps: [
        { stepId: "MPS-FLEX-110-Sc3.1", role: "FIS", action: "Neka", description: "Inget objekt skapat.", refBRS: "BRS-FLEX-111", refRule: "BRSFLEX111-4" }
      ]
    },
    {
      id: "MPS-FLEX-110-Sc4",
      title: "Misslyckad SPG-registrering",
      description: "Fel vid skapande av SPG.",
      steps: [
        { stepId: "MPS-FLEX-110-Sc4.1", role: "FIS", action: "Neka", description: "Inget objekt skapat.", refBRS: "BRS-FLEX-121", refRule: "BRSFLEX121-4" }
      ]
    }
  ]
};

// --- MPS-FLEX-115: Förvaltning av Aggregeringsstrukturer ---
export const mpsFlex115: MPSData = {
  id: "MPS-FLEX-115",
  title: "Förvaltning av aggregeringsstrukturer",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera livscykeln för SPU och SPG efter skapandet, inklusive uppdatering, avregistrering, informationsinhämtning och administrativa åtgärder.",
  trigger: "SP vill ändra/ta bort struktur eller administrativt beslut.",
  scenarios: [
    {
      id: "MPS-FLEX-115-Sc1",
      title: "Uppdatering av SPU",
      description: "SP ändrar metadata för en aggregeringsenhet (SPU).",
      steps: [
        { stepId: "MPS-FLEX-115-Sc1.1", role: "SP", action: "Uppdatera SPU", description: "SP begär namnbyte på SPU.", refBRS: "BRS-FLEX-112", refRule: "BRSFLEX112-1" },
        { stepId: "MPS-FLEX-115-Sc1.2", role: "FIS", action: "Spara SPU", description: "FIS uppdaterar SPU-objektet.", refBRS: "BRS-FLEX-112", refRule: "BRSFLEX112-2" },
        { stepId: "MPS-FLEX-115-Sc1.3", role: "SP", action: "Mottagande SPU", description: "SP tar emot bekräftelse på uppdatering.", refBRS: "BRS-FLEX-112", refRule: "BRSFLEX112-3" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc2",
      title: "Uppdatering av SPG",
      description: "SP ändrar metadata för en marknadsgrupp (SPG).",
      steps: [
        { stepId: "MPS-FLEX-115-Sc2.1", role: "SP", action: "Uppdatera SPG", description: "SP begär namnbyte på SPG.", refBRS: "BRS-FLEX-122", refRule: "BRSFLEX122-1" },
        { stepId: "MPS-FLEX-115-Sc2.2", role: "FIS", action: "Spara SPG", description: "FIS uppdaterar SPG-objektet.", refBRS: "BRS-FLEX-122", refRule: "BRSFLEX122-2" },
        { stepId: "MPS-FLEX-115-Sc2.3", role: "SP", action: "Mottagande SPG", description: "SP tar emot bekräftelse på uppdatering.", refBRS: "BRS-FLEX-122", refRule: "BRSFLEX122-3" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc3",
      title: "Avregistrering av SPU",
      description: "SP tar bort en tom aggregeringsenhet (SPU).",
      steps: [
        { stepId: "MPS-FLEX-115-Sc3.1", role: "SP", action: "Ta bort SPU", description: "SP begär borttagning av SPU.", refBRS: "BRS-FLEX-113", refRule: "BRSFLEX113-1" },
        { stepId: "MPS-FLEX-115-Sc3.2", role: "FIS", action: "Verkställ SPU", description: "FIS avregistrerar SPU-objektet.", refBRS: "BRS-FLEX-113", refRule: "BRSFLEX113-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc4",
      title: "Avregistrering av SPG",
      description: "SP tar bort en tom marknadsgrupp (SPG).",
      steps: [
        { stepId: "MPS-FLEX-115-Sc4.1", role: "SP", action: "Ta bort SPG", description: "SP begär borttagning av SPG.", refBRS: "BRS-FLEX-123", refRule: "BRSFLEX123-1" },
        { stepId: "MPS-FLEX-115-Sc4.2", role: "FIS", action: "Verkställ SPG", description: "FIS avregistrerar SPG-objektet.", refBRS: "BRS-FLEX-123", refRule: "BRSFLEX123-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc5",
      title: "Administrativ registrering av SPU",
      description: "FIS skapar SPU åt en aktör och notifierar.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc5.1", role: "Admin", action: "Skapa SPU", description: "Admin initierar skapande av SPU.", refBRS: "BRS-FLEX-1110", refRule: "BRSFLEX1110-1" },
        { stepId: "MPS-FLEX-115-Sc5.2", role: "FIS", action: "Spara SPU", description: "FIS registrerar SPU administrativt.", refBRS: "BRS-FLEX-1110", refRule: "BRSFLEX1110-2" },
        { stepId: "MPS-FLEX-115-Sc5.3", role: "FIS", action: "Notifiera SPU", description: "Notifiering till SP.", refBRS: "BRS-FLEX-119", refRule: "BRSFLEX119-1" },
        { stepId: "MPS-FLEX-115-Sc5.4", role: "SP", action: "Mottagning SPU", description: "SP tar emot SPU-info.", refBRS: "BRS-FLEX-119", refRule: "BRSFLEX119-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc6",
      title: "Administrativ registrering av SPG",
      description: "FIS skapar SPG åt en aktör och notifierar.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc6.1", role: "Admin", action: "Skapa SPG", description: "Admin initierar skapande av SPG.", refBRS: "BRS-FLEX-1210", refRule: "BRSFLEX1210-1" },
        { stepId: "MPS-FLEX-115-Sc6.2", role: "FIS", action: "Spara SPG", description: "FIS registrerar SPG administrativt.", refBRS: "BRS-FLEX-1210", refRule: "BRSFLEX1210-2" },
        { stepId: "MPS-FLEX-115-Sc6.3", role: "FIS", action: "Notifiera SPG", description: "Notifiering till SP.", refBRS: "BRS-FLEX-129", refRule: "BRSFLEX129-1" },
        { stepId: "MPS-FLEX-115-Sc6.4", role: "SP", action: "Mottagning SPG", description: "SP tar emot SPG-info.", refBRS: "BRS-FLEX-129", refRule: "BRSFLEX129-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc7",
      title: "Suspendering av SPU",
      description: "Administrativ avstängning av SPU-status med notifiering.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc7.1", role: "Admin", action: "Suspendera SPU", description: "Beslut om att stänga av SPU.", refBRS: "BRS-FLEX-115", refRule: "BRSFLEX115-1" },
        { stepId: "MPS-FLEX-115-Sc7.2", role: "FIS", action: "Verkställ", description: "SPU-status satt till Suspended.", refBRS: "BRS-FLEX-115", refRule: "BRSFLEX115-2" },
        { stepId: "MPS-FLEX-115-Sc7.3", role: "FIS", action: "Notifiera", description: "Meddela SP.", refBRS: "BRS-FLEX-118", refRule: "BRSFLEX118-1" },
        { stepId: "MPS-FLEX-115-Sc7.4", role: "SP", action: "Mottag", description: "SP tar emot besked.", refBRS: "BRS-FLEX-118", refRule: "BRSFLEX118-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc8",
      title: "Återaktivering av SPU",
      description: "Administrativ återaktivering av SPU-status med notifiering.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc8.1", role: "Admin", action: "Återaktivera SPU", description: "Beslut om återaktivering.", refBRS: "BRS-FLEX-116", refRule: "BRSFLEX116-1" },
        { stepId: "MPS-FLEX-115-Sc8.2", role: "FIS", action: "Verkställ", description: "SPU-status återställd.", refBRS: "BRS-FLEX-116", refRule: "BRSFLEX116-2" },
        { stepId: "MPS-FLEX-115-Sc8.3", role: "FIS", action: "Notifiera", description: "Meddela SP.", refBRS: "BRS-FLEX-117", refRule: "BRSFLEX117-1" },
        { stepId: "MPS-FLEX-115-Sc8.4", role: "SP", action: "Mottag", description: "SP tar emot besked.", refBRS: "BRS-FLEX-117", refRule: "BRSFLEX117-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc9",
      title: "Suspendering av SPG",
      description: "Administrativ avstängning av SPG-status med notifiering.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc9.1", role: "Admin", action: "Suspendera SPG", description: "Beslut om att stänga av SPG.", refBRS: "BRS-FLEX-125", refRule: "BRSFLEX125-1" },
        { stepId: "MPS-FLEX-115-Sc9.2", role: "FIS", action: "Verkställ", description: "SPG-status satt till Suspended.", refBRS: "BRS-FLEX-125", refRule: "BRSFLEX125-2" },
        { stepId: "MPS-FLEX-115-Sc9.3", role: "FIS", action: "Notifiera", description: "Meddela SP.", refBRS: "BRS-FLEX-128", refRule: "BRSFLEX128-1" },
        { stepId: "MPS-FLEX-115-Sc9.4", role: "SP", action: "Mottag", description: "SP tar emot besked.", refBRS: "BRS-FLEX-128", refRule: "BRSFLEX128-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc10",
      title: "Återaktivering av SPG",
      description: "Administrativ återaktivering av SPG-status med notifiering.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc10.1", role: "Admin", action: "Återaktivera SPG", description: "Beslut om återaktivering.", refBRS: "BRS-FLEX-126", refRule: "BRSFLEX126-1" },
        { stepId: "MPS-FLEX-115-Sc10.2", role: "FIS", action: "Verkställ", description: "SPG-status återställd.", refBRS: "BRS-FLEX-126", refRule: "BRSFLEX126-2" },
        { stepId: "MPS-FLEX-115-Sc10.3", role: "FIS", action: "Notifiera", description: "Meddela SP.", refBRS: "BRS-FLEX-127", refRule: "BRSFLEX127-1" },
        { stepId: "MPS-FLEX-115-Sc10.4", role: "SP", action: "Mottag", description: "SP tar emot besked.", refBRS: "BRS-FLEX-127", refRule: "BRSFLEX127-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc11",
      title: "Begäran om SPU information",
      description: "Aktör hämtar stamdata för en SPU.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc11.1", role: "Aktör", action: "Hämta SPU", description: "Begär SPU-data.", refBRS: "BRS-FLEX-114", refRule: "BRSFLEX114-1" },
        { stepId: "MPS-FLEX-115-Sc11.2", role: "FIS", action: "Svara SPU", description: "Returnera SPU-data.", refBRS: "BRS-FLEX-114", refRule: "BRSFLEX114-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc12",
      title: "Begäran om SPG information",
      description: "Aktör hämtar stamdata för en SPG.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc12.1", role: "Aktör", action: "Hämta SPG", description: "Begär SPG-data.", refBRS: "BRS-FLEX-124", refRule: "BRSFLEX124-1" },
        { stepId: "MPS-FLEX-115-Sc12.2", role: "FIS", action: "Svara SPG", description: "Returnera SPG-data.", refBRS: "BRS-FLEX-124", refRule: "BRSFLEX124-2" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc13",
      title: "Misslyckad avregistrering SPU",
      description: "Avregistrering av SPU nekas.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc13.1", role: "FIS", action: "Neka SPU", description: "SPU ej tom.", refBRS: "BRS-FLEX-113", refRule: "BRSFLEX113-3" }
      ]
    },
    {
      id: "MPS-FLEX-115-Sc14",
      title: "Misslyckad avregistrering SPG",
      description: "Avregistrering av SPG nekas.",
      steps: [
        { stepId: "MPS-FLEX-115-Sc14.1", role: "FIS", action: "Neka SPG", description: "SPG ej tom.", refBRS: "BRS-FLEX-123", refRule: "BRSFLEX123-3" }
      ]
    }
  ]
};

// --- MPS-FLEX-130: Teknisk Portföljhantering (SPU) ---
export const mpsFlex130: MPSData = {
  id: "MPS-FLEX-130",
  title: "Portföljhantering SPU",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera innehållet i en SPU genom att lägga till eller ta bort resurser. Inkluderar både SP-initierade ändringar och systemtvingande åtgärder.",
  trigger: "Förändring i den tekniska portföljen.",
  scenarios: [
    {
      id: "MPS-FLEX-130-Sc1",
      title: "Koppla CU till SPU",
      description: "Lägga till en resurs i en teknisk enhet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-130-Sc1: Inkludering i teknisk aggregering
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Resurs ska ingå i teknisk gruppering
    SP->>FIS: Koppla CU (BRS-FLEX-131)
    activate FIS
    FIS->>FIS: Etablera teknisk relation
    FIS->>FIS: Beräkna ny SPU-kapacitet
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-130-Sc1.1", role: "SP", action: "Registrering av CU", 
          description: "SP har registrerat en ny styrbar enhet (CU).", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-130-Sc1.2", role: "FIS", action: "CU Skapad", 
          description: "FIS har registrerat den nya styrbara enheten (CU).", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-2",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-130-Sc1.3", role: "SP", action: "Har CU-ID", 
          description: "SP har mottagit kvittens med den nya enhetens ID.", 
          refBRS: "BRS-FLEX-101", refRule: "BRSFLEX101-3",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-130-Sc1.4", role: "SP", action: "Begäran", 
          description: "SP begär koppling av CU till SPU.", 
          refBRS: "BRS-FLEX-131", refRule: "BRSFLEX131-1" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc1.5", role: "FIS", action: "Koppla", 
          description: "FIS upprättar relationen mellan CU och SPU.", 
          refBRS: "BRS-FLEX-131", refRule: "BRSFLEX131-2" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc1.6", role: "FIS", action: "Statusuppdatering", 
          description: "FIS uppdaterar SPU:ns status (t.ex. till Active).", 
          refBRS: "BRS-FLEX-131", refRule: "BRSFLEX131-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-130-Sc2",
      title: "Ta bort CU från SPU",
      description: "Koppla bort en resurs från en teknisk enhet.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-130-Sc2: Exkludering från teknisk aggregering
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Resurs ska tas bort från teknisk gruppering
    SP->>FIS: Koppla bort (BRS-FLEX-133)
    activate FIS
    FIS->>FIS: Avsluta relation
    FIS->>FIS: Reducera SPU-kapacitet
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-130-Sc2.1", role: "SP", action: "Begäran", 
          description: "SP begär bortkoppling av CU från SPU.", 
          refBRS: "BRS-FLEX-133", refRule: "BRSFLEX133-1" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc2.2", role: "FIS", action: "Bortkoppling", 
          description: "FIS tar bort kopplingen mellan resurs och SPU.", 
          refBRS: "BRS-FLEX-133", refRule: "BRSFLEX133-2" 
        },
        { 
          stepId: "MPS-FLEX-130-Sc2.3", role: "FIS", action: "Omräkning", 
          description: "FIS räknar om SPU:ns totala kapacitet.", 
          refBRS: "BRS-FLEX-133", refRule: "BRSFLEX133-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-130-Sc3",
      title: "Misslyckad koppling (SPU)",
      description: "Fel vid försök att koppla CU till SPU.",
      steps: [
        { stepId: "MPS-FLEX-130-Sc3.1", role: "FIS", action: "Neka", description: "Koppling misslyckades.", refBRS: "BRS-FLEX-131", refRule: "BRSFLEX131-4" }
      ]
    },
    {
      id: "MPS-FLEX-130-Sc4",
      title: "Misslyckad bortkoppling (SPU)",
      description: "Fel vid försök att ta bort CU från SPU.",
      steps: [
        { stepId: "MPS-FLEX-130-Sc4.1", role: "FIS", action: "Neka", description: "Bortkoppling misslyckades.", refBRS: "BRS-FLEX-133", refRule: "BRSFLEX133-4" }
      ]
    }
  ]
};

// --- MPS-FLEX-135: Systemdriven Portföljhantering ---
export const mpsFlex135: MPSData = {
  id: "MPS-FLEX-135",
  title: "Systemdriven portföljhantering (SPU & SPG)",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera kopplingar i SPU/SPG som styrs av systemet eller administratörer (t.ex. vid avtalsavslut, tvångsförflyttning eller städning). Inkluderar logik för att hantera flytt mellan portföljer.",
  trigger: "Systemhändelse (t.ex. flytt/avslut) eller administrativt beslut.",
  scenarios: [
    {
      id: "MPS-FLEX-135-Sc1",
      title: "Administrativ koppling till SPU",
      description: "FIS skapar koppling utan SP-initiativ.",
      steps: [
        { stepId: "MPS-FLEX-135-Sc1.1", role: "Admin", action: "Koppla", description: "Admin initierar koppling.", refBRS: "BRS-FLEX-1310", refRule: "BRSFLEX1310-1" },
        { stepId: "MPS-FLEX-135-Sc1.2", role: "FIS", action: "Verkställ", description: "FIS upprättar kopplingen administrativt.", refBRS: "BRS-FLEX-1310", refRule: "BRSFLEX1310-2" }
      ]
    },
    {
      id: "MPS-FLEX-135-Sc2",
      title: "Systemtvingande bortkoppling från SPU (Generell)",
      description: "Generellt städscenario för SPU. Triggas av händelser i Domän 2 (Avtal) eller Domän 8 (Aktör).",
      steps: [
        { stepId: "MPS-FLEX-135-Sc2.1", role: "System", action: "Trigger", description: "Trigger: Avtal avslutat (MPS-FLEX-200), Flytt, eller SP Avregistrering.", refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-1" },
        { stepId: "MPS-FLEX-135-Sc2.2", role: "FIS", action: "Bortkoppling", description: "FIS avslutar kopplingen.", refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-5" },
        { stepId: "MPS-FLEX-135-Sc2.3", role: "FIS", action: "Notifiera", description: "Notifiera SP om unlink.", refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-1" },
        { stepId: "MPS-FLEX-135-Sc2.4", role: "SP", action: "Mottag", description: "SP tar emot info.", refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-2" }
      ]
    },
    {
      id: "MPS-FLEX-135-Sc3",
      title: "Administrativ koppling till SPG",
      description: "Tvångskoppling till en marknadsportfölj.",
      steps: [
        { stepId: "MPS-FLEX-135-Sc3.1", role: "Admin", action: "Koppla SPG", description: "Admin kopplar CU till SPG.", refBRS: "BRS-FLEX-1410", refRule: "BRSFLEX1410-1" },
        { stepId: "MPS-FLEX-135-Sc3.2", role: "FIS", action: "Spara", description: "Koppling skapad.", refBRS: "BRS-FLEX-1410", refRule: "BRSFLEX1410-2" }
      ]
    },
    {
      id: "MPS-FLEX-135-Sc4",
      title: "Systemtvingande bortkoppling från SPG (Generell)",
      description: "Generellt städscenario för SPG. Triggas av händelser i Domän 2 (Avtal) eller Domän 8 (Aktör).",
      steps: [
        { stepId: "MPS-FLEX-135-Sc4.1", role: "System", action: "Trigger Unlink", description: "Trigger: Avtal avslutat (MPS-FLEX-200), Flytt, eller SP Avregistrering.", refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-1" },
        { stepId: "MPS-FLEX-135-Sc4.2", role: "FIS", action: "Bortkoppling", description: "FIS avslutar kopplingen.", refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-5" },
        { stepId: "MPS-FLEX-135-Sc4.3", role: "FIS", action: "Notifiera", description: "Notifiera SP om unlink.", refBRS: "BRS-FLEX-149", refRule: "BRSFLEX149-1" },
        { stepId: "MPS-FLEX-135-Sc4.4", role: "SP", action: "Mottag", description: "SP tar emot info.", refBRS: "BRS-FLEX-149", refRule: "BRSFLEX149-2" }
      ]
    },
    {
      id: "MPS-FLEX-135-Sc5",
      title: "Automatiskt utträde ur SPU vid byte (Flytt till annan SPU)",
      description: "När en CU kopplas till en ny SPU (131) måste den gamla kopplingen städas bort automatiskt.",
      steps: [
        { stepId: "MPS-FLEX-135-Sc5.1", role: "System", action: "Trigger: Ny SPU-koppling", description: "SP har kopplat en CU till en SPU som tidigare var i annan SPU.", refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-3" },
        { stepId: "MPS-FLEX-135-Sc5.2", role: "FIS", action: "Bortkoppling (Gammal)", description: "FIS avslutar den gamla SPU-kopplingen.", refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-5" },
        { stepId: "MPS-FLEX-135-Sc5.3", role: "FIS", action: "Notifiera", description: "Notifiera SP om att gamla länken är bruten.", refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-1" },
        { stepId: "MPS-FLEX-135-Sc5.4", role: "SP", action: "Mottag", description: "SP tar emot bekräftelse på städning.", refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-2" }
      ]
    },
    {
      id: "MPS-FLEX-135-Sc6",
      title: "Automatiskt utträde ur SPU vid marknadskoppling (Flytt till SPG)",
      description: "När en CU kopplas till en SPG (141) kan det kräva att den lämnar sin SPU (beroende på marknadsregler).",
      steps: [
        { stepId: "MPS-FLEX-135-Sc6.1", role: "System", action: "Trigger: Ny SPG-koppling", description: "SP har kopplat en CU till en SPG som tidigare var i SPU.", refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-4" },
        { stepId: "MPS-FLEX-135-Sc6.2", role: "FIS", action: "Bortkoppling (SPU)", description: "FIS avslutar SPU-kopplingen.", refBRS: "BRS-FLEX-1330", refRule: "BRSFLEX1330-5" },
        { stepId: "MPS-FLEX-135-Sc6.3", role: "FIS", action: "Notifiera", description: "Notifiera SP om SPU-unlink.", refBRS: "BRS-FLEX-139", refRule: "BRSFLEX139-1" }
      ]
    },
    {
      id: "MPS-FLEX-135-Sc7",
      title: "Automatiskt utträde ur SPG vid teknisk omkoppling (Flytt till SPU)",
      description: "När en CU kopplas till en SPU (131) kan det kräva att den lämnar sin SPG.",
      steps: [
        { stepId: "MPS-FLEX-135-Sc7.1", role: "System", action: "Trigger: Ny SPU-koppling", description: "SP har kopplat en CU till en SPU som tidigare var i SPG.", refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-3" },
        { stepId: "MPS-FLEX-135-Sc7.2", role: "FIS", action: "Bortkoppling (SPG)", description: "FIS avslutar SPG-kopplingen.", refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-5" },
        { stepId: "MPS-FLEX-135-Sc7.3", role: "FIS", action: "Notifiera", description: "Notifiera SP om SPG-unlink.", refBRS: "BRS-FLEX-149", refRule: "BRSFLEX149-1" }
      ]
    },
    {
      id: "MPS-FLEX-135-Sc8",
      title: "Automatiskt utträde ur SPG vid byte (Flytt till annan SPG)",
      description: "När en CU kopplas till en ny SPG (141) måste den gamla kopplingen städas bort automatiskt.",
      steps: [
        { stepId: "MPS-FLEX-135-Sc8.1", role: "System", action: "Trigger: Ny SPG-koppling", description: "SP har kopplat en CU till en SPG som tidigare var i annan SPG.", refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-4" },
        { stepId: "MPS-FLEX-135-Sc8.2", role: "FIS", action: "Bortkoppling (Gammal)", description: "FIS avslutar den gamla SPG-kopplingen.", refBRS: "BRS-FLEX-1430", refRule: "BRSFLEX1430-5" },
        { stepId: "MPS-FLEX-135-Sc8.3", role: "FIS", action: "Notifiera", description: "Notifiera SP om att gamla länken är bruten.", refBRS: "BRS-FLEX-149", refRule: "BRSFLEX149-1" },
        { stepId: "MPS-FLEX-135-Sc8.4", role: "SP", action: "Mottag", description: "SP tar emot bekräftelse på städning.", refBRS: "BRS-FLEX-149", refRule: "BRSFLEX149-2" }
      ]
    }
  ]
};

// --- MPS-FLEX-140: Kommersiell Portföljhantering (SPG) ---
export const mpsFlex140: MPSData = {
  id: "MPS-FLEX-140",
  title: "Portföljhantering SPG",
  domain: "Domän 1: Master Data",
  purpose: "Att hantera innehållet i en SPG för budgivning.",
  trigger: "Optimering av marknadsportfölj.",
  scenarios: [
    {
      id: "MPS-FLEX-140-Sc1",
      title: "Koppla CU till SPG",
      description: "Inkludera en resurs i en budgivningsgrupp.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-140-Sc1: Marknadskoppling av resurs
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Resurs ska inkluderas i marknadsbudgivning
    SP->>FIS: Koppla till SPG (BRS-FLEX-141)
    activate FIS
    FIS->>FIS: Etablera marknadsrelation
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-140-Sc1.1", role: "SP", action: "Begäran", 
          description: "SP begär koppling av CU till SPG.", 
          refBRS: "BRS-FLEX-141", refRule: "BRSFLEX141-1" 
        },
        { 
          stepId: "MPS-FLEX-140-Sc1.2", role: "FIS", action: "Koppla", 
          description: "FIS skapar kopplingen.", 
          refBRS: "BRS-FLEX-141", refRule: "BRSFLEX141-2" 
        },
        { 
          stepId: "MPS-FLEX-140-Sc1.3", role: "FIS", action: "Statusuppdatering", 
          description: "FIS uppdaterar SPG:ns status vid behov.", 
          refBRS: "BRS-FLEX-141", refRule: "BRSFLEX141-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-140-Sc2",
      title: "Ta bort CU från SPG",
      description: "Exkludera en resurs från en budgivningsgrupp.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-140-Sc2: Bortkoppling från SPG
    participant SP as SP
    participant FIS as FIS

    Note over SP: Beslut: Resurs ska tas bort från marknadsportfölj
    SP->>FIS: Koppla bort (BRS-FLEX-143)
    activate FIS
    FIS->>FIS: Ta bort relation
    FIS-->>SP: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-140-Sc2.1", role: "SP", action: "Begäran", 
          description: "SP begär bortkoppling av CU från SPG.", 
          refBRS: "BRS-FLEX-143", refRule: "BRSFLEX143-1" 
        },
        { 
          stepId: "MPS-FLEX-140-Sc2.2", role: "FIS", action: "Bortkoppling", 
          description: "FIS avslutar kopplingen.", 
          refBRS: "BRS-FLEX-143", refRule: "BRSFLEX143-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-140-Sc3",
      title: "Misslyckad koppling (SPG)",
      description: "Fel vid försök att koppla CU till SPG.",
      steps: [
        { stepId: "MPS-FLEX-140-Sc3.1", role: "FIS", action: "Neka", description: "Koppling misslyckades.", refBRS: "BRS-FLEX-141", refRule: "BRSFLEX141-4" }
      ]
    },
    {
      id: "MPS-FLEX-140-Sc4",
      title: "Misslyckad bortkoppling (SPG)",
      description: "Fel vid försök att ta bort CU från SPG.",
      steps: [
        { stepId: "MPS-FLEX-140-Sc4.1", role: "FIS", action: "Neka", description: "Bortkoppling misslyckades.", refBRS: "BRS-FLEX-143", refRule: "BRSFLEX143-3" }
      ]
    }
  ]
};
