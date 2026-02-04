
import { Bid } from '../types';
import { mockSPGs } from './spgs';
import { mockCUs } from './cus';

// Systemets "Idag" - Styrande för all logik i POC:en
const ANCHOR_NOW = new Date('2026-01-31T10:00:00Z');

/**
 * Hjälpfunktion för att beräkna den totala tekniska kapaciteten för en SPG
 */
const getSpgCapacityMW = (spgId: string): number => {
  return mockCUs
    .filter(cu => cu.spgId === spgId || cu.localSpgId === spgId)
    .reduce((sum, cu) => {
      const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
      return sum + val;
    }, 0);
};

const generateStaticBids = (): Bid[] => {
  const bids: Bid[] = [];
  
  const spgCapacityMap: Record<string, number> = {};
  mockSPGs.forEach(s => {
    spgCapacityMap[s.id] = getSpgCapacityMW(s.id);
  });

  // TIDSFÖNSTER: Från början av 2025 fram till slutet av februari 2026
  const startDate = new Date('2025-01-01T00:00:00Z');
  const endDate = new Date('2026-02-28T23:59:59Z');
  
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  mockSPGs.forEach((spg, spgIdx) => {
    const totalCap = spgCapacityMap[spg.id];
    if (totalCap <= 0) return;

    const isLocalMarket = spg.marketType === 'Local';

    for (let d = 0; d <= daysDiff; d++) {
      // Skapa flera bud per dag för att öka datamängden
      const bidsPerDay = isLocalMarket ? 4 : 2; 

      for (let bpd = 0; bpd < bidsPerDay; bpd++) {
        const daySeed = (spgIdx + 1) * (d + 789) * (bpd + 1);
        const rand = (daySeed % 1000) / 1000;

        // KRAFTIGT ÖKADE TRÖSKELVÄRDEN
        // Lokala marknader: 25% chans per slot
        // TSO marknader: 15% chans per slot
        const threshold = isLocalMarket ? 0.25 : 0.15;

        if (rand < threshold) {
          const date = new Date(startDate);
          date.setUTCDate(startDate.getUTCDate() + d);
          
          // Fördela buden över dygnet
          const hour = (daySeed % 24);
          const hourStr = hour.toString().padStart(2, '0');
          const timestamp = `${date.toISOString().split('T')[0]}T${hourStr}:00:00Z`;
          const bidTime = new Date(timestamp);

          // Välj produkt
          const prodIdx = daySeed % spg.qualifications.length;
          const productId = spg.qualifications[prodIdx];
          
          // Volym-logik
          let volumeMW = totalCap * (0.1 + (daySeed % 80) / 100);
          
          let status: 'Valid' | 'Invalid' = 'Valid';
          let selectionStatus: 'Selected' | 'Rejected' = 'Selected';
          
          // Minska felmarginalen för att få mer "ren" data
          if ((daySeed % 100) < 3) {
              status = 'Invalid';
              volumeMW = totalCap * 1.5; 
              selectionStatus = 'Rejected';
          }

          // Nätbegränsning (Rejected) - 5%
          if (status === 'Valid' && (daySeed % 100) < 5) {
              selectionStatus = 'Rejected';
          }

          const isFuture = bidTime > ANCHOR_NOW;
          let activationStatus: 'Scheduled' | 'Activated' | 'Not Activated' = 'Not Activated';
          
          if (selectionStatus === 'Selected') {
              if (isFuture) {
                  activationStatus = 'Scheduled';
              } else {
                  // Historiska bud: 90% chans att de blev aktiverade (för att se mer verifierad data)
                  activationStatus = (daySeed % 10) < 9 ? 'Activated' : 'Not Activated';
              }
          }

          bids.push({
            id: `BID-${bidTime.getFullYear()}-${20000 + bids.length}`,
            spgId: spg.id,
            bsp: spg.fsp,
            productId: productId,
            volumeMW: parseFloat(volumeMW.toFixed(1)),
            availableCapacityMW: parseFloat(totalCap.toFixed(1)),
            period: `${hourStr}:00`,
            zone: spg.zone,
            price: isLocalMarket ? 80 + (daySeed % 40) : 30 + (daySeed % 60),
            status: status,
            timestamp: timestamp,
            selectionStatus: selectionStatus,
            activationStatus: activationStatus,
            isActivated: activationStatus === 'Activated'
          });
        }
      }
    }
  });

  return bids.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const mockBids: Bid[] = generateStaticBids();
