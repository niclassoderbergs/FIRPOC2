import { BatteryCharging, ClipboardCheck, Network, CheckCircle2, PlayCircle, Medal, Zap, Database, BellRing } from 'lucide-react';
import { Step } from '../types';

export const journey3: Step[] = [
  {
    id: 1,
    title: "Kvalificeringsstart",
    icon: ClipboardCheck,
    category: 'Ansökan',
    description: "För att få delta på marknaden behöver flexibilitetsresursen bevisa att den uppfyller kraven för t.ex. stödtjänster. SP/BSP registrerar för vilken produkte de vill kvalificera batteriet för. De anger också vilken baseline-metod som ska tillämpas för batteriet.",
    technical: "Flexibilitetsleverantörens IT-system registrer en produktkvalificering för batteriet i FIR."
  },
  {
    id: 2,
    title: "Nätanalys påbörjas",
    icon: Network,
    category: 'Nätanalys',
    description: "FIR tar emot produktförkvalificeringen och skickar den vidare till den relaterade anläggningens nätägare för nätförkvalificering.",
    technical: "Nätägaren får en notifiering av FIR och utför en nätförkvalificering baserat på batteriets fysiska nätposition."
  },
  {
    id: 3,
    title: "Nätkollen klar",
    icon: CheckCircle2,
    category: 'Beslut',
    description: "Nätägaren lägger in resultatet av nätkollen i sitt IT-system och om det krävs begränsningar för att nätet ska hålla, fastställs dessa nu.",
    technical: "Nätägarens IT-system registrerar beslutet i FIR."
  },
  {
    id: 4,
    title: "Information",
    icon: BellRing,
    category: 'Notifiering',
    description: "FIR tar emot beslutet, sparar det och skickar det vidare till SP/BSP.",
    technical: "FIR skickar en notifiering till SP/BSP om resultatet och eventuella villkor."
  },
  {
    id: 5,
    title: "Eldprovet (Test)",
    icon: PlayCircle,
    category: 'Verifiering',
    description: "Nu genomförs ett fysiskt test där batteriet styrs för att se hur snabbt och exakt det reagerar på signaler.",
    technical: "Flexibilitetsleverantörens IT-system registrerar testadata en i FIR som verifierar mot produktkraven."
  },
  {
    id: 6,
    title: "Godkänd & Marknadsredo",
    icon: Medal,
    category: 'Godkännande',
    description: "Batteriet får status 'Qualified' i FIR och inkluderas automatiskt i en Service Providing Group (SPG) för budgivning baserad på sina och mätpunktens tekniska egenskaper. SP/BSP har möjlighet att flytta batteriet till en annan SPG eller SPU. SP/BSP notifieras om i vilken SPG som batteriet har lagts till i.",
    technical: "FIR uppdaterat batteriet status till 'Qualified' samtidigt som batteriet placerar i en default SPG och skickar en notifiering till SP/BSP med detaljer om placeringen."
  },
  {
    id: 7,
    title: "Budobjektet aktiveras",
    icon: Database,
    category: 'Integration',
    description: "Om FIR skapade en ny SPG i förregående steg informeras TSO om det nya SPG:n. SPG är likställt med ett budobjekt och TSO får denna information för kunna registrera det i sitt budmottagningssystem så de kan ta emot framtida bud.",
    technical: "FIR skickar en automatisk notifiering med masterdata för SPGn till TSO:s system för att säkerställa att budgivning kan påbörjas."
  }
];