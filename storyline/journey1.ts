import { Home, Zap, Server, UserCheck, CheckCircle2, Mail, BarChart3, Share2, ArrowRight } from 'lucide-react';
import { Step } from '../types';

export const journey1: Step[] = [
  {
    id: 1,
    title: "Kim flyttar in",
    icon: Home,
    category: 'Flytt',
    description: "Kim ringer sin nätägare och tecknar nätavtal för sitt nya hus.",
    technical: "I nätägarens IT-system registreras nätavtalet för kunden på anläggningen. Nätavtalet skickas därefter automatiskt direkt från IT-systemet till det centrala datahanteringsverktyget (DHV)."
  },
  {
    id: 2,
    title: "Datahubben lagrar",
    icon: Server,
    category: 'Validering',
    description: "Informationen om att Kim nu har nätavtal för mätpunkten på adressen sparas säkert och centralt i DHV.",
    technical: "DHV tar emot, validerar formatet och kopplar personnumret till den unika anläggningen(GSRN) via nätavtalet. När nätavtalet har registrerats får nätägaren en kvittens till sitt IT-system."
  },
  {
    id: 3,
    title: "Kim väljer elbolag",
    icon: Zap,
    category: 'Avtal',
    description: "Kim ringer en elleverantör för att teckna elavtal så han får ström levererat till sitt nya hus.",
    technical: "I elleverantörens IT-system registreras elavtalet för kunden på anläggningen. Masterdata skickas därefter automatiskt direkt från IT-systemet till DHV."
  },
  {
    id: 4,
    title: "Osynlig kontroll",
    icon: UserCheck,
    category: 'Validering',
    description: "DHV kollar automatiskt att det är samma Kim som har både nätavtalet och elavtalet på anläggningen.",
    technical: "DHV matchar personnummer i realtid. Automatisk validering förhindrar felaktiga byten och flyttar."
  },
  {
    id: 5,
    title: "Grönt ljus & Info",
    icon: CheckCircle2,
    category: 'Validering',
    description: "Elleverantören får sitt elavtal godkänt av DHV. Samtidigt får nätägaren automatiskt veta att Kim nu har säkrat sin elförsörjning.",
    technical: "DHV bekräftar till elleverantör och notifierar nätägaren. Processen sker helt utan manuell handpåläggning."
  },
  {
    id: 6,
    title: "Bekräftelse till Kim",
    icon: Mail,
    category: 'Avtal',
    description: "Nätägaren skickar ut lagstadgad information till Kim som bekräftar att ett leverantörsbyte har skett på adressen och anläggningen.",
    technical: "Efter notifiering från DHV skickar nätägaren ut lagstadgad information om leverantörsbytet till kunden."
  },
  {
    id: 7,
    title: "Vardagen rullar på",
    icon: BarChart3,
    category: 'Vardag',
    description: "Kim använder el för matlagning och värme. Mätvärden samlas in helt automatiskt varje dag av nätägaren.",
    technical: "Nätägaren samlar in mätvärden-> Skickar mätvärden till DHV -> DHV validerar och sparar mätvärdet för att sedan distribuera mätvärden till korrekt elleverantör."
  },
  {
    id: 8,
    title: "Kim vill ha koll",
    icon: Share2,
    category: 'Innovation',
    description: "Kim loggar in på DHVs Mina Sidor och vill dela sin data med en smart energiapp för att få bättre koll på sin elanvändning. Detta görs genom att Kim registrerar ett digitalt samtycke.",
    technical: "Det digitala samtycket/fullmakten skapas i DHV för en tredjepartsaktör, ett energitjänsteföretag (s.k. ESCO)."
  },
  {
    id: 9,
    title: "Smart delning",
    icon: ArrowRight,
    category: 'Innovation',
    description: "Nu får både elleverantören och den smarta appen mätvärden distribuerade till sig varje dag.",
    technical: "DHV distribuerar mätvärden till både elleverantör och ESCO. Nätägaren har inte påverkats och skickar som tidigare bara mätvärden till DHV."
  }
];