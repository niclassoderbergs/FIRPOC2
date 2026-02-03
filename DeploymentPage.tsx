import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  Database, 
  Activity, 
  CheckCircle2, 
  Settings,
  Layers,
  Minus,
  Plus,
  Info,
  ChevronRight,
  ClipboardList,
  Users,
  FileText,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Clock
} from 'lucide-react';

// --- Types ---
type ItemCategory = 'Process' | 'Information';
type SystemType = 'DHV' | 'FIS';
type PhaseStatus = 'Critical' | 'Planned' | 'Vision';

interface RoadmapItem {
  id: string;
  name: string;
  category: ItemCategory;
  system: SystemType;
  description: string;
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  status: PhaseStatus;
  items: RoadmapItem[];
}

interface ImpactItem {
  text: string;
}

interface ActorImpact {
  name: string;
  color: string;
  removed: ImpactItem[];
  added: ImpactItem[];
}

interface ImpactPhase {
  id: string;
  title: string;
  subtitle: string;
  status: PhaseStatus;
  impacts: ActorImpact[];
}

// --- Data: Roadmap ---
const roadmapData: Phase[] = [
  {
    id: 'phase1',
    title: 'Fas 1: Grundläggande DHV & Flexregister (Prio 1)',
    subtitle: 'Kritisk funktionalitet för Go-Live. Masterdata, mätvärden och grundläggande flexibilitet.',
    status: 'Critical',
    items: [
      { id: 'dhv1_p1', system: 'DHV', category: 'Process', name: 'Mätpunktshantering', description: 'Registrering och uppdatering av mätpunkter (MP)' },
      { id: 'dhv1_p2', system: 'DHV', category: 'Process', name: 'Mätvärdeshantering (MP)', description: 'Insamling och validering av mätvärden från nätägare' },
      { id: 'dhv1_p3', system: 'DHV', category: 'Process', name: 'Leverantörsbyten & flytt', description: 'Hantering av in/utflytt och byte av elleverantör' },
      { id: 'dhv1_p4', system: 'DHV', category: 'Process', name: 'Nätavtalshantering', description: 'Registrering av nätavtal (Grid Contract)' },
      { id: 'dhv1_p5', system: 'DHV', category: 'Process', name: 'Nätavräkning (aggregerad)', description: 'Aggregering av energivolymer för balansavräkning' },
      { id: 'dhv1_p6', system: 'DHV', category: 'Process', name: 'Nättariffer', description: 'Registrering och distribution av tariffer' },
      { id: 'dhv1_p7', system: 'DHV', category: 'Process', name: 'Mina Sidor - Samtycke', description: 'Samtycke till energitjänsteföretag och inför leverantörsbyten' },
      { id: 'dhv1_i1', system: 'DHV', category: 'Information', name: 'Aktörsregister', description: 'Register över marknadens aktörer' },
      { id: 'dhv1_i2', system: 'DHV', category: 'Information', name: 'Områdesdefinitioner', description: 'Nätområden och Elområden' },
      { id: 'dhv1_i3', system: 'DHV', category: 'Information', name: 'Mätpunkter', description: 'Teknisk anläggningsdata' },
      { id: 'dhv1_i4', system: 'DHV', category: 'Information', name: 'Mätvärden', description: 'Tidsserier för energi och effekt' },
      { id: 'dhv1_i5', system: 'DHV', category: 'Information', name: 'Nätavtal', description: 'Avtal mellan nätägare och kund' },
      { id: 'dhv1_i6', system: 'DHV', category: 'Information', name: 'Elhandelsavtal', description: 'Leveransavtal mellan leverantör och kund' },
      { id: 'dhv1_i7', system: 'DHV', category: 'Information', name: 'Samtycken', description: 'Digitala godkännanden för datadelning och representation' },
      { id: 'dhv1_i8', system: 'DHV', category: 'Information', name: 'Leveransstruktur', description: 'Koppling: Kund -> Ellev -> BRP -> Anläggning' },
      { id: 'fis1_p1', system: 'FIS', category: 'Process', name: 'Aktörskvalificering', description: 'Finansiell och juridisk kvalificering av SP' },
      { id: 'fis1_p2', system: 'FIS', category: 'Process', name: 'Resursregistrering (CU)', description: 'Registrering av tekniska resurser' },
      { id: 'fis1_p3', system: 'FIS', category: 'Process', name: 'Hantera flexibilitetsavtal', description: 'Registrering av avtal mellan SP och resursägare' },
      { id: 'fis1_p4', system: 'FIS', category: 'Process', name: 'Produktkvalificering', description: 'Admin, nät och teknisk kvalificering' },
      { id: 'fis1_p5', system: 'FIS', category: 'Process', name: 'Nätbegränsningar', description: 'DSO registrerar begränsningar (Congestion)' },
      { id: 'fis1_p6', system: 'FIS', category: 'Process', name: 'Baseline (MP)', description: 'Beräkning baserad på mätpunktsmätvärden' },
      { id: 'fis1_p7', system: 'FIS', category: 'Process', name: 'Ekonomisk reglering', description: 'Underlag för obalans och kompensation' },
      { id: 'fis1_i1', system: 'FIS', category: 'Information', name: 'CU-resurser', description: 'Registrering och uppdatering av flexibilitetsresurser (CU)' },
      { id: 'fis1_i2', system: 'FIS', category: 'Information', name: 'Aktörsregister', description: 'SP och BSP' },
      { id: 'fis1_i3', system: 'FIS', category: 'Information', name: 'Baseline', description: 'Referenskurvor och metoder för verifiering' },
      { id: 'fis1_i4', system: 'FIS', category: 'Information', name: 'Flexibilitetsavtal', description: 'Avtalsrelation mellan SP och resurs' },
      { id: 'fis1_i5', system: 'FIS', category: 'Information', name: 'Aggregering (SPU/SPG)', description: 'Gruppering av resurser (teknisk/marknad)' }
    ]
  },
  {
    id: 'phase2',
    title: 'Fas 2: Utökad funktionalitet och kvalitet',
    subtitle: 'Undermätning, energidelning och utökad statistik.',
    status: 'Planned',
    items: [
      { id: 'dhv2_p1', system: 'DHV', category: 'Process', name: 'Energigemenskapshantering', description: 'Hantering av energigemenskaper' },
      { id: 'dhv2_p2', system: 'DHV', category: 'Process', name: 'Energidelningshantering', description: 'Hantering av energidelning' },
      { id: 'dhv2_p3', system: 'DHV', category: 'Process', name: 'Uppdaterad nätavräkning', description: 'För att hantera gemenskaper och delning' },
      { id: 'dhv2_p4', system: 'DHV', category: 'Process', name: 'Planobjektshantering', description: 'Relation mellan mätpunkter och BRPs planobjekt' },
      { id: 'dhv2_p5', system: 'DHV', category: 'Process', name: 'Statistikunderlag', description: 'Framtagande och distribution av statistik' },
      { id: 'dhv2_i1', system: 'DHV', category: 'Information', name: 'Energigemenskaper', description: 'Definition av gemenskap och medlemmar' },
      { id: 'dhv2_i2', system: 'DHV', category: 'Information', name: 'Energidelning', description: 'Regler och fördelningsnycklar' },
      { id: 'dhv2_i3', system: 'DHV', category: 'Information', name: 'Planobjekt', description: 'Strukturdata för balansansvar' },
      { id: 'fis2_p1', system: 'FIS', category: 'Process', name: 'Mätvärdeshantering för CU', description: 'Hantering av mätvärden på resursnivå' },
      { id: 'fis2_p2', system: 'FIS', category: 'Process', name: 'Baseline CU', description: 'Beräkning av baseline på resursnivå' },
      { id: 'fis2_p3', system: 'FIS', category: 'Process', name: 'Ekonomisk reglering', description: 'Baserad på CU (Undermätning)' },
      { id: 'fis2_i1', system: 'FIS', category: 'Information', name: 'Mätvärden CU', description: 'Detaljerade mätserier för resurser' },
      { id: 'fis2_i2', system: 'FIS', category: 'Information', name: 'Undermätare & IDn', description: 'Teknisk identifiering av sub-meters' }
    ]
  },
  {
    id: 'phase3',
    title: 'Fas 3: Marknadsöppnande och effektivisering',
    subtitle: 'Avancerad hantering av resurser och aktörsdialog inom interna nät (IKN).',
    status: 'Vision',
    items: [
      { id: 'dhv3_p1', system: 'DHV', category: 'Process', name: 'Leverantörsbyte för CU', description: 'Byta aggregator/leverantör för en teknisk resurs' },
      { id: 'dhv3_p2', system: 'DHV', category: 'Process', name: 'Mätpunktshantering inom IKN', description: 'Registrering och administration av mätpunkter i interna nät' },
      { id: 'dhv3_p3', system: 'DHV', category: 'Process', name: 'Leverantörsbyte inom IKN', description: 'Byte av leverantör för mätpunkter i interna nät' },
      { id: 'dhv3_p4', system: 'DHV', category: 'Process', name: 'Bekräftelse till kund vid byte', description: 'DHV skickar bekräftelse direkt till slutkund' },
      { id: 'dhv3_p5', system: 'DHV', category: 'Process', name: 'Nätavräkning (IKN)', description: 'Uppdaterad avräkning för att hantera interna nät' },
      { id: 'dhv3_p6', system: 'DHV', category: 'Process', name: 'Avancerad ärendehantering', description: 'Integrerad tvist/frågehantering' },
      { id: 'dhv3_i1', system: 'DHV', category: 'Information', name: 'Mätpunkter inom IKN', description: 'Strukturdata för punkter i interna nät' },
      { id: 'dhv3_i2', system: 'DHV', category: 'Information', name: 'Ärenden', description: 'Ärendeobjekt för kommunikation' }
    ]
  }
];

