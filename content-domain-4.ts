
import { InfoObject } from './types';

// --- BRS-FLEX-401: DSO begär Flexibilitetsresurser i Nätområde ---
export const content401Input: InfoObject = {
  title: "Från Nätägare (DSO)",
  attributes: [
    { attribute: "Nätområdes-ID", description: "ID för det nätområde som förfrågan avser. (Mandatory)", article: "-" }
  ]
};

export const content401Output: InfoObject = {
  title: "Till Nätägare (DSO)",
  attributes: [
    { attribute: "Nätområdes-ID", description: "Det nätområde svaret avser.", article: "-" },
    { attribute: "Mätpunkts-ID", description: "Lista på Anläggnings-ID inom området som har flexibilitetsresurser.", article: "-" }
  ]
};

// --- BRS-FLEX-402: DSO registrerar Nätbegränsning ---
export const content402Input: InfoObject = {
  title: "Från Nätägare (DSO)",
  attributes: [
    { attribute: "Systemelement-ID / Mätpunkts-ID", description: "Var i nätet begränsningen gäller. (Mandatory)", article: "Art 50(1)" },
    { attribute: "Starttid", description: "När nätbegränsningen börjar gälla. (Mandatory)", article: "Art 50(2)" },
    { attribute: "Sluttid", description: "När nätbegränsningen upphör. (Mandatory)", article: "Art 50(2)" },
    { attribute: "Maximal inmatning", description: "Tak för produktion (MW). (Optional)", article: "Art 50(3)" },
    { attribute: "Maximalt uttag", description: "Tak för konsumtion (MW). (Optional)", article: "Art 50(3)" }
  ]
};

export const content402Output: InfoObject = {
  title: "Till Nätägare (DSO)",
  attributes: [
    { attribute: "Nätbegränsnings-ID", description: "Unikt ID för händelsen.", article: "-" },
    { attribute: "Status", description: "Bekräftelse på att begränsning är aktiv.", article: "-" },
    { attribute: "Systemelement-ID / Mätpunkts-ID", description: "Bekräftelse på objektet.", article: "-" },
    { attribute: "Starttid", description: "Registrerad starttid.", article: "-" },
    { attribute: "Sluttid", description: "Registrerad sluttid.", article: "-" },
    { attribute: "Maximal inmatning", description: "Registrerat tak för produktion.", article: "-" },
    { attribute: "Maximalt uttag", description: "Registrerat tak för konsumtion.", article: "-" }
  ]
};

// --- BRS-FLEX-403: SP tar emot notifiering om nätbegränsning ---
export const content403Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "CU-ID", description: "ID på den resurs som påverkas.", article: "-" },
    { attribute: "Mätpunkts-ID", description: "Mätpunkten där begränsningen ligger.", article: "-" },
    { attribute: "Starttid", description: "Begränsningens start.", article: "-" },
    { attribute: "Sluttid", description: "Begränsningens slut.", article: "-" },
    { attribute: "Maximal inmatning", description: "Tak för produktion (MW).", article: "-" },
    { attribute: "Maximalt uttag", description: "Tak för konsumtion (MW).", article: "-" }
  ]
};
