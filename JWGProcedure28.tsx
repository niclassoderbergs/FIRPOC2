
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex116 } from './domain1/brs/brs-flex-116';
import { brsFlex126 } from './domain1/brs/brs-flex-126';
import { content116Input, content116Output, content126Input, content126Output } from './content-domain-1';

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
    title Procedure 28: General Access to SPU/G data
    participant EP as Entitled party
    participant SMA as SP module administrator

    Note over EP: 28.1 Request for SPU or SPG master data
    EP->>SMA: Info Item BR: Request
    activate SMA
    
    Note over SMA: 28.2 Validate SPU or SPG master data request
    
    alt Validation Failed
        SMA-->>EP: Info Item B: Error notification
    else Validation Passed
        Note over SMA: 28.3 Notify about updated SPG/U information
        SMA->>EP: Info Item BS: SPU/SPG information
    end
    deactivate SMA`;

const steps = [
  { step: "28.1", action: "Request for SPU or SPG master data", description: "The entitled party requests master data for an SPU or SPG.", producer: "Entitled party", receiver: "SP module administrator", infoId: "BR" },
  { step: "28.2", action: "Validate SPU or SPG master data request", description: "The SP module administrator validates the request (e.g. check access rights).", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "28.3", action: "Notify about updated SPG/U information", description: "The SP module administrator sends the requested SPU/SPG information.", producer: "SP module administrator", receiver: "Entitled party", infoId: "BS" }
];

const attributesBR = [
  { name: "SPU/SPG identifier", desc: "The identifier of the SPU or SPG to retrieve data for." }
];

const attributesBS = [
  { name: "SPU/SPG identifier", desc: "The identifier of the SPU or SPG." },
  { name: "Status", desc: "The current status of the entity (e.g. Active, Suspended)." },
  { name: "Master Data", desc: "Descriptive attributes (Name, Grid Area, Capacity, etc)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "SPU/SPG identifier": "SPU-ID / SPG-ID",
  "Status": "Status",
  "Master Data": "Namn / Elområde / Kapacitet"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure28: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttributeBR = (jwgAttrName: string) => {
    let mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check inputs (116/126)
    let attr = content116Input.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content126Input.attributes.find(a => mappedName.includes(a.attribute));
    return attr;
  };

  const getBrsAttributeBS = (jwgAttrName: string) => {
    let mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;

    if (jwgAttrName === "Master Data") {
        return { attribute: "Namn / Elområde / Kapacitet", description: "Samtliga stamdata-attribut", article: "-" };
    }
    
    // Check outputs (116/126)
    let attr = content116Output.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content126Output.attributes.find(a => mappedName.includes(a.attribute));
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    if (brsAttrName === "SPU-ID" || brsAttrName === "SPG-ID") return "SPU/SPG identifier";
    if (brsAttrName === "Status") return "Status";
    if (["Namn", "Elområde", "Aggregerad Kapacitet", "Antal CU", "Elområde-ID"].includes(brsAttrName)) return "Master Data";
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(27)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(29)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 28: General Access to SPU/G data</h1>
      <p style={styles.subHeader}>Åtkomst till SPU eller SPG stamdata.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex116.id)}>{brsFlex116.id}: {brsFlex116.title} (SPU)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex126.id)}>{brsFlex126.id}: {brsFlex126.title} (SPG)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BR (Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex116.id} / {brsFlex126.id} Input</th></tr></thead>
          <tbody>
            {attributesBR.map((a, i) => {
              const brsMatch = getBrsAttributeBR(a.name);
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BS (Response)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex116.id} / {brsFlex126.id} Output</th></tr></thead>
          <tbody>
            {attributesBS.map((a, i) => {
              const brsMatch = getBrsAttributeBS(a.name);
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
        <p style={styles.paragraph}>Specifikation av datamodeller för begäran och svar.</p>
        
        {/* SPU */}
        {renderAttributeTable(`${brsFlex116.id} Input (SPU Request)`, content116Input.attributes, true)}
        {renderAttributeTable(`${brsFlex116.id} Output (SPU Data)`, content116Output.attributes, true)}

        {/* SPG */}
        {renderAttributeTable(`${brsFlex126.id} Input (SPG Request)`, content126Input.attributes, true)}
        {renderAttributeTable(`${brsFlex126.id} Output (SPG Data)`, content126Output.attributes, true)}

      </section>
    </div>
  );
};
