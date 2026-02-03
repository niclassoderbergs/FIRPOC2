
import React, { useState, useCallback, useMemo } from 'react';
import { pocStyles } from './fir-poc/styles';
import { Menu, ArrowLeft } from 'lucide-react';
import { FirSidebar, PocView } from './fir-poc/FirSidebar';
import { FirDashboard } from './fir-poc/pages/FirDashboard';
import { FirCUList } from './fir-poc/pages/FirCUList';
import { FirCUDetail } from './fir-poc/pages/FirCUDetail';
import { FirSPGList } from './fir-poc/pages/FirSPGList';
import { FirSPGDetail } from './fir-poc/pages/FirSPGDetail';
import { FirGenericList } from './fir-poc/pages/FirGenericList';
import { FirPrequalificationList } from './fir-poc/pages/FirPrequalificationList';
import { FirGridConstraintsList } from './fir-poc/pages/FirGridConstraintsList';
import { FirGridConstraintDetail } from './fir-poc/pages/FirGridConstraintDetail';
import { FirPartiesList } from './fir-poc/pages/FirPartiesList';
import { FirBspList } from './fir-poc/pages/FirBspList';
import { FirSpList } from './fir-poc/pages/FirSpList';
import { FirDsoList } from './fir-poc/pages/FirDsoList';
import { FirReList } from './fir-poc/pages/FirReList';
import { FirBrpList } from './fir-poc/pages/FirBrpList';
import { FirRegResponsibleList } from './fir-poc/pages/FirRegResponsibleList';
import { FirPartyDetail } from './fir-poc/pages/FirPartyDetail';
import { FirProductTypeList } from './fir-poc/pages/FirProductTypeList';
import { FirProductDetail } from './fir-poc/pages/FirProductDetail';
import { FirServiceProviderApplications } from './fir-poc/pages/FirServiceProviderApplications';
import { FirSPGProductApplications } from './fir-poc/pages/FirSPGProductApplications';
import { FirBaselineList } from './fir-poc/pages/FirBaselineList';
import { FirBidsReceived } from './fir-poc/pages/FirBidsReceived';
import { FirBidsActivated } from './fir-poc/pages/FirBidsActivated';
import { FirVerificationList } from './fir-poc/pages/FirVerificationList';
import { FirVerificationDetail } from './fir-poc/pages/FirVerificationDetail';
import { FirBspSettlement } from './fir-poc/pages/FirBspSettlement';
import { FirBrpSettlement } from './fir-poc/pages/FirBrpSettlement';
import { FirReSettlement } from './fir-poc/pages/FirReSettlement';
import { 
  mockCUs, 
  CU, 
  mockBids, 
  mockSPGs, 
  mockDSOs, 
  mockREs, 
  mockBRPs, 
  mockBSPs, 
  svkProducts, 
  mockGridConstraints,
  mockSPs,
  mockRegResponsibles 
} from './fir-poc/mockData';

interface NavigationState {
    view: PocView;
    cu: CU | null;
    spgId: string | null;
    party: string | null;
    product: string | null;
    constraint: string | null;
    bidId: string | null;
}

