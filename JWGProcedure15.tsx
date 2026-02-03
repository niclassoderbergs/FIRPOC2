
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex804 } from './domain8/brs/brs-flex-804';
import { brsFlex1320 } from './domain1/brs/brs-flex-1320';
import { brsFlex1420 } from './domain1/brs/brs-flex-1420';
import { brsFlex134 } from './domain1/brs/brs-flex-134';
import { brsFlex144 } from './domain1/brs/brs-flex-144';
import { content804Input, content804Output } from './content-domain-8';
import { content132Input, content134Output, content142Input, content144Output } from './content-domain-1';

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
    title Procedure 15: De-registration of service provider
    participant SP as Service provider
    participant SMA as SP module administrator (FIS)
    participant EP as Entitled party

    Note over SP: 15.1 Request de-registration
    SP->>SMA: Info Item AK: Request (BRS 803)
    activate SMA
    
    Note over SMA: 15.2 Validate de-registration request
    
    alt Validation Failed
        SMA-->>SP: Info Item B: Validation failed
    else Validation Passed
        Note over SMA: 15.3a Cleanup: Unlink CUs from SPUs
        SMA->>SMA: Trigger BRS 1330
        SMA-->>SP: Notify Unlink (BRS 139)

        Note over SMA: 15.3b Cleanup: Unlink CUs from SPGs
        SMA->>SMA: Trigger BRS 1430
        SMA-->>SP: Notify Unlink (BRS 149)

        Note over SMA: 15.4 Execute SP de-registration
        
        Note over SMA: 15.5 Notify de-registration to service provider
        SMA-->>SP: Info Item AL: Notification (BRS 803 Output)
        
        Note over SMA: 15.6 Notify de-registration to entitled parties
        SMA->>EP: Info Item AL: Notification
    end
    deactivate SMA`;

const steps = [
  { step: "15.1", action: "Request de-registration", description: "The service provider requests to be de-registered.", producer: "Service provider", receiver: "SP module administrator", infoId: "AK" },
  { step: "15.2", action: "Validate de-registration request", description: "The SP module administrator validates the request.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "15.3a", action: "Cleanup SPUs (Unlink CUs)", description: "System triggers removal of CUs from SPUs (1330) and notifies SP (139).", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "15.3b", action: "Cleanup SPGs (Unlink CUs)", description: "System triggers removal of CUs from SPGs (1430) and notifies SP (149).", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "15.4", action: "Execute SP de-registration", description: "The SP module administrator de-registers the service provider.", producer: "SP module administrator", receiver: "-", infoId: "-" },
  { step: "15.5", action: "Notify de-registration to service provider", description: "The SP module administrator notifies the service provider about the de-registration.", producer: "SP module administrator", receiver: "Service provider", infoId: "AL" },
  { step: "15.6", action: "Notify de-registration to entitled parties", description: "The SP module administrator notifies the entitled parties about the de-registration.", producer: "SP module administrator", receiver: "Entitled party", infoId: "AL" }
];

const attributesAK = [
  { name: "SP identifier", desc: "Identification of the service provider." },
  { name: "Reason", desc: "Reason for de-registration." },
  { name: "De-registration date", desc: "Date when the de-registration becomes effective." }
];

const attributesAL = [
  { name: "SP identifier", desc: "Identification of the service provider." },
  { name: "De-registration date", desc: "Confirmed date of de-registration." },
  { name: "Status", desc: "Confirmation of the action." }
];

const attributesCleanup = [
  { name: "CU identification", desc: "The resource being unlinked." },
  { name: "SPU/SPG identification", desc: "The group the resource is removed from." },
  { name: "End date", desc: "Date when the link is terminated." },
  { name: "Reason", desc: "System reason for unlink (e.g. SP De-registration)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "SP identifier": "SP-ID",
  "De-registration date": "Fastställt Avslutsdatum", // Output
  "Reason": "Orsak",
  "Status": "Beslut",
  "CU identification": "CU-ID",
  "SPU/SPG identification": "SPU-ID / SPG-ID", // Mappar till respektive ID
  "End date": "Slutdatum"
};

// Input-mappning specifikt för Info AK
const jwgToBrsMappingAK: Record<string, string> = {
  "SP identifier": "SP-ID",
  "De-registration date": "Önskat Avslutsdatum", // Input
  "Reason": "Orsak"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure15: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  
  // Helper to find attribute in specific list
  const getAttributeFromList = (attrName: string, list: any[]) => {
    return list.find(a => a.attribute === attrName);
  }

  const getBrsAttributeAK = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMappingAK[jwgAttrName];
    if (!mappedName) return null;
    return getAttributeFromList(mappedName, content804Input.attributes);
  };

  const getBrsAttributeAL = (jwgAttrName: string) => {
    let mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return getAttributeFromList(mappedName, content804Output.attributes);
  };

  const getBrsAttributeCleanup = (jwgAttrName: string) => {
    let mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // SPU Cleanup (139)
    if (mappedName.includes("SPU")) mappedName = "SPU-ID";
    let attr = getAttributeFromList(mappedName, content134Output.attributes);
    
    // SPG Cleanup (149)
    if (!attr) {
       if (mappedName === "SPU-ID") mappedName = "SPG-ID"; // Fallback check
       attr = getAttributeFromList(mappedName, content144Output.attributes);
    }
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    // Manuell mappning för output-parametrar som matchar JWG-koncept
    if (brsAttrName === "Fastställt Avslutsdatum") return "De-registration date";
    if (brsAttrName === "Önskat Avslutsdatum") return "De-registration date";
    if (brsAttrName === "Beslut") return "Status";
    if (brsAttrName === "Slutdatum") return "End date";
    if (brsAttrName === "SPU-ID") return "SPU/SPG identification";
    if (brsAttrName === "SPG-ID") return "SPU/SPG identification";
    
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName) || 
           Object.keys(jwgToBrsMappingAK).find(key => jwgToBrsMappingAK[key] === brsAttrName);
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
                  {jwgRef ? <span style={styles.reverseMappingTag}>{jwgRef}</span> : <span style={{color: '#999', fontSize: '0.8rem', fontStyle: 'italic'}}>- (Specifikt för BRS)</span>}
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(14)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(16)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 15: De-registration of Service Provider</h1>
      <p style={styles.subHeader}>Avregistrering av tjänsteleverantör på egen begäran.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex804.id)}>{brsFlex804.id}: {brsFlex804.title} (Begäran)</div>
            <div style={{marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic'}}>Triggade systemprocesser:</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex1320.id)}>{brsFlex1320.id}: {brsFlex1320.title} (Städning SPU)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex1420.id)}>{brsFlex1420.id}: {brsFlex1420.title} (Städning SPG)</div>
            <div style={{marginTop: '4px', fontSize: '0.9rem', fontStyle: 'italic'}}>Notifiering:</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex134.id)}>{brsFlex134.id} & {brsFlex144.id}</div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AK (Request)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex804.id} Input</th></tr></thead>
          <tbody>
            {attributesAK.map((a, i) => {
              const brsMatch = getBrsAttributeAK(a.name);
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Cleanup Notifications (Step 15.3a/b)</h2>
        <p style={styles.paragraph}>Systemgenererade notifieringar till SP om att resurser kopplas loss (Motsvarar BRS-FLEX-139/149).</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex134.id} / {brsFlex144.id}</th></tr></thead>
          <tbody>
            {attributesCleanup.map((a, i) => {
              const brsMatch = getBrsAttributeCleanup(a.name);
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info AL (Notification)</h2>
        <p style={styles.paragraph}>Bekräftelse på avregistreringen (Motsvarar BRS-FLEX-803 Output).</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex804.id} Output</th></tr></thead>
          <tbody>
            {attributesAL.map((a, i) => {
              const brsMatch = getBrsAttributeAL(a.name);
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
        <h2 style={styles.sectionHeader}>Datainnehåll: BRS Specifikationer</h2>
        <p style={styles.paragraph}>Nedan specificeras datainnehållet för samtliga involverade BRS-transaktioner i denna procedur.</p>
        
        {/* 1. Begäran (803) */}
        {renderAttributeTable(`${brsFlex804.id} Input: ${content804Input.title}`, content804Input.attributes, true)}

        {/* 2. Intern städning (1330 & 1430) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Interna Systemprocesser (Städning)</h3>
        <p style={{fontSize:'0.9rem', color: '#666', marginBottom:'12px'}}>
            Följande processer triggas automatiskt av systemet för att koppla bort resurser från aggregeringsgrupper (städning).
        </p>
        {renderAttributeTable(`${brsFlex1320.id} Input: ${content132Input.title}`, content132Input.attributes, true)}
        {renderAttributeTable(`${brsFlex1420.id} Input: ${content142Input.title}`, content142Input.attributes, true)}

        {/* 3. Notifieringar (139, 149, 803 Output) */}
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Notifieringar & Resultat</h3>
        <p style={{fontSize:'0.9rem', color: '#666', marginBottom:'12px'}}>
            Följande information skickas till SP som kvittens på utförda åtgärder.
        </p>
        {renderAttributeTable(`${brsFlex134.id} Output: ${content134Output.title}`, content134Output.attributes, true)}
        {renderAttributeTable(`${brsFlex144.id} Output: ${content144Output.title}`, content144Output.attributes, true)}
        {renderAttributeTable(`${brsFlex804.id} Output: ${content804Output.title}`, content804Output.attributes, true)}

      </section>
    </div>
  );
};
