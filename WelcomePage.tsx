
import React from 'react';

interface Props {
  onNavigate: (view: string) => void;
}

const styles = {
  container: {
    padding: '60px 80px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const,
    maxWidth: '1500px',
    margin: '0 auto'
  },
  hero: {
    marginBottom: '64px',
    textAlign: 'center' as const
  },
  title: {
    fontSize: '3rem',
    fontWeight: 800,
    color: '#172b4d',
    marginBottom: '24px',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#5e6c84',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginBottom: '64px'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ebecf0',
    borderRadius: '8px',
    padding: '32px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '16px',
    color: '#0052cc'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#172b4d',
    marginBottom: '12px'
  },
  cardText: {
    fontSize: '1rem',
    color: '#5e6c84',
    lineHeight: '1.5',
    flex: 1
  },
  cardAction: {
    marginTop: '24px',
    fontWeight: 600,
    color: '#0052cc',
    textTransform: 'uppercase' as const,
    fontSize: '0.85rem',
    letterSpacing: '0.5px'
  },
  section: {
    marginBottom: '48px',
    padding: '32px',
    backgroundColor: '#f4f5f7',
    borderRadius: '8px'
  },
  sectionHeader: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#172b4d',
    marginBottom: '16px'
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#172b4d',
    marginBottom: '16px'
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '16px'
  },
  listItem: {
    marginBottom: '8px',
    fontSize: '1rem',
    color: '#172b4d'
  },
  guideGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    marginTop: '32px',
    borderTop: '1px solid #dfe1e6',
    paddingTop: '24px'
  },
  guideHeader: {
    color: '#0052cc', 
    marginBottom: '12px', 
    display: 'flex', 
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '1.1rem'
  },
  guideBadge: {
    backgroundColor: '#e6effc', 
    padding: '4px 8px', 
    borderRadius: '4px', 
    marginRight: '8px', 
    fontSize: '0.9rem',
    color: '#0052cc'
  },
  limitationBox: {
    marginTop: '40px',
    padding: '24px',
    backgroundColor: '#fff7d6', // Light yellow warning color
    borderLeft: '4px solid #ffab00',
    borderRadius: '4px',
    color: '#172b4d'
  }
};

