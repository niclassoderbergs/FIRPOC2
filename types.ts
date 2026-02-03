
import { ViewMode } from './dhv1/menuConfig';

export type DocStatus = 
  | 'LEGACY' 
  | 'ACTIVE' 
  | 'DRAFT'
  | 'Legacy - Implemented'
  | 'Legacy - Partially implemented'
  | 'Legacy - Not implemented';

export interface NavigationSnapshot {
  viewMode: ViewMode;
  selectedId: string;
  selectedMpsId: string;
  selectedDomain: string;
  selectedProcedureId: number | null;
}

export interface Revision {
  version: string;
  date: string;
  author: string;
  description: string;
}

export interface BusinessRule {
  id: string;
  description: string;
  errorCode?: string;
}

export interface ExceptionRule {
  id: string;
  description: string;
  implemented?: string;
}

export interface PostCondition {
  id: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  description: string;
}

export interface PreCondition {
  id: string;
  description: string;
}

export interface InfoAttribute {
  attribute: string;
  description: string;
  article: string;
}

export interface InfoObject {
  title: string;
  attributes: InfoAttribute[];
}

export interface BRSData {
  id: string;
  previousId?: string; // Used for migration/renumbering traceability
  title: string;
  purpose: string;
  actors: { role: string; description: string }[];
  process: (string | ProcessStep)[];
  exceptionFlow?: ExceptionRule[];
  preConditions: (string | PreCondition)[];
  businessRules: BusinessRule[];
  postConditions: { 
    accepted: string | PostCondition[]; 
    rejected: string | PostCondition[]; 
  };
  infoObjects?: InfoObject[];
  diagramCode?: string;
  status?: DocStatus;
  tags?: string[]; // Flexible tagging system (e.g. 'NON_DHV_2026')
  history?: Revision[];
}

// --- MPS (Market Process Scenario) ---

export interface ProcessStepLink {
  stepId: string;        // T.ex. "1.1"
  role: string;          // T.ex. "SP"
  action: string;        // Kort beskrivning av handlingen
  description: string;   // Utförligare beskrivning
  refBRS?: string;       // T.ex. "BRS-FLEX-101"
  refRule?: string;      // T.ex. "BRSFLEX101-1" (Kan vara Start- eller Slutvillkor)
  isPrerequisite?: boolean; // Ny: Markerar om steget är en förutsättning/trigger utanför kärnprocessen
}

export interface Scenario {
  id: string;            // T.ex. "Sc1"
  title: string;         // T.ex. "Registrering av ny CU"
  description: string;
  steps: ProcessStepLink[];
  diagramCode?: string;  // Ny: Möjliggör diagram per scenario
  refJWG?: string;       // Ny: Referens till JWG Procedure (t.ex. "Proc 20")
}

export interface MPSData {
  id: string;            // T.ex. "MPS-FLEX-100"
  title: string;
  domain: string;
  purpose: string;
  trigger: string;
  scenarios: Scenario[];
  actors?: { role: string; description: string }[];
  diagramCode?: string;
  status?: DocStatus;
  history?: Revision[];
}

// --- Storyline & AI ---
export interface Step {
  id: number;
  title: string;
  icon: any;
  category: string;
  description: string;
  technical: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
