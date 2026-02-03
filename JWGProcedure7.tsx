
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex801 } from './domain8/brs/brs-flex-801';
import { content801Input } from './content-domain-8';

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
    title Procedure 7: Service Provider Registration
    participant SP as Service Provider
    participant SPMO as SP Module Operator
    participant EP as Eligible Party

    Note over SP: 7.1 Request registration
    SP->>SPMO: Info Item L: Request (BRS 801)
    activate SPMO
    
    Note over SPMO: 7.2 Validate registration request
    
    alt Request Validation Failed
        SPMO-->>SP: Info Item B: Request rejected
    else Request Validation Passed
        Note over SPMO: 7.3 Send credentials
        SPMO-->>SP: Info Item M: Credentials
        
        Note over SP: 7.4 Request update of profile information
        SP->>SPMO: Info Item N: Profile information
        
        Note over SPMO: 7.5 Validate the request to update profile information
        
        alt Profile Validation Failed
            SPMO-->>SP: Info Item B: Profile validation failed
        else Profile Validation Passed
            Note over SPMO: 7.6 Verify profile
            
            alt Verification Failed
                SPMO-->>SP: Info Item B: Verification failed
            else Verification Passed
                Note over SPMO: 7.7 Notify about successful SP registration
                SPMO-->>SP: Info Item O: Registration confirmation
                
                Note over SPMO: 7.8 Notify about new registered service provider
                SPMO->>EP: Info Item N: New SP notification
            end
        end
    end
    deactivate SPMO`;

const steps = [
  { step: "7.1", action: "Request registration", description: "The service provider requests registration.", producer: "Service provider", receiver: "SP Module operator", infoId: "L" },
  { step: "7.2", action: "Validate registration request", description: "The SP module operator validates the request.", producer: "SP Module operator", receiver: "-", infoId: "-" },
  { step: "7.3", action: "Send credentials", description: "The SP module operator sends credentials to the service provider.", producer: "SP Module operator", receiver: "Service provider", infoId: "M" },
  { step: "7.4", action: "Request update of profile information", description: "The service provider provides detailed profile information.", producer: "Service provider", receiver: "SP Module operator", infoId: "N" },
  { step: "7.5", action: "Validate the request to update profile information", description: "The SP module operator validates the profile data.", producer: "SP Module operator", receiver: "-", infoId: "-" },
  { step: "7.6", action: "Verify profile", description: "The SP module operator verifies the profile.", producer: "SP Module operator", receiver: "-", infoId: "-" },
  { step: "7.7", action: "Notify about successful SP registration", description: "The SP module operator confirms the registration to the service provider.", producer: "SP Module operator", receiver: "Service provider", infoId: "O" },
  { step: "7.8", action: "Notify about new registered service provider", description: "The SP module operator notifies eligible parties about the new service provider.", producer: "SP Module operator", receiver: "Eligible party", infoId: "N" }
];

const attributes = [
  { name: "Service provider name", desc: "Official name." },
  { name: "Service provider coding scheme", desc: "E.g. EIC, GS1." },
  { name: "Service provider code", desc: "Unique code." },
  { name: "Role", desc: "Role requested." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Service provider name": "Företagsnamn",
  "Service provider code": "Organisationsnummer", // Eller Ediel-ID
  "Role": "Roll"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure7: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return content801Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(6)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(8)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 7: Registration of a Service Provider</h1>
      <p style={styles.subHeader}>Onboarding och profilverifiering av ny aktör.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex801.id)}>{brsFlex801.id}: {brsFlex801.title}</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Registration Request (Info L)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex801.id}</th></tr></thead>
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
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex801.id} (InfoObject: {content801Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content801Input.attributes.map((attr, i) => {
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
