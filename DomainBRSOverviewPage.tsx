
import React, { useMemo, useState } from 'react';
import { BRSData } from './types';
import { domainInfo } from './domain-descriptions';

interface Props {
  brsData: BRSData[];
  domainId: string;
  onNavigateToBRS: (id: string) => void;
}

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
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#172b4d'
  },
  subHeader: {
    fontSize: '1.1rem',
    color: '#5e6c84',
    marginBottom: '24px'
  },
  descriptionBox: {
    backgroundColor: '#f4f5f7',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '32px',
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#172b4d',
    borderLeft: '4px solid #268099' 
  },
  // Search Bar
  searchContainer: {
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    flexWrap: 'wrap' as const
  },
  searchLabel: {
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#172b4d'
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #dfe1e6',
    fontSize: '0.9rem',
    flex: 1,
    minWidth: '200px',
    maxWidth: '400px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  },
  filterSelect: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #dfe1e6',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  // List Styles
  listContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0px'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 8px',
    borderBottom: '1px solid #ebecf0',
    cursor: 'pointer',
    transition: 'background-color 0.1s'
  },
  listItemHover: {
    backgroundColor: '#f9f9f9'
  },
  itemLink: {
    color: '#4b2c85', 
    fontWeight: 600,
    fontSize: '1.05rem',
    textDecoration: 'underline',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  itemBadge: {
    backgroundColor: '#268099', 
    color: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.85rem',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  tagBadge: {
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
    border: '1px solid'
  }
};

// Tag config mapping
const getTagConfig = (tag: string) => {
    switch (tag) {
        case 'NON_DHV_2026':
            return { label: 'Ej DHV 2026', bg: '#ffebe6', color: '#bf2600', border: '#ffbdad' };
        default:
            return { label: tag, bg: '#eae6ff', color: '#403294', border: '#c0b6f2' };
    }
};

// Helper to extract the primary actor (usually Initiator)
const getPrimaryActor = (brs: BRSData): string => {
    // Try to find initiator
    const initiator = brs.actors.find(a => a.role.toLowerCase().includes('initiator'));
    if (initiator) return initiator.description;
    
    // Fallback to first actor or "Unknown"
    return brs.actors[0]?.description || 'System';
};

export const DomainBRSOverviewPage: React.FC<Props> = ({ brsData, domainId, onNavigateToBRS }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string>('ALL');

  const domainBRSs = useMemo(() => {
     return brsData
        .filter(b => {
           if (domainId === '9') {
               return b.id.startsWith('BRS-DHV-8');
           }
           return b.id.startsWith(`BRS-FLEX-${domainId}`) || b.id.startsWith(`BRS-DHV-${domainId}`);
        })
        .sort((a, b) => {
            const numA = parseInt(a.id.replace(/\D/g, ''), 10);
            const numB = parseInt(b.id.replace(/\D/g, ''), 10);
            return numA - numB;
        });
  }, [brsData, domainId]);

  const filteredBRSs = useMemo(() => {
      let filtered = domainBRSs;

      // Tag Filter
      if (tagFilter !== 'ALL') {
          if (tagFilter === 'NON_DHV_2026') {
              filtered = filtered.filter(b => b.tags?.includes('NON_DHV_2026'));
          } else if (tagFilter === 'DHV_2026_ONLY') {
              filtered = filtered.filter(b => !b.tags?.includes('NON_DHV_2026'));
          }
      }

      // Search Filter
      if (searchTerm) {
          const lower = searchTerm.toLowerCase();
          filtered = filtered.filter(b => 
              b.id.toLowerCase().includes(lower) || 
              b.title.toLowerCase().includes(lower) || 
              b.purpose.toLowerCase().includes(lower)
          );
      }

      return filtered;
  }, [domainBRSs, searchTerm, tagFilter]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Business Requirement Specification (BRS)</h1>
      <p style={styles.subHeader}>
        Domän {domainId}: {domainInfo[domainId]?.name}
      </p>

      {domainInfo[domainId] && (
        <div style={styles.descriptionBox}>
            {domainInfo[domainId].description}
        </div>
      )}

      <div style={styles.searchContainer}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', flex: 1}}>
            <label style={styles.searchLabel}>Sök:</label>
            <input 
                type="text" 
                placeholder="Sök transaktion..." 
                style={styles.searchInput}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <label style={styles.searchLabel}>Visa:</label>
            <select 
                style={styles.filterSelect}
                value={tagFilter}
                onChange={e => setTagFilter(e.target.value)}
            >
                <option value="ALL">Alla processer</option>
                <option value="DHV_2026_ONLY">Endast DHV 2026 relevanta</option>
                <option value="NON_DHV_2026">Ej relevanta för DHV 2026</option>
            </select>
        </div>
      </div>

      <div style={styles.listContainer}>
        {filteredBRSs.map(brs => (
            <div 
                key={brs.id}
                style={{
                    ...styles.listItem,
                    ...(hoveredItem === brs.id ? styles.listItemHover : {})
                }}
                onMouseEnter={() => setHoveredItem(brs.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onNavigateToBRS(brs.id)}
            >
                <div style={styles.itemLink}>
                    <span>{brs.id} - {brs.title}</span>
                    {brs.tags?.map(tag => {
                        const conf = getTagConfig(tag);
                        return (
                            <span 
                                key={tag} 
                                style={{
                                    ...styles.tagBadge, 
                                    backgroundColor: conf.bg, 
                                    color: conf.color, 
                                    borderColor: conf.border
                                }}
                            >
                                {conf.label}
                            </span>
                        );
                    })}
                </div>
                <div style={styles.itemBadge}>
                    {getPrimaryActor(brs)}
                </div>
            </div>
        ))}
      </div>
      
      {filteredBRSs.length === 0 && (
          <div style={{color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '40px'}}>
              Inga transaktioner hittades som matchar filtret.
          </div>
      )}
    </div>
  );
};
