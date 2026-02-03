
import { BRSData, MPSData } from '../../types';

// BRS
import { brsDhv201 } from './brs/brs-dhv-201';
import { brsDhv202 } from './brs/brs-dhv-202';
import { brsDhv211 } from './brs/brs-dhv-211';
import { brsDhv212 } from './brs/brs-dhv-212';
import { brsDhv213 } from './brs/brs-dhv-213';
import { brsDhv215 } from './brs/brs-dhv-215';
import { brsDhv217 } from './brs/brs-dhv-217';
import { brsDhv221 } from './brs/brs-dhv-221';
import { brsDhv222 } from './brs/brs-dhv-222';
import { brsDhv224 } from './brs/brs-dhv-224';
import { brsDhv240 } from './brs/brs-dhv-240';
import { brsDhv241 } from './brs/brs-dhv-241';
import { brsDhv242 } from './brs/brs-dhv-242';
import { brsDhv243 } from './brs/brs-dhv-243';
import { brsDhv244 } from './brs/brs-dhv-244';
import { brsDhv245 } from './brs/brs-dhv-245';
import { brsDhv246 } from './brs/brs-dhv-246';
import { brsDhv247 } from './brs/brs-dhv-247';
import { brsDhv248 } from './brs/brs-dhv-248';
import { brsDhv249 } from './brs/brs-dhv-249';
import { brsDhv260 } from './brs/brs-dhv-260';
import { brsDhv262 } from './brs/brs-dhv-262';
import { brsDhv263 } from './brs/brs-dhv-263';
import { brsDhv264 } from './brs/brs-dhv-264';
import { brsDhv265 } from './brs/brs-dhv-265';
import { brsDhv266 } from './brs/brs-dhv-266';
import { brsDhv267 } from './brs/brs-dhv-267';
import { brsDhv280 } from './brs/brs-dhv-280';
import { brsDhv281 } from './brs/brs-dhv-281';
import { brsDhv282 } from './brs/brs-dhv-282';
import { brsDhv283 } from './brs/brs-dhv-283';
import { brsDhv284 } from './brs/brs-dhv-284';
import { brsDhv285 } from './brs/brs-dhv-285';
import { brsDhv511 } from './brs/brs-dhv-511';
import { brsDhv514 } from './brs/brs-dhv-514';
import { brsDhv515 } from './brs/brs-dhv-515';
import { brsDhv518 } from './brs/brs-dhv-518';
import { brsDhv540 } from './brs/brs-dhv-540';
import { brsDhv541 } from './brs/brs-dhv-541';
import { brsDhv546 } from './brs/brs-dhv-546';
import { brsDhv560 } from './brs/brs-dhv-560';
import { brsDhv561 } from './brs/brs-dhv-561';
import { brsDhv563 } from './brs/brs-dhv-563';
import { brsDhv568 } from './brs/brs-dhv-568';
import { brsDhv569 } from './brs/brs-dhv-569';
import { brsDhv580 } from './brs/brs-dhv-580';
import { brsDhv581 } from './brs/brs-dhv-581';
import { brsDhv2002 } from './brs/brs-dhv-2002';
import { brsDhv2003 } from './brs/brs-dhv-2003';
import { brsDhv2004 } from './brs/brs-dhv-2004';
import { brsDhv2005 } from './brs/brs-dhv-2005';
import { brsDhv2006 } from './brs/brs-dhv-2006';
import { brsDhv2007 } from './brs/brs-dhv-2007';
import { brsDhv2008 } from './brs/brs-dhv-2008';
import { brsDhv2009 } from './brs/brs-dhv-2009';
import { brsDhv2010 } from './brs/brs-dhv-2010';
import { brsDhv2011 } from './brs/brs-dhv-2011';

// MPS
import { mpsDhv04 } from './mps/mps-dhv-04';
import { mpsDhv05 } from './mps/mps-dhv-05';
import { mpsDhv06 } from './mps/mps-dhv-06';
import { mpsDhv07 } from './mps/mps-dhv-07';
import { mpsDhv08 } from './mps/mps-dhv-08';

export const dhvDomain2BRS: BRSData[] = [
  brsDhv201, brsDhv202,
  brsDhv211, brsDhv212, brsDhv213, brsDhv215, brsDhv217,
  brsDhv221, brsDhv222, brsDhv224,
  brsDhv240, brsDhv241, brsDhv242, brsDhv243, brsDhv244, brsDhv245, brsDhv246, brsDhv247, brsDhv248, brsDhv249,
  brsDhv260, brsDhv262, brsDhv263, brsDhv264, brsDhv265, brsDhv266, brsDhv267,
  brsDhv280, brsDhv281, brsDhv282, brsDhv283, brsDhv284, brsDhv285,
  brsDhv511, brsDhv514, brsDhv515, brsDhv518, 
  brsDhv540, brsDhv541, brsDhv546,
  brsDhv560, brsDhv561, brsDhv563, brsDhv568, brsDhv569,
  brsDhv580, brsDhv581,
  brsDhv2002, brsDhv2003, brsDhv2004, brsDhv2005, brsDhv2006, brsDhv2007, brsDhv2008, brsDhv2009, brsDhv2010, brsDhv2011
];

export const dhvDomain2MPS: MPSData[] = [
  mpsDhv04, mpsDhv05, mpsDhv06, mpsDhv07, mpsDhv08
];
