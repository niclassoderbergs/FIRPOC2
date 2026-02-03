
export type TimelineCategory = 'ncdr' | 'fis' | 'dhv' | 'legacy' | 'regulatory';
export type DhvScenario = 'opt1' | 'opt2' | 'opt3';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'planned';
  tag?: string;
}

export interface GanttEvent extends TimelineEvent {
  id: string;
  // Computed fields
  startDate: string; 
  endDate: string;
  
  // Logic fields
  manualStartDate?: string; 
  durationMonths: number;
  dependencyId?: string; 
  lagMonths?: number; 
  
  // Roles
  responsible: string; 
  contributing?: string; 
  approving?: string; 

  article?: string;
  isDeadline?: boolean;
}
