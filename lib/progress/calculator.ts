import type { AppState, QuestionId } from "@/state/types";

export interface ProgressSummary {
  overallPercent: number;
  sectionsReady: number;
  sectionsTotal: number;
  evidenceCount: number;
  goalCount: number;
  nextStep: NextStep;
  sectionCompletion: Record<QuestionId, "not-started" | "in-progress" | "ready">;
}

export interface NextStep {
  label: string;
  href: string;
}

function getApplicableSections(isManager: boolean): QuestionId[] {
  const base: QuestionId[] = [
    "role-performance",
    "goal-achievement",
    "impact",
    "values-in-action",
    "development-planning",
    "overall-rating",
  ];
  if (isManager) base.push("leadership");
  return base;
}

export function calculateProgress(state: AppState): ProgressSummary {
  const isManager = state.profile?.isManager ?? false;
  const sections = getApplicableSections(isManager);

  const sectionCompletion = {} as Record<QuestionId, "not-started" | "in-progress" | "ready">;
  let readyCount = 0;

  for (const id of sections) {
    const status = state.sectionState[id]?.status ?? "not-started";
    sectionCompletion[id] = status;
    if (status === "ready") readyCount++;
  }

  const evidenceCount = Object.keys(state.evidence).length;
  const goalCount = Object.keys(state.goals).length;
  const hasProfile = state.profile !== null;

  // Compute overall percent across: profile, sections
  let completedSteps = 0;
  const totalSteps = 1 + sections.length; // profile + each section
  if (hasProfile) completedSteps++;
  completedSteps += readyCount;

  const overallPercent = Math.round((completedSteps / totalSteps) * 100);

  const nextStep = deriveNextStep(state, sections, sectionCompletion, evidenceCount, goalCount);

  return {
    overallPercent,
    sectionsReady: readyCount,
    sectionsTotal: sections.length,
    evidenceCount,
    goalCount,
    nextStep,
    sectionCompletion,
  };
}

function deriveNextStep(
  state: AppState,
  sections: QuestionId[],
  completion: Record<QuestionId, string>,
  evidenceCount: number,
  goalCount: number
): NextStep {
  if (!state.profile) return { label: "Complete your profile to begin", href: "/profile" };
  if (evidenceCount === 0) return { label: "Add your first piece of evidence", href: "/evidence" };
  if (goalCount === 0) return { label: "Add your first goal", href: "/goal-achievement" };

  for (const id of sections) {
    if (completion[id] === "not-started") {
      return { label: `Start ${sectionLabel(id)}`, href: `/${sectionPath(id)}` };
    }
  }
  for (const id of sections) {
    if (completion[id] === "in-progress") {
      return { label: `Continue ${sectionLabel(id)}`, href: `/${sectionPath(id)}` };
    }
  }

  return { label: "Review your assembled assessment", href: "/builder" };
}

function sectionLabel(id: QuestionId): string {
  const labels: Record<QuestionId, string> = {
    "role-performance": "Role Performance",
    "goal-achievement": "Goal Achievement",
    impact: "Impact",
    "values-in-action": "Values in Action",
    "development-planning": "Development Planning",
    leadership: "Leadership",
    "overall-rating": "Overall Rating",
  };
  return labels[id] ?? id;
}

function sectionPath(id: QuestionId): string {
  const paths: Record<QuestionId, string> = {
    "role-performance": "role-performance",
    "goal-achievement": "goal-achievement",
    impact: "impact",
    "values-in-action": "values",
    "development-planning": "development",
    leadership: "leadership",
    "overall-rating": "builder",
  };
  return paths[id] ?? id;
}
