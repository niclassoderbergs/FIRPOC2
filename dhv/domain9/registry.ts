
import { BRSData, MPSData } from '../../types';

// BRS
import { brsDhv815 } from './brs/brs-dhv-815';
import { brsDhv816 } from './brs/brs-dhv-816';
import { brsDhv819 } from './brs/brs-dhv-819';
import { brsDhv845 } from './brs/brs-dhv-845';
import { brsDhv846 } from './brs/brs-dhv-846';
import { brsDhv864 } from './brs/brs-dhv-864';
import { brsDhv881 } from './brs/brs-dhv-881';
import { brsDhv882 } from './brs/brs-dhv-882';

import { brsDhv811 } from './brs/brs-dhv-811';
import { brsDhv841 } from './brs/brs-dhv-841';
import { brsDhv842 } from './brs/brs-dhv-842';
import { brsDhv843 } from './brs/brs-dhv-843';
import { brsDhv844 } from './brs/brs-dhv-844';
import { brsDhv861 } from './brs/brs-dhv-861';
import { brsDhv862 } from './brs/brs-dhv-862';
import { brsDhv863 } from './brs/brs-dhv-863';
import { brsDhv8000 } from './brs/brs-dhv-8000';

// MPS
import { mpsDhv15 } from './mps/mps-dhv-15';
import { mpsDhv16 } from './mps/mps-dhv-16';
import { mpsDhv17 } from './mps/mps-dhv-17';
import { mpsDhv18 } from './mps/mps-dhv-18';
import { mpsDhv19 } from './mps/mps-dhv-19';
import { mpsDhv20 } from './mps/mps-dhv-20';
import { mpsDhv21 } from './mps/mps-dhv-21';
import { mpsDhv22 } from './mps/mps-dhv-22';


export const dhvDomain9BRS: BRSData[] = [
  brsDhv815, brsDhv816, brsDhv819, brsDhv845, brsDhv846, brsDhv864, brsDhv881, brsDhv882,
  brsDhv811, brsDhv841, brsDhv842, brsDhv843, brsDhv844, brsDhv861, brsDhv862, brsDhv863, brsDhv8000
];

export const dhvDomain9MPS: MPSData[] = [
  mpsDhv15, mpsDhv16, mpsDhv17, mpsDhv18, mpsDhv19, mpsDhv20, mpsDhv21, mpsDhv22
];