// --- Data: Actor Impacts ---
const impactPhasesData: ImpactPhase[] = [
  {
    id: 'impact1',
    title: 'Aktörspåverkan Fas 1',
    subtitle: 'Etablering av grundläggande DHV & Flexregister.',
    status: 'Critical',
    impacts: [
      {
        name: "Nätägare (DSO)",
        color: "text-blue-700",
        removed: [
          { text: "Utförande av nätavräkning (flyttas till DHV)" },
          { text: "Manuell hantering av fullmakter" },
          { text: "Hantering av samtycke för energitjänsteföretag via egna Mina Sidor" },
          { text: "Validering av leverantörsbyten" },
          { text: "Distribution av mätvärden till flera marknadsaktörer" }
        ],
        added: [
          { text: "Registrering av nätavtal" },
          { text: "Rapportering av mätvärden till en mottagare (DHV)" },
          { text: "Registrering av mätpunktsinformation i DHV" },
          { text: "Hantera nätförkvalicieringar" },
          { text: "Registrera nätbegränsningar i FIS" }
        ]
      },
      {
        name: "Datahub-operatör (DHV/System)",
        color: "text-indigo-800",
        removed: [{ text: "Ingen (Ny central roll)" }],
        added: [
          { text: "Utförande av aggregerad nätavräkning" },
          { text: "Hantering av leverantörsbyten & flytt" },
          { text: "Validering och lagring av masterdata & mätvärden" },
          { text: "Distribution av information till marknadsaktörer" },
          { text: "Tillhandahållande av 'Mina Sidor' och samtyckeshantering" },
          { text: "Registrera baseline metoder" },
          { text: "Beräkna baseline för CU" },
          { text: "Validera flexibilitetsaktiveringar" },
          { text: "Distribuera information för obalansjustering" },
          { text: "Distribuera information för elleverantörskompensation" }
        ]
      },
      {
        name: "Service Provider (SP) / BSP",
        color: "text-orange-700",
        removed: [],
        added: [
          { text: "Registrera CU" },
          { text: "Strukturera SPU/SPG" },
          { text: "Produktkvalificering" },
          { text: "Registrera flexibilitetsavtal" },
          { text: "Välja baseline för CU" }
        ]
      },
      {
        name: "Elleverantör",
        color: "text-teal-700",
        removed: [{ text: "Hantering av ej standardiserade fullmakter" }],
        added: [{ text: "Digitala standardiserade samtycken via DHV" }]
      },
      { name: "Balansansvarig (BRP)", color: "text-purple-700", removed: [], added: [] },
      { name: "SCB (Statistiska centralbyrån)", color: "text-slate-700", removed: [], added: [] },
      { name: "IKN-ombud", color: "text-rose-600", removed: [], added: [] }
    ]
  },
  {
    id: 'impact2',
    title: 'Aktörspåverkan Fas 2',
    subtitle: 'Utökad funktionalitet och kvalitet.',
    status: 'Planned',
    impacts: [
      {
        name: "Nätägare (DSO)",
        color: "text-blue-700",
        removed: [{ text: "Del eller all statistikrapportering" }],
        added: []
      },
      {
        name: "Datahub-operatör (DHV/System)",
        color: "text-indigo-800",
        removed: [],
        added: [
          { text: "Nätavräkningens komplexitet ökar" },
          { text: "Automatiskt koppla eller ta bort mätpunkter i planobjekt" }
        ]
      },
      {
        name: "Service Provider (SP) / BSP",
        color: "text-orange-700",
        removed: [],
        added: [
          { text: "Registrera undermätare" },
          { text: "Rapportering av CU-mätvärden" }
        ]
      },
      {
        name: "Elleverantör",
        color: "text-teal-700",
        removed: [{ text: "Del eller all statistikrapportering" }],
        added: []
      },
      {
        name: "Balansansvarig (BRP)",
        color: "text-purple-700",
        removed: [{ text: "Strukturera planobjekt hos eSett" }],
        added: [{ text: "Möjligt att omstrukturera planobjekt - vilka mätpunkter som ingår planobjekt" }]
      },
      {
        name: "SCB (Statistiska centralbyrån)",
        color: "text-slate-700",
        removed: [],
        added: [{ text: "En motpart att samla in statistik ifrån" }]
      },
      { name: "IKN-ombud", color: "text-rose-600", removed: [], added: [] }
    ]
  },
  {
    id: 'impact3',
    title: 'Aktörspåverkan Fas 3',
    subtitle: 'Marknadsöppnande och effektivisering.',
    status: 'Vision',
    impacts: [
      {
        name: "Nätägare (DSO)",
        color: "text-blue-700",
        removed: [{ text: "Bekräftelse till kund vid levbyte" }],
        added: []
      },
      {
        name: "Datahub-operatör (DHV/System)",
        color: "text-indigo-800",
        removed: [],
        added: [
          { text: "Nätavräkningens komplexitet ökar" },
          { text: "Bekräftelse till kund vid levbyte" },
          { text: "Hantering av leverantörsbyten & flytt inom IKN" }
        ]
      },
      { name: "Service Provider (SP) / BSP", color: "text-orange-700", removed: [], added: [] },
      { 
        name: "Elleverantör", 
        color: "text-teal-700", 
        removed: [], 
        added: [{ text: "De kan erbjuda elavtal inom IKN" }] 
      },
      { name: "Balansansvarig (BRP)", color: "text-purple-700", removed: [], added: [] },
      { name: "SCB (Statistiska centralbyrån)", color: "text-slate-700", removed: [], added: [] },
      {
        name: "IKN-ombud",
        color: "text-rose-600",
        removed: [],
        added: [
          { text: "Registrera mätpunkter inom IKN" },
          { text: "Rapporterar mätvärden inom IKN" }
        ]
      }
    ]
  }
];

