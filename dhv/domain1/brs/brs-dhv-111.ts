
import { BRSData } from '../../../types';
import { contentDhv111Input, contentDhv111Output } from '../../content-dhv-domain-1';

export const brsDhv111: BRSData = {
  id: "BRS-DHV-111",
  title: "Registrera kundmätpunkt",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare (Grid Owner) registrerar en kundmätpunkt (Customer Metering Point). En kundmätpunkt kan bestå av en eller två avräkningspunkter (Accounting Points). Om en mätpunkt registreras med en avräkningspunkt kan en ytterligare läggas till senare. Det är viktigt att nätägaren säkerställer att attributet 'obligation to receive' sätts korrekt.",
  actors: [
    { role: "Initiator", description: "Nätägare (Grid Owner)" },
    { role: "Mottagare", description: "Datahub (DHV)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-111: Registrera kundmätpunkt
    participant GO as Nätägare
    participant DHV as Datahub

    GO->>DHV: Registrera kundmätpunkt
    activate DHV
    DHV->>DHV: Validera data

    alt Validering OK
        DHV->>DHV: Registrera mätpunkt
        DHV-->>GO: Bekräftelse (Success)
    else Validering Fel
        DHV-->>GO: Felmeddelande (Error)
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS111-1", description: "Nätägaren har initierat registrering av en kundmätpunkt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS111-2", description: "Datahubben har registrerat kundmätpunkten." },
      { id: "BRS111-3", description: "Datahubben har svarat med en bekräftelse (Success)." }
    ],
    rejected: [
      { id: "BRS111-4", description: "Datahubben har svarat med felmeddelande enligt affärsregler." }
    ]
  },
  businessRules: [
    { id: "BRS111-7", description: "Nätägaren måste vara den nuvarande ägaren av nätområdet där mätpunkten registreras.", errorCode: "E_MPM_3001_01" },
    { id: "BRS111-8", description: "Nätområdet måste ha status 'Active'.", errorCode: "E_MPM_3003_01" },
    { id: "BRS111-9", description: "Mätpunkts-ID (Metering Point ID) får inte redan existera i Datahubben.", errorCode: "E_MPM_9007_01" },
    { id: "BRS111-12", description: "Kombinationen av adressattribut måste vara unik.", errorCode: "E_MPM_9006_01" },
    { id: "BRS111-13", description: "Avräkningspunkts-ID (Accounting Point ID) får inte redan existera.", errorCode: "E_MPM_9001_01" },
    { id: "BRS111-13B", description: "För typen 'Consumption' måste Accounting Point ID vara samma som Metering Point ID.", errorCode: "E_MPM_0003_01" },
    { id: "BRS111-13C", description: "För typen 'Production' får Accounting Point ID INTE vara samma som Metering Point ID.", errorCode: "E_MPM_0005_01" },
    { id: "BRS111-13D", description: "Mätpunkten måste innehålla minst en avräkningspunkt.", errorCode: "E_MPM_0001_01" },
    { id: "BRS111-17", description: "'Obligation to receive' kan bara sättas till true om mätpunkten har både konsumtion och produktion.", errorCode: "E_MPM_0009_01" },
    { id: "BRS111-22", description: "Accounting Point ID måste vara en giltig GS1-kod.", errorCode: "E_MPM_0007_01" },
    { id: "BRS111-23", description: "Status vid registrering måste vara 'Under Construction'.", errorCode: "E_MPM_0004_02" },
    { id: "BRS111-24", description: "Accounting Point status måste vara 'Available for contract'.", errorCode: "E_MPM_0002_04" },
    { id: "BRS111-25", description: "Om mätintervall är PT15M måste rapporteringsintervall vara 'Day'.", errorCode: "E_MPM_0010_02" },
    { id: "BRS111-26", description: "Om mätintervall är PT1H måste rapporteringsintervall vara 'Day'.", errorCode: "E_MPM_0010_02" },
    { id: "BRS111-27", description: "Om mätintervall är P1M måste rapporteringsintervall vara 'Month'.", errorCode: "E_MPM_0010_01" },
    { id: "BRS111-28", description: "Uppskattad årsförbrukning måste vara >= 0.", errorCode: "E_SYNTAX" },
    { id: "BRS111-29", description: "Angivet nättariff-ID måste existera i nätområdet.", errorCode: "E_MPM_3002_01" },
    { id: "BRS111-40", description: "Metering Point ID måste vara en giltig GS1-kod.", errorCode: "E_MPM_0008_01" },
    { id: "BRS111-41", description: "'Valid from' måste vara vid ett dygnsskifte UTC+1.", errorCode: "E_MPM_0012_01" },
    { id: "BRS111-42", description: "'Valid from' måste vara framåt i tiden (senast föregående dygnsskifte).", errorCode: "E_MPM_0013_01" },
    { id: "BRS111-43", description: "Om produktion finns måste rapporteringsintervall vara 'Day'.", errorCode: "-" },
    { id: "BRS111-44", description: "Om produktion finns måste mätintervall vara PT15M eller PT1H.", errorCode: "-" }
  ],
  process: [
    { id: "BRS111-30", description: "Nätägaren registrerar en kundmätpunkt." },
    { id: "BRS111-31", description: "Datahubben svarar med bekräftelse." },
    { id: "BRS111-35", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv111Input, contentDhv111Output]
};
