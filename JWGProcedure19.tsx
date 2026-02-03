
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex321 } from './domain3/brs/brs-flex-321'; // ID: BRS-FLEX-331
import { brsFlex322 } from './domain3/brs/brs-flex-322'; // ID: BRS-FLEX-339
import { brsFlex323 } from './domain3/brs/brs-flex-323'; // ID: BRS-FLEX-332
import { brsFlex324 } from './domain3/brs/brs-flex-324'; // ID: BRS-FLEX-338
import { content321Input, content324Output } from './content-domain-3';

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
    title Procedure 19: SPU or SPG grid pre-qualification
    participant EP as Entitled party (SP)
    participant FIS as FIS
    participant GPQC as Grid PQ coordinator (DSO)

    Note over EP: 19.1 Request grid prequalification
    EP->>FIS: Info Item AS: Request (BRS 331)
    activate FIS
    
    FIS->>GPQC: Notify Grid PQ Request (BRS 339)
    activate GPQC
    
    Note over GPQC: 19.2 Execute grid pre-qualification coordination
    
    GPQC->>FIS: Report Result (BRS 332)
    deactivate GPQC
    
    Note over FIS: 19.3 Send grid pre-qualification results
    FIS-->>EP: Info Item AT: Result (BRS 338)
    deactivate FIS`;

const steps = [
  { step: "19.1", action: "Request grid prequalification", description: "The entitled party requests a grid pre-qualification for an SPU or SPG.", producer: "Entitled party", receiver: "FIS", infoId: "AS" },
  { step: "19.2", action: "Execute grid pre-qualification coordination", description: "The Grid PQ coordinator (DSO) performs the analysis based on data from FIS.", producer: "Grid PQ coordinator", receiver: "-", infoId: "-" },
  { step: "19.3", action: "Send/Receive grid pre-qualification results", description: "FIS sends the result to the entitled party.", producer: "FIS", receiver: "Entitled party", infoId: "AT" }
];

const attributes = [
  { name: "SPU/SPG identifier", desc: "Resource to check." },
  { name: "Grid area", desc: "Implied by connection point." },
  { name: "Status", desc: "Result of qualification (AT)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "SPU/SPG identifier": "SPU-ID / CU-ID", // Matchar attribut i BRS-FLEX-331
  "Grid area": "Nätområde-ID",
  "Status": "Status"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure19: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check request (BRS 331 / Input 321)
    let attr = content321Input.attributes.find(a => a.attribute === mappedName);
    if (attr) return attr;

    // Check result notification (BRS 338 / Output 324)
    return content324Output.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    // Special handling for mapping
    if (brsAttrName === "SPU-ID / CU-ID") return "SPU/SPG identifier";
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(18)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(20)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 19: SPU or SPG grid pre-qualification</h1>
      <p style={styles.subHeader}>Nätförkvalificering av resurser (Grid PQ).</p>

      <div style={styles.noteBox}>
        <strong>Implementation Mapping:</strong>
        <ul style={{margin: '8px 0 0 16px', padding: 0}}>
            <li><strong>Steg 19.1 (Request):</strong> Motsvarar <strong>{brsFlex321.id}</strong> (SP begär).</li>
            <li><strong>Steg 19.2 (Coordination):</strong> Hanteras via <strong>{brsFlex322.id}</strong> (Notify DSO) och <strong>{brsFlex323.id}</strong> (DSO svarar).</li>
            <li><strong>Steg 19.3 (Result):</strong> Motsvarar <strong>{brsFlex324.id}</strong> (FIS notifierar SP).</li>
        </ul>
      </div>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex321.id)}>{brsFlex321.id}: {brsFlex321.title}</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex322.id)}>{brsFlex322.id}: {brsFlex322.title}</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex323.id)}>{brsFlex323.id}: {brsFlex323.title}</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex324.id)}>{brsFlex324.id}: {brsFlex324.title}</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AS (Request) & AT (Result)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i BRS</th></tr></thead>
          <tbody>
            {attributes.map((a, i) => {
              const brsMatch = getBrsAttribute(a.name);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong></td>
                  <td style={styles.td}>{brsMatch ? <span style={styles.mappingTag}>{brsMatch.attribute}</span> : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        
        {/* Request */}
        {renderAttributeTable(`${brsFlex321.id} Input (Request)`, content321Input.attributes, true)}

        {/* Result */}
        {renderAttributeTable(`${brsFlex324.id} Output (Result Notification)`, content324Output.attributes, true)}

      </section>
    </div>
  );
};
