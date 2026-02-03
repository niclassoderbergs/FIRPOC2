
import { MPSData } from '../../../types';

export const mpsDhv06: MPSData = {
  id: "MPS-DHV-06",
  title: "Leverantörsbyte",
  domain: "Domän 2: Avtal & marknad",
  purpose: "Att hantera processen när en kund byter elleverantör på en anläggning.",
  trigger: "Kund tecknar avtal med ny elleverantör.",
  scenarios: [
    {
      id: "MPS-DHV-06-Sc1",
      title: "Standard leverantörsbyte",
      description: "En ny elleverantör tar över leveransen från en befintlig.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-06-Sc1: Leverantörsbyte
    participant NyLev as Ny Lev
    participant DHV as Datahubben
    participant GammalLev as Gammal Lev
    participant GO as Nätägare

    opt Förberedelse
        NyLev->>DHV: Hämta info (BRS-DHV-203)
    end

    NyLev->>DHV: Rapportera byte (BRS-DHV-215)
    activate DHV
    DHV-->>NyLev: Bekräftelse
    
    par Notifiering Start
        DHV->>NyLev: Byte Start (BRS-DHV-246)
        DHV->>GO: Byte Registrerat (BRS-DHV-266)
    end

    par Notifiering Slut
        DHV->>GammalLev: Byte Slut (BRS-DHV-248)
    end
    deactivate DHV`,
      steps: [
        { stepId: "1", role: "Ny Lev", action: "Hämta info", description: "Hämta info före avtal (frivilligt).", refBRS: "BRS-DHV-203", refRule: "BRS203-1" },
        { stepId: "2", role: "Ny Lev", action: "Rapportera", description: "Anmäl leverantörsbyte.", refBRS: "BRS-DHV-215", refRule: "BRS215-1" },
        { stepId: "3", role: "Datahubben", action: "Verifiera", description: "Skapa/Uppdatera leverans.", refBRS: "BRS-DHV-215", refRule: "BRS215-4" },
        { stepId: "4", role: "Datahubben", action: "Notifiera Start", description: "Meddela ny leverantör om start.", refBRS: "BRS-DHV-246", refRule: "BRS246-4" },
        { stepId: "5", role: "Datahubben", action: "Notifiera Slut", description: "Meddela frånträdande leverantör.", refBRS: "BRS-DHV-248", refRule: "BRS248-4" },
        { stepId: "6", role: "Datahubben", action: "Notifiera Nät", description: "Informera nätägare.", refBRS: "BRS-DHV-266", refRule: "BRS266-4" },
        { stepId: "7", role: "Datahubben", action: "Notifiera ESCO", description: "Informera ev. ESCO.", refBRS: "BRS-DHV-284", refRule: "BRS284-4" }
      ]
    }
  ]
};
