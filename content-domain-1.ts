
import { InfoObject } from './types';

// --- BRS-FLEX-101: SP registrerar en CU ---
export const content101Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Mätpunkt-ID", description: "Referens till anläggningen i DHV. (Mandatory)", article: "Art 2(1)" },
    { attribute: "Resursnamn", description: "Ett beskrivande namn på resursen. (Optional)", article: "-" },
    { attribute: "Teknisk typ", description: "T.ex. Batteri, Last, Solkraft. (Mandatory)", article: "Art 17(1)" },
    { attribute: "Maximal aktiv effekt", description: "Enhetens fysiska kapacitet i kW/MW. (Mandatory)", article: "Art 54(3)" },
    { attribute: "Maximal reaktiv effekt", description: "Förmåga att leverera reaktiv effekt. (Optional)", article: "Art 54(3)" },
    { attribute: "Aktiv tidsperiod", description: "Önskat startdatum för resursen.", article: "-" }
  ]
};

export const content101Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "CU-ID", description: "Systemgenererat unikt ID för resursen.", article: "Art 28(a)" },
    { attribute: "Status", description: "Sätts initialt till 'Under Construction' eller 'Active'.", article: "Art 28(c)" },
    { attribute: "Registreringsdatum", description: "Tidsstämpel för skapandet.", article: "-" },
    { attribute: "Aktiv tidsperiod", description: "Fastställd start för aktiv period.", article: "-" }
  ]
};

// --- BRS-FLEX-102: SP uppdaterar en CU ---
export const content102Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID", description: "ID på enheten som ska uppdateras. (Mandatory)", article: "Art 28(a)" },
    { attribute: "Mätpunkt-ID", description: "Referens till anläggningen (för verifiering). (Mandatory)", article: "-" },
    { attribute: "Giltig från", description: "Datum då ändringen träder i kraft. (Mandatory)", article: "Art 22(1)" },
    { attribute: "Resursnamn", description: "Uppdaterat namn. (Optional)", article: "-" },
    { attribute: "Maximal aktiv effekt", description: "Nytt värde för effekt. (Optional)", article: "-" },
    { attribute: "Status", description: "T.ex. begäran om avregistrering. (Optional)", article: "-" },
    { attribute: "Avregistreringsdatum", description: "Datum då resursen ska tas ur drift (vid avregistrering).", article: "-" }
  ]
};

export const content102Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "CU-ID", description: "ID på enheten.", article: "-" },
    { attribute: "Status", description: "Bekräftelse på ändring.", article: "-" },
    { attribute: "Avregistreringsdatum", description: "Bekräftat datum för avregistrering.", article: "-" }
  ]
};

// --- BRS-FLEX-103: Begär CU-information ---
export const content103Input: InfoObject = {
  title: "Från SP eller SO",
  attributes: [
    { attribute: "CU-ID", description: "Unikt ID för att hämta specifik resurs.", article: "-" },
    { attribute: "Filterkriterier", description: "T.ex. Elområde, Teknisk typ eller Status.", article: "-" }
  ]
};

export const content103Output: InfoObject = {
  title: "Till SP eller SO",
  attributes: [
    { attribute: "CU-ID", description: "Unikt ID.", article: "Art 28(a)" },
    { attribute: "Resursnamn", description: "Namn på resursen.", article: "-" },
    { attribute: "Mätpunkts-ID", description: "Kopplad anläggning.", article: "Art 2(1)" },
    { attribute: "Anläggnings-ID", description: "Unik identifierare för anläggningen (t.ex. GSRN).", article: "-" },
    { attribute: "Tekniska attribut", description: "Max effekt, typ m.m.", article: "Art 54" },
    { attribute: "Status", description: "Aktuell status (Active/Inactive).", article: "-" },
    { attribute: "Ägare", description: "Information om Resource Owner.", article: "-" },
    // Nya attribut för nätstatus
    { attribute: "Nätkvalificeringsstatus", description: "Status för nätförkvalificering (t.ex. Qualified, Conditional, Rejected).", article: "Art 49" },
    { attribute: "Nätkvalificeringsvillkor", description: "Eventuella begränsningar/villkor från DSO (om Conditional).", article: "Art 49(3)" },
    { attribute: "Aktiva Nätbegränsningar", description: "Information om pågående tillfälliga begränsningar (Temporary Limits).", article: "Art 50" },
    // Nya attribut för aggregering
    { attribute: "Kopplad SPU-ID", description: "ID på den aggregeringsenhet (SPU) resursen ingår i (om applicerbart).", article: "-" },
    { attribute: "Kopplad SPG-ID", description: "ID på den portfölj (SPG) resursen ingår i (om applicerbart).", article: "-" },
    // Nya attribut enligt JWG Procedure 1
    { attribute: "Mätkonfiguration", description: "Beskriver hur mätning sker (t.ex. DMD, Smart mätare, Beräknad).", article: "Art 12" },
    { attribute: "Aktiv tidsperiod", description: "Tidsperiod då resursen är aktiv.", article: "-" }
  ]
};

