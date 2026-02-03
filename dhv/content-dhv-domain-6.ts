
import { InfoObject } from '../types';

// --- BRS-DHV-611: Registrera mätvärden ---
export const contentDhv611Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Metering point ID", description: "ID på mätpunkten.", article: "M" },
    { attribute: "Transaction ID", description: "Unikt ID för transaktionen.", article: "M" },
    { attribute: "Start time", description: "Starttid för mätperioden.", article: "M" },
    { attribute: "End time", description: "Sluttid för mätperioden.", article: "M" },
    { attribute: "Values", description: "Lista med mätvärden och tidsstämplar.", article: "M" }
  ]
};

export const contentDhv611Output: InfoObject = {
  title: "Till Nätägare",
  attributes: [
    { attribute: "Acknowledgement", description: "Kvittens på mottagande.", article: "-" }
  ]
};

// --- BRS-DHV-612: Kvittens mätvärden ---
export const contentDhv612Output: InfoObject = {
  title: "Till Nätägare",
  attributes: [
    { attribute: "Status", description: "Accepted / Rejected.", article: "M" },
    { attribute: "Error Details", description: "Ev. valideringsfel från BRS-DHV-6001.", article: "C" }
  ]
};

// --- BRS-DHV-617: Begär översikt ---
export const contentDhv617Input: InfoObject = {
  title: "Från Nätägare",
  attributes: [
    { attribute: "Metering Grid Area", description: "Nätområde.", article: "O" },
    { attribute: "Period Start", description: "Startdatum.", article: "M" },
    { attribute: "Period End", description: "Slutdatum.", article: "M" }
  ]
};

export const contentDhv617Output: InfoObject = {
  title: "Till Nätägare",
  attributes: [
    { attribute: "Registration Overview", description: "Statistik över mottagna mätvärden.", article: "M" }
  ]
};

// --- BRS-DHV-642 / 682: Begär prognos ---
export const contentDhvPrognosisInput: InfoObject = {
  title: "Från Aktör (Lev/ESCO)",
  attributes: [
    { attribute: "Accounting Point ID", description: "ID på anläggningen.", article: "M" }
  ]
};

export const contentDhvPrognosisOutput: InfoObject = {
  title: "Till Aktör",
  attributes: [
    { attribute: "Prognosis Values", description: "12 månaders beräknad prognos.", article: "M" }
  ]
};

// --- BRS-DHV-643 / 663 / 683: Distribution av mätvärden ---
export const contentDhvDistributionOutput: InfoObject = {
  title: "Till Mottagare (Lev/Adj.Grid/ESCO)",
  attributes: [
    { attribute: "Accounting Point ID", description: "Anläggnings-ID.", article: "M" },
    { attribute: "Period", description: "Tidsperiod.", article: "M" },
    { attribute: "Values", description: "Mätvärdesserie.", article: "M" },
    { attribute: "Quality", description: "Kvalitet (Measured/Estimated).", article: "M" }
  ]
};

// --- BRS-DHV-644 / 664 / 684: Begär mätvärden ---
export const contentDhvRequestValuesInput: InfoObject = {
  title: "Från Aktör",
  attributes: [
    { attribute: "Accounting Point ID", description: "ID på anläggningen.", article: "M" },
    { attribute: "Period", description: "Önskat tidsintervall.", article: "M" }
  ]
};

export const contentDhvGenericInput: InfoObject = { title: "System", attributes: [{ attribute: "Trigger", description: "Systemhändelse", article: "-" }] };
export const contentDhvGenericOutput: InfoObject = { title: "System", attributes: [{ attribute: "Result", description: "Resultat", article: "-" }] };
