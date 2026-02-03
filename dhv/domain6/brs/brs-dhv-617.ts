
import { BRSData } from '../../../types';
import { contentDhv617Input, contentDhv617Output } from '../../content-dhv-domain-6';

export const brsDhv617: BRSData = {
  id: "BRS-DHV-617",
  title: "Begär översikt av mätvärdesregistrering",
  status: "Legacy - Not implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Not implemented'
    }
  ],
  purpose: "Ger nätägaren en överblick över hur många mätpunkter de lyckats registrera mätvärden för. Används för att kontrollera att allt är inskickat.",
  actors: [
    { role: "Initiator", description: "Nätägare" },
    { role: "Mottagare", description: "Datahubben" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-617: Begär översikt
    participant GO as Nätägare
    participant DHV as Datahubben

    GO->>DHV: Begär översikt
    DHV-->>GO: Statistik`,
  preConditions: [
    { id: "BRS617-1", description: "Nätägare begär översikt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS617-3", description: "Datahubben returnerar översikten." }
    ],
    rejected: [
      { id: "BRS617-4", description: "Felmeddelande." }
    ]
  },
  businessRules: [
    { id: "BRS617-10b", description: "Nätägaren måste äga nätområdet.", errorCode: "-" },
    { id: "BRS617-10c", description: "Får endast begäras för historiska perioder.", errorCode: "-" }
  ],
  process: [
    { id: "BRS617-15", description: "Nätägaren begär översikt." },
    { id: "BRS617-16", description: "Datahubben svarar." }
  ],
  infoObjects: [contentDhv617Input, contentDhv617Output]
};
