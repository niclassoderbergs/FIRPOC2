import { Truck, FileX, ZapOff, ShieldX, Unplug, Link2Off } from 'lucide-react';
import { Step } from '../types';

export const journey5: Step[] = [
  {
    id: 1,
    title: "Kim ringer nätägaren",
    icon: Truck,
    category: 'Flytt',
    description: "Dags att flytta vidare. Kim ringer nätägaren och meddelar vilket datum hen flyttar ut.",
    technical: "Nätägarens IT-system initierar avslut av nätavtal. Information skickas automatiskt direkt från nätägarens IT-systemet till DHV för central avslutning."
  },
  {
    id: 2,
    title: "Datahubben uppdateras",
    icon: FileX,
    category: 'DHV',
    description: "Informationen om att Kim inte längre bor på adressen sparas säkert och centralt i den nationella hubben. DHV bekräftar avslutet direkt till nätägaren.",
    technical: "DHV registrerar slutdatum för nätavtalet och bekräftar därefter transaktionen automatiskt tillbaka till nätägarens IT-system."
  },
  {
    id: 3,
    title: "Elhandeln stoppas",
    icon: ZapOff,
    category: 'DHV',
    description: "Eftersom det inte finns något nätavtal längre, avslutar DHV automatiskt elleveransen genom att sätta slutdatum för nätavtalet i DHV. Elleverantören får veta detta direkt.",
    technical: "DHV avslutar automatiskt elleverantörens elavtal för mätpunkten och skickar en notifiering direkt till elleverantörens IT-system."
  },
  {
    id: 4,
    title: "Samtycket avslutas",
    icon: ShieldX,
    category: 'DHV',
    description: "Av samma tidigare anledning avslutar DHV också automatiskt samtycket som Kim lämnat till den smarta energiappen.",
    technical: "DHV avslutar automatiskt energiappens samtycket och skickar en notifiering direkt till energitjänsteföretags (s.k. ESCO) IT-system."
  },
  {
    id: 5,
    title: "Flex-avtalet upphör",
    icon: Unplug,
    category: 'FIR',
    description: "FIR identifierar automatiskt att Kims nätavtal har avslutats och avlutar automatiskt hans flexibilitetsavtal med sin SP/BSP.",
    technical: "FIR identifierar att aktivt nätavtal saknas och avslutar automatiskt flexibilitetsavtalet. Systemet skickar en notifiering direkt till SP/BSP IT-system."
  },
  {
    id: 6,
    title: "Batteriet kopplas loss",
    icon: Link2Off,
    category: 'FIR',
    description: "FIR identifierar automatiskt att batteriet inte har ett aktivt flexibilitetsavtal och tar därför bort batteriet ifrån bud-gruppen (SPG).",
    technical: "FIR tar automatiskt bort kopplingen mellan Kims batteri (CU) och budgruppen (SPG). SP/BSP IT-system notifieras."
  }
];