
import React, { useState, useMemo } from 'react';
import { brsList } from './data';

interface Attribute {
  name: string;
  type: string;
  desc: string;
  key?: boolean; // Primary or Foreign key
}

interface Entity {
  name: string;
  category: 'master' | 'transaction';
  description: string;
  sources: string[]; // BRS IDs that define/create this
  attributes: Attribute[];
}

const styles = {
  container: {
    padding: '40px 60px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const
  },
  header: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#172b4d'
  },
  subHeader: {
    fontSize: '1.1rem',
    color: '#5e6c84',
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginTop: '48px',
    marginBottom: '24px',
    color: '#172b4d',
    borderBottom: '2px solid #ebecf0',
    paddingBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  cardHeaderMaster: {
    backgroundColor: '#e6effc',
    padding: '16px',
    borderBottom: '1px solid #b3d4ff'
  },
  cardHeaderTrans: {
    backgroundColor: '#fff7d6', // Light orange/yellow for transactions
    padding: '16px',
    borderBottom: '1px solid #ffda6a'
  },
  entityName: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#172b4d',
    marginBottom: '4px'
  },
  entityDesc: {
    fontSize: '0.85rem',
    color: '#5e6c84'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.85rem'
  },
  td: {
    padding: '8px 16px',
    borderBottom: '1px solid #ebecf0',
    color: '#172b4d'
  },
  th: {
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '10px 16px',
    textAlign: 'left' as const,
    fontWeight: 600,
    borderBottom: '2px solid #dfe1e6',
    position: 'sticky' as const,
    top: 0
  },
  keyBadge: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#0052cc',
    backgroundColor: 'rgba(0,82,204,0.1)',
    padding: '2px 4px',
    borderRadius: '2px',
    marginRight: '6px'
  },
  sourceBadge: {
    display: 'inline-block',
    fontSize: '0.7rem',
    color: '#42526e',
    backgroundColor: '#f4f5f7',
    padding: '2px 6px',
    borderRadius: '4px',
    marginRight: '4px',
    marginBottom: '4px',
    border: '1px solid #dfe1e6'
  },
  sourceContainer: {
    padding: '12px 16px',
    backgroundColor: '#fafbfc',
    borderTop: '1px solid #ebecf0'
  },
  toggleButton: {
    padding: '8px 16px',
    marginRight: '8px',
    borderRadius: '4px',
    border: '1px solid #dfe1e6',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    backgroundColor: '#fff'
  },
  activeButton: {
    backgroundColor: '#0052cc',
    color: '#fff',
    borderColor: '#0052cc'
  },
  typeBadgeMaster: {
    backgroundColor: '#e6effc',
    color: '#0052cc',
    padding: '2px 6px',
    borderRadius: '3px',
    fontWeight: 600,
    fontSize: '0.75rem'
  },
  typeBadgeTrans: {
    backgroundColor: '#fff7d6',
    color: '#974f0c',
    padding: '2px 6px',
    borderRadius: '3px',
    fontWeight: 600,
    fontSize: '0.75rem'
  }
};

