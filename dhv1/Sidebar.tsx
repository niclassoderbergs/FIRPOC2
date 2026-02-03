
import React, { useState, useEffect } from 'react';
import { ViewMode, overviewMenuItems, dhvOverviewMenuItems, adminMenuItems } from './menuConfig';
import { dhvDomains } from './sidebarConfig';
import { styles } from './styles';
import { BRSData, MPSData } from '../types';
import { groups } from '../index'; 

// --- Internal Components ---

interface SidebarGroupProps {
  group: { id: string; title: string };
  brsItems: BRSData[];
  mpsItems: MPSData[];
  isOpen: boolean;
  onToggle: () => void;
  selectedId: string;
  selectedMpsId: string;
  selectedDomain: string;
  onSelectBRS: (id: string) => void;
  onSelectMPS: (id: string) => void;
  onSelectConditions: (domainId: string) => void;
  onSelectActorOverview: (domainId: string) => void;
  onSelectBRSOverview: (domainId: string) => void;
  onSelectMPSOverview: (domainId: string) => void;
  onSelectDomain: (domainId: string) => void;
  viewMode: ViewMode;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ 
    group, brsItems, mpsItems, isOpen, onToggle, 
    selectedId, selectedMpsId, selectedDomain,
    onSelectBRS, onSelectMPS, onSelectConditions, 
    onSelectActorOverview, onSelectBRSOverview, onSelectMPSOverview, onSelectDomain,
    viewMode 
}) => {
    const [hover, setHover] = useState(false);
    const [mpsOpen, setMpsOpen] = useState(false);
    const [brsOpen, setBrsOpen] = useState(false);

    useEffect(() => {
        if (viewMode === 'mps' && mpsItems.some(m => m.id === selectedMpsId)) setMpsOpen(true);
        if (viewMode === 'detail' && brsItems.some(b => b.id === selectedId)) setBrsOpen(true);
    }, [viewMode, selectedMpsId, selectedId, mpsItems, brsItems]);

    return (
        <div style={styles.treeGroup}>
            <div 
                style={{
                    ...styles.treeHeader, 
                    ...(hover ? styles.treeHeaderHover : {})
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectDomain(group.id);
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <span style={styles.treeArrow} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
                    <span style={{fontSize: '0.7rem', display: 'inline-block', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                </span>
                <span 
                    style={{
                        ...styles.treeLabel, 
                        color: (viewMode === 'domainLanding' && selectedDomain === group.id) ? '#0052cc' : '#42526e'
                    }}
                >
                    {group.title}
                </span>
            </div>
            
            {isOpen && (
                <div style={styles.treeContent}>
                    {mpsItems.length > 0 && (
                        <>
                           <div style={styles.treeSubHeaderContainer}>
                               <span style={styles.treeSubHeaderArrow} onClick={() => setMpsOpen(!mpsOpen)}>
                                  <span style={{fontSize: '0.6rem', display: 'inline-block', transition: 'transform 0.2s', transform: mpsOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                               </span>
                               <span 
                                 style={{...styles.treeSubHeaderLabel, color: (viewMode === 'mpsOverview' && selectedDomain === group.id) ? '#0052cc' : '#6b778c'}}
                                 onClick={() => onSelectMPSOverview(group.id)}
                               >
                                 MPS - MARKNADSPROCESSER
                               </span>
                           </div>
                           {mpsOpen && (
                               <div>
                                   <button
                                        onClick={() => onSelectConditions(group.id)}
                                        style={{
                                          ...styles.treeItem,
                                          paddingLeft: '32px',
                                          ...(viewMode === 'conditions' && selectedDomain === group.id ? styles.treeItemActive : {}),
                                          color: (viewMode === 'conditions' && selectedDomain === group.id) ? '#0052cc' : '#6b778c',
                                          fontWeight: 600,
                                          fontSize: '0.85rem'
                                        }}
                                      >
                                        📊 MPS/BRS översikt
                                   </button>
                                   {mpsItems.map(mps => (
                                       <button 
                                            key={mps.id} 
                                            onClick={() => onSelectMPS(mps.id)} 
                                            style={{
                                                ...styles.treeItem, 
                                                paddingLeft: '32px', 
                                                ...(viewMode === 'mps' && selectedMpsId === mps.id ? styles.treeItemActive : {})
                                            }}
                                       >
                                           <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '2px' }}>{mps.id}</div>
                                           {mps.title}
                                       </button>
                                   ))}
                               </div>
                           )}
                        </>
                    )}

                    {brsItems.length > 0 && (
                        <>
                           <div style={styles.treeSubHeaderContainer}>
                               <span style={styles.treeSubHeaderArrow} onClick={() => setBrsOpen(!brsOpen)}>
                                  <span style={{fontSize: '0.6rem', display: 'inline-block', transition: 'transform 0.2s', transform: brsOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                               </span>
                               <span 
                                 style={{...styles.treeSubHeaderLabel, color: (viewMode === 'brsOverview' && selectedDomain === group.id) ? '#0052cc' : '#6b778c'}}
                                 onClick={() => onSelectBRSOverview(group.id)}
                               >
                                 BRS - AFFÄRSTRANSAKTIONER
                               </span>
                           </div>
                           {brsOpen && (
                               <div>
                                   {brsItems.map(brs => (
                                       <button 
                                            key={brs.id} 
                                            onClick={() => onSelectBRS(brs.id)} 
                                            style={{
                                                ...styles.treeItem, 
                                                paddingLeft: '32px', 
                                                ...(viewMode === 'detail' && selectedId === brs.id ? styles.treeItemActive : {})
                                            }}
                                       >
                                           <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '2px' }}>{brs.id}</div>
                                           {brs.title}
                                       </button>
                                   ))}
                               </div>
                           )}
                        </>
                    )}

                    <button
                        onClick={() => onSelectActorOverview(group.id)}
                        style={{
                          ...styles.treeItem,
                          ...(viewMode === 'actorOverview' && selectedDomain === group.id ? styles.treeItemActive : {}),
                          color: (viewMode === 'actorOverview' && selectedDomain === group.id) ? '#0052cc' : '#6b778c',
                          fontWeight: 600,
                          marginTop: '8px'
                        }}
                      >
                        👥 Aktörsöversikt
                    </button>
                </div>
            )}
        </div>
    );
};

const sortById = (a: {id: string}, b: {id: string}) => {
    const numA = parseInt(a.id.replace(/\D/g, ''), 10);
    const numB = parseInt(b.id.replace(/\D/g, ''), 10);
    return numA - numB;
};

interface SidebarProps {
    viewMode: ViewMode;
    setViewMode: (v: ViewMode) => void;
    brsData: BRSData[];
    mpsData: MPSData[];
    selectedId: string;
    selectedMpsId: string;
    selectedDomain: string;
    handleSelectBRS: (id: string) => void;
    handleSelectMPS: (id: string) => void;
    handleSelectConditions: (id: string) => void;
    handleSelectActorOverview: (id: string) => void;
    handleSelectBRSOverview: (id: string) => void;
    handleSelectMPSOverview: (id: string) => void;
    handleSelectDomain: (id: string) => void;
    loginType: 'full' | 'poc';
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    viewMode, setViewMode, brsData, mpsData, selectedId, selectedMpsId, selectedDomain,
    handleSelectBRS, handleSelectMPS, handleSelectConditions, handleSelectActorOverview,
    handleSelectBRSOverview, handleSelectMPSOverview, handleSelectDomain, loginType
}) => {
    const [startHover, setStartHover] = useState(false);
    const [timelineHover, setTimelineHover] = useState(false);
    const [deploymentHover, setDeploymentHover] = useState(false); 
    const [todoHover, setTodoHover] = useState(false);
    const [storylineHover, setStorylineHover] = useState(false);
    const [impactHover, setImpactHover] = useState(false);
    const [isFisOpen, setIsFisOpen] = useState(false); 
    const [fisHover, setFisHover] = useState(false);
    const [isDhvOpen, setIsDhvOpen] = useState(false);
    const [dhvHover, setDhvHover] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [adminHover, setAdminHover] = useState(false);

    const [openFisGroups, setOpenFisGroups] = useState<string[]>([]);
    const [expandedDhvDomains, setExpandedDhvDomains] = useState<Record<string, boolean>>({});
    const [expandedSubMenus, setExpandedSubMenus] = useState<Record<string, boolean>>({}); 

    const toggleFisGroup = (id: string) => {
        setOpenFisGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
    };

    const toggleDhvDomain = (id: string) => {
        setExpandedDhvDomains(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSubMenu = (key: string) => {
        setExpandedSubMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        if (viewMode === 'timeline' || viewMode === 'todo' || viewMode === 'deployment' || viewMode === 'storyline' || viewMode === 'impactAssessment') {
             setIsFisOpen(false);
             setIsDhvOpen(false);
             return;
        }

        if (viewMode === 'dhvWelcome') {
            setIsDhvOpen(true);
            setIsFisOpen(false);
            return;
        }
        
        if (viewMode === 'welcome' || viewMode === 'firPoc') {
            setIsFisOpen(true);
            setIsDhvOpen(false);
            return;
        }

        const activeDhvDomain = dhvDomains.find(d => d.view === viewMode);
        if (activeDhvDomain) {
            setIsDhvOpen(true);
            setIsFisOpen(false);
            setExpandedDhvDomains(prev => ({ ...prev, [activeDhvDomain.id]: true }));
            return;
        }
        
        let activeId = '';
        if (viewMode === 'mps') {
            activeId = selectedMpsId;
        } else if (viewMode === 'detail') {
            activeId = selectedId;
        } else {
            return;
        }

        if (!activeId) return;

        if (activeId.includes('-DHV-')) {
            setIsDhvOpen(true);
            setIsFisOpen(false);
            
            const targetBrs = brsData.find(b => b.id === activeId);
            const targetMps = mpsData.find(m => m.id === activeId);

            dhvDomains.forEach(dom => {
                let match = false;
                if (targetBrs && dom.brsFilter(targetBrs)) {
                    match = true;
                    setExpandedSubMenus(prev => ({ ...prev, [`${dom.id}-brs`]: true }));
                }
                if (targetMps && dom.mpsFilter(targetMps)) {
                    match = true;
                    setExpandedSubMenus(prev => ({ ...prev, [`${dom.id}-mps`]: true }));
                }

                if (match) {
                    setExpandedDhvDomains(prev => ({ ...prev, [dom.id]: true }));
                }
            });

        } else {
            setIsFisOpen(true);
            setIsDhvOpen(false);
            
            const domain = activeId.match(/BRS-FLEX-(\d)/)?.[1] || activeId.match(/MPS-FLEX-(\d)/)?.[1];
            if (domain) {
                 setOpenFisGroups(prev => prev.includes(domain) ? prev : [...prev, domain]);
            }
        }
    }, [selectedId, selectedMpsId, viewMode, brsData, mpsData]);

    const isPocOnly = loginType === 'poc';

    return (
        <nav style={styles.sidebar}>
            {/* 1. START */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '16px 16px 16px 20px',
                            borderBottom: '1px solid #ebecf0',
                            color: viewMode === 'general' ? '#0052cc' : '#172b4d',
                            backgroundColor: startHover ? '#f4f5f7' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setStartHover(true)}
                        onMouseLeave={() => setStartHover(false)}
                        onClick={() => setViewMode('general')}
                    >
                        <span style={{marginRight: '12px'}}>🏠</span>
                        <span style={{fontSize: '1.1rem', fontWeight: 700}}>Start</span>
                    </div>
                </div>
            )}

            {/* 2. TIDSLINJER */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '16px 16px 16px 20px',
                            borderBottom: '1px solid #ebecf0',
                            color: viewMode === 'timeline' ? '#0052cc' : '#172b4d',
                            backgroundColor: timelineHover ? '#f4f5f7' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setTimelineHover(true)}
                        onMouseLeave={() => setTimelineHover(false)}
                        onClick={() => setViewMode('timeline')}
                    >
                        <span style={{marginRight: '12px'}}>📅</span>
                        <span style={{fontSize: '1.1rem', fontWeight: 700}}>Tidslinjer</span>
                    </div>
                </div>
            )}

            {/* 3. STORYLINE */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '16px 16px 16px 20px',
                            borderBottom: '1px solid #ebecf0',
                            color: viewMode === 'storyline' ? '#0052cc' : '#172b4d',
                            backgroundColor: storylineHover ? '#f4f5f7' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setStorylineHover(true)}
                        onMouseLeave={() => setStorylineHover(false)}
                        onClick={() => setViewMode('storyline')}
                    >
                        <span style={{marginRight: '12px'}}>📖</span>
                        <span style={{fontSize: '1.1rem', fontWeight: 700}}>Storyline</span>
                    </div>
                </div>
            )}

            {/* 4. KONSEKVENSUTREDNING */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '16px 16px 16px 20px',
                            borderBottom: '1px solid #ebecf0',
                            color: viewMode === 'impactAssessment' ? '#0052cc' : '#172b4d',
                            backgroundColor: impactHover ? '#f4f5f7' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setImpactHover(true)}
                        onMouseLeave={() => setImpactHover(false)}
                        onClick={() => setViewMode('impactAssessment')}
                    >
                        <span style={{marginRight: '12px'}}>⚖️</span>
                        <span style={{fontSize: '1.1rem', fontWeight: 700}}>Konsekvensutredning</span>
                    </div>
                </div>
            )}

            {/* 5. DRIFTSÄTTNING */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '16px 16px 16px 20px',
                            borderBottom: '1px solid #ebecf0',
                            color: viewMode === 'deployment' ? '#0052cc' : '#172b4d',
                            backgroundColor: deploymentHover ? '#f4f5f7' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setDeploymentHover(true)}
                        onMouseLeave={() => setDeploymentHover(false)}
                        onClick={() => setViewMode('deployment')}
                    >
                        <span style={{marginRight: '12px'}}>🚀</span>
                        <span style={{fontSize: '1.1rem', fontWeight: 700}}>Driftsättning</span>
                    </div>
                </div>
            )}

            {/* 6. DHV GRUPP */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '16px 16px 16px 20px',
                            borderBottom: '1px solid #ebecf0',
                            color: isDhvOpen || viewMode === 'dhvWelcome' ? '#0052cc' : '#172b4d',
                            backgroundColor: viewMode === 'dhvWelcome' ? '#e6effc' : (dhvHover ? '#f4f5f7' : 'transparent'),
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setDhvHover(true)}
                        onMouseLeave={() => setDhvHover(false)}
                    >
                        <span style={styles.treeArrow} onClick={(e) => { e.stopPropagation(); setIsDhvOpen(!isDhvOpen); }}>
                            <span style={{fontSize: '0.9rem', display: 'inline-block', transition: 'transform 0.2s', transform: isDhvOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                        </span>
                        <span style={{...styles.treeLabel, fontSize: '1.1rem', fontWeight: 700}} onClick={() => { setIsDhvOpen(true); setViewMode('dhvWelcome'); }}>
                            DHV
                        </span>
                    </div>
                    
                    {isDhvOpen && (
                        <div style={{...styles.treeContent, paddingLeft: '8px'}}> 
                            <div style={styles.menuHeader}>ÖVERSIKT</div>
                            {dhvOverviewMenuItems.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => setViewMode(item.view)} 
                                    style={{...styles.treeItem, ...(viewMode === item.view ? styles.treeItemActive : {})}}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div style={styles.menuHeader}>DOKUMENTATION</div>
                            {dhvDomains.map(dom => {
                                const domainMps = mpsData.filter(dom.mpsFilter).sort((a,b) => a.id.localeCompare(b.id));
                                const domainBrs = brsData.filter(dom.brsFilter).sort((a,b) => {
                                    const numA = parseInt(a.id.replace(/\D/g,''));
                                    const numB = parseInt(b.id.replace(/\D/g,''));
                                    return numA - numB;
                                });
                                const isOpen = expandedDhvDomains[dom.id];
                                const mpsOpen = expandedSubMenus[`${dom.id}-mps`];
                                const brsOpen = expandedSubMenus[`${dom.id}-brs`];
                                const handleDomainClick = () => {
                                    if (dom.id === 'domain9') {
                                        handleSelectDomain('9');
                                    } else {
                                        setViewMode(dom.view);
                                    }
                                    setExpandedDhvDomains(prev => ({ ...prev, [dom.id]: true }));
                                };
                                return (
                                    <div key={dom.id} style={styles.treeGroup}>
                                        <div style={{...styles.treeHeader, paddingLeft: '4px'}}>
                                            <span style={styles.treeArrow} onClick={(e) => { e.stopPropagation(); toggleDhvDomain(dom.id); }}>
                                                <span style={{fontSize: '0.7rem', display: 'inline-block', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                                            </span>
                                            <span 
                                                style={{...styles.treeLabel, color: (viewMode === dom.view || (dom.id === 'domain9' && viewMode === 'domainLanding' && selectedDomain === '9')) ? '#0052cc' : '#42526e'}} 
                                                onClick={handleDomainClick}
                                            >
                                                {dom.title}
                                            </span>
                                        </div>
                                        {isOpen && (
                                            <div style={styles.treeContent}>
                                                {domainMps.length > 0 && (
                                                    <>
                                                        <div style={styles.treeSubHeaderContainer}>
                                                            <span style={styles.treeSubHeaderArrow} onClick={() => toggleSubMenu(`${dom.id}-mps`)}>
                                                                <span style={{fontSize: '0.6rem', display: 'inline-block', transition: 'transform 0.2s', transform: mpsOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                                                            </span>
                                                            <span style={styles.treeSubHeaderLabel} onClick={() => toggleSubMenu(`${dom.id}-mps`)}>MPS</span>
                                                        </div>
                                                        {mpsOpen && (
                                                            <div>
                                                                {domainMps.map(mps => (
                                                                    <button key={mps.id} onClick={() => handleSelectMPS(mps.id)} style={{...styles.treeItem, paddingLeft: '32px', ...(viewMode === 'mps' && selectedMpsId === mps.id ? styles.treeItemActive : {})}}>
                                                                        <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '2px' }}>{mps.id}</div>{mps.title}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                                {domainBrs.length > 0 && (
                                                    <>
                                                        <div style={styles.treeSubHeaderContainer}>
                                                            <span style={styles.treeSubHeaderArrow} onClick={() => toggleSubMenu(`${dom.id}-brs`)}>
                                                                <span style={{fontSize: '0.6rem', display: 'inline-block', transition: 'transform 0.2s', transform: brsOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                                                            </span>
                                                            <span style={styles.treeSubHeaderLabel} onClick={() => toggleSubMenu(`${dom.id}-brs`)}>BRS</span>
                                                        </div>
                                                        {brsOpen && (
                                                            <div>
                                                                {domainBrs.map(brs => (
                                                                    <button key={brs.id} onClick={() => handleSelectBRS(brs.id)} style={{...styles.treeItem, paddingLeft: '32px', ...(viewMode === 'detail' && selectedId === brs.id ? styles.treeItemActive : {})}}>
                                                                        <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '2px' }}>{brs.id}</div>{brs.title}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* 7. FIR GRUPP */}
            <div style={styles.treeGroup}>
                <div 
                    style={{
                        ...styles.treeHeader,
                        padding: '16px 16px 16px 20px',
                        borderBottom: '1px solid #ebecf0',
                        color: isFisOpen || viewMode === 'welcome' || viewMode === 'firPoc' ? '#0052cc' : '#172b4d',
                        backgroundColor: (viewMode === 'welcome' || viewMode === 'firPoc') ? '#e6effc' : (fisHover ? '#f4f5f7' : 'transparent'),
                        cursor: 'pointer'
                    }}
                    onMouseEnter={() => setFisHover(true)}
                    onMouseLeave={() => setFisHover(false)}
                >
                    <span style={styles.treeArrow} onClick={(e) => { e.stopPropagation(); setIsFisOpen(!isFisOpen); }}>
                        <span style={{fontSize: '0.9rem', display: 'inline-block', transition: 'transform 0.2s', transform: isFisOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>▶</span>
                    </span>
                    <span style={{...styles.treeLabel, fontSize: '1.1rem', fontWeight: 700}} onClick={() => { setIsFisOpen(true); setViewMode('welcome'); }}>
                        FIR
                    </span>
                </div>
                {isFisOpen && (
                    <div style={{...styles.treeContent, paddingLeft: '8px'}}> 
                        <div style={styles.menuHeader}>ÖVERSIKT</div>
                        {overviewMenuItems.map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setViewMode(item.view)} 
                                style={{...styles.treeItem, ...(viewMode === item.view ? styles.treeItemActive : {})}}
                            >
                                {item.label}
                            </button>
                        ))}
                        <div style={styles.menuHeader}>DOKUMENTATION</div>
                        {groups.map(group => {
                            const filteredBrs = brsData
                                .filter(item => group.brsPrefixes.some(prefix => item.id.startsWith(prefix)))
                                .sort(sortById);
                            const filteredMps = mpsData
                                .filter(item => group.mpsPrefixes.some(prefix => item.id.startsWith(prefix)))
                                .sort(sortById);
                            return (
                                <SidebarGroup 
                                    key={group.id}
                                    group={group}
                                    brsItems={filteredBrs}
                                    mpsItems={filteredMps}
                                    isOpen={openFisGroups.includes(group.id)}
                                    onToggle={() => toggleFisGroup(group.id)}
                                    selectedId={selectedId}
                                    selectedMpsId={selectedMpsId}
                                    selectedDomain={selectedDomain}
                                    onSelectBRS={handleSelectBRS}
                                    onSelectMPS={handleSelectMPS}
                                    onSelectConditions={handleSelectConditions}
                                    onSelectActorOverview={handleSelectActorOverview}
                                    onSelectBRSOverview={handleSelectBRSOverview}
                                    onSelectMPSOverview={handleSelectMPSOverview}
                                    onSelectDomain={handleSelectDomain}
                                    viewMode={viewMode}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 8. ATT GÖRA */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '16px 16px 16px 20px',
                            borderBottom: '1px solid #ebecf0',
                            color: viewMode === 'todo' ? '#0052cc' : '#172b4d',
                            backgroundColor: todoHover ? '#f4f5f7' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setTodoHover(true)}
                        onMouseLeave={() => setTodoHover(false)}
                        onClick={() => setViewMode('todo')}
                    >
                        <span style={{marginRight: '12px'}}>📋</span>
                        <span style={{fontSize: '1.1rem', fontWeight: 700}}>Att göra</span>
                    </div>
                </div>
            )}

            {/* 9. ADMIN */}
            {!isPocOnly && (
                <div style={styles.treeGroup}>
                    <div 
                        style={{
                            ...styles.treeHeader,
                            padding: '12px 16px',
                            ...(adminHover ? styles.treeHeaderHover : {})
                        }}
                        onClick={() => setIsAdminOpen(!isAdminOpen)}
                        onMouseEnter={() => setAdminHover(true)}
                        onMouseLeave={() => setAdminHover(false)}
                    >
                        <span style={{
                            ...styles.arrow,
                            transform: isAdminOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                        }}>▶</span>
                        Admin
                    </div>
                    {isAdminOpen && (
                        <div style={styles.treeContent}>
                            {adminMenuItems.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => setViewMode(item.view)} 
                                    style={{...styles.treeItem, fontWeight: 500, ...(viewMode === item.view ? styles.treeItemActive : {})}}
                                >
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <span style={{fontSize: '1.1rem', marginRight: '8px'}}>{item.id === 'status' ? '📊' : '🔢'}</span> {item.label.replace(/^.\s/, '')}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
