
import React, { useState } from 'react';
import { commonStyles } from './timeline/styles';
import { TimelineCategory } from './timeline/types';
import { LegacyView } from './timeline/LegacyView';
import { NcdrView } from './timeline/NcdrView';
import { DhvView } from './timeline/DhvView';
import { FisView } from './timeline/FisView';
import { RegulatoryView } from './timeline/RegulatoryView';

export const TimelinePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TimelineCategory>('legacy');

  return (
    <div style={commonStyles.container}>
      <h1 style={commonStyles.header}>Tidslinjer</h1>
      
      <div style={commonStyles.tabs}>
        <div 
            style={{...commonStyles.tab, ...(activeTab === 'legacy' ? commonStyles.activeTab : {})}} 
            onClick={() => setActiveTab('legacy')}
        >
            Historisk Elmarknadshubb
        </div>
        <div 
            style={{...commonStyles.tab, ...(activeTab === 'dhv' ? commonStyles.activeTab : {})}} 
            onClick={() => setActiveTab('dhv')}
        >
            DHV Implementering
        </div>
        <div 
            style={{...commonStyles.tab, ...(activeTab === 'fis' ? commonStyles.activeTab : {})}} 
            onClick={() => setActiveTab('fis')}
        >
            FIS Utveckling
        </div>
        <div 
            style={{...commonStyles.tab, ...(activeTab === 'ncdr' ? commonStyles.activeTab : {})}} 
            onClick={() => setActiveTab('ncdr')}
        >
            NC DR Implementering
        </div>
        <div 
            style={{...commonStyles.tab, ...(activeTab === 'regulatory' ? commonStyles.activeTab : {})}} 
            onClick={() => setActiveTab('regulatory')}
        >
            Regulatoriska förutsättningar
        </div>
      </div>

      {activeTab === 'legacy' && <LegacyView />}
      {activeTab === 'dhv' && <DhvView />}
      {activeTab === 'fis' && <FisView />}
      {activeTab === 'ncdr' && <NcdrView />}
      {activeTab === 'regulatory' && <RegulatoryView />}
    </div>
  );
};
