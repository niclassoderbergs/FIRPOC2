
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex6110 } from './domain6/brs/brs-flex-6110';
import { brsFlex613 } from './domain6/brs/brs-flex-613';
import { content6110Input, content613Output } from './content-domain-6';

const styles = {
  container: { padding: '40px', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' as const },
  header: { fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#172b4d' },
  subHeader: { fontSize: '1.1rem', color: '#5e6c84', marginBottom: '32px' },
  sectionHeader: { fontSize: '1.5rem', fontWeight: 600, marginTop: '48px', marginBottom: '16px', color: '#42526e', borderBottom: '2px solid #ebecf0', paddingBottom: '8px' },
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
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 33: Quantification
    participant EP as Entitled Party
    participant QR as Quantification responsible
    participant QDA as Quantification data aggregator
    participant BA as Baseline administrator

    Note over EP: 33.1 Request activation period
    EP->>QR: Info Item CD: Activation period
    
    Note over QR: 33.2 Validate activation period request
    Note over QR: 33.3 Receive activation period
    
    par Metered Data
        Note over QR: 33.4 Request validated data
        QR->>QDA: Info Item CE: Request
        Note over QDA: 33.5 Validate request
        Note over QDA: 33.6 Send validated data
        QDA->>QR: Info Item BA: Metered data
    and Baseline Data
        Note over QR: 33.7 Request baseline
        QR->>BA: Info Item CF: Request
        Note over BA: 33.8 Validate request
        Note over BA: 33.9 Send baseline data
        BA->>QR: Info Item BB: Baseline data
    end
    
    Note over QR: 33.10 Quantify the requested volume
    
    Note over QR: 33.11 Notify the quantified volume
    QR->>EP: Info Item BB: Quantified Volume`;

const steps = [
  { step: "33.1", action: "Request activation period", description: "The entitled party (e.g. SP or TSO) initiates the quantification by identifying the activation period.", producer: "Entitled Party", receiver: "Quantification responsible", infoId: "CD" },
  { step: "33.4", action: "Request/Receive validated metered data", description: "QR requests aggregated metered data for the period.", producer: "Quantification responsible", receiver: "Quantification data aggregator", infoId: "CE / BA" },
  { step: "33.7", action: "Request/Receive baseline data", description: "QR requests the baseline for the period.", producer: "Quantification responsible", receiver: "Baseline administrator", infoId: "CF / BB" },
  { step: "33.10", action: "Quantify the requested volume", description: "The Quantification responsible calculates the volume (typically Baseline - Measured).", producer: "Quantification responsible", receiver: "-", infoId: "-" },
  { step: "33.11", action: "Notify the quantified volume", description: "The calculated volume is distributed to the entitled party.", producer: "Quantification responsible", receiver: "Entitled Party", infoId: "BB" }
];

const attributes = [
  { name: "Activation ID", desc: "Identifier of the activation." },
  { name: "Period", desc: "The period for quantification." },
  { name: "Metered Data", desc: "Input: Measured values." },
  { name: "Baseline Data", desc: "Input: Baseline values." },
  { name: "Quantified Volume", desc: "Output: The calculated flexibility volume." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Activation ID": "Aktiverings-ID",
  "Period": "Period", // eller Start/Slut
  "Metered Data": "Tidsserie", // Input till 6110
  "Baseline Data": "Baseline-tidsserie", // Input till 6110 (om än implicit via systemuppslag)
  "Quantified Volume": "Volym-tidsserie" // Output från 613
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure33: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Input (6110 - Internal Calculation Trigger/Process)
    let attr = content6110Input.attributes.find(a => a.attribute === mappedName);
    
    // Check Output (613 - Notification)
    if (!attr) attr = content613Output.attributes.find(a => a.attribute === mappedName);
    
    // Special handling for inputs to calculation not explicitly in 6110Input definition but implied
    if (!attr && (jwgAttrName === "Metered Data" || jwgAttrName === "Baseline Data")) {
         return { attribute: mappedName, description: "Inputdata för beräkning", article: "-" };
    }

    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(32)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(34)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 33: Quantification</h1>
      <p style={styles.subHeader}>Beräkning av levererad flexibilitetsvolym (Quantification).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex6110.id)}>{brsFlex6110.id}: {brsFlex6110.title} (Beräkning)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex613.id)}>{brsFlex613.id}: {brsFlex613.title} (Notifiering)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex6110.id} / {brsFlex613.id}</th></tr></thead>
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS (Resultat - {brsFlex613.id})</h2>
        <p style={styles.paragraph}>Följande attribut ingår i notifieringen av resultatet.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content613Output.attributes.map((attr, i) => {
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
