import React from 'react';
import { Database, Quote, Zap, TrendingUp, BarChart3, ShieldAlert } from 'lucide-react';
import { styles } from './styles';

export const BackgroundSection: React.FC = () => (
  <section style={styles.section}>
    <h2 style={styles.sectionHeader}><Database size={28} color="#0747a6" /> Bakgrund och syfte</h2>
    <p style={styles.paragraph}>
      Regeringen har gett Svenska kraftnät och Energimarknadsinspektionen i uppdrag (KN2023/01385) att föreslå ett centralt datahanteringsverktyg. Uppdraget och EU-regelverket ställer krav på:
    </p>

    <div style={styles.govAssessmentBox}>
      <Quote size={40} color="#0052cc" style={{ opacity: 0.2, flexShrink: 0 }} />
      <p style={{ ...styles.paragraph, margin: 0, color: '#0747a6', fontWeight: 500, fontSize: '1.1rem', fontStyle: 'italic' }}>
        Regeringen bedömer att införande av ett centralt datahanteringsverktyg är nödvändigt för att så effektivt som möjligt hantera nuvarande och framtida förändringar på elmarknaden.
      </p>
    </div>

    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', listStyle: 'none', padding: 0, marginBottom: '32px' }}>
      <li style={{ backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #cce4ff', padding: '20px', display: 'flex', gap: '16px' }}>
        <Zap style={{ color: '#d97706', flexShrink: 0 }} size={24} />
        <span style={{ color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.4' }}>
          <strong style={{ display: 'block', marginBottom: '4px' }}>Flexibilitet & NC DR</strong> 
          Effektiv handel och kvalificering av flexibilitetsresurser.
        </span>
      </li>
      <li style={{ backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #cce4ff', padding: '20px', display: 'flex', gap: '16px' }}>
        <TrendingUp style={{ color: '#2563eb', flexShrink: 0 }} size={24} />
        <span style={{ color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.4' }}>
          <strong style={{ display: 'block', marginBottom: '4px' }}>Retail-processer</strong> 
          Snabba leverantörsbyten (24h) och enklare fullmaktshantering.
        </span>
      </li>
      <li style={{ backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #cce4ff', padding: '20px', display: 'flex', gap: '16px' }}>
        <BarChart3 style={{ color: '#0d9488', flexShrink: 0 }} size={24} />
        <span style={{ color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.4' }}>
          <strong style={{ display: 'block', marginBottom: '4px' }}>Öppen Data & Tariffer</strong> 
          Tillgängliggörande av nätavgifter och statistik.
        </span>
      </li>
      <li style={{ backgroundColor: '#f0f7ff', borderRadius: '8px', border: '1px solid #cce4ff', padding: '20px', display: 'flex', gap: '16px' }}>
        <ShieldAlert style={{ color: '#dc2626', flexShrink: 0 }} size={24} />
        <span style={{ color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.4' }}>
          <strong style={{ display: 'block', marginBottom: '4px' }}>Säkerhet</strong> 
          Uppfyllnad av NIS 2 och totalförsvarets behov av robusthet.
        </span>
      </li>
    </ul>
  </section>
);