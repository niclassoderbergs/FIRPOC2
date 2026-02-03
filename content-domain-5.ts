
import { InfoObject } from './types';

// --- BRS-FLEX-501: Registrera Baselinemetod (Master Data) ---
export const content501Input: InfoObject = {
  title: "Från TSO",
  attributes: [
    { attribute: "Metodnamn", description: "Officiellt namn på beräkningsmetoden (t.ex. 'X of Y').", article: "-" },
    { attribute: "Beskrivning", description: "Teknisk beskrivning av algoritmen.", article: "-" },
    { attribute: "Metodtyp", description: "Kategori (t.ex. 'Historical', 'Nominated', 'AI/ML').", article: "-" },
    { attribute: "Parametrar", description: "Definition av vilka parametrar som krävs (t.ex. lookback window, adjustment factor).", article: "-" }
  ]
};

export const content501Output: InfoObject = {
  title: "Till Systemet",
  attributes: [
    { attribute: "Metod-ID", description: "Unikt ID för metoden i FIS.", article: "-" }
  ]
};

// --- BRS-FLEX-502: Lista Baselinemetoder ---
export const content502Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Metodtyp", description: "Filtrera på typ (Optional).", article: "-" }
  ]
};

export const content502Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Metod-ID", description: "Unikt ID.", article: "-" },
    { attribute: "Metodnamn", description: "Namn på metoden.", article: "-" }
  ]
};

// --- BRS-FLEX-503: Hämta Baselinemetod Detaljer ---
export const content503Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Metod-ID", description: "ID för metoden att hämta.", article: "-" }
  ]
};

export const content503Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Metod-ID", description: "Unikt ID.", article: "-" },
    { attribute: "Metodnamn", description: "Namn.", article: "-" },
    { attribute: "Beskrivning", description: "Fullständig teknisk beskrivning.", article: "-" },
    { attribute: "Parametrar", description: "Krävda parametrar för konfiguration.", article: "-" }
  ]
};

// --- BRS-FLEX-511: Välj Baselinemetod för CU (Tidigare 501) ---
export const content511Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen konfigurationen gäller.", article: "-" },
    { attribute: "Metod-ID", description: "Vald metod från godkänd lista.", article: "-" },
    { attribute: "Mätkälla", description: "Anger om baseline baseras på Huvudmätare (MP) eller Undermätare (CU).", article: "-" },
    { attribute: "Giltig från", description: "Startdatum för konfigurationen.", article: "-" },
    { attribute: "Specifika Parametrar", description: "Värden för metodens parametrar (om tillämpligt).", article: "-" }
  ]
};

export const content511Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Konfigurations-ID", description: "Referens till inställningen.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Active'.", article: "-" }
  ]
};

// --- BRS-FLEX-512: Notifiering om vald baselinemetod (Tidigare 515) ---
export const content512Output: InfoObject = {
  title: "Till TSO/DSO",
  attributes: [
    { attribute: "CU-ID", description: "Resursen som konfigurerats.", article: "-" },
    { attribute: "Mätpunkts-ID", description: "Kopplad anläggning (Huvudmätare).", article: "-" },
    { attribute: "Metod-ID", description: "Vilken metod som valts.", article: "-" },
    { attribute: "Mätkälla", description: "Anger om baseline baseras på Huvudmätare (MP) eller Undermätare (CU).", article: "-" },
    { attribute: "Giltig från", description: "Startdatum för metodvalet.", article: "-" },
    { attribute: "Konfigurationsparametrar", description: "Valda parametervärden (för replikerbarhet).", article: "-" }
  ]
};

// --- BRS-FLEX-521: Registrera Beräknad Baseline (Tidigare 512) ---
export const content521Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID / Budobjekt-ID", description: "Referens till resurs eller avrop.", article: "-" },
    { attribute: "Tidsperiod", description: "Start och slut för dataserien.", article: "-" },
    { attribute: "Tidsserie", description: "Värden för kontrafaktisk förbrukning/produktion per tidssteg.", article: "-" }
  ]
};

export const content521Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på mottagen data.", article: "-" },
    { attribute: "Valideringsresultat", description: "OK eller felkoder (t.ex. formatfel).", article: "-" }
  ]
};

// --- BRS-FLEX-5210: FIS beräknar baseline för CU (Tidigare 5120) ---
export const content5210Input: InfoObject = {
  title: "Internt (Trigger)",
  attributes: [
    { attribute: "CU-ID", description: "Resursen som ska beräknas.", article: "-" },
    { attribute: "Period", description: "Tidsperiod för beräkningen.", article: "-" }
  ]
};

export const content5210Output: InfoObject = {
  title: "Internt (System)",
  attributes: [
    { attribute: "CU-ID", description: "Resursen beräkningen avser.", article: "-" },
    { attribute: "Period", description: "Tidsperiod för baseline.", article: "-" },
    { attribute: "Baseline-resultat", description: "Genererad tidsserie.", article: "-" },
    { attribute: "Kvalitetsstämpel", description: "Flagga för om data saknades etc.", article: "-" }
  ]
};

// --- BRS-FLEX-522: Notifiering om registrerad baseline (Tidigare 516) ---
export const content522Output: InfoObject = {
  title: "Till TSO/DSO",
  attributes: [
    { attribute: "CU-ID", description: "Resursen.", article: "-" },
    { attribute: "Period", description: "Tidsintervall datan avser.", article: "-" },
    { attribute: "Baseline-tidsserie", description: "Den beräknade/registrerade referenskurvan.", article: "-" },
    { attribute: "Källa", description: "Om datan är 'Calculated by FIS' eller 'Provided by SP'.", article: "-" }
  ]
};
