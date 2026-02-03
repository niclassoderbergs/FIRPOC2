
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex811 } from './domain8/brs/brs-flex-811';
import { brsFlex814 } from './domain8/brs/brs-flex-814';
import { brsFlex2040 } from './domain2/brs/brs-flex-2040';
import { content811Input, content814Output } from './content-domain-8';
import { content204Input } from './content-domain-2';

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
    title Procedure 17: Revocation of service provider
    participant PSO as Procuring system operator
    participant SMA as SP module administrator
    participant SP as Service provider
    participant EP as Entitled party

    Note over PSO: 17.1 Request revocation of SP
    PSO->>SMA: Info Item AO: Request revocation
    activate SMA
    
    Note over SMA: 17.2 Validate SP revocation request
    
    alt Validation Failed
        SMA-->>PSO: Info Item B: Validation failed
    else Validation Passed
        Note over SMA: 17.3 Register revocation (BRS 823)
        
        Note over SMA: 17.3b Terminate contracts (BRS 2030)
        SMA->>SMA: Terminate all SP contracts
        
        Note over SMA: 17.4 Notify about SP revocation (BRS 829)
        SMA-->>SP: Notification
        
        Note over SMA: 17.5 Notify affected parties
        SMA->>EP: Info Item AP: Notification
    end
    deactivate SMA`;

const steps = [
  { step: "17.1", action: "Request revocation of SP", description: "The procuring system operator requests revocation of a Service Provider (forced termination).", producer: "Procuring system operator", receiver: "SP module administrator", infoId: "AO" },
  { step: "17.2", action: "Validate SP revocation request", description: "The SP module administrator validates the request.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "17.3", action: "Register revocation", description: "The SP module administrator registers the revocation in the system, terminating the SP account.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "17.3b", action: "Terminate contracts", description: "System terminates all active flexibility contracts for the SP.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "17.4", action: "Notify about SP revocation", description: "The SP module administrator notifies the Service Provider about the revocation.", producer: "SP module administrator", receiver: "Service provider", infoId: "-" },
  { step: "17.5", action: "Notify affected parties", description: "The entitled parties are notified about the revocation.", producer: "SP module administrator", receiver: "Entitled party", infoId: "AP" }
];

const attributes = [
  { name: "SP identifier", desc: "Identification of the service provider to be revoked." },
  { name: "Reason", desc: "Reason for the revocation (e.g. breach of contract)." },
  { name: "Revocation date", desc: "Date when the revocation becomes effective." }
];

const jwgToBrsMapping: Record<string, string> = {
  "SP identifier": "SP-ID",
  "Reason": "Orsak",
  "Revocation date": "Avslutsdatum"
};

const jwgToBrsMappingRequest: Record<string, string> = {
  "SP identifier": "SP-ID",
  "Reason": "Orsak/Laglig grund",
  "Revocation date": "Avslutsdatum"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure17: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMappingRequest[jwgAttrName];
    if (!mappedName) return null;
    return content811Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    let key = Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
    if(key) return key;
    return Object.keys(jwgToBrsMappingRequest).find(key => jwgToBrsMappingRequest[key] === brsAttrName);
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(16)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(18)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 17: Revocation of service provider</h1>
      <p style={styles.subHeader}>Tvingande avregistrering (Revocation) initierad av upphandlande systemoperatör.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex811.id)}>{brsFlex811.id}: {brsFlex811.title} (Request)</div>
            <div style={{marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic'}}>Systemprocesser:</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex2040.id)}>{brsFlex2040.id}: {brsFlex2040.title} (Cleanup contracts)</div>
            <div style={{marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic'}}>Notifiering:</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex814.id)}>{brsFlex814.id}: {brsFlex814.title} (Notify SP)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AO (Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex811.id}</th></tr></thead>
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
        
        {/* 1. Begäran (823) */}
        {renderAttributeTable(`${brsFlex811.id} Input: ${content811Input.title}`, content811Input.attributes, true)}

        {/* 2. Kontraktshantering (2030) */}
        {renderAttributeTable(`${brsFlex2040.id} Input: ${content204Input.title}`, content204Input.attributes, false)}

        {/* 3. Notifiering (829) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Notifiering till SP</h3>
        <p style={{fontSize:'0.9rem', color: '#666', marginBottom:'12px'}}>
            Systemgenererad notifiering till SP om att kontot stängts (Info Item - Notification).
        </p>
        {renderAttributeTable(`${brsFlex814.id} Output: ${content814Output.title}`, content814Output.attributes, true)}

      </section>
    </div>
  );
};
