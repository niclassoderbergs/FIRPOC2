
import React from 'react';
import { BRSData } from './types';
import { renumberingMap } from './id-mapping';

interface Props {
  onBack: () => void;
  brsList: BRSData[];
}

const styles = {
  container: { padding: '40px', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' as const },
  header: { fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#172b4d' },
  subHeader: { fontSize: '1.1rem', color: '#5e6c84', marginBottom: '32px' },
  sectionHeader: { fontSize: '1.5rem', fontWeight: 600, marginTop: '48px', marginBottom: '16px', color: '#42526e', borderBottom: '2px solid #ebecf0', paddingBottom: '8px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontSize: '0.9rem', border: '1px solid #dfe1e6', marginBottom: '24px' },
  th: { backgroundColor: '#f4f5f7', color: '#172b4d', padding: '12px 16px', textAlign: 'left' as const, borderBottom: '2px solid #dfe1e6', fontWeight: 600, position: 'sticky' as const, top: 0 },
  td: { padding: '10px 16px', borderBottom: '1px solid #dfe1e6', verticalAlign: 'middle' as const, color: '#172b4d', lineHeight: '1.5' },
  backButton: { padding: '8px 16px', backgroundColor: '#e6effc', color: '#0052cc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginBottom: '20px' },
  changeTag: { display: 'inline-block', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600 },
  
  // Tag colors
  noChange: { backgroundColor: '#f4f5f7', color: '#505f79' },
  standard: { backgroundColor: '#e3fcef', color: '#006644' }, // Green for good standardizations
  structure: { backgroundColor: '#deebff', color: '#0747a6' }, // Blue for structural moves
  warning: { backgroundColor: '#fffae6', color: '#ff8b00' }, // Orange for oddities
};

export const RenumberingProposalPage: React.FC<Props> = ({ onBack, brsList }) => {
  
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>← Tillbaka</button>
      
      <h1 style={styles.header}>ID Omnumrering - Resultat</h1>
      <p style={styles.subHeader}>
        Genomförd standardisering av BRS ID-strukturen. Nedan visas mappningen mellan gammalt och nytt ID.
      </p>

      <div style={{
          backgroundColor: '#e3fcef', 
          padding: '24px', 
          borderRadius: '8px', 
          marginBottom: '32px',
          borderLeft: '4px solid #006644'
      }}>
        <h3 style={{marginTop:0, color: '#006644'}}>✅ Omnumrering implementerad</h3>
        <p style={{lineHeight: 1.6, color: '#172b4d'}}>
            Systemet har migrerats till den nya ID-strukturen för att skapa enhetlighet och logik.
        </p>
        <ul style={{lineHeight: 1.6, color: '#172b4d'}}>
            <li><strong>CRUD-konsekvens:</strong> Slutsiffran indikerar nu handlingen: 
                <strong> 1</strong> = Skapa (Create), 
                <strong> 2</strong> = Uppdatera (Update), 
                <strong> 3</strong> = Ta bort (Delete), 
                <strong> 4</strong> = Läsa (Read/List).
            </li>
            <li><strong>Notifieringar:</strong> Alla notifieringsprocesser slutar konsekvent på <strong>9</strong>.</li>
            <li><strong>Marknad (Domän 7):</strong> Tydlig separation av processer: 
                <strong> 70x</strong> = TSO Kapacitet, 
                <strong> 71x</strong> = DSO Kapacitet, 
                <strong> 73x</strong> = TSO Energi, 
                <strong> 74x</strong> = DSO Energi.
            </li>
            <li><strong>Systemprocesser:</strong> Interna systemprocesser har fått 4-siffriga IDn (t.ex. 1020 istället för 1040) och matchar numera sin "förälder"-process (102 &rarr; 1020).</li>
        </ul>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nytt ID</th>
            <th style={styles.th}>Gammalt ID</th>
            <th style={styles.th}>Titel</th>
            <th style={styles.th}>Typ av ändring</th>
          </tr>
        </thead>
        <tbody>
          {renumberingMap.map((item, idx) => (
            <tr key={idx} style={idx % 2 === 0 ? {} : {backgroundColor: '#fafbfc'}}>
              <td style={{...styles.td, fontWeight: 700, color: '#0052cc'}}>{item.newId}</td>
              <td style={{...styles.td, color: '#5e6c84', textDecoration: item.newId !== item.oldId ? 'line-through' : 'none'}}>{item.oldId}</td>
              <td style={{...styles.td, fontSize: '0.85rem'}}>{item.title}</td>
              <td style={styles.td}>
                <span style={{
                    ...styles.changeTag,
                    ...(item.type === 'no_change' ? styles.noChange :
                        item.type === 'standard' ? styles.standard :
                        item.type === 'structure' ? styles.structure :
                        styles.warning)
                }}>
                    {item.type === 'no_change' ? 'Ingen ändring' :
                     item.type === 'standard' ? 'Standardisering' :
                     item.type === 'structure' ? 'Struktur' : 'Varning'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
