
import { Bid, CU } from '../types';
import { mockSPGs } from './spgs';
import { mockCUs } from './cus';

// Systemets "Idag" - Styrande för all logik i POC:en
const ANCHOR_NOW = new Date('2026-01-31T10:00:00Z');

/**
 * Hjälpfunktion för att beräkna den totala tekniska kapaciteten för en SPG
 */
const getSpgCapacityMW = (spgId: string): number => {
  return mockCUs
    .filter(cu => cu.spgId === spgId)
    .reduce((sum, cu) => {
      const val = cu.capacityUnit === 'kW' ? cu.capacity / 1000 : cu.capacity;
      return sum + val;
    }, 0);
};

const generateStaticBids = (): Bid[] => {
  const bids: Bid[] = [];
  const currentYear = ANCHOR_NOW.getUTCFullYear();
  
  const spgCapacityMap: Record<string, number> = {};
  mockSPGs.forEach(s => {
    spgCapacityMap[s.id] = getSpgCapacityMW(s.id);
  });

  // TIDSFÖNSTER: Ett helt år bakåt för att visa historiska aktörsbyten
  // Från 2025-01-01 till 2026-01-31
  const startDate = new Date('2025-01-01T00:00:00Z');
  const endDate = ANCHOR_NOW;
  
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  mockSPGs.forEach((spg, spgIdx) => {
    const hasCapacity = spgCapacityMap[spg.id] > 0;
    if (!hasCapacity) return;

    // För varje SPG, generera ca 20-30 utspridda aktiveringar per år
    // Vi loopar igenom dagarna men med ett hopp för att skapa gleshet
    for (let d = 0; d <= daysDiff; d++) {
      // Skapa ett unikt frö för denna SPG + Dag
      const daySeed = (spgIdx + 1) * (d + 789);
      const rand = (daySeed % 1000) / 1000;

      // 4% sannolikhet att en SPG har en aktivitet en specifik dag (~14 gånger per år)
      // Detta skapar veckor eller månader mellan aktiveringar för samma enhet
      if (rand < 0.04) {
        const date = new Date(startDate);
        date.setUTCDate(startDate.getUTCDate() + d);
        
        // Välj en slumpmässig MTU för dagen
        const hour = (daySeed % 24);
        const hourStr = hour.toString().padStart(2, '0');
        const timestamp = `${date.toISOString().split('T')[0]}T${hourStr}:00:00Z`;
        const bidTime = new Date(timestamp);

        const prodIdx = (daySeed) % spg.qualifications.length;
        const productId = spg.qualifications[prodIdx];
        
        // Budvolym: 40-90% av kapacitet
        const volumeMW = spgCapacityMap[spg.id] * (0.4 + (daySeed % 50) / 100);
        const price = 30 + (daySeed % 60);

        // Alla historiska bud sätts som Selected/Activated för att bygga verifieringsstatistik
        // Framtida bud (om några skulle hamna där) sätts som Scheduled
        const isFuture = bidTime > ANCHOR_NOW;
        
        bids.push({
          id: `BID-${bidTime.getFullYear()}-${20000 + bids.length}`,
          spgId: spg.id,
          bsp: spg.fsp,
          productId: productId,
          volumeMW: parseFloat(volumeMW.toFixed(1)),
          availableCapacityMW: parseFloat(spgCapacityMap[spg.id].toFixed(1)),
          period: `${hourStr}:00`,
          zone: spg.zone,
          price: price,
          status: 'Valid',
          timestamp: timestamp,
          selectionStatus: 'Selected',
          activationStatus: isFuture ? 'Scheduled' : 'Activated',
          isActivated: !isFuture
        });
      }
    }
  });

  // Sortera med de nyaste först
  return bids.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const mockBids: Bid[] = generateStaticBids();
