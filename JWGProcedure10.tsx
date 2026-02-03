
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex202 } from './domain2/brs/brs-flex-202';
import { content202Input } from './content-domain-2';

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
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 10: Service contract termination by service provider
    participant FC as Final Customer
    participant SP as Service Provider
    participant CUMA as CU Module Administrator
    participant EP as Entitled parties

    Note over SP: 10.1 Send contract termination message
    SP->>FC: Info Item R: Termination message

    Note over SP: 10.2 Request to remove the assignment of the CU
    SP->>CUMA: Info Item S: Request removal (BRS 203)
    activate CUMA
    
    Note over CUMA: 10.3 Validate request to remove assignment
    
    alt Request validation failed
        CUMA-->>SP: Info Item B: Validation failed
    else Request validation passed
        Note over CUMA: 10.4 Execute removal of the CU unassignment
        
        Note over CUMA: 10.5 Send removal of CU assignment
        CUMA-->>SP: Info Item S: Confirmation
        
        Note over CUMA: 10.6 Notify about contractless CU
        CUMA->>EP: Info Item U: Notification
        
        opt Notify final customer?
            Note over CUMA: 10.7 Notify contract termination
            CUMA->>FC: Info Item V: Notification
        end
    end
    deactivate CUMA

    opt Notify final customer?
        Note over SP: 10.8 (Conditional) Notify contract termination
        SP->>FC: Info Item V: Notification
    end`;

const steps = [
  { step: "10.1", action: "Send contract termination message", description: "The Service Provider informs the Final Customer about the contract termination.", producer: "Service provider", receiver: "Final customer", infoId: "R" },
  { step: "10.2", action: "Request to remove the assignment of the CU", description: "The SP requests CUMA to remove the link between SP and CU.", producer: "Service provider", receiver: "CU Module Administrator", infoId: "S" },
  { step: "10.3", action: "Validate request to remove assignment of the CU", description: "CUMA validates the request.", producer: "CU Module Administrator", receiver: "-", infoId: "-" },
  { step: "10.4", action: "Execute removal of the CU unassignment", description: "CUMA performs the unassignment.", producer: "CU Module Administrator", receiver: "-", infoId: "-" },
  { step: "10.5", action: "Send removal of CU assignment", description: "CUMA confirms the removal to the Service Provider.", producer: "CU Module Administrator", receiver: "Service provider", infoId: "S" },
  { step: "10.6", action: "Notify about contractless CU", description: "CUMA notifies entitled parties that the CU is now contractless.", producer: "CU Module Administrator", receiver: "Entitled parties", infoId: "U" },
  { step: "10.7", action: "Notify contract termination", description: "Conditional: CUMA notifies the Final Customer.", producer: "CU Module Administrator", receiver: "Final customer", infoId: "V" },
  { step: "10.8", action: "Notify contract termination", description: "Conditional: SP notifies the Final Customer (if not done in 10.1 or 10.7).", producer: "Service provider", receiver: "Final customer", infoId: "V" }
];

const attributes = [
  { name: "CU identification", desc: "The resource to unassign." },
  { name: "Contract End Date", desc: "The date when the contract ends." }
];

const jwgToBrsMapping: Record<string, string> = {
  "CU identification": "CU-ID",
  "Contract End Date": "Slutdatum"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure10: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return content202Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(9)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(11)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 10: Service contract termination by service provider</h1>
      <p style={styles.subHeader}>Tjänsteleverantören (SP) avslutar avtalet (Uppsägning).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex202.id)}>{brsFlex202.id}: {brsFlex202.title}</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info S (Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex202.id}</th></tr></thead>
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
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex202.id} (InfoObject: {content202Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content202Input.attributes.map((attr, i) => {
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
