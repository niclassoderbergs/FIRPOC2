
import { SPG } from '../types';
import { mockBSPs } from './bsps';

const ZONES = ['SE1', 'SE2', 'SE3', 'SE4'];

const generateSpgRegistry = (): SPG[] => {
  return mockBSPs.flatMap(bsp => {
    const bspSlug = bsp.name.replace(/\s+/g, '_');
    
    return ZONES.flatMap(zone => {
      return [
        {
          id: `SPG-${bspSlug}-${zone}-Hybrid`,
          name: `${bsp.name} - ${zone} - Hybrid Portfolio`,
          fsp: bsp.name,
          zone: zone,
          status: 'Active',
          qualifications: ['FCR-N', 'FCR-D-UP', 'FCR-D-DOWN', 'mFRR', 'aFRR']
        },
        {
          id: `SPG-${bspSlug}-${zone}-FCR`,
          name: `${bsp.name} - ${zone} - FCR Portfolio`,
          fsp: bsp.name,
          zone: zone,
          status: 'Active',
          qualifications: ['FCR-N', 'FCR-D-UP', 'FCR-D-DOWN']
        },
        {
          id: `SPG-${bspSlug}-${zone}-mFRR`,
          name: `${bsp.name} - ${zone} - mFRR Portfolio`,
          fsp: bsp.name,
          zone: zone,
          status: 'Active',
          qualifications: ['mFRR', 'aFRR']
        }
      ];
    });
  });
};

export const mockSPGs: SPG[] = generateSpgRegistry();
