
import React from 'react';
import { FileText, Mail } from 'lucide-react';
import { pocStyles } from '../../styles';

interface Props {
  isDSO: boolean;
  isRE: boolean;
}

export const TechnicalDetails: React.FC<Props> = ({ isDSO, isRE }) => {
  return (
    <div style={pocStyles.section}>
      <h3 style={pocStyles.sectionTitle}>
        <FileText size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
        Administrative & Technical Identifiers
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase' }}>Ediel ID</span>
          <span style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 600 }}>
            {isDSO ? '10000' : (isRE ? '40900' : '81140')}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase' }}>EIC Code</span>
          <span style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 600 }}>
            {isDSO ? '10XSE-GRID-OPER-8' : '46X000000000018V'}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b778c', textTransform: 'uppercase' }}>Primary Contact</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
            <Mail size={14} color="#6b778c" /> operational-support@energy.se
          </span>
        </div>
      </div>
    </div>
  );
};
