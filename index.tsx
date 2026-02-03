import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BRSData, MPSData, NavigationSnapshot } from './types';
import { brsList as initialBrsList, mpsList as initialMpsList } from './data';
import { ViewMode } from './dhv1/menuConfig';
import { Layout } from './dhv1/Layout';
import { AppRouter } from './dhv1/AppRouter';

// Need to export groups for use in Layout (though ideally should be in config)
export const groups = [
    { id: '1', title: 'Domain 1: Master Data', brsPrefixes: ['BRS-FLEX-1'], mpsPrefixes: ['MPS-FLEX-1'] },
    { id: '2', title: 'Domain 2: Contracts & Market', brsPrefixes: ['BRS-FLEX-2'], mpsPrefixes: ['MPS-FLEX-2'] },
    { id: '3', title: 'Domain 3: Product & Qualification', brsPrefixes: ['BRS-FLEX-3'], mpsPrefixes: ['MPS-FLEX-3'] },
    { id: '4', title: 'Domain 4: Grid Constraints', brsPrefixes: ['BRS-FLEX-4'], mpsPrefixes: ['MPS-FLEX-4'] },
    { id: '5', title: 'Domain 5: Baseline', brsPrefixes: ['BRS-FLEX-5'], mpsPrefixes: ['MPS-FLEX-5'] },
    { id: '6', title: 'Domain 6: Meter Values', brsPrefixes: ['BRS-FLEX-6'], mpsPrefixes: ['MPS-FLEX-6'] },
    { id: '7', title: 'Domain 7: Verification & Bidding', brsPrefixes: ['BRS-FLEX-7'], mpsPrefixes: ['MPS-FLEX-7'] },
    { id: '8', title: 'Domain 8: Actor Administration', brsPrefixes: ['BRS-FLEX-8'], mpsPrefixes: ['MPS-FLEX-8'] }
];

