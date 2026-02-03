
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex207 } from './domain2/brs/brs-flex-207';
import { content207Input } from './content-domain-2';

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
    title Procedure 12: Cancellation of SP registration on CU
    participant FC as Final customer
    participant SP as Service provider (new)
    participant CUMA as CU module operator
    participant AP as Affected Party

    Note over FC: 12.1 Request cancellation of new service provider contract
    FC->>SP: Info Item AF: Request cancellation
    
    Note over SP: 12.2 Validate request
    Note over SP: 12.3 Validate registration status (not active yet)
    
    alt Request Valid
        Note over SP: 12.4 Request cancellation of new contract in CU module
        SP->>CUMA: Info Item AG: Cancellation request
        activate CUMA
        
        Note over CUMA: 12.5 Validate cancellation request
        
        alt Validation Failed
            CUMA-->>SP: Info Item B: Cancellation request failed
        else Validation Passed
            opt Permission needed?
                CUMA->>FC: 12.7a Request permission
                FC-->>CUMA: 12.7c Notify permission
            end
            
            Note over CUMA: 12.10 Cancel the pending registration of SP on CU
            
            par Notify SP
                Note over CUMA: 12.8 Send SP on cancellation request result
                CUMA-->>SP: Info Item AH: Result
            and Notify Affected
                Note over CUMA: 12.11 Notify about cancellation of registration
                CUMA->>AP: Info Item AI: Notification
            end
        end
        deactivate CUMA
        
        Note over SP: 12.12 Cancel contract
        Note over SP: 12.13 Notify about cancellation of contract
        SP->>FC: Info Item AJ: Notification
        
    else Request Invalid
        SP-->>FC: Info Item B: Contract cancellation validation failed
    end`;

const steps = [
  { step: "12.1", action: "Request cancellation of new service provider contract", description: "The Final Customer requests the New SP to cancel the contract (Regret).", producer: "Final customer", receiver: "Service provider (new)", infoId: "AF" },
  { step: "12.2", action: "Validate request", description: "The SP validates the customer's request.", producer: "Service provider (new)", receiver: "-", infoId: "-" },
  { step: "12.3", action: "Validate registration status", description: "SP checks if the CU module is not registered yet (or pending).", producer: "Service provider (new)", receiver: "-", infoId: "-" },
  { step: "12.4", action: "Request cancellation of new contract in the CU module", description: "The SP requests CUMA to cancel the pending registration.", producer: "Service provider (new)", receiver: "CU module operator", infoId: "AG" },
  { step: "12.5", action: "Validate cancellation request", description: "CUMA validates the request (e.g. checks deadlines).", producer: "CU module operator", receiver: "-", infoId: "-" },
  { step: "12.7", action: "Manage Permission", description: "Conditional: CUMA obtains permission from Final Customer if required.", producer: "CU module operator", receiver: "Final customer", infoId: "-" },
  { step: "12.8", action: "Send SP on cancellation request result", description: "CUMA confirms the cancellation to the SP.", producer: "CU module operator", receiver: "Service provider (new)", infoId: "AH" },
  { step: "12.10", action: "Cancel the pending registration of SP on CU", description: "CUMA executes the cancellation in the system.", producer: "CU module operator", receiver: "-", infoId: "-" },
  { step: "12.11", action: "Notify about cancellation of registration of SP on CU", description: "CUMA notifies affected parties (e.g. Old SP, BRP).", producer: "CU module operator", receiver: "Affected Party", infoId: "AI" },
  { step: "12.12", action: "Cancel contract", description: "The SP cancels the contract internally.", producer: "Service provider (new)", receiver: "-", infoId: "-" },
  { step: "12.13", action: "Notify about cancellation of contract", description: "The SP confirms the cancellation to the Final Customer.", producer: "Service provider (new)", receiver: "Final customer", infoId: "AJ" }
];

const attributes = [
  { name: "Contract/CU identifier", desc: "The pending agreement to cancel." },
  { name: "Cancellation date", desc: "Date of cancellation request." },
  { name: "Reason", desc: "Reason code (e.g. Regret)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Contract/CU identifier": "Flexibilitetsavtals-ID / CU-ID",
  "Cancellation date": "Hävningsdatum",
  "Reason": "Orsak"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure12: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;

    if (jwgAttrName === "Contract/CU identifier") {
        return { 
            attribute: "Flexibilitetsavtals-ID / CU-ID", 
            description: "Identifiering av avtalet och/eller resursen.", 
            article: "-" 
        };
    }

    return content207Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    if (brsAttrName === "Flexibilitetsavtals-ID" || brsAttrName === "CU-ID") {
        return "Contract/CU identifier";
    }
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(11)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(13)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 12: Cancellation of SP registration on CU</h1>
      <p style={styles.subHeader}>Annullering av pågående registrering/byte (Ångerrätt/Regret) innan startdatum.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex207.id)}>{brsFlex207.id}: {brsFlex207.title}</div>
            <div style={{fontSize:'0.8rem', marginTop:'4px'}}>Hanterar systemsteget (12.4) där SP begär annullering hos CUMA.</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AG (Cancellation Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex207.id}</th></tr></thead>
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
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex207.id} (InfoObject: {content207Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content207Input.attributes.map((attr, i) => {
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
