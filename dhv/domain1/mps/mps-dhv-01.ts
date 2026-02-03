
import { MPSData } from '../../../types';

export const mpsDhv01: MPSData = {
  id: "MPS-DHV-01",
  title: "Livscykelhantering av kundmätpunkt",
  status: "LEGACY",
  history: [
    {
      version: '1.0',
      date: '2020-01-01',
      author: 'EMH-projektet',
      description: 'Legacy-data importerad från EMH-projektet (2018-2020).'
    }
  ],
  domain: "Domän 1: Mätpunkt",
  purpose: "Att hantera registrering, uppdatering, avveckling och informationsinhämtning gällande kundmätpunkter. Täcker PDF-processerna 6111, 6562, 6542, 6582, 6519 och 6112.",
  trigger: "Nätägare eller annan aktör initierar en förändring eller förfrågan.",
  scenarios: [
    {
      id: "MPS-DHV-01-Sc1",
      title: "Registrering av kundmätpunkt",
      description: "Scenario 6111: En nätägare registrerar en ny kundmätpunkt.",
      diagramCode: `sequenceDiagram
    title Registrering av kundmätpunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Registrera mätpunkt (BRS-DHV-111)
    activate DHV
    DHV->>DHV: Validera master data
    DHV-->>GO: Bekräftelse
    deactivate DHV`,
      steps: [
        { 
          stepId: "MPS-DHV-01-Sc1.1", role: "Nätägare", action: "Registrera", 
          description: "Nätägaren registrerar en kundmätpunkt.", 
          refBRS: "BRS-DHV-111", refRule: "BRS111-1" 
        },
        { 
          stepId: "MPS-DHV-01-Sc1.2", role: "Datahub", action: "Bekräfta", 
          description: "Datahubben svarar med en bekräftelse (Success).", 
          refBRS: "BRS-DHV-111", refRule: "BRS111-3" 
        }
      ]
    },
    {
      id: "MPS-DHV-01-Sc2",
      title: "Nätägare begär mätpunktsinformation",
      description: "Scenario 6562: En nätägare begär information om en mätpunkt.",
      steps: [
        { stepId: "MPS-DHV-01-Sc2.1", role: "Nätägare", action: "Begär info", description: "Nätägaren skickar en förfrågan.", refBRS: "BRS-DHV-562", refRule: "BRS562-1" },
        { stepId: "MPS-DHV-01-Sc2.2", role: "Datahub", action: "Leverera", description: "Datahubben returnerar mätpunktsdata.", refBRS: "BRS-DHV-562", refRule: "BRS562-2" }
      ]
    },
    {
      id: "MPS-DHV-01-Sc3",
      title: "Elleverantör begär avräkningspunktsinformation",
      description: "Scenario 6542: En elleverantör begär information om en avräkningspunkt.",
      steps: [
        { stepId: "MPS-DHV-01-Sc3.1", role: "Elleverantör", action: "Begär info", description: "Elleverantören skickar en förfrågan.", refBRS: "BRS-DHV-542", refRule: "BRS542-1" },
        { stepId: "MPS-DHV-01-Sc3.2", role: "Datahub", action: "Leverera", description: "Datahubben returnerar data.", refBRS: "BRS-DHV-542", refRule: "BRS542-2" }
      ]
    },
    {
      id: "MPS-DHV-01-Sc4",
      title: "ESCO begär avräkningspunktsinformation",
      description: "Scenario 6582: En ESCO begär information.",
      steps: [
        { stepId: "MPS-DHV-01-Sc4.1", role: "ESCO", action: "Begär info", description: "ESCO skickar en förfrågan.", refBRS: "BRS-DHV-582", refRule: "BRS582-1" },
        { stepId: "MPS-DHV-01-Sc4.2", role: "Datahub", action: "Leverera", description: "Datahubben returnerar data.", refBRS: "BRS-DHV-582", refRule: "BRS582-2" }
      ]
    },
    {
      id: "MPS-DHV-01-Sc5",
      title: "Uppdatering av kundmätpunkt",
      description: "Scenario 6519: En nätägare uppdaterar information. Detta triggar notifieringar till Elleverantör och ESCO.",
      diagramCode: `sequenceDiagram
    title Uppdatering av kundmätpunkt
    participant GO as Nätägare
    participant DHV as Datahub
    participant RET as Elleverantör
    participant ESCO as ESCO

    GO->>DHV: Uppdatera mätpunkt (BRS-DHV-519)
    DHV-->>GO: Bekräftelse

    par Notifiering
        DHV->>RET: Notifiera (BRS-DHV-543)
        DHV->>ESCO: Notifiera (BRS-DHV-583)
    end

    par Uppföljning
        RET->>DHV: Begär info (BRS-DHV-542)
        ESCO->>DHV: Begär info (BRS-DHV-582)
    end`,
      steps: [
        { stepId: "MPS-DHV-01-Sc5.1", role: "Nätägare", action: "Uppdatera", description: "Nätägaren uppdaterar en kundmätpunkt.", refBRS: "BRS-DHV-519", refRule: "BRS519-1" },
        { stepId: "MPS-DHV-01-Sc5.2", role: "Datahub", action: "Bekräfta", description: "Datahubben svarar med en bekräftelse.", refBRS: "BRS-DHV-519", refRule: "BRS519-2b" },
        { stepId: "MPS-DHV-01-Sc5.3", role: "Datahub", action: "Notifiera Retailer", description: "Datahubben skickar info till berörda elleverantörer.", refBRS: "BRS-DHV-543", refRule: "BRS543-2" },
        { stepId: "MPS-DHV-01-Sc5.4", role: "Datahub", action: "Verifiera Retailer", description: "Endast aktiva/framtida leverantörer notifieras.", refBRS: "BRS-DHV-543", refRule: "BRS543-5" },
        { stepId: "MPS-DHV-01-Sc5.5", role: "Datahub", action: "Notifiera ESCO", description: "Datahubben skickar info till berörda ESCOs.", refBRS: "BRS-DHV-583", refRule: "BRS583-2" },
        { stepId: "MPS-DHV-01-Sc5.6", role: "Datahub", action: "Verifiera ESCO", description: "Endast ESCOs med samtycke notifieras.", refBRS: "BRS-DHV-583", refRule: "BRS583-5" },
        { stepId: "MPS-DHV-01-Sc5.7", role: "Elleverantör", action: "Begär info", description: "Elleverantören hämtar uppdaterad data.", refBRS: "BRS-DHV-542", refRule: "BRS542-1" },
        { stepId: "MPS-DHV-01-Sc5.8", role: "Datahub", action: "Leverera", description: "Data levereras till Elleverantör.", refBRS: "BRS-DHV-542", refRule: "BRS542-2" },
        { stepId: "MPS-DHV-01-Sc5.9", role: "ESCO", action: "Begär info", description: "ESCO hämtar uppdaterad data.", refBRS: "BRS-DHV-582", refRule: "BRS582-1" },
        { stepId: "MPS-FLEX-01-Sc5.10", role: "Datahub", action: "Leverera", description: "Data levereras till ESCO.", refBRS: "BRS-DHV-582", refRule: "BRS582-2" }
      ]
    },
    {
      id: "MPS-DHV-01-Sc6",
      title: "Avregistrera (Dismantle) kundmätpunkt",
      description: "Scenario 6112: En nätägare stänger permanent en mätpunkt. Notifieringar går ut till aktörer.",
      diagramCode: `sequenceDiagram
    title Avregistrering
    participant GO as Nätägare
    participant DHV as Datahub
    participant RET as Elleverantör
    participant ESCO as ESCO

    GO->>DHV: Avregistrera (BRS-DHV-112)
    DHV-->>GO: Bekräftelse

    DHV->>RET: Notifiera (BRS-DHV-543)
    DHV->>ESCO: Notifiera (BRS-DHV-583)`,
      steps: [
        { stepId: "MPS-DHV-01-Sc6.1", role: "Nätägare", action: "Avregistrera", description: "Nätägaren stänger mätpunkten.", refBRS: "BRS-DHV-112", refRule: "BRS112-1" },
        { stepId: "MPS-DHV-01-Sc6.2", role: "Datahub", action: "Bekräfta", description: "Datahubben bekräftar stängningen.", refBRS: "BRS-DHV-112", refRule: "BRS112-3" },
        { stepId: "MPS-DHV-01-Sc6.3", role: "Datahub", action: "Notifiera Retailer", description: "Datahubben notifierar elleverantören.", refBRS: "BRS-DHV-543", refRule: "BRS543-1" },
        { stepId: "MPS-DHV-01-Sc6.4", role: "Datahub", action: "Verifiera Retailer", description: "Notifiering till berörda.", refBRS: "BRS-DHV-543", refRule: "BRS543-5" },
        { stepId: "MPS-DHV-01-Sc6.5", role: "Datahub", action: "Notifiera ESCO", description: "Datahubben notifierar ESCO.", refBRS: "BRS-DHV-583", refRule: "BRS583-1" },
        { stepId: "MPS-DHV-01-Sc6.6", role: "Datahub", action: "Verifiera ESCO", description: "Notifiering till berörda.", refBRS: "BRS-DHV-583", refRule: "BRS583-5" },
        { stepId: "MPS-DHV-01-Sc6.7", role: "Elleverantör", action: "Begär info", description: "Elleverantören hämtar slutstatus.", refBRS: "BRS-DHV-542", refRule: "BRS542-1" },
        { stepId: "MPS-DHV-01-Sc6.8", role: "Datahub", action: "Leverera", description: "Data levereras.", refBRS: "BRS-DHV-542", refRule: "BRS542-2" },
        { stepId: "MPS-DHV-01-Sc6.9", role: "ESCO", action: "Begär info", description: "ESCO hämtar slutstatus.", refBRS: "BRS-DHV-582", refRule: "BRS582-1" },
        { stepId: "MPS-DHV-01-Sc6.10", role: "Datahub", action: "Leverera", description: "Data levereras.", refBRS: "BRS-DHV-582", refRule: "BRS582-2" }
      ]
    }
  ]
};
