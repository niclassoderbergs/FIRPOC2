
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex112 } from './domain1/brs/brs-flex-112';
import { brsFlex122 } from './domain1/brs/brs-flex-122';
import { content112Input, content122Input } from './content-domain-1';

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
    title Procedure 23: SPU or SPG update
    participant EP as Eligible party
    participant SMA as SP module administrator
    participant EntP as Entitled party

    Note over EP: 23.1 Request update SPU or SPG
    EP->>SMA: Info Item BF: Request update (Refers to CJ)
    activate SMA
    
    Note over SMA: 23.2 Validate SPU or SPG update request
    
    alt Validation Failed
        SMA-->>EP: Info Item B: Error notification
    else Validation Passed
        Note over SMA: 23.3 Register SPU or SPG update
        
        Note over SMA: 23.4 Notify about successful SPU or SPG update
        SMA-->>EP: Info Item BG: Confirmation
        
        Note over SMA: 23.5 Notify updated SPU or SPG update data
        SMA->>EntP: Info Item BH: Notification (Refers to CJ)
    end
    deactivate SMA`;

const steps = [
  { step: "23.1", action: "Request update SPU or SPG", description: "The eligible party requests to update the SPU or SPG.", producer: "Eligible party", receiver: "SP module administrator", infoId: "BF" },
  { step: "23.2", action: "Validate SPU or SPG update request", description: "The SP module administrator validates the request.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "23.3", action: "Register SPU or SPG update", description: "The SP module administrator updates the registry.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "23.4", action: "Notify about successful SPU or SPG update", description: "Confirmation sent to the requestor.", producer: "SP module administrator", receiver: "Eligible party", infoId: "BG" },
  { step: "23.5", action: "Notify updated SPU or SPG update data", description: "Notification to entitled parties about the change.", producer: "SP module administrator", receiver: "Entitled party", infoId: "BH" }
];

const attributesBF = [
  { name: "SP module", desc: "Identification of a flexibility information system module." },
  { name: "SPU or SPG master data", desc: "Information Object CJ (Only changed data)." },
  { name: "Reason", desc: "Reason or category for the update." },
  { name: "Information validity", desc: "Period during which the updated data attributes are valid." }
];

const attributesBH = [
  { name: "SP module", desc: "Identification of a flexibility information system module." },
  { name: "SPU or SPG master data", desc: "Information Object CJ – SPU or SPG master data." },
  { name: "Reason", desc: "Reason or category for the update." },
  { name: "Information validity", desc: "Period during which the updated data attributes are valid." }
];

// Info Object CJ (Repeated here for context in this procedure view)
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
  "SPU or SPG master data": "Nytt Namn", // I BRS 112/122 uppdateras främst namn
  "Reason": "-",
  "Information validity": "-"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure23: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    // Special handling for the combined identifier field
    if (jwgAttrName === "SPU or SPG master data") {
        return { 
            attribute: "Nytt Namn", 
            description: "Exempel på attribut som ändras.", 
            article: "-" 
        };
    }
    return null;
  };

  const getJwgReference = (brsAttrName: string) => {
    if (brsAttrName === "Nytt Namn") return "SPU or SPG master data (Name)";
    return undefined;
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(22)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(24)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 23: Update of SPU or SPG information</h1>
      <p style={styles.subHeader}>Uppdatering av attribut för SPU eller SPG.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex112.id)}>{brsFlex112.id}: {brsFlex112.title} (SPU)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex122.id)}>{brsFlex122.id}: {brsFlex122.title} (SPG)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BF (Request) & BH (Notification)</h2>
        <p style={styles.paragraph}>Dessa meddelanden innehåller referenser till <strong>Info Object CJ</strong> för de attribut som uppdateras.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {attributesBF.map((a, i) => {
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong></td>
                  <td style={styles.td}>{a.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h3 style={styles.subSectionHeader}>Referenced Info Object CJ (SPU/SPG Master Data)</h3>
        <p style={styles.paragraph}>Masterdata som kan uppdateras via BF/BH.</p>
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
        <p style={styles.paragraph}>Specifikation av datamodeller för BRS (Input).</p>
        
        {/* SPU */}
        <h4 style={{marginTop: '16px', color: '#42526e'}}>SPU (BRS-FLEX-112)</h4>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {content112Input.attributes.map((attr, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{attr.attribute}</strong></td>
                <td style={styles.td}>{attr.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SPG */}
        <h4 style={{marginTop: '16px', color: '#42526e'}}>SPG (BRS-FLEX-122)</h4>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {content122Input.attributes.map((attr, i) => (
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
