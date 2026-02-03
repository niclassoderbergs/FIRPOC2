
import React, { useMemo, useState } from 'react';
import { MPSData } from './types';

interface Props {
  mpsData: MPSData[];
  domainId: string;
  onNavigateToMPS: (id: string) => void;
}

const styles = {
  container: {
    padding: '40px 60px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const,
    maxWidth: '1500px',
    margin: '0 auto'
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
    marginBottom: '24px'
  },
  descriptionBox: {
    backgroundColor: '#f4f5f7',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '32px',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#172b4d',
    borderLeft: '4px solid #0052cc'
  },
  // Search Bar
  searchContainer: {
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  searchLabel: {
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#172b4d'
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #dfe1e6',
    fontSize: '0.9rem',
    flex: 1,
    maxWidth: '400px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  },
  // List Styles
  listContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0px'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column' as const, // Changed to column to stack header and scenarios
    padding: '20px 12px',
    borderBottom: '1px solid #ebecf0',
    transition: 'background-color 0.1s'
  },
  mpsHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%'
  },
  itemLink: {
    color: '#4b2c85',
    fontWeight: 600,
    fontSize: '1.1rem',
    textDecoration: 'none',
    marginRight: '16px'
  },
  itemBadge: {
    backgroundColor: '#0052cc',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.85rem',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  triggerText: {
    fontSize: '0.85rem',
    color: '#5e6c84',
    fontStyle: 'italic',
    marginTop: '4px'
  },
  // Scenario List Styles
  scenarioList: {
    marginTop: '16px',
    paddingLeft: '16px',
    borderLeft: '2px solid #ebecf0',
    marginLeft: '4px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  scenarioItem: {
    fontSize: '0.9rem',
    color: '#42526e',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    transition: 'background-color 0.1s, transform 0.1s'
  },
  scenarioId: {
      fontFamily: 'monospace',
      fontWeight: 600,
      marginRight: '12px',
      color: '#0052cc',
      fontSize: '0.85rem',
      backgroundColor: '#e6effc',
      padding: '2px 6px',
      borderRadius: '3px'
  }
};

const domainNames: Record<string, string> = {
  '1': 'Master data och aggregeringsobjekt',
  '2': 'Avtal & marknad',
  '3': 'Produkt & förkvalificering',
  '4': 'Nätbegränsningar',
  '5': 'Baseline',
  '6': 'Mätvärden',
  '7': 'Verifiering & budgivning',
  '8': 'Aktörsadministration'
};

const domainDescriptions: Record<string, string> = {
  '1': 'Marknadsprocesserna i denna domän beskriver livscykeln för tekniska och kommersiella resurser. Detta inkluderar onboarding av CU, etablering av SPU/SPG, samt hantering av ändringar och avregistrering. Processerna täcker både aktörsinitierade flöden och automatiska systemfunktioner för att upprätthålla dataintegritet.',
  '2': 'Beskriver flöden för avtalshantering. Här definieras hur flexibilitetsavtal skapas och avslutas, vare sig det initieras av SP, av slutkund via Datahubben ("Mina sidor"), eller automatiskt av systemet vid t.ex. utflytt.',
  '3': 'Omfattar processerna för att kvalificera resurser. Detta inkluderar flöden för administrativ granskning av produktansökan, Nätförkvalificering (analys av DSO) samt Produktförkvalificering (fysiska aktiveringstester och godkännande).',
  '4': 'Beskriver flöden för hantering av nätrestriktioner. Hur DSO identifierar flaskhalsar, registrerar begränsningar och hur marknaden notifieras. Denna information används därefter kritiskt i Domän 7 för att validera bud.',
  '5': 'Hanterar processer kring baseline. Inkluderar administration av godkända metoder (av TSO/DSO) samt utlämnande av information om dessa till aktörer. Vidare beskrivs flödet för SP att välja metod för en CU och hur beräknade/rapporterade baseline-värden hanteras. Även när SP registrerar baseline kan FIS behöva genomföra en egen kontrollberäkning för validering innan distribution till marknaden.',
  '6': 'Beskriver flöden för mätdata och leveransuppföljning. SP rapporterar mätvärden för CU, vilket triggar notifiering till berörda aktörer som även kan begära datan. Inkluderar flöden för att registrera beräknad aktiverad volym (utfört av SP om de äger baseline, annars av FIS för kontroll) samt hämtning av mätpunktsdata från Datahub.',
  '7': 'Hanterar det operativa marknadsflödet och säkerställer teknisk genomförbarhet. TSO och DSO validerar kapacitets- och energibud mot resursers (CU) tekniska egenskaper och nätbegränsningar innan acceptans. Accepterade bud och aktiveringar registreras, varpå faktiskt utfall beräknas baserat på data från Domän 6. Avvikelser rapporteras tillbaka till aktören. Slutligen allokerar FIS volymerna per Balansansvarig (BRP) för obalansjustering i balansavräkningen, samt per Elleverantör för hantering av ekonomisk kompensation, och notifierar berörda parter.',
  '8': 'Beskriver administrativa processer för marknadsaktörer (företaget), såsom registrering, kvalificering av företag, samt hantering av suspendering och återaktivering.'
};