// --- BRS-FLEX-105: FIS stänger tillfälligt av CU ---
export const content104Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "CU-ID", description: "Resursen som ska stängas av.", article: "-" },
    { attribute: "Orsak", description: "Anledning till avstängningen (t.ex. Tekniskt fel, Regelbrott).", article: "-" }
  ]
};

export const content104Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "Ny status (Suspended).", article: "-" },
    { attribute: "Starttid", description: "Tidpunkt då suspenderingen träder i kraft.", article: "-" }
  ]
};

// --- BRS-FLEX-108: Notifiering om suspenderad CU ---
export const content108Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen som stängts av.", article: "-" },
    { attribute: "Status", description: "Ny status (Suspended).", article: "-" },
    { attribute: "Meddelande", description: "Information om orsak till suspendering.", article: "-" },
    { attribute: "Starttid", description: "Tidpunkt då suspenderingen träder i kraft.", article: "-" }
  ]
};

// --- BRS-FLEX-1020 (System): FIS uppdaterar CU (Generell) ---
export const content1040Input: InfoObject = {
  title: "Triggerdata (Internt)",
  attributes: [
    { attribute: "CU-ID", description: "Resursen som påverkas.", article: "-" },
    { attribute: "Händelsetyp", description: "T.ex. 'GridConstraintRegistered' eller 'MeterPointStatusChange'.", article: "-" },
    { attribute: "Nya Attributvärden", description: "T.ex. tillfälligt effekttak eller statusändring.", article: "-" }
  ]
};

export const content1040Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen som uppdaterats.", article: "-" },
    { attribute: "Resursnamn", description: "Namn på resursen.", article: "-" },
    { attribute: "Meddelande", description: "Information om systemuppdatering av CU.", article: "-" },
    { attribute: "Orsak", description: "Referens till bakomliggande händelse (t.ex. Nätbegränsnings-ID).", article: "-" }
  ]
};

// --- BRS-FLEX-107: SP begär återaktivering av CU ---
export const content105Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID", description: "ID på resursen som ska återaktiveras.", article: "-" },
    { attribute: "Kommentar", description: "Beskrivning av hur orsaken till suspendering har åtgärdats.", article: "-" }
  ]
};

export const content105Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Status", description: "Mottaget / Pending Review.", article: "-" }
  ]
};

// --- BRS-FLEX-106: FIS återaktiverar CU ---
export const content106Input: InfoObject = {
  title: "Internt (Admin)",
  attributes: [
    { attribute: "CU-ID", description: "Resurs som ska återaktiveras.", article: "-" },
    { attribute: "Beslut", description: "Referens till godkännande.", article: "-" }
  ]
};

// --- BRS-FLEX-109: SP notifieras om uppdaterad CU (Återaktivering) ---
export const content107Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen som uppdaterats.", article: "-" },
    { attribute: "Status", description: "Ny status (Active).", article: "-" },
    { attribute: "Meddelande", description: "Bekräftelse på återaktivering.", article: "-" },
    { attribute: "Giltig från", description: "Tidpunkt då resursen åter är aktiv.", article: "-" }
  ]
};

// --- BRS-FLEX-110: SP registrerar SPU ---
export const content110Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Namn", description: "Ett läsbart namn för enheten. (Optional)", article: "-" },
    { attribute: "Nätområde-ID", description: "Vilket nätområde SPU:n tillhör. (Mandatory)", article: "Art 2(22)" }
  ]
};

