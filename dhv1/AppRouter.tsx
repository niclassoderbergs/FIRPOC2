
import React, { useMemo } from 'react';
import { ViewMode } from './menuConfig';
import { BRSData, MPSData, DocStatus, Revision } from '../types';
import { styles } from './styles';

// Pages
import { StatusPage } from '../StatusPage';
import { WelcomePage } from '../WelcomePage';
import { TimelinePage } from '../TimelinePage';
import { DeploymentPage } from '../DeploymentPage'; 
import { TodoPage } from '../TodoPage';
import { GeneralWelcomePage } from '../GeneralWelcomePage';
import { DhvWelcomePage } from '../DhvWelcomePage';
import { DhvDomain1Page } from '../DhvDomain1Page';
import { DhvDomain2Page } from '../DhvDomain2Page';
import { DhvDomain6Page } from '../DhvDomain6Page';
import { DhvDomain7Page } from '../DhvDomain7Page';
import { DhvDomain9Page } from '../DhvDomain9Page';
import { DomainLandingPage } from '../DomainLandingPage';
import { DomainBRSOverviewPage } from '../DomainBRSOverviewPage';
import { DomainMPSOverviewPage } from '../DomainMPSOverviewPage';
import { DomainActorOverviewPage } from '../DomainActorOverviewPage';
import { GlobalActorOverviewPage } from '../GlobalActorOverviewPage';
import { DomainOverviewPage } from '../DomainOverviewPage';
import { DomainConditionsPage } from '../DomainConditionsPage';
import { ProceduresPage } from '../ProceduresPage';
import { InformationModelPage } from '../InformationModelPage';
import { RenumberingProposalPage } from '../RenumberingProposalPage';
import { FirGuiPocPage } from '../FirGuiPocPage';
import { PurposeSection } from '../PurposeSection';
import { MPSSection } from '../MPSSection';
import { StorylinePage } from '../StorylinePage';
import { ImpactAssessmentPage } from '../ImpactAssessmentPage';
import { JWGProcedure1 } from '../JWGProcedure1';
import { JWGProcedure2 } from '../JWGProcedure2';
import { JWGProcedure3 } from '../JWGProcedure3';
import { JWGProcedure4 } from '../JWGProcedure4';
import { JWGProcedure5 } from '../JWGProcedure5';
import { JWGProcedure6 } from '../JWGProcedure6';
import { JWGProcedure7 } from '../JWGProcedure7';
import { JWGProcedure8 } from '../JWGProcedure8';
import { JWGProcedure9 } from '../JWGProcedure9';
import { JWGProcedure10 } from '../JWGProcedure10';
import { JWGProcedure11 } from '../JWGProcedure11';
import { JWGProcedure12 } from '../JWGProcedure12';
import { JWGProcedure13 } from '../JWGProcedure13';
import { JWGProcedure14 } from '../JWGProcedure14';
import { JWGProcedure15 } from '../JWGProcedure15';
import { JWGProcedure16 } from '../JWGProcedure16';
import { JWGProcedure17 } from '../JWGProcedure17';
import { JWGProcedure18 } from '../JWGProcedure18';
import { JWGProcedure19 } from '../JWGProcedure19';
import { JWGProcedure20 } from '../JWGProcedure20';
import { JWGProcedure21 } from '../JWGProcedure21';
import { JWGProcedure22 } from '../JWGProcedure22';
import { JWGProcedure23 } from '../JWGProcedure23';
import { JWGProcedure24 } from '../JWGProcedure24';
import { JWGProcedure25 } from '../JWGProcedure25';
import { JWGProcedure26 } from '../JWGProcedure26';
import { JWGProcedure27 } from '../JWGProcedure27';
import { JWGProcedure28 } from '../JWGProcedure28';
import { JWGProcedure29 } from '../JWGProcedure29';
import { JWGProcedure30 } from '../JWGProcedure30';
import { JWGProcedure31 } from '../JWGProcedure31';
import { JWGProcedure32 } from '../JWGProcedure32';
import { JWGProcedure33 } from '../JWGProcedure33';
import { JWGProcedure34 } from '../JWGProcedure34';

