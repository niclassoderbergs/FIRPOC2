
export interface RelationshipRecord {
  ssnOrgnr: string;
  sp: string;
  re: string;
  brp: string;
  startDate: string;
  endDate: string;
}

export interface CU {
  id: string;
  businessId: string;
  name: string;
  type: 'Production' | 'Consumption' | 'Storage';
  capacity: number;
  capacityUnit: string;
  status: 'Active' | 'Pending' | 'Suspended';
  sp: string; // Service Provider (Administrerar avtal)
  re: string;
  brp: string;
  gridOwner: string;
  gridArea: string;
  biddingZone: string;
  accountingPoint: string;
  ownerId: string;
  spgId?: string; // TSO Portfolio ID
  localSpgId?: string; // Local/DSO Portfolio ID
  registrationResponsible: string; // Den som registrerade CUn
  productBaselines: { productId: string; methodId: string }[];
  relationshipHistory?: RelationshipRecord[];
  // DHV Attributes
  mainFuse?: string;
  meteringInterval?: string;
  reportingInterval?: string;
  numberOfPhases?: number;
  voltageLevel?: string;
  // Flexibility dates
  flexStartDate?: string;
  flexEndDate?: string;
}

export interface SPG {
  id: string;
  name: string;
  fsp: string; // Kan vara SP eller BSP
  zone: string;
  status: 'Active' | 'Qualification Pending' | 'Suspended';
  qualifications: string[];
  marketType: 'TSO' | 'Local';
}

export interface Bid {
  id: string;
  spgId: string;
  bsp: string; // Specifikt för den part som har balansansvar för budet
  productId: string;
  volumeMW: number;
  availableCapacityMW: number;
  period: string;
  zone: string;
  price: number;
  status: 'Valid' | 'Invalid';
  timestamp: string;
  selectionStatus: 'Selected' | 'Rejected';
  activationStatus: 'Scheduled' | 'Activated' | 'Not Activated';
  isActivated: boolean;
}

export interface BaselineMethod {
    id: string;
    name: string;
    description: string;
    approvedProducts: string[];
    status: 'Approved' | 'Review Required';
}

export interface GridConstraint {
  id: string;
  gridOwner: string;
  limitValue: number;
  limitUnit: string;
  startTime: string;
  endTime: string;
  status: 'Active' | 'Planned' | 'Expired';
  affectedUnits: string[];
  reason: string;
}

export interface LocalMarketProduct {
  name: string;
  timeHorizon: string;
  remuneration: string;
  qualification: string;
  type: 'Activation' | 'Availability';
}

export interface LocalMarket {
  id: string;
  name: string;
  owner: string;
  description: string;
  status: 'Active' | 'Planned';
  products: string[];
  detailedProducts?: LocalMarketProduct[];
}
