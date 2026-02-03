
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex105 } from './domain1/brs/brs-flex-105';
import { content105Input } from './content-domain-1';
import { content107Output } from './content-domain-1';

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
    title Procedure 6: Re-activation of CU
    participant EP as Entitled Party
    participant CUMA as CU Module Administrator
    participant DSO as Connecting System Operator
    participant FC as Final Customer
    participant AP as Affected party

    Note over EP: 6.1 Request re-activation of CU
    EP->>CUMA: Info Item J: Request (BRS 107)
    activate CUMA
    
    Note over CUMA: 6.2 Validate CU re-activation request
    
    alt Validation Failed
        CUMA-->>EP: Info Item B: Request rejected
    else Validation Passed
        opt Grid qualification needed?
            Note over CUMA: 6.3a (conditional) Request CU grid prequalification
            CUMA->>DSO: Info Item C: Request
            activate DSO
            Note over DSO: 6.3b Validate CU grid qualification
            DSO-->>CUMA: Info Item B: Qualification result
            deactivate DSO
            
            Note over CUMA: 6.3c Notify CU Grid prequalification result
            
            alt Grid qualification failed
                CUMA-->>EP: Info Item B: Grid qualification failed
            end
        end
        
        Note over CUMA: 6.4 Re-activate CU
        
        opt Notify final customer?
            Note over CUMA: 6.5 (conditional) Notify re-activated CU
            CUMA->>FC: Info Item K: Notification
        end
        
        Note over CUMA: 6.6 Notify about updated CU module data
        CUMA-->>EP: Info Item K: Notification
        
        Note over CUMA: 6.7 Notify other parties about CU re-activation
        CUMA->>AP: Info Item K: Notification
    end
    deactivate CUMA`;

const steps = [
  { step: "6.1", action: "Request re-activation of CU", description: "An entitled party requests to re-activate a suspended Controllable Unit.", producer: "Entitled party", receiver: "CU module administrator", infoId: "J" },
  { step: "6.2", action: "Validate CU re-activation request", description: "The CU module administrator validates the request.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "6.3", action: "Manage grid qualification", description: "If needed, CUMA requests grid qualification from the Connecting System Operator.", producer: "CU module administrator", receiver: "Connecting system operator", infoId: "C" },
  { step: "6.4", action: "Re-activate CU", description: "The CU module administrator sets the CU status to active.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "6.5", action: "Notify re-activated CU", description: "If applicable, the Final Customer is notified about the re-activation.", producer: "CU module administrator", receiver: "Final customer", infoId: "K" },
  { step: "6.6", action: "Notify about updated CU module data", description: "The CU module administrator notifies the requesting party about the re-activation.", producer: "CU module administrator", receiver: "Entitled party", infoId: "K" },
  { step: "6.7", action: "Notify other parties about CU re-activation", description: "The CU module administrator notifies other affected parties.", producer: "CU module administrator", receiver: "Affected party", infoId: "K" }
];

const attributes = [
  { name: "CU identification", desc: "The unit to reactivate." },
  { name: "Start time", desc: "When the unit becomes active again." }
];

const jwgToBrsMapping: Record<string, string> = {
  "CU identification": "CU-ID",
  "Start time": "Giltig från"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure6: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  // Logic to find attributes in BRS-FLEX-107 (Input) and BRS-FLEX-109 (Notification Output)
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Look in Request first (107)
    let found = content105Input.attributes.find(a => a.attribute === mappedName);
    if (found) return found;

    // Look in Notification (109)
    return content107Output.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(5)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(7)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 6: Re-activation of a Controllable Unit</h1>
      <p style={styles.subHeader}>Återaktivering av en tidigare suspenderad resurs.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex105.id)}>{brsFlex105.id}: {brsFlex105.title}</div>
            <div style={{fontSize:'0.8rem', marginTop: '4px'}}>Samt BRS-FLEX-106 (System) och BRS-FLEX-109 (SP notifieras om uppdaterad CU).</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen (Table III.6)</h2>
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
        <h2 style={styles.sectionHeader}>Datainnehåll JWG: Info Item J & K</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex105.id} / 109</th></tr></thead>
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS-FLEX-107 (Request)</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex105.id} (InfoObject: {content105Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content105Input.attributes.map((attr, i) => {
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

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS-FLEX-109 (SP notifieras om uppdaterad CU)</h2>
        <p style={styles.paragraph}>Följande attribut ingår i notifieringen {content107Output.title}.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content107Output.attributes.map((attr, i) => {
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
