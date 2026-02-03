
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex110 } from './domain1/brs/brs-flex-110';
import { brsFlex120 } from './domain1/brs/brs-flex-120';
import { content110Input, content120Input } from './content-domain-1';

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
    title Procedure 22: SPU or SPG registration
    participant SP as Service provider
    participant SMA as SP module administrator

    Note over SP: 22.1 Request SPU or SPG registration
    SP->>SMA: Info Item BD: Registration Request (Refers to CJ)
    activate SMA
    
    Note over SMA: 22.2 Validate SPU or SPG registration request
    
    alt Validation Failed
        SMA-->>SP: Info Item B: Error notification
    else Validation Passed
        Note over SMA: 22.3 Register SPU or SPG
        
        Note over SMA: 22.4 Notify about successful SPU or SPG registration
        SMA-->>SP: Info Item BE: Registration Confirmation
    end
    deactivate SMA`;

const steps = [
  { step: "22.1", action: "Request SPU or SPG registration", description: "The Service provider requests the registration of an SPU or SPG.", producer: "Service provider", receiver: "SP module administrator", infoId: "BD" },
  { step: "22.2", action: "Validate SPU or SPG registration request", description: "The SP module administrator validates the request.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "22.3", action: "Register SPU or SPG", description: "The SP module administrator registers the SPU or SPG in the system.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "22.4", action: "Notify about successful SPU or SPG registration", description: "The SP module administrator notifies the Service provider about the successful registration.", producer: "SP module administrator", receiver: "Service provider", infoId: "BE" }
];

const attributesBD = [
  { name: "SP module", desc: "Identification of a flexibility information system module." },
  { name: "SPU or SPG master data", desc: "Information Object CJ – SPU or SPG master data." },
  { name: "Preferred registration date", desc: "Date for when the registration shall be considered active." }
];

// Info Object CJ
const attributesCJ = [
  { name: "SP identification", desc: "European wide unique identification of the SP." },
  { name: "SPU or SPG identification", desc: "Unique identification (if available)." },
  { name: "Status value", desc: "Status of the SPU or SPG (e.g. Active, Suspended)." },
  { name: "Start timestamp", desc: "Start timestamp of the recorded status." },
  { name: "Maximum active power", desc: "Maximum active power available." },
  { name: "Maximum reactive power", desc: "Maximum reactive power available." },
  { name: "SPU or SPG data attributes", desc: "Other data attributes defined in national terms." },
  { name: "Assigned CUs", desc: "List of CUs assigned to the SPU or SPG." }
];

const jwgToBrsMapping: Record<string, string> = {
  "SPU or SPG master data": "Stamdata (Namn, Nätområde)",
  "Maximum active power": "Aggregerad Kapacitet",
  "SP identification": "Ägare",
  "Assigned CUs": "-" // Hanteras via separata kopplingsprocesser (131/141) i BRS
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure22: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return null; // Simplified matching for this view
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(21)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(23)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 22: SPU or SPG registration</h1>
      <p style={styles.subHeader}>Registrering av tekniska (SPU) eller kommersiella (SPG) aggregeringsgrupper.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex110.id)}>{brsFlex110.id}: {brsFlex110.title} (SPU)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex120.id)}>{brsFlex120.id}: {brsFlex120.title} (SPG)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BD (Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {attributesBD.map((a, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{a.name}</strong></td>
                <td style={styles.td}>{a.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3 style={styles.subSectionHeader}>Referenced Info Object CJ (SPU/SPG Master Data)</h3>
        <p style={styles.paragraph}>Information Object CJ definierar strukturen för masterdata som skickas i BD (Request) och BF (Update).</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut (CJ)</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {attributesCJ.map((a, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{a.name}</strong></td>
                <td style={styles.td}>{a.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        <p style={styles.paragraph}>I BRS-implementationen hanteras registrering av SPU och SPG separat, men båda mappar mot konceptet i Info Object CJ.</p>
        {/* SPU */}
        <h4 style={{marginTop: '16px', color: '#42526e'}}>SPU (BRS-FLEX-111)</h4>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {content110Input.attributes.map((attr, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{attr.attribute}</strong></td>
                <td style={styles.td}>{attr.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SPG */}
        <h4 style={{marginTop: '16px', color: '#42526e'}}>SPG (BRS-FLEX-121)</h4>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {content120Input.attributes.map((attr, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{attr.attribute}</strong></td>
                <td style={styles.td}>{attr.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
