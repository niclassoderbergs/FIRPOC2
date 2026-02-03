
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
  }
};

export const DhvWelcomePage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Datahanteringsverktyg (DHV)</h1>
        <p style={styles.subtitle}>
          Processbeskrivningar och specifikationer för den svenska elmarknadshubben, baserat på harmoniserade marknadsprocesser.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Bakgrund och historik</h2>
        <p style={styles.text}>
          Innehållet i denna sektion baseras på det omfattande arbete som utfördes inom <strong>Elmarknadshubbprojektet</strong>, vilket pausades under 2020. 
          För att bevara värdet av detta arbete och säkerställa kompatibilitet har relevanta BRS:er och MPS:er lästs in i denna wiki.
        </p>
        <p style={styles.text}>
          Dessa "arvprocesser" har markerats med status <strong>LEGACY</strong>. Nya processer som tillkommer för att stödja flexibilitetsmarknaden eller moderna anpassningar har en annan statusetikett (t.ex. ACTIVE eller DRAFT).
        </p>
        <p style={styles.text}>
           <strong>Observera:</strong> Om en Legacy-BRS har modifierats för att passa den nuvarande arkitekturen eller för att korrigera fel, framgår detta tydligt av <strong>changeloggen (Revisionshistoriken)</strong> längst ner på respektive sida.
        </p>

        <h3 style={{fontSize: '1.25rem', color: '#172b4d', marginTop: '32px', marginBottom: '16px'}}>Läsanvisning: Dokumentationens struktur</h3>
        
        <div style={styles.guideGrid}>
            <div>
                <h4 style={styles.guideHeader}>
                    <span style={styles.guideBadge}>BRS</span>
                    Business Requirement Specification
                </h4>
                <p style={{fontSize: '0.95rem', color: '#5e6c84', marginBottom: '12px'}}>
                    Beskriver en <strong>atomär transaktion</strong> eller funktion (t.ex. "Registrera mätvärden"). Varje BRS innehåller:
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
            Detta material är en representation av 2020 års specifikationer med vissa anpassningar för flexibilitet.
          </p>
          <ul style={{paddingLeft: '20px', margin: 0, fontSize: '0.95rem', lineHeight: '1.5'}}>
             <li style={{marginBottom: '6px'}}>Informationen ska ses som ett referensunderlag för integration, inte som den absoluta sanningen för Datahubbens interna logik idag.</li>
             <li style={{marginBottom: '6px'}}>Statusmarkeringar som "Implemented", "Partially Implemented" eller "Not Implemented" anger hur långt implementeringen av BRS:en nådde inom Elmarknadshubbprojektet.</li>
             <li>Vid diskrepanser mot den officiella Datahub-dokumentationen (Ediel) gäller den officiella dokumentationen.</li>
          </ul>
        </div>

      </div>

      <div style={styles.grid}>
        <div 
            style={styles.card} 
            onClick={() => onNavigate('dhvDomain1')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>⚡</div>
          <h3 style={styles.cardTitle}>Domän 1: Mätpunkt</h3>
          <p style={styles.cardText}>
            Hantering av mätpunkter, anläggningsstrukturer och grunddata i Datahubben.
          </p>
          <div style={styles.cardAction}>Gå till Domän 1 →</div>
        </div>
        
        <div 
            style={styles.card} 
            onClick={() => onNavigate('dhvDomain2')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>🤝</div>
          <h3 style={styles.cardTitle}>Domän 2: Kund & Avtal</h3>
          <p style={styles.cardText}>
            Leverantörsbyten, inflytt/utflytt och kundleveransavtal.
          </p>
          <div style={styles.cardAction}>Gå till Domän 2 →</div>
        </div>
        
        <div 
            style={styles.card} 
            onClick={() => onNavigate('dhvDomain6')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>📊</div>
          <h3 style={styles.cardTitle}>Domän 6: Mätvärden</h3>
          <p style={styles.cardText}>
            Insamling och distribution av mätvärden från nätägare till marknaden.
          </p>
          <div style={styles.cardAction}>Gå till Domän 6 →</div>
        </div>

        <div 
            style={styles.card} 
            onClick={() => onNavigate('dhvDomain7')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>⚖️</div>
          <h3 style={styles.cardTitle}>Domän 7: Nätavräkning</h3>
          <p style={styles.cardText}>
            Korrigeringsavräkning och aggregering för balansavräkning.
          </p>
          <div style={styles.cardAction}>Gå till Domän 7 →</div>
        </div>

        <div 
            style={styles.card} 
            onClick={() => onNavigate('dhvDomain9')}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}
        >
          <div style={styles.cardIcon}>🏷️</div>
          <h3 style={styles.cardTitle}>Domän 9: Nättariffer</h3>
          <p style={styles.cardText}>
            Administration och distribution av nättariffer och avgifter.
          </p>
          <div style={styles.cardAction}>Gå till Domän 9 →</div>
        </div>
      </div>
    </div>
  );
};
