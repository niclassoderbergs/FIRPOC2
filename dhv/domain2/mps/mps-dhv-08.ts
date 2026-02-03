
import { MPSData } from '../../../types';

export const mpsDhv08: MPSData = {
  id: "MPS-DHV-08",
  title: "Ångra processer",
  domain: "Domän 2: Avtal & marknad",
  purpose: "Att hantera annullering av tidigare rapporterade händelser (Inflytt, Utflytt, Byte) innan de har trätt i kraft.",
  trigger: "Elleverantör eller kund ångrar en anmälan.",
  scenarios: [
    {
      id: "MPS-DHV-08-Sc1",
      title: "Ångra inflyttning",
      description: "En elleverantör ångrar en anmäld inflyttning.",
      steps: [
        { stepId: "1", role: "Elleverantör", action: "Ångra", description: "Skicka begäran om att ångra inflytt.", refBRS: "BRS-DHV-221", refRule: "BRS221-1" },
        { stepId: "2", role: "Datahubben", action: "Makulera", description: "Inflytten tas bort.", refBRS: "BRS-DHV-221", refRule: "BRS221-4" },
        { stepId: "3", role: "Datahubben", action: "Notifiera", description: "Notifiera berörda parter om annulleringen.", refBRS: "BRS-DHV-242", refRule: "BRS242-4" }
      ]
    },
    {
      id: "MPS-DHV-08-Sc2",
      title: "Ångra leverantörsbyte",
      description: "En elleverantör ångrar ett anmält byte.",
      steps: [
        { stepId: "1", role: "Elleverantör", action: "Ångra", description: "Skicka begäran om att ångra byte.", refBRS: "BRS-DHV-222", refRule: "BRS222-1" },
        { stepId: "2", role: "Datahubben", action: "Återställ", description: "Återställ tidigare leverans.", refBRS: "BRS-DHV-222", refRule: "BRS222-6" },
        { stepId: "3", role: "Datahubben", action: "Notifiera Start", description: "Notifiera ny leverantör om avbrott.", refBRS: "BRS-DHV-247", refRule: "BRS247-3" },
        { stepId: "4", role: "Datahubben", action: "Notifiera Slut", description: "Notifiera gammal leverantör om återgång.", refBRS: "BRS-DHV-249", refRule: "BRS249-3" }
      ]
    },
    {
      id: "MPS-DHV-08-Sc3",
      title: "Ångra utflyttning",
      description: "En elleverantör ångrar en anmäld utflyttning.",
      steps: [
        { stepId: "1", role: "Elleverantör", action: "Ångra", description: "Skicka begäran om att ångra utflytt.", refBRS: "BRS-DHV-224", refRule: "BRS224-1" },
        { stepId: "2", role: "Datahubben", action: "Makulera", description: "Utflytten tas bort.", refBRS: "BRS-DHV-224", refRule: "BRS224-4" },
        { stepId: "3", role: "Datahubben", action: "Notifiera", description: "Notifiera berörda parter.", refBRS: "BRS-DHV-245", refRule: "BRS245-4" }
      ]
    }
  ]
};
