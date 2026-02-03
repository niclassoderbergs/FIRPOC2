
// Constants used across timeline calculations

export const LEGACY_DURATIONS = {
    upphandling: 20,
    gen1: 9,
    gen2: 18,
    gen3: 24,
    migrUpph: 18,
    migrImpl: 6,
    migr: 18
};

// Helper for date calculation locally within constants if needed, 
// though generally we use the helpers file. 
// However, to define NC_DR_DEADLINE const we need simple logic here.
const calcDateSimple = (dateStr: string, months: number): string => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    d.setMonth(d.getMonth() + months);
    return d.toISOString().split('T')[0];
};

// --- DRIVING CONSTANTS FOR NC DR ---
// Aktivitet 7 är styrande för hela tidslinjens deadline
export const NCDR_ACT7_START = '2029-03-01';
export const NCDR_ACT7_DURATION = 30;

// Deadline beräknas nu automatiskt: Startdatum + Varaktighet för Aktivitet 7
export const NC_DR_DEADLINE = calcDateSimple(NCDR_ACT7_START, NCDR_ACT7_DURATION);
