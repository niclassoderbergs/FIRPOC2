
import React, { useMemo, useState } from 'react';
import { BRSData, MPSData } from './types';
import { domainInfo } from './domain-descriptions';

interface Props {
  brsData: BRSData[];
  mpsData: MPSData[];
  domainId: string;
  onNavigateToBRS: (id: string) => void;
}

const styles = {
  container: {
    padding: '40px 60px',
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
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginTop: '48px',
    marginBottom: '16px',
    color: '#0052cc',
    borderBottom: '2px solid #ebecf0',
    paddingBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.9rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #dfe1e6',
    backgroundColor: 'white',
    marginBottom: '24px'
  },
  th: {
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 16px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600
  },
  td: {
    padding: '10px 16px',
    borderBottom: '1px solid #dfe1e6',
    verticalAlign: 'middle' as const,
    color: '#172b4d'
  },
  brsId: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: '#0052cc',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  domainBadge: {
    display: 'inline-block',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: '#ebecf0',
    color: '#42526e',
    cursor: 'help'
  },
  infoBox: {
    backgroundColor: '#deebff',
    borderLeft: '4px solid #0052cc',
    padding: '16px 20px',
    borderRadius: '4px',
    marginBottom: '32px',
    color: '#172b4d',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  infoTitle: {
    fontWeight: 700,
    marginBottom: '8px',
    display: 'block',
    color: '#0747a6'
  },
  statBreakdown: {
    fontSize: '0.85rem',
    fontWeight: 400,
    color: '#5e6c84',
    marginLeft: '16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }
};

const getActorCategories = (brs: BRSData): string[] => {
  const categories = new Set<string>();
  const titleLower = brs.title.toLowerCase();
  const isNotification = titleLower.includes('notifier') || titleLower.includes('notify');
  
  brs.actors.forEach(actor => {
      const roleLower = actor.role.toLowerCase();
      const descLower = actor.description.toLowerCase();
      
      let isRelevant = false;
      if (isNotification) {
          if (roleLower.includes('mottagare') || roleLower.includes('receiver')) isRelevant = true;
      } else {
          if (roleLower.includes('initiator')) isRelevant = true;
      }

      if (isRelevant) {
          if (descLower.includes('bsp')) {
              categories.add('Balance Service Provider (BSP)');
              categories.add('Service Provider (SP)');
          }
          if (descLower.includes('sp') || descLower.includes('service provider')) categories.add('Service Provider (SP)');
          if (descLower.includes('tso') || descLower.includes('systemoperatör')) categories.add('Systemoperatör (TSO)');
          if (descLower.includes('dso') || descLower.includes('nätägare') || descLower.includes('grid owner')) categories.add('Nätägare (DSO)');
          if (descLower.includes('brp') || descLower.includes('balansansvarig')) categories.add('Balansansvarig (BRP)');
          if (descLower.includes('elleverantör') || descLower.includes('supplier')) categories.add('Elleverantör');
          if (descLower.includes('nemo')) categories.add('NEMO');
          if (descLower.includes('slutkund') || descLower.includes('final customer') || descLower.includes('kund')) categories.add('Slutkund');
          if (descLower.includes('dhv') || descLower.includes('datahub')) categories.add('Datahub (DHV)');
          if (descLower.includes('esco')) categories.add('ESCO');
          
          if ((descLower.includes('fis') || descLower.includes('system') || descLower.includes('admin')) && 
              !descLower.includes('systemoperatör') && 
              !descLower.includes('connecting system operator') &&
              !descLower.includes('datahub')) {
              categories.add('System / FIS (Admin)');
          }
      }
  });

  if (categories.size === 0) {
      const firstActorDesc = brs.actors[0]?.description.toLowerCase() || '';
      if (firstActorDesc.includes('sp')) return ['Service Provider (SP)']; 
      return ['Övriga / Ospecificerad'];
  }

  return Array.from(categories);
};

const definedCategories = [
  'Service Provider (SP)',
  'Balance Service Provider (BSP)',
  'Systemoperatör (TSO)',
  'Nätägare (DSO)',
  'Balansansvarig (BRP)',
  'Elleverantör',
  'NEMO',
  'Slutkund',
  'ESCO',
  'Datahub (DHV)',
  'System / FIS (Admin)',
  'Övriga / Ospecificerad'
];

export const DomainActorOverviewPage: React.FC<Props> = ({ brsData, domainId, onNavigateToBRS }) => {

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

  const { groupedData, spuCount, spgCount, reduction, expansionCount } = useMemo(() => {
    const groups: Record<string, BRSData[]> = {};
    
    definedCategories.forEach(cat => groups[cat] = []);

    let spu = 0;
    let spg = 0;
    let expansion = 0;

    domainBRSs.forEach(brs => {
      if (brs.title.includes('SPU')) spu++;
      if (brs.title.includes('SPG')) spg++;

      const categories = getActorCategories(brs);
      
      if (categories.length > 1) {
          expansion += (categories.length - 1);
      }

      categories.forEach(cat => {
          if (!groups[cat]) groups[cat] = []; 
          groups[cat].push(brs);
      });
    });

    return { 
        groupedData: groups, 
        spuCount: spu, 
        spgCount: spg, 
        reduction: Math.min(spu, spg),
        expansionCount: expansion
    };
  }, [domainBRSs]);

  const getDomainInfo = (id: string) => {
    let num = '';
    if (id.startsWith('BRS-DHV-8')) {
        num = '9';
    } else {
        const match = id.match(/BRS-FLEX-(\d)/) || id.match(/BRS-DHV-(\d)/);
        num = match ? match[1] : '';
    }
    return {
        label: num ? `Domän ${num}` : '-',
        title: domainInfo[num]?.name || ''
    };
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Aktörsöversikt: Domän {domainId}</h1>
      <p style={styles.subHeader}>
        En sammanställning av alla affärstransaktioner (BRS) i domän {domainId}, grupperat per ansvarig aktör.
      </p>

      {definedCategories.map(category => {
        const items = groupedData[category];
        if (items.length === 0) return null;

        let initiating = 0;
        let notifications = 0;
        let automatic = 0;

        items.forEach(brs => {
            const titleLower = brs.title.toLowerCase();
            const match = brs.id.match(/BRS-FLEX-(\d+)/) || brs.id.match(/BRS-DHV-(\d+)/);
            const numId = match ? parseInt(match[1], 10) : 0;
            const isFourDigit = numId >= 1000;
            
            if (titleLower.includes('notifier') || titleLower.includes('notify')) {
                notifications++;
            } else if (isFourDigit || titleLower.startsWith('system:')) {
                automatic++;
            } else {
                initiating++;
            }
        });

        return (
          <div key={category}>
            <h2 style={styles.sectionTitle}>
              {category} 
              <span style={{
                  marginLeft: '12px', 
                  fontSize: '0.9rem', 
                  fontWeight: 400, 
                  color: '#6b778c', 
                  backgroundColor: '#f4f5f7', 
                  padding: '2px 8px', 
                  borderRadius: '12px'
              }}>
                  {items.length} processer
              </span>
              <div style={styles.statBreakdown}>
                 {initiating > 0 && (
                     <span style={styles.statItem} title="Handlingar som aktören initierar">
                         ⚡ <strong>{initiating}</strong> Initierande
                     </span>
                 )}
                 {notifications > 0 && (
                     <span style={styles.statItem} title="Meddelanden som aktören tar emot">
                         🔔 <strong>{notifications}</strong> Notifieringar
                     </span>
                 )}
                 {automatic > 0 && (
                     <span style={styles.statItem} title="Automatiska systemfunktioner (4-siffriga)">
                         ⚙️ <strong>{automatic}</strong> Automatiska
                     </span>
                 )}
              </div>
            </h2>
            
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{...styles.th, width: '15%'}}>ID</th>
                  <th style={{...styles.th, width: '15%'}}>Domän</th>
                  <th style={{...styles.th, width: '40%'}}>Titel</th>
                  <th style={{...styles.th, width: '30%'}}>Syfte (Kort)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((brs, idx) => {
                  const domainInfo = getDomainInfo(brs.id);
                  return (
                    <tr key={brs.id} style={idx % 2 === 1 ? {backgroundColor: '#fafbfc'} : {}}>
                        <td style={styles.td}>
                        <span 
                            style={styles.brsId} 
                            onClick={() => onNavigateToBRS(brs.id)}
                        >
                            {brs.id}
                        </span>
                        </td>
                        <td style={styles.td}>
                            <span 
                                style={styles.domainBadge} 
                                title={domainInfo.title}
                            >
                                {domainInfo.label}
                            </span>
                        </td>
                        <td style={{...styles.td, fontWeight: 500}}>{brs.title}</td>
                        <td style={{...styles.td, fontSize: '0.85rem', color: '#5e6c84'}}>
                            {brs.purpose.length > 100 ? brs.purpose.substring(0, 100) + '...' : brs.purpose}
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
