
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex205 } from './domain2/brs/brs-flex-205';
import { brsFlex208 } from './domain2/brs/brs-flex-208';
import { content205Output, content208Input } from './content-domain-2';

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
    title Procedure 9: Service contract revocation by final customer
    participant FC as Final customer
    participant SP as Service provider
    participant CUMA as CU module administrator
    participant MPA as Metering point administrator
    participant EP as Entitled party

    alt Explicit (Customer Request)
        Note over FC: 9.1 Request contract termination
        FC->>SP: Info Item R: Request
        
        Note over SP: 9.2 Validate and acknowledge request
        
        alt Request Validation Failed
            SP-->>FC: Info Item B: Request validation failed
        else Request Validation Passed
            Note over SP: 9.3 Request to remove the assignment of the CU
            SP->>CUMA: Info Item S: Request
            activate CUMA
            
            Note over CUMA: 9.4 Validate explicit request
            
            alt Request Validation Failed
                CUMA-->>SP: Info Item B: Request validation failed
            else Request Validation Passed
                Note over CUMA: 9.7 Execute removal of CU assignment
                
                Note over CUMA: 9.10 Send removal of CU assignment
                CUMA-->>SP: Info Item S: Confirmation
                
                opt Notify contract revocation?
                    Note over CUMA: 9.9 (conditional) Notify contract revocation
                    CUMA->>SP: Info Item V: Notification (BRS 209)
                end
                
                opt Notify final customer?
                    Note over SP: 9.11 (conditional) Notify about contractless CU
                    SP->>FC: Info Item V: Notification
                end
            end
            deactivate CUMA
        end

    else Implicit (e.g. Move Out)
        Note over MPA: 9.5 Request to process change of accounting point entitlement
        MPA->>CUMA: Info Item T: Request (BRS 208)
        activate CUMA
        
        Note over CUMA: 9.6 Validate request to process change...
        
        alt Request Validation Failed
            CUMA-->>MPA: Info Item B: Request validation failed
        else Request Validation Passed
            Note over CUMA: 9.7 Execute removal of CU assignment
            
            Note over CUMA: 9.8 Notify about contractless CU
            CUMA->>EP: Info Item U: Notification
            
            opt Notify contract revocation?
                Note over CUMA: 9.9 (conditional) Notify contract revocation
                CUMA->>SP: Info Item V: Notification (BRS 209)
            end
        end
        deactivate CUMA
    end`;

const steps = [
  { step: "9.1", action: "Request contract termination", description: "Explicit: The final customer requests the Service Provider to terminate the contract.", producer: "Final customer", receiver: "Service provider", infoId: "R" },
  { step: "9.2", action: "Validate and acknowledge contract termination request", description: "The Service Provider validates the customer's request.", producer: "Service provider", receiver: "-", infoId: "-" },
  { step: "9.3", action: "Request to remove the assignment of the CU", description: "The SP requests CUMA to remove the CU assignment (terminate agreement).", producer: "Service provider", receiver: "CU module administrator", infoId: "S" },
  { step: "9.4", action: "Validate explicit request...", description: "CUMA validates the SP's request to remove assignment.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "9.5", action: "Request to process change of accounting point entitlement", description: "Implicit: Metering Point Administrator (e.g. Datahub) notifies CUMA of a change (e.g. move-out).", producer: "Metering point administrator", receiver: "CU module administrator", infoId: "T" },
  { step: "9.6", action: "Validate request to process change...", description: "CUMA validates the entitlement change request.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "9.7", action: "Execute removal of CU assignment", description: "CUMA removes the assignment between CU and SP.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "9.8", action: "Notify about contractless CU", description: "CUMA notifies entitled parties (e.g. BRP) that the CU is now contractless.", producer: "CU module administrator", receiver: "Entitled party", infoId: "U" },
  { step: "9.9", action: "Notify contract revocation", description: "Conditional: CUMA notifies the SP about the revocation (common in implicit flow).", producer: "CU module administrator", receiver: "Service provider", infoId: "V" },
  { step: "9.10", action: "Send removal of CU assignment", description: "CUMA confirms the removal to the SP (Explicit flow).", producer: "CU module administrator", receiver: "Service provider", infoId: "S" },
  { step: "9.11", action: "Notify about contractless CU", description: "Conditional: SP notifies the Final Customer.", producer: "Service provider", receiver: "Final customer", infoId: "V" }
];

const attributes = [
  { name: "Explicit: CU identification", desc: "Resource affected." },
  { name: "Explicit: Contract End Date", desc: "Requested termination date." },
  { name: "Implicit: Accounting Point", desc: "The point where entitlement changed." },
  { name: "Implicit: Event Date", desc: "Date of change (e.g. move out)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Explicit: CU identification": "Anläggnings-ID", // I 208 används Anläggnings-ID för uppslag
  "Explicit: Contract End Date": "Slutdatum",
  "Implicit: Accounting Point": "Anläggnings-ID",
  "Implicit: Event Date": "Slutdatum"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure9: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Implicit/Explicit Trigger (BRS 208)
    let attr = content208Input.attributes.find(a => a.attribute === mappedName);
    
    // Check Notification (BRS 209)
    if (!attr) attr = content205Output.attributes.find(a => a.attribute === mappedName);

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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(8)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(10)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 9: Service contract revocation by final customer</h1>
      <p style={styles.subHeader}>Avslut av flexibilitetsavtal initierat av kund (Explicit) eller via systemhändelse som utflytt (Implicit).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex208.id)}>{brsFlex208.id}: {brsFlex208.title} (Via DHV)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex205.id)}>{brsFlex205.id}: {brsFlex205.title} (Notifiering)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Request Info (S & T)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex208.id} / 209</th></tr></thead>
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS-FLEX-208 (Input från DHV)</h2>
        <p style={styles.paragraph}>Attribut som skickas från Datahubben vid slutkundsinitierat avslut.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content208Input.attributes.map((attr, i) => {
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

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS-FLEX-209 (Notifiering till SP)</h2>
        <p style={styles.paragraph}>Attribut som skickas till SP vid tvingande avslut.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content205Output.attributes.map((attr, i) => {
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
