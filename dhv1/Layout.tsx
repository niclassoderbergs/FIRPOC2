
import React, { useRef, useEffect } from 'react';
import { ViewMode } from './menuConfig';
import { styles } from './styles';
import { BRSData, MPSData } from '../types';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    viewMode: ViewMode;
    setViewMode: (v: ViewMode) => void;
    onLogout: () => void;
    brsData: BRSData[];
    mpsData: MPSData[];
    selectedId: string;
    selectedMpsId: string;
    selectedDomain: string;
    selectedProcedureId?: number | null;
    // Selection handlers
    handleSelectBRS: (id: string) => void;
    handleSelectMPS: (id: string) => void;
    handleSelectConditions: (id: string) => void;
    handleSelectActorOverview: (id: string) => void;
    handleSelectBRSOverview: (id: string) => void;
    handleSelectMPSOverview: (id: string) => void;
    handleSelectDomain: (id: string) => void;
    // States that were previously passed down but now managed inside Sidebar or unused
    // We keep the prop signature clean but flexible if needed later
    openGroups?: string[];
    toggleGroup?: (id: string) => void;
    isDhvOpen?: boolean;
    setIsDhvOpen?: (v: boolean) => void;
    
    // Navigation
    onGoBack: () => void;
    canGoBack: boolean;
    loginType: 'full' | 'poc';
}

export const Layout: React.FC<LayoutProps> = ({ 
    children, viewMode, setViewMode, onLogout, 
    brsData, mpsData, selectedId, selectedMpsId, selectedDomain, selectedProcedureId,
    handleSelectBRS, handleSelectMPS, handleSelectConditions, handleSelectActorOverview,
    handleSelectBRSOverview, handleSelectMPSOverview, handleSelectDomain,
    onGoBack, canGoBack, loginType
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [viewMode, selectedId, selectedMpsId, selectedDomain, selectedProcedureId]);

    const isPocOnly = loginType === 'poc';

    return (
        <div style={styles.appContainer}>
          <header style={styles.header}>
            <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
                <div style={styles.logo}>
                  <span style={{fontSize: '1.5rem'}}>⚡</span>
                  <span>DHV/FIR WIKI</span>
                </div>
                {canGoBack && (
                     <button 
                        onClick={onGoBack} 
                        style={{
                            background: 'rgba(255,255,255,0.2)', 
                            border: 'none', 
                            color: 'white', 
                            fontWeight: 600, 
                            cursor: 'pointer', 
                            padding: '6px 12px', 
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.9rem'
                        }}
                        title="Go back to previous view"
                    >
                        <span>⬅</span> Back
                    </button>
                )}
            </div>
            
            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <button 
                    onClick={() => setViewMode('welcome')} 
                    style={{
                        background: 'none', 
                        border: 'none', 
                        color: 'white', 
                        fontWeight: 700, 
                        cursor: 'pointer', 
                        opacity: (viewMode === 'welcome' || viewMode === 'firPoc') ? 1 : 0.8,
                        fontSize: '1.05rem',
                        borderBottom: (viewMode === 'welcome' || viewMode === 'firPoc') ? '2px solid white' : '2px solid transparent',
                        paddingBottom: '2px'
                    }}
                >
                    FIR
                </button>
                {!isPocOnly && (
                    <button 
                        onClick={() => setViewMode('dhvWelcome')} 
                        style={{
                            background: 'none', 
                            border: 'none', 
                            color: 'white', 
                            fontWeight: 700, 
                            cursor: 'pointer', 
                            opacity: viewMode === 'dhvWelcome' ? 1 : 0.8,
                            fontSize: '1.05rem',
                            borderBottom: viewMode === 'dhvWelcome' ? '2px solid white' : '2px solid transparent',
                            paddingBottom: '2px'
                        }}
                    >
                        DHV
                    </button>
                )}
                <button
                    onClick={onLogout}
                    style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontWeight: 600, cursor: 'pointer', padding: '4px 10px', borderRadius: '4px', marginLeft: '16px'}}
                >
                    Log out
                </button>
            </div>
          </header>
    
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              
              <Sidebar 
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  brsData={brsData}
                  mpsData={mpsData}
                  selectedId={selectedId}
                  selectedMpsId={selectedMpsId}
                  selectedDomain={selectedDomain}
                  handleSelectBRS={handleSelectBRS}
                  handleSelectMPS={handleSelectMPS}
                  handleSelectConditions={handleSelectConditions}
                  handleSelectActorOverview={handleSelectActorOverview}
                  handleSelectBRSOverview={handleSelectBRSOverview}
                  handleSelectMPSOverview={handleSelectMPSOverview}
                  handleSelectDomain={handleSelectDomain}
                  loginType={loginType}
              />
    
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <div style={styles.mainScroll} ref={scrollRef}>
                    <div style={styles.paper}>
                        {children}
                    </div>
                </div>
              </div>
          </div>
        </div>
      );
};
