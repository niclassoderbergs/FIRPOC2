
import { MPSData } from '../../../types';

export const mpsDhv07: MPSData = {
  id: "MPS-DHV-07",
  title: "Upphörd leverans",
  domain: "Domän 2: Avtal & marknad",
  purpose: "Att hantera processen när en leverans avslutas utan att en ny leverantör tar vid (t.ex. vid avtalsbrott eller konkurs). Detta leder ofta till anvisad leverans.",
  trigger: "Elleverantör eller Datahub Backoffice initierar upphörande.",
  scenarios: [
    {
      id: "MPS-DHV-07-Sc1",
      title: "Rapportera upphörd leverans",
      description: "Leverans avslutas. Detta triggar ofta anvisad leverans (BRS-DHV-2006).",
      steps: [
        { stepId: "1", role: "Elleverantör", action: "Rapportera", description: "Anmäl upphörd leverans.", refBRS: "BRS-DHV-217", refRule: "BRS217-1" },
        { stepId: "2", role: "Datahubben", action: "Verifiera", description: "Bekräfta mottagande.", refBRS: "BRS-DHV-217", refRule: "BRS217-3" },
        { stepId: "3", role: "System", action: "Trigger Anvisning", description: "Systemet startar process för anvisad leverans.", refBRS: "BRS-DHV-2006", refRule: "BRS2006-1" }
      ]
    }
  ]
};
