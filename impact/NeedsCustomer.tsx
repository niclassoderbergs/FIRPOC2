import React from 'react';
import { Users } from 'lucide-react';
import { styles } from './styles';

export const NeedsCustomer: React.FC = () => {
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
        <Users size={24} color="#36b37e" />
        Kundnytta och rättvisa
      </h3>
      <p style={styles.paragraph}>
        Slutkundens position på marknaden måste stärkas genom enkelhet, transparens och nationell likabehandling:
      </p>
      <ul style={{ ...styles.paragraph, paddingLeft: '20px' }}>
        <li id="KN1" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>KN1: Geografisk likabehandling:</strong> Kundens möjlighet till snabba leverantörsbyten och deltagande på flexibilitetsmarknaden ska vara oberoende av bostadsort. Tekniska skillnader mellan nätområden får inte begränsar kundens valfrihet.
        </li>
        <li id="KN2" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>KN2: Digital kontroll och fullmakter:</strong> Det krävs en standardiserad hantering där kunden via ett centralt gränssnitt kan styra vem som har tillgång till deras data. Detta inkluderar hantering av fullmakter vid leverantörsbyten, vilket eliminerar manuella ledtider och ökar säkerheten.
        </li>
        <li id="KN3" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>KN3: Samlad överblick över energianvändning:</strong> Kunden behöver en möjlighet att se all sin energianvändning samlat på ett ställe, oberoende av nätägare eller elleverantör. Detta ger konsumenter med anläggningar i olika delar av landet (t.ex. villa och fritidshus) ökad kontroll.
        </li>
        <li id="KN4" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>KN4: Stärkt kundskydd och informerade val:</strong> För att öka tryggheten krävs transparens kring avtalsvillkor. Genom att tillgängliggöra information om bindningstider, uppsägningsvillkor och brytavgifter ges kunden verktyg att fatta informerade beslut.
        </li>
        <li id="KN5" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>KN5: Standardiserade kostnadsvillkor:</strong> För en rättvis spelplan behöver dagens varierande avgifter för datatillgång ersättas av en enhetlig modell. Detta motverkar godtyckliga prisskillnader och möjliggör innovativa tjänster på lika villkor i hela landet.
        </li>
      </ul>
    </div>
  );
};