// Types
import { groups } from '../index'; 

interface EditableTableProps {
  data: any[];
  columns: { key: string; label: string; width?: string; type?: 'text' | 'textarea' }[];
  isEditing: boolean;
  onUpdate: (index: number, key: string, value: string) => void;
  onAdd?: () => void;
  onRemove?: (index: number) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({ data, columns, isEditing, onUpdate, onAdd, onRemove }) => {
  return (
    <div style={{width: '100%', marginBottom: '24px'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', border: '1px solid #dfe1e6'}}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{backgroundColor: '#f4f5f7', color: '#172b4d', padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #dfe1e6', width: col.width}}>{col.label}</th>
            ))}
            {isEditing && <th style={{width: '40px', backgroundColor: '#f4f5f7', borderBottom: '2px solid #dfe1e6'}}></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
             <tr key={idx} style={{backgroundColor: idx % 2 === 0 ? 'white' : '#fafbfc'}}>
               {columns.map(col => (
                 <td key={col.key} style={{padding: '10px 12px', borderBottom: '1px solid #dfe1e6', verticalAlign: 'top', color: '#172b4d'}}>
                   {isEditing ? (
                     col.type === 'textarea' ? (
                       <textarea 
                          style={{width: '100%', border: '1px solid #0052cc', borderRadius: '4px', padding: '4px', fontFamily: 'inherit', fontSize: 'inherit', resize: 'vertical', minHeight: '60px'}}
                          value={row[col.key]}
                          onChange={(e) => onUpdate(idx, col.key, e.target.value)}
                       />
                     ) : (
                       <input 
                          style={{width: '100%', border: '1px solid #0052cc', borderRadius: '4px', padding: '4px', fontFamily: 'inherit', fontSize: 'inherit'}}
                          value={row[col.key]}
                          onChange={(e) => onUpdate(idx, col.key, e.target.value)}
                       />
                     )
                   ) : (
                     row[col.key]
                   )}
                 </td>
               ))}
               {isEditing && (
                 <td style={{padding: '10px 12px', borderBottom: '1px solid #dfe1e6', textAlign: 'center'}}>
                    <button 
                      onClick={() => onRemove && onRemove(idx)}
                      style={{color: '#bf2600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700}}
                    >
                      ×
                    </button>
                 </td>
               )}
             </tr>
          ))}
        </tbody>
      </table>
      {isEditing && onAdd && (
        <button 
          onClick={onAdd}
          style={{marginTop: '8px', padding: '6px 12px', backgroundColor: '#e6effc', color: '#0052cc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'}}
        >
          + Add Row
        </button>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status?: DocStatus }) => {
  let bgColor = '#e3fcef'; // Default Green (Active)
  let color = '#006644';
  let label = status || 'ACTIVE';

  if (status === 'LEGACY') {
    bgColor = '#f4f5f7'; // Gray
    color = '#505f79';
  } else if (status === 'DRAFT') {
    bgColor = '#fff0b3'; // Yellow
    color = '#172b4d';
  } else if (status === 'Legacy - Implemented') {
    bgColor = '#e3fcef'; // Green
    color = '#006644';
  } else if (status === 'Legacy - Partially implemented') {
    bgColor = '#fff0b3'; // Yellow
    color = '#172b4d';
  } else if (status === 'Legacy - Not implemented') {
    bgColor = '#ffebe6'; // Red
    color = '#bf2600';
  }

  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 700,
      backgroundColor: bgColor,
      color: color,
      marginLeft: '12px',
      textTransform: 'uppercase',
      verticalAlign: 'middle',
      border: `1px solid ${color}20` 
    }}>
      {label}
    </span>
  );
};