const LoginPage = ({ onLogin }: { onLogin: (p: string) => void }) => {
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  
  const handleLogin = () => {
    if (p === 'admin' || p === 'demo' || p === 'fis' || p === 'SVKFIR' || p === 'FIRPOC') {
        onLogin(p);
    } else {
        setErr(true);
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'#f4f5f7', fontFamily: '"Segoe UI", sans-serif'}}>
      <div style={{backgroundColor:'white', padding:'48px', borderRadius:'8px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)', textAlign:'center', width: '100%', maxWidth: '320px'}}>
        <div style={{fontSize: '3rem', marginBottom: '16px'}}>⚡</div>
        <h1 style={{color:'#172b4d', marginBottom:'8px', fontSize: '1.5rem'}}>DHV/FIR Wiki</h1>
        <p style={{color:'#5e6c84', marginBottom:'32px', fontSize: '0.9rem'}}>Please log in to continue</p>
        
        <input 
          type="password" 
          value={p} 
          onChange={e => { setP(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="Password"
          style={{
              width:'100%', padding:'10px', fontSize:'16px', borderRadius:'4px', 
              border: `2px solid ${err ? '#bf2600' : '#dfe1e6'}`, 
              marginBottom:'16px', boxSizing: 'border-box', outline: 'none'
          }}
        />
        {err && <div style={{color: '#bf2600', fontSize: '0.85rem', marginBottom: '16px'}}>Invalid password</div>}
        
        <button 
          onClick={handleLogin}
          style={{
              width:'100%', padding:'12px', fontSize:'16px', fontWeight: 600,
              backgroundColor:'#0052cc', color:'white', border:'none', 
              borderRadius:'4px', cursor:'pointer', transition: 'background-color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0747a6'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0052cc'}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('fis_auth_token') === 'true';
  });

  const [loginType, setLoginType] = useState<'full' | 'poc'>(() => {
    return (sessionStorage.getItem('fis_login_type') as 'full' | 'poc') || 'full';
  });

  const [brsData, setBrsData] = useState<BRSData[]>(initialBrsList);
  const [mpsData, setMpsData] = useState<MPSData[]>(initialMpsList);
  
  const [selectedId, setSelectedId] = useState<string>(initialBrsList[0].id);
  const [selectedMpsId, setSelectedMpsId] = useState<string>(initialMpsList[0]?.id || '');
  const [selectedDomain, setSelectedDomain] = useState<string>('1');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
      // If we are authenticated and it's a poc login, default to firPoc
      const savedType = sessionStorage.getItem('fis_login_type');
      return savedType === 'poc' ? 'firPoc' : 'general';
  });
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProcedureId, setSelectedProcedureId] = useState<number | null>(null);
  
  // History State
  const [historyStack, setHistoryStack] = useState<NavigationSnapshot[]>([]);
  
  // DHV State managed here to pass down
  const [isDhvOpen, setIsDhvOpen] = useState(false);

  // --- History Management ---
  
  const saveSnapshot = () => {
    setHistoryStack(prev => [...prev, {
        viewMode,
        selectedId,
        selectedMpsId,
        selectedDomain,
        selectedProcedureId
    }]);
  };

  const handleGoBack = () => {
    if (historyStack.length === 0) return;
    
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack(prev => prev.slice(0, -1)); // Pop

    // Restore state
    setViewMode(previous.viewMode);
    setSelectedId(previous.selectedId);
    setSelectedMpsId(previous.selectedMpsId);
    setSelectedDomain(previous.selectedDomain);
    setSelectedProcedureId(previous.selectedProcedureId);
    
    // Note: We don't save snapshot when going back, effectively "popping" the stack
  };

  // --- Wrapped Navigation Handlers ---

  const handleSetViewMode = (v: ViewMode) => {
    // Only save snapshot if actually changing view or parameters (simple check)
    // For simplicity in this prompt, we always push when this is called explicitly
    saveSnapshot();
    setViewMode(v);
  };

  const handleSelectBRS = (id: string) => {
    saveSnapshot();
    setSelectedId(id);
    setViewMode('detail');
    
    const matchFlex = id.match(/BRS-FLEX-(\d)/);
    if (matchFlex) {
        setSelectedDomain(matchFlex[1]);
        ensureGroupOpen(matchFlex[1]);
    }
    if (id.includes('DHV')) {
        setIsDhvOpen(true);
    }
  };

  const handleSelectMPS = (id: string) => {
      saveSnapshot();
      setSelectedMpsId(id);
      setViewMode('mps');

      const matchFlex = id.match(/MPS-FLEX-(\d)/);
      if (matchFlex) {
          setSelectedDomain(matchFlex[1]);
          ensureGroupOpen(matchFlex[1]);
      }
      if (id.includes('DHV')) {
          setIsDhvOpen(true);
      }
  };

  const handleSelectConditions = (domainId: string) => {
    saveSnapshot();
    setSelectedDomain(domainId);
    setViewMode('conditions');
    ensureGroupOpen(domainId);
  };

  const handleSelectActorOverview = (domainId: string) => {
      saveSnapshot();
      setSelectedDomain(domainId);
      setViewMode('actorOverview');
      ensureGroupOpen(domainId);
  };
  
  const handleSelectBRSOverview = (domainId: string) => {
      saveSnapshot();
      setSelectedDomain(domainId);
      setViewMode('brsOverview');
      ensureGroupOpen(domainId);
  };
  
  const handleSelectMPSOverview = (domainId: string) => {
      saveSnapshot();
      setSelectedDomain(domainId);
      setViewMode('mpsOverview');
      ensureGroupOpen(domainId);
  };

  const handleSelectDomain = (domainId: string) => {
      saveSnapshot();
      setSelectedDomain(domainId);
      setViewMode('domainLanding');
      ensureGroupOpen(domainId);
  };

  const handleNavigateToProcedure = (id: number) => {
      saveSnapshot();
      setSelectedProcedureId(id);
      setViewMode('procedureDetail');
  };

  // --- Auth & Data Handlers ---

  const handleLogin = (p: string) => {
    if (p === 'admin' || p === 'demo' || p === 'fis' || p === 'SVKFIR' || p === 'FIRPOC') {
        const type = p === 'FIRPOC' ? 'poc' : 'full';
        sessionStorage.setItem('fis_auth_token', 'true');
        sessionStorage.setItem('fis_login_type', type);
        setLoginType(type);
        setIsAuthenticated(true);
        if (type === 'poc') {
            setViewMode('firPoc');
        }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('fis_auth_token');
    sessionStorage.removeItem('fis_login_type');
    setIsAuthenticated(false);
  };

  const ensureGroupOpen = (groupId: string) => {
    if (!openGroups.includes(groupId)) {
        setOpenGroups(prev => [...prev, groupId]);
    }
  };

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleUpdateBRS = (updatedBRS: BRSData) => {
    setBrsData(prev => prev.map(b => b.id === updatedBRS.id ? updatedBRS : b));
  };

  // Helper functions for AppRouter editing
  const activeBRS = brsData.find(b => b.id === selectedId) || brsData[0];
  
  const updateArrayItem = (section: 'preConditions' | 'businessRules' | 'process', index: number, key: string, value: string) => {
    const updatedBRS = { ...activeBRS };
    const list = updatedBRS[section] as any[];
    const item = list[index];
    if (typeof item === 'string') {
        list[index] = { id: '', description: value };
    } else {
        list[index] = { ...item, [key]: value };
    }
    handleUpdateBRS(updatedBRS);
  };

  // Fix: Line 262 - removed duplicate declaration of handleAddArrayItem
  const handleAddArrayItem = (section: 'preConditions' | 'businessRules' | 'process') => {
      const updatedBRS = { ...activeBRS };
      const list = updatedBRS[section] as any[];
      if (section === 'businessRules') {
        list.push({ id: '', description: '', errorCode: '' });
      } else {
        list.push({ id: '', description: '' });
      }
      handleUpdateBRS(updatedBRS);
  };

  const handleRemoveArrayItem = (section: 'preConditions' | 'businessRules' | 'process', index: number) => {
      const updatedBRS = { ...activeBRS };
      const list = updatedBRS[section] as any[];
      list.splice(index, 1);
      handleUpdateBRS(updatedBRS);
  };


  if (!isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        onLogout={handleLogout}
        brsData={brsData}
        mpsData={mpsData}
        selectedId={selectedId}
        selectedMpsId={selectedMpsId}
        selectedDomain={selectedDomain}
        selectedProcedureId={selectedProcedureId}
        handleSelectBRS={handleSelectBRS}
        handleSelectMPS={handleSelectMPS}
        handleSelectConditions={handleSelectConditions}
        handleSelectActorOverview={handleSelectActorOverview}
        handleSelectBRSOverview={handleSelectBRSOverview}
        handleSelectMPSOverview={handleSelectMPSOverview}
        handleSelectDomain={handleSelectDomain}
        openGroups={openGroups}
        toggleGroup={toggleGroup}
        isDhvOpen={isDhvOpen}
        setIsDhvOpen={setIsDhvOpen}
        onGoBack={handleGoBack}
        canGoBack={historyStack.length > 0}
        loginType={loginType}
    >
        <AppRouter 
            viewMode={viewMode}
            brsData={brsData}
            mpsData={mpsData}
            selectedId={selectedId}
            selectedMpsId={selectedMpsId}
            selectedDomain={selectedDomain}
            selectedProcedureId={selectedProcedureId}
            isEditing={isEditing}
            setViewMode={handleSetViewMode}
            handleSelectBRS={handleSelectBRS}
            handleSelectMPS={handleSelectMPS}
            handleSelectDomain={handleSelectDomain}
            handleNavigateToProcedure={handleNavigateToProcedure}
            handleUpdateBRS={handleUpdateBRS}
            updateArrayItem={updateArrayItem}
            handleAddArrayItem={handleAddArrayItem}
            handleRemoveArrayItem={handleRemoveArrayItem}
        />
    </Layout>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);