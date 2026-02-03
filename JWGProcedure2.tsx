
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex101 } from './domain1/brs/brs-flex-101';
import { brsFlex322 } from './domain3/brs/brs-flex-322'; // ID: BRS-FLEX-339
import { brsFlex323 } from './domain3/brs/brs-flex-323'; // ID: BRS-FLEX-332
import { brsFlex324 } from './domain3/brs/brs-flex-324'; // ID: BRS-FLEX-338
import { content101Input, content101Output } from './content-domain-1';
import { content322Output, content323Input, content324Output } from './content-domain-3';

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
    title Procedure 2: CU registration
    participant RegP as CU Registration Responsible
    participant CUMA as CU Module Administrator
    participant Cust as Final Customer
    participant DSO as Connecting System Operator
    participant EP as Entitled Parties

    Note over RegP: 2.1 Request for CU registration
    RegP->>CUMA: Info Item D: Request (BRS 101)
    activate CUMA
    
    Note over CUMA: 2.2 Validate request
    
    alt Validation Failed
        CUMA-->>RegP: Info Item B: Request rejected
    else Validation Passed
        
        opt Permission Needed
            CUMA->>Cust: 2.3a Request permission
            Cust->>Cust: 2.3b Validate permission
            Cust-->>CUMA: Permission Result
            alt Permission Failed
                CUMA-->>RegP: Info Item B: Permission validation failed
            end
        end
        
        Note over CUMA: 2.4 Store CU identification
        CUMA-->>RegP: Info Item E: 2.5 Send CU identification
        
        Note over RegP: 2.6 Send CU master data
        RegP->>CUMA: Info Item C: Master data
        
        Note over CUMA: 2.6 Receive CU master data
        
        opt Grid Qualification Needed
            CUMA->>DSO: 2.7a Request grid qualification (BRS 339)
            DSO->>DSO: 2.7b Validate
            DSO-->>CUMA: Qualification Result (BRS 332)
            
            CUMA-->>RegP: 2.7c Notify Grid PQ Result (BRS 338)
            
            alt Qualification Failed
                CUMA-->>RegP: Info Item B: Grid qualification failed
            end
        end
        
        Note over CUMA: 2.8 Notify about registered CU module data
        CUMA-->>RegP: Info Item B: Registered Data
        
        Note over CUMA: 2.9 Notify about successful registration
        CUMA->>EP: Info Item C: Successful registration
    end
    deactivate CUMA`;

const steps = [
  { step: "2.1", action: "Request for CU registration", description: "The CU registration responsible requests the registration of a new CU.", producer: "CU reg. responsible", receiver: "CU module administrator", infoId: "D" },
  { step: "2.2", action: "Validate CU registration request", description: "The CU module administrator validates the request (e.g. syntax, uniqueness).", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "2.3", action: "Manage permissions", description: "If permission is needed, CUMA requests it from the Final Customer.", producer: "CU module administrator", receiver: "Final customer", infoId: "-" },
  { step: "2.4", action: "Store CU identification", description: "CUMA stores the identifier.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "2.5", action: "Send CU identification", description: "CUMA sends the ID to the registration responsible.", producer: "CU module administrator", receiver: "CU reg. responsible", infoId: "E" },
  { step: "2.6", action: "Send CU master data", description: "Registration responsible provides the full master data for the CU.", producer: "CU reg. responsible", receiver: "CU module administrator", infoId: "C" },
  { step: "2.7", action: "Manage grid qualification", description: "CUMA requests check from DSO (BRS 339), receives result (BRS 332), and notifies SP (BRS 338).", producer: "CU module administrator", receiver: "Connecting system operator", infoId: "-" },
  { step: "2.8", action: "Notify about registered CU module data", description: "CUMA notifies the registration responsible about the final registered data.", producer: "CU module administrator", receiver: "CU reg. responsible", infoId: "B" },
  { step: "2.9", action: "Notify about successful registration", description: "CUMA notifies entitled parties about the new registration.", producer: "CU module administrator", receiver: "Entitled party", infoId: "C" }
];

// JWG Info Item Definitions
const attributesInfoD = [
  { name: "Service provider", desc: "Identification of the service provider responsible for the CU." },
  { name: "Accounting point identifier(s)", desc: "Identifier of the accounting point(s) the CU is connected to." },
  { name: "Technical characteristics", desc: "Initial technical data." }
];

const attributesInfoE = [
  { name: "CU identification", desc: "Uniquely generated ID." }
];

const attributesInfoC = [
  { name: "CU identification", desc: "If available, otherwise generated by system." },
  { name: "Technical characteristics", desc: "Maximum capacity, ramp rates, etc." },
  { name: "Active time period", desc: "Start date for the registration." },
  { name: "Resource Type", desc: "Type of resource (e.g. Battery, Load)." }
];

const attributesInfoB = [
  { name: "CU identification", desc: "Unique identifier." },
  { name: "Status", desc: "Result status (e.g. Registered, Qualified)." },
  { name: "Result details", desc: "Error codes or conditions." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Accounting point identifier(s)": "Mätpunkt-ID",
  "Technical characteristics": "Maximal aktiv effekt", // Samlingsbegrepp för effektparametrar
  "Active time period": "Aktiv tidsperiod",
  "Service provider": "Resursnamn", // Ofta implicit via inloggning, men mappas mot namn/metadata
  "CU identification": "CU-ID",
  "Resource Type": "Teknisk typ",
  "Maximum capacity": "Maximal aktiv effekt",
  "Status": "Status",
  "Result details": "Villkor" // För villkorat godkännande i PQ
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure2: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  
  // Hitta motsvarande BRS-attribut för ett JWG-attribut (för visning i JWG-tabellen)
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Sök igenom alla relevanta objekt i denna procedur
    const allAttributes = [
        ...content101Input.attributes,
        ...content101Output.attributes,
        ...content322Output.attributes,
        ...content323Input.attributes,
        ...content324Output.attributes
    ];

    return allAttributes.find(a => a.attribute === mappedName);
  };

  // Hitta vilken JWG-term ett BRS-attribut motsvarar (för visning i BRS-tabellen)
  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  const renderJwgTable = (title: string, data: any[], brsId: string | null) => (
    <div style={{marginBottom: '24px'}}>
        <h3 style={styles.subSectionHeader}>{title} {brsId && <span style={{fontSize:'0.8rem', fontWeight:'normal', color:'#666'}}>(Kopplat till {brsId})</span>}</h3>
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(1)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(3)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 2: Registration of a Controllable Unit</h1>
      <p style={styles.subHeader}>Process för att registrera en ny resurs i systemet och genomföra nätförkvalificering.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex101.id)}>{brsFlex101.id}: {brsFlex101.title}</div>
            <div style={{marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic'}}>Nätförkvalificering (Steg 2.7):</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex322.id)}>{brsFlex322.id}: {brsFlex322.title}</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex323.id)}>{brsFlex323.id}: {brsFlex323.title}</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex324.id)}>{brsFlex324.id}: {brsFlex324.title}</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <div style={styles.infoBox}><strong>Pre-condition:</strong> The Service Provider has a valid contract with the CU Owner (implied).</div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen (Table III.2)</h2>
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
        {renderJwgTable("Info Item D: Request for CU registration", attributesInfoD, brsFlex101.id)}
        {renderJwgTable("Info Item E: Send CU identification", attributesInfoE, brsFlex101.id)}
        {renderJwgTable("Info Item C: Master Data", attributesInfoC, brsFlex101.id)}
        {renderJwgTable("Info Item B: Notification / Result", attributesInfoB, null)}
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        <p style={styles.paragraph}>Nedan visas datamodellerna för registrering och efterföljande nätförkvalificering.</p>
        
        {/* Registrering */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>1. Registrering ({brsFlex101.id})</h3>
        {renderAttributeTable(`Input (Request)`, content101Input.attributes)}
        {renderAttributeTable(`Output (Confirmation)`, content101Output.attributes)}

        {/* Grid PQ */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>2. Nätförkvalificering (Steg 2.7)</h3>
        <p style={{fontSize:'0.9rem', color: '#666', marginBottom:'12px'}}>
            Dessa steg triggas automatiskt om resursen kräver nätanalys.
        </p>
        {renderAttributeTable(`${brsFlex322.id} (Notification to DSO)`, content322Output.attributes)}
        {renderAttributeTable(`${brsFlex323.id} (Response from DSO)`, content323Input.attributes)}
        {renderAttributeTable(`${brsFlex324.id} (Result to SP)`, content324Output.attributes)}

      </section>
    </div>
  );
};
