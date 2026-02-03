
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

export const DhvDomain7Page: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>DHV Domän 7: Nätavräkning</h1>
      
      <div style={styles.descriptionBox}>
        Denna domän utgör motorn för den svenska balansavräkningen. Den aggregerar mätvärden från Domän 6 och fördelar energivolymer på marknadens aktörer (Balansansvariga och Elleverantörer) per nätområde och budområde.
      </div>

      <h2 style={styles.sectionHeader}>Aggregering & Profilering</h2>
      <p style={styles.text}>
        För att möjliggöra avräkning utför systemet dagliga och månatliga beräkningar:
      </p>
      <ul style={styles.list}>
        <li>
            <strong>Schablonprofilering (Jämförbrukning):</strong> 
            För anläggningar som inte är timmätta beräknas en förbrukningsprofil baserat på typkurvor och residualer i nätområdet (MGA Residual).
        </li>
        <li>
            <strong>Nätförluster:</strong> 
            Skillnaden mellan inmatad energi och uttagen energi i ett nätområde beräknas som nätförlust, vilken nätägaren ansvarar för att anskaffa.
        </li>
        <li>
            <strong>Aggregering:</strong> 
            Totala volymer summeras per Balansansvarig (BRP) och Elleverantör i varje nätområde.
        </li>
      </ul>
      
      <h2 style={styles.sectionHeader}>Korrigeringsavräkning (Correction Settlement)</h2>
      <p style={styles.text}>
        Eftersom mätvärden kan justeras i efterhand (upp till 3 år), körs regelbundna korrigeringsavräkningar.
      </p>
      <ul style={styles.list}>
        <li>Systemet identifierar skillnader mellan preliminär avräkning och slutgiltiga mätvärden.</li>
        <li>Ekonomiska underlag (Fakturarader) genereras för att reglera dessa differenser mellan marknadens parter.</li>
        <li>Aktörer (BRP/Elleverantörer) kan hämta dessa resultat via specifika BRS-processer för att justera sin fakturering.</li>
      </ul>

      <h2 style={styles.sectionHeader}>Statistik & Rapportering</h2>
      <p style={styles.text}>
        Domänen genererar även den officiella statistiken för Sveriges energianvändning, import/export mellan budområden och total produktion, vilket rapporteras vidare till bl.a. eSett och SCB.
      </p>
    </div>
  );
};
