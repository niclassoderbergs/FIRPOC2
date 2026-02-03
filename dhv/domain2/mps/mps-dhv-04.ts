
import { MPSData } from '../../../types';

export const mpsDhv04: MPSData = {
  id: "MPS-DHV-04",
  title: "Inflyttning",
  domain: "Domän 2: Avtal & marknad",
  purpose: "Att hantera processen för när en kund flyttar in på en anläggning. Detta inkluderar sökning av anläggning, rapportering av inflytt och notifiering till berörda parter.",
  trigger: "Kund kontaktar elleverantör för att teckna avtal vid inflytt.",
  scenarios: [
    {
      id: "MPS-DHV-04-Sc1",
      title: "Standard inflyttning",
      description: "En elleverantör rapporterar en inflyttning på en ledig anläggning.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-04-Sc1: Inflyttning
    participant Lev as Elleverantör
    participant DHV as Datahubben
    participant GO as Nätägare
    participant ESCO as ESCO

    opt Förberedelse
        Lev->>DHV: Begär AP ID (BRS-DHV-201)
        Lev->>DHV: Begär Stamdata (BRS-DHV-202)
    end

    Lev->>DHV: Rapportera inflytt (BRS-DHV-211)
    activate DHV
    DHV-->>Lev: Bekräftelse
    
    par Notifiering
        DHV->>Lev: Inflytt Registrerad (BRS-DHV-241)
        DHV->>GO: Inflytt Registrerad (BRS-DHV-262)
        DHV->>ESCO: Inflytt Registrerad (BRS-DHV-280)
    end
    deactivate DHV`,
      steps: [
        { stepId: "1", role: "Elleverantör", action: "Sök AP", description: "Sök anläggnings-ID via adress.", refBRS: "BRS-DHV-201", refRule: "BRS201-1" },
        { stepId: "2", role: "Elleverantör", action: "Hämta data", description: "Hämta stamdata inför inflytt.", refBRS: "BRS-DHV-202", refRule: "BRS202-1" },
        { stepId: "3", role: "Elleverantör", action: "Rapportera", description: "Anmäl inflyttning.", refBRS: "BRS-DHV-211", refRule: "BRS211-1" },
        { stepId: "4", role: "Datahubben", action: "Verifiera", description: "Validering OK, leverans skapas.", refBRS: "BRS-DHV-211", refRule: "BRS211-2" },
        { stepId: "5", role: "Datahubben", action: "Notifiera Lev", description: "Bekräfta registrering.", refBRS: "BRS-DHV-241", refRule: "BRS241-3" },
        { stepId: "6", role: "Datahubben", action: "Notifiera Nät", description: "Informera nätägare.", refBRS: "BRS-DHV-262", refRule: "BRS262-3" },
        { stepId: "7", role: "Datahubben", action: "Notifiera ESCO", description: "Informera ev. ESCO.", refBRS: "BRS-DHV-280", refRule: "BRS280-3" }
      ]
    },
    {
      id: "MPS-DHV-04-Sc2",
      title: "Inflyttning med vänteläge (Pending)",
      description: "Inflyttning på en anläggning där det redan finns en aktiv kund eller där anläggningen är under konstruktion.",
      steps: [
        { stepId: "1", role: "Elleverantör", action: "Rapportera", description: "Anmäl inflyttning.", refBRS: "BRS-DHV-211", refRule: "BRS211-1" },
        { stepId: "2", role: "Datahubben", action: "Vänteläge", description: "Svara med status 'Pending existing customer'.", refBRS: "BRS-DHV-211", refRule: "BRS211-2b" },
        { stepId: "3", role: "Datahubben", action: "Notifiera", description: "Skicka 'Move in pending' till leverantör.", refBRS: "BRS-DHV-240", refRule: "BRS240-3" },
        { stepId: "4", role: "Datahubben", action: "Notifiera Gammal", description: "Skicka 'Move out requested' till befintlig leverantör.", refBRS: "BRS-DHV-243", refRule: "BRS243-2" }
      ]
    }
  ]
};
