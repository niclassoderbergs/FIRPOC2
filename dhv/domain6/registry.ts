
import { BRSData, MPSData } from '../../types';

// BRS
import { brsDhv611 } from './brs/brs-dhv-611';
import { brsDhv612 } from './brs/brs-dhv-612';
import { brsDhv6001 } from './brs/brs-dhv-6001';
import { brsDhv642 } from './brs/brs-dhv-642';
import { brsDhv643 } from './brs/brs-dhv-643';
import { brsDhv644 } from './brs/brs-dhv-644';
import { brsDhv663 } from './brs/brs-dhv-663';
import { brsDhv664 } from './brs/brs-dhv-664';
import { brsDhv682 } from './brs/brs-dhv-682';
import { brsDhv683 } from './brs/brs-dhv-683';
import { brsDhv684 } from './brs/brs-dhv-684';
import { brsDhv617 } from './brs/brs-dhv-617';
import { brsDhv618 } from './brs/brs-dhv-618';
import { brsDhv6002 } from './brs/brs-dhv-6002';

// MPS
import { mpsDhv09 } from './mps/mps-dhv-09';
import { mpsDhv11 } from './mps/mps-dhv-11';
import { mpsDhv12 } from './mps/mps-dhv-12';
import { mpsDhv13 } from './mps/mps-dhv-13';
import { mpsDhv14 } from './mps/mps-dhv-14';

export const dhvDomain6BRS: BRSData[] = [
  brsDhv611, brsDhv612, brsDhv6001, brsDhv642, brsDhv643, brsDhv644, 
  brsDhv663, brsDhv664, brsDhv682, brsDhv683, brsDhv684,
  brsDhv617, brsDhv618, brsDhv6002
];

export const dhvDomain6MPS: MPSData[] = [
  mpsDhv09, mpsDhv11, mpsDhv12, mpsDhv13, mpsDhv14
];
