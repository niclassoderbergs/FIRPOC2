
import React from 'react';
import { styles } from './impact/styles';
import { RecommendationSection } from './impact/RecommendationSection';
import { BackgroundSection } from './impact/BackgroundSection';
import { AlternativesSection } from './impact/AlternativesSection';
import { NeedsSection } from './impact/NeedsSection';
import { IntegrationComplexitySection } from './impact/IntegrationComplexitySection';
import { GoalFulfillmentSection } from './impact/GoalFulfillmentSection';
import { ArchitectureAnalysisSection } from './impact/ArchitectureAnalysisSection';
import { EconomicAnalysisSection } from './impact/EconomicAnalysisSection';
import { ConclusionSection } from './impact/ConclusionSection';
import { Info } from 'lucide-react';

export const ImpactAssessmentPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Strategisk konsekvensutredning</h1>
      
      {/* Disclaimer / Alert box */}
      <div className="mb-8 border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg shadow-sm flex gap-4 items-start">
        <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="text-blue-900 font-bold text-lg mb-2">Utkast för diskussion</h3>
          <p className="text-blue-800 leading-relaxed text-sm md:text-base">
            Detta dokument är ett underlag framtaget för att bidra till arbetet med den framtida officiella konsekvensutredningen. 
            Innehållet representerar författarens egna analyser och slutsatser kring strategiska vägval för att möta regeringens uppdrag (KN2023/01385) och EU-förordningen NC DR.
          </p>
        </div>
      </div>

      {/* 1. Sammanfattning och Rekommendation */}
      <RecommendationSection />

      {/* 2. Bakgrund */}
      <BackgroundSection />

      {/* 3. Alternativ */}
      <AlternativesSection />

      {/* 4. Behovsanalys */}
      <NeedsSection />

      {/* 5. Analys av måluppfyllnad */}
      <GoalFulfillmentSection />

      {/* 6. Systemlandskap och integrationskomplexitet */}
      <IntegrationComplexitySection />

      {/* 7. Konsekvensanalys: Process & Data */}
      <ArchitectureAnalysisSection />

      {/* 8. Ekonomi */}
      <EconomicAnalysisSection />

      {/* 9. Slutsats */}
      <ConclusionSection />
    </div>
  );
};
