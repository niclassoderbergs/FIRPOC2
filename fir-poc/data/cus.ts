
import { CU, RelationshipRecord } from '../types';
import { mockBSPs } from './bsps';
import { mockDSOs } from './dsos';
import { mockREs } from './res';

// Hjälpfunktion för att få ett datum mellan två datum baserat på seed
const getSeededDateBetween = (seed: number, startStr: string, endStr: string) => {
    const start = new Date(startStr).getTime();
    const end = new Date(endStr).getTime();
    const diff = end - start;
    // Enkel LCG-slumpgenerator för att vara deterministisk
    const randomVal = ((seed * 9301 + 49297) % 233280) / 233280;
    const offset = Math.floor(randomVal * (diff / (1000 * 60 * 60 * 24)));
    const result = new Date(start);
    result.setDate(result.getDate() + offset);
    return result;
};

const formatDate = (d: Date) => d.toISOString().split('T')[0];

const buildDeterministicHistory = (idx: number): RelationshipRecord[] => {
    const history: RelationshipRecord[] = [];
    
    // 1. Generera nuvarande värden
    const owner = `556${(1000 + (idx % 8999)).toString()}-${idx % 999}`;
    const sp = mockBSPs[idx % mockBSPs.length].name;
    const reObj = mockREs[idx % mockREs.length];
    const re = reObj.name;
    const brp = reObj.brp || 'Vattenfall AB';

    // 2. Bestäm startdatum för nuvarande period med viktning
    // Vi vill att fler (ca 80%) ska hamna mellan 2025-11-01 och 2026-01-15
    const biasSeed = ((idx * 12345 + 6789) % 100);
    let currentStartDate: Date;

    if (biasSeed < 80) {
        // 80% chans: Sen period (2025-11-01 till 2026-01-15)
        currentStartDate = getSeededDateBetween(idx, '2025-11-01', '2026-01-15');
    } else {
        // 20% chans: Tidig period (2025-01-01 till 2025-10-31)
        currentStartDate = getSeededDateBetween(idx, '2025-11-01', '2025-10-31');
    }
    
    // 3. Generera föregående värden (2024) som skiljer sig från nuvarande
    const oldREIdx = (idx + 7) % mockREs.length;
    const oldRE = mockREs[oldREIdx].name;
    const oldBRP = mockREs[oldREIdx].brp || 'Statkraft Energi AS';
    const oldSP = mockBSPs[(idx + 13) % mockBSPs.length].name;

    // Beräkna slutdatum för föregående period (dagen före nuvarande start)
    const prevEndDate = new Date(currentStartDate);
    prevEndDate.setDate(prevEndDate.getDate() - 1);

    // Lägg till nuvarande period
    history.push({ 
        ssnOrgnr: owner, 
        sp: sp, 
        re: re, 
        brp: brp, 
        startDate: formatDate(currentStartDate), 
        endDate: 'Present' 
    });

    // Lägg till historisk period (Från början av 2024 fram till brytpunkten)
    history.push({
        ssnOrgnr: owner,
        sp: oldSP,
        re: oldRE,
        brp: oldBRP,
        startDate: '2024-01-01',
        endDate: formatDate(prevEndDate)
    });

    return history;
};

const data: CU[] = [];

// Generera exakt 10 000 enheter deterministiskt
for (let i = 0; i < 10000; i++) {
    const idIndex = 10001 + i;
    const typeIndex = i % 3;
    const types: ('Production' | 'Consumption' | 'Storage')[] = ['Production', 'Consumption', 'Storage'];
    const type = types[typeIndex];
    const dso = mockDSOs[i % mockDSOs.length];
    
    let capacity = 0;
    let unit = 'MW';
    if (type === 'Storage') {
        capacity = 0.5 + (i % 50) * 0.25;
    } else if (type === 'Production') {
        capacity = (i % 20 === 0) ? 100 + (i % 400) : 2 + (i % 48);
    } else {
        if (i % 10 === 0) {
            capacity = 5 + (i % 95);
            unit = 'MW';
        } else {
            capacity = 50 + (i % 950);
            unit = 'kW';
        }
    }

    const history = buildDeterministicHistory(i);
    const current = history[0];
    const zone = dso.mba;
    const spSlug = current.sp.replace(/\s+/g, '_');
    
    // Deterministisk SPG-tilldelning baserat på resurstyp
    let portfolioType = 'Hybrid';
    if (type === 'Storage') portfolioType = 'FCR';
    if (type === 'Consumption') portfolioType = 'mFRR';
    const assignedSpgId = `SPG-${spSlug}-${zone}-${portfolioType}`;

    const productBaselines: { productId: string, methodId: string }[] = [];
    if (portfolioType === 'FCR' || portfolioType === 'Hybrid') {
        productBaselines.push({ productId: 'FCR-N', methodId: 'BM-002' });
        productBaselines.push({ productId: 'FCR-D-UP', methodId: 'BM-002' });
        productBaselines.push({ productId: 'FCR-D-DOWN', methodId: 'BM-002' });
    }
    if (portfolioType === 'mFRR' || portfolioType === 'Hybrid') {
        productBaselines.push({ productId: 'mFRR', methodId: 'BM-001' });
        productBaselines.push({ productId: 'aFRR', methodId: 'BM-004' });
    }

    let status: 'Active' | 'Pending' | 'Suspended' = 'Active';
    if (i >= 50 && i < 75) status = 'Pending';
    if (i >= 90 && i < 95) status = 'Suspended';

    data.push({
        id: `CU-${idIndex}`,
        businessId: `73599910${idIndex}`,
        name: `${dso.mgaName} ${type} Unit ${idIndex}`,
        type: type,
        capacity: parseFloat(capacity.toFixed(2)),
        capacityUnit: unit,
        status: status,
        sp: current.sp,
        re: current.re,
        brp: current.brp,
        gridOwner: dso.name,
        gridArea: dso.mgaCode,
        biddingZone: zone,
        accountingPoint: `735999000000${idIndex}`,
        ownerId: current.ssnOrgnr,
        spgId: (status === 'Active' || status === 'Suspended') ? assignedSpgId : undefined,
        registrationResponsible: current.sp, // Using the SP as the responsible entity for this POC
        productBaselines: productBaselines,
        relationshipHistory: history,
        mainFuse: i % 5 === 0 ? '63A' : (i % 5 === 2 ? '250A' : '16A'),
        meteringInterval: i % 2 === 0 ? 'PT15M' : 'PT60M',
        reportingInterval: 'Daily',
        numberOfPhases: 3,
        voltageLevel: i % 10 === 0 ? '10 kV' : '0.4 kV',
        flexStartDate: current.startDate,
        flexEndDate: 'Open-ended'
    });
}

export const mockCUs: CU[] = data;
