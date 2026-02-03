
export interface ProcedureDef {
  id: number;
  name: string;
  desc: string;
  brs: string[];
}

export const implementationMap: Record<number, string[]> = {
  1: ["BRS-FLEX-104"], // General Access CU
  2: ["BRS-FLEX-101", "BRS-FLEX-322", "BRS-FLEX-323", "BRS-FLEX-324"], // Register CU + Grid PQ implicit
  3: ["BRS-FLEX-102", "BRS-FLEX-1020"], // Update CU
  4: ["BRS-FLEX-102", "BRS-FLEX-1020"], // De-register CU (handled as update status)
  5: ["BRS-FLEX-105", "BRS-FLEX-108"], // Suspend CU + Notification
  6: ["BRS-FLEX-107", "BRS-FLEX-106", "BRS-FLEX-109"], // Re-activate CU
  7: ["BRS-FLEX-801"], // Register SP
  8: ["BRS-FLEX-807"], // Qualify SP
  9: ["BRS-FLEX-208", "BRS-FLEX-209"], // Revoke Contract (Customer)
  10: ["BRS-FLEX-203"], // Terminate Contract (SP)
  11: ["BRS-FLEX-201", "BRS-FLEX-2030", "BRS-FLEX-209"], // Switching
  12: ["BRS-FLEX-207"], // Cancel Contract
  13: ["BRS-FLEX-802"], // Update SP Profile
  14: ["BRS-FLEX-802"], // Update SP Critical
  15: ["BRS-FLEX-803", "BRS-FLEX-1320", "BRS-FLEX-1420", "BRS-FLEX-1330", "BRS-FLEX-1430", "BRS-FLEX-139", "BRS-FLEX-149", "BRS-FLEX-804"], // De-register SP + Cleanup processes
  16: ["BRS-FLEX-815", "BRS-FLEX-819"], // Suspend SP
  17: ["BRS-FLEX-823", "BRS-FLEX-829"], // Revoke SP
  18: ["BRS-FLEX-816", "BRS-FLEX-817"], // Reactivate SP
  19: ["BRS-FLEX-331", "BRS-FLEX-339", "BRS-FLEX-332", "BRS-FLEX-338"], // Grid PQ
  20: ["BRS-FLEX-317", "BRS-FLEX-329", "BRS-FLEX-321", "BRS-FLEX-318", "BRS-FLEX-319", "BRS-FLEX-328", "BRS-FLEX-314"], // Product PQ
  21: ["BRS-FLEX-6110", "BRS-FLEX-7320", "BRS-FLEX-739", "BRS-FLEX-737", "BRS-FLEX-749"], // Verification (Quantification + Verification)
  22: ["BRS-FLEX-111", "BRS-FLEX-121", "BRS-FLEX-1110", "BRS-FLEX-1210", "BRS-FLEX-119", "BRS-FLEX-129"], // Register SPU/SPG
  23: [
      "BRS-FLEX-112", "BRS-FLEX-122", // SP Update name
      "BRS-FLEX-131", "BRS-FLEX-141", // SP Link CU
      "BRS-FLEX-133", "BRS-FLEX-143", // SP Unlink CU
      "BRS-FLEX-1310", "BRS-FLEX-1410", // Admin Link
      "BRS-FLEX-1330", "BRS-FLEX-1430", // Admin Unlink
      "BRS-FLEX-139", "BRS-FLEX-149"  // Notify Unlink
  ], // Update SPU/SPG
  24: ["BRS-FLEX-113", "BRS-FLEX-123"], // De-register SPU/SPG
  25: ["BRS-FLEX-311", "BRS-FLEX-320", "BRS-FLEX-349", "BRS-FLEX-308", "BRS-FLEX-348", "BRS-FLEX-309"], // Product Application
  26: ["BRS-FLEX-115", "BRS-FLEX-125", "BRS-FLEX-118", "BRS-FLEX-128"], // Suspend SPU/SPG
  27: ["BRS-FLEX-116", "BRS-FLEX-126", "BRS-FLEX-117", "BRS-FLEX-127"], // Reactivate SPU/SPG
  28: ["BRS-FLEX-114", "BRS-FLEX-124"], // Access SPU/SPG Data
  29: [
      "BRS-FLEX-701", "BRS-FLEX-709", // TSO Cap
      "BRS-FLEX-711", "BRS-FLEX-719", // DSO Cap
      "BRS-FLEX-731", "BRS-FLEX-738", // TSO Energy
      "BRS-FLEX-741", "BRS-FLEX-748", // DSO Energy
      "BRS-FLEX-751", // NEMO
      "BRS-FLEX-7010", "BRS-FLEX-7111" // System Checks
  ], // Bidding & Activation
  30: ["BRS-FLEX-401", "BRS-FLEX-409", "BRS-FLEX-404"], // Temporary Limits
  31: ["BRS-FLEX-501", "BRS-FLEX-504", "BRS-FLEX-505", "BRS-FLEX-511", "BRS-FLEX-519", "BRS-FLEX-521", "BRS-FLEX-5210", "BRS-FLEX-529"], // Baseline Handling
  32: ["BRS-FLEX-601", "BRS-FLEX-604", "BRS-FLEX-609", "BRS-FLEX-624"], // Metering Data
  33: ["BRS-FLEX-6110", "BRS-FLEX-611", "BRS-FLEX-614", "BRS-FLEX-619"], // Quantification
  34: ["BRS-FLEX-5210"] // Baseline Validation
};

