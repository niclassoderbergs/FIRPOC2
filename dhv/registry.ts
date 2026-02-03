
import { BRSData, MPSData } from '../types';

import { dhvDomain1BRS, dhvDomain1MPS } from './domain1/registry';
import { dhvDomain2BRS, dhvDomain2MPS } from './domain2/registry';
import { dhvDomain6BRS, dhvDomain6MPS } from './domain6/registry';
import { dhvDomain7BRS, dhvDomain7MPS } from './domain7/registry';
import { dhvDomain9BRS, dhvDomain9MPS } from './domain9/registry';

export const dhvBRS: BRSData[] = [
  ...dhvDomain1BRS,
  ...dhvDomain2BRS,
  ...dhvDomain6BRS,
  ...dhvDomain7BRS,
  ...dhvDomain9BRS
];

export const dhvMPS: MPSData[] = [
  ...dhvDomain1MPS,
  ...dhvDomain2MPS,
  ...dhvDomain6MPS,
  ...dhvDomain7MPS,
  ...dhvDomain9MPS
];
