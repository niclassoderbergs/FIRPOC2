
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

export const DhvDomain2Page: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>DHV Domän 2: Kund & Avtal</h1>
      
      <div style={styles.descriptionBox}>
        Denna domän hanterar de kommersiella processerna på elmarknaden. Den reglerar kopplingen mellan slutkund, elleverantör och nätägare genom att administrera leveransavtal och kunduppgifter. Det är här marknadens rörlighet (Churn) hanteras.
      </div>

      <h2 style={styles.sectionHeader}>Marknadsprocesser</h2>
      <p style={styles.text}>
        Domänen ansvarar för att orkestrera tidslinjer och valideringar för följande kärnprocesser:
      </p>
      <ul style={styles.list}>
        <li>
            <strong>Leverantörsbyte (Supplier Switching):</strong>
            Hanterar processen när en kund byter från en elleverantör till en annan. Systemet validerar tidsfrister (t.ex. 14 dagar innan start) och notifierar den frånträdande leverantören samt nätägaren.
        </li>
        <li>
            <strong>Inflyttning (Move-in):</strong>
            Processen när en kund tar över en anläggning. Detta skapar en ny leverans och avslutar eventuella tidigare kontrakt på anläggningen.
        </li>
        <li>
            <strong>Utflyttning (Move-out):</strong>
            Hanterar avslut av leverans när en kund lämnar en anläggning. Om ingen ny kund flyttar in övergår anläggningen till "Avtalslös" eller anvisad leverans beroende på regelverk.
        </li>
        <li>
            <strong>Avslut av leverans:</strong>
            Processer för att avsluta kontrakt på grund av andra orsaker än flytt, t.ex. avtalsbrott.
        </li>
      </ul>

      <h2 style={styles.sectionHeader}>Kundinformation</h2>
      <p style={styles.text}>
        Datahubben agerar "Golden Record" för viss kundinformation kopplad till anläggningen. Domänen säkerställer att förändringar i kunddata (t.ex. namnbyte vid giftermål eller ändrad fakturaadress) synkroniseras till berörda parter (Nätägare och Elleverantör).
      </p>

      <h2 style={styles.sectionHeader}>Anvisad Leverans & Mottagningsplikt</h2>
      <p style={styles.text}>
        Domänen innehåller logik för att automatiskt tilldela en elleverantör (Anvisad leverantör) om en anläggning står utan aktivt avtal men har förbrukning, för att säkerställa att ingen energiförbrukning sker utan en ansvarig balanspart.
      </p>
    </div>
  );
};
