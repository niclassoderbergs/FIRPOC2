
import { BRSData } from '../../types';
import { content207Input, content207Output } from '../../content-definitions';

export const brsFlex207: BRSData = {
  id: "BRS-FLEX-207",
  title: "SP häver flexavtal",
  purpose: "Att möjliggöra för en SP att ångra (häva) en registrering av ett flexibilitetsavtal innan startdatumet har infallit (Cancellation/Regret). Detta skiljer sig från terminering då avtalet aldrig blir aktivt.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-207: SP häver flexavtal
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: CancelFlexAgreement (Flexavtals-ID, Hävningsdatum)
    activate FIS
    FIS->>FIS: Validera att Startdatum > Idag
    
    alt Validering OK
        FIS->>FIS: Sätt status 'Cancelled'
        FIS-->>SP: Acknowledgement (Cancelled, Datum)
    else Validering Fel (Startdatum passerat)
        FIS-->>SP: Error (Too late to cancel, use Termination)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX207-1", description: "Ett flexibilitetsavtal har registrerats men ännu inte trätt i kraft (Startdatum är i framtiden)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX207-2", description: "Avtalet har status 'Cancelled' och kommer inte att aktiveras." },
      { id: "BRSFLEX207-3", description: "SP har mottagit bekräftelse på hävningen." }
    ],
    rejected: [
      { id: "BRSFLEX207-4", description: "Hävning nekad (t.ex. för att avtalet redan startat)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX207-5", description: "Hävning får endast ske innan avtalets startdatum har passerat.", errorCode: "E_207_TOO_LATE" },
    { id: "BRSFLEX207-6", description: "Endast registrerad SP för avtalet får begära hävning.", errorCode: "E_207_UNAUTHORIZED" }
  ],
  process: [
    { id: "BRSFLEX207-7", description: "SP begär hävning av ett kommande avtal." },
    { id: "BRSFLEX207-8", description: "FIS validerar datum och makulerar avtalet." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX207-9", description: "Om startdatum passerats måste SP använda processen för avslut (BRS-FLEX-202).", implemented: "Yes" }
  ],
  infoObjects: [content207Input, content207Output]
};
