
import { CU, SPG, Bid } from './types';
export type { CU, SPG, Bid };

import { mockBSPs } from './data/bsps';
import { mockSPs } from './data/sps';
import { mockRegResponsibles } from './data/regResponsibles';
import { mockDSOs } from './data/dsos';
import { mockREs } from './data/res';
import { mockBRPs } from './data/brps';
import { mockCUs } from './data/cus';
import { mockSPGs } from './data/spgs';
import { mockGridConstraints } from './data/gridConstraints';
import { svkProducts } from './data/products';
import { baselineMethods } from './data/baselines';
import { mockBids } from './data/bids';
import { mockMarketStats, swedishMarketTotals } from './data/marketStats';
import { mockSPGProductApplications } from './data/spgProductApplications';
import { mockSPApplications } from './data/spApplications';

// SYSTEM TIME LOCK
export const POC_NOW = new Date('2026-01-31T10:00:00Z');

export { 
  mockBSPs, 
  mockSPs, 
  mockRegResponsibles,
  mockDSOs, 
  mockREs, 
  mockBRPs, 
  mockCUs, 
  mockSPGs, 
  mockGridConstraints, 
  svkProducts, 
  baselineMethods, 
  mockBids, 
  mockMarketStats, 
  swedishMarketTotals, 
  mockSPGProductApplications, 
  mockSPApplications 
};