// --- Components ---

const StrategyCard = ({ icon: Icon, title, subtitle, colorClass, bgClass, active }: any) => (
  <div className={`flex-1 p-6 rounded-xl border ${active ? `${bgClass} border-opacity-100 ring-2 ring-offset-2 ring-blue-100 shadow-md` : 'bg-white border-gray-100 opacity-60'} transition-all relative overflow-hidden group`}>
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-lg ${active ? 'bg-white bg-opacity-100' : 'bg-gray-100'} flex items-center justify-center mb-4 shadow-sm`}>
        <Icon className={`w-6 h-6 ${active ? colorClass.replace('bg-', 'text-') : 'text-gray-400'}`} />
      </div>
      <h3 className={`text-lg font-bold ${active ? 'text-gray-900' : 'text-gray-500'} mb-1`}>{title}</h3>
      <p className={`text-sm ${active ? 'text-gray-700' : 'text-gray-400'}`}>{subtitle}</p>
    </div>
  </div>
);

const RoadmapFeatureItem: React.FC<{ item: RoadmapItem }> = ({ item }) => (
  <div className="flex items-start p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
    <div className={`mt-1 mr-3 min-w-[24px] flex justify-center`}>
      {item.category === 'Process' ? 
        <Settings className={`w-5 h-5 ${item.system === 'DHV' ? 'text-blue-500' : 'text-orange-500'}`} /> : 
        <FileText className={`w-5 h-5 ${item.system === 'DHV' ? 'text-indigo-400' : 'text-amber-500'}`} />
      }
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-bold uppercase">
          {item.category === 'Process' ? 'Process' : 'Information'}
        </span>
        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
    </div>
  </div>
);

const ImpactActorSection: React.FC<{ impact: ActorImpact }> = ({ impact }) => (
  <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:border-gray-300 transition-colors">
    <div className="px-4 py-2 bg-gray-50/50 border-b border-gray-100">
      <h3 className={`text-sm font-bold ${impact.color}`}>{impact.name}</h3>
    </div>
    <div className="p-4 flex-1 space-y-4">
      <div>
        <h4 className="text-[9px] font-black text-red-700 uppercase tracking-widest mb-3 flex items-center gap-2">
          Försvinner / Avlastas
        </h4>
        <div className="space-y-2">
          {impact.removed.length > 0 ? impact.removed.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <Minus className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />
              <p className="text-xs text-gray-700 leading-snug">{item.text}</p>
            </div>
          )) : <p className="text-[10px] text-gray-400 italic">Inga punkter</p>}
        </div>
      </div>
      <div>
        <h4 className="text-[9px] font-black text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
          Tillkommer / Nytt
        </h4>
        <div className="space-y-2">
          {impact.added.length > 0 ? impact.added.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <Plus className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-xs text-gray-700 leading-snug">{item.text}</p>
            </div>
          )) : <p className="text-[10px] text-gray-400 italic">Inga punkter</p>}
        </div>
      </div>
    </div>
  </div>
);

export const DeploymentPage = () => {
  const [view, setView] = useState<'roadmap' | 'impact'>('roadmap');
  const [openPhase, setOpenPhase] = useState<string | null>('phase1');
  const [openImpactPhase, setOpenImpactPhase] = useState<string | null>('impact1');
  const [showFullStrategy, setShowFullStrategy] = useState(false);

  // Logic to determine which strategy card should be active
  const activePhaseId = view === 'roadmap' ? openPhase : (openImpactPhase?.replace('impact', 'phase'));

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">Driftsättning & roadmap</h1>
        
        {/* Elevator Pitch / Strategi-sammanfattning */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10 transition-all">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Kärnan i strategin: MVP-logik</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">Datahub (DHV)</p>
                    <p className="text-gray-700 leading-relaxed">
                      DHV skapar förutsättningarna genom att centralisera data och digitalisera samtycken via "Mina Sidor". Det är den stabila grunden som hela marknaden vilar på.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-orange-700 uppercase tracking-wider">Flexibilitet (FIS)</p>
                    <p className="text-gray-700 leading-relaxed">
                      FIS etablerar själva marknadsplatsen. Eftersom regelverket (NC DR) ställer höga krav på komplett funktionalitet, levererar MVP-fasen en nästintill fullständig infrastruktur för registrering, verifiering och avräkning av flexibilitet.
                    </p>
                  </div>
                </div>

                {/* Strategiskt block för Fas 2 & 3 */}
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Fas 2 och 3: Optimering och marknadsöppning</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Funktionaliteten i dessa faser (såsom avancerad undermätning, energidelning och interna nät) bedöms inte som go-live-kritiska för marknadsstarten. De kan därför senareläggas för att möjliggöra en så snabb och stabil driftsättning som möjligt av den grundläggande infrastrukturen i Fas 1. På detta sätt säkras kärnvärdet för marknaden i ett tidigt skede, medan komplexa optimeringsfunktioner rullas ut stegvis.
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowFullStrategy(!showFullStrategy)}
                  className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors group"
                >
                  {showFullStrategy ? 'Visa mindre' : 'Läs mer om strategin'}
                  {showFullStrategy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
                </button>
              </div>
            </div>
          </div>

          {/* Expanderbar fördjupning */}
          {showFullStrategy && (
            <div className="px-6 pb-8 md:px-8 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-blue-900 font-bold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5" /> DHV: En centraliserad grund
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Fokus för DHV i MVP-fasen är att centralisera befintliga marknadsprocesser snarare än att introducera nya funktioner. Genom att migrera korrekt strukturdata, mätvärden och leveransstrukturer innan driftsättning görs DHV till master för informationen. Detta skapar den stabila grund som krävs för en modern elmarknad och är en förutsättning för att kunna starta flexibilitetsregistret (FIS). Strategiskt viktigt är också införandet av "Mina Sidor", som redan i MVP ersätter manuell hantering med digitala samtycken.
                  </p>
                </div>
                <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
                  <h3 className="text-orange-900 font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> FIS: Infrastruktur för flexibilitet
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    För FIS handlar MVP om att etablera den kritiska infrastrukturen för flexibilitetsmarknaden. Det innebär funktionalitet för att registrera aktörer (SP), resurser (CU) och upprätta flexibilitetsavtal. Systemet måste även kunna beräkna baselines utifrån mätpunktsmätvärden för att kunna verifiera aktiveringar och möjliggöra ekonomisk reglering. Eftersom regelverket (NC DR) kräver ett fullständigt register, ingår merparten av funktionerna redan i den första fasen.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Strategic Overview (Cards) */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <StrategyCard 
          icon={ShieldCheck} title="Fas 1: Etablering" subtitle="Go-Live (MVP)" 
          colorClass="text-blue-700" bgClass="bg-blue-50 border-blue-200" 
          active={activePhaseId === 'phase1'}
        />
        <div className="hidden md:flex items-center justify-center px-1 text-gray-300"><ArrowRight className="w-5 h-5" /></div>
        <StrategyCard 
          icon={TrendingUp} title="Fas 2: Utökad funktionalitet" subtitle="Kvalitet"
          colorClass="text-teal-600" bgClass="bg-teal-50 border-teal-200" 
          active={activePhaseId === 'phase2'}
        />
        <div className="hidden md:flex items-center justify-center px-1 text-gray-300"><ArrowRight className="w-5 h-5" /></div>
        <StrategyCard 
          icon={Zap} title="Fas 3: Marknadsöppnande" subtitle="Effektivisering"
          colorClass="text-purple-600" bgClass="bg-purple-50 border-purple-200" 
          active={activePhaseId === 'phase3'}
        />
      </div>

      {/* View Toggle */}
      <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit mb-8">
        <button 
          onClick={() => setView('roadmap')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'roadmap' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ClipboardList className="w-4 h-4" />
          Funktionell Roadmap
        </button>
        <button 
          onClick={() => setView('impact')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'impact' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Users className="w-4 h-4" />
          Analys: Aktörspåverkan
        </button>
      </div>

      {/* Main Content Area */}
      {view === 'roadmap' ? (
        <div className="space-y-4">
          {roadmapData.map((phase) => {
            const isOpen = openPhase === phase.id;
            const dhvItems = phase.items.filter(i => i.system === 'DHV');
            const fisItems = phase.items.filter(i => i.system === 'FIS');

            return (
              <div key={phase.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${isOpen ? 'ring-1 ring-blue-500 border-blue-500' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${phase.status === 'Critical' ? 'bg-blue-100 text-blue-600' : phase.status === 'Planned' ? 'bg-teal-100 text-teal-600' : 'bg-purple-100 text-purple-600'}`}>
                      {phase.status === 'Critical' ? <CheckCircle2 className="w-6 h-6" /> : phase.status === 'Planned' ? <Activity className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                      <p className="text-sm text-gray-500">{phase.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-6 border-t border-gray-100 bg-gray-50/30 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* DHV Column */}
                      <div>
                        <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          💾Datahub (DHV)
                        </h4>
                        <div className="space-y-3">
                          {dhvItems.length > 0 ? 
                            dhvItems.map(item => <RoadmapFeatureItem key={item.id} item={item} />) : 
                            <p className="text-sm text-gray-400 italic p-4 bg-gray-100 rounded-lg">Inga punkter i denna fas</p>
                          }
                        </div>
                      </div>
                      {/* FIS Column */}
                      <div>
                        <h4 className="text-xs font-black text-orange-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          ⚡Flexibilitetsregister (FIS)
                        </h4>
                        <div className="space-y-3">
                          {fisItems.length > 0 ? 
                            fisItems.map(item => <RoadmapFeatureItem key={item.id} item={item} />) : 
                            <p className="text-sm text-gray-400 italic p-4 bg-gray-100 rounded-lg">Inga punkter i denna fas</p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 items-center">
            <Info className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-800">
              Analysen nedan bryter ner hur marknadens roller påverkas i varje fas. Fokus ligger på övergången från manuella till centralt automatiserade processer. Alla aktörer visas konsekvent för att underlätta jämförelse.
            </p>
          </div>

          {impactPhasesData.map((phase) => {
            const isOpen = openImpactPhase === phase.id;
            return (
              <div key={phase.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${isOpen ? 'ring-1 ring-indigo-500 border-indigo-500' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setOpenImpactPhase(isOpen ? null : phase.id)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${phase.status === 'Critical' ? 'bg-blue-100 text-blue-600' : phase.status === 'Planned' ? 'bg-teal-100 text-teal-600' : 'bg-purple-100 text-purple-600'}`}>
                      {phase.status === 'Critical' ? <ShieldCheck className="w-6 h-6" /> : phase.status === 'Planned' ? <TrendingUp className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                      <p className="text-sm text-gray-500">{phase.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-6 border-t border-gray-100 bg-gray-50/30 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {phase.impacts.map((actor, aIdx) => (
                         <ImpactActorSection key={aIdx} impact={actor} />
                       ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg italic shadow-inner">
                      <p className="text-xs text-gray-500">
                        <strong>Notera:</strong> Aktörer visas i konsekvent ordning i alla faser. Tomma sektioner innebär att inga specifika förändringar har identifierats för den rollen i den aktuella fasen.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeploymentPage;