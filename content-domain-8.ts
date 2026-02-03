
import { InfoObject } from './types';

// --- BRS-FLEX-801: SP registrerar sig ---
export const content801Input: InfoObject = {
  title: "Från SP (Registrering)",
  attributes: [
    { attribute: "Organisationsnummer", description: "Juridisk identitet.", article: "-" },
    { attribute: "Företagsnamn", description: "Officiellt namn.", article: "-" },
    { attribute: "Ediel-ID", description: "Marknadsaktörs-ID (om befintligt).", article: "-" },
    { attribute: "Kontaktuppgifter", description: "E-post, telefon, adress till administrativ kontakt.", article: "-" },
    { attribute: "Roll", description: "Önskad roll (t.ex. Service Provider, BRP).", article: "-" }
  ]
};

export const content801Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "SP-ID", description: "Unikt system-ID för aktören.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Registered' (ej kvalificerad).", article: "-" }
  ]
};

// --- BRS-FLEX-802: SP ansöker om kvalificering ---
export const content802Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SP-ID", description: "Aktörens ID.", article: "-" },
    { attribute: "Kvalificeringstyp", description: "Finansiell, Teknisk eller Balansansvar.", article: "-" },
    { attribute: "Dokumentation", description: "Bifogade filer (PDF/Certifikat).", article: "-" }
  ]
};

export const content802Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Status", description: "Uppdaterad status (t.ex. 'Qualified' eller 'Pending Review').", article: "-" },
    { attribute: "Giltighetsperiod", description: "Om kvalificeringen är tidsbegränsad.", article: "-" }
  ]
};

// --- BRS-FLEX-803: SP uppdaterar profil ---
export const content803Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SP-ID", description: "Identifiering.", article: "-" },
    { attribute: "Fält att ändra", description: "T.ex. Kontaktperson, Telefon, Fakturaadress.", article: "-" },
    { attribute: "Nya värden", description: "De nya uppgifterna.", article: "-" }
  ]
};

export const content803Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Status", description: "Kvittens på uppdatering.", article: "-" }
  ]
};

// --- BRS-FLEX-804: SP avregistrerar sig ---
export const content804Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SP-ID", description: "Aktören som vill avsluta.", article: "-" },
    { attribute: "Önskat Avslutsdatum", description: "När utträdet ska ske.", article: "-" },
    { attribute: "Orsak", description: "Anledning till avregistrering. (Optional)", article: "-" }
  ]
};

export const content804Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Beslut", description: "Godkänt/Nekat (beroende på aktiva åtaganden).", article: "-" },
    { attribute: "Fastställt Avslutsdatum", description: "Datum då kontot stängs.", article: "-" }
  ]
};

// --- BRS-FLEX-810: Tillfällig avstängning ---
export const content810Input: InfoObject = {
  title: "Internt (Admin)",
  attributes: [
    { attribute: "SP-ID", description: "Aktör som ska stängas av.", article: "-" },
    { attribute: "Orsakskod", description: "T.ex. 'Non-compliance', 'Financial Risk'.", article: "-" },
    { attribute: "Startdatum", description: "Omedelbart eller framtida.", article: "-" }
  ]
};

export const content810Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "Ny status (Suspended).", article: "-" }
  ]
};

// --- BRS-FLEX-813: SP notifieras om tillfällig avstängning ---
export const content813Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "SP-ID", description: "Aktören som stängts av.", article: "-" },
    { attribute: "Meddelande", description: "Information om avstängning.", article: "-" },
    { attribute: "Orsak", description: "Anledning till åtgärden.", article: "-" },
    { attribute: "Startdatum", description: "När avstängningen trädde i kraft.", article: "-" },
    { attribute: "Konsekvens", description: "T.ex. 'Handel blockerad'.", article: "-" }
  ]
};

// --- BRS-FLEX-811: Tvingande avregistrering ---
export const content811Input: InfoObject = {
  title: "Internt (Admin)",
  attributes: [
    { attribute: "SP-ID", description: "Aktör som ska avregistreras.", article: "-" },
    { attribute: "Orsak/Laglig grund", description: "Anledning till tvingande avslut.", article: "-" },
    { attribute: "Avslutsdatum", description: "Datum då avregistreringen träder i kraft.", article: "-" }
  ]
};

export const content811Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "Terminated.", article: "-" },
    { attribute: "Avslutsdatum", description: "Verkställt datum.", article: "-" }
  ]
};

// --- BRS-FLEX-814: SP notifieras om permanent avstängning ---
export const content814Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "SP-ID", description: "Aktören som avregistrerats.", article: "-" },
    { attribute: "Meddelande", description: "Beslut om permanent avregistrering (Revocation).", article: "-" },
    { attribute: "Orsak", description: "Laglig grund eller avtalsbrott.", article: "-" },
    { attribute: "Avslutsdatum", description: "Datum då kontot stängdes.", article: "-" }
  ]
};

// --- BRS-FLEX-812: FIS återaktiverar SP ---
export const content812Input: InfoObject = {
  title: "Internt (Admin)",
  attributes: [
    { attribute: "SP-ID", description: "Aktör att återaktivera.", article: "-" },
    { attribute: "Orsak", description: "Referens till administrativt beslut/orsak.", article: "-" },
    { attribute: "Återaktiveringsdatum", description: "Datum för återaktivering.", article: "-" },
    { attribute: "Status", description: "Ny status att sätta.", article: "-" }
  ]
};

export const content812Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "OK (Status uppdaterad).", article: "-" }
  ]
};

// --- BRS-FLEX-815: SP notifieras om återaktivering ---
export const content815Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Status", description: "Ny status (Active).", article: "-" },
    { attribute: "Orsak", description: "Välkommen tillbaka / Restriktioner hävda.", article: "-" },
    { attribute: "Återaktiveringsdatum", description: "Tidpunkt då aktören återaktiveras.", article: "-" }
  ]
};
