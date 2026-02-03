
import { BRSData, MPSData } from '../../types';

// BRS
import { brsDhv111 } from './brs/brs-dhv-111';
import { brsDhv112 } from './brs/brs-dhv-112';
import { brsDhv113 } from './brs/brs-dhv-113';
import { brsDhv114 } from './brs/brs-dhv-114';
import { brsDhv120 } from './brs/brs-dhv-120';
import { brsDhv121 } from './brs/brs-dhv-121';
import { brsDhv122 } from './brs/brs-dhv-122';
import { brsDhv123 } from './brs/brs-dhv-123';
import { brsDhv519 } from './brs/brs-dhv-519';
import { brsDhv520 } from './brs/brs-dhv-520';
import { brsDhv542 } from './brs/brs-dhv-542';
import { brsDhv543 } from './brs/brs-dhv-543';
import { brsDhv562 } from './brs/brs-dhv-562';
import { brsDhv564 } from './brs/brs-dhv-564';
import { brsDhv565 } from './brs/brs-dhv-565';
import { brsDhv582 } from './brs/brs-dhv-582';
import { brsDhv583 } from './brs/brs-dhv-583';

// MPS
import { mpsDhv01 } from './mps/mps-dhv-01';
import { mpsDhv02 } from './mps/mps-dhv-02';
import { mpsDhv03 } from './mps/mps-dhv-03';

export const dhvDomain1BRS: BRSData[] = [
  brsDhv111, brsDhv112, brsDhv113, brsDhv114,
  brsDhv120, brsDhv121, brsDhv122, brsDhv123,
  brsDhv519, brsDhv520, brsDhv542, brsDhv543, 
  brsDhv562, brsDhv564, brsDhv565, brsDhv582, brsDhv583
];

export const dhvDomain1MPS: MPSData[] = [
  mpsDhv01, mpsDhv02, mpsDhv03
];
