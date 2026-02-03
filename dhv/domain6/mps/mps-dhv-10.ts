
import { MPSData } from '../../../types';

export const mpsDhv10: MPSData = {
  id: "MPS-DHV-10",
  title: "Distribution av mätvärden",
  domain: "Domän 6: Mätvärden",
  purpose: "Att distribuera validerade mätvärden till berättigade aktörer. Mottagare beror på om det är en kundmätpunkt eller en utbytespunkt.",
  trigger: "Mätvärden har validerats och lagrats (BRS-DHV-6001).",
  scenarios: [
    {
      id: "MPS-DHV-10-Sc1",
      title: "Distribution för kundmätpunkt",
      description: "Mätvärden för en kundmätpunkt distribueras till den ansvariga elleverantören samt eventuella ESCOs med giltigt samtycke.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-10-Sc1: Distribution (Kundmätpunkt)
    participant DHV as Datahubben
    participant Ret as Elleverantör
    participant ESCO as ESCO

    Note over DHV: Trigger: Mätvärden (Kund) lagrade
    
    par Distribution
        DHV->>Ret: Skicka mätvärden (BRS-DHV-643)
        DHV->>ESCO: Skicka mätvärden (BRS-DHV-683)
    end`,
      steps: [
        { 
          stepId: "1", role: "System", action: "Trigger", 
          description: "Mätvärden för kundmätpunkt validerade.", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-5",
          isPrerequisite: true
        },
        { 
          stepId: "2", role: "Datahubben", action: "Distribuera Lev", 
          description: "Mätvärden skickas till ansvarig elleverantör.", 
          refBRS: "BRS-DHV-643", refRule: "BRS643-5" 
        },
        { 
          stepId: "3", role: "Datahubben", action: "Distribuera ESCO", 
          description: "Mätvärden skickas till ESCO om samtycke finns.", 
          refBRS: "BRS-DHV-683", refRule: "BRS683-5" 
        }
      ]
    },
    {
      id: "MPS-DHV-10-Sc2",
      title: "Distribution för utbytespunkt",
      description: "Mätvärden för en utbytespunkt mellan nätområden distribueras till den angränsande nätägaren.",
      diagramCode: `sequenceDiagram
    title MPS-DHV-10-Sc2: Distribution (Utbytespunkt)
    participant DHV as Datahubben
    participant Adj as Angr. Nätägare

    Note over DHV: Trigger: Mätvärden (Utbyte) lagrade
    
    DHV->>Adj: Skicka mätvärden (BRS-DHV-663)`,
      steps: [
        { 
          stepId: "1", role: "System", action: "Trigger", 
          description: "Mätvärden för utbytespunkt validerade.", 
          refBRS: "BRS-DHV-6001", refRule: "BRS6001-5",
          isPrerequisite: true
        },
        { 
          stepId: "2", role: "Datahubben", action: "Distribuera Granne", 
          description: "Mätvärden skickas till angränsande nätägare.", 
          refBRS: "BRS-DHV-663", refRule: "BRS663-5" 
        }
      ]
    }
  ]
};
