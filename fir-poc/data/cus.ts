
import { CU, RelationshipRecord } from '../types';
import { mockBSPs } from './bsps';
import { mockDSOs } from './dsos';
import { mockREs } from './res';
import { mockRegResponsibles } from './regResponsibles';
import { mockSPs } from './sps';

// Helper to calculate Luhn checksum for Swedish ID numbers
const calculateLuhn = (base: string) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
        let val = parseInt(base[i]) * ((i % 2 === 0) ? 2 : 1);
        sum += val > 9 ? val - 9 : val;
    }
    return (10 - (sum % 10)) % 10;
};

// Generates a realistic and valid Swedish ID (SSN or OrgNr)
const generateSwedishID = (idx: number): string => {
    const isOrg = (idx % 4) === 0; // 25% Org, 75% SSN
    if (isOrg) {
        // Organization Number (e.g., 556123-4567)
        // Group 5 (Limited Companies) starts with 55
        const base = `556${(100000 + (idx % 899999)).toString().padStart(6, '0')}`;
        const check = calculateLuhn(base);
        return `${base.substring(0, 6)}-${base.substring(6)}${check}`;
    } else {
        // Personal Identity Number (SSN) (e.g., 19850412-1234)
        const year = 1945 + (idx % 60);
        const month = 1 + (idx % 12);
        const day = 1 + (idx % 28);
        const yShort = year.toString().substring(2);
        const mStr = month.toString().padStart(2, '0');
        const dStr = day.toString().padStart(2, '0');
        const seq = (100 + (idx % 899)).toString().padStart(3, '0');
        const baseForLuhn = `${yShort}${mStr}${dStr}${seq}`;
        const check = calculateLuhn(baseForLuhn);
        return `${year}${mStr}${dStr}-${seq}${check}`;
    }
};

// Helper function to get a date between two dates based on seed
const getSeededDateBetween = (seed: number, startStr: string, endStr: string) => {
    const start = new Date(startStr).getTime();
    const end = new Date(endStr).getTime();
    const diff = end - start;
    // Simple LCG for determinism
    const randomVal = ((seed * 9301 + 49297) % 233280) / 233280;
    const offset = Math.floor(randomVal * (diff / (1000 * 60 * 60 * 24)));
    const result = new Date(start);
    result.setDate(result.getDate() + offset);
    return result;
};

const formatDate = (d: Date) => d.toISOString().split('T')[0];

const buildDeterministicHistory = (idx: number): RelationshipRecord[] => {
    const history: RelationshipRecord[] = [];
    
    // 1. Generate current values with weighted SP distribution
    const owner = generateSwedishID(idx);
    
    const spCount = mockSPs.length;
    const spIdxRaw = ((idx * 224737) % 10000) / 10000;
    const spIdxSkewed = Math.pow(spIdxRaw, 3) * 0.8 + (Math.abs(Math.cos(idx * 0.05)) * 0.2);
    const sp = mockSPs[Math.floor(spIdxSkewed * spCount) % spCount].name;

    const reObj = mockREs[idx % mockREs.length];
    const re = reObj.name;
    const brp = reObj.brp || 'Vattenfall AB';

    // 2. Determine start date
    const biasSeed = ((idx * 12345 + 6789) % 100);
    let currentStartDate: Date;

    if (biasSeed < 80) {
        currentStartDate = getSeededDateBetween(idx, '2025-11-01', '2026-01-15');
    } else {
        currentStartDate = getSeededDateBetween(idx, '2025-11-01', '2025-10-31');
    }
    
    // 3. Generate previous values
    const oldREIdx = (idx + 7) % mockREs.length;
    const oldRE = mockREs[oldREIdx].name;
    const oldBRP = mockREs[oldREIdx].brp || 'Statkraft Energi AS';
    
    const oldSpIdxRaw = (((idx + 13) * 224737) % 10000) / 10000;
    const oldSpIdxSkewed = Math.pow(oldSpIdxRaw, 4) * 0.75 + (Math.abs(Math.cos((idx + 13) * 0.03)) * 0.25);
    const oldSP = mockBSPs[Math.floor(oldSpIdxSkewed * mockBSPs.length) % mockBSPs.length].name;

    const prevEndDate = new Date(currentStartDate);
    prevEndDate.setDate(prevEndDate.getDate() - 1);

    history.push({ 
        ssnOrgnr: owner, 
        sp: sp, 
        re: re, 
        brp: brp, 
        startDate: formatDate(currentStartDate), 
        endDate: 'Present' 
    });

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
    
    // REQUIREMENT: 65 units without SP and without SSN/ORGNR
    const isUnassigned = i >= 500 && i < 565;
    if (isUnassigned) {
        history[0].sp = '';
        history[0].ssnOrgnr = '';
    }

    const current = history[0];
    const zone = dso.mba;
    const spSlug = current.sp ? current.sp.replace(/\s+/g, '_') : 'NONE';
    
    let portfolioType = 'Hybrid';
    if (type === 'Storage') portfolioType = 'FCR';
    if (type === 'Consumption') portfolioType = 'mFRR';
    
    const assignedSpgId = current.sp !== '' ? `SPG-${spSlug}-${zone}-${portfolioType}` : undefined;

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

    const regCount = mockRegResponsibles.length;
    const rawT = ((i * 15485863) % 10000) / 10000;
    const skewedT = Math.pow(rawT, 5) * 0.7 + (Math.abs(Math.sin(i * 0.02)) * 0.3);
    const finalRegIdx = Math.floor(skewedT * regCount) % regCount;

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
        registrationResponsible: mockRegResponsibles[finalRegIdx].name,
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
