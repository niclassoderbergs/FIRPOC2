
import React from 'react';
import { ChevronRight, TowerControl, Briefcase, Zap, Users, UserPlus, ShieldCheck } from 'lucide-react';
import { pocStyles } from '../../styles';

interface Props {
  partyName: string;
  roles: { isDSO: boolean; isRE: boolean; isBRP: boolean; isSP: boolean; isBSP?: boolean; isREG?: boolean };
  onBack: () => void;
}

export const PartyHeader: React.FC<Props> = ({ partyName, roles, onBack }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ ...pocStyles.pageTitle, marginBottom: '12px' }}>{partyName}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {roles.isSP && (
              <span style={{ ...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> Service Provider (SP)
              </span>
            )}
            {roles.isBSP && (
              <span style={{ ...pocStyles.badge, backgroundColor: '#e6effc', color: '#0052cc', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={12} /> Balance Service Provider (BSP)
              </span>
            )}
            {roles.isREG && (
              <span style={{ ...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <UserPlus size={12} /> CU Registration Responsible
              </span>
            )}
            {roles.isDSO && (
              <span style={{ ...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <TowerControl size={12} /> Grid Owner (DSO)
              </span>
            )}
            {roles.isRE && (
              <span style={{ ...pocStyles.badge, backgroundColor: '#fff3e0', color: '#e65100', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={12} /> Electricity Supplier (RE)
              </span>
            )}
            {roles.isBRP && (
              <span style={{ ...pocStyles.badge, backgroundColor: '#e8f5e9', color: '#1b5e20', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={12} /> Balance Responsible (BRP)
              </span>
            )}
          </div>
        </div>
        <button style={{ ...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6' }}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};
