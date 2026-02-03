
import { BRSData, MPSData } from '../../types';
import { brsFlex601 } from './brs/brs-flex-601';
import { brsFlex602 } from './brs/brs-flex-602';
import { brsFlex603 } from './brs/brs-flex-603';
import { brsFlex611 } from './brs/brs-flex-611';
import { brsFlex6110 } from './brs/brs-flex-6110';
import { brsFlex612 } from './brs/brs-flex-612';
import { brsFlex613 } from './brs/brs-flex-613';
import { brsFlex622 } from './brs/brs-flex-622';
import { mpsFlex600 } from './mps/mps-domain-6';
import { mpsFlex610 } from './mps/mps-flex-610'; 

export const domain6BRS: BRSData[] = [
  brsFlex601, brsFlex602, brsFlex603, brsFlex611, brsFlex6110, brsFlex612, brsFlex613, brsFlex622
];

export const domain6MPS: MPSData[] = [
  mpsFlex600, mpsFlex610
];
