
import { LocalMarket } from '../types';

export const mockLocalMarkets: LocalMarket[] = [
  {
    id: 'LM-EON-SWITCH',
    name: 'E.ON Switch',
    owner: 'E.ON Energidistribution AB',
    description: 'Local flexibility market to manage capacity shortage and relieve the power grid in specific grid areas owned by E.ON. The market enables aggregators to offer reduction or increased feed-in based on local needs.',
    status: 'Active',
    products: ['Direct Orders', 'Availability Orders', 'Seasonal Availability'],
    detailedProducts: [
      {
        name: 'Direct Orders',
        type: 'Activation',
        timeHorizon: 'Bids submitted 2 days to 3 hours before delivery. Activation occurs upon need.',
        remuneration: 'Payment given only upon actual activation. Price is set by the provider. Requires at least 75% delivery precision.',
        qualification: 'Providers can qualify continuously throughout the season.'
      },
      {
        name: 'Availability Orders',
        type: 'Availability',
        timeHorizon: 'Bids 7 to 2 days before delivery. Accepted providers thereafter stand in readiness.',
        remuneration: 'Payment for both availability (fixed price) and activation (bid price). Minimum 75% delivery for payment.',
        qualification: 'Continuous qualification throughout the season.'
      },
      {
        name: 'Seasonal Availability',
        type: 'Availability',
        timeHorizon: 'Weekdays 07:00-11:00 and 16:00-20:00 during Dec-Feb. Contracts signed in advance.',
        remuneration: 'Fixed availability payment for the entire period + activation payment upon request.',
        qualification: 'Must be qualified before the start of the availability period.'
      }
    ]
  }
];
