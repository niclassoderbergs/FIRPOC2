
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex701 } from './domain7/brs/brs-flex-701';
import { brsFlex702 } from './domain7/brs/brs-flex-702';
import { brsFlex711 } from './domain7/brs/brs-flex-711';
import { brsFlex712 } from './domain7/brs/brs-flex-712';
import { brsFlex7011 } from './domain7/brs/brs-flex-7011';
import { brsFlex7111 } from './domain7/brs/brs-flex-7111';
import { brsFlex705 } from './domain7/brs/brs-flex-705'; // Maps to 709
import { brsFlex706 } from './domain7/brs/brs-flex-706'; // Maps to 719
import { brsFlex717 } from './domain7/brs/brs-flex-717'; // Maps to 738
import { brsFlex718 } from './domain7/brs/brs-flex-718'; // Maps to 748
import { 
  content701Input, content702Input, 
  content711Input, content712Input, 
  content705Output, content706Output, 
  content717Output, content718Output 
} from './content-domain-7';

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
    title Procedure 29: Bidding and activation of a flexibility product
    participant SP as Service Provider
    participant PSO as Procuring System Operator
    participant FIS as FIS (System)

    rect rgb(249, 249, 249)
    Note over SP, FIS: Phase A: Bidding (Capacity)
    
    Note over SP: 29.1 Send Bid(s) (Off-system)
    SP->>PSO: Info Item BT: Bid
    
    Note over PSO: 29.2 Validate & Register Bid (FIS)
    PSO->>FIS: Register Capacity Bid (BRS 701/711)
    
    FIS->>FIS: Execute Capacity Check (BRS 7010)
    
    alt Invalid
        FIS-->>PSO: Validation Failed
        PSO-->>SP: Info Item B: Error notification
    else Valid
        FIS-->>PSO: Validation OK (BRS 709/719)
        Note over PSO: 29.3 Select Bids
        PSO->>SP: 29.4 Notify Selection
    end
    end

    rect rgb(230, 239, 252)
    Note over SP, FIS: Phase B: Activation (Energy)
    opt Activation Required
        Note over PSO: 29.5 Register Activation
        PSO->>FIS: Activation/Energy Bid (BRS 731/741)
        
        Note over FIS: 29.6 Validate Activation (Energy)
        FIS->>FIS: Execute Energy Check (BRS 7310)
        
        FIS-->>PSO: 29.7 Notify Result (BRS 738/748)
        
        opt Dispatch
            PSO->>SP: Dispatch Instruction
        end
    end
    end`;

const steps = [
  { step: "29.1", action: "Send Bid(s)", description: "The Service Provider sends bids to the Procuring System Operator (Market Platform). Not a FIS transaction.", producer: "Service Provider", receiver: "Procuring System Operator", infoId: "BT" },
  { step: "29.2", action: "Validate/Register Bid", description: "PSO registers the bid in FIS. FIS performs Capacity Check (7010) and returns result (709/719).", producer: "PSO / FIS", receiver: "FIS / PSO", infoId: "701/711" },
  { step: "29.3", action: "Execute selection of bids", description: "The Procuring System Operator selects the winning bids.", producer: "Procuring System Operator", receiver: "-", infoId: "-" },
  { step: "29.4", action: "Notify selected bid(s)", description: "The Procuring System Operator notifies the Service Provider about selected bids.", producer: "Procuring System Operator", receiver: "Service Provider", infoId: "CI" },
  { step: "29.5", action: "Register Activation", description: "PSO registers an activation (Energy Bid) in the system.", producer: "Procuring System Operator", receiver: "FIS", infoId: "731/741" },
  { step: "29.6", action: "Validate Activation", description: "FIS performs Energy Check (7310) to validate grid constraints.", producer: "FIS", receiver: "-", infoId: "7310" },
  { step: "29.7", action: "Notify Activation Result", description: "FIS confirms the activation to PSO (738/748), who then dispatches SP.", producer: "FIS", receiver: "PSO", infoId: "738/748" }
];

const attributesBT = [
  { name: "Bid ID", desc: "Unique identifier for the bid." },
  { name: "Product", desc: "The product being traded." },
  { name: "Volume", desc: "Quantity (MW/MWh)." },
  { name: "Price", desc: "Price (EUR)." },
  { name: "Period", desc: "Delivery period." }
];

const attributesCI = [
  { name: "Bid ID", desc: "Reference to the bid." },
  { name: "Status", desc: "Status of the bid (Selected/Rejected)." },
  { name: "Volume", desc: "Selected volume." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Bid ID": "Bud-ID / Aktiverings-ID",
  "Product": "Produkt / Marknad",
  "Volume": "Volym / Aktiverad Volym",
  "Price": "Pris",
  "Period": "Period",
  "Status": "Status"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure29: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Bid data (701)
    let attr = content701Input.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content711Input.attributes.find(a => mappedName.includes(a.attribute));
    
    return attr;
  };

  const getBrsResultAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Result data (705/717)
    let attr = content705Output.attributes.find(a => mappedName.includes(a.attribute));
    if (!attr) attr = content717Output.attributes.find(a => mappedName.includes(a.attribute));
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    if (brsAttrName.includes("Bud-ID") || brsAttrName.includes("Aktiverings-ID")) return "Bid ID";
    if (brsAttrName === "Verifierad Kapacitet") return "Volume"; // Approximation
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key].includes(brsAttrName));
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
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(28)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(30)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 29: Bidding and activation</h1>
      <p style={styles.subHeader}>Budgivning och aktivering av en flexibilitetsprodukt.</p>

      <div style={styles.brsBox}>
        <div style={{width: '100%'}}>
            
            <h4 style={{margin:'0 0 8px 0', color: '#004d33', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '4px'}}>A. Kapacitetsmarknad (Reserv)</h4>
            <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', fontSize: '0.9rem'}}>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>TSO (Reg. Bid)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex701.id)}>{brsFlex701.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>FIS Check (Capacity)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex7011.id)}>{brsFlex7011.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>TSO (Result)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex705.id)}>{brsFlex705.id}</div>
                </div>
            </div>
            
            <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', fontSize: '0.9rem'}}>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>DSO (Reg. Bid)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex702.id)}>{brsFlex702.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>FIS Check (Capacity)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex7011.id)}>{brsFlex7011.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>DSO (Result)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex706.id)}>{brsFlex706.id}</div>
                </div>
            </div>

            <h4 style={{margin:'0 0 8px 0', color: '#004d33', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '4px'}}>B. Energimarknad (Aktivering)</h4>
            <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', fontSize: '0.9rem'}}>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>TSO (Act. Bid)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex711.id)}>{brsFlex711.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>FIS Check (Energy)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex7111.id)}>{brsFlex7111.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>TSO (Result)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex717.id)}>{brsFlex717.id}</div>
                </div>
            </div>

            <div style={{display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.9rem'}}>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>DSO (Act. Bid)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex712.id)}>{brsFlex712.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>FIS Check (Energy)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex7111.id)}>{brsFlex7111.id}</div>
                </div>
                <div>→</div>
                <div>
                    <div style={{fontSize:'0.75rem', fontWeight:600, color:'#555'}}>DSO (Result)</div>
                    <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex718.id)}>{brsFlex718.id}</div>
                </div>
            </div>

        </div>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BT (Bid)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i BRS</th></tr></thead>
          <tbody>
            {attributesBT.map((a, i) => {
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info CI (Selected Bid)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i BRS</th></tr></thead>
          <tbody>
            {attributesCI.map((a, i) => {
              const brsMatch = getBrsResultAttribute(a.name);
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS (FIS Interface)</h2>
        <p style={styles.paragraph}>Nedan visas datamodellerna för gränssnittet mellan PSO och FIS (där kontrollen sker).</p>
        
        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Kapacitetsbud (System Integration)</h3>
        {renderAttributeTable(`Input från PSO: ${brsFlex701.id} (TSO) / ${brsFlex702.id} (DSO)`, content701Input.attributes, true)}
        {renderAttributeTable(`Output till PSO: ${brsFlex705.id} (TSO) / ${brsFlex706.id} (DSO)`, content705Output.attributes, true)}

        <h3 style={{...styles.subSectionHeader, color: '#0052cc'}}>Energibud (System Integration)</h3>
        {renderAttributeTable(`Input från PSO: ${brsFlex711.id} (TSO) / ${brsFlex712.id} (DSO)`, content711Input.attributes, true)}
        {renderAttributeTable(`Output till PSO: ${brsFlex717.id} (TSO) / ${brsFlex718.id} (DSO)`, content717Output.attributes, true)}

      </section>
    </div>
  );
};