const TagBadge: React.FC<{ tag: string }> = ({ tag }) => {
    let label = tag;
    let bgColor = '#eae6ff';
    let color = '#403294';
    let border = '#c0b6f2';

    if (tag === 'NON_DHV_2026') {
        label = 'Ej DHV 2026';
        bgColor = '#ffebe6';
        color = '#bf2600';
        border = '#ffbdad';
    }

    return (
        <span style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: bgColor,
            color: color,
            marginLeft: '8px',
            textTransform: 'uppercase',
            verticalAlign: 'middle',
            border: `1px solid ${border}`
        }}>
            {label}
        </span>
    );
};

const HistoryTable = ({ history }: { history?: Revision[] }) => {
  if (!history || history.length === 0) return null;

  return (
    <div style={{ marginTop: '48px', borderTop: '2px solid #ebecf0', paddingTop: '24px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#172b4d', marginBottom: '16px' }}>Revisionshistorik</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f5f7', color: '#42526e' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6', width: '100px' }}>Version</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6', width: '120px' }}>Datum</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6', width: '150px' }}>Författare</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #dfe1e6' }}>Beskrivning</th>
          </tr>
        </thead>
        <tbody>
          {history.map((rev, idx) => (
            <tr key={idx}>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0', fontWeight: 600 }}>{rev.version}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0', color: '#6b778c' }}>{rev.date}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0' }}>{rev.author}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #ebecf0' }}>{rev.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const navBtnStyle = {
    padding: '8px 16px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#0052cc',
    fontWeight: 600,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
};

interface AppRouterProps {
    viewMode: ViewMode;
    brsData: BRSData[];
    mpsData: MPSData[];
    selectedId: string;
    selectedMpsId: string;
    selectedDomain: string;
    selectedProcedureId: number | null;
    isEditing: boolean;
    setViewMode: (v: ViewMode) => void;
    handleSelectBRS: (id: string) => void;
    handleSelectMPS: (id: string) => void;
    handleSelectDomain: (id: string) => void;
    handleNavigateToProcedure: (id: number) => void;
    handleUpdateBRS: (data: BRSData) => void;
    updateArrayItem: (section: 'preConditions' | 'businessRules' | 'process', index: number, key: string, value: string) => void;
    handleAddArrayItem: (section: 'preConditions' | 'businessRules' | 'process') => void;
    handleRemoveArrayItem: (section: 'preConditions' | 'businessRules' | 'process', index: number) => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({
    viewMode, brsData, mpsData, selectedId, selectedMpsId, selectedDomain, selectedProcedureId, isEditing,
    setViewMode, handleSelectBRS, handleSelectMPS, handleSelectDomain, handleNavigateToProcedure, handleUpdateBRS,
    updateArrayItem, handleAddArrayItem, handleRemoveArrayItem
}) => {

    const activeBRS = brsData.find(b => b.id === selectedId) || brsData[0];
    const activeMPS = mpsData.find(m => m.id === selectedMpsId);
    
    const { prevBRS, nextBRS } = useMemo(() => {
        if (viewMode !== 'detail') return { prevBRS: null, nextBRS: null };
        const idx = brsData.findIndex(b => b.id === selectedId);
        return {
            prevBRS: idx > 0 ? brsData[idx - 1] : null,
            nextBRS: idx < brsData.length - 1 ? brsData[idx + 1] : null
        };
    }, [brsData, selectedId, viewMode]);

    const { prevMPS, nextMPS } = useMemo(() => {
        if (viewMode !== 'mps') return { prevMPS: null, nextMPS: null };
        const sortedMPS = [...mpsData].sort((a, b) => a.id.localeCompare(b.id));
        const idx = sortedMPS.findIndex(m => m.id === selectedMpsId);
        return {
            prevMPS: idx > 0 ? sortedMPS[idx - 1] : null,
            nextMPS: idx < sortedMPS.length - 1 ? sortedMPS[idx + 1] : null
        };
    }, [mpsData, selectedMpsId, viewMode]);
    
    const startConditionsData = activeBRS.preConditions.map(c => typeof c === 'string' ? { id: '', description: c } : c);
    const acceptedData = (Array.isArray(activeBRS.postConditions.accepted) ? activeBRS.postConditions.accepted : [activeBRS.postConditions.accepted]).map((c: any) => typeof c === 'string' ? { id: '', description: c } : c);
    const flowData = activeBRS.process.map(c => typeof c === 'string' ? { id: '', description: c } : c);

    const renderProcedure = () => {
        switch(selectedProcedureId) {
            case 1: return <JWGProcedure1 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 2: return <JWGProcedure2 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 3: return <JWGProcedure3 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 4: return <JWGProcedure4 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 5: return <JWGProcedure5 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 6: return <JWGProcedure6 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 7: return <JWGProcedure7 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 8: return <JWGProcedure8 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 9: return <JWGProcedure9 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 10: return <JWGProcedure10 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 11: return <JWGProcedure11 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 12: return <JWGProcedure12 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 13: return <JWGProcedure13 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 14: return <JWGProcedure14 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 15: return <JWGProcedure15 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 16: return <JWGProcedure16 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 17: return <JWGProcedure17 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 18: return <JWGProcedure18 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 19: return <JWGProcedure19 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 20: return <JWGProcedure20 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 21: return <JWGProcedure21 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 22: return <JWGProcedure22 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 23: return <JWGProcedure23 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 24: return <JWGProcedure24 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 25: return <JWGProcedure25 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 26: return <JWGProcedure26 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 27: return <JWGProcedure27 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 28: return <JWGProcedure28 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 29: return <JWGProcedure29 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 30: return <JWGProcedure30 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 31: return <JWGProcedure31 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 32: return <JWGProcedure32 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 33: return <JWGProcedure33 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            case 34: return <JWGProcedure34 onBack={() => setViewMode('procedures')} onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
            default: return <div>Procedure not found</div>;
        }
    };
    
    if (viewMode === 'general') {
        return <GeneralWelcomePage onNavigate={(view) => setViewMode(view as ViewMode)} />;
    }

    if (viewMode === 'timeline') {
        return <TimelinePage />;
    }

    if (viewMode === 'deployment') {
        return <DeploymentPage />;
    }

    if (viewMode === 'todo') {
        return <TodoPage />;
    }

    if (viewMode === 'storyline') {
        return <StorylinePage />;
    }

    if (viewMode === 'impactAssessment') {
        return <ImpactAssessmentPage />;
    }

    if (viewMode === 'firPoc') {
        return <FirGuiPocPage />;
    }

    if (viewMode === 'domainLanding') {
        return (
            <DomainLandingPage 
                domainId={selectedDomain}
                brsData={brsData}
                mpsData={mpsData}
                onNavigateToBRS={handleSelectBRS}
                onNavigateToMPS={handleSelectMPS}
            />
        );
    }

    if (viewMode === 'globalActorOverview') {
        return (
            <GlobalActorOverviewPage 
                key="fir-actor-overview"
                brsData={brsData} 
                onNavigateToBRS={handleSelectBRS} 
                defaultFilter="FIR"
            />
        );
    }

    if (viewMode === 'dhvActorOverview') {
        return (
            <GlobalActorOverviewPage 
                key="dhv-actor-overview"
                brsData={brsData} 
                onNavigateToBRS={handleSelectBRS} 
                defaultFilter="DHV"
            />
        );
    }

    if (viewMode === 'domainOverview') {
        return (
            <DomainOverviewPage 
                onNavigateToDomain={handleSelectDomain} 
            />
        );
    }

    if (viewMode === 'brsOverview') {
        return (
            <DomainBRSOverviewPage 
                brsData={brsData}
                domainId={selectedDomain}
                onNavigateToBRS={handleSelectBRS}
            />
        );
    }

    if (viewMode === 'mpsOverview') {
        return (
            <DomainMPSOverviewPage 
                mpsData={mpsData}
                domainId={selectedDomain}
                onNavigateToMPS={handleSelectMPS}
            />
        );
    }

    if (viewMode === 'actorOverview') {
        return (
            <DomainActorOverviewPage 
                brsData={brsData}
                mpsData={mpsData}
                domainId={selectedDomain}
                onNavigateToBRS={handleSelectBRS}
            />
        );
    }

    if (viewMode === 'conditions') {
        return (
            <DomainConditionsPage 
                brsData={brsData}
                mpsData={mpsData}
                domainId={selectedDomain}
                domainTitle={groups.find(g => g.id === selectedDomain)?.title || `Domän ${selectedDomain}`}
                onNavigateToBRS={handleSelectBRS}
                onNavigateToMPS={handleSelectMPS}
                onNavigateToProcedure={handleNavigateToProcedure}
            />
        );
    }

    if (viewMode === 'welcome') {
        return <WelcomePage onNavigate={(view) => setViewMode(view as ViewMode)} />;
    }

    if (viewMode === 'dhvWelcome') {
        return <DhvWelcomePage onNavigate={(view) => setViewMode(view as ViewMode)} />;
    }

    if (viewMode === 'dhvDomain1') {
        return <DhvDomain1Page />;
    }
    
    if (viewMode === 'dhvDomain2') {
        return <DhvDomain2Page />;
    }

    if (viewMode === 'dhvDomain6') {
        return <DhvDomain6Page />;
    }

    if (viewMode === 'dhvDomain7') {
        return <DhvDomain7Page />;
    }

    if (viewMode === 'dhvDomain9') {
        return <DhvDomain9Page />;
    }

    if (viewMode === 'procedures') {
        return <ProceduresPage onNavigateToBRS={handleSelectBRS} onNavigateToProcedure={handleNavigateToProcedure} />;
    }

    if (viewMode === 'procedureDetail') {
        return renderProcedure();
    }

    if (viewMode === 'infoModel') {
        return <InformationModelPage onNavigateToBRS={handleSelectBRS} />;
    }

    if (viewMode === 'renumbering') {
        return <RenumberingProposalPage onBack={() => setViewMode('welcome')} brsList={brsData} />;
    }

    if (viewMode === 'detail') {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
                    <div>
                        {prevBRS && (
                            <button 
                                style={navBtnStyle}
                                onClick={() => handleSelectBRS(prevBRS.id)}
                                title={prevBRS.title}
                            >
                                <span>←</span> {prevBRS.id}
                            </button>
                        )}
                    </div>
                    <div>
                        {nextBRS && (
                            <button 
                                style={navBtnStyle}
                                onClick={() => handleSelectBRS(nextBRS.id)}
                                title={nextBRS.title}
                            >
                                {nextBRS.id} <span>→</span>
                            </button>
                        )}
                    </div>
                </div>

                <div>
                <div style={styles.docId}>
                    {activeBRS.id} 
                    <StatusBadge status={activeBRS.status} />
                    {activeBRS.tags?.map(tag => (
                        <TagBadge key={tag} tag={tag} />
                    ))}
                </div>
                {isEditing ? (
                    <input 
                      style={{...styles.input, fontSize: '2rem', fontWeight: 700, marginBottom: '24px'}}
                      value={activeBRS.title}
                      onChange={(e) => handleUpdateBRS({...activeBRS, title: e.target.value})}
                    />
                ) : (
                    <h1 style={styles.docTitle}>{activeBRS.title}</h1>
                )}
              </div>
              
              <PurposeSection activeBRS={activeBRS} styles={styles} isEditing={isEditing} onUpdate={handleUpdateBRS} />
              
              <section>
                <h2 style={styles.sectionHeader}>Constraints</h2>
                <h3 style={styles.subHeader}>Start conditions</h3>
                <EditableTable 
                  data={startConditionsData}
                  columns={[{ key: 'id', label: 'Rule #', width: '20%' }, { key: 'description', label: 'Description', type: 'textarea' }]}
                  isEditing={isEditing}
                  onUpdate={(idx, key, val) => updateArrayItem('preConditions', idx, key, val)}
                  onAdd={() => handleAddArrayItem('preConditions')}
                  onRemove={(idx) => handleRemoveArrayItem('preConditions', idx)}
                />
                
                <h3 style={styles.subHeader}>Stop conditions</h3>
                <h4 style={styles.subSubHeader}>If accepted</h4>
                <EditableTable 
                  data={acceptedData}
                  columns={[{ key: 'id', label: 'Rule #', width: '20%' }, { key: 'description', label: 'Description', type: 'textarea' }]}
                  isEditing={isEditing}
                  onUpdate={(idx, key, val) => {}}
                  onAdd={() => {}}
                  onRemove={(idx) => {}}
                />
              </section>

              <section>
                <h2 style={styles.sectionHeader}>Business rules</h2>
                <EditableTable 
                  data={activeBRS.businessRules}
                  columns={[{ key: 'id', label: 'Rule #', width: '15%' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'errorCode', label: 'Error message', width: '25%' }]}
                  isEditing={isEditing}
                  onUpdate={(idx, key, val) => updateArrayItem('businessRules', idx, key, val)}
                  onAdd={() => handleAddArrayItem('businessRules')}
                  onRemove={(idx) => handleRemoveArrayItem('businessRules', idx)}
                />
              </section>

              <section>
                <h2 style={styles.sectionHeader}>Flows</h2>
                <h3 style={styles.subHeader}>Normal flow</h3>
                <EditableTable 
                  data={flowData}
                  columns={[{ key: 'id', label: 'Rule #', width: '15%' }, { key: 'description', label: 'Description', type: 'textarea' }]}
                  isEditing={isEditing}
                  onUpdate={(idx, key, val) => updateArrayItem('process', idx, key, val)}
                  onAdd={() => handleAddArrayItem('process')}
                  onRemove={(idx) => handleRemoveArrayItem('process', idx)}
                />
              </section>
              
              {activeBRS.infoObjects && activeBRS.infoObjects.length > 0 && (
                <section>
                  <h2 style={styles.sectionHeader}>Content in information flow</h2>
                  {activeBRS.infoObjects.map((io, idx) => (
                    <div key={idx} style={{ marginBottom: '24px' }}>
                      <h3 style={styles.subHeader}>Informationsobjekt – {io.title}</h3>
                      <EditableTable 
                         data={io.attributes}
                         columns={[{ key: 'attribute', label: 'Attribute', width: '25%' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'article', label: 'Ref', width: '20%' }]}
                         isEditing={isEditing}
                         onUpdate={() => {}}
                      />
                    </div>
                  ))}
                </section>
              )}

              <HistoryTable history={activeBRS.history} />
            </div>
        );
    }

    if (viewMode === 'mps' && activeMPS) {
        return (
            <MPSSection 
                activeMPS={activeMPS} 
                brsList={brsData} 
                styles={styles} 
                onNavigateToBRS={handleSelectBRS}
                onNavigateToProcedure={handleNavigateToProcedure}
                onNavigateToMPS={handleSelectMPS}
                prevMPS={prevMPS || undefined}
                nextMPS={nextMPS || undefined}
            />
        );
    }

    if (viewMode === 'status') {
        return (
            <StatusPage 
                data={brsData} 
                mpsData={mpsData}
                onSelectBRS={handleSelectBRS} 
                onSelectMPS={handleSelectMPS}
            />
        );
    }

    return <div>Sidan hittades inte</div>;
};