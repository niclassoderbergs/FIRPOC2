
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex5210 } from './domain5/brs/brs-flex-5210';
import { content5210Input, content5210Output } from './content-domain-5';

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
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem', display: 'block', marginBottom: '4px' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 34: Baseline validation
    participant EP as Eligible Party
    participant BVR as Baseline validation responsible
    participant BA as Baseline administrator
    participant QDA as Quantification data aggregator

    opt 16.1 Activation period needed?
        BVR->>EP: 16.1a Request activation period (Info AR)
        EP-->>BVR: 16.1b Send activation period (Info AS)
    end

    opt 16.2 Baseline info needed?
        BVR->>EP: 16.2a Request info used in determining baseline (Info AV)
        EP-->>BVR: 16.2b Send available baseline info (Info AK)
    end

    opt 16.3 Baseline needed?
        BVR->>BA: 16.3a Request baseline (Info AU)
        BA-->>BVR: 16.3b Send baseline (Info AL)
    end

    opt 16.4 Metered data needed?
        BVR->>QDA: 16.4a Request validated metered data (Info AL)
        QDA-->>BVR: 16.4b Send validated metered data (Info AH)
    end

    Note over BVR: 16.5 Validate baseline

    Note over BVR: 16.6 Notify baseline validation result
    BVR->>EP: Info Item AW: Baseline validation result`;

const steps = [
  { step: "16.1", action: "Request/Receive activation period", description: "Optional: If not known, BVR requests the activation period from the Eligible Party.", producer: "Baseline validation responsible", receiver: "Eligible Party", infoId: "AR / AS" },
  { step: "16.2", action: "Request/Receive baseline information", description: "Optional: Requesting specific parameters or method info used for the baseline.", producer: "Baseline validation responsible", receiver: "Eligible Party", infoId: "AV / AK" },
  { step: "16.3", action: "Request/Receive baseline", description: "Optional: Requesting the calculated baseline values from the administrator.", producer: "Baseline validation responsible", receiver: "Baseline administrator", infoId: "AU / AL" },
  { step: "16.4", action: "Request/Receive validated metered data", description: "Optional: Requesting metered data to validate the baseline against actuals.", producer: "Baseline validation responsible", receiver: "Quantification data aggregator", infoId: "AL / AH" },
  { step: "16.5", action: "Validate baseline", description: "The responsible party executes the validation logic.", producer: "Baseline validation responsible", receiver: "-", infoId: "-" },
  { step: "16.6", action: "Notify baseline validation result", description: "The result of the validation is communicated to the Eligible Party.", producer: "Baseline validation responsible", receiver: "Eligible Party", infoId: "AW" }
];

const attributes = [
  { name: "Validation ID", desc: "Unique identifier for the validation process." },
  { name: "Baseline Status", desc: "Result of validation (Valid/Invalid)." },
  { name: "Deviation", desc: "Any deviation found during validation." },
  { name: "Period", desc: "The time period validated." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Validation ID": "CU-ID", // Använder resursens ID som huvudnyckel i brist på unikt validerings-ID i BRS
  "Baseline Status": "Kvalitetsstämpel",
  "Deviation": "Baseline-resultat", // Resultatet kan innehålla avvikelsedata
  "Period": "Period"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure34: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Input (Trigger data)
    let attr = content5210Input.attributes.find(a => a.attribute === mappedName);
    
    // Check Output (Result)
    if (!attr) attr = content5210Output.attributes.find(a => a.attribute === mappedName);
    
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(33)}>← Föregående</button>
            <button style={{...styles.backButton, opacity: 0.5, cursor: 'default'}} disabled>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 34: Baseline validation</h1>
      <p style={styles.subHeader}>Validering av baseline (motsvarar Business Process 16).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex5210.id)}>{brsFlex5210.id}: {brsFlex5210.title} (Validering/Beräkning)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AW (Result)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex5210.id}</th></tr></thead>
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS (Resultat - {brsFlex5210.id})</h2>
        <p style={styles.paragraph}>Följande attribut ingår i valideringsresultatet.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content5210Output.attributes.map((attr, i) => {
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
