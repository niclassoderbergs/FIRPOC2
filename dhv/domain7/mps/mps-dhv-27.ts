
import { MPSData } from '../../../types';

export const mpsDhv27: MPSData = {
  id: "MPS-DHV-27",
  title: "Statistik",
  domain: "Domän 7: Nätavräkning",
  purpose: "Beräkning av aggregerade energivolymer för statistik och uppföljning per budområde (MBA) och för Sverige (SWE).",
  trigger: "Tidsstyrd.",
  scenarios: [
    {
      id: "MPS-DHV-27-Sc1",
      title: "Generera statistik",
      description: "Datahubben aggregerar data för export/import, produktion och konsumtion på nationell nivå.",
      diagramCode: `sequenceDiagram
    title Statistikberäkning
    participant Sys as System

    Sys->>Sys: Beräkna MBA Utbyte (7100)
    Sys->>Sys: Beräkna SWE Utbyte (7101)
    Sys->>Sys: Aggregera MBA Produktion (7102)
    Sys->>Sys: Aggregera SWE Produktion (7103)
    Sys->>Sys: Aggregera MBA Konsumtion (7104)
    Sys->>Sys: Aggregera SWE Konsumtion (7105)`,
      steps: [
        { stepId: "1", role: "System", action: "Beräkna MBA Utbyte", description: "MBA/MBA Exchange, Import/Export.", refBRS: "BRS-DHV-7100", refRule: "-" },
        { stepId: "2", role: "System", action: "Beräkna SWE Utbyte", description: "SWE/CON Exchange.", refBRS: "BRS-DHV-7101", refRule: "-" },
        { stepId: "3", role: "System", action: "Aggregera Produktion", description: "Produktion per MBA och SWE.", refBRS: "BRS-DHV-7102", refRule: "-" },
        { stepId: "4", role: "System", action: "Aggregera Konsumtion", description: "Konsumtion per MBA och SWE.", refBRS: "BRS-DHV-7104", refRule: "-" },
        { stepId: "5", role: "System", action: "Aggregera Load Profile", description: "Load profile per MBA och SWE.", refBRS: "BRS-DHV-7106", refRule: "-" }
      ]
    }
  ]
};
