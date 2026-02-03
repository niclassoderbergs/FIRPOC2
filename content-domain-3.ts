
import { InfoObject } from './types';

// Gemensam attributlista för att säkerställa konsistens mellan registrering (301) och detaljläsning (303)
const productAttributes = [
  { attribute: "Produktnamn", description: "Läsbart namn.", article: "Art 39(1)" },
  { attribute: "Systemoperatör", description: "Vem som köper tjänsten (TSO/DSO).", article: "Art 2(13), Art 32" },
  { attribute: "Tillgänglighetsfönster", description: "När tjänsten förväntas finnas tillgänglig (Availability window).", article: "Art 38(1)(a)" },
  { attribute: "Förberedelsetid", description: "Tid från signal till start av rampning (Preparation period).", article: "Art 38(1)(b)" },
  { attribute: "Rampningstid", description: "Tid för att ändra effekt (Ramping period).", article: "Art 38(1)(c)" },
  { attribute: "Full aktiveringstid", description: "Tid till full leverans (Full activation time / FAT).", article: "Art 38(1)(d)" },
  { attribute: "Giltighetsperiod", description: "Tidsspann då produkten är giltig (Validity period).", article: "Art 38(1)(e)" },
  { attribute: "Aktiveringsmetod", description: "T.ex. 'Manuell' eller 'Automatisk' (Mode of activation).", article: "Art 38(1)(f)" },
  { attribute: "Platskrav", description: "Krav på geografisk placering (Location).", article: "Art 38(1)(g)" },
  { attribute: "Min/Max kvantitet", description: "Gränser för budstorlek (Min/Max quantity).", article: "Art 38(1)(h)" },
  { attribute: "Avaktiveringstid", description: "Tid att återgå till normalläge (Deactivation period).", article: "Art 38(1)(i)" },
  { attribute: "Min/Max varaktighet", description: "Krav på uthållighet (Min/Max duration).", article: "Art 38(1)(j)" },
  { attribute: "Återhämtningstid", description: "Tid mellan avslutad leverans och nästa start (Recovery time).", article: "Art 38(1)(k)" },
  { attribute: "Riktning", description: "Upp, Ner eller Symmetrisk (Direction of activation).", article: "Art 38(1)(l)" },
  { attribute: "Delbarhet", description: "Får bud delas upp? (Divisibility).", article: "Art 38(1)(m)" },
  { attribute: "Datautbytesstandard", description: "Vilket protokoll som krävs (Data exchange standards).", article: "Art 38(1)(n)" },
  // Reaktiv effekt (Spänningsreglering)
  { attribute: "Reaktiv: Styrmetod", description: "Endast spänningsreglering: Fjärrstyrd/Lokal (Capability to receive setpoint).", article: "Art 38(2)(a)" },
  { attribute: "Reaktiv: Driftläge", description: "Endast spänningsreglering: (Operating mode).", article: "Art 38(2)(b)" },
  { attribute: "Reaktiv: Referensspänning", description: "Endast spänningsreglering: (Reference voltage).", article: "Art 38(2)(c)" },
  { attribute: "Reaktiv: Lutning (V/Q)", description: "Endast spänningsreglering: (Slope of characteristic).", article: "Art 38(2)(d)" },
  { attribute: "Reaktiv: Svarstid", description: "Endast spänningsreglering: Vid stegändring (Response time).", article: "Art 38(2)(e)" },
  { attribute: "Reaktiv: Börvärdesomfång", description: "Endast spänningsreglering: Omfång/Tolerans (Setpoint range).", article: "Art 38(2)(f-h)" }
];

// --- BRS-FLEX-301: TSO registrerar marknadsprodukt ---
export const content301Input: InfoObject = {
  title: "Från TSO",
  attributes: [
    ...productAttributes
  ]
};

export const content301Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Produkt-ID", description: "Unikt ID för produkten.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Active'.", article: "-" }
  ]
};

// --- BRS-FLEX-302: Lista registrerade marknadsprodukter ---
export const content302Input: InfoObject = {
  title: "Från SP/FIS",
  attributes: [
    { attribute: "Marknadstyp", description: "Filtrering på typ (t.ex. 'Kapacitet'). (Optional)", article: "-" },
    { attribute: "Systemoperatör", description: "Filtrera på köpare (t.ex. SvK). (Optional)", article: "-" }
  ]
};

