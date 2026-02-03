import React from 'react';
import { Check, AlertTriangle, X, Target, Info } from 'lucide-react';
import { styles } from './styles';

export const GoalFulfillmentSection: React.FC = () => {
  const statusIcon = (level: 'full' | 'partial' | 'none', tooltip: string) => {
    const iconStyle = { display: 'inline-flex', cursor: 'help', verticalAlign: 'middle' };
    switch (level) {
      case 'full': 
        return <div title={tooltip} style={iconStyle}><Check size={20} color="#36b37e" /></div>;
      case 'partial': 
        return <div title={tooltip} style={iconStyle}><AlertTriangle size={20} color="#ffab00" /></div>;
      case 'none': 
        return <div title={tooltip} style={iconStyle}><X size={20} color="#ff5630" /></div>;
    }
  };

  const areaHeaderStyle = {
    backgroundColor: '#f1f5f9',
    fontWeight: 800,
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    color: '#475569',
    letterSpacing: '0.05em',
    padding: '8px 16px'
  };

  const navLinkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    borderBottom: '1px dotted #0052cc'
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>
        <Target size={28} color="#0052cc" /> 
        Måluppfyllnad per alternativ
      </h2>
      <p style={styles.paragraph}>
        Nedanstående matris analyserar hur de olika arkitekturvalen adresserar de specifika behoven. Klicka på länkarna i första kolumnen för att hoppa till detaljbeskrivningen.
      </p>

      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <table style={{ ...styles.table, marginBottom: 0 }}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '40%' }}>Behovsområde & Exempel</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Alt 0<br/><span style={{ fontWeight: 400, fontSize: '0.7rem' }}>Status Quo</span></th>
              <th style={{ ...styles.th, textAlign: 'center', backgroundColor: '#e3fcef' }}>Alt 1<br/><span style={{ fontWeight: 400, fontSize: '0.7rem' }}>Centralt</span></th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Alt 2<br/><span style={{ fontWeight: 400, fontSize: '0.7rem' }}>Växel</span></th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Alt 3<br/><span style={{ fontWeight: 400, fontSize: '0.7rem' }}>Hybrid</span></th>
            </tr>
          </thead>
          <tbody>
            {/* REGULATORISKA BEHOV */}
            <tr><td colSpan={5} style={areaHeaderStyle}>Regulatoriska behov</td></tr>
            <tr>
              <td style={styles.td}>
                <a href="#RB1" style={navLinkStyle}><strong>RB1: Elmarknadsdirektivet</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Begränsat stöd via decentraliserade anpassningar.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Etablerar det moderna ramverk för datautbyte som direktivet kräver.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver att 170 parters IT-system är tillgängliga, vilket förutsätter lokal organisation hos varje part.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Splittrad arkitektur kräver dubbla IT-system och organisationer för efterlevnad.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#RB2" style={navLinkStyle}><strong>RB2: Interoperabilitet</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Redan infört via 170 lokala lösningar till enorm samhällskostnad och förändringsrisk.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Framtida lagändringar implementeras en gång centralt. Eliminerar framtida redundanta projekt.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Växeln standardiserar anropet men kräver 170 tillgängliga IT-system och organisationer.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Samma beroende av 170 lokala IT-system och deras organisationer vid lagändringar.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#RB3" style={navLinkStyle}><strong>RB3: Leverantörsbyten (24h)</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Manuella processer gör 24h-byten omöjliga i praktiken.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Central realtidsvalidering möjliggör byten på 24h nationellt.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver 100% tillgänglighet i 170 parters IT-system dygnet runt, vilket kräver permanent organisation.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Beroende av lokala IT-system och beredskapsorganisation för retail-delen dygnet runt.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#RB4" style={navLinkStyle}><strong>RB4: Efterfrågeflexibilitet (NC DR)</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Direkt brott mot förordningens krav på nationellt register.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Skapar ett komplett, lagstadgat register enligt alla artiklar i NC DR.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'En växel saknar lagringsförmåga och vilar på 170 externa IT-system och organisationer.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('full', 'Register skapas centralt för flex-delen, men kräver ändå komplexa IT-stöd från parternas organisationer.')}</td>
            </tr>

            {/* EFFEKTIV ELMARKNAD */}
            <tr><td colSpan={5} style={areaHeaderStyle}>Effektiv elmarknad</td></tr>
            <tr>
              <td style={styles.td}>
                <a href="#ME1" style={navLinkStyle}><strong>ME1: Snabba leverantörsbyten</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Dagens 14-dagars fönster och manuell validering hindrar snabbhet.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Möjliggör omedelbar effektuering via central masterdata.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Framgång beror på att aktörers IT-system är tillgängliga dygnet runt via lokal organisation.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Växel-logik för retail kräver hög tillgänglighet i lokala IT-system och organisation.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#ME2" style={navLinkStyle}><strong>ME2: Nättariffer</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kräver manuell sökning på 170 olika webbplatser.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Centralt bibliotek över alla Sveriges tariffer via ett API.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver att nätägare bygger och håller IT-system tillgängliga via sin organisation.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Tarifferna kräver lokal IT-exponering och förvaltande organisation.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#ME3" style={navLinkStyle}><strong>ME3: Portföljhantering (ESCO)</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'ESCOs måste hantera kunder via 170 olika konton.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'En inloggning för att se alla kunders anläggningar nationellt.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Datakvalitet och svarstider beror helt på aktörernas IT-system och organisation.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Datakvalitet och svarstider beror helt på aktörernas IT-system och organisation.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#ME4" style={navLinkStyle}><strong>ME4: Samtyckeshantering</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Manuella samtycken krävs vid varje ny anläggning.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Centralt digitalt samtycke som automatiskt täcker nya anläggningar.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kräver tillgängliga IT-gränssnitt för inloggning hos 170 parters organisationer.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Splittrad logik belastar kundens och parternas IT-system och organisationer.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#ME5" style={navLinkStyle}><strong>ME5: Cybersäkerhet (NIS2)</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Ingen central övervakning av cyberhot.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Ett centralt "fort" med högsta säkerhetsklassning. Varje aktör har en öppning mot DHV istället för att vara öppna mot alla andra aktörer.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', '170 attackytor kräver att varje enskild organisation har extremt hög IT-säkerhetsförmåga.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kombinerar sårbarheter; kräver att alla aktörers IT-system och organisationer är NIS2-säkrade.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#ME6" style={navLinkStyle}><strong>ME6: Inträdesbarriärer</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Gammalmodig kommunikation mot nätägare följer ofta inte nya aktörers moderna systemarktiektur.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', '"Build Once" - en integration för hela Sverige.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Stabiliteten för nya aktörer beror på 170 parters IT-tillgänglighet och organisation.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Tvingar fram två integrationer och beroende av lokala parters IT-stöd och organisation.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#ME7" style={navLinkStyle}><strong>ME7: Transparens</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Dold data försvårar korrekt prissättning.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Likvärdig tillgång till data skapar rättvis konkurrens.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att dela data i realtid vid förfrågan.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att dela data i realtid vid förfrågan.')}</td>
            </tr>

            {/* KUNDNYTTA & RÄTTVISA */}
            <tr><td colSpan={5} style={areaHeaderStyle}>Kundnytta & rättvisa</td></tr>
            <tr>
              <td style={styles.td}>
                <a href="#KN1" style={navLinkStyle}><strong>KN1: Geografisk likabehandling</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kunder hos vissa nätägare har idag sämre förutsättningar.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Alla får tillgång till samma digitala infrastruktur.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att dela data i realtid vid förfrågan.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att dela data i realtid vid förfrågan.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#KN2" style={navLinkStyle}><strong>KN2: Digital kontroll/fullmakter</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Osäkra manuella fullmakter på papper/PDF.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Central portal ger kunden total kontroll och överblick.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att hantera data i realtid vid förfrågan.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att hantera data i realtid vid förfrågan.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#KN3" style={navLinkStyle}><strong>KN3: Överblick energianvändning</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kunden ser endast fragmenterad bild.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'En inloggning visar all data nationellt.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att hantera data i realtid vid förfrågan.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Vilar på 170 lokala IT-system och deras organisationers möjlighet att hantera data i realtid vid förfrågan.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#KN4" style={navLinkStyle}><strong>KN4: Kundskydd/Informera val</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Dolda avtalsvillkor försvårar jämförelse.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Central registrering möjliggör automatisk kontroll av rättigheter.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Informationen är inlåst hos respektive elleverantör.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Informationen är inlåst hos respektive elleverantör.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#KN5" style={navLinkStyle}><strong>KN5: Kostnadsvillkor</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Stora variationer i avgifter hindrar marknaden.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Enhetlig kostnadsmodell för datatillgång.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Bevarar spretig prissättning baserat på lokala IT-kostnader och organisationer.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Bevarar spretig prissättning baserat på lokala IT-kostnader och organisationer.')}</td>
            </tr>

            {/* SYSTEM- & SAMHÄLLSNYTTA */}
            <tr><td colSpan={5} style={areaHeaderStyle}>System- & samhällsnytta</td></tr>
            <tr>
              <td style={styles.td}>
                <a href="#SN1" style={navLinkStyle}><strong>SN1: Kvalitetssäkrad flex</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Saknas förmåga att validera mot lokala nätbegränsningar.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Integrerad kontroll förhindrar aktivering i flaskhalsar.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Beror på realtidssvar från 170 IT-system som alla byggt egen funktionalitet och deras tekniska organisation.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('full', 'Möjliggörs genom FIR, men kräver ändå IT-stöd från lokala organisationer i realtid.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#SN2" style={navLinkStyle}><strong>SN2: Regulatorisk avräkning</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Risk för tvister vid icke-transparent beräkning.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Enhetlig beräkning enligt EU-krav.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver att 170 parters IT-system och organisationer koordineras perfekt.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('full', 'Hanteras centralt för flex, men vilar på lokala mätvärdesorganisationer i realtid.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#SN3" style={navLinkStyle}><strong>SN3: Prognoser & Flowbase</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'För fragmenterat dataunderlag.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Enhetligt underlag optimerar hela det svenska nätet.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kräver historisk datainsamling från 170 parters IT-system och organisationer i realtid.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver historisk datainsamling från 170 parters IT-system och organisationer i realtid.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#SN4" style={navLinkStyle}><strong>SN4: Resursanvändning</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Ingen automatisk koordination mellan TSO/DSO.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Säkerställer att TSO och DSO inte ger motstridiga order.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver synkroniserad IT-drift hos 170 nätägares organisationer och att de delar information mellan sig i realtid.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('full', 'Löses centralt, men kräver IT-koppling till lokala organisationer i realtid.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#SN5" style={navLinkStyle}><strong>SN5: Marknadstillit</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Hög risk hämmar investeringsviljan.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Hög datakvalitet sänker riskpremierna.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Begränsas av tillförlitligheten i 170 parters IT-system och organisationer i realtid.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Tilliten varierar med stabiliteten i lokala parters IT-stöd och organisation i realtid.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#SN6" style={navLinkStyle}><strong>SN6: Samhällseffektivitet</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', '170+150+N redundanta projekt är ett enormt resursslöseri.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Sparar miljarder i framtida förvaltningskostnad.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kräver 170+150+N dyra IT-projekt och permanent organisation för drift och support.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Belastar 170+150+N organisationer med dubbelt IT-underhåll och rapportering.')}</td>
            </tr>

            {/* FRAMTIDA MARKNADSUTVECKLING */}
            <tr><td colSpan={5} style={areaHeaderStyle}>Framtida marknadsutveckling (Fas 2 & 3)</td></tr>
            <tr>
              <td style={styles.td}>
                <a href="#FM1" style={navLinkStyle}><strong>FM1: Energigemenskaper</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'För komplext för lokala nätägare att administrera.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Central motor hanterar medlemsregister och avräkning.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kräver koordinering av 170+150 lokala IT-system och deras organisationer i realtid.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver ny central funktionalitet och IT-stöd från lokala parters organisationer i realtid.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#FM2" style={navLinkStyle}><strong>FM2: Statistikhantering</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Manuell rapportering till 4 myndigheter från 320 aktörer.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Centraliserad insamling automatiserar all myndighetsrapportering.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Vilar på 170+150+N parters IT-system och deras organisationers rapporteringsförmåga.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver fortsatt manuellt IT-stöd från 170+150+N organisationer för retail-delen.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#FM3" style={navLinkStyle}><strong>FM3: Undermätning</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Idag saknas stöd för mätning bakom huvudmätaren.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Centralt stöd för att särskilja flera resurser på samma adress.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kräver att lokala IT-system och organisationer uppgraderas för sub-metering. Påverkar 170+150+N aktörer.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('full', 'Central FIS-del, men förutsätter att lokala IT-system och organisationer kan leverera data. Påverkar 170+150+N aktörer.')}</td>
            </tr>
            <tr>
              <td style={styles.td}>
                <a href="#FM4" style={navLinkStyle}><strong>FM4: Leverantörsbyten IKN</strong></a>
              </td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kunder i slutna nät är idag inlåsta.')}</td>
              <td style={{ textAlign: 'center', backgroundColor: '#fafffd' }}>{statusIcon('full', 'Ger boende i flerbostadshus samma valfrihet som villaägare.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('none', 'Kräver att lokala IT-system och organisationer uppgraderas för leverantörsbyten inom IKN. Påverkar 170+150+N aktörer.')}</td>
              <td style={{ textAlign: 'center' }}>{statusIcon('partial', 'Kräver att lokala IT-system och organisationer uppgraderas för leverantörsbyten inom IKN. Påverkar 170+150+N aktörer.')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ ...styles.warningBox, backgroundColor: '#f8fafc', borderColor: '#dfe1e6', color: '#42526e', marginTop: '24px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Info size={20} color="#0052cc" style={{ flexShrink: 0 }} />
          <div>
            <strong>Analyskommentar gällande regeringsuppdraget:</strong> 
            <p style={{ marginTop: '8px', marginBottom: '8px' }}>
              Alternativ 1 är det enda alternativet som fullt ut svarar mot regeringsuppdragets (KN2023/01385) krav på att införa ett centralt datahanteringsverktyg för att <strong>"så effektivt som möjligt hantera nuvarande och framtida förändringar på elmarknaden"</strong>.
            </p>
            <p style={{ marginBottom: '8px' }}>
              Genom att centralisera masterdata och beräkningslogik skapas en skalbar plattform där framtida reformer (såsom energidelning) kan implementeras en gång centralt. Det decentraliserade spåret (Alt 0, 2, 3) misslyckas med effektivitetskravet eftersom det innebär en permanent hög kostnadsnivå för marknaden; varje framtida regulatorisk justering skulle tvinga fram 170 enskilda lokala utvecklingsprojekt istället för en central uppdatering.
            </p>
            <p>
              Slutligen skapar de decentraliserade alternativen ett kritiskt systemberoende av 170 enskilda organisationers IT-tillgänglighet. Detta medför orimligt höga krav på lokal beredskapsorganisation dygnet runt hos samtliga nätbolag för att inte riskera att blockera nationella marknadshändelser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};