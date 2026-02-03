
import { BRSData, MPSData } from '../../types';
import { brsFlex701 } from './brs/brs-flex-701';
import { brsFlex702 } from './brs/brs-flex-702';
import { brsFlex7011 } from './brs/brs-flex-7011';
import { brsFlex705 } from './brs/brs-flex-705';
import { brsFlex706 } from './brs/brs-flex-706';
import { brsFlex711 } from './brs/brs-flex-711';
import { brsFlex7111 } from './brs/brs-flex-7111';
import { brsFlex712 } from './brs/brs-flex-712';
import { brsFlex713 } from './brs/brs-flex-713';
import { brsFlex7110 } from './brs/brs-flex-7110';
import { brsFlex7120 } from './brs/brs-flex-7120';
import { brsFlex7121 } from './brs/brs-flex-7121';
import { brsFlex714 } from './brs/brs-flex-714';
import { brsFlex715 } from './brs/brs-flex-715';
import { brsFlex717 } from './brs/brs-flex-717';
import { brsFlex716 } from './brs/brs-flex-716';
import { brsFlex718 } from './brs/brs-flex-718';
import { brsFlex721 } from './brs/brs-flex-721';
import { brsFlex722 } from './brs/brs-flex-722';
import { brsFlex723 } from './brs/brs-flex-723';
import { mpsFlex700, mpsFlex710, mpsFlex720 } from './mps/mps-domain-7';

export const domain7BRS: BRSData[] = [
  brsFlex701, brsFlex702, brsFlex7011, brsFlex705, brsFlex706, brsFlex711, brsFlex7111, brsFlex712, brsFlex713, brsFlex7110, brsFlex7120, brsFlex7121, brsFlex714, brsFlex715, brsFlex717, brsFlex716, brsFlex718, brsFlex721, brsFlex722, brsFlex723
];

export const domain7MPS: MPSData[] = [
  mpsFlex700, mpsFlex710, mpsFlex720
];