export const content110Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "SPU-ID", description: "Unikt ID för aggregeringsenheten.", article: "Art 27(a)" },
    { attribute: "Namn", description: "Registrerat namn på enheten.", article: "-" },
    { attribute: "Nätområde-ID", description: "Nätområde enheten tillhör.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Available' (väntar på koppling).", article: "-" }
  ]
};

// --- BRS-FLEX-112: SP uppdaterar SPU ---
export const content112Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID", description: "ID på enheten som ska uppdateras.", article: "-" },
    { attribute: "Nytt Namn", description: "Uppdaterat namn.", article: "-" }
  ]
};

export const content112Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "SPU-ID", description: "ID på enheten.", article: "-" },
    { attribute: "Status", description: "Bekräftelse på ändring.", article: "-" }
  ]
};

// --- BRS-FLEX-113: SP avregistrerar SPU ---
export const content113Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID", description: "ID på enheten som ska tas bort.", article: "-" }
  ]
};

export const content113Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "SPU-ID", description: "ID på den borttagna enheten.", article: "-" },
    { attribute: "Status", description: "Terminated.", article: "-" }
  ]
};

// --- BRS-FLEX-114: FIS stänger tillfälligt av SPU ---
export const content114Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPU-ID", description: "Enheten som ska stängas av.", article: "-" },
    { attribute: "Orsak", description: "Anledning till avstängningen.", article: "-" }
  ]
};

export const content114Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "Ny status (Suspended).", article: "-" }
  ]
};

// --- BRS-FLEX-117: Notifiering om avstängd SPU ---
export const content117Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "SPU-ID", description: "Enheten som stängts av.", article: "-" },
    { attribute: "Status", description: "Ny status (Suspended).", article: "-" },
    { attribute: "Meddelande", description: "Information om orsak.", article: "-" }
  ]
};

// --- BRS-FLEX-115: FIS återaktiverar SPU ---
export const content115Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPU-ID", description: "Enheten som ska återaktiveras.", article: "-" }
  ]
};

export const content115Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "Ny status (Active/Available).", article: "-" }
  ]
};

// --- BRS-FLEX-118: Notifiering om återaktiverad SPU (ny) ---
export const content118Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "SPU-ID", description: "Enheten som aktiverats.", article: "-" },
    { attribute: "Status", description: "Ny status (Active/Available).", article: "-" }
  ]
};

// --- BRS-FLEX-116: Begär SPU information ---
export const content116Input: InfoObject = {
  title: "Från Aktör",
  attributes: [
    { attribute: "SPU-ID", description: "ID för att hämta specifik enhet.", article: "-" },
    { attribute: "Filter", description: "Elområde eller status.", article: "-" }
  ]
};

export const content116Output: InfoObject = {
  title: "Till Aktör",
  attributes: [
    { attribute: "SPU-ID", description: "Unikt ID.", article: "-" },
    { attribute: "Namn", description: "Namn på SPU.", article: "-" },
    { attribute: "Status", description: "Status (Active/Suspended m.fl).", article: "-" },
    { attribute: "Aggregerad Kapacitet", description: "Total kapacitet.", article: "-" },
    { attribute: "Antal CU", description: "Antal kopplade resurser.", article: "-" }
  ]
};

// --- BRS-FLEX-120: SP registrerar SPG ---
export const content120Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "Namn", description: "Ett läsbart namn för gruppen. (Optional)", article: "-" },
    { attribute: "Elområde-ID", description: "Vilket elområde gruppen verkar i. (Mandatory)", article: "Art 2(23)" }
  ]
};

export const content120Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "SPG-ID", description: "Unikt ID för gruppen.", article: "Art 27(a)" },
    { attribute: "Namn", description: "Registrerat namn på gruppen.", article: "-" },
    { attribute: "Elområde-ID", description: "Elområde gruppen tillhör.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Available' (väntar på koppling).", article: "-" }
  ]
};

// --- BRS-FLEX-122: SP uppdaterar SPG ---
export const content122Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPG-ID", description: "ID på gruppen som ska uppdateras.", article: "-" },
    { attribute: "Nytt Namn", description: "Uppdaterat namn.", article: "-" }
  ]
};

