import { describe, it, expect } from "vitest";
import { evaluateReviewRules } from "../../lib/review-rules/rules";
import { createInitialState } from "../../state/initial";
import type { AppState, EvidenceItem, Goal } from "../../state/types";

function makeState(overrides: Partial<AppState> = {}): AppState {
  return { ...createInitialState(), ...overrides };
}

function makeEvidence(overrides: Partial<EvidenceItem> = {}): EvidenceItem {
  return {
    id: "ev1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: "Test evidence",
    datePeriod: "",
    situation: "Initial state",
    contribution: "My contribution",
    output: "A deliverable",
    outcome: "Something improved",
    metric: "10%",
    sourceReference: "",
    confidence: "verified",
    isSharedResult: false,
    individualPartInSharedResult: "",
    relatedSectionIds: ["role-performance"],
    relatedGoalIds: [],
    tags: [],
    verificationStatus: "verified",
    ...overrides,
  };
}

function makeGoal(overrides: Partial<Goal> = {}): Goal {
  return {
    id: "g1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: "Test goal",
    plannedResult: "Deliver X",
    actualResult: "Delivered X",
    progress: "100%",
    sourceStatus: "Complete",
    classification: "complete",
    metric: "",
    evidenceNotes: "",
    ownershipType: "sole",
    ownershipPeriod: "",
    sharedOwnershipDetails: "",
    changedPriorityExplanation: "",
    outsideControlContext: "",
    contradictionNote: "",
    verificationState: "verified",
    relatedEvidenceIds: [],
    ...overrides,
  };
}

describe("Review rules", () => {
  it("RR-01: flags section with no evidence when in-progress", () => {
    const state = makeState({
      sectionState: {
        ...createInitialState().sectionState,
        "role-performance": {
          status: "in-progress",
          linkedEvidenceIds: [],
          notes: "",
          selectedRating: null,
          draftResponse: "",
          lastVisitedAt: null,
        },
      },
    });
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-01" && f.affectedSectionId === "role-performance")).toBe(true);
  });

  it("RR-01: does not flag not-started sections", () => {
    const state = makeState();
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-01")).toBe(false);
  });

  it("RR-03: flags shared result with no individual contribution", () => {
    const ev = makeEvidence({ isSharedResult: true, individualPartInSharedResult: "" });
    const state = makeState({ evidence: { ev1: ev } });
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-03")).toBe(true);
  });

  it("RR-03: does not flag shared result with contribution described", () => {
    const ev = makeEvidence({ isSharedResult: true, individualPartInSharedResult: "I led the research phase" });
    const state = makeState({ evidence: { ev1: ev } });
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-03")).toBe(false);
  });

  it("RR-07: flags rating 4 with fewer than 2 evidence items", () => {
    const ev = makeEvidence();
    const state = makeState({
      evidence: { ev1: ev },
      sectionState: {
        ...createInitialState().sectionState,
        "role-performance": {
          status: "in-progress",
          linkedEvidenceIds: ["ev1"],
          notes: "",
          selectedRating: 4,
          draftResponse: "",
          lastVisitedAt: null,
        },
      },
    });
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-07" && f.affectedSectionId === "role-performance")).toBe(true);
  });

  it("RR-07: does not flag rating 4 with 2 or more evidence items", () => {
    const ev1 = makeEvidence({ id: "ev1" });
    const ev2 = makeEvidence({ id: "ev2", title: "Second" });
    const state = makeState({
      evidence: { ev1, ev2 },
      sectionState: {
        ...createInitialState().sectionState,
        "role-performance": {
          status: "in-progress",
          linkedEvidenceIds: ["ev1", "ev2"],
          notes: "",
          selectedRating: 4,
          draftResponse: "",
          lastVisitedAt: null,
        },
      },
    });
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-07" && f.affectedSectionId === "role-performance")).toBe(false);
  });

  it("RR-13: flags deprioritized goal with no explanation", () => {
    const goal = makeGoal({ classification: "deprioritized", changedPriorityExplanation: "" });
    const state = makeState({ goals: { g1: goal } });
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-13")).toBe(true);
  });

  it("RR-13: does not flag deprioritized goal with explanation", () => {
    const goal = makeGoal({ classification: "deprioritized", changedPriorityExplanation: "Formal decision in Q3 planning" });
    const state = makeState({ goals: { g1: goal } });
    const flags = evaluateReviewRules(state);
    expect(flags.some((f) => f.ruleId === "RR-13")).toBe(false);
  });

  it("produces no flags on an empty initial state", () => {
    const flags = evaluateReviewRules(createInitialState());
    expect(flags).toHaveLength(0);
  });
});
