
import { BRSData } from '../../types';
import { content723Output } from '../../content-definitions';

export const brsFlex723: BRSData = {
  id: "BRS-FLEX-799", // Updated from 723
  previousId: "BRS-FLEX-723",
  title: "Elleverantör notifieras om kompensation",
  purpose: "Att informera en Elleverantör (Electricity Supplier) om de energivolymer som allokerats till dem för kompensation (eller debitering) till följd av flexibilitetsaktiveringar på deras kunders mätpunkter.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Elleverantör (Supplier)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-799: Notifiering om kompensation (Leverantör)
    participant FIS as FIS
    participant SUP as Elleverantör

    Note over FIS: Trigger: BRS-FLEX-7620 (Klar)
    activate FIS
    loop För varje påverkad Leverantör
        FIS->>FIS: Hämta specifik data
        FIS->>SUP: NotifyCompensationData (Volym, Period, CUs)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX799-1", description: "Allokering av verifierad volym per Elleverantör är slutförd (via BRS-FLEX-7620)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX799-2", description: "Elleverantör har mottagit underlag för kompensation." }
    ],
    rejected: [
      { id: "BRSFLEX799-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX799-4", description: "Leverantören ska endast se data för sina egna kunder (mätpunkter) av integritetsskäl.", errorCode: "E_799_DATA_PRIVACY" },
    { id: "BRSFLEX799-5", description: "Kompensationsvolymen måste vara verifierad och slutgiltig.", errorCode: "E_799_DATA_NOT_FINAL" }
  ],
  process: [
    { id: "BRSFLEX799-6", description: "FIS skickar underlag för ekonomisk kompensation." },
    { id: "BRSFLEX799-7", description: "Elleverantör tar emot informationen." }
  ],
  infoObjects: [content723Output]
};