export const content122Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "SPG-ID", description: "ID på gruppen.", article: "-" },
    { attribute: "Status", description: "Bekräftelse på ändring.", article: "-" }
  ]
};

// --- BRS-FLEX-123: SP avregistrerar SPG ---
export const content123Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPG-ID", description: "ID på gruppen som ska tas bort.", article: "-" }
  ]
};

export const content123Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "SPG-ID", description: "ID på den borttagna gruppen.", article: "-" },
    { attribute: "Status", description: "Terminated.", article: "-" }
  ]
};

// --- BRS-FLEX-124: FIS stänger tillfälligt av SPG ---
export const content124Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPG-ID", description: "Gruppen som ska stängas av.", article: "-" },
    { attribute: "Orsak", description: "Anledning till avstängningen.", article: "-" }
  ]
};

export const content124Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "Ny status (Suspended).", article: "-" }
  ]
};

// --- BRS-FLEX-127: Notifiering om avstängd SPG ---
export const content127Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "SPG-ID", description: "Gruppen som stängts av.", article: "-" },
    { attribute: "Status", description: "Ny status (Suspended).", article: "-" },
    { attribute: "Meddelande", description: "Information om orsak.", article: "-" }
  ]
};

// --- BRS-FLEX-125: FIS återaktiverar SPG ---
export const content125Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPG-ID", description: "Gruppen som ska återaktiveras.", article: "-" }
  ]
};

export const content125Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "Ny status (Active/Available).", article: "-" }
  ]
};

// --- BRS-FLEX-128: Notifiering om återaktiverad SPG (ny) ---
export const content128Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "SPG-ID", description: "Gruppen som aktiverats.", article: "-" },
    { attribute: "Status", description: "Ny status (Active/Available).", article: "-" }
  ]
};

// --- BRS-FLEX-126: Begär SPG information ---
export const content126Input: InfoObject = {
  title: "Från Aktör",
  attributes: [
    { attribute: "SPG-ID", description: "ID för att hämta specifik grupp.", article: "-" },
    { attribute: "Filter", description: "Elområde eller status.", article: "-" }
  ]
};

export const content126Output: InfoObject = {
  title: "Till Aktör",
  attributes: [
    { attribute: "SPG-ID", description: "Unikt ID.", article: "-" },
    { attribute: "Namn", description: "Namn på SPG.", article: "-" },
    { attribute: "Status", description: "Status (Active/Suspended m.fl).", article: "-" },
    { attribute: "Elområde", description: "Kopplat elområde.", article: "-" },
    { attribute: "Aggregerad Kapacitet", description: "Total kapacitet.", article: "-" }
  ]
};

// --- BRS-FLEX-130: SP kopplar CU till SPU ---
export const content130Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID", description: "Målenheten för kopplingen. (Mandatory)", article: "-" },
    { attribute: "CU-ID", description: "En eller lista av flera CU som ska kopplas. (Mandatory)", article: "-" },
    { attribute: "Startdatum", description: "När kopplingen ska gälla ifrån. (Mandatory)", article: "Art 23" }
  ]
};

export const content130Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på operationen.", article: "-" },
    { attribute: "SPU-ID", description: "ID på aggregeringsenheten.", article: "-" },
    { attribute: "CU-ID", description: "ID på kopplad resurs.", article: "-" },
    { attribute: "Startdatum", description: "Datum kopplingen gäller från.", article: "-" },
    { attribute: "Aggregerad Kapacitet", description: "Ny total kapacitet för SPU:n.", article: "Art 54(3)" }
  ]
};

// --- BRS-FLEX-131: SP tar bort CU från SPU ---
export const content131Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPU-ID", description: "Aggregeringsenheten som resursen ska tas bort ifrån. (Mandatory)", article: "-" },
    { attribute: "CU-ID", description: "Resursen som ska kopplas bort. (Mandatory)", article: "-" },
    { attribute: "Slutdatum", description: "Datum då kopplingen upphör. (Mandatory)", article: "-" }
  ]
};

