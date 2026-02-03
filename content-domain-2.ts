
import { InfoObject } from './types';

// --- BRS-FLEX-201: SP registrerar Flexavtal ---
export const content201Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen avtalet gäller.", article: "Art 53(5)" },
    { attribute: "Startdatum", description: "Flexibilitetsavtalets startdatum.", article: "Art 28(a)" },
    { attribute: "Kund-ID", description: "Identifiering av slutkunden (t.ex. personnummer eller organisationsnummer).", article: "-" }
  ]
};

export const content201Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "Unikt ID för flexibilitetsavtalet.", article: "-" },
    { attribute: "CU-ID", description: "ID för den kopplade resursen.", article: "-" },
    { attribute: "Startdatum", description: "Startdatum för avtalet.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Active' eller 'Pending'.", article: "-" },
    { attribute: "Kund-ID", description: "Registrerad kund på avtalet.", article: "-" }
  ]
};

// --- BRS-FLEX-202: SP avslutar Flexavtal ---
export const content202Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID på avtalet som ska avslutas. (Mandatory)", article: "-" },
    { attribute: "CU-ID", description: "ID på resursen som avtalet gäller (för verifiering). (Mandatory)", article: "-" },
    { attribute: "Slutdatum", description: "Datum då avtalet ska upphöra att gälla. (Mandatory)", article: "-" },
    { attribute: "Orsak", description: "Valfri beskrivning av orsak (t.ex. 'Kundens begäran'). (Optional)", article: "-" }
  ]
};

export const content202Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID på det avslutade avtalet.", article: "-" },
    { attribute: "CU-ID", description: "Resursen som avtalet gällde.", article: "-" },
    { attribute: "Status", description: "Ny status (t.ex. 'Terminated' eller 'Inactive').", article: "-" },
    { attribute: "Registrerat Slutdatum", description: "Bekräftat slutdatum.", article: "-" },
    { attribute: "Ursprungligt Startdatum", description: "Datum då avtalet började gälla.", article: "-" }
  ]
};

// --- BRS-FLEX-203: SP uppdaterar Flexavtal ---
export const content203Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID på avtalet som ska uppdateras. (Mandatory)", article: "-" },
    { attribute: "Nytt Slutdatum", description: "Förlängning eller förkortning av avtalstiden. (Optional)", article: "-" }
  ]
};

export const content203Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID på avtalet.", article: "-" },
    { attribute: "Uppdaterade Attribut", description: "Lista på fält som ändrats.", article: "-" }
  ]
};

// --- BRS-FLEX-2040 (Admin): FIS avslutar Flexavtal ---
export const content204Input: InfoObject = {
  title: "Trigger (Systemhändelse)",
  attributes: [
    { attribute: "CU-ID", description: "Resursen där avtalet ska avslutas.", article: "-" },
    { attribute: "Händelsetyp", description: "T.ex. 'Leverantörsbyte' eller 'Utflytt'.", article: "-" },
    { attribute: "Slutdatum", description: "Datum då avtalet upphör.", article: "-" }
  ]
};

export const content204Output: InfoObject = {
  title: "Internt",
  attributes: [
    { attribute: "Resultat", description: "Statuskod för operationen (t.ex. 'Terminated').", article: "-" }
  ]
};

// --- BRS-FLEX-205: SP notifieras om avslutat flexavtal (Notification) ---
export const content205Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID på avtalet som avslutats.", article: "-" },
    { attribute: "CU-ID", description: "Identifierare för den berörda resursen.", article: "-" },
    { attribute: "Slutdatum", description: "Sista giltighetsdag för avtalet.", article: "-" },
    { attribute: "Orsak", description: "Anledning (t.ex. 'Customer Move-out' eller 'Switch').", article: "-" }
  ]
};

// --- BRS-FLEX-206: SP begär Flexavtalsinformation ---
export const content206Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID för det specifika avtalet som efterfrågas.", article: "-" },
    { attribute: "CU-ID", description: "Alternativt: Filtrera avtal per resurs.", article: "-" }
  ]
};

export const content206Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "Unikt ID.", article: "-" },
    { attribute: "CU-ID", description: "Kopplad resurs.", article: "Art 53(5)" },
    { attribute: "Startdatum", description: "Avtalets startdatum.", article: "Art 22" },
    { attribute: "Slutdatum", description: "Avtalets slutdatum (om satt).", article: "Art 22" },
    { attribute: "Status", description: "Active/Inactive/Terminated.", article: "-" }
  ]
};

// --- BRS-FLEX-207: SP häver flexavtal ---
export const content207Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID på avtalet som ska hävas (makuleras). (Mandatory)", article: "-" },
    { attribute: "CU-ID", description: "ID på resursen (för verifiering).", article: "-" },
    { attribute: "Hävningsdatum", description: "Datum då hävningen begärs (normalt dagens datum).", article: "-" },
    { attribute: "Orsak", description: "Anledning till hävningen (t.ex. 'Felaktig registrering'). (Optional)", article: "-" }
  ]
};

export const content207Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Flexibilitetsavtals-ID", description: "ID på det hävda avtalet.", article: "-" },
    { attribute: "Status", description: "Ny status (Cancelled).", article: "-" },
    { attribute: "Registrerat Hävningsdatum", description: "Tidsstämpel för när hävningen registrerades.", article: "-" }
  ]
};

// --- BRS-FLEX-208: Slutkund avslutar flexavtal (via DHV) ---
export const content208Input: InfoObject = {
  title: "Från DHV",
  attributes: [
    { attribute: "Anläggnings-ID", description: "Anläggningen där avtalet finns.", article: "-" },
    { attribute: "Kund-ID", description: "Verifiering av kundens identitet (SSN/OrgNr).", article: "-" },
    { attribute: "Slutdatum", description: "Önskat datum för avslut.", article: "-" },
    { attribute: "Händelse", description: "CustomerTermination (Avslut via Mina Sidor).", article: "-" }
  ]
};

export const content208Output: InfoObject = {
  title: "Svar till DHV",
  attributes: [
    { attribute: "Status", description: "OK/Error", article: "-" }
  ]
};

// --- BRS-FLEX-210: SP registrerar Budobjekt ---
export const content210Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID / SPG-ID", description: "Den tekniska resursen. (Mandatory)", article: "Art 35(5)" },
    { attribute: "Marknad/Produkt-ID", description: "Vilken marknad objektet ska säljas på (t.ex. mFRR). (Mandatory)", article: "Art 38" }
  ]
};

export const content210Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Budobjekt-ID", description: "ID som används vid budgivning.", article: "Art 32(3)" }
  ]
};
