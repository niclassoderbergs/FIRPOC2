
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex6110 } from './domain6/brs/brs-flex-6110';
import { brsFlex7110 } from './domain7/brs/brs-flex-7110';
import { brsFlex714 } from './domain7/brs/brs-flex-714';
import { brsFlex715 } from './domain7/brs/brs-flex-715';
import { brsFlex716 } from './domain7/brs/brs-flex-716';
import { content6110Output } from './content-domain-6';
import { content7110Output, content715Output, content716Output } from './content-domain-7';

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
    title Procedure 21: SPU or SPG product verification
    participant System as FIS (System)
    participant SP as Service Provider
    participant TSO as TSO
    participant DSO as DSO

    Note over System: Trigger: Tidsfönster för mätvärden stänger
    
    rect rgb(240, 248, 255)
    Note over System: 21.1 Kvantifiering (6110)
    System->>System: Beräkna aktiverad volym (Baseline - Uppmätt)
    end

    rect rgb(255, 250, 240)
    Note over System: 21.2 Verifiering (7110)
    System->>System: Jämför Volym mot Bud
    System->>System: Fastställ status (Verified / Deviation)
    end

    rect rgb(240, 255, 240)
    Note over System: 21.3 Notifiering (714/715/716)
    par Distribuera Resultat
        System->>SP: NotifyVerificationResult (714)
        System->>TSO: NotifyVerificationResult (715)
        System->>DSO: NotifyVerificationResult (716)
    end
    end`;

const steps = [
  { step: "21.1", action: "Quantification", description: "Systemet beräknar den faktiska levererade volymen baserat på mätvärden och baseline.", producer: "FIS (System)", receiver: "FIS (Database)", infoId: "6110" },
  { step: "21.2", action: "Verification", description: "Systemet jämför den beräknade volymen mot det avropade budet för att fastställa om leveransen är godkänd.", producer: "FIS (System)", receiver: "FIS (Database)", infoId: "7110" },
  { step: "21.3", action: "Notification", description: "Resultatet av verifieringen skickas till berörda parter (SP, TSO, DSO).", producer: "FIS (System)", receiver: "SP, TSO, DSO", infoId: "BC" }
];

const attributes = [
  { name: "Activation identifier", desc: "Reference to the specific activation/bid." },
  { name: "Verified volume", desc: "The calculated delivered volume." },
  { name: "Status", desc: "Verification outcome (Verified/Deviation)." },
  { name: "Period", desc: "Time period for the verification." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Activation identifier": "Aktiverings-ID",
  "Verified volume": "Godkänd Volym",
  "Status": "Status",
  "Period": "MTU"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure21: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Primary check in 7110 (Verification Result)
    let attr = content7110Output.attributes.find(a => a.attribute === mappedName);
    
    // Fallback check in Notification (715)
    if (!attr) attr = content715Output.attributes.find(a => a.attribute === mappedName);
    
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(20)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(22)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 21: SPU or SPG product verification</h1>
      <p style={styles.subHeader}>Efterkontroll och verifiering av levererad produkt (Ex-post).</p>

      <div style={styles.noteBox}>
        <strong>Implementation Note:</strong> JWG beskriver detta som en kommunikation mellan "Product verification responsible" och SP. 
        I FIS är detta en helautomatisk systemprocess.
        <br/><br/>
        Processen startar med att systemet beräknar volymen (<strong>6110</strong>), verifierar den mot budet (<strong>7110</strong>) och distribuerar resultatet till berörda parter (<strong>714, 715, 716</strong>).
      </div>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex6110.id)}>{brsFlex6110.id}: {brsFlex6110.title} (Calculation)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex7110.id)}>{brsFlex7110.id}: {brsFlex7110.title} (Verification)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex714.id)}>{brsFlex714.id}: {brsFlex714.title} (Notify SP)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BC (Result)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i BRS</th></tr></thead>
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
        <p style={styles.paragraph}>Nedan specificeras datainnehållet för stegen i den automatiska verifieringskedjan.</p>
        
        {/* 1. Kvantifiering (6110) */}
        {renderAttributeTable(`${brsFlex6110.id} Output: ${content6110Output.title}`, content6110Output.attributes, false)}

        {/* 2. Verifiering (7110) */}
        {renderAttributeTable(`${brsFlex7110.id} Output: ${content7110Output.title}`, content7110Output.attributes, true)}

        {/* 3. Notifiering SP (714) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Notifieringar</h3>
        <p style={{fontSize:'0.9rem', color: '#666', marginBottom:'12px'}}>
            Resultatet distribueras till SP (714), TSO (715) och DSO (716). Datainnehållet är identiskt för alla parter.
        </p>
        {renderAttributeTable(`${brsFlex714.id} Output: ${content715Output.title}`, content715Output.attributes, true)}

      </section>
    </div>
  );
};
