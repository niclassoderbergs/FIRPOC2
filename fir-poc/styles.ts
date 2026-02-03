
export const pocStyles = {
  layout: {
    display: 'flex',
    backgroundColor: '#f4f5f7',
    minHeight: 'calc(100vh - 64px)', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#172b4d'
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#fff',
    borderRight: '1px solid #dfe1e6',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '16px 0',
    flexShrink: 0,
    // Sticky logic
    position: 'sticky' as const,
    top: 0,
    height: 'calc(100vh - 64px)',
    zIndex: 10,
    overflowY: 'auto' as const // Added to enable scrolling in the menu
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'visible' as const // Allow sticky children to work
  },
  topBar: {
    backgroundColor: '#1d2125',
    color: '#fff',
    padding: '0 24px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    // Sticky logic
    position: 'sticky' as const,
    top: 0,
    zIndex: 100
  },
  content: {
    padding: '32px 40px',
    flex: 1
    // Removed internal overflow to let mainScroll handle it
  },
  section: {
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    marginBottom: '24px',
    padding: '24px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '24px',
    color: '#172b4d',
    borderBottom: '1px solid #ebecf0',
    paddingBottom: '12px'
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#172b4d',
    marginBottom: '24px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.9rem'
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 16px',
    borderBottom: '2px solid #ebecf0',
    color: '#6b778c',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    fontWeight: 600
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #ebecf0',
    color: '#172b4d'
  },
  row: {
    cursor: 'pointer',
    transition: 'background-color 0.1s'
  },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    fontWeight: 700,
    backgroundColor: '#ebecf0',
    color: '#42526e'
  },
  badgeGreen: {
    backgroundColor: '#e3fcef',
    color: '#006644'
  },
  badgeBlue: {
    backgroundColor: '#deebff',
    color: '#0052cc'
  },
  actionButton: {
    padding: '6px 12px',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: 500
  }
};
