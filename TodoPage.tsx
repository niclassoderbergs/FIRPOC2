
import React from 'react';

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
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '32px'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  cardHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #dfe1e6',
    backgroundColor: '#f4f5f7',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#172b4d',
    margin: 0
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    padding: '16px 24px',
    borderBottom: '1px solid #ebecf0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '0.95rem',
    color: '#172b4d',
    lineHeight: 1.5
  },
  checkbox: {
    marginTop: '4px',
    cursor: 'pointer',
    width: '18px',
    height: '18px'
  },
  icon: {
    fontSize: '1.2rem'
  }
};

type TodoArea = {
    title: string;
    icon: string;
    items: string[];
};

const todos: TodoArea[] = [
    {
        title: 'Tidslinje',
        icon: '📅',
        items: [
            'Kontrollera NC DR datum',
            'Fixa datumen för regulatoriska förutsättningar alt 3'
        ]
    },
    {
        title: 'Driftsättning',
        icon: '🚀',
        items: [
            'Kvalitetssäkra',
            'Lägg till Områdeshantering (nätförlustleverantör, anvisningsleverantör)'
        ]
    },
    {
        title: 'FIS',
        icon: '⚡',
        items: [
            'Skapa BRS och MPS för TSO-notifiering vid skapande av SPU och SPG'
        ]
    },
    {
        title: 'DHV',
        icon: '💾',
        items: [
            "Uppdatera DHV BRS'er",
            "Uppdatera DHV MPS'er",
            "Skapa BRS för att notifiera TSO om nytt planobjekt"
        ]
    },
    {
        title: 'Storyline',
        icon: '📖',
        items: [
            'Skapa resa för planobjekt'
        ]
    }
];

export const TodoPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Att göra</h1>
      <p style={styles.subHeader}>
        Översikt över utestående arbetsuppgifter och punkter att hantera per område.
      </p>

      <div style={styles.grid}>
        {todos.map((area) => (
            <div key={area.title} style={styles.card}>
                <div style={styles.cardHeader}>
                    <span style={styles.icon}>{area.icon}</span>
                    <h3 style={styles.cardTitle}>{area.title}</h3>
                </div>
                <ul style={styles.list}>
                    {area.items.length > 0 ? (
                        area.items.map((item, idx) => (
                            <li key={idx} style={styles.listItem}>
                                <input type="checkbox" style={styles.checkbox} />
                                <span>{item}</span>
                            </li>
                        ))
                    ) : (
                        <li style={{...styles.listItem, color: '#666', fontStyle: 'italic'}}>
                            Inga punkter registrerade.
                        </li>
                    )}
                </ul>
            </div>
        ))}
      </div>
    </div>
  );
};
