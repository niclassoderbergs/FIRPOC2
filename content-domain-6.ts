
import { InfoObject } from './types';

// --- BRS-FLEX-601: Registrera CU-mätvärden (Tidigare 521/514) ---
export const content601Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen mätningen avser.", article: "-" },
    { attribute: "Period", description: "Tidsintervall som mätvärdena avser.", article: "-" },
    { attribute: "Registreringstidpunkt", description: "Tidpunkt då meddelandet skapades/skickades.", article: "-" },
    { attribute: "Mätar-ID", description: "Unikt ID för undermätaren (om annat än huvudmätare).", article: "-" },
    { attribute: "Tidsserie", description: "Lista av mätvärden där varje post innehåller Tidsstämpel och Värde (kW/MW).", article: "-" },
    { attribute: "Kvalitet", description: "Flagga för datakvalitet (Measured/Estimated).", article: "-" }
  ]
};

export const content601Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på lagring.", article: "-" }
  ]
};

// --- BRS-FLEX-602: Begär CU-mätvärden ---
export const content602Input: InfoObject = {
  title: "Från Berättigad Aktör",
  attributes: [
    { attribute: "CU-ID", description: "Resursen att hämta data för.", article: "-" },
    { attribute: "Period", description: "Start- och slutdatum.", article: "-" }
  ]
};

export const content602Output: InfoObject = {
  title: "Till Berättigad Aktör",
  attributes: [
    { attribute: "CU-ID", description: "Resursen.", article: "-" },
    { attribute: "Tidsserie", description: "Efterfrågade mätvärden.", article: "-" }
  ]
};

// --- BRS-FLEX-603: Notifiering om registrerade CU-mätvärden ---
export const content603Output: InfoObject = {
  title: "Till TSO/DSO/Settlement",
  attributes: [
    { attribute: "CU-ID", description: "Resursen.", article: "-" },
    { attribute: "Period", description: "Tidsintervall datan avser.", article: "-" },
    { attribute: "Mätvärdes-tidsserie", description: "Den registrerade mätserien.", article: "-" },
    { attribute: "Källa", description: "Vem som registrerat datan (SP/System).", article: "-" }
  ]
};

// --- BRS-FLEX-611: SP registrerar beräknad aktiverad flexibilitetsvolym för CU ---
export const content611Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Aktiverings-ID / Bud-ID", description: "Referens till den specifika leveransen/avropet.", article: "-" },
    { attribute: "CU-ID", description: "Resursen som utförde leveransen.", article: "-" },
    { attribute: "Period", description: "Tidsintervall som datan täcker (inklusive eventuell rampning).", article: "-" },
    { attribute: "Tidsserie", description: "Högullösta mätvärden för verifiering.", article: "-" }
  ]
};

export const content611Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på mottagen leveransdata.", article: "-" },
    { attribute: "Valideringsstatus", description: "Preliminär status (t.ex. Data Received).", article: "-" }
  ]
};

// --- BRS-FLEX-6110: FIS registrerar beräknad aktiverad flexibilitetsvolym (Admin/System) ---
export const content6110Input: InfoObject = {
  title: "Internt (Admin/System)",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Referens till leveransen.", article: "-" },
    { attribute: "CU-ID", description: "Resursen.", article: "-" },
    { attribute: "Metod", description: "Hur volymen beräknades (t.ex. 'Calculated from Main Meter' eller 'Admin Correction').", article: "-" },
    { attribute: "Tidsserie", description: "Den beräknade leveransvolymen.", article: "-" }
  ]
};

export const content6110Output: InfoObject = {
  title: "Beräknad Volym (Internt)",
  attributes: [
    { attribute: "Meddelande", description: "Info om att leveransvolym registrerats av systemet.", article: "-" },
    { attribute: "Aktiverings-ID", description: "Referens.", article: "-" },
    { attribute: "Volymdata", description: "Summering eller länk till tidsserie.", article: "-" }
  ]
};

// --- BRS-FLEX-612: Begär beräknad aktiverad flexibilitetsvolym för CU ---
export const content612Input: InfoObject = {
  title: "Från SP/Marknad/System",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Unikt ID för leveransen.", article: "-" },
    { attribute: "CU-ID", description: "Resursen (valfritt om Aktiverings-ID är unikt).", article: "-" }
  ]
};

export const content612Output: InfoObject = {
  title: "Till SP/Marknad/System",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Leveransen.", article: "-" },
    { attribute: "Tidsserie", description: "Registrerad volym per tidssteg.", article: "-" },
    { attribute: "Status", description: "Kvalitetsstatus på datan.", article: "-" }
  ]
};

// --- BRS-FLEX-613: Notifiering om beräknad aktiverad flexibilitetsvolym för CU ---
export const content613Output: InfoObject = {
  title: "Till TSO/DSO/Settlement",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Leveransen.", article: "-" },
    { attribute: "CU-ID", description: "Resursen.", article: "-" },
    { attribute: "Volym-tidsserie", description: "Den fastställda leveransvolymen.", article: "-" },
    { attribute: "Källa", description: "SP eller System.", article: "-" }
  ]
};

// --- BRS-FLEX-622: Begär mätpunkts-mätvärden ---
export const content622Input: InfoObject = {
  title: "Från Berättigad Aktör",
  attributes: [
    { attribute: "Mätpunkts-ID", description: "Officiellt ID på anläggningen i DHV.", article: "-" },
    { attribute: "Period", description: "Start- och slutdatum för datat.", article: "-" },
    { attribute: "Upplösning", description: "Önskad upplösning (t.ex. PT15M, PT1H).", article: "-" }
  ]
};

export const content622Output: InfoObject = {
  title: "Till Berättigad Aktör",
  attributes: [
    { attribute: "Mätpunkts-ID", description: "Anläggningen.", article: "-" },
    { attribute: "Tidsserie", description: "Mätvärden hämtade från DHV.", article: "-" },
    { attribute: "Kvalitet", description: "Status på värdena (t.ex. Preliminär, Definitiv).", article: "-" }
  ]
};
