import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  Zap, 
  Lock, 
  TrendingUp, 
  Sparkles, 
  Users, 
  Globe,
  Settings2
} from 'lucide-react';
import { styles } from './styles';

export const ArchitectureAnalysisSection: React.FC = () => {
  const iconBoxStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>
        <Settings2 size={28} color="#0052cc" /> 
        Centraliserade förmågor i Alternativ 1
      </h2>
      <p style={styles.paragraph}>
        Genom att välja <strong>Alternativ 1</strong> skapas ett nationellt nav där data och logik samverkar. Detta eliminerar behovet av att koordinera hundratals lokala IT-projekt vid varje marknadsförändring och skapar en stabil plattform för energiomställningen.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Förmåga 1: Masterdata */}
        <div style={iconBoxStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Database size={24} color="#0052cc" />
            <strong style={{ fontSize: '1rem', color: '#1e293b' }}>Enhetlig Masterdata</strong>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
            Centraliserar information om mätpunkter (MP) och tekniska resurser (CU). Säkerställer att alla aktörer agerar utifrån samma "Golden Record", vilket minskar fel i fakturering och avräkning.
          </p>
        </div>

        {/* Förmåga 2: Marknadslogik */}
        <div style={iconBoxStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Zap size={24} color="#d97706" />
            <strong style={{ fontSize: '1rem', color: '#1e293b' }}>Operativ Marknadsmotor</strong>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
            Hanterar leverantörsbyten (24h) och validering av flexibilitetsbud i realtid. Logiken exekveras centralt, vilket ger omedelbar respons utan beroende av lokala nätägares systemtillgänglighet.
          </p>
        </div>

        {/* Förmåga 3: Beräkning & Verifiering */}
        <div style={iconBoxStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <TrendingUp size={24} color="#059669" />
            <strong style={{ fontSize: '1rem', color: '#1e293b' }}>Automatiserad Verifiering</strong>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
            Central beräkning av Baseline och levererad volym. Skapar en transparent och icke-diskriminerande standard för hur flexibilitet värderas ekonomiskt.
          </p>
        </div>

        {/* Förmåga 5: Säkerhet & Cyberförsvar */}
        <div style={iconBoxStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Lock size={24} color="#dc2626" />
            <strong style={{ fontSize: '1rem', color: '#1e293b' }}>Koncentrerat Cyberförsvar</strong>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
            Istället för 170 spridda attackytor skapas ett härdat "fort". Möjliggör statlig kontroll och övervakning av kritisk infrastruktur enligt NIS 2.
          </p>
        </div>
      </div>

      {/* Kontextuell Analys: Varför Sverige är annorlunda */}
      <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
        <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-600" />
          Kontextuell Analys: Varför Sverige är annorlunda
        </h4>
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Alternativ 2 (Hubb-modellen/Växel) är en tekniskt sund arkitektur som fungerar väl i länder med 
            hög marknadskoncentration. 
            Där kan man kostnadseffektivt säkra realtidsprestanda och dygnet-runt-beredskap hos ett fåtal motparter.
          </p>
          <p className="font-bold text-slate-900">
            Sveriges unika utmaning är fragmenteringen.
          </p>
          <p>
            Vi har över 170 nätägare, varav många är mindre kommunala bolag. Att kräva att <em>alla</em> dessa 
            ska upprätthålla samma realtidsprestanda, IT-jour och säkerhetsnivå som en storbank (vilket Alt 2 kräver) 
            skapar en oproportionerlig systemrisk och en kostnadsexplosion för lokala elnätskunder som inte finns i mer konsoliderade marknader. 
          </p>
          <p className="italic bg-white p-3 rounded border border-slate-100">
            Slutsats: En decentraliserad växel vilar på sin svagaste länk. I en svensk kontext med 170 länkar blir risken för blockering av tidskritiska processer (såsom 24h-byten eller flex-bud) statistiskt oundviklig.
          </p>
        </div>
      </div>

      <div style={{ border: '1px solid #cce4ff', padding: '24px', borderRadius: '12px', backgroundColor: '#f0f7ff', marginTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <Sparkles size={24} color="#0052cc" style={{ marginTop: '4px' }} />
          <div>
            {/* Fix: removed incorrect property 'fontBold' which does not exist in CSS properties */}
            <p style={{ ...styles.cardText, color: '#0747a6', marginBottom: '8px', fontSize: '1rem', fontWeight: 700 }}>
              Strategisk flexibilitet för framtida förändringar
            </p>
            <p style={{ ...styles.cardText, fontSize: '0.95rem', color: '#0747a6', lineHeight: '1.6' }}>
              Den största fördelen med Alternativ 1 är dess förmåga att hantera <strong>ännu okända framtida behov</strong>. Genom att ha mätvärden, avtal och resurser på en gemensam bottenplatta kan nya politiska reformer eller tekniska innovationer (t.ex. avancerad energidelning) rullas ut som centrala uppdateringar. Det sänker kostnaden för framtida lagändringar med miljardbelopp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};