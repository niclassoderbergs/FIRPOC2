
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex114 } from './domain1/brs/brs-flex-114';
import { brsFlex124 } from './domain1/brs/brs-flex-124';
import { brsFlex117 } from './domain1/brs/brs-flex-117';
import { brsFlex127 } from './domain1/brs/brs-flex-127';
import { content114Input, content124Input, content117Output, content127Output } from './content-domain-1';

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
    title Procedure 26: SPU or SPG suspension
    participant SO as System Operator
    participant SMA as SP module administrator
    participant SP as Service Provider
    participant EntP as Entitled party

    Note over SO: 26.1 Request SPU or SPG suspension
    SO->>SMA: Info Item BN: Request suspension (BRS 114/124)
    activate SMA
    
    Note over SMA: 26.2 Validate SPU or SPG suspension request
    
    alt Validation Failed
        SMA-->>SO: Info Item B: Error notification
    else Validation Passed
        Note over SMA: 26.3 Register updated status for the SPG or SPU
        
        Note over SMA: 26.4 Notify about SPU or SPG suspension
        SMA-->>SP: Info Item BO: Notification (BRS 117/127)
        
        Note over SMA: 26.5 Notify about SPU or SPG suspension
        SMA->>EntP: Info Item BO: Notification
    end
    deactivate SMA`;

const steps = [
  { step: "26.1", action: "Request SPU or SPG suspension", description: "The System Operator requests the suspension of an SPU or SPG (e.g. due to technical failure).", producer: "System Operator", receiver: "SP module administrator", infoId: "BN" },
  { step: "26.2", action: "Validate SPU or SPG suspension request", description: "The SP module administrator validates the request.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "26.3", action: "Register updated status for the SPG or SPU", description: "The SP module administrator updates the status to 'Suspended'.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "26.4", action: "Notify about SPU or SPG suspension", description: "The SP module administrator notifies the Service Provider.", producer: "SP module administrator", receiver: "Service Provider", infoId: "BO" },
  { step: "26.5", action: "Notify about SPU or SPG suspension", description: "The SP module administrator notifies other entitled parties.", producer: "SP module administrator", receiver: "Entitled party", infoId: "BO" }
];

const attributesBN = [
  { name: "SPU/SPG identifier", desc: "The resource to suspend." },
  { name: "Reason", desc: "The reason for suspension." }
];

const attributesBO = [
  { name: "SPU/SPG identifier", desc: "The suspended resource." },
  { name: "Status", desc: "New status (Suspended)." },
  { name: "Reason", desc: "Reason for suspension." }
];

const jwgToBrsMapping: Record<string, string> = {
  "SPU/SPG identifier": "SPU-ID / SPG-ID",
  "Reason": "Orsak / Meddelande",
  "Status": "Status"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure26: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  
  const getBrsAttributeBN = (jwgAttrName: string) => {
    let mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    if (jwgAttrName === "Reason") mappedName = "Orsak"; // Input specifikt
    
    // Check 114/124 inputs
    let attr = content114Input.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content124Input.attributes.find(a => mappedName.includes(a.attribute));
    return attr;
  };

  const getBrsAttributeBO = (jwgAttrName: string) => {
    let mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;

    if (jwgAttrName === "Reason") mappedName = "Meddelande"; // Output specifikt i 117/127

    // Check 117/127 outputs
    let attr = content117Output.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content127Output.attributes.find(a => mappedName.includes(a.attribute));
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    if (brsAttrName === "SPU-ID" || brsAttrName === "SPG-ID") return "SPU/SPG identifier";
    if (brsAttrName === "Orsak" || brsAttrName === "Meddelande") return "Reason";
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(25)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(27)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 26: Suspension of SPU or SPG</h1>
      <p style={styles.subHeader}>Tillfällig avstängning av aggregeringsenhet (SPU) eller marknadsgrupp (SPG).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex114.id)}>{brsFlex114.id}: {brsFlex114.title} (SPU Request)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex124.id)}>{brsFlex124.id}: {brsFlex124.title} (SPG Request)</div>
            <div style={{marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic'}}>Notifiering:</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex117.id)}>{brsFlex117.id}: {brsFlex117.title} (SPU Notify)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex127.id)}>{brsFlex127.id}: {brsFlex127.title} (SPG Notify)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BN (Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex114.id} / {brsFlex124.id} Input</th></tr></thead>
          <tbody>
            {attributesBN.map((a, i) => {
              const brsMatch = getBrsAttributeBN(a.name);
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BO (Notification)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex117.id} / {brsFlex127.id} Output</th></tr></thead>
          <tbody>
            {attributesBO.map((a, i) => {
              const brsMatch = getBrsAttributeBO(a.name);
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
        <p style={styles.paragraph}>Specifikation av datamodeller för begäran och notifiering.</p>
        
        {/* Begäran SPU */}
        {renderAttributeTable(`${brsFlex114.id} Input (SPU Request)`, content114Input.attributes, true)}
        {/* Begäran SPG */}
        {renderAttributeTable(`${brsFlex124.id} Input (SPG Request)`, content124Input.attributes, true)}

        {/* Notifiering SPU */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Notifieringar</h3>
        {renderAttributeTable(`${brsFlex117.id} Output (SPU Notification)`, content117Output.attributes, true)}
        {renderAttributeTable(`${brsFlex127.id} Output (SPG Notification)`, content127Output.attributes, true)}

      </section>
    </div>
  );
};
