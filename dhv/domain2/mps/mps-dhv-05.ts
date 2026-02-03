
import { MPSData } from '../../../types';

export const mpsDhv05: MPSData = {
  id: "MPS-DHV-05",
  title: "Utflyttning",
  domain: "Domän 2: Avtal & marknad",
  purpose: "Att hantera processen när en kund flyttar ut från en anläggning, eller när en befintlig leverantör avvisar en begärd utflyttning.",
  trigger: "Kund kontaktar elleverantör för att säga upp avtal vid utflytt.",
  scenarios: [
    {
      id: "MPS-DHV-05-Sc1",
      title: "Standard utflyttning",
      description: "En elleverantör rapporterar en utflyttning.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-05-Sc1: Utflyttning
    participant Lev as Elleverantör
    participant DHV as Datahubben
    participant GO as Nätägare
    participant ESCO as ESCO

    Lev->>DHV: Rapportera utflytt (BRS-DHV-213)
    activate DHV
    DHV-->>Lev: Bekräftelse
    
    par Notifiering
        DHV->>Lev: Utflytt Registrerad (BRS-DHV-244)
        DHV->>GO: Utflytt Registrerad (BRS-DHV-264)
        DHV->>ESCO: Utflytt Registrerad (BRS-DHV-282)
    end
    deactivate DHV`,
      steps: [
        { stepId: "1", role: "Elleverantör", action: "Rapportera", description: "Anmäl utflyttning.", refBRS: "BRS-DHV-213", refRule: "BRS213-1" },
        { stepId: "2", role: "Datahubben", action: "Verifiera", description: "Uppdatera leveransinformation.", refBRS: "BRS-DHV-213", refRule: "BRS213-3" },
        { stepId: "3", role: "Datahubben", action: "Notifiera Lev", description: "Bekräfta utflytt.", refBRS: "BRS-DHV-244", refRule: "BRS244-3" },
        { stepId: "4", role: "Datahubben", action: "Notifiera Nät", description: "Informera nätägare.", refBRS: "BRS-DHV-264", refRule: "BRS264-3" },
        { stepId: "5", role: "Datahubben", action: "Notifiera ESCO", description: "Informera ev. ESCO.", refBRS: "BRS-DHV-282", refRule: "BRS282-3" }
      ]
    },
    {
      id: "MPS-DHV-05-Sc2",
      title: "Avvisa begärd utflyttning",
      description: "Den befintliga leverantören avvisar en 'Move out requested' som initierats av en annan parts inflyttningsbegäran (t.ex. felaktig inflytt).",
      steps: [
        { stepId: "1", role: "Bef. Lev", action: "Avvisa", description: "Avvisa begäran om utflytt.", refBRS: "BRS-DHV-212", refRule: "BRS212-1" },
        { stepId: "2", role: "Datahubben", action: "Avbryt Inflytt", description: "Den väntande inflytten makuleras.", refBRS: "BRS-DHV-212", refRule: "BRS212-2" },
        { stepId: "3", role: "Datahubben", action: "Notifiera Ny Lev", description: "Ny leverantör meddelas om avslag (Inflytt ångrad).", refBRS: "BRS-DHV-242", refRule: "BRS242-4" }
      ]
    }
  ]
};