export const content302Output: InfoObject = {
  title: "Till SP/FIS",
  attributes: [
    { attribute: "Produkt-ID", description: "Unikt ID för produkten.", article: "-" },
    { attribute: "Produktnamn", description: "Läsbart namn.", article: "Art 39(1)" }
  ]
};

// --- BRS-FLEX-303: Begär detaljerad marknadsprodukt information ---
export const content303Input: InfoObject = {
  title: "Från SP/FIS",
  attributes: [
    { attribute: "Produkt-ID", description: "ID på produkten som ska hämtas. (Mandatory)", article: "-" }
  ]
};

export const content303Output: InfoObject = {
  title: "Till SP/FIS",
  attributes: [
    { attribute: "Produkt-ID", description: "Unikt ID för produkten.", article: "-" },
    { attribute: "Status", description: "Aktuell status (t.ex. Active).", article: "-" },
    ...productAttributes // Den detaljerade listan returneras här
  ]
};

// --- BRS-FLEX-305: TSO beslutar om produktansökan (Tidigare Hämta Produktdetaljer) ---
export const content305Input: InfoObject = {
  title: "Från TSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "ID på den aktuella ansökan.", article: "-" },
    { attribute: "Beslut", description: "Approve eller Reject.", article: "-" },
    { attribute: "Motivering", description: "Obligatoriskt vid avslag (Reject).", article: "-" }
  ]
};

export const content305Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på beslutet.", article: "-" },
    { attribute: "Ny Status", description: "Administratively Approved / Rejected.", article: "-" }
  ]
};

// --- BRS-FLEX-306: SP notifieras om produktansökan ---
export const content306Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ansökan.", article: "-" },
    { attribute: "Status", description: "Resultat (Administratively Approved / Rejected).", article: "-" },
    { attribute: "Motivering", description: "Orsak vid avslag.", article: "-" },
    { attribute: "Nästa steg", description: "Instruktion (t.ex. invänta teknisk testplan).", article: "-" }
  ]
};

// --- BRS-FLEX-325: DSO beslutar om produktansökan ---
export const content325Input: InfoObject = {
  title: "Från DSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "ID på den aktuella ansökan.", article: "-" },
    { attribute: "Beslut", description: "Approve eller Reject.", article: "-" },
    { attribute: "Motivering", description: "Obligatoriskt vid avslag (Reject).", article: "-" }
  ]
};

export const content325Output: InfoObject = {
  title: "Till DSO",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på beslutet.", article: "-" },
    { attribute: "Ny Status", description: "Administratively Approved / Rejected.", article: "-" }
  ]
};

// --- BRS-FLEX-311: SP begär Produktförkvalificering ---
export const content311Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID / SPG-ID", description: "Resursen som ska testas. (Mandatory)", article: "Art 18(5)" },
    { attribute: "Produkt-ID", description: "Vilken produkt ansökan gäller. (Mandatory)", article: "Art 16(2)" },
    { attribute: "Maximal budbar effekt", description: "Maximal budbar effekt för den specifika produkten.", article: "-" },
    // Nya fält för CU-detaljer
    { attribute: "Lista av CU", description: "Detaljerad lista över ingående enheter som ingår i ansökan.", article: "-" },
    { attribute: "CU-ID", description: "ID för respektive ingående enhet.", article: "-" },
    { attribute: "Maximal Effekt (per CU)", description: "Den maximala aktiva (P_max) och/eller reaktiva (Q_max) effekten som denna CU kan bidra med för produkten.", article: "-" },
    { attribute: "Indikativt Bidrag (per CU)", description: "Uppskattning av hur mycket denna CU förväntas bidra till gruppens (SPG:s) totala leverans.", article: "-" }
  ]
};

export const content311Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ärendet.", article: "Art 20" },
    { attribute: "SPU-ID / SPG-ID", description: "Referens till resursen.", article: "-" },
    { attribute: "Produkt-ID", description: "Referens till produkten.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Application Received'.", article: "-" }
  ]
};

// --- BRS-FLEX-316: Notifiering till TSO om produktansökan ---
export const content316Output: InfoObject = {
  title: "Notifiering till TSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ansökan.", article: "Art 20" },
    { attribute: "SPU-ID / SPG-ID", description: "Resursen som ansökan avser.", article: "-" },
    { attribute: "Produkt-ID", description: "Produkten som ska kvalificeras.", article: "-" },
    { attribute: "Ansökningsdatum", description: "När ansökan inkom.", article: "-" },
    { attribute: "Länk till ansökan", description: "URL eller referens för att granska detaljer.", article: "-" }
  ]
};

