
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex201 } from './domain2/brs/brs-flex-201';
import { brsFlex2040 } from './domain2/brs/brs-flex-2040';
import { brsFlex205 } from './domain2/brs/brs-flex-205';
import { content201Input, content205Output } from './content-domain-2';

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
    title Procedure 11: SP Customer switching or new registration on CU
    participant FC as Final customer
    participant NewSP as Service provider (new)
    participant CUMA as CU Module administrator
    participant OldSP as Service provider (present)
    participant Parties as Affected/Entitled parties

    Note over FC: 11.1 Request service offer
    FC->>NewSP: Info Item W: Request
    
    Note over NewSP: 11.2 Validate service offer request
    
    opt Contractual obstructs check
        Note over NewSP: 11.3a Check for possible contractual obstructs
        NewSP->>OldSP: Info Item X: Check
        Note over OldSP: 11.3b Solve issues with present SP
        OldSP-->>NewSP: Info Item X: 11.3c Notify on issue result
    end

    opt CU characteristics needed
        Note over NewSP: 11.4a Request upfront CU master data
        NewSP->>CUMA: Info Item Y: Request
        Note over CUMA: 11.4b Validate upfront request
        CUMA-->>NewSP: Info Item Y: 11.4c Notify validation/data
    end

    Note over NewSP: 11.5 Request sign contract
    NewSP->>FC: Info Item Z: Contract proposal
    
    Note over FC: 11.6 Execute sign contract
    
    Note over NewSP: 11.7 Request registration of SP on CU
    NewSP->>CUMA: Info Item AA: Registration Request (BRS 201)
    activate CUMA
    
    Note over CUMA: 11.8 Validate registration request
    
    alt Validation Failed
        CUMA-->>NewSP: Info Item B: 11.9 Notify validation result (Failed)
    else Validation Passed
        opt Customer permission needed
            Note over CUMA: 11.10a Request Permission
            CUMA->>FC: Info Item Z: Request
            Note over FC: 11.10b Validate permission
            FC-->>CUMA: Info Item Z: 11.10c Notify permission
        end
        
        Note over CUMA: 11.11 Send SP on CU registration result
        CUMA->>NewSP: Info Item B: Result (Success)
        CUMA->>OldSP: Info Item B: Result (Termination via BRS 209)
        
        Note over NewSP: 11.12 Notify about SP on CU registration result
        NewSP->>FC: Info Item Z: Notification
        
        Note over NewSP: 11.13 Notify about CU registration
        NewSP->>FC: Info Item Z: Notification
        
        Note over NewSP: 11.14 Register in Flexibility Information System
        
        Note over CUMA: 11.15 Notify on CU master data
        CUMA->>Parties: Info Item AC/AD/AE: Notifications
    end
    deactivate CUMA`;

const steps = [
  { step: "11.1", action: "Request service offer", description: "The final customer requests a service offer from a new Service Provider.", producer: "Final customer", receiver: "Service provider (new)", infoId: "W" },
  { step: "11.2", action: "Validate service offer request", description: "The new SP validates the request.", producer: "Service provider (new)", receiver: "-", infoId: "-" },
  { step: "11.3a", action: "Check for possible contractual obstructs", description: "Conditional: The new SP checks with the present SP for issues.", producer: "Service provider (new)", receiver: "Service provider (present)", infoId: "X" },
  { step: "11.3b", action: "Solve issues with present service provider", description: "The present SP resolves any issues.", producer: "Service provider (present)", receiver: "-", infoId: "-" },
  { step: "11.3c", action: "Notify on issue result", description: "The present SP notifies the new SP.", producer: "Service provider (present)", receiver: "Service provider (new)", infoId: "X" },
  { step: "11.4a", action: "Request upfront CU master data", description: "Conditional: The new SP requests master data from CUMA before contract.", producer: "Service provider (new)", receiver: "CU module administrator", infoId: "Y" },
  { step: "11.4c", action: "Notify about CU validation results", description: "CUMA provides data or validation result.", producer: "CU module administrator", receiver: "Service provider (new)", infoId: "Y" },
  { step: "11.5", action: "Request sign contract", description: "The new SP requests the customer to sign the contract.", producer: "Service provider (new)", receiver: "Final customer", infoId: "Z" },
  { step: "11.6", action: "Execute sign contract", description: "The final customer signs the contract.", producer: "Final customer", receiver: "-", infoId: "-" },
  { step: "11.7", action: "Request registration of SP on CU", description: "The new SP registers the CU assignment in the system (Switching).", producer: "Service provider (new)", receiver: "CU module administrator", infoId: "AA" },
  { step: "11.8", action: "Validate registration of SP on CU request", description: "CUMA validates the registration.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "11.9", action: "Notify about registration validation result", description: "CUMA notifies the new SP if validation failed.", producer: "CU module administrator", receiver: "Service provider (new)", infoId: "B" },
  { step: "11.10a", action: "Request Permission", description: "Conditional: CUMA requests permission from Final Customer.", producer: "CU module administrator", receiver: "Final customer", infoId: "Z" },
  { step: "11.10c", action: "Notify about permission", description: "Final Customer allows/denies.", producer: "Final customer", receiver: "CU module administrator", infoId: "Z" },
  { step: "11.11", action: "Send SP on CU registration result", description: "CUMA confirms registration to New SP and notifies Old SP (Implicit Termination).", producer: "CU module administrator", receiver: "SP (new) / SP (present)", infoId: "B" },
  { step: "11.12", action: "Notify about SP on CU registration result", description: "New SP notifies customer.", producer: "Service provider (new)", receiver: "Final customer", infoId: "Z" },
  { step: "11.13", action: "Notify about CU registration", description: "New SP notifies customer about technical registration.", producer: "Service provider (new)", receiver: "Final customer", infoId: "Z" },
  { step: "11.15", action: "Notify on CU master data", description: "CUMA notifies affected/entitled parties (e.g. BRP, DSO).", producer: "CU module administrator", receiver: "Affected parties", infoId: "AC, AD, AE" }
];

const attributes = [
  { name: "CU identification", desc: "The resource to switch." },
  { name: "Service provider", desc: "The new SP." },
  { name: "Start date", desc: "Effective switch date." },
  { name: "Customer mapping", desc: "Proof of customer relation." }
];

const jwgToBrsMapping: Record<string, string> = {
  "CU identification": "CU-ID",
  "Service provider": "-", // Implicit via inloggning i BRS 201
  "Start date": "Startdatum",
  "Customer mapping": "Kund-ID"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure11: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return content201Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(10)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(12)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 11: SP Customer switching or new registration on CU</h1>
      <p style={styles.subHeader}>Byte av tjänsteleverantör (Switching) eller nyteckning.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex201.id)}>{brsFlex201.id}: {brsFlex201.title} (Ny SP)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex2040.id)}>{brsFlex2040.id}: {brsFlex2040.title} (Gammal SP Avslut)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex205.id)}>{brsFlex205.id}: {brsFlex205.title} (Notifiering Gammal SP)</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AA (Registration Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex201.id}</th></tr></thead>
          <tbody>
            {attributes.map((a, i) => {
              const brsMatch = getBrsAttribute(a.name);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong></td>
                  <td style={styles.td}>{brsMatch ? <span style={styles.mappingTag}>{brsMatch.attribute}</span> : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS-FLEX-201 (Input från Ny SP)</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex201.id} (InfoObject: {content201Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content201Input.attributes.map((attr, i) => {
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

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS-FLEX-209 (Notifiering till Gammal SP)</h2>
        <p style={styles.paragraph}>När den nya leverantören registreras (Switch), avslutas den gamla leverantörens avtal via {brsFlex2040.id} och en notifiering skickas enligt {brsFlex205.id}.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>Typ</th></tr></thead>
          <tbody>
            {content205Output.attributes.map((attr, i) => {
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{attr.attribute}</strong></td>
                  <td style={styles.td}>{attr.description}</td>
                  <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                        <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.8rem'}}>Notifiering</span>
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