export const content131Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på att bortkoppling utförts.", article: "-" },
    { attribute: "SPU-ID", description: "ID på aggregeringsenheten.", article: "-" },
    { attribute: "CU-ID", description: "ID på bortkopplad resurs.", article: "-" },
    { attribute: "Startdatum", description: "Ursprungligt startdatum för kopplingen.", article: "-" },
    { attribute: "Slutdatum", description: "Registrerat slutdatum för kopplingen.", article: "-" },
    { attribute: "Aggregerad Kapacitet", description: "Uppdaterad total kapacitet för SPU:n efter borttagning.", article: "-" }
  ]
};

// --- BRS-FLEX-1310 (Admin): FIS kopplar CU till SPU ---
export const content133Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPU-ID", description: "Aggregeringsenhet.", article: "-" },
    { attribute: "CU-ID", description: "Resursen som ska kopplas.", article: "-" },
    { attribute: "Orsakskod/Kommentar", description: "Anledning till administrativ åtgärd.", article: "-" }
  ]
};

export const content133Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Meddelande", description: "Information om att resurs kopplats administrativt.", article: "-" },
    { attribute: "Orsak", description: "Angiven anledning.", article: "-" }
  ]
};

// --- BRS-FLEX-1320 (Admin): FIS tar bort CU från SPU ---
export const content132Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPU-ID", description: "Aggregeringsenhet.", article: "-" },
    { attribute: "CU-ID", description: "Resursen som ska tvångsbortkopplas.", article: "-" },
    { attribute: "Orsakskod/Kommentar", description: "Anledning till administrativ åtgärd.", article: "-" }
  ]
};

export const content132Output: InfoObject = {
  title: "Internt Resultat",
  attributes: [
    { attribute: "Status", description: "Resultatkod (OK/Error).", article: "-" }
  ]
};

// --- BRS-FLEX-134: SP notifieras om bortkopplad CU från SPU ---
export const content134Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Meddelande", description: "Info om att CU har kopplats bort från SPU.", article: "-" },
    { attribute: "Orsak", description: "Systemorsak (t.ex. Flytt till SPG eller Avtalsavslut).", article: "-" },
    // Samma attribut som BRS-FLEX-131 Output:
    { attribute: "SPU-ID", description: "ID på den SPU kopplingen togs bort från.", article: "-" },
    { attribute: "CU-ID", description: "ID på den resurs som kopplades bort.", article: "-" },
    { attribute: "Startdatum", description: "Ursprungligt startdatum för kopplingen.", article: "-" },
    { attribute: "Slutdatum", description: "Datum då kopplingen upphör.", article: "-" },
    { attribute: "Aggregerad Kapacitet", description: "Uppdaterad total kapacitet för SPU:n efter borttagning.", article: "-" }
  ]
};

// --- BRS-FLEX-140: SP kopplar CU till SPG ---
export const content140Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPG-ID", description: "Målenheten för kopplingen. (Mandatory)", article: "-" },
    { attribute: "CU-ID", description: "En eller lista av flera CU som ska kopplas. (Mandatory)", article: "-" },
    { attribute: "Startdatum", description: "När kopplingen ska gälla ifrån. (Mandatory)", article: "Art 23" }
  ]
};

export const content140Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på operationen.", article: "-" },
    { attribute: "SPG-ID", description: "ID på portföljen.", article: "-" },
    { attribute: "CU-ID", description: "ID på kopplad resurs.", article: "-" },
    { attribute: "Startdatum", description: "Datum kopplingen gäller från.", article: "-" }
  ]
};

// --- BRS-FLEX-1410 (Admin): FIS kopplar CU till SPG ---
export const content143Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPG-ID", description: "Portfölj.", article: "-" },
    { attribute: "CU-ID", description: "Resurs som ska kopplas.", article: "-" },
    { attribute: "Orsakskod/Kommentar", description: "Anledning till administrativ åtgärd.", article: "-" }
  ]
};

export const content143Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Meddelande", description: "Information om att resurs kopplats administrativt.", article: "-" }
  ]
};

// --- BRS-FLEX-141: SP tar bort CU från SPG ---
export const content141Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "SPG-ID", description: "Portföljen som resursen ska tas bort ifrån. (Mandatory)", article: "-" },
    { attribute: "CU-ID", description: "Resursen som ska kopplas bort. (Mandatory)", article: "-" },
    { attribute: "Slutdatum", description: "Datum då kopplingen upphör. (Mandatory)", article: "-" }
  ]
};

