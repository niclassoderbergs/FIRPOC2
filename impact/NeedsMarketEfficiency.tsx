import React from 'react';
import { Clock } from 'lucide-react';
import { styles } from './styles';

export const NeedsMarketEfficiency: React.FC = () => {
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
        <Clock size={24} color="#008da6" />
        Effektiv elmarknad
      </h3>
      <p style={styles.paragraph}>
        En rörlig och modern marknad kräver att tekniska trösklar minimeras för att främja konkurrens och innovation:
      </p>
      <ul style={{ ...styles.paragraph, paddingLeft: '20px' }}>
        <li id="ME1" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>ME1: Processer för snabba leverantörsbyten:</strong> För att säkerställa hög rörlighet bland kunderna krävs förmågan att tekniskt utföra byten inom 24 timmar, oberoende av nätområde.
        </li>
        <li id="ME2" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>ME2: Tillgång till nättariffer:</strong> Enligt regeringsuppdraget finns ett uttalat behov av förenklad tillgång till data över elanvändning och nätavgifter. Detta är en förutsättning för att aktörer ska kunna optimera flexibilitetstjänster och bidra till ett effektivt nätutnyttjande baserat på korrekta prissignaler.
        </li>
        <li id="ME3" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>ME3: Effektivere portföljhantering för tjänsteföretag:</strong> För att skala upp smarta tjänster nationellt krävs att energitjänsteföretag (ESCOs) can hämta information om kunders samtliga anläggningar från en källa. Detta eliminerar den administrativa fragmentering som uppstår vid kontakt med 170 olika nätägare.
        </li>
        <li id="ME4" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>ME4: Förenklad samtyckeshantering vid expansion:</strong> Marknaden behöver en infrastruktur där kunden kan lämna ett samlat samtycke. Detta möjliggör för tjänsteföretag att automatiskt få information när kunden ansluter nya anläggningar (exempelvis i ett fastighetsbestånd), utan att nya samtyckesprocesser krävs för varje enskild förändring.
        </li>
        <li id="ME5" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>ME5: Cybersäkerhet och NIS2-efterlevnad:</strong> En centraliserad infrastruktur innebär att marknadens aktörer endast behöver säkra en teknisk kommunikationsväg, istället för 170 separata anslutningar. Detta minimerar sårbarheter och förenklar efterlevnaden av NIS2-direktivets krav på robusthet.
        </li>
        <li id="ME6" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>ME6: Sänkta inträdesbarriärer:</strong> Genom standardiserade moderna gränssnitt (API:er) och en "Single Point of Contact" förenklas det för nya aktörer att komma in på elmarknaden.
        </li>
        <li id="ME7" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>ME7: Transparens:</strong> Marknadsaktörer behöver förutsägbar och enhetlig tillgång till mätdata och nätinformation för att kunna prissätta tjänster korrekt.
        </li>
      </ul>
    </div>
  );
};