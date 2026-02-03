
import { BRSData, MPSData } from '../../types';
import { brsFlex801 } from './brs/brs-flex-801';
import { brsFlex802 } from './brs/brs-flex-802';
import { brsFlex803 } from './brs/brs-flex-803';
import { brsFlex804 } from './brs/brs-flex-804';
import { brsFlex810 } from './brs/brs-flex-810';
import { brsFlex811 } from './brs/brs-flex-811';
import { brsFlex812 } from './brs/brs-flex-812';
import { brsFlex813 } from './brs/brs-flex-813';
import { brsFlex814 } from './brs/brs-flex-814';
import { brsFlex815 } from './brs/brs-flex-815';
import { mpsFlex800 } from './mps/mps-domain-8';

export const domain8BRS: BRSData[] = [
  brsFlex801, brsFlex802, brsFlex803, brsFlex804, brsFlex810, brsFlex811, brsFlex812, brsFlex813, brsFlex814, brsFlex815
];

export const domain8MPS: MPSData[] = [
  mpsFlex800
];
