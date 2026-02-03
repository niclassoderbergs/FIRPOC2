import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, TrendingDown, AlertTriangle, Target } from 'lucide-react';
import { styles } from './styles';

export const ConclusionSection: React.FC = () => {
  const bulletStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    alignItems: 'flex-start'
  };

  const iconStyle = {
    marginTop: '4px',
    flexShrink: 0
  };

  const headerLabelStyle = {
    display: 'block',
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#1e293b', // Mörk skifferblå för hög kontrast
    marginBottom: '4px'
  };

  return (
    <section style={{...styles.section, backgroundColor: '#f8fafc', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '64px'}}>
      <h2 style={{...styles.sectionHeader, color: '#0f172a'}}>
        <Target size={28} color="#059669" /> 
        Slutsats och förslag till inriktning
      </h2>
      
      <p style={{...styles.paragraph, color: '#334155'}}>
        Efter en omfattande analys av marknadens behov, teknisk komplexitet och ekonomiska konsekvenser står det klart att valet av infrastruktur är avgörande för Sveriges förmåga att leda energiomställningen.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '32px', marginTop: '32px' }}>
        
        <div style={bulletStyle}>
          <TrendingDown size={22} color="#059669" style={iconStyle} />
          <div>
            <strong style={headerLabelStyle}>Ekonomisk dominans:</strong>
            <p style={{...styles.cardText, color: '#475569', fontSize: '0.95rem', marginTop: '4px'}}>
              Alternativ 1 är det enda alternativet som radikalt sänker branschens samlade TCO. Genom att tillämpa "Build Once"-principen för framtida EU-reformer (likt NC DR och energidelning) undviks hundratals redundanta lokala IT-projekt.
            </p>
          </div>
        </div>

        <div style={bulletStyle}>
          <ShieldCheck size={22} color="#0052cc" style={iconStyle} />
          <div>
            <strong style={headerLabelStyle}>Robust cybersäkerhet:</strong>
            <p style={{...styles.cardText, color: '#475569', fontSize: '0.95rem', marginTop: '4px'}}>
              I en osäker omvärld skapar Alternativ 1 ett nationellt "fort" för elmarknadens data. Det möjliggör en statlig kontroll och härdning som är tekniskt och ekonomiskt omöjlig att uppnå i en splittrad arkitektur med 170 attackytor.
            </p>
          </div>
        </div>

        <div style={bulletStyle}>
          <Zap size={22} color="#d97706" style={iconStyle} />
          <div>
            <strong style={headerLabelStyle}>Strategisk skalbarhet:</strong>
            <p style={{...styles.cardText, color: '#475569', fontSize: '0.95rem', marginTop: '4px'}}>
              En horisontell plattform för masterdata (det s.k. Golden Record) är en förutsättning för att snabbt kunna rulla ut nya marknadsmodeller utan att bygga nya system-silos för varje unikt behov.
            </p>
          </div>
        </div>
      </div>

      <div style={{...styles.warningBox, backgroundColor: '#fff1f0', borderColor: '#ffa39e'}}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <AlertTriangle size={32} color="#cf1322" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ fontSize: '1.1rem', color: '#820014' }}>Varning för Alternativ 3 (och Alternativ 2):</strong>
              <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6', color: '#820014' }}>
                Att välja en hybridmodell innebär att Sverige tar på sig kostnaden för en central infrastruktur (&gt;80% dataöverlapp med Alt 1) men missar effektiviseringsvinsterna för kundrörlighet och retail-marknad. Det skapar en onödig administrativ börda genom dubbelrapportering för nätägarna.
              </p>
            </div>
            
            <div style={{ borderTop: '1px solid rgba(130, 0, 20, 0.2)', paddingTop: '16px' }}>
              <strong style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#820014' }}>Kontextuell Analys: Varför Sverige är annorlunda</strong>
              <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6', color: '#820014' }}>
                Alternativ 2 och de decentraliserade delarna i Alternativ 3 bygger på en växelarkitektur som fungerar väl i länder med hög marknadskoncentration. Där kan man kostnadseffektivt säkra realtidsprestanda och dygnet-runt-beredskap hos ett fåtal motparter.
              </p>
              <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 700, color: '#820014' }}>
                Sveriges unika utmaning är fragmenteringen.
              </p>
              <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6', color: '#820014' }}>
                Vi har över 170 nätägare, varav många är mindre kommunala bolag. Att kräva att alla dessa ska upprätthålla samma realtidsprestanda, IT-jour och säkerhetsnivå som en storbank skapar en oproportionerlig systemrisk och en kostnadsexplosion för lokala elnätskunder.
              </p>
              <p style={{ marginTop: '12px', fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic', fontWeight: 700, color: '#a8071a' }}>
                Slutsats: En decentraliserad växel vilar på sin svagaste länk. I en svensk kontext med 170 länkar blir risken för blockering av tidskritiska processer (såsom 24h-byten eller flex-bud) statistiskt oundviklig.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{marginTop: '40px', padding: '32px', backgroundColor: '#0747a6', borderRadius: '12px', color: '#fff', textAlign: 'center', boxShadow: '0 10px 15px -3px rgba(7, 71, 166, 0.3)'}}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', opacity: 0.9 }}>
          Rekommenderat Beslut
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: '1.3' }}>
          Implementera Alternativ 1: Centraliserade funktioner och lagring
        </div>
        <p style={{ marginTop: '16px', fontSize: '1rem', opacity: 0.95, maxWidth: '850px', margin: '16px auto 0', lineHeight: '1.6' }}>
          Detta vägval säkrar lägsta möjliga samhällskostnad, högsta säkerhet och full måluppfyllnad av regeringsuppdraget och EU:s nätkoder genom att eliminera beroendet av 170 enskilda parters lokala IT-system för nationella processer.
        </p>
      </div>
    </section>
  );
};