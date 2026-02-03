
import { mockSPs } from './sps';

export const mockRegResponsibles = [
  // --- Inherit all Service Providers (who also have CURR permissions) ---
  ...mockSPs,

  // --- 10 Dedicated Technical Installation / Registration Entities (CURR Only) ---
  { name: 'Delta Grid Infrastructure', code: 'DELTA-GRID', scheme: 'GS1', businessId: '556000-1111', country: 'SE' },
  { name: 'Dynamic Power Onboarding', code: 'DYN-POW', scheme: 'GS1', businessId: '556000-2222', country: 'SE' },
  { name: 'Global Energy Services', code: 'GLOBAL-EN', scheme: 'GS1', businessId: '556000-3333', country: 'SE' },
  { name: 'Grid Connect AB', code: 'GRID-CONN', scheme: 'NSE', businessId: '556000-4444', country: 'SE' },
  { name: 'Junction Tech Solutions', code: 'JUNC-TECH', scheme: 'NSE', businessId: '556000-5555', country: 'SE' },
  { name: 'J-Nordic Installation', code: 'J-NORDIC', scheme: 'NSE', businessId: '556000-6666', country: 'SE' },
  { name: 'Electra Onboarding AB', code: 'ELECTRA', scheme: 'GS1', businessId: '556000-7777', country: 'SE' },
  { name: 'Smart Infrastructure Partners', code: 'SIP-GRID', scheme: 'NSE', businessId: '556000-8888', country: 'SE' },
  { name: 'Asset Registration Services', code: 'ARS-FLEX', scheme: 'NSE', businessId: '556000-9999', country: 'SE' },
  { name: 'Power Engineering Nordics', code: 'PEN-TECH', scheme: 'GS1', businessId: '556000-0000', country: 'SE' }
];
