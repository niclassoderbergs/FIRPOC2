
export interface MarketProductStat {
  productId: string;
  avgPriceEUR: number;
  totalMarketVolumeMW: number;
  avgBidSizeMW: number;
  utilizationRate: number;
}

export const mockMarketStats: MarketProductStat[] = [
  {
    productId: 'FCR-N',
    avgPriceEUR: 145.20,
    totalMarketVolumeMW: 215,
    avgBidSizeMW: 1.2,
    utilizationRate: 0.85
  },
  {
    productId: 'FCR-D Up',
    avgPriceEUR: 85.50,
    totalMarketVolumeMW: 540,
    avgBidSizeMW: 2.5,
    utilizationRate: 0.92
  },
  {
    productId: 'FCR-D Down',
    avgPriceEUR: 42.10,
    totalMarketVolumeMW: 480,
    avgBidSizeMW: 3.1,
    utilizationRate: 0.78
  },
  {
    productId: 'mFRR',
    avgPriceEUR: 62.00,
    totalMarketVolumeMW: 1200,
    avgBidSizeMW: 12.5,
    utilizationRate: 0.45
  },
  {
    productId: 'aFRR',
    avgPriceEUR: 98.40,
    totalMarketVolumeMW: 350,
    avgBidSizeMW: 5.2,
    utilizationRate: 0.65
  },
  {
    productId: 'Lokal Flex',
    avgPriceEUR: 110.00,
    totalMarketVolumeMW: 85,
    avgBidSizeMW: 0.8,
    utilizationRate: 0.30
  }
];

export const swedishMarketTotals = {
  totalQualifiedCapacityMW: 4250,
  activeUnits: 18500,
  lastUpdated: '2025-03-24'
};
