
import { BRSData, MPSData } from '../../types';
import { brsFlex201 } from './brs/brs-flex-201';
import { brsFlex202 } from './brs/brs-flex-202';
import { brsFlex203 } from './brs/brs-flex-203';
import { brsFlex2040 } from './brs/brs-flex-2040';
import { brsFlex205 } from './brs/brs-flex-205'; 
import { brsFlex206 } from './brs/brs-flex-206';
import { brsFlex207 } from './brs/brs-flex-207';
import { brsFlex208 } from './brs/brs-flex-208';
import { mpsFlex200 } from './mps/mps-domain-2';
import { mpsFlex205 } from './mps/mps-flex-205'; 

export const domain2BRS: BRSData[] = [
  brsFlex201, brsFlex202, brsFlex203, brsFlex2040, brsFlex205, brsFlex206, brsFlex207, brsFlex208
];

export const domain2MPS: MPSData[] = [
  mpsFlex200, mpsFlex205
];
