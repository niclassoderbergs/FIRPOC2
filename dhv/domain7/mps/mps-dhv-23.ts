
import { MPSData } from '../../../types';

export const mpsDhv23: MPSData = {
  id: "MPS-DHV-23",
  title: "Nätavräkning (Data hub functions)",
  status: "LEGACY",
  history: [
    {
      version: '1.0',
      date: '2020-01-01',
      author: 'EMH-projektet',
      description: 'Legacy-data importerad från EMH-projektet (2018-2020).'
    }
  ],
  domain: "Domän 7: Nätavräkning",
  purpose: "Att beskriva hur nätavräkningen beräknas genom aggregering av energileveranser. Processen omfattar beräkning av residualer, profilering, nätförluster och slutlig leveransavräkning per aktör.",
  trigger: "Tidsstyrd (Daglig/Månadsvis körning).",
  scenarios: [
    {
      id: "MPS-DHV-23-Sc1",
      title: "Daglig balansberäkning",
      description: "Huvudflödet för att beräkna balans och settlement.",
      diagramCode: `sequenceDiagram
    title Nätavräkningsflöde
    participant Sys as System

    Note over Sys: 1. Konvertering
    Sys->>Sys: Tim -> Kvart (BRS-DHV-7000)
    
    Note over Sys: 2. Aggregering
    Sys->>Sys: Aggregera per MGA (BRS-DHV-7001/7002)
    
    Note over Sys: 3. Residual
    Sys->>Sys: Beräkna Residual (BRS-DHV-7003)
    
    Note over Sys: 4. Profilering
    Sys->>Sys: Skapa Load Profile (BRS-DHV-7008)
    Sys->>Sys: Preliminär profilavräkning (BRS-DHV-7009)
    
    Note over Sys: 5. Förluster & Leverans
    Sys->>Sys: Beräkna Nätförluster (BRS-DHV-7015)
    Sys->>Sys: Leveransavräkning (BRS-DHV-7016)
    
    Note over Sys: 6. Korrigering
    Sys->>Sys: Korrigeringsavräkning (BRS-DHV-7019)`,
      steps: [
        { stepId: "1", role: "System", action: "Konvertera", description: "Konvertera timvärden till kvartsvärden.", refBRS: "BRS-DHV-7000", refRule: "BRS7000-2" },
        { stepId: "2", role: "System", action: "Aggregera", description: "Aggregera mätvärden per MGA.", refBRS: "BRS-DHV-7001", refRule: "BRS7001-2" },
        { stepId: "3", role: "System", action: "Residual", description: "Beräkna MGA-residual.", refBRS: "BRS-DHV-7003", refRule: "BRS7003-2" },
        { stepId: "4", role: "System", action: "Profilering", description: "Skapa lastprofil och beräkna profilerad förbrukning.", refBRS: "BRS-DHV-7008", refRule: "-" },
        { stepId: "5", role: "System", action: "Förluster", description: "Beräkna nätförluster.", refBRS: "BRS-DHV-7015", refRule: "BRS7015-3" },
        { stepId: "6", role: "System", action: "Leveransavräkning", description: "Beräkna leveransavräkning per aktör.", refBRS: "BRS-DHV-7016", refRule: "BRS7016-2" }
      ]
    }
  ]
};
