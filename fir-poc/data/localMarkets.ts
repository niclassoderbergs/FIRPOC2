
import { LocalMarket } from '../types';

export const mockLocalMarkets: LocalMarket[] = [
  {
    id: 'LM-EON-SWITCH',
    name: 'E.ON Switch',
    owner: 'E.ON Energidistribution AB',
    description: 'Lokal flexibilitetsmarknad för att hantera kapacitetsbrist och avlasta elnätet i specifika nätområden som ägs av E.ON. Marknaden möjliggör för aggregatorer att erbjuda neddragning eller ökad inmatning baserat på lokala behov.',
    status: 'Active',
    products: ['LOCAL-FLEX']
  }
];
