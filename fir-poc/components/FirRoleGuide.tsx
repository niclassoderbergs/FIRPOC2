
import React from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  UserPlus, 
  TowerControl, 
  Zap, 
  Users, 
  Globe,
  Layers,
  Info,
  Database
} from 'lucide-react';

const roles = [
  {
    title: 'Service Provider (SP)',
    icon: ShieldCheck,
    color: '#006d5b',
    bg: '#e6fffa',
    desc: 'The primary aggregator in FIR. Manages commercial flex-agreements and structures technical resources (CUs) into bidding groups (SPGs).',
    isBundle: true
  },
  {
    title: 'Balance Service Provider (BSP)',
    icon: Briefcase,
    color: '#0747a6',
    bg: '#deebff',
    desc: 'Required for traceability when an SP sells services from an SPG to the TSO balancing market. Must hold a valid BSP agreement with the TSO.',
    isBundle: true
  },
  {
    title: 'CU Reg. Responsible (CURR)',
    icon: UserPlus,
    color: '#4a148c',
    bg: '#f3e5f5',
    desc: 'Handles the technical life cycle in FIR, including onboarding, updating, and decommissioning of controllable units (CUs).',
    isBundle: true
  },
  {
    title: 'Datahub (DHV)',
    icon: Database,
    color: '#0747a6',
    bg: '#deebff',
    desc: 'Provides relationships, meter values, and technical point data. Ensures that settlement is performed for the correct parties at any given time.'
  },
  {
    title: 'System Operator (TSO)',
    icon: Globe,
    color: '#0052cc',
    bg: '#e6effc',
    desc: 'Validates market bids against FIR capacity. Receives verified volumes for BSP payment, BRP imbalance adjustment, and RE compensation.'
  },
  {
    title: 'Grid Owner (DSO)',
    icon: TowerControl,
    color: '#4a148c',
    bg: '#f3e5f5',
    desc: 'Performs grid pre-qualifications and manages grid constraints in FIR. Receives verified delivery data for their local flexibility markets.'
  },
  {
    title: 'Retail Entity (RE)',
    icon: Zap,
    color: '#e65100',
    bg: '#fff3e0',
    desc: 'Electricity supplier for the customer. Receives verified activation data from FIR as a basis for financial compensation.'
  },
  {
    title: 'Balance Responsible (BRP)',
    icon: Users,
    color: '#1b5e20',
    bg: '#e8f5e9',
    desc: 'Responsible for balancing. Receives verified volumes from FIR for neutralization to avoid imbalance costs.'
  }
];

export const FirRoleGuide: React.FC = () => {
  return (
    <div style={{ 
      backgroundColor: '#fff',
      border: '1px solid #dfe1e6',
      borderLeft: '6px solid #0052cc',
      borderRadius: '12px',
      padding: '28px 32px',
      marginBottom: '40px',
      boxShadow: '0 4px 20px rgba(0, 82, 204, 0.08)',
      background: 'linear-gradient(to right, #f8fbff, #ffffff)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '24px',
        paddingLeft: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users size={20} color="#0052cc" />
            <h3 style={{ 
              margin: 0, 
              fontSize: '0.95rem', 
              fontWeight: 800, 
              color: '#172b4d', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              Market Roles & FIR Relationships
            </h3>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontSize: '0.75rem', 
          color: '#0052cc', 
          backgroundColor: '#e6effc', 
          padding: '6px 14px', 
          borderRadius: '20px',
          fontWeight: 700,
          border: '1px solid #b3d4ff'
        }}>
            <Layers size={14} />
            <span>Commercial Bundle: Highlighted roles are typically the same entity</span>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '16px' 
      }}>
        {roles.map((role, idx) => (
          <div 
            key={idx}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #dfe1e6',
              borderTop: role.isBundle ? '4px solid #0052cc' : '1px solid #dfe1e6',
              borderRadius: '10px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                backgroundColor: role.bg, 
                color: role.color, 
                padding: '8px', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <role.icon size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '0.9rem', color: '#172b4d', fontWeight: 700 }}>{role.title}</strong>
                {role.isBundle && (
                  <span style={{ fontSize: '0.6rem', color: '#0052cc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    Bundle
                  </span>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  color: '#6b778c', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px' 
                }}>
                    <Info size={10} /> Relation to FIR
                </div>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.8rem', 
                  color: '#42526e', 
                  lineHeight: '1.5' 
                }}>
                  {role.desc}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
