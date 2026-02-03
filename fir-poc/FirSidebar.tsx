
import React from 'react';
import { 
  LayoutDashboard, 
  Box, 
  Users, 
  Activity, 
  FileText, 
  Settings, 
  Bell, 
  AlertCircle,
  ShieldAlert,
  TrendingUp,
  Briefcase,
  Zap,
  TowerControl,
  List,
  Gavel,
  CheckCircle2,
  FileBarChart,
  FilePieChart,
  UserPlus,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { pocStyles } from './styles';

export type PocView = 
  | 'dashboard' 
  | 'cus' 
  | 'spgs' 
  | 'prequalification'
  | 'grid_constraints'
  | 'grid_constraint_detail'
  | 'sp_applications'
  | 'spg_applications'
  | 'prod_types'
  | 'entities'
  | 'parties'
  | 'sp'
  | 'bsp'
  | 'dsos'
  | 'res'
  | 'brps'
  | 'reg_responsible'
  | 'events'
  | 'notifications'
  | 'notices'
  | 'baselines'
  | 'local_markets'
  | 'local_market_detail'
  | 'overview'
  | 'bids_received'
  | 'bids_activated'
  | 'verification'
  | 'settlement_result'
  | 'brp_settlement'
  | 're_settlement';

interface SidebarProps {
  currentView: PocView;
  onNavigate: (view: PocView) => void;
}

export const FirSidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  
  const renderItem = (view: PocView, IconComponent: any, label: string) => {
    const isActive = currentView === view || (view === 'grid_constraints' && currentView === 'grid_constraint_detail') || (view === 'local_markets' && currentView === 'local_market_detail');
    return (
      <div 
        onClick={() => onNavigate(view)}
        style={{
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: isActive ? '#0052cc' : '#42526e',
          fontSize: '0.9rem',
          cursor: 'pointer',
          borderLeft: `3px solid ${isActive ? '#0052cc' : 'transparent'}`,
          backgroundColor: isActive ? '#e6effc' : 'transparent',
          fontWeight: isActive ? 500 : 400
        }}
      >
        <IconComponent size={18} color={isActive ? '#0052cc' : 'currentColor'} /> {label}
      </div>
    );
  };

  const renderTitle = (title: string) => (
    <div style={{
      padding: '16px 24px 8px',
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: '#6b778c',
      marginTop: '8px'
    }}>
      {title}
    </div>
  );

  return (
    <div style={pocStyles.sidebar}>
        <div style={{padding: '0 24px 24px', fontSize: '1.2rem', fontWeight: 700, color: '#172b4d'}}>
          The Flexibility Information System
        </div>

        {renderItem('dashboard', LayoutDashboard, 'Dashboard')}

        {renderTitle('Basic resources')}
        {renderItem('cus', Box, 'Controllable units')}
        {renderItem('prequalification', Activity, 'CU Grid Prequalification')}
        {renderItem('grid_constraints', ShieldAlert, 'Temporary grid constraints')}
        {renderItem('spgs', Users, 'Service providing groups')}

        {renderTitle('Bids')}
        {renderItem('bids_received', Gavel, 'Received')}
        {renderItem('bids_activated', Zap, 'Activated')}

        {renderTitle('Settlement')}
        {renderItem('verification', CheckCircle2, 'Verification Status')}
        {renderItem('settlement_result', FileBarChart, 'BSP settlement')}
        {renderItem('brp_settlement', FilePieChart, 'BRP settlement')}
        {renderItem('re_settlement', FilePieChart, 'RE settlement')}

        {renderTitle('Market parameter')}
        {renderItem('baselines', TrendingUp, 'Baselines')}
        {renderItem('prod_types', Settings, 'Product types')}
        {renderItem('local_markets', MapPin, 'Local flexmarknad')}

        {renderTitle('Product application')}
        {renderItem('sp_applications', FileText, 'Service provider applications')}
        {renderItem('spg_applications', FileText, 'SPG product applications')}

        {renderTitle('Roles')}
        {renderItem('parties', List, 'Overview')}
        {renderItem('reg_responsible', UserPlus, 'CU Registration Responsible')}
        {renderItem('sp', ShieldCheck, 'Service Providers (SP)')}
        {renderItem('bsp', Briefcase, 'Balance Service Providers (BSP)')}
        {renderItem('dsos', TowerControl, 'DSO')}
        {renderItem('res', Zap, 'RE (Retailer)')}
        {renderItem('brps', Users, 'BRP')}

        {renderTitle('System')}
        {renderItem('events', Bell, 'Events')}
        {renderItem('notifications', Bell, 'Notifications')}
        {renderItem('notices', AlertCircle, 'Notices')}
      </div>
  );
};
