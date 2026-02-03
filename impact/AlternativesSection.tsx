import React from 'react';
import { Layers, AlertTriangle, ShieldCheck, Zap, Network } from 'lucide-react';
import { styles } from './styles';

export const AlternativesSection: React.FC = () => {
  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}><Layers size={28} color="#d97706" /> Analyserade möjliga alternativ</h2>
      
      <div style={styles.grid}>
        <a href="#alt0-detail" style={styles.altCard} onClick={(e) => { e.preventDefault(); scrollIntoView('alt0-detail'); }}>
          <span style={{...styles.altBadge, backgroundColor: '#f4f5f7', color: '#505f79'}}>Alt 0</span>
          <h3 style={styles.altTitle}>Status Quo</h3>
          <p style={styles.cardText}>Ingen ny central infrastruktur. Uppfyller ej uppdraget. Lagbrott mot NC DR.</p>
        </a>
        <a href="#alt1-detail" style={{...styles.altCard, borderColor: '#36b37e', backgroundColor: '#fafffd', borderLeftWidth: '6px'}} onClick={(e) => { e.preventDefault(); scrollIntoView('alt1-detail'); }}>
          <span style={{...styles.altBadge, backgroundColor: '#e3fcef', color: '#006644'}}>Alt 1 (Rekommenderat)</span>
          <h3 style={styles.altTitle}>Centralt DHV med centraliserade funktioner och lagring</h3>
          <p style={styles.cardText}>DHV lagrar strukturdata, mätvärden och tariffer ("Golden Record"). FIR är en integrerad modul.</p>
        </a>
        <a href="#alt2-detail" style={styles.altCard} onClick={(e) => { e.preventDefault(); scrollIntoView('alt2-detail'); }}>
          <span style={{...styles.altBadge, backgroundColor: '#deebff', color: '#0747a6'}}>Alt 2</span>
          <h3 style={styles.altTitle}>Decentraliserad Hubb (Växel)</h3>
          <p style={styles.cardText}>En "Message Broker"-modell. DHV agerar växel och hämtar data i realtid från källan vid behov.</p>
        </a>
        <a href="#alt3-detail" style={{...styles.altCard, borderColor: '#ff8b00', borderLeftWidth: '4px'}} onClick={(e) => { e.preventDefault(); scrollIntoView('alt3-detail'); }}>
          <span style={{...styles.altBadge, backgroundColor: '#fff0b3', color: '#172b4d'}}>Alt 3</span>
          <h3 style={styles.altTitle}>Decentraliserad Retail + Centraliserat FIR</h3>
          <p style={styles.cardText}>DHV är en växel för retail, men flexibilitet (FIR) byggs centralt som en isolerad ö.</p>
        </a>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={styles.subTitle}>Utförlig beskrivning av arkitekturvalen</h3>
        
        {/* Alternativ 0 */}
        <div id="alt0-detail" style={{ ...styles.detailBox, borderLeft: '4px solid #505f79' }}>
          <div style={styles.detailTitle}><AlertTriangle size={20} color="#505f79" /> Alternativ 0: Status Quo</div>
          <p style={styles.cardText}>
            Innebär att dagens decentraliserade modell behålls utan en central hubb. 170+ nätägare fortsätter att hantera mätdata och kundrelationer i egna stuprör. Marknadens aktörer tvingas upprätthålla hundratals integrationer.
            <br/><br/>
            <strong>Konsekvens:</strong> Detta alternativ avvisas då det direkt strider mot EU-förordningen NC DR:s krav på ett nationellt flexibilitetsregister.
          </p>
        </div>

        {/* Alternativ 1 */}
        <div id="alt1-detail" style={{ ...styles.detailBox, borderLeft: '4px solid #36b37e', backgroundColor: '#fafffd' }}>
          <div style={styles.detailTitle}><ShieldCheck size={20} color="#006644" /> Alternativ 1: Centraliserad funktioner och lagring (Rekommenderat)</div>
          <p style={styles.cardText}>
            Ett modernt datahanteringsverktyg (DHV) som agerar "Single Source of Truth". DHV hanterar elmarknadsfunktioner centralt samt lagrar mätvärden, tariffer och masterdata. FIR implementeras som en integrerad modul.
            <br/><br/>
            <strong>Fördelar:</strong> Maximal samhällsekonomisk effektivitet genom "Build Once". Eliminerar beroendet av 170 parters systemsamtidighet. Möjliggör realtidsvalidering med minimal latens och koncentrerat cyberförsvar.
          </p>
        </div>

        {/* Alternativ 2 */}
        <div id="alt2-detail" style={{ ...styles.detailBox, borderLeft: '4px solid #0052cc' }}>
          <div style={styles.detailTitle}><Network size={20} color="#0052cc" /> Alternativ 2: Decentraliserad Hubb (Växel)</div>
          <p style={styles.cardText}>
            En "Message Broker"-arkitektur där DHV agerar kommunikationsväxel. Detta är en etablerad modell för lös koppling mellan system, där data hämtas i realtid från källan (nätägaren) vid behov, snarare än att lagras centralt.
            <br/><br/>
            <strong>Analys:</strong>
            <ul>
                <li><strong>Fördelar:</strong> Minimerar central datalagring (Privacy by design). Beprövad teknik i andra branscher såsom finans och telekom. Teoretiskt lägre central förvaltningskostnad.</li>
                <li><strong>Nackdelar:</strong> Kräver 170+ realtidsintegrationer mot nätägare. Prestandan begränsas av den långsammaste parten. Extremt höga krav på lokal IT-tillgänglighet (24/7) hos samtliga nätbolag för att inte blockera nationella processer.</li>
            </ul>
          </p>
        </div>

        {/* Alternativ 3 */}
        <div id="alt3-detail" style={{ ...styles.detailBox, borderLeft: '4px solid #ff8b00' }}>
          <div style={styles.detailTitle}><Layers size={20} color="#ff8b00" /> Alternativ 3: Hybridmodell (Isolerade öar)</div>
          <p style={styles.cardText}>
            Liknar Alternativ 2 för retail, men med ett centraliserat FIR. 
            <br/><br/>
            <strong>Utmaningar:</strong> Skapar "ö-bildning". Eftersom FIR kräver &gt;80% av den data som finns i DHV, tvingas samhället investera i dubbel infrastruktur. Nätbolagen tvingas till dubbelrapportering och dubbla integrationsflöden.
          </p>
        </div>
      </div>
    </section>
  );
};