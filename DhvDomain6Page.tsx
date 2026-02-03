
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
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '16px',
    lineHeight: '1.6',
    color: '#172b4d'
  }
};

export const DhvDomain6Page: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>DHV Domän 6: Mätvärden</h1>
      
      <div style={styles.descriptionBox}>
        Denna domän ansvarar för insamling, validering, lagring och distribution av energimätvärden. Det är flödet av dessa data som utgör grunden för all fakturering och balansavräkning på den svenska elmarknaden.
      </div>

      <h2 style={styles.sectionHeader}>Insamling & Validering</h2>
      <p style={styles.text}>
        Nätägaren ansvarar för att läsa av mätare och rapportera in värden till Datahubben.
      </p>
      <ul style={styles.list}>
        <li><strong>Daglig inrapportering:</strong> Mätvärden för dygnets alla timmar (eller kvartar) rapporteras in dagligen.</li>
        <li><strong>Validering:</strong> Datahubben utför teknisk och logisk validering vid mottagandet (t.ex. att värden inte är negativa, att serien är komplett, och att mätpunkten var aktiv under perioden).</li>
        <li><strong>Estimerade värden:</strong> Systemet hanterar flaggor för mätvärdeskvalitet (Mätt vs Uppskattat) och stödjer processer för att ersätta estimerade värden med faktiska värden i efterhand.</li>
      </ul>

      <h2 style={styles.sectionHeader}>Distribution</h2>
      <p style={styles.text}>
        Så snart mätvärden har validerats och lagrats, ansvarar denna domän för att distribuera dem till behöriga aktörer:
      </p>
      <ul style={styles.list}>
        <li><strong>Elleverantören:</strong> För fakturering av slutkund.</li>
        <li><strong>Balansansvarig (BRP):</strong> För uppföljning av balansportföljen.</li>
        <li><strong>Tjänsteleverantörer (ESCO):</strong> Tredjepartsaktörer som kunden gett fullmakt till.</li>
      </ul>

      <h2 style={styles.sectionHeader}>Mätvärdestyper</h2>
      <p style={styles.text}>
        Systemet hanterar flera typer av energistorheter:
      </p>
      <ul style={styles.list}>
        <li><strong>Aktiv Energi:</strong> Uttag (Konsumtion) och Inmatning (Produktion).</li>
        <li><strong>Reaktiv Energi:</strong> För nätanalys och debitering av reaktiv effekt.</li>
        <li><strong>Mätarställningar:</strong> Ackumulerade värden som används för avstämning.</li>
      </ul>
    </div>
  );
};
