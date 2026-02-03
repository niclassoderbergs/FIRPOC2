import React from 'react';
import { Coins, TrendingDown, AlertOctagon, BarChart3, Workflow, ShieldAlert } from 'lucide-react';
import { styles } from './styles';
import { EconomicTable } from './EconomicTable';

export const EconomicAnalysisSection: React.FC = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>
        <Coins size={28} color="#b45309" /> 
        Ekonomisk analys och marknadens TCO
      </h2>
      <p style={styles.paragraph}>
        En korrekt ekonomisk analys måste inkludera <strong>hela marknadens samlade IT-kostnader</strong>. Det handlar om att värdera vinsten i att flytta funktionalitet från enskilda marknadsaktörer till en centraliserad infrastruktur, samt att värdera de dolda kostnaderna för de behov som inte tillgodoses i de decentraliserade modellerna.
      </p>

      <EconomicTable />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ ...styles.detailBox, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <div style={{ ...styles.detailTitle, color: '#166534' }}>
            <TrendingDown size={20} /> Marknadens samlade TCO-vinst
          </div>
          <p style={{ ...styles.cardText, color: '#166534' }}>
            Även om <strong>Alternativ 1</strong> kräver den högsta initiala centrala investeringen (CAPEX), ger det marknadens lägsta totala livscykelkostnad (TCO). Genom att flytta funktionalitet och komplexitet från hundratals enskilda aktörer till en gemensam kärna, sänks branschens samlade utgifter med <strong>hundratals miljoner</strong> över en tioårsperiod.
          </p>
        </div>

        <div style={{ ...styles.detailBox, backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
          <div style={{ ...styles.detailTitle, color: '#991b1b' }}>
            <AlertOctagon size={20} /> Investering i särlösningar
          </div>
          <p style={{ ...styles.cardText, color: '#991b1b' }}>
            Att välja Alternativ 2 eller 3 för att spara central CAPEX är kortsiktigt. Det tvingar marknadens parter att fortsätta underhålla en föråldrad och fragmenterad struktur, vilket skapar en permanent "innovationsskatt". Att bygga en infrastruktur som inte löser retail-marknadens rörlighetsbehov (ME1) är en ineffektiv användning av samhällets resurser.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
         <div style={{ ...styles.detailBox, backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
            <div style={{ ...styles.detailTitle, fontSize: '0.9rem' }}><Workflow size={18} color="#0052cc" /> Skalbar nationell förmåga</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0052cc', marginBottom: '4px' }}>Centraliserad logik</div>
            <p style={{ fontSize: '0.75rem', color: '#666' }}>Investering i en plattform som växer med behoven. Varje ny reform blir billigare än den föregående.</p>
         </div>
         <div style={{ ...styles.detailBox, backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
            <div style={{ ...styles.detailTitle, fontSize: '0.9rem' }}><ShieldAlert size={18} color="#bf2600" /> Distribuerad skuld</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#bf2600', marginBottom: '4px' }}>Splittrat ansvar</div>
            <p style={{ fontSize: '0.75rem', color: '#666' }}>Decentralisering låser fast branschen i ett integrations beroende som är både osäkert och kostnadsdrivande.</p>
         </div>
      </div>

      <div style={{ ...styles.warningBox, marginTop: '24px', backgroundColor: '#f1f5f9', borderColor: '#475569', color: '#1e293b' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <BarChart3 size={20} color="#475569" style={{ flexShrink: 0 }} />
          <div>
            <strong>Samhällsekonomisk slutsats:</strong> 
            <p style={{ marginTop: '8px' }}>
              Alternativ 1 är det enda vägvalet som skapar en <strong>skalbar nationell förmåga</strong> till lägsta possible samhällskostnad. Genom att integrera hantering av mätvärden, tariffer och resurser in i en gemensam kärna uppnås en systemeffektivitet som de andra alternativen tekniskt inte kan matcha.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};