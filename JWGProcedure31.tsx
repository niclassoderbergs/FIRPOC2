
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex601 } from './domain6/brs/brs-flex-601';
import { brsFlex5210 } from './domain5/brs/brs-flex-5210';
import { brsFlex522 } from './domain5/brs/brs-flex-522';
import { content601Input } from './content-domain-6';
import { content5210Output, content522Output } from './content-domain-5';

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
    title Procedure 31: Baseline data handling
    participant EP as Entitled parties
    participant BC as Baseline calculator (FIS)
    participant BA as Baseline administrator (FIS)

    Note over EP: 31.1 Send necessary data
    EP->>BC: Info Item BX: Necessary data (BRS 601 / DHV)
    
    Note over BC: 31.1 Receive necessary data
    
    Note over BC: 31.2 Determine baseline (BRS 5210)
    
    Note over BC: 31.3 Send the baseline
    BC->>BA: Info Item BB: Baseline data (Internal)
    
    Note over BA: 31.3 Receive the baseline
    
    Note over BA: 31.4 Notify about the baseline data
    BA->>EP: Info Item BB: Baseline data (BRS 522)`;

const steps = [
  { step: "31.1", action: "Send/Receive necessary data", description: "Entitled parties sends necessary data for baselining (e.g. meter data via BRS 601 or from Datahub).", producer: "Entitled parties", receiver: "Baseline calculator (FIS)", infoId: "BX" },
  { step: "31.2", action: "Determine baseline", description: "The Baseline calculator determines the baseline (BRS 5210).", producer: "Baseline calculator (FIS)", receiver: "-", infoId: "-" },
  { step: "31.3", action: "Send/Receive the baseline", description: "The Baseline calculator sends the determined baseline to the administrator (Internal FIS process).", producer: "Baseline calculator (FIS)", receiver: "Baseline administrator (FIS)", infoId: "BB" },
  { step: "31.4", action: "Notify about the baseline data", description: "The Baseline administrator notifies the entitled parties about the baseline data (BRS 522).", producer: "Baseline administrator (FIS)", receiver: "Entitled parties", infoId: "BB" }
];

const attributes = [
  { name: "Resource ID", desc: "The CU or Aggregated object." },
  { name: "Period", desc: "The time period for the baseline." },
  { name: "Time Series", desc: "The calculated or reported baseline values." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Resource ID": "CU-ID",
  "Period": "Period",
  "Time Series": "Tidsserie"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure31: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check input (601) - Mätdata
    let attr = content601Input.attributes.find(a => a.attribute === mappedName);
    
    // Check output (522) - Baseline Result
    if (!attr) {
        if (jwgAttrName === "Time Series") return content522Output.attributes.find(a => a.attribute === "Baseline-tidsserie");
        // Period and CU-ID should match directly in 522
        attr = content522Output.attributes.find(a => a.attribute === mappedName);
    }
    
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    if (brsAttrName === "Baseline-tidsserie" || brsAttrName === "Tidsserie" || brsAttrName === "Baseline-resultat") return "Time Series";
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  const renderAttributeTable = (title: string, data: any[], showMapping = false) => (
    <div style={{marginBottom: '20px'}}>
      <h3 style={styles.subSectionHeader}>{title}</h3>
      <table style={styles.table}>
        <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th>{showMapping && <th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc'}}>JWG Referens</th>}</tr></thead>
        <tbody>
          {data.map((attr, i) => {
            const jwgRef = showMapping ? getJwgReference(attr.attribute) : null;
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(30)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(32)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 31: Baseline data handling</h1>
      <p style={styles.subHeader}>Hantering av baslinedata: Insamling, beräkning och distribution.</p>

      <div style={styles.noteBox}>
        <strong>Implementation Mapping:</strong>
        <ul style={{margin: '8px 0 0 16px', padding: 0}}>
            <li><strong>Steg 31.1 (Indata):</strong> Motsvarar <strong>BRS-FLEX-601</strong> (Undermätning) eller hämtning från Datahub.</li>
            <li><strong>Steg 31.2 (Beräkning):</strong> Motsvarar <strong>BRS-FLEX-5210</strong> (Systemberäkning).</li>
            <li><strong>Steg 31.3 (Internal):</strong> Intern överlämning inom FIS (Calculator &rarr; Administrator).</li>
            <li><strong>Steg 31.4 (Notifiering):</strong> Motsvarar <strong>BRS-FLEX-522</strong> (Notifiering av baseline).</li>
        </ul>
      </div>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex601.id)}>{brsFlex601.id}: {brsFlex601.title} (Input SP)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex5210.id)}>{brsFlex5210.id}: {brsFlex5210.title} (Beräkning)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex522.id)}>{brsFlex522.id}: {brsFlex522.title} (Notifiering)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BX (Input) & BB (Output)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i BRS</th></tr></thead>
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        
        {renderAttributeTable(`${brsFlex601.id} Input (Undermätning från SP)`, content601Input.attributes, true)}
        {renderAttributeTable(`${brsFlex5210.id} Output (Beräkningsresultat)`, content5210Output.attributes, true)}
        {renderAttributeTable(`${brsFlex522.id} Output (Notifiering av Baseline)`, content522Output.attributes, true)}

      </section>
    </div>
  );
};
