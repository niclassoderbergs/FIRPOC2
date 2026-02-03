
import { BRSData } from './types';

export interface SectionScore {
  score: number;
  issues: string[];
}

export interface QualityReport {
  purpose: SectionScore;
  diagram: SectionScore;
  startConditions: SectionScore;
  stopConditions: SectionScore;
  businessRules: SectionScore;
  flows: SectionScore;
  content: SectionScore;
  total: number;
}

const calculateSection = (
  condition: boolean, 
  baseScore: number, 
  checks: { check: boolean; penalty: number; msg: string }[]
): SectionScore => {
  const issues: string[] = [];
  let currentScore = condition ? baseScore : 0;

  if (!condition) {
    issues.push("Sektion saknas eller är tom.");
    return { score: 0, issues };
  }

  checks.forEach(c => {
    if (!c.check) {
      currentScore -= c.penalty;
      issues.push(c.msg);
    }
  });

  return { score: Math.max(0, currentScore), issues };
};

export const calculateQuality = (brs: BRSData): QualityReport => {
  // Helper to match ID formats (BRS-FLEX-101 vs BRSFLEX101)
  const idPrefix = brs.id.replace(/-/g, '');
  const numericId = parseInt(brs.id.replace(/\D/g, ''), 10);
  
  // 1. Purpose
  // Krav: Texten ska vara beskrivande (>20 tecken) och inte innehålla platshållare.
  const purpose = calculateSection(
    !!brs.purpose && brs.purpose.length > 20, 
    100,
    [
      { check: !brs.purpose.includes("TBD"), penalty: 100, msg: "Innehåller 'TBD'." },
      { check: brs.purpose.length > 50, penalty: 20, msg: "Beskrivningen är för kort (<50 tecken)." }
    ]
  );

  // 2. Diagram
  // Krav: Diagramkod ska finnas OCH innehålla korrekt BRS-ID i titeln.
  const diagram = calculateSection(
    !!brs.diagramCode && brs.diagramCode.trim().length > 0,
    100,
    [
      { 
        check: (brs.diagramCode || "").includes(brs.id), 
        penalty: 50, 
        msg: `Diagramtiteln saknar referens till ${brs.id}.` 
      },
      {
        check: (brs.diagramCode || "").includes("sequenceDiagram"),
        penalty: 10,
        msg: "Ej identifierat som sekvensdiagram."
      }
    ]
  );

  // 3. Start Conditions
  // Krav: Ska finnas och ha beskrivande text. 
  // (Tidigare krav på korsreferens till andra BRS:er borttaget då många processer triggas av extern aktör).
  const startConditions = calculateSection(
    !!brs.preConditions && brs.preConditions.length > 0,
    100,
    [
      {
        // Enkel kontroll att texten är vettig (mer än 5 tecken)
        check: brs.preConditions.every(c => {
            const txt = typeof c === 'string' ? c : c.description;
            return txt && txt.length > 5;
        }),
        penalty: 100, // Hårt straff om villkoret är tomt/nonsens
        msg: "Startvillkoren saknar beskrivande text."
      }
    ]
  );

  // 4. Stop Conditions
  // Krav: ID på post-conditions ska matcha BRS-ID (t.ex. BRSFLEX101-2).
  const accepted = Array.isArray(brs.postConditions.accepted) ? brs.postConditions.accepted : [];
  const rejected = Array.isArray(brs.postConditions.rejected) ? brs.postConditions.rejected : [];
  const hasConditions = accepted.length > 0 || rejected.length > 0;

  const stopConditions = calculateSection(
    hasConditions,
    100,
    [
      {
        check: accepted.length > 0 && rejected.length > 0,
        penalty: 20,
        msg: "Bör ha både 'Accepted' och 'Rejected' utfall."
      },
      {
        // Check if ID starts with BRSFLEXxxx (without hyphens) OR BRS-FLEX-xxx (legacy support)
        check: [...accepted, ...rejected].every(c => 
          typeof c !== 'string' && (c.id.startsWith(idPrefix) || c.id.startsWith(brs.id))
        ),
        penalty: 50,
        msg: `ID på post-conditions matchar ej ${brs.id} (prefix ${idPrefix}).`
      }
    ]
  );

  // 5. Business Rules
  // Krav: Regler ska finnas. De ska ha ErrorCodes (ej "-").
  // Interna funktioner (utan regler) får pass om arrayen är tom men definierad.
  const hasRules = brs.businessRules && brs.businessRules.length > 0;
  
  // Undantag:
  // 1. Notifieringar (innehåller "notifier" eller "notify")
  // 2. Interna processer (ID >= 1000)
  // 3. List-funktioner (innehåller "lista" eller börjar med "list ")
  const lowerTitle = brs.title.toLowerCase();
  const isNotification = lowerTitle.includes("notifier") || lowerTitle.includes("notify");
  const isListFunction = lowerTitle.includes("lista") || lowerTitle.startsWith("list ");
  const isInternal = numericId >= 1000;
  
  const isExempt = isNotification || isInternal || isListFunction;
  
  const businessRules = calculateSection(
    hasRules || isExempt, // Godkänn tomt om det är en notifiering, intern funktion eller lista
    100,
    [
      {
        check: hasRules || isExempt, // Om ej exempt måste det finnas regler
        penalty: 100,
        msg: "Saknar affärsregler."
      },
      {
        check: !hasRules || brs.businessRules.every(r => r.errorCode && r.errorCode !== "-" && r.errorCode.length > 2),
        penalty: 30,
        msg: "Vissa regler saknar giltiga felkoder (ErrorCode)."
      }
    ]
  );

  // 6. Flows
  // Krav: Minst 2 steg i processen.
  const flows = calculateSection(
    !!brs.process && brs.process.length > 0,
    100,
    [
      {
        check: brs.process.length >= 2,
        penalty: 50,
        msg: "Processen är för kort (< 2 steg)."
      }
    ]
  );

  // 7. Content
  // Krav: InfoObjekt ska finnas.
  const content = calculateSection(
    !!brs.infoObjects && brs.infoObjects.length > 0,
    100,
    [
      {
        check: brs.infoObjects?.every(obj => obj.attributes.length > 0) ?? false,
        penalty: 20,
        msg: "Ett definierat objekt saknar attribut."
      }
    ]
  );

  const metrics = [
    purpose.score, 
    diagram.score, 
    startConditions.score, 
    stopConditions.score, 
    businessRules.score, 
    flows.score, 
    content.score
  ];
  
  const total = Math.round(metrics.reduce((a, b) => a + b, 0) / metrics.length);

  return {
    purpose,
    diagram,
    startConditions,
    stopConditions,
    businessRules,
    flows,
    content,
    total
  };
};
