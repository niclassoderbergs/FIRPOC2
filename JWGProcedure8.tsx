
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex802 } from './domain8/brs/brs-flex-802';
import { content802Input, content802Output } from './content-domain-8';

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
    title Procedure 8: Service Provider application for qualification
    participant SP as Service provider
    participant SPMO as SP Module Operator
    participant PSO as Procuring system operator

    Note over SP: 8.1 Request service provider qualification
    SP->>SPMO: Info Item P: Request (BRS 807)
    activate SPMO
    
    Note over SPMO: 8.2 Validate qualification request
    
    alt Request validation failed
        SPMO-->>SP: Info Item B: Request rejected
    else Request validation passed
        Note over SPMO: 8.3 Register service provider qualification request
        
        Note over SPMO: 8.4 Request to process service provider application for qualification
        SPMO->>PSO: Info Item P: Request
        activate PSO
        
        Note over PSO: 8.5 Execute service provider qualifications
        
        Note over PSO: 8.6 Update status when changed
        PSO->>SPMO: Info Item Q: Status update
        deactivate PSO
        
        Note over SPMO: 8.7 Acknowledge the updated status
        SPMO-->>PSO: Info Item B: Acknowledgement
        
        Note over SPMO: 8.8 Register updated status
        
        Note over SPMO: 8.9 Notify qualification status
        SPMO->>SP: Info Item Q: Status notification
    end
    deactivate SPMO`;

const steps = [
  { step: "8.1", action: "Request service provider qualification", description: "The service provider requests qualification.", producer: "Service provider", receiver: "SP Module Operator", infoId: "P" },
  { step: "8.2", action: "Validate qualification request", description: "The SP Module Operator validates the request.", producer: "SP Module Operator", receiver: "-", infoId: "-" },
  { step: "8.3", action: "Register service provider qualification request", description: "The SP Module Operator registers the request.", producer: "SP Module Operator", receiver: "-", infoId: "-" },
  { step: "8.4", action: "Request to process service provider application for qualification", description: "The SP Module Operator forwards the request to the Procuring System Operator.", producer: "SP Module Operator", receiver: "Procuring system operator", infoId: "P" },
  { step: "8.5", action: "Execute service provider qualifications", description: "The Procuring System Operator performs the qualification.", producer: "Procuring system operator", receiver: "-", infoId: "-" },
  { step: "8.6", action: "Update status when changed", description: "The Procuring System Operator updates the qualification status.", producer: "Procuring system operator", receiver: "SP Module Operator", infoId: "Q" },
  { step: "8.7", action: "Acknowledge the updated status", description: "The SP Module Operator acknowledges the update.", producer: "SP Module Operator", receiver: "Procuring system operator", infoId: "B" },
  { step: "8.8", action: "Register updated status", description: "The SP Module Operator registers the new status.", producer: "SP Module Operator", receiver: "-", infoId: "-" },
  { step: "8.9", action: "Notify qualification status", description: "The SP Module Operator notifies the Service Provider about the status.", producer: "SP Module Operator", receiver: "Service provider", infoId: "Q" }
];

const attributes = [
  { name: "Service provider", desc: "ID of SP." },
  { name: "Qualification type", desc: "Type of qualification." },
  { name: "Documents", desc: "Proof of compliance." },
  { name: "Qualification status", desc: "Result (Qualified/Rejected)." },
  { name: "Validity period", desc: "If applicable." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Service provider": "SP-ID",
  "Qualification type": "Kvalificeringstyp",
  "Documents": "Dokumentation",
  "Qualification status": "Status",
  "Validity period": "Giltighetsperiod"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure8: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Input first
    let attr = content802Input.attributes.find(a => a.attribute === mappedName);
    if (attr) return attr;

    // Check Output
    return content802Output.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(7)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(9)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 8: Service Provider application for qualification</h1>
      <p style={styles.subHeader}>Ansökan om kvalificering för SP.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex802.id)}>{brsFlex802.id}: {brsFlex802.title}</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info P (Request) & Q (Status)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex802.id}</th></tr></thead>
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
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex802.id} (InfoObject: {content802Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content802Input.attributes.map((attr, i) => {
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
