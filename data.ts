
import { BRSData, MPSData } from './types';

// Import Domain Registries
import { domain1BRS, domain1MPS } from './domain1/registry';
import { domain2BRS, domain2MPS } from './domain2/registry';
import { domain3BRS, domain3MPS } from './domain3/registry';
import { domain4BRS, domain4MPS } from './domain4/registry';
import { domain5BRS, domain5MPS } from './domain5/registry';
import { domain6BRS, domain6MPS } from './domain6/registry';
import { domain7BRS, domain7MPS } from './domain7/registry';
import { domain8BRS, domain8MPS } from './domain8/registry';
import { dhvBRS, dhvMPS } from './dhv/registry';

// Aggregate all BRS
export const brsList: BRSData[] = [
  ...domain1BRS,
  ...domain2BRS,
  ...domain3BRS,
  ...domain4BRS,
  ...domain5BRS,
  ...domain6BRS,
  ...domain7BRS,
  ...domain8BRS,
  ...dhvBRS
];

// Aggregate all MPS
export const mpsList: MPSData[] = [
  ...domain1MPS,
  ...domain2MPS,
  ...domain3MPS,
  ...domain4MPS,
  ...domain5MPS,
  ...domain6MPS,
  ...domain7MPS,
  ...domain8MPS,
  ...dhvMPS
];
