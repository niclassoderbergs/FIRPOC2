
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex315 } from './domain3/brs/brs-flex-315';
import { brsFlex330 } from './domain3/brs/brs-flex-330';
import { brsFlex317 } from './domain3/brs/brs-flex-317';
import { brsFlex318 } from './domain3/brs/brs-flex-318';
import { brsFlex312 } from './domain3/brs/brs-flex-312';
import { brsFlex313 } from './domain3/brs/brs-flex-313';
import { content315Input, content330Output, content317Input, content318Input, content312Input, content313Output } from './content-domain-3';

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
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  noteBox: { backgroundColor: '#fff3cd', border: '1px solid #ffeeba', padding: '12px', borderRadius: '4px', marginBottom: '24px', color: '#856404', fontSize: '0.95rem' }
};

const diagramCode = `sequenceDiagram
    title Procedure 20: SPG or SPU product pre-qualification
    participant TSO as Activation responsible (TSO)
    participant SP as Service provider
    participant FIS as Product PQ responsible (FIS)
    participant EP as Entitled parties

    Note over FIS: 20.1 Send info about start
    FIS->>SP: Info Item AU: Start notification (BRS 330)
    
    opt Additional Data
        Note over SP: 20.2 Send technical data
        SP->>FIS: Info Item AV: Technical data (BRS 317)
    end
    
    Note over FIS: 20.3 Execute product pre-qualification
    
    opt Activation Test
        Note over FIS: 20.4a Request activation test
        FIS->>TSO: Info Item AW: Request test (BRS 315)
        
        Note over TSO: 20.4b Execute activation test (BRS 318)
        
        Note over TSO: 20.4c Send activation test result
        TSO-->>FIS: Info Item B: Test result (BRS 312)
    end
    
    Note over FIS: 20.5 Execute SPU/SPG confirmation
    
    Note over FIS: 20.6 Notification of result
    FIS->>EP: Info Item AY: Qualification result
    FIS->>SP: Info Item AY: Qualification result (BRS 313)`;

const steps = [
  { step: "20.1", action: "Send/Receive information about start", description: "System notifies SP that technical phase has started.", producer: "FIS", receiver: "Service provider", infoId: "AU" },
  { step: "20.2", action: "Send technical data", description: "SP provides parameters for the test.", producer: "Service provider", receiver: "FIS", infoId: "AV" },
  { step: "20.3", action: "Execute product pre-qualification", description: "System validates data.", producer: "FIS", receiver: "-", infoId: "-" },
  { step: "20.4a", action: "Request activation test", description: "TSO initiates the test phase.", producer: "FIS/TSO", receiver: "Activation responsible", infoId: "AW" },
  { step: "20.4b", action: "Execute activation test", description: "The physical test is performed.", producer: "Activation responsible", receiver: "-", infoId: "-" },
  { step: "20.4c", action: "Send activation test result", description: "TSO reports the outcome.", producer: "Activation responsible", receiver: "FIS", infoId: "B" },
  { step: "20.5", action: "Execute SPU or SPG confirmation", description: "Final assessment.", producer: "FIS", receiver: "-", infoId: "-" },
  { step: "20.6", action: "Notification of the result", description: "Final result sent to SP.", producer: "FIS", receiver: "Service Provider", infoId: "AY" }
];

// Definition of JWG Info Items
const attributesAU = [
  { name: "Qualification Process ID", desc: "Unique identifier for the qualification case." },
  { name: "Start Status", desc: "Indication that the technical phase has begun." },
  { name: "Instruction", desc: "Request for technical data/test plan." }
];

const attributesAV = [
  { name: "Qualification Process ID", desc: "Reference to the case." },
  { name: "Technical Characteristics", desc: "Ramp rates, duration, recovery time, etc." },
  { name: "Test Plan", desc: "Proposal for physical activation test." }
];

const attributesAW = [
  { name: "Qualification Process ID", desc: "Reference to the case." },
  { name: "Action", desc: "Trigger to start the physical test phase." }
];

const attributesAY = [
  { name: "SPU/SPG identifier", desc: "Resource tested." },
  { name: "Product", desc: "E.g. mFRR." },
  { name: "Qualification status", desc: "Result (Qualified/Rejected)." },
  { name: "Validity period", desc: "Start and end date of qualification validity." }
];

