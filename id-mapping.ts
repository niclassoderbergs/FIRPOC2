
export interface IdMapping {
  newId: string;
  oldId: string;
  title: string;
  type: 'no_change' | 'standard' | 'structure' | 'warning';
}

export const renumberingMap: IdMapping[] = [
  // --- DOMÄN 1: Master Data ---
  { newId: "101", oldId: "101", title: "SP registrerar CU", type: "no_change" },
  { newId: "102", oldId: "102", title: "SP uppdaterar CU", type: "no_change" },
  { newId: "104", oldId: "103", title: "Begär CU-information (Read)", type: "standard" },
  { newId: "105", oldId: "104", title: "FIS stänger tillfälligt av CU", type: "structure" },
  { newId: "106", oldId: "106", title: "FIS återaktiverar CU", type: "no_change" },
  { newId: "107", oldId: "105", title: "SP begär återaktivering av CU", type: "structure" },
  { newId: "108", oldId: "104", title: "Notifiering: CU suspenderad", type: "structure" },
  { newId: "109", oldId: "107", title: "Notifiering: CU uppdaterad/återaktiverad", type: "standard" },
  { newId: "1020", oldId: "1040", title: "System: FIS uppdaterar CU (Trigger)", type: "standard" },
  
  { newId: "111", oldId: "110", title: "SP registrerar SPU", type: "standard" },
  { newId: "112", oldId: "112", title: "SP uppdaterar SPU", type: "no_change" },
  { newId: "113", oldId: "113", title: "SP avregistrerar SPU", type: "no_change" },
  { newId: "114", oldId: "116", title: "Begär SPU information (Read)", type: "standard" },
  { newId: "115", oldId: "114", title: "FIS stänger tillfälligt av SPU", type: "structure" },
  { newId: "116", oldId: "115", title: "FIS återaktiverar SPU", type: "structure" },
  { newId: "117", oldId: "118", title: "Notifiering: SPU återaktiverad", type: "structure" },
  { newId: "118", oldId: "117", title: "Notifiering: SPU avstängd", type: "structure" },
  { newId: "119", oldId: "111", title: "Notifiering: SPU skapad (Admin)", type: "standard" },
  { newId: "1110", oldId: "1110", title: "System: FIS skapar SPU", type: "no_change" },

  { newId: "121", oldId: "120", title: "SP registrerar SPG", type: "standard" },
  { newId: "122", oldId: "122", title: "SP uppdaterar SPG", type: "no_change" },
  { newId: "123", oldId: "123", title: "SP avregistrerar SPG", type: "no_change" },
  { newId: "124", oldId: "126", title: "Begär SPG information (Read)", type: "standard" },
  { newId: "125", oldId: "124", title: "FIS stänger tillfälligt av SPG", type: "structure" },
  { newId: "126", oldId: "125", title: "FIS återaktiverar SPG", type: "structure" },
  { newId: "127", oldId: "128", title: "Notifiering: SPG återaktiverad", type: "structure" },
  { newId: "128", oldId: "127", title: "Notifiering: SPG avstängd", type: "structure" },
  { newId: "129", oldId: "121", title: "Notifiering: SPG skapad (Admin)", type: "standard" },
  { newId: "1210", oldId: "1210", title: "System: FIS skapar SPG", type: "no_change" },

  { newId: "131", oldId: "130", title: "Koppla CU till SPU", type: "standard" },
  { newId: "133", oldId: "131", title: "Ta bort CU från SPU (Unlink)", type: "standard" },
  { newId: "139", oldId: "134", title: "Notifiering: CU bortkopplad från SPU", type: "standard" },
  { newId: "1310", oldId: "1310", title: "System: Koppla CU till SPU", type: "no_change" },
  { newId: "1330", oldId: "1320", title: "System: Ta bort CU från SPU", type: "standard" },

  { newId: "141", oldId: "140", title: "Koppla CU till SPG", type: "standard" },
  { newId: "143", oldId: "141", title: "Ta bort CU från SPG (Unlink)", type: "standard" },
  { newId: "149", oldId: "144", title: "Notifiering: CU bortkopplad från SPG", type: "standard" },
  { newId: "1410", oldId: "1410", title: "System: Koppla CU till SPG", type: "no_change" },
  { newId: "1430", oldId: "1420", title: "System: Ta bort CU från SPG", type: "standard" },

  // --- DOMÄN 2: Avtal ---
  { newId: "201", oldId: "201", title: "Registrera flexavtal", type: "no_change" },
  { newId: "202", oldId: "203", title: "Uppdatera flexavtal", type: "standard" },
  { newId: "203", oldId: "202", title: "Avsluta flexavtal (Terminate)", type: "standard" },
  { newId: "204", oldId: "206", title: "Läs flexavtal (Read)", type: "standard" },
  { newId: "207", oldId: "207", title: "Häv flexavtal (Cancel)", type: "no_change" },
  { newId: "208", oldId: "208", title: "Slutkund avslutar (via DHV)", type: "no_change" },
  { newId: "209", oldId: "205", title: "Notifiering: Avtal avslutat", type: "standard" },
  { newId: "2030", oldId: "2040", title: "System: Avsluta flexavtal (System Terminate)", type: "standard" },

  // --- DOMÄN 3: Produkt & Kvalificering ---
  { newId: "301", oldId: "301", title: "TSO registrerar produkt", type: "no_change" },
  { newId: "304", oldId: "302", title: "Lista produkter (Read)", type: "standard" },
  { newId: "305", oldId: "303", title: "Hämta produktdetaljer (Read)", type: "standard" },
  { newId: "308", oldId: "305", title: "TSO beslutar om ansökan", type: "structure" },
  { newId: "309", oldId: "306", title: "Notifiering: Produktansökan beslut", type: "standard" },
  { newId: "311", oldId: "311", title: "SP ansöker om kvalificering", type: "no_change" },
  { newId: "317", oldId: "315", title: "TSO initierar teknisk fas", type: "warning" },
  { newId: "318", oldId: "318", title: "TSO genomför test", type: "no_change" },
  { newId: "319", oldId: "312", title: "TSO rapporterar resultat", type: "structure" },
  { newId: "320", oldId: "316", title: "Notifiering: TSO om ansökan", type: "structure" },
  { newId: "321", oldId: "317", title: "SP skickar testdata", type: "structure" },
  { newId: "328", oldId: "313", title: "Notifiering: Resultat till SP", type: "structure" },
  { newId: "329", oldId: "330", title: "Notifiering: Teknisk fas startad", type: "standard" },
  
  // Grid PQ (33x)
  { newId: "331", oldId: "321", title: "SP begär nätförkvalificering (Request)", type: "structure" },
  { newId: "332", oldId: "323", title: "DSO svarar nätförkvalificering (Response)", type: "structure" },
  { newId: "338", oldId: "324", title: "Notifiering: Nätförkvalificering resultat", type: "structure" },
  { newId: "339", oldId: "322", title: "Notifiering: DSO om begäran", type: "structure" },
  
  // DSO Product (34x)
  { newId: "348", oldId: "325", title: "DSO beslutar om ansökan", type: "structure" },
  { newId: "349", oldId: "326", title: "Notifiering: DSO om ansökan", type: "structure" },

  // --- DOMÄN 4: Nät ---
  { newId: "401", oldId: "402", title: "Registrera nätbegränsning (Create)", type: "standard" },
  { newId: "404", oldId: "401", title: "Hämta resurser (Read)", type: "standard" },
  { newId: "409", oldId: "403", title: "Notifiering: Nätbegränsning", type: "standard" },

  // --- DOMÄN 5: Baseline ---
  { newId: "501", oldId: "501", title: "Registrera metod", type: "no_change" },
  { newId: "504", oldId: "502", title: "Lista metoder (Read)", type: "standard" },
  { newId: "505", oldId: "503", title: "Hämta metoddetaljer (Read)", type: "standard" },
  { newId: "511", oldId: "511", title: "Konfigurera resurs", type: "no_change" },
  { newId: "519", oldId: "512", title: "Notifiering: Konfiguration vald", type: "standard" },
  { newId: "521", oldId: "521", title: "Rapportera baseline (SP)", type: "no_change" },
  { newId: "529", oldId: "522", title: "Notifiering: Baseline distribuerad", type: "standard" },
  { newId: "5210", oldId: "5210", title: "System: Beräkna baseline", type: "no_change" },

  // --- DOMÄN 6: Mätvärden ---
  { newId: "601", oldId: "601", title: "Rapportera mätvärden (SP)", type: "no_change" },
  { newId: "604", oldId: "602", title: "Hämta mätvärden (Read)", type: "standard" },
  { newId: "609", oldId: "603", title: "Notifiering: Mätvärden", type: "standard" },
  { newId: "611", oldId: "611", title: "Rapportera volym (SP)", type: "no_change" },
  { newId: "614", oldId: "612", title: "Hämta volym (Read)", type: "standard" },
  { newId: "619", oldId: "613", title: "Notifiering: Volym", type: "standard" },
  { newId: "624", oldId: "622", title: "Hämta mätpunktsdata (Read)", type: "standard" },
  { newId: "6110", oldId: "6110", title: "System: Beräkna volym", type: "no_change" },

  // --- DOMÄN 7: Marknad & Verifiering ---
  { newId: "701", oldId: "701", title: "TSO Kapacitetsbud", type: "no_change" },
  { newId: "709", oldId: "705", title: "Notifiering: TSO Kapacitet", type: "standard" },
  { newId: "7010", oldId: "7011", title: "System: Kapacitetskontroll", type: "standard" },

  { newId: "711", oldId: "702", title: "DSO Kapacitetsbud", type: "structure" },
  { newId: "719", oldId: "706", title: "Notifiering: DSO Kapacitet", type: "standard" },

  { newId: "731", oldId: "711", title: "TSO Energibud (Aktivering)", type: "structure" },
  { newId: "738", oldId: "717", title: "Notifiering: TSO Energi Validering", type: "structure" },
  { newId: "737", oldId: "715", title: "Notifiering: TSO Energi Verifiering (Ex-post)", type: "structure" },
  { newId: "739", oldId: "714", title: "Notifiering: SP Energi Verifiering (Ex-post)", type: "structure" },
  { newId: "7310", oldId: "7111", title: "System: Energibudskontroll", type: "structure" },
  { newId: "7320", oldId: "7110", title: "System: Verifiera Aktivering", type: "structure" },

  { newId: "741", oldId: "712", title: "DSO Energibud", type: "structure" },
  { newId: "748", oldId: "718", title: "Notifiering: DSO Energi Validering", type: "structure" },
  { newId: "749", oldId: "716", title: "Notifiering: DSO Energi Verifiering (Ex-post)", type: "structure" },

  { newId: "751", oldId: "713", title: "NEMO Wholesale", type: "structure" },

  { newId: "7610", oldId: "7120", title: "System: Allokering BRP", type: "structure" },
  { newId: "7620", oldId: "7121", title: "System: Allokering Leverantör", type: "structure" },

  { newId: "779", oldId: "721", title: "Notifiering: DHV (Settlement)", type: "standard" },
  { newId: "789", oldId: "722", title: "Notifiering: BRP (Settlement)", type: "standard" },
  { newId: "799", oldId: "723", title: "Notifiering: Leverantör (Settlement)", type: "standard" },

  // --- DOMÄN 8: Aktör ---
  { newId: "801", oldId: "801", title: "Registrering", type: "no_change" },
  { newId: "802", oldId: "803", title: "Uppdatera Profil (Update)", type: "standard" },
  { newId: "803", oldId: "804", title: "Avregistrera (Delete)", type: "standard" },
  { newId: "807", oldId: "802", title: "Ansökan Kvalificering", type: "structure" },
  
  { newId: "815", oldId: "810", title: "Suspendering (Admin)", type: "structure" },
  { newId: "816", oldId: "812", title: "Återaktivering (Admin)", type: "structure" },
  { newId: "817", oldId: "815", title: "Notifiering: Återaktivering", type: "structure" },
  { newId: "819", oldId: "813", title: "Notifiering: Suspendering", type: "standard" },
  
  { newId: "823", oldId: "811", title: "Revocation (Delete Forced)", type: "standard" },
  { newId: "829", oldId: "814", title: "Notifiering: Revocation", type: "standard" },
];
