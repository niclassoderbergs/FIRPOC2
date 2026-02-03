
import React from 'react';

const styles = {
  container: {
    padding: '40px 60px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const,
    maxWidth: '1200px',
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
  text: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#172b4d',
    marginBottom: '16px'
  }
};

export const DhvDomain9Page: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>DHV Domän 9: Nättariffer</h1>
      
      <div style={styles.descriptionBox}>
        Denna domän hanterar administration och distribution av nättariffer och nätavgifter i Datahubben.
      </div>

      <h2 style={styles.sectionHeader}>Funktionalitet</h2>
      <p style={styles.text}>
        Nätägare kan registrera tariffer och koppla dessa till nätområden. De kan även rapportera nätavgifter för specifika anläggningar.
        Elleverantörer och andra aktörer kan hämta tariffinformation och aggregerade avgifter för fakturering.
      </p>
      
      <h2 style={styles.sectionHeader}>Omfattning</h2>
      <p style={styles.text}>
        Processerna täcker hela livscykeln från registrering av en tariff, uppdatering av priser, till koppling mot nätområden och distribution till marknadens aktörer.
      </p>
    </div>
  );
};
