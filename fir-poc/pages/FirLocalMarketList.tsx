
import React from 'react';
import { pocStyles } from '../styles';
import { MapPin, Info, TowerControl, ChevronRight, Zap } from 'lucide-react';
import { mockLocalMarkets } from '../mockData';

interface Props {
  onSelect: (id: string) => void;
}

export const FirLocalMarketList: React.FC<Props> = ({ onSelect }) => {
  return (
    <div style={pocStyles.content}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ ...pocStyles.pageTitle, marginBottom: '8px' }}>Local Markets</h1>
          <p style={{ color: '#6b778c', fontSize: '0.9rem' }}>Regional and local flexibility platforms integrated with the FIR.</p>
        </div>
      </div>

      <div style={{ ...pocStyles.section, padding: '20px', backgroundColor: '#f9f8ff', border: '1px solid #e1bee7', display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '32px' }}>
        <Info size={24} color="#4a148c" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#4a148c', fontWeight: 700 }}>About Local Market Integration</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.5' }}>
            Local markets (LFM) are operated by DSOs or third parties. FIR ensures that resources participating in these markets are technically qualified and that activations do not conflict with transmission-level balancing or grid security constraints.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
        {mockLocalMarkets.map(market => (
          <div 
            key={market.id} 
            onClick={() => onSelect(market.id)}
            style={{ 
              backgroundColor: '#fff', 
              border: '1px solid #dfe1e6', 
              borderRadius: '12px', 
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = '#0052cc';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#dfe1e6';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ backgroundColor: '#e6effc', padding: '10px', borderRadius: '8px', color: '#0052cc' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#172b4d' }}>{market.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: '#6b778c', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <TowerControl size={12} /> {market.owner}
                  </div>
                </div>
              </div>
              <span style={{ ...pocStyles.badge, ...pocStyles.badgeGreen }}>{market.status}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#42526e', lineHeight: '1.5', margin: 0 }}>
              {market.description}
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebecf0', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {market.products.map(p => (
                  <span key={p} style={{ ...pocStyles.badge, backgroundColor: '#f0f7ff', color: '#0052cc', fontSize: '0.7rem' }}>
                    <Zap size={10} style={{ display: 'inline', marginRight: '4px' }} /> {p}
                  </span>
                ))}
              </div>
              <div style={{ color: '#0052cc', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Manage Market <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