const entities: Entity[] = [
  // --- MASTER DATA ---
  {
    name: "Service Provider (Aktör)",
    category: "master",
    description: "Marknadsaktör som aggregerar och säljer flexibilitet.",
    sources: ["BRS-FLEX-801", "BRS-FLEX-802"],
    attributes: [
      { name: "SP-ID", type: "UUID", desc: "Unikt system-ID för aktören", key: true },
      { name: "Organisationsnummer", type: "String", desc: "Juridisk identitet", key: true },
      { name: "Företagsnamn", type: "String", desc: "Officiellt namn" },
      { name: "Ediel-ID", type: "String", desc: "Marknadsaktörs-ID" },
      { name: "Status", type: "Enum", desc: "Registered, Active, Suspended" },
      { name: "Kontaktuppgifter", type: "Object", desc: "E-post, telefon, adress" }
    ]
  },
  {
    name: "Controllable Unit (Resurs)",
    category: "master",
    description: "Den minsta tekniska enheten som kan styras (t.ex. värmepump, batteri).",
    sources: ["BRS-FLEX-101", "BRS-FLEX-102", "BRS-FLEX-323", "BRS-FLEX-511"],
    attributes: [
      { name: "CU-ID", type: "UUID", desc: "Unikt resurs-ID", key: true },
      { name: "SP-ID", type: "UUID", desc: "Ägare/Aggregator", key: true },
      { name: "Mätpunkts-ID", type: "GSRN", desc: "Koppling till elnätet (Main Meter)", key: true },
      { name: "Elområde", type: "String", desc: "Härlett från mätpunkt (t.ex. SE3). Avgör SPG-tillhörighet." },
      { name: "Nätområde", type: "String", desc: "Nätägarens område. Härlett från mätpunkt. Avgör SPU-tillhörighet." },
      { name: "Teknisk Typ", type: "Enum", desc: "Last, Produktion, Lager" },
      { name: "Maximal Effekt", type: "Decimal", desc: "Fysisk kapacitet (kW/MW)" },
      { name: "Status", type: "Enum", desc: "Active, Inactive, Suspended" },
      { name: "Mätkonfiguration", type: "Enum", desc: "DMD, Main Meter, Calculated" },
      { name: "Nätkvalificeringsstatus", type: "Enum", desc: "Status för nätanalys (Qualified, Conditional, Rejected)" },
      { name: "Vald Baseline Metod", type: "UUID", desc: "Referens till vald beräkningsmetod (BRS-FLEX-511)", key: true }
    ]
  },
  {
    name: "Aggregeringsobjekt (SPU/SPG)",
    category: "master",
    description: "Logisk gruppering av resurser för teknisk (SPU) eller kommersiell (SPG) hantering.",
    sources: ["BRS-FLEX-110", "BRS-FLEX-120", "BRS-FLEX-312"],
    attributes: [
      { name: "Objekt-ID", type: "UUID", desc: "SPU-ID eller SPG-ID", key: true },
      { name: "Typ", type: "Enum", desc: "Unit (Teknisk) eller Group (Marknad)" },
      { name: "Elområde", type: "String", desc: "Ex. SE3, SE4 (Krävs för SPG)" },
      { name: "Nätområde", type: "String", desc: "Nätägarens område (Krävs för SPU)" },
      { name: "Namn", type: "String", desc: "Beskrivande namn" },
      { name: "Status", type: "Enum", desc: "Available, Active, Suspended" },
      { name: "Produktkvalificeringar", type: "List", desc: "Lista på godkända produkter (t.ex. mFRR: Qualified)" }
    ]
  },
  {
    name: "Flexibilitetsavtal",
    category: "master",
    description: "Kopplingen mellan en SP och en Resurs (CU). Reglerar rätten att handla med resursen.",
    sources: ["BRS-FLEX-201", "BRS-FLEX-202"],
    attributes: [
      { name: "Avtals-ID", type: "UUID", desc: "Unikt ID för kopplingen", key: true },
      { name: "CU-ID", type: "UUID", desc: "Referens till resurs", key: true },
      { name: "SP-ID", type: "UUID", desc: "Referens till aktör", key: true },
      { name: "Kund-ID", type: "String", desc: "Referens till slutkund (Personnr/OrgNr)", key: true },
      { name: "Startdatum", type: "Date", desc: "Giltig från" },
      { name: "Slutdatum", type: "Date", desc: "Giltig till (vid uppsägning)" },
      { name: "Status", type: "Enum", desc: "Active, Terminated, Cancelled" }
    ]
  },
  {
    name: "Marknadsprodukt",
    category: "master",
    description: "Definition av vad som handlas (t.ex. mFRR, FCR, Lokalflex).",
    sources: ["BRS-FLEX-301"],
    attributes: [
      { name: "Produkt-ID", type: "UUID", desc: "Unikt ID", key: true },
      { name: "Namn", type: "String", desc: "Produktnamn" },
      { name: "Köpare", type: "Enum", desc: "TSO, DSO" },
      { name: "Marknadstyp", type: "Enum", desc: "Kapacitet, Energi" },
      { name: "Tekniska Krav", type: "Object", desc: "Rampningstid, Uthållighet, Min-volym" }
    ]
  },
  {
    name: "Baseline Metod",
    category: "master",
    description: "Beräkningsmodell för referenskurva.",
    sources: ["BRS-FLEX-501"],
    attributes: [
      { name: "Metod-ID", type: "UUID", desc: "Unikt ID", key: true },
      { name: "Namn", type: "String", desc: "Metodnamn (t.ex. X of Y)" },
      { name: "Parametrar", type: "Schema", desc: "Konfigurationsparametrar" }
    ]
  },

  // --- TRANSACTION DATA ---
  {
    name: "Nätbegränsning (Constraint)",
    category: "transaction",
    description: "Tillfällig restriktion i nätet satt av DSO.",
    sources: ["BRS-FLEX-401"],
    attributes: [
      { name: "Begränsnings-ID", type: "UUID", desc: "Unikt händelse-ID", key: true },
      { name: "Resurs-ID", type: "UUID", desc: "Mätpunkt eller Systemelement", key: true },
      { name: "Period", type: "TimeRange", desc: "Start och Slut" },
      { name: "Gränsvärde", type: "Decimal", desc: "Max effekt (kW/MW)" },
      { name: "Riktning", type: "Enum", desc: "Inmatning, Uttag" }
    ]
  },
  {
    name: "Marknadsbud (Bid)",
    category: "transaction",
    description: "Ett erbjudande om flexibilitet (Kapacitet eller Energi).",
    sources: ["BRS-FLEX-701", "BRS-FLEX-711"],
    attributes: [
      { name: "Bud-ID", type: "UUID", desc: "Unikt ID", key: true },
      { name: "Objekt-ID", type: "UUID", desc: "Säljande resurs (SPU/SPG)", key: true },
      { name: "Produkt-ID", type: "UUID", desc: "Vad som säljs", key: true },
      { name: "Period", type: "TimeRange", desc: "Leveransperiod" },
      { name: "Volym", type: "Decimal", desc: "Erbjuden mängd (MW)" },
      { name: "Pris", type: "Decimal", desc: "EUR/MW eller EUR/MWh" },
      { name: "Status", type: "Enum", desc: "Received, Validated, Accepted" }
    ]
  },
  {
    name: "Aktivering (Dispatch)",
    category: "transaction",
    description: "Order om att leverera flexibilitet (Avrop).",
    sources: ["BRS-FLEX-731", "BRS-FLEX-741"],
    attributes: [
      { name: "Aktiverings-ID", type: "UUID", desc: "Unikt leverans-ID", key: true },
      { name: "Bud-ID", type: "UUID", desc: "Referens till bud", key: true },
      { name: "Objekt-ID", type: "UUID", desc: "Levererande resurs", key: true },
      { name: "Aktiverad Volym", type: "Decimal", desc: "Begärd mängd (MW)" },
      { name: "Period", type: "TimeRange", desc: "Faktisk leveranstid" }
    ]
  },
  {
    name: "Mätvärde (Measurement)",
    category: "transaction",
    description: "Uppmätt data för verifiering (Sub-metering eller Main Meter).",
    sources: ["BRS-FLEX-601", "BRS-FLEX-624"],
    attributes: [
      { name: "Resurs-ID", type: "UUID", desc: "CU eller Mätpunkt", key: true },
      { name: "Tidsstämpel", type: "DateTime", desc: "Mättidpunkt", key: true },
      { name: "Värde", type: "Decimal", desc: "Effekt/Energi" },
      { name: "Kvalitet", type: "Enum", desc: "Measured, Estimated" },
      { name: "Källa", type: "Enum", desc: "SP (Sub-meter), DHV (Main)" }
    ]
  },
  {
    name: "Verifieringsresultat",
    category: "transaction",
    description: "Utfallet av jämförelsen mellan aktivering och mätdata.",
    sources: ["BRS-FLEX-7110", "BRS-FLEX-7320"],
    attributes: [
      { name: "Verifierings-ID", type: "UUID", desc: "Unikt ID", key: true },
      { name: "Aktiverings-ID", type: "UUID", desc: "Referens till leverans", key: true },
      { name: "Levererad Volym", type: "Decimal", desc: "Beräknat utfall" },
      { name: "Baseline", type: "Decimal", desc: "Referensvärde" },
      { name: "Avvikelse", type: "Decimal", desc: "Diff (Bud vs Utfall)" },
      { name: "Status", type: "Enum", desc: "Verified, Deviation" }
    ]
  }
];

