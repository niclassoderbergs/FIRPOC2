import React from 'react';
import { Scale } from 'lucide-react';
import { styles } from './styles';
import { NeedsRegulatory } from './NeedsRegulatory';
import { NeedsMarketEfficiency } from './NeedsMarketEfficiency';
import { NeedsCustomer } from './NeedsCustomer';
import { NeedsSystemUtility } from './NeedsSystemUtility';
import { NeedsPhase2And3 } from './NeedsPhase2And3';

export const NeedsSection: React.FC = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>
        <Scale size={28} color="#0052cc" /> 
        Marknadens behov och kravbild
      </h2>
      <p style={styles.paragraph}>
        För att möta de utmaningar som energiomställningen och nya EU-regleringar innebär, krävs en infrastruktur som adresserar följande kritiska behovsområden:
      </p>

      <NeedsRegulatory />
      <NeedsMarketEfficiency />
      <NeedsCustomer />
      <NeedsSystemUtility />
      <NeedsPhase2And3 />
    </section>
  );
};