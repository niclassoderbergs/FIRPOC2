import React from 'react';
import { BarChart4 } from 'lucide-react';
import { styles } from './styles';

export const NeedsSystemUtility: React.FC = () => {
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
        <BarChart4 size={24} color="#ff991f" />
        System- och samhällsnytta
      </h3>
      <p style={styles.paragraph}>
        För att trygga systemdriften och minimera samhällskostnaderna behöver de systemansvariga (TSO/DSO) verktyg för aktiv styrning och data av hög kvalitet:
      </p>
      <ul style={{ ...styles.paragraph, paddingLeft: '20px' }}>
        <li id="SN1" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>SN1: Kvalitetssäkrad flexibilitet och driftsäkerhet:</strong> Det finns ett behov av centraliserad nätförkvalificering och realtidsvalidering för att säkerställa att flexibilitetsresurser inte aktiveras på ett sätt som skadar nätet eller förvärrar lokala flaskhalsar.
        </li>
        <li id="SN2" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>SN2: Regulatorisk avräkning:</strong> En fungerande marknad kräver transparent och icke-diskriminerande beräkning av aktiverade volymer enligt europeiska krav. Detta minskar risken för tvister och ökar förtroendet.
        </li>
        <li id="SN3" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>SN3: Bättre prognoser och flowbase-beräkningar:</strong> Ett enhetligt dataunderlag ger högre precision i dygnsplaner och möjliggör exaktare flowbase-beräkningar, vilket leder till effektivare nätutnyttjande och mer korrekta elpriser.
        </li>
        <li id="SN4" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>SN4: Koordinerad resursanvändning:</strong> Infrastrukturen måste möjliggöra koordination mellan TSO och DSO för att förhindra motstridiga aktiveringsorder som kan hota systembalansen.
        </li>
        <li id="SN5" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>SN5: Marknadstillit och skalbarhet:</strong> En central infrastruktur med hög datakvalitet är nödvändig för att bygga förtroende, sänka riskpremierna och möjliggöra uppskalning av flexibilitetsmarknaden till lägsta possible samhällskostnad.
        </li>
        <li id="SN6" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>SN6: Samhällsekonomisk effektivitet ("Build Once"):</strong> Genom att implementera nya regulatoriska krav en gång centralt, istället för lokalt hos varje part, elimineras ineffektivitet. En centraliserad arkitektur säkerställer enhetlig teknisk standard och snabbare anpassning till framtida EU-regleringar.
        </li>
      </ul>
    </div>
  );
};