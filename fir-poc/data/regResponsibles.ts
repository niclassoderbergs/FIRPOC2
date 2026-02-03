
import { mockSPs } from './sps';

export const mockRegResponsibles = [
  // --- Inherit all Service Providers (who also have CURR permissions) ---
  ...mockSPs,

  // --- 10 Dedicated Technical Installation / Registration Entities (CURR Only) ---
  { name: 'ABB Grid Solutions', code: 'ABB-GS-01', scheme: 'GS1', businessId: '556000-1111', country: 'SE' },
  { name: 'Schneider Electric Services', code: 'SCHN-SERV', scheme: 'GS1', businessId: '556000-2222', country: 'SE' },
  { name: 'Siemens Energy Technical', code: 'SIEM-TECH', scheme: 'GS1', businessId: '556000-3333', country: 'SE' },
  { name: 'Nordic Grid Installers', code: 'NGI-REG', scheme: 'NSE', businessId: '556000-4444', country: 'SE' },
  { name: 'Technical Asset Management SE', code: 'TAM-SE', scheme: 'NSE', businessId: '556000-5555', country: 'SE' },
  { name: 'Grid Integrity Consultants', code: 'GIC-REG', scheme: 'NSE', businessId: '556000-6666', country: 'SE' },
  { name: 'Electra Onboarding AB', code: 'ELECTRA', scheme: 'GS1', businessId: '556000-7777', country: 'SE' },
  { name: 'Smart Infrastructure Partners', code: 'SIP-GRID', scheme: 'NSE', businessId: '556000-8888', country: 'SE' },
  { name: 'Asset Registration Services', code: 'ARS-FLEX', scheme: 'NSE', businessId: '556000-9999', country: 'SE' },
  { name: 'Power Engineering Nordics', code: 'PEN-TECH', scheme: 'GS1', businessId: '556000-0000', country: 'SE' }
];
