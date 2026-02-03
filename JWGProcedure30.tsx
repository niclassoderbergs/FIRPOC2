
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex401 } from './domain4/brs/brs-flex-401';
import { brsFlex402 } from './domain4/brs/brs-flex-402';
import { brsFlex403 } from './domain4/brs/brs-flex-403';
import { content401Input, content401Output, content402Input, content403Output } from './content-domain-4';

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
    title Procedure 30: (conditional) Temporary limits
    participant SO as System operator
    participant TLA as Temporary limit administrator
    participant EP as Entitled party

    Note over SO: 30.1 Execute temporary limit determination (BRS 401)
    
    Note over SO: 30.2 Send temporary limit
    SO->>TLA: Info Item BW: Temporary limit (BRS 402)
    
    Note over TLA: 30.2 Receive temporary limit
    
    Note over TLA: 30.3 Notify temporary limit
    TLA->>EP: Info Item BW: Temporary limit (BRS 403)`;

const steps = [
  { step: "30.1", action: "Execute temporary limit determination", description: "The System operator determines that a temporary limit is needed due to grid constraints. (Supported by BRS-FLEX-401)", producer: "System operator", receiver: "-", infoId: "-" },
  { step: "30.2", action: "Send/Receive temporary limit", description: "The System operator sends the limit to the Administrator (FIS). (BRS-FLEX-402)", producer: "System operator", receiver: "Temporary limit administrator", infoId: "BW" },
  { step: "30.3", action: "Notify temporary limit", description: "The Administrator notifies relevant Entitled parties (Service Providers) about the limit. (BRS-FLEX-403)", producer: "Temporary limit administrator", receiver: "Entitled party", infoId: "BW" }
];

const attributes = [
  { name: "Grid Resource Identifier", desc: "The accounting point or system element affected." },
  { name: "Limit Value", desc: "The maximum allowed power (kW/MW) or other constraint." },
  { name: "Direction", desc: "Injection or Withdrawal." },
  { name: "Period", desc: "Start and end time for the limitation." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Grid Resource Identifier": "Systemelement-ID / Mätpunkts-ID",
  "Limit Value": "Maximal inmatning", // Also covers Maximalt uttag
  "Direction": "Maximal inmatning", // Implied by which field is used (input vs output)
  "Period": "Starttid" // And Sluttid
};

// Mapping för 401
const jwgToBrsMapping401: Record<string, string> = {
  "Grid Resource Identifier": "Mätpunkts-ID", // Output från 401
  "Grid Area Identifier": "Nätområdes-ID" // Input till 401
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure30: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    let attr = content402Input.attributes.find(a => a.attribute === mappedName);
    if (!attr && jwgAttrName === "Period") {
         return { attribute: "Starttid / Sluttid", description: "Period för begränsningen", article: "Art 50" };
    }
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    if (brsAttrName === "Maximal inmatning" || brsAttrName === "Maximalt uttag") return "Limit Value / Direction";
    if (brsAttrName === "Starttid" || brsAttrName === "Sluttid") return "Period";
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  const getJwgReference401 = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping401).find(key => jwgToBrsMapping401[key] === brsAttrName);
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(29)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(31)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 30: (conditional) Temporary limits</h1>
      <p style={styles.subHeader}>Hantering av tillfälliga nätbegränsningar (Temporary Limits) initierade av Systemoperatören (DSO/TSO).</p>

      <div style={styles.noteBox}>
        <strong>Implementation Mapping:</strong>
        <ul style={{margin: '8px 0 0 16px', padding: 0}}>
            <li><strong>Steg 30.1 (Determination):</strong> Stöds av <strong>BRS-FLEX-401</strong> där DSO hämtar underlag (resurslista) för analys.</li>
            <li><strong>Steg 30.2 (Send limit):</strong> Motsvarar <strong>BRS-FLEX-402</strong> där DSO registrerar begränsningen i FIS.</li>
            <li><strong>Steg 30.3 (Notify):</strong> Motsvarar <strong>BRS-FLEX-403</strong> där FIS notifierar berörd SP.</li>
        </ul>
      </div>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex401.id)}>{brsFlex401.id}: {brsFlex401.title} (30.1)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex402.id)}>{brsFlex402.id}: {brsFlex402.title} (30.2)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex403.id)}>{brsFlex403.id}: {brsFlex403.title} (30.3)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BW (Temporary limit)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex402.id} / {brsFlex403.id}</th></tr></thead>
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
        
        {renderAttributeTable(`${brsFlex401.id} (Underlag för Determination)`, content401Input.attributes.concat(content401Output.attributes), true, getJwgReference401)}
        {renderAttributeTable(`${brsFlex402.id} (Registrering)`, content402Input.attributes, true)}
        {renderAttributeTable(`${brsFlex403.id} (Notifiering)`, content403Output.attributes, true)}

      </section>
    </div>
  );
};
