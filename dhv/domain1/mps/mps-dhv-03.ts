
import { MPSData } from '../../../types';

export const mpsDhv03: MPSData = {
  id: "MPS-DHV-03",
  title: "Hantering av nätavtalsinformation",
  domain: "Domän 1: Mätpunkt",
  purpose: "Att hantera registrering, uppdatering, radering och informationsinhämtning gällande kundens nätavtal (Grid Contract). Detta krävs i fall där ett separat nätavtal är en förutsättning för att teckna elhandelsavtal. Täcker PDF-processerna 6120, 6121, 6122 och 6123.",
  trigger: "Nätägare initierar.",
  scenarios: [
    {
      id: "MPS-DHV-03-Sc1",
      title: "Registrera nätavtalsinformation",
      description: "Scenario 6120: En nätägare registrerar att ett nätavtal är tecknat.",
      steps: [
        { stepId: "MPS-DHV-03-Sc1.1", role: "Nätägare", action: "Registrera", description: "Nätägaren registrerar nätavtalsinformation.", refBRS: "BRS-DHV-120", refRule: "BRS120-1" },
        { stepId: "MPS-DHV-03-Sc1.2", role: "Datahub", action: "Bekräfta", description: "Datahubben svarar med en bekräftelse.", refBRS: "BRS-DHV-120", refRule: "BRS120-3" }
      ]
    },
    {
      id: "MPS-DHV-03-Sc2",
      title: "Uppdatera nätavtalsinformation",
      description: "Scenario 6121: En nätägare uppdaterar nätavtalsinformation (t.ex. giltighetstid).",
      steps: [
        { stepId: "MPS-DHV-03-Sc2.1", role: "Nätägare", action: "Uppdatera", description: "Nätägaren uppdaterar nätavtalet.", refBRS: "BRS-DHV-121", refRule: "BRS121-1" },
        { stepId: "MPS-DHV-03-Sc2.2", role: "Datahub", action: "Bekräfta", description: "Datahubben svarar med en bekräftelse.", refBRS: "BRS-DHV-121", refRule: "BRS121-3" }
      ]
    },
    {
      id: "MPS-DHV-03-Sc3",
      title: "Ta bort nätavtalsinformation",
      description: "Scenario 6122: En nätägare tar bort felaktig nätavtalsinformation.",
      steps: [
        { stepId: "MPS-DHV-03-Sc3.1", role: "Nätägare", action: "Ta bort", description: "Nätägaren raderar nätavtalet.", refBRS: "BRS-DHV-122", refRule: "BRS122-1" },
        { stepId: "MPS-DHV-03-Sc3.2", role: "Datahub", action: "Bekräfta", description: "Datahubben svarar med en bekräftelse.", refBRS: "BRS-DHV-122", refRule: "BRS122-3" }
      ]
    },
    {
      id: "MPS-DHV-03-Sc4",
      title: "Begär nätavtalsinformation",
      description: "Scenario 6123: En nätägare begär information om registrerade nätavtal.",
      steps: [
        { stepId: "MPS-DHV-03-Sc4.1", role: "Nätägare", action: "Begär info", description: "Nätägaren begär nätavtalsinformation.", refBRS: "BRS-DHV-123", refRule: "BRS123-1" },
        { stepId: "MPS-DHV-03-Sc4.2", role: "Datahub", action: "Leverera", description: "Datahubben levererar informationen.", refBRS: "BRS-DHV-123", refRule: "BRS123-3" }
      ]
    }
  ]
};