export const content141Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på att bortkoppling utförts.", article: "-" },
    { attribute: "SPG-ID", description: "ID på portföljen.", article: "-" },
    { attribute: "CU-ID", description: "ID på bortkopplad resurs.", article: "-" },
    { attribute: "Startdatum", description: "Ursprungligt startdatum för kopplingen.", article: "-" },
    { attribute: "Slutdatum", description: "Registrerat slutdatum för kopplingen.", article: "-" }
  ]
};

// --- BRS-FLEX-1420 (Admin): FIS tar bort CU från SPG ---
export const content142Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SPG-ID", description: "Portfölj.", article: "-" },
    { attribute: "CU-ID", description: "Resurs som ska tvångsbortkopplas.", article: "-" },
    { attribute: "Orsakskod/Kommentar", description: "Anledning till administrativ åtgärd.", article: "-" }
  ]
};

export const content142Output: InfoObject = {
  title: "Internt Resultat",
  attributes: [
    { attribute: "Status", description: "Resultatkod (OK/Error).", article: "-" }
  ]
};

// --- BRS-FLEX-144: SP notifieras om bortkopplad CU från SPG ---
export const content144Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Meddelande", description: "Info om att CU har kopplats bort från SPG.", article: "-" },
    { attribute: "Orsak", description: "Systemorsak (t.ex. Flytt till SPU eller Avtalsavslut).", article: "-" },
    // Samma attribut som BRS-FLEX-141 Output:
    { attribute: "SPG-ID", description: "ID på den SPG kopplingen togs bort från.", article: "-" },
    { attribute: "CU-ID", description: "ID på den resurs som kopplades bort.", article: "-" },
    { attribute: "Startdatum", description: "Ursprungligt startdatum för kopplingen.", article: "-" },
    { attribute: "Slutdatum", description: "Datum då kopplingen upphör.", article: "-" }
  ]
};

// --- BRS-FLEX-1110 (Admin): FIS registrerar SPU ---
export const content1110Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SP-ID", description: "Aktören som ska äga SPU:n.", article: "-" },
    { attribute: "Namn", description: "Namn på SPU.", article: "-" },
    { attribute: "Elområde-ID", description: "Elområde.", article: "-" },
    { attribute: "Orsakskod/Kommentar", description: "Anledning till administrativ åtgärd.", article: "-" }
  ]
};

export const content1110Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "OK/Fel", article: "-" },
    { attribute: "SPU-ID", description: "Skapat ID", article: "-" }
  ]
};

// --- BRS-FLEX-111: Notifiering om registrerad SPU ---
export const content111Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Meddelande", description: "Information om att SPU skapats administrativt.", article: "-" },
    { attribute: "SPU-ID", description: "Det skapade ID:t.", article: "-" },
    { attribute: "Namn", description: "Namnet.", article: "-" },
    { attribute: "Elområde-ID", description: "Elområdet.", article: "-" }
  ]
};

// --- BRS-FLEX-1210 (Admin): FIS registrerar SPG ---
export const content1210Input: InfoObject = {
  title: "Från FIS (Admin)",
  attributes: [
    { attribute: "SP-ID", description: "Aktören som ska äga SPG:n.", article: "-" },
    { attribute: "Namn", description: "Namn på SPG.", article: "-" },
    { attribute: "Elområde-ID", description: "Elområde.", article: "-" },
    { attribute: "Orsakskod/Kommentar", description: "Anledning till administrativ åtgärd.", article: "-" }
  ]
};

export const content1210Output: InfoObject = {
  title: "Resultat (Internt)",
  attributes: [
    { attribute: "Status", description: "OK/Fel", article: "-" },
    { attribute: "SPG-ID", description: "Skapat ID", article: "-" }
  ]
};

// --- BRS-FLEX-121: Notifiering om registrerad SPG ---
export const content121Output: InfoObject = {
  title: "Notifiering till SP",
  attributes: [
    { attribute: "Meddelande", description: "Information om att SPG skapats administrativt.", article: "-" },
    { attribute: "SPG-ID", description: "Det skapade ID:t.", article: "-" },
    { attribute: "Namn", description: "Namnet.", article: "-" },
    { attribute: "Elområde-ID", description: "Elområdet.", article: "-" }
  ]
};
