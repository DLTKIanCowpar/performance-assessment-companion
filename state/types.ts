// ─── Content status ───────────────────────────────────────────────────────────

export type ContentStatus =
  | "approved"
  | "draft"
  | "provisional"
  | "placeholder"
  | "superseded";

// ─── Disciplines ──────────────────────────────────────────────────────────────

export type DisciplineId =
  | "engineering"
  | "product-management"
  | "quality-engineering"
  | "ux-design"
  | "ux-research"
  | "other";

// ─── Assessment question IDs ──────────────────────────────────────────────────

export type QuestionId =
  | "role-performance"
  | "goal-achievement"
  | "impact"
  | "values-in-action"
  | "development-planning"
  | "leadership"
  | "overall-rating";

// ─── Rating ───────────────────────────────────────────────────────────────────

export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface RatingAnchor {
  value: RatingValue;
  label: string;
  description: string;
}

export interface RatingScale {
  id: string;
  anchors: RatingAnchor[];
}

// ─── Evidence ─────────────────────────────────────────────────────────────────

export type EvidenceConfidence =
  | "verified"
  | "partially-verified"
  | "qualitative"
  | "being-measured"
  | "needs-verification";

export type VerificationStatus = "verified" | "pending" | "not-started";

export interface EvidenceItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  datePeriod: string;
  situation: string;
  contribution: string;
  output: string;
  outcome: string;
  metric: string;
  sourceReference: string;
  confidence: EvidenceConfidence;
  isSharedResult: boolean;
  individualPartInSharedResult: string;
  relatedSectionIds: QuestionId[];
  relatedGoalIds: string[];
  tags: string[];
  verificationStatus: VerificationStatus;
}

// ─── Goals ────────────────────────────────────────────────────────────────────

export type GoalClassification =
  | "complete"
  | "current"
  | "deprioritized"
  | "modified"
  | "replaced"
  | "needs-clarification";

export type OwnershipType = "sole" | "shared" | "partial-period";

export interface Goal {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  plannedResult: string;
  actualResult: string;
  progress: string;
  sourceStatus: string;
  classification: GoalClassification;
  metric: string;
  evidenceNotes: string;
  ownershipType: OwnershipType;
  ownershipPeriod: string;
  sharedOwnershipDetails: string;
  changedPriorityExplanation: string;
  outsideControlContext: string;
  contradictionNote: string;
  verificationState: VerificationStatus;
  relatedEvidenceIds: string[];
}

// ─── Section state ────────────────────────────────────────────────────────────

export type SectionStatus = "not-started" | "in-progress" | "ready";

export interface SectionState {
  status: SectionStatus;
  linkedEvidenceIds: string[];
  notes: string;
  selectedRating: RatingValue | null;
  draftResponse: string;
  lastVisitedAt: string | null;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export type TimeInRole =
  | "full-period"
  | "joined-during"
  | "changed-roles-during";

export interface UserProfile {
  name: string;
  discipline: DisciplineId;
  levelCode: string;
  roleTitle: string;
  isManager: boolean;
  timeInRole: TimeInRole;
  roleChangeContext: string;
  assessmentPeriodNotes: string;
}

// ─── Impact items ─────────────────────────────────────────────────────────────

export type ImpactCategory =
  | "customer"
  | "business"
  | "financial"
  | "operational"
  | "quality"
  | "team"
  | "employee"
  | "risk"
  | "learning"
  | "other";

export interface ImpactItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  category: ImpactCategory;
  startingCondition: string;
  contribution: string;
  change: string;
  evidence: string;
  scope: string;
  confidence: EvidenceConfidence;
  attribution: string;
  remainingUncertainty: string;
  relatedEvidenceIds: string[];
}

// ─── Value reflections ────────────────────────────────────────────────────────

export type LiftValueId =
  | "lead-with-integrity"
  | "inspire-through-curiosity"
  | "focus-on-outcomes"
  | "thrive-together";

export interface ValueReflection {
  valueId: LiftValueId;
  notes: string;
  specificExample: string;
}

// ─── Development plan ─────────────────────────────────────────────────────────

export interface DevelopmentPlan {
  area: string;
  whyItMatters: string;
  evidenceSupporting: string;
  nextStep: string;
  supportNeeded: string;
  observableProgress: string;
}

// ─── Leadership reflection ────────────────────────────────────────────────────

export interface LeadershipReflection {
  coachingExample: string;
  feedbackApproach: string;
  difficultConversations: string;
  developmentSupport: string;
  resultingClarity: string;
}

// ─── Review flags ─────────────────────────────────────────────────────────────

export type ReviewFlagSeverity = "information" | "review" | "important";
export type ReviewFlagCategory =
  | "evidence-integrity"
  | "calibration-integrity"
  | "narrative-quality"
  | "goal-integrity"
  | "privacy";

export interface ReviewFlag {
  id: string;
  ruleId: string;
  category: ReviewFlagCategory;
  severity: ReviewFlagSeverity;
  message: string;
  affectedSectionId: QuestionId | null;
  affectedItemId: string | null;
  dismissed: boolean;
}

// ─── App state ────────────────────────────────────────────────────────────────

export interface AppState {
  schemaVersion: number;
  profile: UserProfile | null;
  firstRunComplete: boolean;
  evidence: Record<string, EvidenceItem>;
  goals: Record<string, Goal>;
  impactItems: Record<string, ImpactItem>;
  valueReflections: Record<LiftValueId, ValueReflection>;
  developmentPlan: DevelopmentPlan;
  leadershipReflection: LeadershipReflection;
  sectionState: Record<QuestionId, SectionState>;
  lastSavedAt: string | null;
}

// ─── Content types ────────────────────────────────────────────────────────────

export interface ContentSourceRef {
  filename: string;
  status: ContentStatus;
  lastReviewedDate: string;
  notes: string;
}

export interface CalibrationDimension {
  name: string;
  selfCheckQuestions: string[];
}

export interface CalibrationLevel {
  id: string;
  discipline: DisciplineId;
  levelCode: string;
  title: string;
  status: ContentStatus;
  employeeFacing: {
    scope: CalibrationDimension;
    complexity: CalibrationDimension;
    influence: CalibrationDimension;
    aiWorkflow: CalibrationDimension;
    exampleOutcome: string;
    selfCheck: string;
  };
  source: ContentSourceRef;
}

export interface DisciplineConfig {
  id: DisciplineId;
  label: string;
  status: ContentStatus;
  levels: CalibrationLevel[];
  source: ContentSourceRef;
}

export interface AssessmentQuestion {
  id: QuestionId;
  sectionNumber: number;
  title: string;
  selfAssessmentQuestion: string;
  responseType: "rated" | "open-text";
  ratingScaleId: string | null;
  isRequired: boolean;
  applicability: "all-employees" | "people-managers-only";
  howToRateSelf: string;
  status: ContentStatus;
  source: ContentSourceRef;
}

export interface LiftValue {
  id: LiftValueId;
  shortName: string;
  fullName: string;
  definition: string;
  inPractice: string;
  ptContext: string[];
  reflectionPrompts: string[];
  status: ContentStatus;
  source: ContentSourceRef;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  promptText: string;
  instructions: string;
  warningText: string | null;
  status: ContentStatus;
  source: ContentSourceRef;
}