export const DomainMPSOverviewPage: React.FC<Props> = ({ mpsData, domainId, onNavigateToMPS }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const visibleMPSs = useMemo(() => {
     // Filter by domain
     let list = mpsData.filter(m => m.id.startsWith(`MPS-FLEX-${domainId}`));

     // Sort naturally
     list.sort((a, b) => {
         const numA = parseInt(a.id.replace(/\D/g, ''), 10);
         const numB = parseInt(b.id.replace(/\D/g, ''), 10);
         return numA - numB;
     });
     
     // Filter out failure scenarios
     return list.map(mps => ({
         ...mps,
         scenarios: mps.scenarios.filter(sc => {
             const t = sc.title.toLowerCase();
             return !(t.includes('misslyckad') || t.includes('avslag') || t.includes('underkänt'));
         })
     }));
  }, [mpsData, domainId]);

  const filteredMPSs = useMemo(() => {
      if (!searchTerm) return visibleMPSs;
      const lower = searchTerm.toLowerCase();
      return visibleMPSs.filter(m => 
          m.id.toLowerCase().includes(lower) || 
          m.title.toLowerCase().includes(lower) || 
          m.purpose.toLowerCase().includes(lower) ||
          m.scenarios.some(sc => sc.title.toLowerCase().includes(lower))
      );
  }, [visibleMPSs, searchTerm]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Market Process Scenarios (MPS)</h1>
      <p style={styles.subHeader}>
        Domän {domainId}: {domainNames[domainId]}
      </p>

      {domainDescriptions[domainId] && (
        <div style={styles.descriptionBox}>
            {domainDescriptions[domainId]}
        </div>
      )}

      <div style={styles.searchContainer}>
        <label style={styles.searchLabel}>Filter:</label>
        <input 
            type="text" 
            placeholder="Sök process eller scenario..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={styles.listContainer}>
        {filteredMPSs.map(mps => (
            <div key={mps.id} style={styles.listItem}>
                
                {/* Main MPS Header */}
                <div 
                    style={styles.mpsHeaderRow} 
                    onClick={() => onNavigateToMPS(mps.id)}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    <div style={{flex: 1}}>
                        <div style={styles.itemLink}>
                            {mps.id.replace('MPS-FLEX-', '')} - {mps.title}
                        </div>
                        {mps.trigger && (
                            <div style={styles.triggerText}>
                                Trigger: {mps.trigger}
                            </div>
                        )}
                    </div>
                    <div style={styles.itemBadge}>
                        {mps.scenarios.length} Scenarier
                    </div>
                </div>

                {/* Scenarios List */}
                <div style={styles.scenarioList}>
                    {mps.scenarios.map(sc => (
                        <div 
                            key={sc.id} 
                            style={styles.scenarioItem}
                            onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToMPS(sc.id);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f4f5f7';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <span style={styles.scenarioId}>{sc.id}</span>
                            <span>{sc.title}</span>
                        </div>
                    ))}
                </div>

            </div>
        ))}
      </div>
      
      {filteredMPSs.length === 0 && (
          <div style={{color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '40px'}}>
              Inga processer hittades.
          </div>
      )}
    </div>
  );
};
