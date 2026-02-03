
import { BRSData } from '../../../types';
import { contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv260: BRSData = {
  id: "BRS-DHV-260",
  title: "Nätägare tar emot begäran om inflyttning",
  status: "Legacy - Implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Implemented'
    }
  ],
  purpose: "Denna BRS beskriver hur en nätägare tar emot information om en begärd inflyttning. Det används för att informera nätägaren om att en inflyttning har anmälts på en anläggning som är under konstruktion.",
  actors: [
    { role: "Initiator", description: "Datahubben" },
    { role: "Mottagare", description: "Nätägare" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-260: Inflyttning begärd
    participant DHV as Datahubben
    participant GO as Nätägare

    DHV->>GO: Notifiera Inflyttning Begärd
    activate GO
    GO-->>DHV: Ack
    deactivate GO`,
  preConditions: [
    { id: "BRS260-1", description: "En inflyttning har registrerats via BRS-SE-211 med status 'pending under construction'." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS260-2", description: "Datahubben har skickat begäran om inflyttning till nätägaren." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS260-3", description: "En inflyttning registreras på en anläggning under konstruktion." },
    { id: "BRS260-4", description: "Datahubben skickar besked till nätägaren." }
  ],
  infoObjects: [contentDhvGenericOutput]
};
