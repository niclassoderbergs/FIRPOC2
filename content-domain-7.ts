
import { InfoObject } from './types';

// --- BRS-FLEX-701: TSO registrerar balansbud ---
export const content701Input: InfoObject = {
  title: "Från TSO (Balans)",
  attributes: [
    { attribute: "Bud-ID", description: "Unikt ID för budet.", article: "-" },
    { attribute: "Budobjekt-ID", description: "Referens till SPU/SPG.", article: "-" },
    { attribute: "Produkt", description: "T.ex. mFRR Upp.", article: "-" },
    { attribute: "Volym", description: "MW.", article: "-" },
    { attribute: "Pris", description: "EUR/MW.", article: "-" },
    { attribute: "Period", description: "Tidsintervall.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet (t.ex. 15 min, 60 min).", article: "-" }
  ]
};

export const content701Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Status", description: "Mottaget / Validering startad.", article: "-" }
  ]
};

// --- BRS-FLEX-710: SP registrerar Budobjekt ---
export const content710Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID / SPG-ID", description: "Den tekniska resursen. (Mandatory)", article: "-" },
    { attribute: "Marknad/Produkt-ID", description: "Vilken marknad objektet ska säljas på. (Mandatory)", article: "-" }
  ]
};

export const content710Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Budobjekt-ID", description: "ID som används vid budgivning.", article: "-" }
  ]
};

// --- BRS-FLEX-711: TSO registrerar energibud (Aktivering/Avrop) ---
export const content711Input: InfoObject = {
  title: "Från TSO (Energibud)",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Unikt ID för aktiveringen (kan vara samma som Bud-ID).", article: "-" },
    { attribute: "Budobjekt-ID", description: "Referens till SPU/SPG.", article: "-" },
    { attribute: "Marknad", description: "Spot/Reglerkraft.", article: "-" },
    { attribute: "Aktiverad Volym", description: "MW (Faktisk avropad volym).", article: "-" },
    { attribute: "Pris", description: "EUR/MWh (Clearat pris).", article: "-" },
    { attribute: "Period", description: "Tidsintervall för leverans.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet (t.ex. 15 min).", article: "-" }
  ]
};

export const content711Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Status", description: "Registrerad / Validering startad.", article: "-" }
  ]
};

// --- BRS-FLEX-702: DSO registrerar lokalflex bud ---
export const content702Input: InfoObject = {
  title: "Från DSO (Kapacitet)",
  attributes: [
    { attribute: "Bud-ID", description: "Unikt ID.", article: "-" },
    { attribute: "Budobjekt-ID", description: "Referens till resurs.", article: "-" },
    { attribute: "Nätområde", description: "Var flexibiliteten behövs.", article: "-" },
    { attribute: "Volym", description: "MW.", article: "-" },
    { attribute: "Period", description: "Tidsintervall.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet (t.ex. 60 min).", article: "-" }
  ]
};

export const content702Output: InfoObject = {
  title: "Till DSO",
  attributes: [
    { attribute: "Status", description: "Mottaget / Validering startad.", article: "-" }
  ]
};

// --- BRS-FLEX-712: DSO registrerar lokalt energibud ---
export const content712Input: InfoObject = {
  title: "Från DSO (Energibud)",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Unikt ID för aktiveringen.", article: "-" },
    { attribute: "Budobjekt-ID", description: "Referens till resurs.", article: "-" },
    { attribute: "Nätområde", description: "Var energin behövs.", article: "-" },
    { attribute: "Aktiverad Volym", description: "MWh (Faktisk avropad volym).", article: "-" },
    { attribute: "Period", description: "Tidsintervall för leverans.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet (t.ex. 60 min).", article: "-" }
  ]
};

export const content712Output: InfoObject = {
  title: "Till DSO",
  attributes: [
    { attribute: "Status", description: "Registrerad / Validering startad.", article: "-" }
  ]
};

