
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex812 } from './domain8/brs/brs-flex-812';
import { brsFlex815 } from './domain8/brs/brs-flex-815';
import { content812Input, content815Output } from './content-domain-8';

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
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 18: Reactivation service provider
    participant SO as System Operator
    participant SMA as SP module administrator
    participant SP as Service provider
    participant FC as Final customer
    participant EP as Entitled party

    Note over SO: 18.1 Request re-activation of SP
    SO->>SMA: Info Item AQ: Request re-activation
    activate SMA
    
    Note over SMA: 18.2 Validate the re-activation request
    
    alt Validation Failed
        SMA-->>SO: Info Item B: Validation failed
    else Validation Passed
        Note over SMA: 18.3 Register re-activation (BRS 816)
        
        Note over SMA: 18.4 Notify SP (BRS 817)
        SMA-->>SP: Notification
        
        opt Notify final customer
            Note over SMA: 18.5 (Conditional) Notify about SP re-activation
            SMA->>FC: Info Item AR: Notification
        end
        
        Note over SMA: 18.6 Notify about SP re-activation
        SMA->>EP: Info Item AR: Notification
    end
    deactivate SMA`;

const steps = [
  { step: "18.1", action: "Request re-activation of SP", description: "The System Operator requests re-activation of a Service Provider (lifting suspension).", producer: "System Operator", receiver: "SP module administrator", infoId: "AQ" },
  { step: "18.2", action: "Validate the re-activation request", description: "The SP module administrator validates the request.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "18.3", action: "Register re-activation", description: "The SP module administrator registers the re-activation in the system.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "18.4", action: "Notify SP", description: "The Service Provider is notified about the re-activation.", producer: "SP module administrator", receiver: "Service provider", infoId: "-" },
  { step: "18.5", action: "Notify about SP re-activation (Conditional)", description: "The final customer is notified if applicable.", producer: "SP module administrator", receiver: "Final customer", infoId: "AR" },
  { step: "18.6", action: "Notify about SP re-activation", description: "Other entitled parties are notified.", producer: "SP module administrator", receiver: "Entitled party", infoId: "AR" }
];

const attributes = [
  { name: "SP identifier", desc: "Identification of the service provider to be re-activated." },
  { name: "Reason", desc: "Reason for re-activation (e.g. issues resolved)." },
  { name: "Re-activation date", desc: "Date when the re-activation becomes effective." }
];

const jwgToBrsMapping: Record<string, string> = {
  "SP identifier": "SP-ID",
  "Reason": "Orsak",
  "Re-activation date": "Återaktiveringsdatum"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure18: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return content812Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(17)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(19)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 18: Reactivation service provider</h1>
      <p style={styles.subHeader}>Återaktivering av tjänsteleverantör efter suspendering.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex812.id)}>{brsFlex812.id}: {brsFlex812.title} (Request)</div>
            <div style={{marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic'}}>Notifiering:</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex815.id)}>{brsFlex815.id}: {brsFlex815.title}</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AQ (Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex812.id}</th></tr></thead>
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
        <p style={styles.paragraph}>Nedan specificeras datainnehållet för samtliga involverade BRS-transaktioner i denna procedur.</p>
        
        {/* 1. Begäran (816) */}
        {renderAttributeTable(`${brsFlex812.id} Input: ${content812Input.title}`, content812Input.attributes, true)}

        {/* 2. Notifiering (817) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Notifiering till SP</h3>
        <p style={{fontSize:'0.9rem', color: '#666', marginBottom:'12px'}}>
            Systemgenererad notifiering till SP (Info Item - Notification).
        </p>
        {renderAttributeTable(`${brsFlex815.id} Output: ${content815Output.title}`, content815Output.attributes, true)}

      </section>
    </div>
  );
};
