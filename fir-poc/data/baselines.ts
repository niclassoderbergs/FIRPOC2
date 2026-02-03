
import { BaselineMethod } from '../types';

export const baselineMethods: BaselineMethod[] = [
    { id: 'BM-001', name: 'Nominering', description: 'Baseras på den plan som aktören skickat in i förväg.', approvedProducts: ['mFRR', 'aFRR', 'Lokal Flex'], status: 'Approved' },
    { id: 'BM-002', name: 'Meter before meter after (MBMA)', description: 'Jämför mätvärdet precis före en aktivering med mätvärdet direkt efter.', approvedProducts: ['FCR-N', 'FCR-D Up', 'FCR-D Down', 'FFR'], status: 'Approved' },
    { id: 'BM-003', name: 'Historisk baseline utan justering', description: 'Ett medelvärde av historisk förbrukning.', approvedProducts: ['FCR-N', 'mFRR', 'Lokal Flex'], status: 'Approved' },
    { id: 'BM-004', name: 'Historisk baseline med SDA', description: 'Historiskt medelvärde som justeras baserat på faktiskt utfall samma dag.', approvedProducts: ['aFRR', 'mFRR', 'Lokal Flex'], status: 'Approved' }
];