export const WelcomePage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Välkommen till FIR Wiki</h1>
        <p style={styles.subtitle}>
          Förslag till tekniska specifikationer, affärsprocesser och arkitektur för det nationella Flexibilitetsregistret (FIR).
        </p>
      </div>

      {/* Moved Up: Background Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Bakgrund och metodik</h2>
        <p style={styles.text}>
          Wikin är framtagen för att konkretisera utkastet till <strong>NC DR</strong> (Network Code on Demand Response) till implementerbara processer. Som metod för att konkretisera detta har det valts att utgå ifrån <strong>Elmarknadshubbens metoder</strong>.
        </p>
        <p style={styles.text}>
          Det innebär att <strong>BRS:er</strong> (Business Requirement Specifications) och <strong>MPS:er</strong> (Market Process Scenarios) har använts som grundstenar i dokumentationen.
        </p>
        <p style={styles.text}>
           Dessa har i sin tur skapats inom <strong>8 olika domäner</strong> för att ge en heltäckande bild av flexibilitetsmarknaden och säkerställa interoperabilitet.
        </p>

        <h3 style={{fontSize: '1.25rem', color: '#172b4d', marginTop: '32px', marginBottom: '16px'}}>Läsanvisning: Dokumentationens struktur</h3>
        
        <div style={styles.guideGrid}>
            <div>
                <h4 style={styles.guideHeader}>
                    <span style={styles.guideBadge}>BRS</span>
                    Business Requirement Specification
                </h4>
                <p style={{fontSize: '0.95rem', color: '#5e6c84', marginBottom: '12px'}}>
                    Beskriver en <strong>atomär transaktion</strong> eller funktion (t.ex. "Registrera resurs"). Varje BRS innehåller:
                </p>
                <ul style={{paddingLeft: '20px', fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.6'}}>
                    <li><strong>Syfte:</strong> Varför transaktionen utförs och vad den uppnår.</li>
                    <li><strong>Aktörer:</strong> Vem initierar och vem tar emot (Initiator/Receiver).</li>
                    <li><strong>Villkor:</strong> Pre-conditions (krav för start) och Post-conditions (resultat).</li>
                    <li><strong>Affärsregler:</strong> Valideringsregler och specifika felkoder.</li>
                    <li><strong>Informationsmodell:</strong> Detaljerad lista på attribut som skickas.</li>
                </ul>
            </div>

            <div>
                <h4 style={styles.guideHeader}>
                    <span style={styles.guideBadge}>MPS</span>
                    Market Process Scenario
                </h4>
                <p style={{fontSize: '0.95rem', color: '#5e6c84', marginBottom: '12px'}}>
                    Knyter samman flera BRS:er till ett <strong>logiskt affärsflöde</strong> (t.ex. "Leverantörsbyte"). Varje MPS innehåller:
                </p>
                <ul style={{paddingLeft: '20px', fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.6'}}>
                    <li><strong>Trigger:</strong> Den affärshändelse som startar processen.</li>
                    <li><strong>Scenarier:</strong> Olika varianter av flödet (t.ex. Happy path, Avvikelsehantering).</li>
                    <li><strong>Sekvensdiagram:</strong> Visuell överblick över interaktionen mellan aktörer.</li>
                    <li><strong>Process-steg:</strong> Steg-för-steg beskrivning med länkar till specifika BRS:er.</li>
                </ul>
            </div>
        </div>

        {/* Limitation Section */}
        <div style={styles.limitationBox}>
          <h3 style={{marginTop: 0, marginBottom: '12px', color: '#bf2600', fontSize: '1.1rem', fontWeight: 700}}>
             ⚠️ Begränsningar och status
          </h3>
          <p style={{fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '12px'}}>
            Detta dokument utgör ett <strong>arbetsmaterial och ett utkast</strong> till specifikation för Flexibilitetsregistret (FIR). 
            Syftet är att visualisera processflöden och datamodeller för diskussion.
          </p>
          <ul style={{paddingLeft: '20px', margin: 0, fontSize: '0.95rem', lineHeight: '1.5'}}>
             <li style={{marginBottom: '6px'}}>Informationsmodeller och attributlistor är preliminära och kan komma att justeras.</li>
             <li style={{marginBottom: '6px'}}>Detaljerade valideringsregler och felkoder är inte uttömmande definierade.</li>
             <li style={{marginBottom: '6px'}}>Kopplingen till externa system (t.ex. Datahubben) beskrivs konceptuellt.</li>
             <li>Felaktigheter och inkonsekvenser kan förekomma då arbetet pågår löpande.</li>
          </ul>
        </div>

      </div>

      {/* Navigationskort: Domäner & Aktörer */}
      <div style={styles.grid}>
        
        {/* Domänöversikt */}
        <div 
            style={styles.card} 
            onClick={() => onNavigate('domainOverview')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>🌐</div>
          <h3 style={styles.cardTitle}>Domänöversikt</h3>
          <p style={styles.cardText}>
            Utforska systemets indelning i 8 funktionella domäner och deras respektive processer.
          </p>
          <div style={styles.cardAction}>Utforska Domäner →</div>
        </div>

        {/* Aktörsöversikt */}
        <div 
            style={styles.card} 
            onClick={() => onNavigate('globalActorOverview')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>👥</div>
          <h3 style={styles.cardTitle}>Aktörsöversikt</h3>
          <p style={styles.cardText}>
            Vem gör vad? En global matris över alla transaktioner grupperat per ansvarig aktör (TSO, DSO, SP, etc.).
          </p>
          <div style={styles.cardAction}>Visa Matris →</div>
        </div>
      </div>

      {/* JWG Section */}
      <div style={{...styles.section, backgroundColor: '#f3e5f5', borderLeft: '4px solid #7b1fa2'}}>
        <h2 style={{...styles.sectionHeader, color: '#4a148c'}}>Europeisk harmonisering (JWG)</h2>
        <p style={styles.text}>
           För att säkerställa att detta FIR förslag följer europeisk standard har systemets processer mappats mot arbetet från <strong>Joint Working Group (JWG)</strong>, 
           ett samarbete mellan <strong>ENTSO-E</strong> och <strong>EU DSO Entity</strong>.
        </p>
        <p style={styles.text}>
           JWG har tagit fram procedurer ("Implementing Regulation on interoperability requirements") för att garantera ett icke-diskriminerande och transparent datautbyte för Demand Response.
        </p>
        <p style={styles.text}>
           I denna wiki har en <strong>detaljerad mappning</strong> gjorts där varje teknisk BRS-transaktion kopplas till motsvarande legal process i JWG-ramverket. 
           Detta garanterar spårbarhet från lagkrav ner till teknisk implementation.
        </p>
      </div>

      {/* JWG Processbibliotek - Placerad efter JWG */}
      <div style={styles.grid}>
        <div 
            style={styles.card} 
            onClick={() => onNavigate('procedures')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>📜</div>
          <h3 style={styles.cardTitle}>JWG processbibliotek</h3>
          <p style={styles.cardText}>
            Harmoniserade procedurer enligt JWG-regelverket mappade mot tekniska BRS-transaktioner.
          </p>
          <div style={styles.cardAction}>Utforska Procedurer →</div>
        </div>
      </div>

      <div style={{...styles.section, backgroundColor: '#e6effc', borderLeft: '4px solid #0052cc'}}>
        <h2 style={styles.sectionHeader}>Arkitektoniska principer</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}><strong>Separation of Concerns:</strong> Tydlig uppdelning mellan Kapacitetsmarknad (Domän 7) och Nätbegränsningar (Domän 4).</li>
          <li style={styles.listItem}><strong>Standardiserad nomenklatur:</strong> Pågående arbete med ID-omnumrering för att skapa logiska nummerserier (CRUD-baserade suffix).</li>
          <li style={styles.listItem}><strong>Spårbarhet:</strong> Varje BRS (transaktion) kan spåras till en eller flera MPS (scenarier) och vidare till lagkrav (JWG).</li>
        </ul>
      </div>

    </div>
  );
};
