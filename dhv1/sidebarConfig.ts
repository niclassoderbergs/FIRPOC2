
import { BRSData, MPSData } from '../types';
import { ViewMode } from './menuConfig';

export interface DhvDomainConfig {
    id: string;
    title: string;
    view: ViewMode;
    mpsFilter: (m: MPSData) => boolean;
    brsFilter: (b: BRSData) => boolean;
}

// Helper lists for specific filtering
const d1_5xx = ['519','520','542','543','562','564','565','582','583'];
const d1_mps = ['01', '02', '03'];
const d2_mps = ['04', '05', '06', '07', '08'];
const d6_mps = ['09', '10', '11', '12', '13', '14'];
const d7_mps = ['23', '24', '25', '26', '27', '28'];
const d9_mps = ['15', '16', '17', '18', '19', '20', '21', '22'];

export const dhvDomains: DhvDomainConfig[] = [
    {
        id: 'domain1',
        title: 'Domän 1: Mätpunkt',
        view: 'dhvDomain1',
        mpsFilter: (m) => d1_mps.some(s => m.id.startsWith(`MPS-DHV-${s}`)),
        brsFilter: (b) => b.id.startsWith('BRS-DHV-1') || d1_5xx.some(s => b.id === `BRS-DHV-${s}`)
    },
    {
        id: 'domain2',
        title: 'Domän 2: Kund och avtal',
        view: 'dhvDomain2',
        mpsFilter: (m) => d2_mps.some(s => m.id.startsWith(`MPS-DHV-${s}`)),
        brsFilter: (b) => {
            if (b.id.startsWith('BRS-DHV-2')) return true;
            if (b.id.startsWith('BRS-DHV-5') && !d1_5xx.some(s => b.id === `BRS-DHV-${s}`)) return true;
            return false;
        }
    },
    {
        id: 'domain6',
        title: 'Domän 6: Mätvärden',
        view: 'dhvDomain6',
        mpsFilter: (m) => d6_mps.some(s => m.id.startsWith(`MPS-DHV-${s}`)),
        brsFilter: (b) => b.id.startsWith('BRS-DHV-6')
    },
    {
        id: 'domain7',
        title: 'Domän 7: Nätavräkning',
        view: 'dhvDomain7',
        mpsFilter: (m) => d7_mps.some(s => m.id === `MPS-DHV-${s}`),
        brsFilter: (b) => b.id.startsWith('BRS-DHV-7')
    },
    {
        id: 'domain9',
        title: 'Domän 9: Nättariffer',
        view: 'domainLanding', // Special case handling in click handler usually
        mpsFilter: (m) => d9_mps.some(s => m.id === `MPS-DHV-${s}`),
        brsFilter: (b) => b.id.startsWith('BRS-DHV-8')
    }
];