export const FirGuiPocPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<PocView>('dashboard'); 
  const [selectedCU, setSelectedCU] = useState<CU | null>(null); 
  const [selectedSpgId, setSelectedSpgId] = useState<string | null>(null);
  const [selectedPartyName, setSelectedPartyName] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedConstraintId, setSelectedConstraintId] = useState<string | null>(null);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  
  const [history, setHistory] = useState<NavigationState[]>([]);

  const pushHistory = useCallback(() => {
    setHistory(prev => [...prev, {
        view: currentView,
        cu: selectedCU,
        spgId: selectedSpgId,
        party: selectedPartyName,
        product: selectedProductId,
        constraint: selectedConstraintId,
        bidId: selectedBidId
    }]);
  }, [currentView, selectedCU, selectedSpgId, selectedPartyName, selectedProductId, selectedConstraintId, selectedBidId]);

  const handleGoBack = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentView(previous.view);
    setSelectedCU(previous.cu);
    setSelectedSpgId(previous.spgId);
    setSelectedPartyName(previous.party);
    setSelectedProductId(previous.product);
    setSelectedConstraintId(previous.constraint);
    setSelectedBidId(previous.bidId);
  }, [history]);

  const handleNavigate = useCallback((view: PocView) => {
    pushHistory();
    setCurrentView(view);
    setSelectedCU(null); 
    setSelectedSpgId(null);
    setSelectedPartyName(null);
    setSelectedProductId(null);
    setSelectedConstraintId(null);
    setSelectedBidId(null);
  }, [pushHistory]);

  const handleSelectCU = useCallback((id: string) => {
    const cu = mockCUs.find(c => c.id === id);
    if (cu) {
        pushHistory();
        setSelectedCU(cu);
        setCurrentView('cus');
        setSelectedBidId(null);
    }
  }, [pushHistory]);

  const handleSelectSPG = useCallback((id: string) => {
    pushHistory();
    setSelectedSpgId(id);
    setCurrentView('spgs');
    setSelectedBidId(null);
  }, [pushHistory]);

  const handleSelectParty = useCallback((name: string) => {
    pushHistory();
    setSelectedPartyName(name);
    // Bevara roll-specifik kontext om möjligt
    if (!['dsos', 'res', 'brps', 'bsp', 'sp', 'reg_responsible', 'parties', 'overview'].includes(currentView)) {
        setCurrentView('parties');
    }
  }, [currentView, pushHistory]);

  const handleSelectProduct = useCallback((id: string) => {
    pushHistory();
    setSelectedProductId(id);
    setCurrentView('prod_types');
  }, [pushHistory]);

  const handleSelectConstraint = useCallback((id: string) => {
    pushHistory();
    setSelectedConstraintId(id);
    setCurrentView('grid_constraint_detail');
  }, [pushHistory]);

  const handleSelectBid = useCallback((id: string) => {
    pushHistory();
    setSelectedBidId(id);
    setCurrentView('verification');
  }, [pushHistory]);

  // --- BID NAVIGATION LOGIC ---
  const sortedBids = useMemo(() => {
    return [...mockBids].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, []);

  const handlePrevBid = useCallback(() => {
    if (!selectedBidId) return;
    const idx = sortedBids.findIndex(b => b.id === selectedBidId);
    if (idx > 0) setSelectedBidId(sortedBids[idx - 1].id);
  }, [selectedBidId, sortedBids]);

  const handleNextBid = useCallback(() => {
    if (!selectedBidId) return;
    const idx = sortedBids.findIndex(b => b.id === selectedBidId);
    if (idx < sortedBids.length - 1) setSelectedBidId(sortedBids[idx + 1].id);
  }, [selectedBidId, sortedBids]);

  // --- SPG NAVIGATION ---
  const { prevSpg, nextSpg } = useMemo(() => {
    if (!selectedSpgId) return { prevSpg: null, nextSpg: null };
    const currentIndex = mockSPGs.findIndex(s => s.id === selectedSpgId);
    return {
        prevSpg: currentIndex > 0 ? mockSPGs[currentIndex - 1] : null,
        nextSpg: currentIndex < mockSPGs.length - 1 ? mockSPGs[currentIndex + 1] : null
    };
  }, [selectedSpgId]);

  // --- PARTY NAVIGATION ---
  const allParties = useMemo(() => {
    const nameSet = new Set<string>();
    mockDSOs.forEach(d => nameSet.add(d.name));
    mockREs.forEach(r => nameSet.add(r.name));
    mockBRPs.forEach(b => nameSet.add(b.name));
    mockBSPs.forEach(s => nameSet.add(s.name));
    mockSPs.forEach(s => nameSet.add(s.name));
    mockRegResponsibles.forEach(r => nameSet.add(r.name));
    return Array.from(nameSet).sort();
  }, []);

  const { prevParty, nextParty } = useMemo(() => {
    if (!selectedPartyName) return { prevParty: null, nextParty: null };
    const currentIndex = allParties.indexOf(selectedPartyName);
    return {
        prevParty: currentIndex > 0 ? allParties[currentIndex - 1] : null,
        nextParty: currentIndex < allParties.length - 1 ? allParties[currentIndex + 1] : null
    };
  }, [selectedPartyName, allParties]);

  // --- PRODUCT NAVIGATION ---
  const { prevProduct, nextProduct } = useMemo(() => {
    if (!selectedProductId) return { prevProduct: null, nextProduct: null };
    const currentIndex = svkProducts.findIndex(p => p.id === selectedProductId);
    return {
        prevProduct: currentIndex > 0 ? svkProducts[currentIndex - 1] : null,
        nextProduct: currentIndex < svkProducts.length - 1 ? svkProducts[currentIndex + 1] : null
    };
  }, [selectedProductId]);

  // --- CONSTRAINT NAVIGATION ---
  const { prevConstraint, nextConstraint } = useMemo(() => {
    if (!selectedConstraintId) return { prevConstraint: null, nextConstraint: null };
    const currentIndex = mockGridConstraints.findIndex(c => c.id === selectedConstraintId);
    return {
        prevConstraint: currentIndex > 0 ? mockGridConstraints[currentIndex - 1] : null,
        nextConstraint: currentIndex < mockGridConstraints.length - 1 ? mockGridConstraints[currentIndex + 1] : null
    };
  }, [selectedConstraintId]);

  const { prevCU, nextCU } = useMemo(() => {
    if (!selectedCU) return { prevCU: null, nextCU: null };
    const currentIndex = mockCUs.findIndex(c => c.id === selectedCU.id);
    return {
        prevCU: currentIndex > 0 ? mockCUs[currentIndex - 1] : null,
        nextCU: currentIndex < mockCUs.length - 1 ? mockCUs[currentIndex + 1] : null
    };
  }, [selectedCU]);

  const renderContent = () => {
    // 1. Check Detail views first (if applicable)
    if (selectedCU && currentView === 'cus') {
        return <FirCUDetail cu={selectedCU} prevCU={prevCU} nextCU={nextCU} onSelectCU={handleSelectCU} onBack={handleGoBack} onNavigateToGroup={handleSelectSPG} onSelectParty={handleSelectParty} onSelectBid={handleSelectBid} />;
    }
    if (selectedSpgId && currentView === 'spgs') {
        return <FirSPGDetail id={selectedSpgId} prevSpg={prevSpg} nextSpg={nextSpg} onSelectSPG={handleSelectSPG} onBack={handleGoBack} onSelectCU={handleSelectCU} onSelectBid={handleSelectBid} />;
    }
    if (selectedPartyName && ['parties', 'overview', 'bsp', 'sp', 'dsos', 'res', 'brps', 'reg_responsible'].includes(currentView)) {
        return <FirPartyDetail partyName={selectedPartyName} prevParty={prevParty} nextParty={nextParty} onSelectParty={handleSelectParty} onBack={handleGoBack} onSelectCU={handleSelectCU} onSelectSPG={handleSelectSPG} />;
    }
    if (selectedProductId && currentView === 'prod_types') {
        return <FirProductDetail productId={selectedProductId} prevProduct={prevProduct} nextProduct={nextProduct} onSelectProduct={handleSelectProduct} onBack={handleGoBack} onNavigateToGroup={handleSelectSPG} onSelectParty={handleSelectParty} onSelectBid={handleSelectBid} />;
    }
    if (selectedConstraintId && currentView === 'grid_constraint_detail') {
        return <FirGridConstraintDetail id={selectedConstraintId} prevConstraint={prevConstraint} nextConstraint={nextConstraint} onSelectConstraint={handleSelectConstraint} onBack={handleGoBack} onSelectCU={handleSelectCU} onSelectSPG={handleSelectSPG} />;
    }
    if (selectedBidId && currentView === 'verification') {
        return (
          <FirVerificationDetail 
            bidId={selectedBidId} 
            onBack={handleGoBack} 
            onSelectCU={handleSelectCU} 
            onSelectSPG={handleSelectSPG} 
            onSelectBid={handleSelectBid}
            onPrev={handlePrevBid}
            onNext={handleNextBid}
          />
        );
    }

    // 2. Main Routing Switch
    switch (currentView) {
        case 'dashboard': return <FirDashboard onNavigate={handleNavigate} />;
        case 'cus': return <FirCUList onSelect={handleSelectCU} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} onNavigateToParties={() => handleNavigate('parties')} />;
        case 'spgs': return <FirSPGList onSelect={handleSelectSPG} />;
        case 'bids_received': return <FirBidsReceived onSelectBid={handleSelectBid} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} />;
        case 'bids_activated': return <FirBidsActivated onSelectBid={handleSelectBid} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} />;
        case 'verification': return <FirVerificationList onSelectBid={handleSelectBid} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} />;
        case 'settlement_result': return <FirBspSettlement onSelectBid={handleSelectBid} onSelectParty={handleSelectParty} />;
        case 'brp_settlement': return <FirBrpSettlement onSelectBid={handleSelectBid} onSelectParty={handleSelectParty} />;
        case 're_settlement': return <FirReSettlement onSelectBid={handleSelectBid} onSelectParty={handleSelectParty} />;
        case 'bsp': return <FirBspList onSelect={handleSelectParty} />;
        case 'sp': return <FirSpList onSelect={handleSelectParty} />;
        case 'reg_responsible': return <FirRegResponsibleList onSelect={handleSelectParty} />;
        case 'dsos': return <FirDsoList onSelect={handleSelectParty} />;
        case 'res': return <FirReList onSelect={handleSelectParty} />;
        case 'brps': return <FirBrpList onSelect={handleSelectParty} />;
        case 'parties':
        case 'overview': return <FirPartiesList onSelect={handleSelectParty} />;
        case 'prod_types': return <FirProductTypeList onSelect={handleSelectProduct} />;
        case 'prequalification': return <FirPrequalificationList onSelect={handleSelectCU} />;
        case 'grid_constraints': return <FirGridConstraintsList onSelect={handleSelectConstraint} />;
        case 'sp_applications': return <FirServiceProviderApplications />;
        case 'spg_applications': return <FirSPGProductApplications onSelectSPG={handleSelectSPG} />;
        case 'baselines': return <FirBaselineList />;
        default: return <FirGenericList title={currentView} />;
    }
  };

  const getPageTitle = () => {
    if (selectedCU && currentView === 'cus') return `Controllable unit ${selectedCU.id}`;
    if (selectedSpgId && currentView === 'spgs') return `SPG ${selectedSpgId}`;
    if (selectedPartyName) return `Party: ${selectedPartyName}`;
    if (selectedProductId && currentView === 'prod_types') return `Product: ${selectedProductId}`;
    if (selectedConstraintId && currentView === 'grid_constraint_detail') return `Grid Constraint ${selectedConstraintId}`;
    if (selectedBidId && currentView === 'verification') return `Verification: ${selectedBidId}`;
    
    switch(currentView) {
        case 'parties': return 'Global Parties Overview';
        case 'bsp': return 'Balance Service Providers (BSP)';
        case 'sp': return 'Service Providers (SP)';
        case 'reg_responsible': return 'CU Registration Responsibles';
        case 'dsos': return 'Distribution System Operators (DSO)';
        case 'res': return 'Retail Entities (RE)';
        case 'brps': return 'Balance Responsible Parties (BRP)';
        case 'cus': return 'Controllable Units';
        case 'spgs': return 'Service Providing Groups';
        case 'bids_received': return 'Received Bids & Capacity Validation';
        case 'bids_activated': return 'Market Dispatch & Activation';
        case 'verification': return 'Settlement Verification';
        case 'settlement_result': return 'BSP Settlement';
        case 'brp_settlement': return 'BRP Settlement';
        case 're_settlement': return 'RE Settlement';
        case 'grid_constraints': return 'Temporary Grid Constraints';
        case 'dashboard': return 'System Dashboard';
        default: return 'Flexibility Information System Portal';
    }
  };

  return (
    <div style={{...pocStyles.layout, margin: '-40px -60px', width: 'calc(100% + 120px)'}}> 
      <FirSidebar currentView={currentView} onNavigate={handleNavigate} />
      <div style={pocStyles.main}>
        <div style={pocStyles.topBar}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            {history.length > 0 && (
                <button 
                    onClick={handleGoBack}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        color: 'white',
                        marginRight: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}
                >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </button>
            )}
            <Menu size={20} style={{cursor: 'pointer', opacity: history.length > 0 ? 0.7 : 1}} />
            <span style={{fontWeight: 600, letterSpacing: '0.5px', marginLeft: '8px'}}>
                {getPageTitle()}
            </span>
          </div>
          <div style={{display: 'flex', gap: '12px'}}>
             <button style={pocStyles.actionButton}>Service Provider</button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