// --- BRS-FLEX-326: Notifiering till DSO om produktansökan ---
export const content326Output: InfoObject = {
  title: "Notifiering till DSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ansökan.", article: "Art 20" },
    { attribute: "SPU-ID / SPG-ID", description: "Resursen som ansökan avser.", article: "-" },
    { attribute: "Produkt-ID", description: "Produkten som ska kvalificeras (lokal produkt).", article: "-" },
    { attribute: "Ansökningsdatum", description: "När ansökan inkom.", article: "-" },
    { attribute: "Länk till ansökan", description: "URL eller referens för att granska detaljer.", article: "-" }
  ]
};

// --- BRS-FLEX-315: TSO initierar produktförkvalificering ---
export const content315Input: InfoObject = {
  title: "Internt (TSO Trigger)",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "ID på ansökan.", article: "-" },
    { attribute: "Handling", description: "Initiera teknisk fas (Start Prequalification).", article: "-" }
  ]
};

// --- BRS-FLEX-330: SP notifieras om påbörjad förkvalificering ---
export const content330Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ansökan.", article: "-" },
    { attribute: "Status", description: "Prequalification Started.", article: "-" },
    { attribute: "Meddelande", description: "Instruktion att inkomma med teknisk testdata.", article: "-" }
  ]
};

// --- BRS-FLEX-317: SP registrerar testdata ---
export const content317Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till pågående process.", article: "-" },
    { attribute: "Tekniska parametrar", description: "Ex. Rampningstid, Uthållighet, Responstid.", article: "-" },
    { attribute: "Testplan", description: "Förslag på tidpunkt för fysiskt test.", article: "-" }
  ]
};

export const content317Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Status", description: "Ready for Activation Test.", article: "-" }
  ]
};

// --- BRS-FLEX-318: TSO genomför aktiveringstest ---
export const content318Input: InfoObject = {
  title: "Från TSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens.", article: "-" },
    { attribute: "Test-ID", description: "Referens till det utförda testet.", article: "-" },
    { attribute: "Testdatum", description: "När testet utfördes.", article: "-" },
    { attribute: "Resultatdata", description: "Loggfiler eller mätdata från testet.", article: "-" }
  ]
};

export const content318Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Status", description: "Test Completed.", article: "-" }
  ]
};

// --- BRS-FLEX-312: TSO rapporterar testresultat ---
export const content312Input: InfoObject = {
  title: "Från TSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ärendet.", article: "-" },
    { attribute: "Slutresultat", description: "Qualified eller Rejected.", article: "-" },
    { attribute: "Giltig till", description: "Slutdatum för kvalificeringen (om godkänd).", article: "-" },
    { attribute: "Kommentar", description: "Motivering eller begränsningar.", article: "-" }
  ]
};

export const content312Output: InfoObject = {
  title: "Till TSO",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på uppdatering.", article: "-" },
    { attribute: "Status", description: "Qualified/Rejected.", article: "-" }
  ]
};

// --- BRS-FLEX-313: Notifiering Produktförkvalificering ---
export const content313Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens.", article: "-" },
    { attribute: "Status", description: "Slutgiltigt besked (Qualified / Rejected).", article: "-" },
    { attribute: "Giltig till", description: "Slutdatum (om godkänd).", article: "-" },
    { attribute: "Kommentar", description: "Eventuell motivering.", article: "-" }
  ]
};

// --- BRS-FLEX-314: Notifiering till TSO om ansökan (Legacy / Test Data) ---
export const content314Output: InfoObject = {
  title: "Notifiering till TSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ansökan.", article: "Art 20" },
    { attribute: "SPU-ID / SPG-ID", description: "Resursen som ansökan avser.", article: "-" },
    { attribute: "Produkt-ID", description: "Produkten som ska kvalificeras.", article: "-" },
    { attribute: "Maximal budbar effekt", description: "Den effekt SP ansöker om.", article: "-" },
    { attribute: "Ingående CUs", description: "Lista på ingående enheter och deras tekniska data (för analys).", article: "-" }
  ]
};

