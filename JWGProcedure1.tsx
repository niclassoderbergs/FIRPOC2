
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex103 } from './domain1/brs/brs-flex-103'; // ID: 104
import { content103Input, content103Output } from './content-domain-1';

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
  infoBox: { backgroundColor: '#fff7d6', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #ffab00', marginBottom: '24px' },
  brsBox: { backgroundColor: '#e3fcef', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #006644', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem', display: 'block', marginBottom: '4px' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 1: General access to CU master data
    participant EP as Entitled Party
    participant CUMA as CU Module Administrator

    Note over EP: 1.1 Request for CU master data
    EP->>CUMA: Info Item A: Request (BRS 104)
    activate CUMA
    
    Note over CUMA: 1.2 Validate CU master data request
    
    alt Validation Failed
        CUMA-->>EP: Info Item B: Validation Result (Invalid)
    else Validation Passed
        Note over CUMA: 1.3 Send list of CU master data
        CUMA-->>EP: Info Item C: List of CU master data
        Note over EP: 1.3 Receive list of CU master data
    end
    deactivate CUMA`;

const steps = [
  { step: "1.1", action: "Request for CU master data", description: "An entitled party requests to receive the CU master data for all the CUs that are registered in the Flexibility information system and linked to the requesting entitled party.", producer: "Entitled party", receiver: "CU module administrator", infoId: "A" },
  { step: "1.2", action: "Validate CU master data request", description: "The CU module administrator validates whether the information request is permitted or not and provides a meaningful indication in case of an invalid request.", producer: "CU module administrator", receiver: "Entitled party", infoId: "B" },
  { step: "1.3", action: "Send list of CU master data", description: "The CU module administrator sends back the requested information from the flexibility information system.", producer: "CU module administrator", receiver: "Entitled party", infoId: "C" }
];

// JWG Info Item Definitions

const attributesInfoA = [
  { name: "Entitled party identification", desc: "Identity of the requester to validate permissions." },
  { name: "CU identification", desc: "Optional. Specific CU to retrieve." },
  { name: "Search criteria", desc: "Optional filters (e.g. per grid area)." }
];

const attributesInfoB = [
  { name: "Request Status", desc: "Result of validation (OK / Invalid)." },
  { name: "Rejection Reason", desc: "Details if the request is denied (e.g. Unauthorized)." }
];

const attributesInfoC = [
  { name: "CU module", desc: "Identification of a flexibility information system module." },
  { name: "CU identification", desc: "Nationally unique identification of the controllable unit." },
  { name: "Service provider", desc: "If the controllable unit is assigned to a service provider, the identification of the service provider." },
  { name: "Service delivery status", desc: "An indication whether the CU is Operational or Suspended." },
  { name: "Accounting point identifier(s)", desc: "Identifier of the accounting point(s) the controllable unit has an impact on." },
  { name: "Locational information", desc: "Optional. Information about the location of the connection point of the CU. For example, metering grid area." },
  { name: "Technical characteristics", desc: "Information on technical characteristics of CU (e.g. minimum and maximum capacity of a battery, ramp-up times, etc.)" },
  { name: "Data exchange standard implemented", desc: "If applicable, the reference to the information exchange standard implemented by the controllable unit." },
  { name: "Customer connection point identifier", desc: "Identifier of the customer connection point the controllable unit is connected to." },
  { name: "Metering configuration characteristics", desc: "CU measured by DMD, smart metering system or Calculated data method." },
  { name: "Active time period", desc: "Time period when the CU is active." }
];

const jwgToBrsMapping: Record<string, string> = {
  // Common
  "CU identification": "CU-ID",
  "Service provider": "Ägare",
  
  // Info A
  "Search criteria": "Filterkriterier",
  
  // Info C
  "Service delivery status": "Status",
  "Accounting point identifier(s)": "Anläggnings-ID",
  "Technical characteristics": "Tekniska attribut",
  "Customer connection point identifier": "Mätpunkts-ID", 
  "Metering configuration characteristics": "Mätkonfiguration",
  "Active time period": "Aktiv tidsperiod",
  "Locational information": "Mätpunkts-ID"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure1: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  
  // Helper to find BRS attribute from JWG name
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Input
    let attr = content103Input.attributes.find(a => a.attribute === mappedName);
    if (attr) return attr;

    // Check Output
    return content103Output.attributes.find(a => a.attribute === mappedName);
  };

  // Helper to find JWG name from BRS attribute name (Reverse lookup)
  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  const renderJwgTable = (title: string, data: any[], brsId: string | null) => (
    <div style={{marginBottom: '24px'}}>
        <h3 style={styles.subSectionHeader}>{title} {brsId && <span style={{fontSize:'0.8rem', fontWeight:'normal', color:'#666'}}>(Kopplat till {brsId})</span>}</h3>
        <table style={styles.table}>
          <thead><tr><th style={{...styles.th, width: '30%'}}>JWG Attribut</th><th style={{...styles.th, width: '35%'}}>Beskrivning</th><th style={{...styles.th, width: '35%'}}>Motsvarighet i BRS</th></tr></thead>
          <tbody>
            {data.map((a, i) => {
              const brsMatch = getBrsAttribute(a.name);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong></td>
                  <td style={styles.td}>{a.desc}</td>
                  <td style={styles.td}>{brsMatch ? <span style={styles.mappingTag}>{brsMatch.attribute}</span> : <span style={{color: '#999', fontSize: '0.8rem', fontStyle: 'italic'}}>-</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  );

  const renderAttributeTable = (title: string, data: any[]) => (
    <div style={{marginBottom: '20px'}}>
      <h3 style={styles.subSectionHeader}>{title}</h3>
      <table style={styles.table}>
        <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc'}}>JWG Referens</th></tr></thead>
        <tbody>
          {data.map((attr, i) => {
            const jwgRef = getJwgReference(attr.attribute);
            return (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{attr.attribute}</strong></td>
                <td style={styles.td}>{attr.description}</td>
                <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                  {jwgRef ? <span style={styles.reverseMappingTag}>{jwgRef}</span> : <span style={{color: '#999', fontSize: '0.8rem', fontStyle: 'italic'}}>-</span>}
                </td>
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
            <button style={{...styles.backButton, opacity: 0.5, cursor: 'default'}} disabled>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(2)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 1: General access to Controllable Unit master data</h1>
      <p style={styles.subHeader}>Beskrivning av informationsutbytet för åtkomst till CU-stamdata av en berättigad part.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex103.id)} title="Gå till BRS-dokumentation">{brsFlex103.id}: {brsFlex103.title}</div>
            <div style={{marginTop: '4px', fontSize: '0.9rem'}}>{brsFlex103.purpose}</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <div style={styles.infoBox}><strong>Pre-condition:</strong> The entitled party has the permission to access to the requested data in the flexibility information system.</div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen (Table III.1)</h2>
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
        <h2 style={styles.sectionHeader}>Datainnehåll JWG</h2>
        <p style={styles.paragraph}>Nedan specificeras datainnehållet för de olika informationsstegen i diagrammet.</p>
        
        {renderJwgTable("Info Item A: Request for CU master data", attributesInfoA, brsFlex103.id)}
        {renderJwgTable("Info Item B: Validation Result", attributesInfoB, null)}
        {renderJwgTable("Info Item C: List of CU master data", attributesInfoC, brsFlex103.id)}
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex103.id}.</p>
        
        {renderAttributeTable(`Input (${content103Input.title})`, content103Input.attributes)}
        {renderAttributeTable(`Output (${content103Output.title})`, content103Output.attributes)}
      </section>
    </div>
  );
};
