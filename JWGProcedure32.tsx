
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex602 } from './domain6/brs/brs-flex-602';
import { brsFlex612 } from './domain6/brs/brs-flex-612';
import { brsFlex622 } from './domain6/brs/brs-flex-622';
import { content602Output, content612Output, content622Output } from './content-domain-6';

const styles = {
  container: { padding: '40px', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' as const },
  header: { fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#172b4d' },
  subHeader: { fontSize: '1.1rem', color: '#5e6c84', marginBottom: '32px' },
  sectionHeader: { fontSize: '1.5rem', fontWeight: 600, marginTop: '48px', marginBottom: '16px', color: '#42526e', borderBottom: '2px solid #ebecf0', paddingBottom: '8px' },
  subSectionHeader: { fontSize: '1.1rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px', color: '#42526e' },
  paragraph: { fontSize: '1rem', lineHeight: '1.6', color: '#333', marginBottom: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontSize: '0.9rem', border: '1px solid #dfe1e6', marginBottom: '24px' },
  th: { backgroundColor: '#f4f5f7', color: '#172b4d', padding: '12px 16px', textAlign: 'left' as const, borderBottom: '2px solid #dfe1e6', fontWeight: 600 },
  td: { padding: '12px 16px', borderBottom: '1px solid #dfe1e6', verticalAlign: 'top' as const, color: '#172b4d', lineHeight: '1.5' },
  backButton: { padding: '8px 16px', backgroundColor: '#e6effc', color: '#0052cc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
  navHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  navButtons: { display: 'flex', gap: '8px' },
  brsBox: { backgroundColor: '#e3fcef', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #006644', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem', display: 'block', marginBottom: '4px' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  noteBox: { backgroundColor: '#fff3cd', border: '1px solid #ffeeba', padding: '12px', borderRadius: '4px', marginBottom: '24px', color: '#856404', fontSize: '0.95rem' }
};

const diagramCode = `sequenceDiagram
    title Procedure 32: Making measurement data available
    participant QDA as Quantification data aggregator
    participant MDA as Metered data administrator
    participant DMDDA as Dedicated measurement device data administrator
    participant NRTDA as Near real-time metering data administrator
    participant CDA as Calculated data administrator

    opt 32.1 Historical Data
        QDA->>MDA: 32.1a Request validated historical metering data (Info BY)
        activate MDA
        MDA->>MDA: 32.1b Validate request
        alt Validation Failed
            MDA-->>QDA: Info B: Error
        else OK
            MDA-->>QDA: 32.1c Send validated historical data (Info CA -> BA1)
        end
        deactivate MDA
    end

    opt 32.2 DMD Data (Sub-metering)
        QDA->>DMDDA: 32.2a Request validated DMD data (Info BZ)
        activate DMDDA
        DMDDA->>DMDDA: 32.2b Validate request
        DMDDA-->>QDA: 32.2c Send validated DMD data (Info CB -> CA1)
        deactivate DMDDA
    end

    opt 32.3 Near Real-time Data
        QDA->>NRTDA: 32.3a Request validated NRT data (Info CA)
        activate NRTDA
        NRTDA->>NRTDA: 32.3b Validate request
        NRTDA-->>QDA: 32.3c Send validated NRT data (Info CC -> CB1)
        deactivate NRTDA
    end

    opt 32.4 Calculated Data
        QDA->>CDA: 32.4a Request calculated data (Info CC)
        activate CDA
        CDA->>CDA: 32.4b Validate request
        CDA-->>QDA: 32.4c Send validated calculated data (Info CD -> CC1)
        deactivate CDA
    end`;

const steps = [
  { step: "32.1", action: "Request/Receive historical metering data", description: "QDA requests validated historical metering data from the Metered data administrator (e.g. from Datahub).", producer: "Quantification data aggregator", receiver: "Metered data administrator", infoId: "BY / CA" },
  { step: "32.2", action: "Request/Receive DMD data", description: "QDA requests validated sub-metering data (Dedicated Measurement Device) from the administrator.", producer: "Quantification data aggregator", receiver: "DMD data administrator", infoId: "BZ / CB" },
  { step: "32.3", action: "Request/Receive near real-time data", description: "QDA requests validated near real-time data.", producer: "Quantification data aggregator", receiver: "Near real-time metering data administrator", infoId: "CA / CC" },
  { step: "32.4", action: "Request/Receive calculated data", description: "QDA requests calculated data (e.g. baseline or theoretical delivery).", producer: "Quantification data aggregator", receiver: "Calculated data administrator", infoId: "CC / CD" }
];

const attributes = [
  { name: "Meter/CU Identification", desc: "Identifier of the measurement point or CU." },
  { name: "Period", desc: "Start and End date/time." },
  { name: "Time Series", desc: "Sequence of measured values." },
  { name: "Quality", desc: "Status of the values (Measured, Estimated, Validated)." }
];

// Data Specification Objects (Referenced in CA, CB, CC, CD)
const attributesDataSpec = [
  { name: "Start timestamp", desc: "Start of the time interval covered." },
  { name: "End timestamp", desc: "End of the time interval covered." },
  { name: "Direction", desc: "Flow direction (Production, Consumption, Combined)." },
  { name: "Energy product", desc: "Type of energy (e.g. Active energy, Reactive energy)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Meter/CU Identification": "Mätpunkts-ID / CU-ID",
  "Period": "Period",
  "Time Series": "Tidsserie / Mätvärdes-tidsserie",
  "Quality": "Kvalitet / Status"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure32: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Search in multiple output definitions
    let attr = content622Output.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content602Output.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content612Output.attributes.find(a => mappedName.includes(a.attribute));
    
    // Fallback for Quality which might be named differently
    if (!attr && jwgAttrName === "Quality") {
        return { attribute: "Kvalitet", description: "Flagga för datakvalitet", article: "-" };
    }

    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key].includes(brsAttrName));
  };

  const renderAttributeTable = (title: string, data: any[], showMapping = false, mappingFn?: (name: string) => string | undefined) => (
    <div style={{marginBottom: '20px'}}>
      <h3 style={styles.subSectionHeader}>{title}</h3>
      <table style={styles.table}>
        <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th>{showMapping && <th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc'}}>JWG Referens</th>}</tr></thead>
        <tbody>
          {data.map((attr, i) => {
            const jwgRef = showMapping ? (mappingFn ? mappingFn(attr.attribute) : getJwgReference(attr.attribute)) : null;
            return (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{attr.attribute}</strong></td>
                <td style={styles.td}>{attr.description}</td>
                {showMapping && <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                  {jwgRef ? <span style={styles.reverseMappingTag}>{jwgRef}</span> : <span style={{color: '#999', fontSize: '0.8rem', fontStyle: 'italic'}}>-</span>}
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(31)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(33)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 32: Making measurement data available</h1>
      <p style={styles.subHeader}>Inhämtning och distribution av mätdata (Historisk, Sub-metering, Närtid, Beräknad) för verifiering.</p>

      <div style={styles.noteBox}>
        <strong>Arkitekturell notering:</strong> JWG specificerar fyra olika dataflöden (Info Items CA, CB, CC, CD). Dessa refererar till underliggande "Data Specification Objects" (BA1, CA1, CB1, CC1) som definierar tekniska detaljer.
      </div>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex622.id)}>{brsFlex622.id}: {brsFlex622.title} (MP Data)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex602.id)}>{brsFlex602.id}: {brsFlex602.title} (CU Data)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex612.id)}>{brsFlex612.id}: {brsFlex612.title} (Calc Data)</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Steg</th><th style={styles.th}>Handling</th><th style={styles.th}>Beskrivning</th><th style={styles.th}>Avsändare</th><th style={styles.th}>Mottagare</th><th style={styles.th}>Info ID</th></tr></thead>
          <tbody>
            {steps.map((s, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{s.step}</strong></td><td style={styles.td}>{s.action}</td><td style={styles.td}>{s.description}</td><td style={styles.td}>{s.producer}</td><td style={styles.td}>{s.receiver}</td><td style={styles.td}><strong>{s.infoId}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll: Info CA, CB, CC, CD</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i BRS-FLEX-6xx</th></tr></thead>
          <tbody>
            {attributes.map((a, i) => {
              const brsMatch = getBrsAttribute(a.name);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong><br/><span style={{fontSize:'0.8rem', color:'#666'}}>{a.desc}</span></td>
                  <td style={styles.td}>{brsMatch ? <span style={styles.mappingTag}>{brsMatch.attribute}</span> : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h3 style={styles.subSectionHeader}>Referenced Data Specifications (BA1, CA1, CB1, CC1)</h3>
        <p style={styles.paragraph}>Dessa objekt inkluderas i svaret och definierar tidsintervall och energityp.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {attributesDataSpec.map((a, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{a.name}</strong></td>
                <td style={styles.td}>{a.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS (Mätpunktsdata - {brsFlex622.id})</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex622.id}.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content622Output.attributes.map((attr, i) => {
              const jwgRef = getJwgReference(attr.attribute);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{attr.attribute}</strong></td>
                  <td style={styles.td}>{attr.description}</td>
                  <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                    {jwgRef ? (
                        <span style={styles.reverseMappingTag}>{jwgRef}</span>
                    ) : (
                        <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.8rem'}}>- (Specifikt för BRS)</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
