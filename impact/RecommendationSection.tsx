import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { styles } from './styles';

export const RecommendationSection: React.FC = () => (
  <div style={styles.recommendationBox}>
    <div style={styles.recommendationTitle}>
      <CheckCircle2 size={24} /> Sammanfattning och Rekommendation
    </div>
    <p style={{...styles.paragraph, margin: 0, fontWeight: 600, color: '#006644'}}>
      Analysen visar att Alternativ 1 (Centralt datahanteringsverktyg med centraliserade funktioner och lagring av information) framstår som det mest fördelaktiga alternativet för att långsiktigt minimera samhällskostnaden, säkra totalförsvarets intressen och skapa en likvärdig marknad. Utredningen förordar att arbetet fortskrider enligt denna inriktning.
    </p>
  </div>
);