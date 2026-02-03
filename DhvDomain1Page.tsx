
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

export const DhvDomain1Page: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>DHV Domän 1: Mätpunkt & Grunddata</h1>
      
      <div style={styles.descriptionBox}>
        Denna domän utgör fundamentet i Elmarknadshubben. Den hanterar det nationella registret över samtliga mätpunkter (anläggningar) och utbytespunkter i det svenska elnätet. Det är här den "sanna" informationen om en anläggnings tekniska och administrativa attribut ägs och förvaltas.
      </div>

      <h2 style={styles.sectionHeader}>Analys av Domänen</h2>
      <p style={styles.text}>
        Baserat på specifikationerna (BRS/MPS) i systemet fungerar Domän 1 som navet för masterdata. Dess primära syfte är att säkerställa att marknadens aktörer – Nätägare, Elleverantörer och Tjänsteleverantörer – har en gemensam och uppdaterad bild av mätpunkterna.
      </p>

      <h2 style={styles.sectionHeader}>Huvudprocesser</h2>
      <ul style={styles.list}>
        <li>
            <strong>Livscykelhantering av Kundmätpunkter:</strong>
            Processer för att registrera nya anläggningar (nyanslutning), uppdatera attribut (t.ex. säkringsstorlek eller adress) samt avregistrera anläggningar (rasering). Detta styrs av Nätägaren.
        </li>
        <li>
            <strong>Hantering av Utbytespunkter:</strong>
            Särskilda processer för mätpunkter som binder samman olika nätområden. Här inkluderas logik för att notifiera angränsande nätägare vid förändringar.
        </li>
        <li>
            <strong>Informationsspridning:</strong>
            Strukturerade processer (Request/Response) där behöriga aktörer (Elleverantörer, ESCOs) kan begära ut stamdata för att möjliggöra avtalstecknande och kundservice.
        </li>
        <li>
            <strong>Nätavtalsinformation:</strong>
            Funktionalitet för att registrera huruvida ett giltigt nätavtal existerar för anläggningen, vilket ofta är en förutsättning för leveransstart.
        </li>
      </ul>

      <h2 style={styles.sectionHeader}>Affärsregler & Integritet</h2>
      <p style={styles.text}>
        Domänen upprätthåller strikta regler för dataintegritet. Exempelvis kan en mätpunkt inte registreras i ett nätområde som nätägaren inte ansvarar för, och historik (versioner) sparas vid varje uppdatering för att säkerställa korrekt avräkning bakåt i tiden.
      </p>
    </div>
  );
};
