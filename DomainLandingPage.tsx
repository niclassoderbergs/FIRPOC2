
import React, { useMemo } from 'react';
import { BRSData, MPSData } from './types';
import { domainInfo } from './domain-descriptions';

interface Props {
  domainId: string;
  brsData: BRSData[];
  mpsData: MPSData[];
  onNavigateToBRS: (id: string) => void;
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
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '16px',
    color: '#172b4d'
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
  sectionHeader: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '40px',
    marginBottom: '20px',
    color: '#172b4d',
    borderBottom: '2px solid #ebecf0',
    paddingBottom: '8px'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    boxSizing: 'border-box' as const
  },
  cardType: {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
    color: '#6b778c'
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#0052cc',
    marginBottom: '8px'
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: '#5e6c84',
    lineHeight: '1.5',
    flex: 1
  },
  actorTag: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#e6effc',
    color: '#0052cc',
    borderRadius: '16px',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginRight: '8px',
    marginBottom: '8px'
  },
  emptyState: {
    color: '#6b778c',
    fontStyle: 'italic'
  }
};

export const DomainLandingPage: React.FC<Props> = ({ domainId, brsData, mpsData, onNavigateToBRS, onNavigateToMPS }) => {
  
  const info = domainInfo[domainId] || { name: `Domän ${domainId}`, description: 'Ingen beskrivning tillgänglig.' };

  const domainBRSs = useMemo(() => {
    return brsData
       .filter(b => {
           if (domainId === '9') {
               return b.id.startsWith('BRS-DHV-8');
           }
           return b.id.startsWith(`BRS-FLEX-${domainId}`) || b.id.startsWith(`BRS-DHV-${domainId}`);
       })
       .sort((a, b) => {
           // Numeric sort for BRS IDs
           const numA = parseInt(a.id.replace(/\D/g, ''), 10);
           const numB = parseInt(b.id.replace(/\D/g, ''), 10);
           return numA - numB;
       });
  }, [brsData, domainId]);

  const domainMPSs = useMemo(() => {
    return mpsData
       .filter(m => {
           if (domainId === '9') {
             // Inga MPS för domän 9 ännu, eller om de kommer så lär de heta MPS-DHV-09 etc.
             // Uppdatera vid behov. Just nu visar vi inga MPS för 9 om de inte matchar standard.
             return false;
           }
           return m.id.startsWith(`MPS-FLEX-${domainId}`) || m.id.startsWith(`MPS-DHV-0${domainId}`);
       })
       .sort((a, b) => {
           // Numeric sort for MPS IDs
           const numA = parseInt(a.id.replace(/\D/g, ''), 10);
           const numB = parseInt(b.id.replace(/\D/g, ''), 10);
           return numA - numB;
       });
  }, [mpsData, domainId]);

  const involvedActors = useMemo(() => {
      const actors = new Set<string>();
      domainBRSs.forEach(brs => {
          brs.actors.forEach(a => {
             // Look at the description field which contains the actual actor name
             // rather than the role (which is usually Initiator/Receiver)
             const desc = a.description.toUpperCase();
             
             if (desc.includes('SP') || desc.includes('SERVICE PROVIDER')) actors.add('Service Provider (SP)');
             else if (desc.includes('TSO') || desc.includes('SYSTEMOPERATÖR')) actors.add('Systemoperatör (TSO)');
             else if (desc.includes('DSO') || desc.includes('NÄTÄGARE') || desc.includes('GRID OWNER')) actors.add('Nätägare (DSO)');
             else if (desc.includes('FIS') || desc.includes('FLEXIBILITETSREGISTRET')) actors.add('Flexibilitetsregistret (FIS)');
             else if (desc.includes('BRP') || desc.includes('BALANSANSVARIG')) actors.add('Balansansvarig (BRP)');
             else if (desc.includes('DHV') || desc.includes('DATAHUB')) actors.add('Datahub (DHV)');
             else if (desc.includes('ELLEVERANTÖR') || desc.includes('SUPPLIER')) actors.add('Elleverantör');
             else if (desc.includes('NEMO')) actors.add('NEMO');
             else if (desc.includes('SLUTKUND') || desc.includes('FINAL CUSTOMER')) actors.add('Slutkund');
             else if (desc.includes('ESCO')) actors.add('ESCO');
          });
      });
      return Array.from(actors).sort();
  }, [domainBRSs]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Domän {domainId}: {info.name}</h1>
      
      <div style={styles.descriptionBox}>
        {info.description}
      </div>

      <h2 style={styles.sectionHeader}>Involverade Aktörer</h2>
      <div style={{marginBottom: '32px'}}>
          {involvedActors.length > 0 ? (
              involvedActors.map(actor => (
                  <span key={actor} style={styles.actorTag}>{actor}</span>
              ))
          ) : (
              <span style={styles.emptyState}>Inga specifika aktörer identifierade i denna domän.</span>
          )}
      </div>

      <h2 style={styles.sectionHeader}>Marknadsprocesser (MPS)</h2>
      {domainMPSs.length > 0 ? (
          <div style={styles.cardGrid}>
            {domainMPSs.map(mps => (
                <div 
                    key={mps.id} 
                    style={styles.card}
                    onClick={() => onNavigateToMPS(mps.id)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={styles.cardType}>{mps.id}</div>
                    <div style={styles.cardTitle}>{mps.title}</div>
                    <div style={styles.cardDesc}>
                        {mps.purpose.length > 120 ? mps.purpose.substring(0, 120) + '...' : mps.purpose}
                    </div>
                </div>
            ))}
          </div>
      ) : (
          <p style={styles.emptyState}>Inga MPS definierade i denna domän än.</p>
      )}

      <h2 style={styles.sectionHeader}>Affärstransaktioner (BRS)</h2>
      {domainBRSs.length > 0 ? (
          <div style={styles.cardGrid}>
            {domainBRSs.map(brs => (
                <div 
                    key={brs.id} 
                    style={styles.card}
                    onClick={() => onNavigateToBRS(brs.id)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={styles.cardType}>{brs.id}</div>
                    <div style={styles.cardTitle}>{brs.title}</div>
                    <div style={styles.cardDesc}>
                        {brs.purpose.length > 120 ? brs.purpose.substring(0, 120) + '...' : brs.purpose}
                    </div>
                </div>
            ))}
          </div>
      ) : (
          <p style={styles.emptyState}>Inga BRS definierade i denna domän än.</p>
      )}

    </div>
  );
};
