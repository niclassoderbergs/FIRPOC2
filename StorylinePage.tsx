import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Info, Database, Network, Server, Cpu, CheckCircle2, Battery, Zap, UserCheck, Banknote, Truck, Factory, BellRing, GitBranch, FileSearch, Unplug
} from 'lucide-react';
import { Step } from './types';
import { journey1 } from './storyline/journey1';
import { journey2 } from './storyline/journey2';
import { journey3 } from './storyline/journey3';
import { journey4 } from './storyline/journey4';
import { journey5 } from './storyline/journey5';
import { supportJourney1 } from './storyline/supportJourney1';

const StoryStep: React.FC<{ step: Step; isActive: boolean; onClick: () => void }> = ({ step, isActive, onClick }) => {
  const Icon = step.icon;
  
  const getSystemLabel = (tech: string) => {
    const t = tech.toUpperCase();
    if (t.includes('FIS') || t.includes('FIR')) return 'FIR';
    if (t.includes('DHV')) return 'DHV';
    if (t.includes('BSP') || t.includes('FLEXIBILITETSLEVERANTÖR')) return 'BSP';
    if (t.includes('BRP')) return 'BRP';
    if (t.includes('TSO')) return 'TSO';
    return 'Extern process';
  };

  const systemLabel = getSystemLabel(step.technical);

  return (
    <div 
      onClick={onClick}
      className={`snap-center flex-shrink-0 cursor-pointer transition-all duration-500 transform ${
        isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-40 hover:opacity-70'
      }`}
    >
      <div className={`relative flex flex-col p-6 rounded-2xl border-2 ${
        isActive 
          ? 'bg-white border-blue-600 shadow-2xl ring-4 ring-blue-50 z-20' 
          : 'bg-white border-slate-100 shadow-sm'
      } w-72 h-[540px] mx-3 transition-colors`}>
        
        <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
        }`}>
          {step.category}
        </div>

        <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg transition-transform ${
          isActive ? 'bg-blue-600 rotate-3' : 'bg-slate-400'
        }`}>
          {step.id}
        </div>

        <div className={`mb-6 mt-2 p-5 w-fit rounded-2xl transition-colors ${
          isActive ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
        }`}>
          <Icon size={40} strokeWidth={1.5} />
        </div>

        <div className="flex-grow">
          <h3 className={`text-xl font-bold mb-3 transition-colors ${
            isActive ? 'text-slate-900' : 'text-slate-500'
          }`}>
            {step.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-6 ${
            isActive ? 'text-slate-600 font-medium' : 'text-slate-400'
          }`}>
            {step.description}
          </p>
        </div>
        
        <div className={`mt-auto w-full p-4 rounded-xl text-xs transition-all ${
          isActive 
            ? 'bg-indigo-600 text-indigo-50 border border-indigo-700 shadow-inner' 
            : 'bg-slate-100 text-slate-400 border border-transparent'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isActive ? 'bg-indigo-300' : 'bg-slate-300'}`} />
            <strong className="uppercase tracking-widest font-bold">
              {systemLabel === 'Extern process' ? 'Hantering' : (['BSP', 'BRP', 'TSO'].includes(systemLabel) ? `Aktör (${systemLabel})` : `Systemet (${systemLabel})`)}
            </strong>
          </div>
          <p className="leading-normal">{step.technical}</p>
        </div>
      </div>
    </div>
  );
};

export const StorylinePage: React.FC = () => {
  const [activeJourney, setActiveJourney] = useState<string>('elresa');
  const [activeStep, setActiveStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getSteps = () => {
    switch(activeJourney) {
        case 'elresa': return journey1;
        case 'flexresa': return journey2;
        case 'kvalificering': return journey3;
        case 'affarsresa': return journey4;
        case 'utflytt': return journey5;
        case 'brp-planering': return supportJourney1;
        default: return journey1;
    }
  };

  const steps = getSteps();

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    if (scrollRef.current) {
      const stepWidth = 312; 
      scrollRef.current.scrollTo({
        left: index * stepWidth - (scrollRef.current.offsetWidth / 2 - stepWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  const handleJourneySwitch = (journey: string) => {
    setActiveJourney(journey);
    setActiveStep(0);
    if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 pb-20 rounded-xl">
      <main className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Journey Selector Tabs Grouped */}
        <div className="space-y-4 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Huvudresor (Kim)</span>
            <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit shadow-inner">
              <button 
                onClick={() => handleJourneySwitch('elresa')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeJourney === 'elresa' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Zap className="w-4 h-4" />
                Elresa
              </button>
              <button 
                onClick={() => handleJourneySwitch('flexresa')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeJourney === 'flexresa' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Battery className="w-4 h-4" />
                Flexresa
              </button>
              <button 
                onClick={() => handleJourneySwitch('kvalificering')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeJourney === 'kvalificering' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Cpu className="w-4 h-4" />
                Kvalificering
              </button>
              <button 
                onClick={() => handleJourneySwitch('affarsresa')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeJourney === 'affarsresa' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Banknote className="w-4 h-4" />
                Affären
              </button>
              <button 
                onClick={() => handleJourneySwitch('utflytt')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeJourney === 'utflytt' ? 'bg-white text-rose-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Truck className="w-4 h-4" />
                Utflytt
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Stödresor (Operativa flöden)</span>
            <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit shadow-inner">
              <button 
                onClick={() => handleJourneySwitch('brp-planering')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeJourney === 'brp-planering' ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <GitBranch className="w-4 h-4" />
                BRP & planering
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Info size={14} />
            {activeJourney === 'kvalificering' ? 'Marknadens Bakom-Kulisserna Process' : 'Interaktiv Visualisering'}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {activeJourney === 'elresa' && 'Så fungerar elmarknaden för Kim'}
            {activeJourney === 'flexresa' && 'Kims väg till en smartare elvardag'}
            {activeJourney === 'kvalificering' && 'Hur resursen blir en del av elmarknaden'}
            {activeJourney === 'affarsresa' && 'Värdekedjan: Från bud till utbetalning'}
            {activeJourney === 'utflytt' && 'Cirkeln sluts: När Kim flyttar ut'}
            {activeJourney === 'brp-planering' && 'Effektiv dygnsplanering för BRP'}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {activeJourney === 'elresa' && 'Följ med på en resa från inflyttning till smarta tjänster. Upptäck hur den osynliga infrastrukturen i Datahubben sköter allt bakom kulisserna.'}
            {activeJourney === 'flexresa' && 'Upptäck hur Kim ansluter sitt batteri och börjar bidra till ett stabilare elnät via en flexibilitetsaktör, utan krångel i vardagen.'}
            {activeJourney === 'kvalificering' && 'Denna resa visar de strikta tekniska stegen och valideringarna som sker i Flexregistret (FIR) för att säkra nätets driftsäkerhet.'}
            {activeJourney === 'affarsresa' && 'Här ser du hur flexibilitet blir till pengar. Från BSP:s beräkningar och budgivning till den slutgiltiga avräkningen i Datahubben.'}
            {activeJourney === 'utflytt' && 'När Kim flyttar ut ser systemen till att alla avtal och kopplingar städas bort automatiskt och säkert.'}
            {activeJourney === 'brp-planering' && 'Se hur produktionsanläggningar automatiskt synkroniseras med BRP:s planeringsobjekt i Datahubben för en säkrare dygnsplanering.'}
          </p>
        </div>

        <div className="relative mb-20">
          <div className="hidden lg:block">
             <button 
                onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-30 p-4 bg-white rounded-full shadow-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:scale-110 disabled:opacity-0 transition-all"
             >
                <ChevronLeft size={24} strokeWidth={3} />
             </button>
             <button 
                onClick={() => scrollToStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-30 p-4 bg-white rounded-full shadow-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:scale-110 disabled:opacity-0 transition-all"
             >
                <ChevronRight size={24} strokeWidth={3} />
             </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-12 pt-8 px-4 snap-x hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {steps.map((step, index) => (
              <StoryStep 
                key={`${activeJourney}-${step.id}`} 
                step={step} 
                isActive={index === activeStep} 
                onClick={() => scrollToStep(index)}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
             <div className="flex gap-3">
               {steps.map((_, idx) => (
                 <button 
                  key={idx}
                  onClick={() => scrollToStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeStep ? 'w-12 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`} 
                 />
               ))}
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
               Steg {activeStep + 1} av {steps.length}
             </p>
          </div>
        </div>

        <div className="space-y-6">
            <h3 className="text-3xl font-black text-slate-900 mb-8">Varför behövs den centrala infrastrukturen?</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl w-fit mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3">Enklare processer</h4>
                <p className="text-slate-500 leading-relaxed">Snabba byten och registreringar utan manuellt krångel genom automatiska IT-flöden för både el och flex.</p>
              </div>
              
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-amber-100 text-amber-600 p-4 rounded-2xl w-fit mb-6">
                  <Cpu size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3">Innovation</h4>
                <p className="text-slate-500 leading-relaxed">Möjliggör nya tjänster som hjälper Kim att spara pengar och bidra till nätet via smarta resurser som batterier.</p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl w-fit mb-6">
                  <Server size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3">Datakvalitet</h4>
                <p className="text-slate-500 leading-relaxed">Centrala register minskar risken för felaktig fakturering och säkerställer teknisk validering av resurser.</p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl w-fit mb-6">
                  <UserCheck size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3">Säkerhet</h4>
                <p className="text-slate-500 leading-relaxed">Full kontroll över vem som får se din data genom standardiserade digitala samtycken och fullmakter.</p>
              </div>
            </div>

            <div className="p-10 bg-slate-900 rounded-[40px] text-white mt-12 relative overflow-hidden group">
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-black mb-4">Infrastrukturen i siffror</h4>
                  <p className="text-slate-400 mb-8">Navet som driver den svenska energiomställningen genom att koppla samman miljontals enheter på ett säkert sätt.</p>
                  <ul className="space-y-4 text-slate-200">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Över 5 miljoner mätpunkter i Sverige.
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Hanterar miljarder mätvärden och transaktioner per year.
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Hanterar allokerad flexibilitetsvolym for korrekt balansavräkning.
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end opacity-20 group-hover:opacity-30 transition-opacity">
                   <Database size={240} />
                </div>
              </div>
              <Network className="absolute -right-20 -bottom-20 text-white/5" size={400} />
            </div>
        </div>
      </main>
    </div>
  );
};

export const storylineJourneys = {
  journey1,
  journey2,
  journey3,
  journey4,
  journey5,
  supportJourney1
};