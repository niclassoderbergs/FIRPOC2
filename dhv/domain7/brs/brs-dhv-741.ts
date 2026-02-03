
import { BRSData } from '../../../types';
import { contentDhv741Input, contentDhv741Output } from '../../content-dhv-domain-7';

export const brsDhv741: BRSData = {
  id: "BRS-DHV-741",
  title: "Elleverantör begär resultat för korrigeringsavräkning",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en elleverantör begär resultat från korrigeringsavräkningen (Correction Settlement) för en specifik period. Detta ligger till grund för fakturarader som skapas i BRS-SE-7020.",
  actors: [
    { role: "Initiator", description: "Elleverantör" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-741: Begär korrigeringsavräkning
    participant Ret as Elleverantör
    participant DHV as Datahubben

    Ret->>DHV: Begär resultat (Period, Område)
    activate DHV
    DHV->>DHV: Validera period och behörighet
    
    alt Godkänd
        DHV-->>Ret: Avräkningsresultat
    else Avslag
        DHV-->>Ret: Felmeddelande
    end
    deactivate DHV`,
  preConditions: [
    { id: "BRS741-1", description: "En elleverantör har begärt resultat för korrigeringsavräkning." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS741-2", description: "Datahubben har svarat med resultat från korrigeringsavräkningen." }
    ],
    rejected: [
      { id: "BRS741-3", description: "Datahubben har svarat med ett felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS741-4", description: "Startdatum måste vara första dagen i en månad.", errorCode: "The requested period start is not at the first day of a month" },
    { id: "BRS741-5", description: "Slutdatum måste vara sista dagen i en månad.", errorCode: "The requested period end is not at the last day of a month" },
    { id: "BRS741-6", description: "Slutdatum måste vara vid föregående månadsskifte eller tidigare.", errorCode: "The requested period end is not at the previous turn of month or earlier" },
    { id: "BRS741-7", description: "Angivet verifierings-ID måste tillhöra elleverantören.", errorCode: "The requested Verification ID does not belong to the requesting retailer" }
  ],
  process: [
    { id: "BRS741-8", description: "Elleverantören begär resultat för korrigeringsavräkning." },
    { id: "BRS741-9", description: "Datahubben svarar med resultatet." },
    { id: "BRS741-10", description: "Exception: Datahubben svarar med felmeddelande." }
  ],
  infoObjects: [contentDhv741Input, contentDhv741Output]
};
