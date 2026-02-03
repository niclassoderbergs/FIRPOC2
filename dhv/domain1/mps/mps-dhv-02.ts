
import { MPSData } from '../../../types';

export const mpsDhv02: MPSData = {
  id: "MPS-DHV-02",
  title: "Livscykelhantering av utbytespunkt",
  domain: "Domän 1: Mätpunkt",
  purpose: "Att hantera utbytespunkter (Exchange Metering Points) mellan nätområden. Detta inkluderar kommunikation med angränsande nätägare. Täcker PDF-processerna 6113, 6520, 6114 och 6564.",
  trigger: "Nätägare initierar förändring i nätstrukturen.",
  scenarios: [
    {
      id: "MPS-DHV-02-Sc1",
      title: "Registrering av utbytespunkt",
      description: "Scenario 6113: En nätägare registrerar en ny utbytespunkt. Angränsande nätägare notifieras.",
      diagramCode: `sequenceDiagram
    title Registrering av utbytespunkt
    participant GO as Nätägare
    participant DHV as Datahub
    participant AdjGO as Angränsande Nätägare

    GO->>DHV: Registrera Utbytespunkt (BRS-DHV-113)
    activate DHV
    DHV-->>GO: Bekräftelse
    
    DHV->>AdjGO: Notifiera (BRS-DHV-565)
    
    AdjGO->>DHV: Begär info (BRS-DHV-564)
    DHV-->>AdjGO: Utbytespunktsdata
    deactivate DHV`,
      steps: [
        { stepId: "MPS-DHV-02-Sc1.1", role: "Nätägare", action: "Registrera", description: "Nätägaren registrerar en utbytespunkt.", refBRS: "BRS-DHV-113", refRule: "BRS113-1" },
        { stepId: "MPS-DHV-02-Sc1.2", role: "Datahub", action: "Registrera", description: "Datahubben registrerar punkten.", refBRS: "BRS-DHV-113", refRule: "BRS113-2" },
        { stepId: "MPS-DHV-02-Sc1.3", role: "Datahub", action: "Bekräfta", description: "Datahubben bekräftar.", refBRS: "BRS-DHV-113", refRule: "BRS113-3" },
        { stepId: "MPS-DHV-02-Sc1.4", role: "Datahub", action: "Notifiera Granne", description: "Datahubben skickar info till angränsande nätägare.", refBRS: "BRS-DHV-565", refRule: "BRS565-1" },
        { stepId: "MPS-DHV-02-Sc1.5", role: "Datahub", action: "Leverera Info", description: "Datahubben har skickat infon.", refBRS: "BRS-DHV-565", refRule: "BRS565-5" },
        { stepId: "MPS-DHV-02-Sc1.6", role: "Angränsande Nätägare", action: "Begär Info", description: "Angränsande nätägare begär detaljerad information.", refBRS: "BRS-DHV-564", refRule: "BRS564-1" },
        { stepId: "MPS-DHV-02-Sc1.7", role: "Datahub", action: "Svara", description: "Data distribueras.", refBRS: "BRS-DHV-564", refRule: "BRS564-2" }
      ]
    },
    {
      id: "MPS-DHV-02-Sc2",
      title: "Uppdatering av utbytespunkt",
      description: "Scenario 6520: En nätägare uppdaterar information om utbytespunkten.",
      diagramCode: `sequenceDiagram
    title Uppdatering av utbytespunkt
    participant GO as Nätägare
    participant DHV as Datahub
    participant AdjGO as Angränsande Nätägare

    GO->>DHV: Uppdatera (BRS-DHV-520)
    DHV-->>GO: Bekräftelse

    DHV->>AdjGO: Notifiera (BRS-DHV-565)
    AdjGO->>DHV: Begär info (BRS-DHV-564)`,
      steps: [
        { stepId: "MPS-DHV-02-Sc2.1", role: "Nätägare", action: "Uppdatera", description: "Nätägaren uppdaterar utbytespunkten.", refBRS: "BRS-DHV-520", refRule: "BRS520-1" },
        { stepId: "MPS-DHV-02-Sc2.2", role: "Datahub", action: "Spara", description: "Uppdateringen sparas.", refBRS: "BRS-DHV-520", refRule: "BRS520-2" },
        { stepId: "MPS-DHV-02-Sc2.3", role: "Datahub", action: "Bekräfta", description: "Bekräftelse skickas.", refBRS: "BRS-DHV-520", refRule: "BRS520-3" },
        { stepId: "MPS-DHV-02-Sc2.4", role: "Datahub", action: "Notifiera Granne", description: "Angränsande nätägare informeras.", refBRS: "BRS-DHV-565", refRule: "BRS522-2" },
        { stepId: "MPS-DHV-02-Sc2.5", role: "Datahub", action: "Leverera", description: "Info skickad.", refBRS: "BRS-DHV-565", refRule: "BRS522-5" },
        { stepId: "MPS-DHV-02-Sc2.6", role: "Angränsande Nätägare", action: "Begär Info", description: "Granne begär detaljer.", refBRS: "BRS-DHV-564", refRule: "BRS564-1" },
        { stepId: "MPS-DHV-02-Sc2.7", role: "Datahub", action: "Svara", description: "Data returneras.", refBRS: "BRS-DHV-564", refRule: "BRS564-2" }
      ]
    },
    {
      id: "MPS-DHV-02-Sc3",
      title: "Avregistrering av utbytespunkt",
      description: "Scenario 6114: En nätägare stänger en utbytespunkt.",
      steps: [
        { stepId: "MPS-DHV-02-Sc3.1", role: "Nätägare", action: "Avregistrera", description: "Nätägaren begär stängning.", refBRS: "BRS-DHV-114", refRule: "BRS113-1" }, // PDF refers 113 for dismantle logic too
        { stepId: "MPS-DHV-02-Sc3.2", role: "Datahub", action: "Registrera stängning", description: "Status ändras.", refBRS: "BRS-DHV-114", refRule: "BRS113-2" },
        { stepId: "MPS-DHV-02-Sc3.3", role: "Datahub", action: "Bekräfta", description: "Bekräftelse skickas.", refBRS: "BRS-DHV-114", refRule: "BRS113-3" },
        { stepId: "MPS-DHV-02-Sc3.4", role: "Datahub", action: "Notifiera Granne", description: "Angränsande nätägare informeras.", refBRS: "BRS-DHV-565", refRule: "BRS565-3" },
        { stepId: "MPS-DHV-02-Sc3.5", role: "Datahub", action: "Leverera", description: "Info skickad.", refBRS: "BRS-DHV-565", refRule: "BRS565-5" }
      ]
    },
    {
      id: "MPS-DHV-02-Sc4",
      title: "Begäran om information (Utbytespunkt)",
      description: "Scenario 6564: En nätägare begär information om en utbytespunkt.",
      steps: [
        { stepId: "MPS-DHV-02-Sc4.1", role: "Nätägare", action: "Begär info", description: "Nätägare skickar förfrågan.", refBRS: "BRS-DHV-564", refRule: "BRS564-1" },
        { stepId: "MPS-DHV-02-Sc4.2", role: "Datahub", action: "Svara", description: "Data distribueras.", refBRS: "BRS-DHV-564", refRule: "BRS564-2" }
      ]
    }
  ]
};