// --- BRS-FLEX-321: SP begär Nätförkvalificering ---
export const content321Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID / CU-ID", description: "Resursen/resurserna som ska nätprövas. (Mandatory)", article: "Art 49(1)" },
    { attribute: "Nätområde-ID", description: "Specifikt nätområde för kvalificering (om känt).", article: "-" }
  ]
};

export const content321Internal: InfoObject = {
  title: "Från FIS till DSO (Internal)",
  attributes: [
    { attribute: "Förfrågans-ID", description: "Unikt ID för nätkollen.", article: "-" },
    { attribute: "Lista av CU", description: "Inkluderar Mätpunkts-ID, Max Effekt, Anslutningspunkt.", article: "Art 49" }
  ]
};

export const content321Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Unikt ID för ärendet.", article: "-" },
    { attribute: "SPU-ID / CU-ID", description: "Bekräftelse på resurs.", article: "-" },
    { attribute: "Produkt-ID", description: "Om specifik produkt angavs.", article: "-" },
    { attribute: "Status", description: "T.ex. 'Pending Grid Check'.", article: "-" }
  ]
};

// --- BRS-FLEX-322: Notifiering till DSO om begäran av Nätförkvalificering (Tidigare 324) ---
export const content322Output: InfoObject = {
  title: "Notifiering till DSO",
  attributes: [
    { attribute: "Kvalificerings-ID", description: "Referens till ärendet.", article: "-" },
    { attribute: "Produkt-ID", description: "Vilken produkt begäran avser (t.ex. mFRR, Lokal Flex).", article: "-" },
    { attribute: "SPU-ID / SPG-ID", description: "ID på den aggregerade resursen som ansökan gäller.", article: "-" },
    { attribute: "Total Max Effekt", description: "Den maximala aktiva och/eller reaktiva effekten för hela SPU:n/SPG:n.", article: "-" },
    { attribute: "Identifiering av enheter", description: "ID för varje ingående Styrbar Enhet (CU), registrerad i CU-modulen. Koppling till mätpunkt ger nätposition.", article: "Art 49" },
    { attribute: "Maximal effekt (per CU)", description: "Den maximala aktiva och/eller reaktiva effekten som är tillgänglig för produkten, per enskild CU.", article: "Art 49" },
    { attribute: "Indikativt bidrag (per CU)", description: "Det indikativa potentiella bidraget från varje enskild CU till leveransen av tjänsten.", article: "Art 49" }
  ]
};

// --- BRS-FLEX-323: DSO uppdaterar Nätförkvalificering (Tidigare 322) ---
export const content323Input: InfoObject = {
  title: "Från DSO",
  attributes: [
    { attribute: "SPU-ID / CU-ID", description: "Resursen nätkollen avser.", article: "-" },
    { attribute: "Produkt-ID", description: "Produkten nätkollen avsåg (om relevant).", article: "-" },
    { attribute: "Status", description: "Approved, Conditionally Approved, eller Rejected.", article: "-" },
    { attribute: "Begränsade Enheter", description: "Lista på specifika CU-IDn som inte godkänns eller har särskilda villkor (om status är Conditional).", article: "Art 49(3)" },
    { attribute: "Villkor", description: "Om villkorat godkännande (t.ex. maxeffekt under vissa tider).", article: "-" }
  ]
};

export const content323Output: InfoObject = {
  title: "Till DSO",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på uppdatering.", article: "-" },
    { attribute: "Förfrågans-ID", description: "Referens till ärendet.", article: "-" },
    { attribute: "SPU-ID / CU-ID", description: "Referens till resursen.", article: "-" },
    { attribute: "Produkt-ID", description: "Referens till produkten.", article: "-" }
  ]
};

// --- BRS-FLEX-324: Notifiering till SP om Nätförkvalificering (Tidigare 323) ---
export const content324Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "SPU-ID / CU-ID", description: "Resursen notifieringen avser.", article: "-" },
    { attribute: "Produkt-ID", description: "Produkten (om relevant).", article: "-" },
    { attribute: "Status", description: "Ny status (Grid Qualified / Conditional / Rejected).", article: "-" },
    { attribute: "Begränsade Enheter", description: "Lista på specifika CU-IDn som inte godkänns eller har särskilda villkor.", article: "-" },
    { attribute: "Villkor", description: "Specifika begränsningar vid Conditional Approval.", article: "-" }
  ]
};
