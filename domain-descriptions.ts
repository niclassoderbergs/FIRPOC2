
export const domainInfo: Record<string, { name: string, description: string }> = {
  '1': {
    name: 'Master data och aggregeringsobjekt',
    description: 'Denna domän hanterar grunddatan för flexibilitetsmarknaden. Här definieras processerna för att registrera tekniska resurser (Controllable Units - CU) och strukturera dem i aggregeringsobjekt. En Service Providing Unit (SPU) används för en enskild resurs (CU), medan en Service Providing Group (SPG) används för att aggregera flera resurser. Utöver skillnaden i antal resurser har objekten samma egenskaper. Domänen säkerställer att alla entiteter har unika identiteter och korrekta relationer. Domänen omfattar även automatiska systemfunktioner där FIS självständigt uppdaterar eller skapar objekt och relationer, exempelvis vid tvingande städning av kopplingar eller administrativa ingrepp.'
  },
  '2': {
    name: 'Avtal & marknad',
    description: 'Hanterar de kommersiella relationerna mellan aktörer och resurser. Fokus ligger på Flexibilitetsavtalet som ger en Service Provider (SP) rätten att handla med en resurs. Domänen täcker leverantörsbyten (switching) och hantering av slutkundens rättigheter, där slutkunden exempelvis kan avsluta ett flexavtal via "Mina sidor" i datahanteringsverktyget (DHV). Vidare hanteras automatiska processer där FIS avslutar avtal när giltiga förutsättningar upphör (t.ex. vid utflytt).'
  },
  '3': {
    name: 'Produkt & förkvalificering',
    description: 'Denna domän centraliserar processerna för att godkänna resurser för marknadsdeltagande (till skillnad från Domän 8 som godkänner företaget). Processen delas in i tre huvudmoment: Administrativ produktkvalificering (granskning av ansökan och dokumentation), Nätförkvalificering (analys av nätpåverkan utförd av DSO), samt Teknisk produktförkvalificering (fysisk verifiering av prestanda mot produktkrav).'
  },
  '4': {
    name: 'Nätbegränsningar',
    description: 'Hanterar processer för Nätägare (DSO) att registrera tillfälliga begränsningar i elnätet (Congestion Management). Informationen distribueras automatiskt till berörda Service Providers (SP). Vidare används dessa begränsningar aktivt vid kontroll av inkomna bud inom Domän 7 för att förhindra att flexibilitet aktiveras i områden där det finns risk för överlast.'
  },
  '5': {
    name: 'Baseline',
    description: 'Denna domän definierar hanteringen av referenskurvor (Baseline). Processen inleds med att TSO (och eventuellt DSO) registrerar godkända beräkningsmetoder. Aktörer kan därefter begära listor över dessa metoder samt hämta detaljerad information. En Service Provider (SP) ansvarar för att koppla en godkänd metod till sin resurs (CU). Domänen hanterar även det operativa flödet där antingen SP registrerar en egenuträknad baseline, eller där FIS utför beräkningen centralt. Även när SP registrerar baseline kan FIS behöva genomföra en egen kontrollberäkning för validering. Slutligen säkerställer domänen att information om både metodval och fastställda baselines distribueras som notifieringar till berörda parter.'
  },
  '6': {
    name: 'Mätvärden',
    description: 'Fokuserar på rapportering, validering och distribution av mätdata. Det primära flödet är att Service Provider (SP) rapporterar mätvärden för sina resurser (CU/Sub-metering), varpå berörda aktörer notifieras och kan begära ut datan. Domänen hanterar även registrering av beräknad aktiverad flexibilitetsvolym. Detta görs av SP om de ansvarar för baseline-beräkningen, annars utförs beräkningen av FIS för kontroll och validering. Slutligen stöds processer för att hämta officiella mätvärden för den överliggande mätpunkten (MP) direkt från Datahub (DHV).'
  },
  '7': {
    name: 'Verifiering & budgivning',
    description: 'Hanterar det operativa marknadsflödet och säkerställer teknisk genomförbarhet. TSO och DSO validerar kapacitets- och energibud mot resursers (CU) tekniska egenskaper och nätbegränsningar innan acceptans. Accepterade bud och aktiveringar registreras, varpå faktiskt utfall beräknas baserat på data från Domän 6. Avvikelser rapporteras tillbaka till aktören. Slutligen allokerar FIS volymerna per Balansansvarig (BRP) för obalansjustering i balansavräkningen, samt per Elleverantör för hantering av ekonomisk kompensation, där berörda parter notifieras.'
  },
  '8': {
    name: 'Aktörsadministration',
    description: 'Hanterar livscykeln för marknadsaktörer (företaget), främst Service Providers. Inkluderar onboarding, finansiell och juridisk kvalificering av företaget, uppdatering av kontaktuppgifter och processer för avregistrering eller suspendering.'
  },
  '9': {
    name: 'Nättariffer',
    description: 'Hanterar administration och distribution av nättariffer i Datahubben (DHV). Nätägare registrerar tariffer och kopplar dem till nätområden. Informationen distribueras till berörda aktörer (Elleverantörer, ESCOs) för att möjliggöra korrekt prissättning och fakturering.'
  }
};
