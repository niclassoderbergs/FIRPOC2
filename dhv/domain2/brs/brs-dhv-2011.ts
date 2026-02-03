
import { BRSData } from '../../../types';
import { contentDhvGenericInput, contentDhvGenericOutput } from '../../content-dhv-domain-2';

export const brsDhv2011: BRSData = {
  id: "BRS-DHV-2011",
  title: "Datahubben återställer leverantörsbyte",
  status: "Legacy - Partially implemented",
  history: [
    {
      version: '1.0',
      date: '2026-01-15',
      author: 'EMH-projektet',
      description: 'Legacy - Partially implemented'
    }
  ],
  purpose: "Denna funktion initieras om en utflyttning ångras och ett framtida leverantörsbyte existerade när den ursprungliga utflyttningen exekverades.",
  actors: [
    { role: "Initiator", description: "Datahubben (System)" },
    { role: "Mottagare", description: "System (Internt)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-DHV-2011: Återställ leverantörsbyte
    participant DHV as Datahubben
    participant Sys as System

    DHV->>Sys: Återställ Byte (Trigger)
    activate Sys
    Sys->>Sys: Återställ kontrakt & leverans
    deactivate Sys`,
  preConditions: [
    { id: "BRS2011-1", description: "En utflyttning har ångrats via BRS-SE-224 och den ursprungliga utflytten annullerade ett framtida leverantörsbyte." },
    { id: "BRS2011-2", description: "En utflyttning har ångrats och den ursprungliga utflytten annullerade ett framtida leverantörsbyte." }
  ],
  postConditions: {
    accepted: [
      { id: "BRS2011-6", description: "Datahubben har återställt kundleveransavtalsinformation från det tidigare annullerade leverantörsbytet." },
      { id: "BRS2011-7", description: "Datahubben har återställt leveransinformation från det tidigare annullerade leverantörsbytet." }
    ],
    rejected: []
  },
  businessRules: [],
  process: [
    { id: "BRS2011-10", description: "Systemklockan i datahubben startar processen." }
  ],
  infoObjects: [contentDhvGenericInput, contentDhvGenericOutput]
};
