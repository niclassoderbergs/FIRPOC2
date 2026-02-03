import { Battery, Cpu, Server, FileText, UserCheck, CheckCircle2 } from 'lucide-react';
import { Step } from '../types';

export const journey2: Step[] = [
  {
    id: 1,
    title: "Kim köper ett batteri",
    icon: Battery,
    category: 'Avtal',
    description: "Kim har köpt ett batteri och kontaktar en flexibilitetsleverantör för att teckna ett flexibilitetsavtal.",
    technical: "Affärshändelsen initieras av slutkunden. Flexibilitetsleverantören och Kim etablerar en kommersiell relation."
  },
  {
    id: 2,
    title: "Registrering i IT-system",
    icon: Cpu,
    category: 'Systemintegration',
    description: "Flexibilitetsleverantören (i rollen som SP/BSP) registrerar batteriet och deras flexibilitetsavtal i sitt IT-system.",
    technical: "I flexibilitetsleverantörens IT-system registreras batteriet och kopplas ihop med Kims anläggning. Masterdata för batteriet skickas därefter automatiskt direkt från IT-systemet till Flexibilitetsregistret (FIR)."
  },
  {
    id: 3,
    title: "Mätpunktskoll",
    icon: Server,
    category: 'Validering',
    description: "FIR kollar automatiskt ifall den angivna anläggningen finns vilket den gör och då registreras batteriet i FIR.",
    technical: "FIR kollar automatiskt via sin koppling till Datahanteringsverktyget (DHV) att den angivna anläggningen finns. Därefter registreras batteriet i FIR med en relation till anläggningen. Flexibilitetsleverantören IT-system får tillbaka en bekräftelse på detta tillsammans med batteriets identifikation i FIR."
  },
  {
    id: 4,
    title: "Avtalsdata skickas",
    icon: FileText,
    category: 'Automation',
    description: "Flexibilitetsleverantörens IT-system skickar därefter automatiskt information om flexibilitetsavtalet till FIR.",
    technical: "Flexibilitetsleverantörens IT-system skickar automatiskt det registrerade flexibilitetsavtalet tillsammans med Kims personnummer, anläggning och batteriets identfikation till FIR."
  },
  {
    id: 5,
    title: "Säkrade kopplingar",
    icon: UserCheck,
    category: 'Kontroll',
    description: "FIR tar emot flexibilitetsavtalet och kontrollerar att det är samma kund på flexibilitetsavtalet som det är på det registrerade nätavtalet på nätavtalet i DHV.",
    technical: "FIR matchar personnummret i realtid. Automatisk validering förhindrar att flexibilitet registreras på felaktig kund."
  },
  {
    id: 6,
    title: "Batteriet redo att kvalificeras",
    icon: CheckCircle2,
    category: 'Godkännande',
    description: "Flexibilitetsleverantören får sitt flexibilitetsavtal godkänt av FIR.",
    technical: "FIR bekräftar till Flexibilitetsleverantören IT-sytem. Processen sker helt utan manuell handpåläggning."
  }
];