const jwgToBrsMapping: Record<string, string> = {
  // Common
  "Qualification Process ID": "Kvalificerings-ID",
  
  // AU
  "Start Status": "Status",
  "Instruction": "Meddelande",

  // AV
  "Technical Characteristics": "Tekniska parametrar",
  "Test Plan": "Testplan",

  // AW
  "Action": "Handling",

  // AY
  "SPU/SPG identifier": "Kvalificerings-ID", // Referens till resurs via ID
  "Product": "Kvalificerings-ID", // Referens till produkt via ID
  "Qualification status": "Status",
  "Validity period": "Giltig till"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure20: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Sök i alla relevanta objekt för denna procedur
    const searchList = [
        ...content330Output.attributes, // AU
        ...content317Input.attributes,  // AV
        ...content315Input.attributes,  // AW
        ...content313Output.attributes  // AY
    ];

    return searchList.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    switch (brsAttrName) {
        case "Status": return "Qualification status / Start Status";
        case "Slutresultat": return "Qualification status";
        case "Kvalificerings-ID": return "Qualification Process ID";
        case "Test-ID": return "Test Identifier (Internal trace)";
        case "Testdatum": return "Test execution date";
        case "Resultatdata": return "Test result data";
        case "Kommentar": return "Additional info / Notes";
        case "Transaktions-ID": return "Transaction ID (Internal)";
        default:
            return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
    }
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

  const renderJwgTable = (title: string, data: any[], brsId: string) => (
    <div style={{marginBottom: '24px'}}>
        <h3 style={styles.subSectionHeader}>{title} (Kopplat till {brsId})</h3>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i BRS</th></tr></thead>
          <tbody>
            {data.map((a, i) => {
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
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(19)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(21)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 20: SPG or SPU product pre-qualification</h1>
      <p style={styles.subHeader}>Genomförande av teknisk fas (test och verifiering).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex315.id)}>{brsFlex315.id}: {brsFlex315.title} (Starta Fas)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex330.id)}>{brsFlex330.id}: {brsFlex330.title} (Notify SP)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex317.id)}>{brsFlex317.id}: {brsFlex317.title} (Test Data)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex318.id)}>{brsFlex318.id}: {brsFlex318.title} (Execute Test)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex312.id)}>{brsFlex312.id}: {brsFlex312.title} (Report Result)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex313.id)}>{brsFlex313.id}: {brsFlex313.title} (Final Notify)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll JWG</h2>
        {renderJwgTable("Info Item AU (Start Notification)", attributesAU, brsFlex330.id)}
        {renderJwgTable("Info Item AV (Technical Data)", attributesAV, brsFlex317.id)}
        {renderJwgTable("Info Item AW (Request Activation Test)", attributesAW, brsFlex315.id)}
        {renderJwgTable("Info Item AY (Qualification Result)", attributesAY, brsFlex313.id)}
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        <p style={styles.paragraph}>Nedan visas datainnehållet för stegen i den tekniska kvalificeringsfasen.</p>
        
        {/* 1. Start (315/330) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>1. Starta teknisk fas</h3>
        {renderAttributeTable(`${brsFlex315.id} Input: ${content315Input.title}`, content315Input.attributes, true)}
        {renderAttributeTable(`${brsFlex330.id} Output: ${content330Output.title}`, content330Output.attributes, true)}

        {/* 2. Testdata (317) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>2. Tekniska data</h3>
        {renderAttributeTable(`${brsFlex317.id} Input: ${content317Input.title}`, content317Input.attributes, true)}

        {/* 3. Testgenomförande (318) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>3. Aktiveringstest</h3>
        {renderAttributeTable(`${brsFlex318.id} Input: ${content318Input.title}`, content318Input.attributes, true)}

        {/* 4. Resultat (312/313) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>4. Rapportering & Beslut</h3>
        {renderAttributeTable(`${brsFlex312.id} Input: ${content312Input.title}`, content312Input.attributes, true)}
        {renderAttributeTable(`${brsFlex313.id} Output: ${content313Output.title}`, content313Output.attributes, true)}

      </section>
    </div>
  );
};
