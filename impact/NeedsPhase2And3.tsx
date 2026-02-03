import React from 'react';
import { Compass } from 'lucide-react';
import { styles } from './styles';

export const NeedsPhase2And3: React.FC = () => {
  const subSectionStyle = {
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  };

  return (
    <div style={subSectionStyle}>
      <h3 style={{ ...styles.subTitle, marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' }}>
        <Compass size={24} color="#4f46e5" />
        Framtida marknadsutveckling (Fas 2 & 3)
      </h3>
      <p style={styles.paragraph}>
        För att fullt ut realisera elsystemets potential krävs att infrastrukturen utvecklas för att stödja mer avancerade marknadsmodeller och tekniska lösningar:
      </p>
      <ul style={{ ...styles.paragraph, paddingLeft: '20px' }}>
        <li id="FM1" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>FM1: Energigemenskaper och energidelning:</strong> Genomförandet av EU-direktiven kräver stöd för att dela energi lokalt. Marknaden behöver en central infrastruktur som kan hantera medlemsregister, fördelningsnycklar och virtuell avräkning. Utan en central motor blir administrationen av energidelning för komplex och kostsam för enskilda <strong>elleverantörer och nätägare</strong> att hantera lokalt, vilket riskerar att hämma utvecklingen av lokala energisystem.
        </li>
        <li id="FM2" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>FM2: Automatiserad statistikhantering:</strong> Det finns ett växande behov av högkvalitativ, realtidsnära statistik för att kunna följa energiomställningen. Genom att centralisera datainsamlingen i DHV kan rapportering till <strong>Ei, SCB, Svk och Energimyndigheten</strong> automatiseras, vilket dramatiskt minskar den administrativa bördan för marknadens 320+ aktörer.
        </li>
        <li id="FM3" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>FM3: Undermätning av flexibilitetsresurser:</strong> Mindre resurser som värmepumpar och elbilsladdare inkluderas i Fas 1 via nätägarens mätpunkt. I Fas 2 och 3 krävs stöd för undermätning ("sub-metering") för att säkerställa <strong>korrekt avräkning ifall det finns flera olika flexibilitetsresurser bakom samma nätägares mätpunkt</strong>. Det finns även behov av avgränsad data direkt från enheten för att kunna beräkna mer exakta baselines och utföra teknisk verifiering utan att påverkas av anläggningens övriga brus eller förbrukning.
        </li>
        <li id="FM4" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>FM4: Standardiserade leverantörsbyten inom IKN:</strong> Kunder i icke-koncessionspliktiga nät (IKN), såsom industriparker, köpcentrum eller <strong>privatpersoner som bor i flerfamiljshus med IKN-nät</strong>, har idag begränsad möjlighet att byta leverantör eller aggregator. Det finns ett behov av att standardisera processerna för mätpunkter och byten även inom dessa nät för att säkra konkurrensneutralitet och full tillgång till flexibilitetsmarknaden för alla resurser, oavsett nätanslutningstyp.
        </li>
      </ul>
    </div>
  );
};