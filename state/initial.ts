import type {
  AppState,
  DevelopmentPlan,
  LeadershipReflection,
  QuestionId,
  SectionState,
  LiftValueId,
  ValueReflection,
} from "./types";

const SECTION_IDS: QuestionId[] = [
  "role-performance",
  "goal-achievement",
  "impact",
  "values-in-action",
  "development-planning",
  "leadership",
  "overall-rating",
];

function emptySectionState(): SectionState {
  return {
    status: "not-started",
    linkedEvidenceIds: [],
    notes: "",
    selectedRating: null,
    draftResponse: "",
    lastVisitedAt: null,
  };
}

const LIFT_VALUE_IDS: LiftValueId[] = [
  "lead-with-integrity",
  "inspire-through-curiosity",
  "focus-on-outcomes",
  "thrive-together",
];

function emptyValueReflection(valueId: LiftValueId): ValueReflection {
  return { valueId, notes: "", specificExample: "" };
}

const emptyDevelopmentPlan: DevelopmentPlan = {
  area: "",
  whyItMatters: "",
  evidenceSupporting: "",
  nextStep: "",
  supportNeeded: "",
  observableProgress: "",
};

const emptyLeadershipReflection: LeadershipReflection = {
  coachingExample: "",
  feedbackApproach: "",
  difficultConversations: "",
  developmentSupport: "",
  resultingClarity: "",
};

export function createInitialState(): AppState {
  return {
    schemaVersion: 1,
    profile: null,
    firstRunComplete: false,
    evidence: {},
    goals: {},
    impactItems: {},
    valueReflections: Object.fromEntries(
      LIFT_VALUE_IDS.map((id) => [id, emptyValueReflection(id)])
    ) as Record<LiftValueId, ValueReflection>,
    developmentPlan: emptyDevelopmentPlan,
    leadershipReflection: emptyLeadershipReflection,
    sectionState: Object.fromEntries(
      SECTION_IDS.map((id) => [id, emptySectionState()])
    ) as Record<QuestionId, SectionState>,
    lastSavedAt: null,
  };
}
