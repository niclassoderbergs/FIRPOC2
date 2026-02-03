
export const commonStyles = {
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
    marginBottom: '24px',
    color: '#172b4d'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    borderBottom: '2px solid #ebecf0',
    marginBottom: '40px',
    flexWrap: 'wrap' as const
  },
  tab: {
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: 600,
    color: '#5e6c84',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    transition: 'all 0.2s'
  },
  activeTab: {
    color: '#0052cc',
    borderBottom: '2px solid #0052cc'
  },
  rangeHeader: {
    marginTop: '24px',
    marginBottom: '8px',
    fontWeight: 700,
    fontSize: '1rem',
    color: '#172b4d',
    backgroundColor: '#e6effc',
    padding: '8px 12px',
    borderRadius: '4px',
    display: 'inline-block',
    border: '1px solid #b3d4ff'
  },
  // Table Styles
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '20px',
    fontSize: '0.9rem'
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px',
    borderBottom: '2px solid #dfe1e6',
    color: '#42526e'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ebecf0',
    color: '#172b4d',
    verticalAlign: 'top' as const
  },
  input: {
    width: '100%',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #0052cc',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    boxSizing: 'border-box' as const
  },
  select: {
    width: '100%',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #0052cc',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: '#fff'
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#e6effc',
    color: '#0052cc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
    marginBottom: '16px'
  },
  roleBadge: {
    fontSize: '0.7rem',
    fontWeight: 700,
    borderRadius: '4px',
    padding: '2px 4px',
    marginRight: '6px',
    width: '12px',
    display: 'inline-block',
    textAlign: 'center' as const
  },
  roleItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2px',
      fontSize: '0.75rem',
      color: '#42526e'
  },
  scenarioToggle: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    backgroundColor: '#f4f5f7',
    padding: '4px',
    borderRadius: '4px',
    width: 'fit-content'
  },
  scenarioBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'all 0.2s'
  },
  sliderContainer: {
    margin: '24px 0',
    padding: '16px',
    backgroundColor: '#f4f5f7',
    borderRadius: '8px',
    border: '1px solid #dfe1e6'
  },
  statusBadge: {
    fontSize: '0.7rem',
    padding: '2px 8px',
    borderRadius: '12px',
    textTransform: 'uppercase' as const,
    fontWeight: 700
  }
};

export const getStatusStyle = (status: string) => {
    switch(status) {
        case 'completed': return { backgroundColor: '#e3fcef', color: '#006644', border: '1px solid #36b37e' };
        case 'current': return { backgroundColor: '#deebff', color: '#0747a6', border: '1px solid #0052cc' };
        default: return { backgroundColor: '#f4f5f7', color: '#505f79', border: '1px solid #dfe1e6' };
    }
};

export const getStatusLabel = (status: string) => {
    switch(status) {
        case 'completed': return 'Klar';
        case 'current': return 'Pågående';
        default: return 'Planerad';
    }
};
