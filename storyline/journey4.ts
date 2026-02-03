import { Calculator, Gavel, ShieldCheck, Trophy, Zap, FileSearch, LineChart, Coins, Banknote } from 'lucide-react';
import { Step } from '../types';

export const journey4: Step[] = [
  {
    id: 1,
    title: "Flex-beräkning",
    icon: Calculator,
    category: 'Analys',
    description: "Det första BSP gör är att räkna på Kims batteri: 'Hur mycket kan vi dra ner imorgon jämfört med det vanliga mönstret (Baseline)?'. BSP har fått all nödvändig information distributerad till sig som baselinemetoden kräver, exempelvis den framförliggande mätpunktens historiska mätvärden.",
    technical: "Flexibilitetsleverantörens IT-system beräknar batteriets baseline och laddnivå för att bestämma dess flexibilitetspotential."
  },
  {
    id: 2,
    title: "Budet läggs",
    icon: Gavel,
    category: 'Marknad',
    description: "BSP lägger ihop Kims flexibilitetspotential med övriga som ingår i samma Service Providing Group (SPG) och lägger ett aggragerat bud för hela gruppen till Svenska kraftnät (TSO). Det är på SPG/SPU-nivån som den kommersiella budgivningen sker.",
    technical: "Flexibilitetsleverantörens IT-system registrerar sitt bud hos TSO budhanteringssystem."
  },
  {
    id: 3,
    title: "FIR Validerar",
    icon: ShieldCheck,
    category: 'Validering',
    description: "TSO budhanteringssystem tar emot budet och skickar det vidare till FIR för kontroll. FIR kontrollerar ifall budets SPG's underliggande flexibilitetsresurser har en aggregerad kapacitet som kan leverera budet. Kontrollen tar även hänsyn till ifall nätägaren har rapporterat in en tillfällig nätbegränsning.",
    technical: "FIR validerar budet mot SPGns ingående resurser, deras tekniska kapacitet och aktuella nätbegränsningar. TSO budhanteringssystem notifieras att budet är tekniskt godkänt."
  },
  {
    id: 4,
    title: "Budet vinner",
    icon: Trophy,
    category: 'Marknad',
    description: "Grönt ljus! Budet var giltigt och hade bäst pris. TSO accepterar och BSP får en order om aktivering av sitt bud.",
    technical: "Flexibilitetsleverantörens IT-system notifieras av TSO budhanteringssystem att budet accepterats."
  },
  {
    id: 5,
    title: "Aktivering",
    icon: Zap,
    category: 'Drift',
    description: "BSP styr Kims batteri automatiskt vid den avtalade tidpunkten.",
    technical: "Styrningen av batteriet utförs av BSP:s egna styrsystem och sker helt utanför koppling till de gemensamma plattformarna(FIR eller TSO budhanteringssystem)."
  },
  {
    id: 6,
    title: "Verifiering (Fas 1)",
    icon: FileSearch,
    category: 'Verifiering',
    description: "Den valda baseline-metoden för batteriet baseras på framförliggande mätpunktens mätvärden. Därför inväntar FIR att nätägarens rapporterar in dessa mätvärden till DHV. När detta gjorts räknar FIR automatiskt ut hur mycket flexibilitet batteriet faktiskt hjälpt till med.",
    technical: "FIR utför verifieringen (Fas 1) mot Baseline baserat på framförliggande mätvärden hämtade från DHV. Verifierad volym skickas därefter till BSP."
  },
  {
    id: 7,
    title: "Info till BRP",
    icon: LineChart,
    category: 'Distribution',
    description: "Kims BRP tar emot den aggregerade volymen för alla flexibilitetsresurser som aktiverats, så att de kan justera sina prognoser för framtiden och får information om hur de kommer obalansjusteras.",
    technical: "FIR aggregerar och skickar volym for obalansjustering till BRP (för neutralisering och spårbarhet)."
  },
  {
    id: 8,
    title: "Info till elleverantör",
    icon: LineChart,
    category: 'Distribution',
    description: "Kims elleverantör tar emot den aktiverade flexibilitetsvolymen för spårbarhet och grund för den ekonomiska kompensationen som kommer att ske.",
    technical: "FIR skickar volym för kompensationsunderlag till elleverantören."
  },
  {
    id: 9,
    title: "Avräkning",
    icon: Coins,
    category: 'Ekonomi',
    description: "Cirkeln sluts. DHV använder obalansjusteringen för nätavräkningen.",
    technical: "DHV rapporterar avräkningsresultatet inklusive obalansjusteringen till eSett."
  },
  {
    id: 10,
    title: "Ersättning till BSP",
    icon: Banknote,
    category: 'Ekonomi',
    description: "TSO betalar ut ersättning till BSP för den nytta som resursen tillsammans med övriga i SPGn gjort för kraftsystemet baserad på den verfierade aktiverade flexibilitetsvolymen.",
    technical: "TSO utför utbetalning till BSP baserat på den verifierade aktiverade flexibilitetsvolymen."
  },
  {
    id: 11,
    title: "Kompensation till elleverantör",
    icon: Banknote,
    category: 'Ekonomi',
    description: "TSO kompenserar elleverantören för de uteblivna intäkterna till följd av den aktiverade flexibiliteten.",
    technical: "TSO betalar ut kompensation till elleverantören baserad på den verifierade aktiverade flexibilitetsvolymen."
  }
];