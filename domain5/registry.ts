
import { BRSData, MPSData } from '../../types';
import { brsFlex501 } from './brs/brs-flex-501';
import { brsFlex502 } from './brs/brs-flex-502';
import { brsFlex503 } from './brs/brs-flex-503';
import { brsFlex511 } from './brs/brs-flex-511';
import { brsFlex512 } from './brs/brs-flex-512';
import { brsFlex521 } from './brs/brs-flex-521';
import { brsFlex5210 } from './brs/brs-flex-5210';
import { brsFlex522 } from './brs/brs-flex-522';
import { mpsFlex500 } from './mps/mps-domain-5';
import { mpsFlex505 } from './mps/mps-flex-505'; 

export const domain5BRS: BRSData[] = [
  brsFlex501, brsFlex502, brsFlex503, brsFlex511, brsFlex512, brsFlex521, brsFlex5210, brsFlex522
];

export const domain5MPS: MPSData[] = [
  mpsFlex500, mpsFlex505
];