export const procedures: ProcedureDef[] = [
  { 
    id: 1, 
    name: "Generell åtkomst till CU-stamdata", 
    desc: "En berättigad part begär att få hämta masterdata för de styrbara enheter (CU) de har rättighet till.",
    brs: ["BRS-FLEX-104"]
  },
  { 
    id: 2, 
    name: "Registrering av Styrbar Enhet (CU)", 
    desc: "Registreringsansvarig lägger upp en ny CU i systemet (inklusive koppling till mätpunkt).",
    brs: ["BRS-FLEX-101", "BRS-FLEX-322", "BRS-FLEX-323", "BRS-FLEX-324"]
  },
  { 
    id: 3, 
    name: "Uppdatering av CU-information", 
    desc: "Uppdatering av attribut på en befintlig CU (t.ex. teknisk kapacitet).",
    brs: ["BRS-FLEX-102", "BRS-FLEX-1020"]
  },
  { 
    id: 4, 
    name: "Avregistrering av Styrbar Enhet (CU)", 
    desc: "En CU tas bort permanent ur systemet.",
    brs: ["BRS-FLEX-102", "BRS-FLEX-1020"]
  },
  { 
    id: 5, 
    name: "Suspendering av CU (av berättigad part)", 
    desc: "En systemoperatör eller annan part tvingar fram en \"paus\" för en resurs (t.ex. vid tekniska fel).",
    brs: ["BRS-FLEX-105", "BRS-FLEX-108"]
  },
  { 
    id: 6, 
    name: "Återaktivering av Styrbar Enhet (CU)", 
    desc: "En suspenderad CU återaktiveras för att kunna delta på marknaden igen.",
    brs: ["BRS-FLEX-107", "BRS-FLEX-106", "BRS-FLEX-109"]
  },
  { 
    id: 7, 
    name: "Registrering av Tjänsteleverantör (SP)", 
    desc: "En ny SP registrerar sig i systemet för att få åtkomst (skapa konto/identitet).",
    brs: ["BRS-FLEX-801"]
  },
  { 
    id: 8, 
    name: "SP-ansökan om kvalificering", 
    desc: "SP ansöker om att bli godkänd leverantör för en viss produkt eller marknad.",
    brs: ["BRS-FLEX-807"]
  },
  { 
    id: 9, 
    name: "Återkallelse av serviceavtal (av Slutkund)", 
    desc: "Slutkunden avslutar avtalet med sin SP (vilket tar bort SP:ns rätt till CU:n).",
    brs: ["BRS-FLEX-208", "BRS-FLEX-209"]
  },
  { 
    id: 10, 
    name: "Uppsägning av serviceavtal (av SP)", 
    desc: "Tjänsteleverantören avslutar avtalet med slutkunden.",
    brs: ["BRS-FLEX-203"]
  },
  { 
    id: 11, 
    name: "Byte av SP eller nyregistrering på CU", 
    desc: "\"Switching\"-processen. En ny SP tar över en CU från en gammal SP (eller nyteckning).",
    brs: ["BRS-FLEX-201", "BRS-FLEX-2030", "BRS-FLEX-209"]
  },
  { 
    id: 12, 
    name: "Annullering av SP-registrering på CU", 
    desc: "Den nya SP:n eller kunden ångrar bytet/registreringen innan startdatumet har infallit.",
    brs: ["BRS-FLEX-207"]
  },
  { 
    id: 13, 
    name: "Uppdatering av SP-profilinformation", 
    desc: "SP uppdaterar enkel information (adress, kontaktuppgifter) som inte kräver om-kvalificering.",
    brs: ["BRS-FLEX-802"]
  },
  { 
    id: 14, 
    name: "Uppdatering av kritisk SP-information", 
    desc: "SP uppdaterar kritisk data som kan kräva att kvalificeringen prövas på nytt.",
    brs: ["BRS-FLEX-802", "BRS-FLEX-807"]
  },
  { 
    id: 15, 
    name: "Avregistrering av Tjänsteleverantör (SP)", 
    desc: "SP:n lämnar marknaden helt och tas bort ur systemet. Alla resurser kopplas loss.",
    brs: ["BRS-FLEX-803", "BRS-FLEX-1320", "BRS-FLEX-1420", "BRS-FLEX-1330", "BRS-FLEX-1430", "BRS-FLEX-139", "BRS-FLEX-149", "BRS-FLEX-804"]
  },
  { 
    id: 16, 
    name: "Suspendering av SP-kvalificering", 
    desc: "Systemoperatören (TSO/DSO) stänger tillfälligt av en SP (t.ex. pga regelbrott).",
    brs: ["BRS-FLEX-815", "BRS-FLEX-819"]
  },
  { 
    id: 17, 
    name: "Återkallelse av Tjänsteleverantör (Revocation)", 
    desc: "Systemoperatören drar permanent in SP:ns godkännande (tvingande avslut).",
    brs: ["BRS-FLEX-823", "BRS-FLEX-829"]
  },
  { 
    id: 18, 
    name: "Återaktivering av Tjänsteleverantör", 
    desc: "SP får tillbaka sin status som \"Aktiv\" efter en suspendering.",
    brs: ["BRS-FLEX-816", "BRS-FLEX-817"]
  },
  { 
    id: 19, 
    name: "Nät-förkvalificering av SPU eller SPG", 
    desc: "Process för att kontrollera att resursgruppen inte orsakar nätproblem (DSO-koordinering).",
    brs: ["BRS-FLEX-331", "BRS-FLEX-339", "BRS-FLEX-332", "BRS-FLEX-338"]
  },
  { 
    id: 20, 
    name: "Produkt-förkvalificering (SPU/SPG)", 
    desc: "Teknisk test och godkännande av en resursgrupp för en specifik produkt (t.ex. FCR/mFRR).",
    brs: ["BRS-FLEX-317", "BRS-FLEX-329", "BRS-FLEX-321", "BRS-FLEX-318", "BRS-FLEX-319", "BRS-FLEX-328", "BRS-FLEX-314"]
  },
  { 
    id: 21, 
    name: "Produktverifiering (SPU/SPG)", 
    desc: "Verifiering i efterhand (ex-post) att leveransen faktiskt skedde korrekt.",
    brs: ["BRS-FLEX-6110", "BRS-FLEX-7320", "BRS-FLEX-739", "BRS-FLEX-737", "BRS-FLEX-749"]
  },
  { 
    id: 22, 
    name: "Registrering av SPU eller SPG", 
    desc: "SP skapar en ny Providing Unit (Enhet) eller Providing Group (Grupp) i portföljen.",
    brs: ["BRS-FLEX-111", "BRS-FLEX-121", "BRS-FLEX-1110", "BRS-FLEX-1210", "BRS-FLEX-119", "BRS-FLEX-129"]
  },
  { 
    id: 23, 
    name: "Uppdatering av SPU eller SPG", 
    desc: "Ändring av data för en befintlig portfölj/resursgrupp.",
    brs: ["BRS-FLEX-112", "BRS-FLEX-122", "BRS-FLEX-131", "BRS-FLEX-141", "BRS-FLEX-133", "BRS-FLEX-143"]
  },
  { 
    id: 24, 
    name: "Avregistrering av SPU eller SPG", 
    desc: "SP tar bort en portfölj/resursgrupp ur systemet.",
    brs: ["BRS-FLEX-113", "BRS-FLEX-123"]
  },
  { 
    id: 25, 
    name: "Produktansökan för SPU/SPG", 
    desc: "SP ansöker om att få använda en specifik SPU/SPG på en specifik marknad.",
    brs: ["BRS-FLEX-311", "BRS-FLEX-320", "BRS-FLEX-349", "BRS-FLEX-308", "BRS-FLEX-348", "BRS-FLEX-309"]
  },
  { 
    id: 26, 
    name: "Suspendering av SPU eller SPG", 
    desc: "Systemoperatören pausar en specifik resursgrupp (t.ex. pga upprepade felbud).",
    brs: ["BRS-FLEX-115", "BRS-FLEX-125", "BRS-FLEX-118", "BRS-FLEX-128"]
  },
  { 
    id: 27, 
    name: "Återaktivering av SPU eller SPG", 
    desc: "Resursgruppen öppnas upp för handel igen efter suspendering.",
    brs: ["BRS-FLEX-116", "BRS-FLEX-126", "BRS-FLEX-117", "BRS-FLEX-127"]
  },
  { 
    id: 28, 
    name: "Generell åtkomst till SPU/SPG-stamdata", 
    desc: "Berättigad part hämtar teknisk data om en SPU eller SPG.",
    brs: ["BRS-FLEX-114", "BRS-FLEX-124"]
  },
  { 
    id: 29, 
    name: "Budgivning och aktivering", 
    desc: "Processen för att skicka in bud och ta emot aktiveringssignaler (Market dispatch).",
    brs: ["BRS-FLEX-701", "BRS-FLEX-711", "BRS-FLEX-731", "BRS-FLEX-741", "BRS-FLEX-709", "BRS-FLEX-719", "BRS-FLEX-738", "BRS-FLEX-748", "BRS-FLEX-7010", "BRS-FLEX-7111"]
  },
  { 
    id: 30, 
    name: "Tillfälliga begränsningar (Temporary limits)", 
    desc: "Nätägare sätter tillfälliga restriktioner (t.ex. \"Max 0 MW\") pga driftläge i nätet.",
    brs: ["BRS-FLEX-401", "BRS-FLEX-409", "BRS-FLEX-404"]
  },
  { 
    id: 31, 
    name: "Hantering av baslinjedata", 
    desc: "Process för att beräkna och distribuera baslinjen (vad förbrukningen hade varit utan aktivering).",
    brs: ["BRS-FLEX-501", "BRS-FLEX-504", "BRS-FLEX-505", "BRS-FLEX-511", "BRS-FLEX-519", "BRS-FLEX-521", "BRS-FLEX-5210", "BRS-FLEX-529"]
  },
  { 
    id: 32, 
    name: "Tillgängliggörande av mätdata", 
    desc: "Process för att hämta in mätvärden från Datahub, Sub-meters eller beräknad data.",
    brs: ["BRS-FLEX-601", "BRS-FLEX-604", "BRS-FLEX-609", "BRS-FLEX-624"]
  },
  { 
    id: 33, 
    name: "Kvantifiering", 
    desc: "Beräkning av levererad volym (Skillnaden mellan Baslinje och Mätvärde).",
    brs: ["BRS-FLEX-6110", "BRS-FLEX-611", "BRS-FLEX-614", "BRS-FLEX-619"]
  },
  { 
    id: 34, 
    name: "(Valfri) Validering av baslinje", 
    desc: "En extra process för att kontrollera att baslinjen är korrekt beräknad.",
    brs: ["BRS-FLEX-5210"]
  }
];
