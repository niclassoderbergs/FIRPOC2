
import { GanttEvent } from './types';

// Helpers
export const addMonths = (dateStr: string, months: number): string => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    d.setMonth(d.getMonth() + months);
    return d.toISOString().split('T')[0];
};

export const getRangeString = (data: GanttEvent[]) => {
    if (!data || data.length === 0) return '';
    let min = data[0].startDate;
    let max = data[0].endDate;
    
    for (const e of data) {
        if (!e.startDate) continue;
        if (e.startDate < min || min === '') min = e.startDate;
        if (e.endDate > max || max === '') max = e.endDate;
    }
    
    return `${min} till ${max}`;
};

export const recalculateGanttDates = (events: GanttEvent[]): GanttEvent[] => {
    const eventMap = new Map<string, GanttEvent>();
    events.forEach(e => eventMap.set(e.id, { ...e }));

    const processedIds = new Set<string>();
    const result: GanttEvent[] = [];
    let iterations = 0;

    while (result.length < events.length && iterations < 100) {
        iterations++;
        const readyEvents = events.filter(e => 
            !processedIds.has(e.id) && 
            (!e.dependencyId || processedIds.has(e.dependencyId))
        );

        if (readyEvents.length === 0 && result.length < events.length) {
            // Circular dependency fallback
            const remaining = events.filter(e => !processedIds.has(e.id));
            remaining.forEach(e => {
                 const start = e.manualStartDate || new Date().toISOString().split('T')[0];
                 const end = e.durationMonths > 0 ? addMonths(start, e.durationMonths) : start;
                 result.push({ ...e, startDate: start, endDate: end });
                 processedIds.add(e.id);
                 eventMap.set(e.id, { ...e, startDate: start, endDate: end });
            });
            break;
        }

        readyEvents.forEach(e => {
            let start = e.manualStartDate || '2026-02-28';
            
            if (e.dependencyId) {
                const parent = eventMap.get(e.dependencyId);
                if (parent) {
                    start = addMonths(parent.endDate, e.lagMonths || 0);
                }
            } else if (e.manualStartDate) {
                start = e.manualStartDate;
            }

            const end = e.durationMonths > 0 ? addMonths(start, e.durationMonths) : start;
            
            const updatedEvent = { ...e, startDate: start, endDate: end };
            result.push(updatedEvent);
            eventMap.set(e.id, updatedEvent);
            processedIds.add(e.id);
        });
    }

    return result.sort((a, b) => {
        // Defined order for FIS View to place Dependency before Implementation
        const fisOrder = ['F1', 'F2', 'F_DEP_PLATFORM', 'F3', 'F3.5', 'F4', 'F5', 'F99', 'F_DHV_READY'];
        const idxA = fisOrder.indexOf(a.id);
        const idxB = fisOrder.indexOf(b.id);
        
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        
        // Special sorting for other views
        if (a.id.startsWith('F_DHV')) return 1; 
        if (a.id.startsWith('F99') && idxA === -1) return 2;
        if (a.id.startsWith('REG_9')) return 2;

        // Custom REG sorting to handle 01b vs 02 correctly
        if (a.id.startsWith('REG_') && b.id.startsWith('REG_')) {
             const numA = parseInt(a.id.replace('REG_', ''), 10);
             const numB = parseInt(b.id.replace('REG_', ''), 10);
             
             // Compare numbers first
             if (numA !== numB) return numA - numB;
             
             // If numbers equal (e.g. 01 and 01b), sort alphabetically so 01 comes before 01b
             return a.id.localeCompare(b.id);
        }

        const idA = a.id.match(/\d+/) ? parseInt(a.id.match(/\d+/)![0], 10) : 0;
        const idB = b.id.match(/\d+/) ? parseInt(b.id.match(/\d+/)![0], 10) : 0;
        
        const prefixA = a.id.replace(/\d/g, '');
        const prefixB = b.id.replace(/\d/g, '');
        
        if (prefixA !== prefixB) return prefixA.localeCompare(prefixB);
        return idA - idB;
    });
};