// --- MAPPING LOGIC ---
// Helper to map an attribute name to a likely entity in the model
const mapAttributeToEntity = (attrName: string): { entity: string, type: 'Master data' | 'Transaktionsdata' } => {
    const a = attrName.toLowerCase();
    
    // Master Data Mappings
    if (a.includes("sp-id") || a.includes("organisationsnummer") || a.includes("ediel")) return { entity: "Service Provider (Aktör)", type: "Master data" };
    if (a.includes("cu-id") || a.includes("mätpunkt") || a.includes("teknisk") || a.includes("effekt") || a.includes("anläggning") || a.includes("nätkvalificerings")) return { entity: "Controllable Unit (Resurs)", type: "Master data" };
    if (a.includes("spu") || a.includes("spg") || a.includes("nätområde") || a.includes("elområde") || a.includes("produktkvalificeringar")) return { entity: "Aggregeringsobjekt (SPU/SPG)", type: "Master data" };
    if (a.includes("flexibilitetsavtal") || a.includes("avtal") || a.includes("kund-id")) return { entity: "Flexibilitetsavtal", type: "Master data" };
    if (a.includes("produkt") && !a.includes("kvalificering")) return { entity: "Marknadsprodukt", type: "Master data" };
    if (a.includes("metod") && !a.includes("levererad")) return { entity: "Baseline Metod", type: "Master data" };
    
    // Transaction Data Mappings
    if (a.includes("begränsning") || a.includes("inmatning") || a.includes("uttag")) return { entity: "Nätbegränsning (Constraint)", type: "Transaktionsdata" };
    if (a.includes("bud") || a.includes("pris") || (a.includes("volym") && !a.includes("levererad"))) return { entity: "Marknadsbud (Bid)", type: "Transaktionsdata" };
    if (a.includes("aktivering") || a.includes("avrop")) return { entity: "Aktivering (Dispatch)", type: "Transaktionsdata" };
    if (a.includes("mätvärde") || a.includes("tidsserie")) return { entity: "Mätvärde (Measurement)", type: "Transaktionsdata" };
    if (a.includes("verifiering") || a.includes("resultat") || a.includes("avvikelse") || a.includes("levererad volym")) return { entity: "Verifieringsresultat", type: "Transaktionsdata" };

    // Fallback based on typical context if name is generic (e.g. "Status", "Period")
    // This is a simplification; ideally we check BRS context.
    return { entity: "Övrigt / Generell", type: "Transaktionsdata" };
};

