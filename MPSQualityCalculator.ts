
import { MPSData, BRSData } from './types';
import { SectionScore } from './QualityCalculator';

export interface ScenarioMetric {
  id: string;
  title: string;
  startConditions: number;
  stopConditions: number;
}

export interface MPSQualityReport {
  meta: SectionScore;
  diagram: SectionScore;
  scenarios: SectionScore;
  traceability: SectionScore;
  conditionCoverage: SectionScore;
  scenarioMetrics: ScenarioMetric[];
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

export const calculateMPSQuality = (mps: MPSData, brsList: BRSData[]): MPSQualityReport => {
  
  // 1. Meta Data (Purpose, Trigger, Domain)
  const meta = calculateSection(
    !!mps.purpose && mps.purpose.length > 20,
    100,
    [
      { check: !!mps.trigger && mps.trigger.length > 10, penalty: 40, msg: "Trigger saknas eller är otydlig." },
      { check: !!mps.domain, penalty: 20, msg: "Domän är ej angiven." },
      { check: !mps.purpose.includes("TBD"), penalty: 20, msg: "Syftet innehåller 'TBD'." }
    ]
  );

  // 2. Diagram
  const diagram = calculateSection(
    !!mps.diagramCode && mps.diagramCode.length > 0,
    100,
    [
      { check: (mps.diagramCode || "").includes(mps.id), penalty: 30, msg: "Diagramtiteln saknar referens till ID." },
      { check: (mps.diagramCode || "").length > 50, penalty: 20, msg: "Diagrammet verkar för enkelt/kort." }
    ]
  );

  // 3. Scenarios & Structure
  const scenarioCheck = calculateSection(
    mps.scenarios && mps.scenarios.length > 0,
    100,
    [
      { 
        check: mps.scenarios.every(s => s.steps.length >= 2), 
        penalty: 40, 
        msg: "Ett eller flera scenarier är för korta (< 2 steg)." 
      },
      {
        check: !!mps.actors && mps.actors.length > 0,
        penalty: 20,
        msg: "Aktörer är ej definierade explicit i MPS-huvudet."
      },
      {
        check: mps.scenarios.every(s => s.description && s.description.length > 10),
        penalty: 10,
        msg: "Vissa scenarier saknar beskrivning."
      }
    ]
  );

  // 4. Analyze Start/Stop Conditions per Scenario
  const scenarioMetrics: ScenarioMetric[] = mps.scenarios.map(sc => {
    const firstStep = sc.steps[0];
    const lastStep = sc.steps[sc.steps.length - 1];

    // Find Start Conditions (From referenced BRS in first step)
    let startCount = 0;
    if (firstStep && firstStep.refBRS) {
        const brs = brsList.find(b => b.id === firstStep.refBRS);
        if (brs && brs.preConditions) {
            startCount = brs.preConditions.length;
        }
    }

    // Find Stop Conditions (From referenced BRS in last step)
    let stopCount = 0;
    if (lastStep && lastStep.refBRS) {
        const brs = brsList.find(b => b.id === lastStep.refBRS);
        if (brs && brs.postConditions && brs.postConditions.accepted) {
            const accepted = Array.isArray(brs.postConditions.accepted) 
                ? brs.postConditions.accepted 
                : [brs.postConditions.accepted];
            stopCount = accepted.length;
        }
    }

    return {
        id: sc.id,
        title: sc.title,
        startConditions: startCount,
        stopConditions: stopCount
    };
  });

  const conditionCoverage = calculateSection(
    scenarioMetrics.length > 0,
    100,
    [
      { 
        check: scenarioMetrics.every(m => m.startConditions > 0), 
        penalty: 30, 
        msg: "Vissa scenarier saknar identifierbara startvillkor (refBRS i steg 1)." 
      },
      { 
        check: scenarioMetrics.every(m => m.stopConditions > 0), 
        penalty: 30, 
        msg: "Vissa scenarier saknar identifierbara slutvillkor (refBRS i sista steget)." 
      }
    ]
  );

  // 5. Traceability (Links to BRS)
  let totalSteps = 0;
  let linkedSteps = 0;
  
  mps.scenarios.forEach(s => {
    s.steps.forEach(step => {
      totalSteps++;
      if (step.refBRS && step.refBRS.length > 5) {
        linkedSteps++;
      }
    });
  });

  const linkageRatio = totalSteps > 0 ? (linkedSteps / totalSteps) : 0;

  const traceability = calculateSection(
    totalSteps > 0,
    100,
    [
      { check: linkageRatio > 0.5, penalty: 50, msg: "Mindre än 50% av stegen är kopplade till BRS." },
      { check: linkageRatio > 0.9, penalty: 20, msg: "Vissa steg saknar BRS-koppling (bör vara nära 100%)." },
      { check: mps.scenarios.every(s => s.steps.some(step => step.refRule)), penalty: 10, msg: "Saknar detaljerad regelreferens (Start/Stop villkor)." }
    ]
  );

  const metrics = [
    meta.score,
    diagram.score,
    scenarioCheck.score,
    traceability.score,
    conditionCoverage.score
  ];

  const total = Math.round(metrics.reduce((a, b) => a + b, 0) / metrics.length);

  return {
    meta,
    diagram,
    scenarios: scenarioCheck,
    traceability,
    conditionCoverage,
    scenarioMetrics,
    total
  };
};
