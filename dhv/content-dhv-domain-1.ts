
import { InfoObject } from '../types';

// --- BRS-DHV-111: Registrera kundmätpunkt ---
export const contentDhv111Input: InfoObject = {
  title: "Från Nätägare (Grid Owner)",
  attributes: [
    { attribute: "Metering point ID", description: "Unikt ID för mätpunkten (GS1).", article: "M" },
    { attribute: "Metering point status", description: "Status för mätpunkten (ex. Under Construction).", article: "M" },
    { attribute: "Valid from", description: "Datum då registreringen gäller från.", article: "M" },
    { attribute: "Metering grid area ID", description: "ID på nätområdet.", article: "M" },
    { attribute: "Adjacent metering grid area ID", description: "Angränsande nätområde (om relevant).", article: "M" },
    { attribute: "Metering interval", description: "Tidsupplösning (PT15M eller PT1H).", article: "M" },
    { attribute: "Reporting interval", description: "Rapporteringsintervall (Day).", article: "M" },
    { attribute: "Metering point address", description: "Adressuppgifter (Gata, Postnr, Stad).", article: "O" }
  ]
};

export const contentDhv111Output: InfoObject = {
  title: "Till Nätägare",
  attributes: [
    { attribute: "Response", description: "Lyckad registrering eller felmeddelande.", article: "-" }
  ]
};

// --- BRS-DHV-112: Uppdatera kundmätpunkt ---
export const contentDhv112Input: InfoObject = {
  title: "Från Nätägare (Grid Owner)",
  attributes: [
    { attribute: "Metering point ID", description: "Unikt ID för mätpunkten som ska uppdateras.", article: "M" },
    { attribute: "Valid from", description: "Datum då ändringen träder i kraft.", article: "M" },
    { attribute: "Attribut att ändra", description: "T.ex. Nätområde, Mätintervall, Adress, Status.", article: "O" }
  ]
};

export const contentDhv112Output: InfoObject = {
  title: "Till Nätägare",
  attributes: [
    { attribute: "Response", description: "Bekräftelse på uppdatering eller felmeddelande.", article: "-" }
  ]
};

// --- BRS-DHV-113: Avregistrera kundmätpunkt ---
export const contentDhv113Input: InfoObject = {
  title: "Från Nätägare (Grid Owner)",
  attributes: [
    { attribute: "Metering point ID", description: "ID på mätpunkten som ska tas bort/stängas.", article: "M" },
    { attribute: "Valid from", description: "Datum då mätpunkten stängs (Closed).", article: "M" },
    { attribute: "Reason", description: "Orsakskod (t.ex. Raserad, Felregistrering).", article: "O" }
  ]
};

export const contentDhv113Output: InfoObject = {
  title: "Till Nätägare",
  attributes: [
    { attribute: "Response", description: "Bekräftelse på stängning.", article: "-" }
  ]
};

// --- BRS-DHV-114: Begär information om kundmätpunkt ---
export const contentDhv114Input: InfoObject = {
  title: "Från Behörig Part",
  attributes: [
    { attribute: "Metering point ID", description: "Specifikt ID att söka på.", article: "O" },
    { attribute: "Grid Area ID", description: "Sök alla inom ett nätområde.", article: "O" },
    { attribute: "Period", description: "Giltighetsperiod för sökningen.", article: "M" }
  ]
};

export const contentDhv114Output: InfoObject = {
  title: "Till Behörig Part",
  attributes: [
    { attribute: "Master Data", description: "Komplett uppsättning stamdata för mätpunkten.", article: "-" },
    { attribute: "Relationships", description: "Aktiva relationer (Nätägare, Elleverantör, BRP).", article: "-" }
  ]
};

