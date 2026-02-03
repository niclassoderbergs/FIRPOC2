
import { BRSData, MPSData } from '../../types';

// BRS
import { brsDhv741 } from './brs/brs-dhv-741';
import { brsDhv743 } from './brs/brs-dhv-743';
import { brsDhv744 } from './brs/brs-dhv-744';
import { brsDhv763 } from './brs/brs-dhv-763';
import { brsDhv764 } from './brs/brs-dhv-764';
import { brsDhv781 } from './brs/brs-dhv-781';
import { brsDhv7000 } from './brs/brs-dhv-7000';
import { brsDhv7001 } from './brs/brs-dhv-7001';
import { brsDhv7003 } from './brs/brs-dhv-7003';
import { brsDhv7015 } from './brs/brs-dhv-7015';
import { brsDhv7016 } from './brs/brs-dhv-7016';
import { brsDhv7019 } from './brs/brs-dhv-7019';
import { brsDhv7020 } from './brs/brs-dhv-7020';
import { brsDhv7100 } from './brs/brs-dhv-7100';
import { brsDhv7101 } from './brs/brs-dhv-7101';
import { brsDhv7102 } from './brs/brs-dhv-7102';
import { brsDhv7104 } from './brs/brs-dhv-7104';
import { brsDhv7106 } from './brs/brs-dhv-7106';
import { brsDhv7300 } from './brs/brs-dhv-7300';
import { brsDhv7301 } from './brs/brs-dhv-7301';
import { brsDhv7302 } from './brs/brs-dhv-7302';
import { brsDhv7303 } from './brs/brs-dhv-7303';


// MPS
import { mpsDhv23 } from './mps/mps-dhv-23';
import { mpsDhv24 } from './mps/mps-dhv-24';
import { mpsDhv25 } from './mps/mps-dhv-25';
import { mpsDhv26 } from './mps/mps-dhv-26';
import { mpsDhv27 } from './mps/mps-dhv-27';
import { mpsDhv28 } from './mps/mps-dhv-28';

export const dhvDomain7BRS: BRSData[] = [
  brsDhv741, brsDhv743, brsDhv744, brsDhv763, brsDhv764, brsDhv781, 
  brsDhv7000, brsDhv7001, brsDhv7003, brsDhv7015, brsDhv7016,
  brsDhv7019, brsDhv7020, 
  brsDhv7100, brsDhv7101, brsDhv7102, brsDhv7104, brsDhv7106,
  brsDhv7300, brsDhv7301, brsDhv7302, brsDhv7303
];

export const dhvDomain7MPS: MPSData[] = [
  mpsDhv23, mpsDhv24, mpsDhv25, mpsDhv26, mpsDhv27, mpsDhv28
];
