
import React from 'react';
import { domainInfo } from './domain-descriptions';

interface Props {
  onNavigateToDomain: (id: string) => void;
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
    marginBottom: '8px',
    color: '#172b4d'
  },
  subHeader: {
    fontSize: '1.1rem',
    color: '#5e6c84',
    marginBottom: '40px'
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
    padding: '24px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    boxSizing: 'border-box' as const,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  domainBadge: {
    backgroundColor: '#0052cc',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '0.9rem',
    marginRight: '12px'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#172b4d',
    margin: 0
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: '#42526e',
    lineHeight: '1.6',
    flex: 1
  },
  cardAction: {
    marginTop: '20px',
    fontWeight: 600,
    color: '#0052cc',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center'
  }
};

export const DomainOverviewPage: React.FC<Props> = ({ onNavigateToDomain }) => {
  const domains = Object.keys(domainInfo).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Domänöversikt</h1>
      <p style={styles.subHeader}>
        Det flexibla marknadssystemet (FIS) är uppdelat i 8 funktionella domäner för att tydliggöra ansvar och processer.
      </p>

      <div style={styles.grid}>
        {domains.map(id => {
          const info = domainInfo[id];
          return (
            <div 
              key={id} 
              style={styles.card}
              onClick={() => onNavigateToDomain(id)}
              onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
            >
              <div style={styles.cardHeader}>
                <span style={styles.domainBadge}>Domän {id}</span>
                <h3 style={styles.cardTitle}>{info.name}</h3>
              </div>
              <p style={styles.cardDesc}>
                {info.description}
              </p>
              <div style={styles.cardAction}>
                Utforska domän →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
