
import { BRSData, MPSData } from '../../types';
import { brsFlex401 } from './brs/brs-flex-401';
import { brsFlex402 } from './brs/brs-flex-402';
import { brsFlex403 } from './brs/brs-flex-403';
import { mpsFlex400 } from './mps/mps-domain-4';

export const domain4BRS: BRSData[] = [
  brsFlex401, brsFlex402, brsFlex403
];

export const domain4MPS: MPSData[] = [
  mpsFlex400
];
