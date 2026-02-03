
import { MPSData } from '../../types';

export const mpsFlex01: MPSData = {
  id: "MPS-FLEX-01",
  title: "Onboarding av flexibilitetsresurs",
  domain: "Domän 1: Master Data",
  trigger: "SP vill ansluta ny resurs",
  purpose: "Detta scenario beskriver hela flödet för att registrera en teknisk resurs och göra den redo för marknaden (aggregering). Processen täcker skapandet av SPU/SPG, registrering av CU samt kopplingen dem emellan.",
  actors: [
    { role: "SP", description: "Service Provider (Aggregator)" },
    { role: "FIS", description: "Flexibilitetsregistret" }
  ],
  diagramCode: `flowchart TD
    Start((Start)) --> SPU[Registrera SPU\nBRS-FLEX-111]
    Start --> SPG[Registrera SPG\nBRS-FLEX-121]
    SPU --> CU[Registrera CU\nBRS-FLEX-101]
    SPG --> CU
    CU --> LinkSPU[Koppla CU till SPU\nBRS-FLEX-131]
    LinkSPU --> LinkSPG[Koppla CU till SPG\nBRS-FLEX-141]
    LinkSPG --> Done((Klar))`,
  scenarios: [
    {
      id: "MPS-FLEX-01-Sc1",
      title: "Scenario 1: Etablering av ny portfölj och resurs",
      description: "En SP bygger upp en ny struktur från grunden.",
      steps: [
        {
          stepId: "MPS-FLEX-01-Sc1.1",
          role: "SP",
          action: "Registrera SPU",
          description: "SP registrerar en ny Service Providing Unit (SPU) för att gruppera resurser tekniskt.",
          refBRS: "BRS-FLEX-111"
        },
        {
          stepId: "MPS-FLEX-01-Sc1.2",
          role: "SP",
          action: "Registrera SPG",
          description: "SP registrerar en ny Service Providing Group (SPG) för att hantera budgivning i ett elområde.",
          refBRS: "BRS-FLEX-121"
        },
        {
          stepId: "MPS-FLEX-01-Sc1.3",
          role: "SP",
          action: "Registrera CU",
          description: "SP registrerar den fysiska resursen (Controllable Unit) med referens till Mätpunkten.",
          refBRS: "BRS-FLEX-101"
        },
        {
          stepId: "MPS-FLEX-01-Sc1.4",
          role: "SP",
          action: "Koppla CU till SPU",
          description: "SP kopplar den nya CU:n till sin SPU.",
          refBRS: "BRS-FLEX-131"
        },
        {
          stepId: "MPS-FLEX-01-Sc1.5",
          role: "SP",
          action: "Koppla CU till SPG",
          description: "SP kopplar den nya CU:n till sin SPG. Nu är resursen redo för förkvalificering.",
          refBRS: "BRS-FLEX-141"
        }
      ]
    }
  ]
};