interface Props {
    onNavigateToBRS: (id: string) => void;
}

export const InformationModelPage: React.FC<Props> = ({ onNavigateToBRS }) => {
  const [filter, setFilter] = useState<'all' | 'master' | 'transaction'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntities = entities.filter(e => filter === 'all' || e.category === filter);

  // Generate flat list of all attributes from all BRSs
  const attributeTableData = useMemo(() => {
    return brsList.flatMap(brs => 
        (brs.infoObjects || []).flatMap(io => 
            io.attributes.map(attr => {
                const mapping = mapAttributeToEntity(attr.attribute);
                return {
                    brsId: brs.id,
                    brsTitle: brs.title,
                    attribute: attr.attribute,
                    entity: mapping.entity,
                    type: mapping.type
                };
            })
        )
    ).filter(item => 
        item.attribute.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.brsId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.entity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Normaliserad informationsmodell</h1>
      <p style={styles.subHeader}>
        En konceptuell datamodell baserad på attributen definierade i systemets BRS:er. 
        Modellen skiljer på stamdata (långlivade objekt) och transaktionsdata (händelser).
      </p>

      <div style={{marginBottom: '32px'}}>
        <button 
            style={{...styles.toggleButton, ...(filter === 'all' ? styles.activeButton : {})}} 
            onClick={() => setFilter('all')}
        >
            Alla entiteter
        </button>
        <button 
            style={{...styles.toggleButton, ...(filter === 'master' ? styles.activeButton : {})}} 
            onClick={() => setFilter('master')}
        >
            📘 Master data
        </button>
        <button 
            style={{...styles.toggleButton, ...(filter === 'transaction' ? styles.activeButton : {})}} 
            onClick={() => setFilter('transaction')}
        >
            📙 Transaktionsdata
        </button>
      </div>

      <div style={styles.grid}>
        {filteredEntities.map((entity, idx) => (
          <div key={idx} style={styles.card}>
            <div style={entity.category === 'master' ? styles.cardHeaderMaster : styles.cardHeaderTrans}>
                <div style={{textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700, color: entity.category === 'master' ? '#0052cc' : '#974f0c', marginBottom: '4px'}}>
                    {entity.category === 'master' ? 'Master data' : 'Transaktionsdata'}
                </div>
                <div style={styles.entityName}>{entity.name}</div>
                <div style={styles.entityDesc}>{entity.description}</div>
            </div>
            
            <table style={styles.table}>
                <tbody>
                    {entity.attributes.map((attr, aIdx) => (
                        <tr key={aIdx}>
                            <td style={{...styles.td, fontWeight: 500, width: '40%'}}>
                                {attr.key && <span style={styles.keyBadge}>KEY</span>}
                                {attr.name}
                            </td>
                            <td style={{...styles.td, color: '#666', fontSize: '0.8rem', width: '20%'}}>
                                {attr.type}
                            </td>
                            <td style={{...styles.td, color: '#42526e'}}>
                                {attr.desc}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={styles.sourceContainer}>
                <div style={{fontSize: '0.75rem', fontWeight: 600, color: '#6b778c', marginBottom: '6px', textTransform: 'uppercase'}}>Definieras i:</div>
                {entity.sources.map(src => (
                    <span 
                        key={src} 
                        style={{...styles.sourceBadge, cursor: 'pointer', color: '#0052cc'}}
                        onClick={() => onNavigateToBRS(src)}
                        title={`Gå till ${src}`}
                    >
                        {src}
                    </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Attributkatalog (alla BRS)</h2>
      <div style={{marginBottom: '16px'}}>
          <input 
            type="text" 
            placeholder="Sök attribut..." 
            style={{padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc'}}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
      </div>
      <div style={{overflowX: 'auto', border: '1px solid #dfe1e6', borderRadius: '8px', maxHeight: '600px', overflowY: 'auto'}}>
          <table style={styles.table}>
              <thead>
                  <tr>
                      <th style={styles.th}>BRS-ID</th>
                      <th style={styles.th}>BRS-namn</th>
                      <th style={styles.th}>Informationsattribut</th>
                      <th style={styles.th}>Koppling till informationsmodell</th>
                      <th style={styles.th}>Typ</th>
                  </tr>
              </thead>
              <tbody>
                  {attributeTableData.map((row, idx) => (
                      <tr key={idx} style={idx % 2 === 0 ? {} : {backgroundColor: '#fafbfc'}}>
                          <td style={styles.td}>
                              <span 
                                style={{color: '#0052cc', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 600}}
                                onClick={() => onNavigateToBRS(row.brsId)}
                              >
                                {row.brsId}
                              </span>
                          </td>
                          <td style={styles.td}>{row.brsTitle}</td>
                          <td style={{...styles.td, fontWeight: 500}}>{row.attribute}</td>
                          <td style={styles.td}>{row.entity}</td>
                          <td style={styles.td}>
                              <span style={row.type === 'Master data' ? styles.typeBadgeMaster : styles.typeBadgeTrans}>
                                {row.type}
                              </span>
                          </td>
                      </tr>
                  ))}
                  {attributeTableData.length === 0 && (
                      <tr>
                          <td colSpan={5} style={{padding: '20px', textAlign: 'center', color: '#666'}}>Inga attribut hittades.</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
};
