import type { AppState, ReviewFlag, QuestionId } from "@/state/types";

let _idCounter = 0;
function flagId() { return `flag-${++_idCounter}`; }

export function evaluateReviewRules(state: AppState): ReviewFlag[] {
  _idCounter = 0;
  const flags: ReviewFlag[] = [];
  const evidence = Object.values(state.evidence);
  const goals = Object.values(state.goals);

  const ratedSections: QuestionId[] = [
    "role-performance", "goal-achievement", "values-in-action", "overall-rating",
  ];
  if (state.profile?.isManager) ratedSections.push("leadership");

  // RR-01: Section has no evidence linked
  const contentSections: QuestionId[] = [
    "role-performance", "goal-achievement", "impact", "values-in-action",
  ];
  for (const id of contentSections) {
    const linked = state.sectionState[id]?.linkedEvidenceIds ?? [];
    if (linked.length === 0 && state.sectionState[id]?.status !== "not-started") {
      flags.push({
        id: flagId(), ruleId: "RR-01", category: "evidence-integrity", severity: "review",
        message: `No evidence is linked to ${sectionLabel(id)}. Review this before finalizing.`,
        affectedSectionId: id, affectedItemId: null, dismissed: false,
      });
    }
  }

  // RR-02: Only one substantive evidence item linked
  for (const id of contentSections) {
    const linked = state.sectionState[id]?.linkedEvidenceIds ?? [];
    if (linked.length === 1) {
      flags.push({
        id: flagId(), ruleId: "RR-02", category: "evidence-integrity", severity: "review",
        message: `${sectionLabel(id)} relies on a single piece of evidence. Review this before finalizing.`,
        affectedSectionId: id, affectedItemId: null, dismissed: false,
      });
    }
  }

  // RR-03: Shared result with no individual contribution described
  for (const item of evidence) {
    if (item.isSharedResult && !item.individualPartInSharedResult?.trim()) {
      flags.push({
        id: flagId(), ruleId: "RR-03", category: "evidence-integrity", severity: "important",
        message: `"${item.title}" is marked as a shared result but your individual contribution is not described. Review this before finalizing.`,
        affectedSectionId: null, affectedItemId: item.id, dismissed: false,
      });
    }
  }

  // RR-04: Unresolved metric placeholder
  for (const item of evidence) {
    const m = item.metric?.toLowerCase() ?? "";
    if (m.includes("[") || m.includes("tbd") || m.includes("placeholder") || m.includes("xx")) {
      flags.push({
        id: flagId(), ruleId: "RR-04", category: "evidence-integrity", severity: "review",
        message: `"${item.title}" appears to have an unresolved metric placeholder. Review this before finalizing.`,
        affectedSectionId: null, affectedItemId: item.id, dismissed: false,
      });
    }
  }

  // RR-05: Outcome field contains only activity language
  const activityVerbs = ["attended", "participated", "supported", "helped with", "was involved in", "contributed to meetings", "joined"];
  for (const item of evidence) {
    const outcome = item.outcome?.toLowerCase() ?? "";
    if (outcome && activityVerbs.some((v) => outcome.startsWith(v)) && outcome.length < 80) {
      flags.push({
        id: flagId(), ruleId: "RR-05", category: "evidence-integrity", severity: "review",
        message: `"${item.title}" — the outcome field may describe an activity rather than a result. Review this before finalizing.`,
        affectedSectionId: null, affectedItemId: item.id, dismissed: false,
      });
    }
  }

  // RR-06: Evidence confidence is "needs-verification"
  for (const item of evidence) {
    if (item.confidence === "needs-verification") {
      flags.push({
        id: flagId(), ruleId: "RR-06", category: "evidence-integrity", severity: "information",
        message: `"${item.title}" is marked as needing verification. Confirm the source before using it in your final response.`,
        affectedSectionId: null, affectedItemId: item.id, dismissed: false,
      });
    }
  }

  // RR-07: Rating 4 or 5 with fewer than 2 evidence items
  for (const id of ratedSections) {
    const rating = state.sectionState[id]?.selectedRating;
    const linked = state.sectionState[id]?.linkedEvidenceIds ?? [];
    if (rating && rating >= 4 && linked.length < 2) {
      flags.push({
        id: flagId(), ruleId: "RR-07", category: "calibration-integrity", severity: "important",
        message: `${sectionLabel(id)} has a rating of ${rating} but fewer than two pieces of supporting evidence. Review this before finalizing.`,
        affectedSectionId: id, affectedItemId: null, dismissed: false,
      });
    }
  }

  // RR-08: Overall rating more than 1 point above all section ratings
  const overallRating = state.sectionState["overall-rating"]?.selectedRating;
  const sectionRatings = ratedSections
    .filter((id) => id !== "overall-rating")
    .map((id) => state.sectionState[id]?.selectedRating)
    .filter(Boolean) as number[];
  if (overallRating && sectionRatings.length > 0) {
    const maxSection = Math.max(...sectionRatings);
    if (overallRating > maxSection + 1) {
      flags.push({
        id: flagId(), ruleId: "RR-08", category: "calibration-integrity", severity: "review",
        message: `Your overall rating appears higher than your section ratings suggest. Review this before finalizing. (The overall rating should generally align with the other ratings, though it need not be an exact average.)`,
        affectedSectionId: "overall-rating", affectedItemId: null, dismissed: false,
      });
    }
  }

  // RR-09: All dated evidence clusters in one part of the period
  const datedItems = evidence.filter((e) => e.datePeriod?.trim());
  if (datedItems.length >= 3) {
    const q4indicators = ["q4", "oct", "nov", "dec", "october", "november", "december"];
    const allRecent = datedItems.every((e) =>
      q4indicators.some((q) => e.datePeriod.toLowerCase().includes(q))
    );
    if (allRecent) {
      flags.push({
        id: flagId(), ruleId: "RR-09", category: "calibration-integrity", severity: "review",
        message: "All your dated evidence appears to be from the most recent period. Review this before finalizing — consider whether earlier-period examples are missing.",
        affectedSectionId: null, affectedItemId: null, dismissed: false,
      });
    }
  }

  // RR-10: One evidence item linked to all content sections
  for (const item of evidence) {
    const linkedCount = contentSections.filter((id) =>
      (state.sectionState[id]?.linkedEvidenceIds ?? []).includes(item.id)
    ).length;
    if (linkedCount >= contentSections.length) {
      flags.push({
        id: flagId(), ruleId: "RR-10", category: "calibration-integrity", severity: "review",
        message: `"${item.title}" supports all assessment sections. Review this before finalizing — one example should not carry the entire assessment.`,
        affectedSectionId: null, affectedItemId: item.id, dismissed: false,
      });
    }
  }

  // RR-11: Development step not actionable
  const devStep = state.developmentPlan?.nextStep?.trim() ?? "";
  if (devStep && devStep.split(" ").length < 5) {
    flags.push({
      id: flagId(), ruleId: "RR-11", category: "narrative-quality", severity: "review",
      message: "Your development next step is very brief. Review this before finalizing — a concrete, actionable step is more useful than a general statement.",
      affectedSectionId: "development-planning", affectedItemId: null, dismissed: false,
    });
  }

  // RR-12: Values response has no specific example
  const valuesExample = state.sectionState["values-in-action"]?.notes?.trim() ?? "";
  const valuesDraft = state.sectionState["values-in-action"]?.draftResponse?.trim() ?? "";
  const hasValuesContent = valuesExample || valuesDraft;
  if (hasValuesContent && !Object.values(state.valueReflections).some(v => v.specificExample?.trim())) {
    flags.push({
      id: flagId(), ruleId: "RR-12", category: "narrative-quality", severity: "review",
      message: "Values in Action does not include a specific example. Review this before finalizing — the official question asks for one.",
      affectedSectionId: "values-in-action", affectedItemId: null, dismissed: false,
    });
  }

  // RR-13: Goal deprioritized with no explanation
  for (const goal of goals) {
    if (
      (goal.classification === "deprioritized" || goal.classification === "modified" || goal.classification === "replaced") &&
      !goal.changedPriorityExplanation?.trim()
    ) {
      flags.push({
        id: flagId(), ruleId: "RR-13", category: "goal-integrity", severity: "important",
        message: `Goal "${goal.title}" is classified as ${goal.classification} but has no explanation. Review this before finalizing.`,
        affectedSectionId: "goal-achievement", affectedItemId: goal.id, dismissed: false,
      });
    }
  }

  // RR-14: Goal status contradiction
  for (const goal of goals) {
    if (goal.contradictionNote?.trim()) {
      flags.push({
        id: flagId(), ruleId: "RR-14", category: "goal-integrity", severity: "important",
        message: `Goal "${goal.title}" has a noted status contradiction. Review this before finalizing.`,
        affectedSectionId: "goal-achievement", affectedItemId: goal.id, dismissed: false,
      });
    }
  }

  // RR-15: Leadership example may contain identifying detail
  if (state.profile?.isManager) {
    const coaching = state.leadershipReflection?.coachingExample ?? "";
    if (coaching.length > 50) {
      flags.push({
        id: flagId(), ruleId: "RR-15", category: "privacy", severity: "information",
        message: "Your leadership coaching example may include identifiable details about a team member. Review this before copying or exporting.",
        affectedSectionId: "leadership", affectedItemId: null, dismissed: false,
      });
    }
  }

  return flags;
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