// --- BRS-FLEX-713: NEMO registrerar DA/ID handel (fd 703) ---
export const content713Input: InfoObject = {
  title: "Från NEMO",
  attributes: [
    { attribute: "Bud-ID", description: "Unikt ID.", article: "-" },
    { attribute: "Budobjekt-ID", description: "Referens till resurs.", article: "-" },
    { attribute: "Marknad", description: "Day-Ahead eller Intraday.", article: "-" },
    { attribute: "Volym & Pris", description: "Budkurva eller blockbud.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

export const content713Output: InfoObject = {
  title: "Till NEMO",
  attributes: [
    { attribute: "Status", description: "Mottaget.", article: "-" }
  ]
};

// --- BRS-FLEX-715: Notifiering om verifieringsresultat (TSO) - (FD 721) ---
export const content715Output: InfoObject = {
  title: "Till TSO / Settlement",
  attributes: [
    { attribute: "Verifierings-ID", description: "Referens till resultatet.", article: "-" },
    { attribute: "Aktiverings-ID", description: "Referens till det ursprungliga budet.", article: "-" },
    { attribute: "Status", description: "Verified / Deviation.", article: "-" },
    { attribute: "Avvikelse (MW)", description: "Skillnad mellan bud och leverans.", article: "-" },
    { attribute: "Godkänd Volym", description: "Volym att använda för avräkning.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-716: Notifiering om verifieringsresultat (DSO) - (FD 722) ---
export const content716Output: InfoObject = {
  title: "Till DSO / Settlement",
  attributes: [
    { attribute: "Verifierings-ID", description: "Referens till resultatet.", article: "-" },
    { attribute: "Aktiverings-ID", description: "Referens till det ursprungliga budet.", article: "-" },
    { attribute: "Status", description: "Verified / Deviation.", article: "-" },
    { attribute: "Avvikelse (MW)", description: "Skillnad mellan bud och leverans.", article: "-" },
    { attribute: "Godkänd Volym", description: "Volym att använda för avräkning.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-717: TSO notifieras om energibudskontroll (fd 7150) ---
export const content717Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Referens till energibudet.", article: "-" },
    { attribute: "Status", description: "Valid / Invalid.", article: "-" },
    { attribute: "Verifierad Kapacitet", description: "Tillgänglig kapacitet.", article: "-" },
    { attribute: "Orsak", description: "Vid avslag.", article: "-" }
  ]
};

// --- BRS-FLEX-718: DSO notifieras om energibudskontroll (fd 7160) ---
export const content718Output: InfoObject = {
  title: "Till DSO",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Referens till energibudet.", article: "-" },
    { attribute: "Status", description: "Valid / Invalid.", article: "-" },
    { attribute: "Verifierad Kapacitet", description: "Tillgänglig kapacitet.", article: "-" },
    { attribute: "Orsak", description: "Vid avslag.", article: "-" }
  ]
};

// --- BRS-FLEX-7120: FIS allokerar verifierad volym per BRP ---
export const content7120Input: InfoObject = {
  title: "Internt (Trigger)",
  attributes: [
    { attribute: "Verifierings-ID", description: "Referens till resultatet från 7110.", article: "-" },
    { attribute: "CUs", description: "Lista på CUs och deras fastställda volymer.", article: "-" }
  ]
};

export const content7120Output: InfoObject = {
  title: "Internt (Resultat - BRP)",
  attributes: [
    { attribute: "Allokerings-ID", description: "Unikt ID för beräkningen.", article: "-" },
    { attribute: "BRP-ID", description: "Identifierad Balansansvarig.", article: "-" },
    { attribute: "Allokerad Volym", description: "Volym att reglera för denna BRP (Obalansjustering).", article: "-" },
    { attribute: "Period", description: "Tidsintervall.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-7121: FIS allokerar verifierad volym per Elleverantör ---
export const content7121Input: InfoObject = {
  title: "Internt (Trigger)",
  attributes: [
    { attribute: "Verifierings-ID", description: "Referens till resultatet från 7110.", article: "-" },
    { attribute: "CUs", description: "Lista på CUs och deras fastställda volymer.", article: "-" }
  ]
};

export const content7121Output: InfoObject = {
  title: "Internt (Resultat - Supplier)",
  attributes: [
    { attribute: "Allokerings-ID", description: "Unikt ID för beräkningen.", article: "-" },
    { attribute: "Leverantörs-ID", description: "Identifierad Elleverantör (Supplier).", article: "-" },
    { attribute: "Allokerad Volym", description: "Volym för kompensationsunderlag.", article: "-" },
    { attribute: "Period", description: "Tidsintervall.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-7011: FIS kontrollerar budets kapacitet ---
export const content7011Input: InfoObject = {
  title: "Internt (Trigger)",
  attributes: [
    { attribute: "Källa", description: "BRS-FLEX-701/702.", article: "-" },
    { attribute: "Buddata", description: "Objekt-ID, Volym, Period.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

export const content7011Output: InfoObject = {
  title: "Internt (Resultat)",
  attributes: [
    { attribute: "Status", description: "OK / NOK.", article: "-" },
    { attribute: "Aggregerad Kapacitet", description: "Beräknad tillgänglig volym.", article: "-" }
  ]
};

// --- BRS-FLEX-7111: FIS kontrollerar energibud (Ny) ---
export const content7111Input: InfoObject = {
  title: "Internt (Trigger)",
  attributes: [
    { attribute: "Källa", description: "BRS-FLEX-711/712.", article: "-" },
    { attribute: "Energibud", description: "Objekt-ID, Energi/Volym, Period.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

export const content7111Output: InfoObject = {
  title: "Internt (Resultat)",
  attributes: [
    { attribute: "Status", description: "OK / NOK.", article: "-" },
    { attribute: "Verifierad Kapacitet", description: "Tillgänglig effekt vid budtillfället.", article: "-" }
  ]
};

// --- BRS-FLEX-705: TSO notifieras om budets kapacitet (FD 7012) ---
export const content705Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Bud-ID", description: "Referens till det ursprungliga budet.", article: "-" },
    { attribute: "Status", description: "Valid / Invalid.", article: "-" },
    { attribute: "Budad Volym", description: "Volymen i budet.", article: "-" },
    { attribute: "Verifierad Kapacitet", description: "Maximal tillgänglig kapacitet enligt FIS.", article: "-" },
    { attribute: "Orsak", description: "Vid avslag (t.ex. Nätbegränsning).", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-706: DSO notifieras om budets kapacitet (FD 7012) ---
export const content706Output: InfoObject = {
  title: "Till DSO",
  attributes: [
    { attribute: "Bud-ID", description: "Referens till det ursprungliga budet.", article: "-" },
    { attribute: "Status", description: "Valid / Invalid.", article: "-" },
    { attribute: "Budad Volym", description: "Volymen i budet.", article: "-" },
    { attribute: "Verifierad Kapacitet", description: "Maximal tillgänglig kapacitet enligt FIS.", article: "-" },
    { attribute: "Orsak", description: "Vid avslag (t.ex. Nätbegränsning).", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-7110: FIS verifierar aktiverat energibud ---
export const content7110Input: InfoObject = {
  title: "Internt (Trigger)",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Budet som ska verifieras.", article: "-" },
    { attribute: "Budad Volym", description: "Ursprunglig volym från 711/712/713.", article: "-" },
    { attribute: "Systemdata (6110)", description: "Beräknad volym från systemet.", article: "-" },
    { attribute: "SP-data (611)", description: "Rapporterad volym från SP.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

export const content7110Output: InfoObject = {
  title: "Internt (Resultat)",
  attributes: [
    { attribute: "Verifierings-ID", description: "Unikt ID för resultatet.", article: "-" },
    { attribute: "Aktiverings-ID", description: "Referens till budet.", article: "-" },
    { attribute: "Budad Volym", description: "Den ursprungliga volymen från budet.", article: "-" },
    { attribute: "Status", description: "Verified / Deviation.", article: "-" },
    { attribute: "Diff (System)", description: "Systemberäknad Volym minus Budad Volym.", article: "-" },
    { attribute: "Diff (SP-Check)", description: "SP-Volym (Snitt) minus System-Volym (Snitt).", article: "-" },
    { attribute: "Antal CUs (Total)", description: "Totalt antal CUs i budet.", article: "-" },
    { attribute: "Antal CUs (Rapporterad)", description: "Antal CUs där SP skickat in 611-data.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-7012: Notifiering om budets kapacitet (Generic) ---
export const content7012Output: InfoObject = {
  title: "Till TSO / DSO",
  attributes: [
    { attribute: "Bud-ID", description: "Referens till det ursprungliga budet.", article: "-" },
    { attribute: "Status", description: "Valid / Invalid.", article: "-" },
    { attribute: "Kapacitet", description: "Maximal tillgänglig kapacitet enligt FIS.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-721: TSO notifieras om obalansjustering (Resultat av 7120) ---
export const content721Output: InfoObject = {
  title: "Till TSO (DHV)",
  attributes: [
    { attribute: "Rapport-ID", description: "Unikt ID för nätavräkningsunderlaget.", article: "-" },
    { attribute: "Period", description: "Tidsintervall (settlement period).", article: "-" },
    { attribute: "Obalansdata", description: "Aggregerade volymer per BRP/Mätområde för korrigering av mätvärden.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-722: BRP notifieras om obalansjustering (Resultat av 7120) ---
export const content722Output: InfoObject = {
  title: "Till BRP",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Referens till händelsen.", article: "-" },
    { attribute: "Neutraliseringsvolym", description: "Volym att addera/subtrahera för att återställa baseline (prognoskorrigering).", article: "-" },
    { attribute: "Period", description: "Tidsintervall.", article: "-" },
    { attribute: "Ingående CUs", description: "Vilka resurser som byggt upp volymen.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};

// --- BRS-FLEX-723: Elleverantör notifieras om kompensation (Resultat av 7121) ---
export const content723Output: InfoObject = {
  title: "Till Elleverantör",
  attributes: [
    { attribute: "Aktiverings-ID", description: "Referens till händelsen.", article: "-" },
    { attribute: "Kompensationsvolym", description: "Volym att kompensera (+/- MW).", article: "-" },
    { attribute: "Period", description: "Tidsintervall.", article: "-" },
    { attribute: "Ingående CUs", description: "Vilka resurser som byggt upp volymen.", article: "-" },
    { attribute: "MTU", description: "Marknadstidsenhet.", article: "-" }
  ]
};