// --- BRS-DHV-120: Registrera utbytespunkt ---
export const contentDhv120Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Metering point ID", description: "Unikt ID för utbytespunkten (GS1).", article: "M" },
    { attribute: "In metering grid area", description: "Nätområde 'Till' (Import).", article: "M" },
    { attribute: "Out metering grid area", description: "Nätområde 'Från' (Export).", article: "M" },
    { attribute: "Metering interval", description: "Upplösning (PT15M/PT1H).", article: "M" },
    { attribute: "Valid from", description: "Startdatum.", article: "M" },
    { attribute: "Product type", description: "Energy Active / Reactive.", article: "M" }
  ]
};

export const contentDhv120Output: InfoObject = {
  title: "Till Nätägare",
  attributes: [
    { attribute: "Response", description: "Lyckad registrering.", article: "-" }
  ]
};

// --- BRS-DHV-121: Uppdatera utbytespunkt ---
export const contentDhv121Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Metering point ID", description: "ID på utbytespunkten.", article: "M" },
    { attribute: "Valid from", description: "Datum för ändring.", article: "M" },
    { attribute: "Changes", description: "Nya värden för attribut (t.ex. kopplade nätområden).", article: "M" }
  ]
};

// --- BRS-DHV-123: Begär info om utbytespunkt ---
export const contentDhv123Output: InfoObject = {
  title: "Till Behörig Part",
  attributes: [
    { attribute: "Exchange Point Data", description: "Stamdata för utbytespunkten.", article: "-" },
    { attribute: "Grid Connection", description: "Vilka nätområden som sammankopplas.", article: "-" }
  ]
};

// --- 500-serien: Updates & Requests ---

// 519: Uppdatera kundmätpunkt
export const contentDhv519Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Metering point ID", description: "ID på mätpunkten.", article: "M" },
    { attribute: "Valid from", description: "Datum för ändring.", article: "M" },
    { attribute: "Changes", description: "Ändrade attribut (t.ex. information om avräkningspunkt).", article: "M" }
  ]
};

// 520: Uppdatera utbytespunkt
export const contentDhv520Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Metering point ID", description: "ID på utbytespunkten.", article: "M" },
    { attribute: "Valid from", description: "Datum för ändring.", article: "M" },
    { attribute: "Changes", description: "Ändrade attribut.", article: "M" }
  ]
};

// 542: Elleverantör begär information
export const contentDhv542Input: InfoObject = {
  title: "Från Elleverantör",
  attributes: [
    { attribute: "Metering point ID", description: "ID på mätpunkten/AP.", article: "M" },
    { attribute: "Period", description: "Tidsintervall.", article: "M" }
  ]
};

// 543: Elleverantör tar emot information
export const contentDhv543Output: InfoObject = {
  title: "Till Elleverantör",
  attributes: [
    { attribute: "Metering point ID", description: "ID på mätpunkten.", article: "M" },
    { attribute: "Master Data", description: "Uppdaterad mätpunktsinformation.", article: "M" },
    { attribute: "Accounting Point Data", description: "Kopplad AP-information.", article: "M" }
  ]
};

// 562 & 564: Nätägare begär information
export const contentDhv562Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Metering point ID", description: "ID på mätpunkten.", article: "M" }
  ]
};

// 565: Angränsande nätägare tar emot information
export const contentDhv565Output: InfoObject = {
  title: "Till Angränsande Nätägare",
  attributes: [
    { attribute: "Exchange Point Data", description: "Uppdaterad information om utbytespunkten.", article: "M" }
  ]
};

// 582: ESCO begär information
export const contentDhv582Input: InfoObject = {
  title: "Från ESCO",
  attributes: [
    { attribute: "Accounting Point ID", description: "ID på avräkningspunkten.", article: "M" }
  ]
};

// 583: ESCO tar emot information
export const contentDhv583Output: InfoObject = {
  title: "Till ESCO",
  attributes: [
    { attribute: "Accounting Point Data", description: "Information om avräkningspunkten.", article: "M" },
    { attribute: "Metering Point Data", description: "Kopplad mätpunktsinformation.", article: "M" }
  ]
};
