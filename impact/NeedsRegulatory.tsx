import React from 'react';
import { Globe } from 'lucide-react';
import { styles } from './styles';

export const NeedsRegulatory: React.FC = () => {
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
        <Globe size={24} color="#6554c0" />
        Regulatoriska behov
      </h3>
      <p style={styles.paragraph}>
        Den svenska elmarknaden står inför omfattande legala krav drivna av EU:s "Clean Energy Package" och efterföljande teknisk lagstiftning. Det finns ett kritiskt behov av att harmonisera nationella processer med följande regelverk:
      </p>
      <ul style={{ ...styles.paragraph, paddingLeft: '20px' }}>
        <li id="RB1" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>RB1: Elmarknadsdirektivet (EU 2019/944):</strong> Ställer krav på att medlemsstaterna etablerar moderna och effektiva ramverk för datautbyte för att möjliggöra innovation och stärka kundens ställning.
        </li>
        <li id="RB2" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>RB2: Interoperabilitet (EU 2023/1162):</strong> Förordningen kräver icke-diskriminerande åtkomst till mätdata. 
          <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fff', borderRadius: '6px', borderLeft: '3px solid #6554c0', fontSize: '0.95rem' }}>
            <em>Analys:</em> Vid implementering av kravet på datadelning tvingades 170 nätägare utveckla egna lokala lösningar kopplade till sina "Mina sidor". Detta är ett tydligt exempel på den typ av ineffektivitet som <strong>regeringsuppdraget</strong> avser att lösa genom att föreslå ett centraliserat datahanteringsverktyg, så att marknaden inte behöver upprepa kostsamma och tekniskt spretiga lösningar för att uppfylla kommande EU-krav.
          </div>
        </li>
        <li id="RB3" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>RB3: Kommande förordning om leverantörsbyten:</strong> EU rör sig mot krav på <strong>24-timmars leverantörsbyte</strong>. Marknaden har ett omedelbart behov av processer som kan hantera denna snabbhet utan manuella ledtider hos 170 olika nätägare.
        </li>
        <li id="RB4" style={{ marginBottom: '12px', scrollMarginTop: '100px' }}>
          <strong>RB4: Kommande förordning om efterfrågeflexibilitet (NC DR):</strong> Det legala behovet omfattar ett nationellt ramverk för kvalificering, aggregering och verifiering av flexibilitet. Nätkoden ställer uttryckliga krav på etablerandet av ett <strong>nationellt flexibilitetsregister</strong>. Detta kräver en infrastruktur som kan hantera komplexa relationer mellan resurser, aggregatorer och nätområden i enlighet med de nya europeiska nätföreskrifterna.
        </li>
      </ul>
    </div>
  );
};