
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex102 } from './domain1/brs/brs-flex-102';
import { brsFlex1040 } from './domain1/brs/brs-flex-1040';
import { content102Input, content102Output } from './content-domain-1';

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
    title Procedure 3: Update CU information
    participant RegP as CU registration responsible
    participant CUMA as CU Module administrator
    participant FC as Final customer
    participant DSO as Connecting system operator
    participant EP as Entitled party

    Note over RegP: 3.1 Request CU update
    RegP->>CUMA: Info Item C: Request (BRS 102)
    activate CUMA
    
    Note over CUMA: 3.2 Validate CU update request
    
    alt Validation Failed (Request rejected)
        CUMA-->>RegP: Info Item B: Request rejected
    else Validation Passed
        opt Permission needed?
            CUMA->>FC: 3.3a Request permission
            FC->>FC: 3.3b Validate permission
            FC-->>CUMA: Permission Result
            alt Permission Failed
                CUMA-->>RegP: Info Item B: Permission failed
            else Permission Granted
                CUMA-->>RegP: 3.3c Notify about permission (Info Item B)
            end
        end
        
        opt Grid qualification needed?
            CUMA->>DSO: 3.4a Request CU grid prequalification (Info Item C)
            DSO->>DSO: 3.4b Validate CU grid prequalification
            DSO-->>CUMA: Grid Result
            
            alt Grid Qualification Failed
                CUMA-->>RegP: Info Item B: Grid qualification failed
            else Grid Qualification Done
                CUMA-->>RegP: 3.4c Notify about CU grid prequalification result (Info Item B)
            end
        end
        
        Note over CUMA: 3.5 Store updated controllable unit data
        
        Note over CUMA: 3.6 Notify about updated CU module data
        CUMA-->>RegP: Info Item C: Updated module data
        
        Note over CUMA: 3.7 Notify about updated CU master data
        CUMA->>EP: Info Item C: Updated master data
    end
    deactivate CUMA`;

const steps = [
  { step: "3.1", action: "Request CU update", description: "The CU registration responsible requests to update the CU information.", producer: "CU registration responsible", receiver: "CU module administrator", infoId: "C" },
  { step: "3.2", action: "Validate CU update request", description: "The CU module administrator validates the request.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "3.3a", action: "Request permission", description: "If permission is needed, CUMA requests it from the Final Customer.", producer: "CU module administrator", receiver: "Final customer", infoId: "-" },
  { step: "3.3c", action: "Notify about permission", description: "CUMA notifies the registration responsible about the permission status.", producer: "CU module administrator", receiver: "CU registration responsible", infoId: "B" },
  { step: "3.4a", action: "Request CU grid prequalification", description: "If needed, CUMA requests grid prequalification from DSO.", producer: "CU module administrator", receiver: "Connecting system operator", infoId: "C" },
  { step: "3.4c", action: "Notify about CU grid prequalification result", description: "CUMA notifies registration responsible about grid qualification result.", producer: "CU module administrator", receiver: "CU registration responsible", infoId: "B" },
  { step: "3.5", action: "Store updated controllable unit data", description: "CUMA stores the updated CU data.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "3.6", action: "Notify about updated CU module data", description: "CUMA notifies registration responsible that data is updated.", producer: "CU module administrator", receiver: "CU registration responsible", infoId: "C" },
  { step: "3.7", action: "Notify about updated CU master data", description: "CUMA notifies entitled parties about the update.", producer: "CU module administrator", receiver: "Entitled party", infoId: "C" }
];

const attributes = [
  { name: "CU identification", desc: "Identify the CU to update." },
  { name: "Updated attributes", desc: "List of attributes with new values." },
  { name: "Effective date", desc: "Date when the update becomes effective." }
];

const attributesInfoB = [
  { name: "CU identification", desc: "Unique identifier of the CU." },
  { name: "Status", desc: "Result of the request (e.g. Permission Granted, Grid Qualified)." },
  { name: "Result details", desc: "Additional details (e.g. constraints)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "CU identification": "CU-ID",
  "Updated attributes": "Maximal aktiv effekt", // Exempel
  "Effective date": "Giltig från",
  "Status": "Status",
  "Result details": "Information" 
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure3: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Input
    let attr = content102Input.attributes.find(a => a.attribute === mappedName);
    if (attr) return attr;

    // Check Output
    return content102Output.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(2)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(4)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 3: Update CU information</h1>
      <p style={styles.subHeader}>Uppdatering av attribut för en existerande resurs (inklusive behörighets- och nätkontroll).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex102.id)}>{brsFlex102.id}: {brsFlex102.title}</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex1040.id)}>{brsFlex1040.id}: {brsFlex1040.title}</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <section>
        <h2 style={styles.sectionHeader}>Processflöde</h2>
        <div style={{overflowX: 'auto'}}>
            <MermaidDiagram chart={diagramCode} />
        </div>
      </section>

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
        <h2 style={styles.sectionHeader}>Datainnehåll: Update Request (Info C)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex102.id}</th></tr></thead>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Notification / Result (Info B)</h2>
        <p style={styles.paragraph}>Svar och notifieringar som skickas tillbaka till initiativtagaren (RegP).</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex102.id} Output</th></tr></thead>
          <tbody>
            {attributesInfoB.map((a, i) => {
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS-FLEX-102 (SP-initierad)</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex102.id} (InfoObject: {content102Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content102Input.attributes.map((attr, i) => {
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
