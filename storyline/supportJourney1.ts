import { Factory, BellRing, GitBranch, FileSearch, Unplug, TrendingUp } from 'lucide-react';
import { Step } from '../types';

export const supportJourney1: Step[] = [
  {
    id: 1,
    title: "Ny produktion in",
    icon: Factory,
    category: 'Struktur',
    description: "En vindkraftpark byter till BRP:ns elleverantör. DHV kopplar den direkt till rätt grupp.",
    technical: "Systemet (DHV) - Vid leverantörsbyte kopplas anläggningen automatiskt till BRP:s förvalda planobjekt för området i DHV."
  },
  {
    id: 2,
    title: "BRP informeras",
    icon: BellRing,
    category: 'Notifiering',
    description: "DHV notifierar BRP att de blivit balansansvariga för dessa.",
    technical: "Systemet (DHV) - DHV notifierar BRPs IT-system att deras planobjekt har uppdaterats."
  },
  {
    id: 3,
    title: "Optimering",
    icon: GitBranch,
    category: 'Planering',
    description: "BRP vill hellre att vindkraftsgruppen är ett eget planobjekt än det som den grupperades in i automatiskt. Därför skapar de en nytt planobjekt och flyttar vindkraftsparken.",
    technical: "Systemet (BRP) - BRP registrerar ett nytt planobjekt i sitt IT-system som automatiskt registrerar detta i DHV och tillbaka får BRP en kvittens. Därefter registrerar BRPs IT-system i DHV att vinkraftsparken ska ingå i det nya planobjektet."
  },
  {
    id: 4,
    title: "TSO Validerar",
    icon: FileSearch,
    category: 'Kontroll',
    description: "BRP skickar in sin dygnsplan till systemet hos TSO som tar emot dessa. TSO kan om de önskar kontrollera att volymerna är rimliga. Detta genom att kontrollera de underliggande mätpunkterna i planobjektet.",
    technical: "Systemet (DHV) - TSO tar emot och validerar inkomna planer mot aggregerad teknisk data för underliggande produktionsanläggningar i DHV."
  },
  {
    id: 5,
    title: "Anläggning lämnar",
    icon: Unplug,
    category: 'Avslut',
    description: "Om elavtalet sägs upp och BRP tappar sitt balansansvar, kopplar DHV bort anläggningen ifrån planobjektet automatiskt, BRP får en automatiskt notifiering om att anläggningen lämnat deras planobjekt.",
    technical: "Systemet (DHV) - Vid avslutat leveransavtal (Supply End) tar DHV automatiskt bort kopplingen mellan produktionsanläggningen och BRP:s Planobjekt. En notifiering skickas till BRP om att resursen har lämnat planobjektet."
  },
  {
    id: 6,
    title: "TSO:s egen prognos",
    icon: TrendingUp,
    category: 'Bonus',
    description: "TSO har tillgång till vad varje planobjekt består av samt tillhörande mätvärden. Det möjliggör för dom att prognostisera egna planer för att säkra systemdriften.",
    technical: "Systemet (DHV) - TSO ges läsrättighet i DHV för att se de enskilda mätpunkterna som ingår i planobjekt samt historiska mätvärden för dessa för oberoende analys."
  }
];