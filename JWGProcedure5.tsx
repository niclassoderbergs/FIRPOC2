import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex104 } from './domain1/brs/brs-flex-104';
import { content104Input } from './content-domain-1';
import { content108Output } from './content-domain-1'; // New import for notification

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
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 5: Suspension of CU by an entity party
    participant EP as Entitled Party
    participant CUMA as CU Module Administrator
    participant SP as Service provider
    participant FC as Final customer

    Note over EP: 5.1 Request suspension of CU
    EP->>CUMA: Info Item H: Request (BRS 105)
    activate CUMA
    
    Note over CUMA: 5.2 Validate CU suspension request
    
    alt Validation Failed
        CUMA-->>EP: Info Item B: Request rejected
    else Validation Passed
        Note over CUMA: 5.3 Suspend CU
        
        Note over CUMA: 5.4 Notify about updated CU module data
        CUMA-->>EP: Info Item I: Updated CU data
        
        opt Notify final customer
            Note over CUMA: 5.5 (Conditional) Notify about suspended CU
            CUMA->>FC: Info Item I: Notification
        end
        
        Note over CUMA: 5.6 Notify other parties about CU suspension
        CUMA->>SP: Info Item I: Notification
    end
    deactivate CUMA`;

const steps = [
  { step: "5.1", action: "Request suspension of CU", description: "An entitled party requests the suspension of a Controllable Unit.", producer: "Entitled party", receiver: "CU module administrator", infoId: "H" },
  { step: "5.2", action: "Validate CU suspension request", description: "The CU module administrator validates the request.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "5.3", action: "Suspend CU", description: "The CU module administrator suspends the CU in the system.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "5.4", action: "Notify about updated CU module data", description: "The CU module administrator notifies the requesting entitled party.", producer: "CU module administrator", receiver: "Entitled party", infoId: "I" },
  { step: "5.5", action: "Notify about suspended CU", description: "The CU module administrator notifies the final customer (if applicable).", producer: "CU module administrator", receiver: "Final customer", infoId: "I" },
  { step: "5.6", action: "Notify other parties about CU suspension", description: "The CU module administrator notifies other parties (e.g. Service Provider).", producer: "CU module administrator", receiver: "Service provider", infoId: "I" }
];

const attributes = [
  { name: "CU identification", desc: "The unit to suspend." },
  { name: "Reason for suspension", desc: "Why the unit is being suspended." },
  { name: "Suspension start date", desc: "When the suspension begins." }
];

const jwgToBrsMapping: Record<string, string> = {
  "CU identification": "CU-ID",
  "Reason for suspension": "Orsak",
  "Suspension start date": "Starttid" // Finns i BRS Output (108), inte Input (105)
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure5: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check input object first (105)
    let attr = content104Input.attributes.find(a => a.attribute === mappedName);
    if (attr) return attr;

    // Check output object (108 Notification)
    return content108Output.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(4)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(6)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 5: Suspension of CU by an entity party</h1>
      <p style={styles.subHeader}>Tvingande avstängning av en resurs initierad av en behörig part.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex104.id)}>{brsFlex104.id}: {brsFlex104.title} (Suspend)</div>
            <div style={{fontSize:'0.8rem', marginTop:'4px'}}>Notifiering hanteras via <strong>BRS-FLEX-108</strong>.</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen (Table III.5)</h2>
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
        <h2 style={styles.sectionHeader}>Datainnehåll JWG: Info Item H</h2>
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
        
        {/* Request (105) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Begäran (BRS-FLEX-105)</h3>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content104Input.attributes.map((attr, i) => {
              const jwgRef = getJwgReference(attr.attribute);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{attr.attribute}</strong></td>
                  <td style={styles.td}>{attr.description}</td>
                  <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                    {jwgRef ? (
                        <span style={styles.reverseMappingTag}>{jwgRef}</span>
                    ) : (
                        <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.8rem'}}>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Notifiering (108) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Notifiering (BRS-FLEX-108)</h3>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content108Output.attributes.map((attr, i) => {
              const jwgRef = getJwgReference(attr.attribute);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{attr.attribute}</strong></td>
                  <td style={styles.td}>{attr.description}</td>
                  <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                    {jwgRef ? (
                        <span style={styles.reverseMappingTag}>{jwgRef}</span>
                    ) : (
                        <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.8rem'}}>-</span>
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