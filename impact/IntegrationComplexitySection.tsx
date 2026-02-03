import React from 'react';
import { Network, Blocks, GitPullRequest, AlertCircle } from 'lucide-react';
import { styles } from './styles';

export const IntegrationComplexitySection: React.FC = () => {
  const boxStyle = {
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    flex: 1
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>
        <Network size={28} color="#4f46e5" /> 
        Marknadens systemlandskap och integrationsbörda
      </h2>
      <p style={styles.paragraph}>
        Som framgår av måluppfyllnadsmatrisen i föregående avsnitt, faller alternativen 2 och 3 kort främst på grund av deras oförmåga att skapa en effektiv och skalbar struktur. En kritisk faktor här är hur många tekniska gränssnitt marknadens aktörer tvingas underhålla. Alternativen skapar fundamentalt olika landskap:
      </p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {/* Horisontell Plattform */}
        <div style={{ ...boxStyle, borderTop: '6px solid #36b37e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Blocks size={20} color="#36b37e" />
            <strong style={{ color: '#1e293b' }}>Alternativ 1: Horisontell plattform</strong>
          </div>
          <p style={{ ...styles.cardText, fontSize: '0.9rem', marginBottom: '16px' }}>
            En gemensam infrastruktur för all masterdata och marknadsprocesser.
          </p>
          <ul style={{ ...styles.cardText, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li><strong>"Integration Once":</strong> Aktörer bygger en koppling för både retail och flexibilitet.</li>
            <li><strong>Skalbarhet:</strong> Nästa reform (t.ex. energidelning) blir en ny modul på samma basdata.</li>
            <li><strong>Minimalt data-brus:</strong> Ingen synkronisering behövs mellan olika centrala system.</li>
          </ul>
        </div>

        {/* Vertikala Silos */}
        <div style={{ ...boxStyle, borderTop: '6px solid #ff8b00', backgroundColor: '#fffcf5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <GitPullRequest size={20} color="#ff8b00" />
            <strong style={{ color: '#1e293b' }}>Alternativ 3: Vertikala Silos ("Isolerade öar")</strong>
          </div>
          <p style={{ ...styles.cardText, fontSize: '0.9rem', marginBottom: '16px' }}>
            Separata system för varje specifikt behov (Retail-växel + FIR-ö).
          </p>
          <ul style={{ ...styles.cardText, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li><strong>Fragmentering:</strong> Aktörer tvingas hantera data och logik utspritt på flera system.</li>
            <li><strong>Osäker framtid:</strong> Varje ny funktion riskerar att kräva ett nytt dedikerat system ("Hur många ska vi bygga?").</li>
            <li><strong>Administrativ börda:</strong> Nätbolag tvingas dubbelrapportera masterdata till varje ny "ö".</li>
          </ul>
        </div>
      </div>

      <div style={{ ...styles.warningBox, backgroundColor: '#f1f5f9', borderColor: '#475569', color: '#1e293b' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <AlertCircle size={20} color="#475569" style={{ flexShrink: 0 }} />
          <div>
            <strong>Analys av förvaltningsbarhet:</strong> 
            <p style={{ marginTop: '8px' }}>
              Alternativ 3 leder till en <strong>exponentiell ökning av komplexitet</strong> över tid. Utan en gemensam bottenplatta för masterdata (det s.k. "Golden Record") blir varje ny marknadsfunktion en isolerad teknisk skuld. Detta motverkar direkt regeringsuppdragets mål om att hantera förändringar "så effektivt som möjligt", då förvaltningskostnaden för marknaden riskerar att skena när antalet systemintegrationer växer okontrollerat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};