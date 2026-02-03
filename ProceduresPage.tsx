
import React from 'react';
import { brsList } from './data';
import { procedures, implementationMap } from './jwg-data';

const styles = {
  container: {
    padding: '40px',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontSize: '0.9rem',
    border: '1px solid #dfe1e6'
  },
  th: {
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 16px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600,
    position: 'sticky' as const,
    top: 0
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #dfe1e6',
    verticalAlign: 'top' as const,
    color: '#172b4d',
    lineHeight: '1.5'
  },
  trEven: {
    backgroundColor: '#fafbfc'
  },
  idCell: {
    fontWeight: 700,
    color: '#42526e',
    width: '50px',
    textAlign: 'center' as const
  },
  brsTag: {
    display: 'inline-block',
    backgroundColor: '#e6effc',
    color: '#0052cc',
    borderRadius: '3px',
    padding: '2px 6px',
    margin: '0',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid #b3d4ff'
  },
  missingTag: {
    display: 'inline-block',
    color: '#bf2600',
    fontStyle: 'italic',
    fontSize: '0.8rem'
  },
  viewButton: {
    backgroundColor: '#0052cc',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '4px 8px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    marginTop: '4px'
  },
  warning: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: '8px',
    color: '#bf2600',
    fontSize: '0.9rem',
    cursor: 'help'
  }
};

interface ProceduresPageProps {
  onNavigateToBRS: (id: string) => void;
  onNavigateToProcedure?: (id: number) => void;
}

export const ProceduresPage: React.FC<ProceduresPageProps> = ({ onNavigateToBRS, onNavigateToProcedure }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>JWG Annex - processlista</h1>
      <p style={styles.subHeader}>
        Nedan listas de identifierade processerna från "Implementing Regulation on interoperability requirements and non-discriminatory and transparent procedures for access to and exchange of data for demand response" och deras koppling till FIS BRS-dokumentation.
      </p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nr</th>
            <th style={styles.th}>Processnamn</th>
            <th style={styles.th}>Beskrivning / Händelse</th>
            <th style={{...styles.th, width: '35%'}}>Kopplad BRS</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((proc, index) => {
            // Kontrollera om listan matchar implementationen
            const declaredBRS = proc.brs || [];
            const implementedBRS = implementationMap[proc.id] || [];
            
            // Hitta skillnader
            const missingInImplementation = declaredBRS.filter(x => !implementedBRS.includes(x));
            const missingInList = implementedBRS.filter(x => !declaredBRS.includes(x));
            
            // Flagga om det finns skillnader, men ignorera om implementationMap är tom (t.ex. för processer > 34 om de fanns)
            const hasMismatch = (missingInImplementation.length > 0 || missingInList.length > 0) && implementedBRS.length > 0;
            
            const warningTooltip = hasMismatch 
                ? `Mismatch detected!\nListed but missing in code: ${missingInImplementation.join(', ') || 'None'}\nFound in code but missing in list: ${missingInList.join(', ') || 'None'}`
                : '';

            return (
                <tr key={proc.id} style={index % 2 === 1 ? styles.trEven : {}}>
                <td style={{...styles.td, ...styles.idCell}}>{proc.id}</td>
                <td style={{...styles.td, fontWeight: 600, width: '25%'}}>
                    {proc.name}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34].includes(proc.id) && onNavigateToProcedure && (
                    <div>
                        <button 
                        style={styles.viewButton} 
                        onClick={() => onNavigateToProcedure(proc.id)}
                        >
                        Se detaljer
                        </button>
                    </div>
                    )}
                </td>
                <td style={styles.td}>{proc.desc}</td>
                <td style={styles.td}>
                    {declaredBRS.length > 0 ? (
                    declaredBRS.map(brsId => {
                        const brsObj = brsList.find(b => b.id === brsId);
                        return (
                            <div key={brsId} style={{marginBottom: '8px'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span 
                                    style={styles.brsTag}
                                    onClick={() => onNavigateToBRS(brsId)}
                                    title={`Gå till ${brsId}`}
                                    >
                                    {brsId}
                                    </span>
                                </div>
                                {brsObj && (
                                    <div style={{fontSize: '0.75rem', color: '#666', marginTop: '2px', paddingLeft: '2px'}}>
                                        {brsObj.title}
                                    </div>
                                )}
                            </div>
                        );
                    })
                    ) : (
                    <span style={styles.missingTag}>Ej täckt</span>
                    )}
                    
                    {hasMismatch && (
                        <span style={styles.warning} title={warningTooltip}>
                            ⚠️ <span style={{fontSize: '0.7rem', marginLeft: '4px', textDecoration: 'underline'}}>Mismatch</span>
                        </span>
                    )}
                </td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
