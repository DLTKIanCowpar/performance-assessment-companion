# Implementation Plan

P&T Performance Assessment Companion  
Generated: 2026-10-19  
Status: Pre-build — awaiting review before coding begins

---

## 1. Architecture Decisions

### 1.1 Stack

| Concern | Decision | Rationale |
|---|---|---|
| Framework | Next.js 14+ with App Router | Clean route structure, future auth integration, client-side MVP with no server complexity today |
| Language | TypeScript strict mode | Required by design brief; all content and state must be typed |
| Styling | Tailwind CSS | Design brief requirement |
| Component library | shadcn/ui | Accessible primitives, composable, no runtime dependency |
| Forms | React Hook Form + Zod | Brief requirement; schema validation drives content integrity |
| State | Zustand with `persist` middleware | Brief requirement; simpler than Redux for local-first app; persistence baked in |
| Icons | Lucide React | Brief requirement |
| Testing | Vitest + React Testing Library + Playwright | Brief requirement |
| Linting | ESLint + Prettier | Brief requirement |

### 1.2 Persistence

- Primary: `localStorage` via Zustand `persist` middleware
- Storage key: `pt-performance-assessment-companion-v1`
- Schema versioning in the persisted object root: `{ schemaVersion: 1, ... }`
- Migrations: run on hydration, keyed by schema version
- Autosave: debounced 800ms after any state mutation
- Backup: JSON export of entire app state, schema-versioned
- Restore: validated import — invalid JSON or wrong schema version does not overwrite current state
- Failure: graceful catch on storage quota errors; user notified

### 1.3 Routing

All routes are client-side. No server routes in MVP.

| Path | View |
|---|---|
| `/` | First-run welcome OR redirect to `/overview` if profile exists |
| `/overview` | Overview dashboard |
| `/profile` | My Context (profile setup) |
| `/evidence` | Evidence Library |
| `/role-performance` | Role Performance section |
| `/goal-achievement` | Goal Achievement section |
| `/impact` | Impact section |
| `/values` | Values in Action section |
| `/development` | Development Planning section |
| `/leadership` | Leadership section (people managers only — redirect away if not PM) |
| `/builder` | Assessment Builder |
| `/review` | Final Review |
| `/export` | Export & Data |

### 1.4 Content Architecture

All content lives in `src/content/` as TypeScript files with Zod schemas.  
**No content is hardcoded into UI components.**  
Content is imported at build time — no runtime file parsing.

Content status values: `approved | draft | provisional | placeholder | superseded`

Draft or provisional content displays a notice badge. Internal notes and manager-only content never render in employee views.

### 1.5 Evidence Model

The evidence library is a first-class global store, not a per-section textarea.

`EvidenceItem` is created once and linked to sections by ID reference.  
Sections display linked evidence; they do not copy it.  
Draft builder reads evidence by reference.  
Final Review counts unique evidence items, not links.

---

## 2. Content Model

### 2.1 Content files (src/content/)

```
src/content/
  assessment-questions.ts       # Official questions (employee + manager versions)
  rating-scales.ts              # 5-point scale anchors per section
  lift-values.ts                # LIFT definitions, P&T context, reflection prompts
  disciplines/
    engineering.ts              # IC1-IC7 calibration dimensions
    product-management.ts       # IC1-IC7 calibration dimensions
    quality-engineering.ts      # IC1-IC5 (DRAFT status on IC1-IC2; IC6-IC7 absent)
    ux-design.ts                # IC1-IC7 calibration dimensions
    ux-research.ts              # IC1-IC7 calibration dimensions
    _other.ts                   # Fallback for disciplines without approved guides
  prompts.ts                    # Goal assessment prompt, AI guidance templates
  notices.ts                    # UI notices (provisional, missing guidance, etc.)
  source-manifest.ts            # Source document metadata for all content
```

### 2.2 Discipline content shape (per level)

```typescript
interface CalibrationLevel {
  id: string                    // e.g. "eng-ic3"
  discipline: DisciplineId
  levelCode: string             // "IC3"
  title: string                 // "Senior Software Engineer"
  status: ContentStatus
  employeeFacing: {
    dimensions: CalibrationDimension[]
    selfCheckQuestions: string[]
    exampleOutcome: string
  }
  managerOnly: {
    evidenceToReview: string
    calibrationPrompt: string
    calibrationStandard: string
  }
  source: ContentSourceRef
}
```

### 2.3 Assessment question shape

```typescript
interface AssessmentQuestion {
  id: QuestionId                // "role-performance" | "goal-achievement" | ...
  sectionNumber: number         // 1-7 per official form
  title: string
  selfAssessmentQuestion: string
  managerVersion: string        // stored but never rendered in employee experience
  responseType: "rated" | "open-text"
  ratingScaleId?: string
  isRequired: boolean
  applicability: "all-employees" | "people-managers-only"
  howToRate: {
    selfAssessment: string
    manager: string             // stored but never rendered in employee experience
  }
  status: ContentStatus
  source: ContentSourceRef
}
```

### 2.4 Evidence item shape

```typescript
interface EvidenceItem {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  datePeriod?: string
  situation: string
  contribution: string
  output: string
  outcome: string
  metric?: string
  sourceReference?: string
  confidence: EvidenceConfidence  // "verified" | "partially-verified" | "qualitative" | "being-measured" | "needs-verification"
  isSharedResult: boolean
  individualPartInSharedResult?: string
  relatedSectionIds: QuestionId[]
  relatedGoalIds: string[]
  relatedCalibrationDimensions: string[]
  tags: string[]
  verificationStatus: VerificationStatus
}
```

### 2.5 Goal shape

```typescript
interface Goal {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  plannedResult: string
  actualResult?: string
  progress?: string
  sourceStatus?: string
  classification: GoalClassification  // "complete" | "current" | "deprioritized" | "modified" | "replaced" | "needs-clarification"
  metric?: string
  evidenceNotes?: string
  ownershipType: "sole" | "shared" | "partial-period"
  ownershipPeriod?: string
  sharedOwnershipDetails?: string
  changedPriorityExplanation?: string
  outsideControlContext?: string
  contradictionNote?: string
  verificationState: VerificationStatus
  relatedEvidenceIds: string[]
}
```

---

## 3. Application Structure

```
src/
  app/
    layout.tsx                  # Root layout (sidebar, theme, autosave, hydration guard)
    page.tsx                    # First-run gate
    overview/page.tsx
    profile/page.tsx
    evidence/page.tsx
    role-performance/page.tsx
    goal-achievement/page.tsx
    impact/page.tsx
    values/page.tsx
    development/page.tsx
    leadership/page.tsx
    builder/page.tsx
    review/page.tsx
    export/page.tsx

  components/
    layout/
      AppShell.tsx              # Sidebar + content area + mobile drawer
      Sidebar.tsx
      SectionHeader.tsx         # Official question display with status badge
      SectionNav.tsx            # Previous / Continue controls
    shared/
      ContentStatusBadge.tsx    # Draft / Provisional / Approved indicators
      RatingSelector.tsx        # Accessible 5-point scale (never preselects)
      ReviewFlag.tsx            # Advisory flag with severity
      ConfirmDialog.tsx
      AutosaveIndicator.tsx
    evidence/
      EvidenceLibrary.tsx
      EvidenceCard.tsx
      EvidenceEditor.tsx        # Full structured evidence form
      EvidenceFilter.tsx
      EvidencePicker.tsx        # Multi-select for linking to sections
    goals/
      GoalList.tsx
      GoalEditor.tsx
      GoalClassificationPicker.tsx
      QuantumChecklist.tsx
    assessment/
      OfficialQuestion.tsx      # Renders official question text prominently
      CalibrationGuide.tsx      # Level-specific guidance with adjacent-level disclosure
      DraftResponse.tsx         # Editable response with evidence links
    calibration/
      LevelSelector.tsx         # Centered current level, adjacent optional
      DimensionCard.tsx
    prompts/
      PromptCopy.tsx            # AI prompt with redaction warning
      PromptLibrary.tsx
    export/
      ExportPanel.tsx
      PrintView.tsx
    review/
      ReviewFlagList.tsx
      ReviewLens.tsx            # Evidence / Calibration / Narrative lenses

  content/
    [all content files above]

  hooks/
    useAppState.ts              # Zustand store selector wrappers
    useProgress.ts              # Derived progress calculation
    useReviewFlags.ts           # Deterministic review rule evaluation
    useDraftBuilder.ts          # Local draft assembly
    useExport.ts                # Markdown and JSON export
    useAutosave.ts

  lib/
    content/
      loader.ts                 # Content registry, discipline lookup, level lookup
      validator.ts              # Zod validation of content at build time
    persistence/
      store.ts                  # Zustand store definition
      migrations.ts             # Schema version migrations
      storage.ts                # localStorage wrapper with error handling
    draft-builder/
      builder.ts                # Assembles draft from evidence refs (no invention)
      styles.ts                 # Concise / Evidence-forward / Conversation-ready
    export/
      markdown.ts               # Full assessment Markdown export
      json.ts                   # JSON backup and restore
      print.ts                  # Print-view layout
    review-rules/
      rules.ts                  # All 14+ review rules, deterministic
      engine.ts                 # Rule evaluation against app state
    progress/
      calculator.ts             # Section completion, overall %, next-step logic
    validation/
      schemas.ts                # Zod schemas for all data types

  state/
    types.ts                    # All TypeScript interfaces
    initial.ts                  # Default/empty app state

  tests/
    unit/
    component/
    e2e/

scripts/
  validate-content.ts           # Build-time content validation, fails on violations
  generate-source-report.ts     # Source manifest report

docs/
  SOURCE_INVENTORY.md
  IMPLEMENTATION_PLAN.md
  PRODUCT_GAPS.md               # Created during build
  TEST_REPORT.md                # Created during build
```

---

## 4. State Management

Single Zustand store, persisted to localStorage.

```typescript
interface AppState {
  schemaVersion: number
  profile: UserProfile | null
  firstRunComplete: boolean
  evidence: Record<string, EvidenceItem>
  goals: Record<string, Goal>
  sectionState: Record<QuestionId, SectionState>
  assessmentResponses: Record<QuestionId, AssessmentResponse>
  reviewFlags: ReviewFlag[]                     // derived, not source-of-truth
  lastSavedAt: string | null
}
```

`reviewFlags` are re-derived on demand from `useReviewFlags` hook — never persisted as a source-of-truth. Progress stats are also derived, not stored.

Changing `profile.discipline` or `profile.level` does not delete evidence, goals, or responses — it only changes which calibration guide loads.

---

## 5. Build Phases

### Phase 1 — Foundation (no UI)
- [ ] Initialize Next.js project with TypeScript strict, Tailwind, shadcn/ui
- [ ] Create all TypeScript type definitions (`src/state/types.ts`)
- [ ] Build all Zod schemas (`src/lib/validation/schemas.ts`)
- [ ] Create all content files (`src/content/`)
- [ ] Write content validation script (fails build on violations)
- [ ] Create Zustand store with persist + migrations
- [ ] Create localStorage wrapper
- [ ] Write unit tests for: content schemas, migrations, progress calc, review rules, draft builder, export

**Gate:** `pnpm typecheck && pnpm lint && pnpm test` all pass. Build passes.

### Phase 2 — Shell and Profile
- [ ] Application shell (sidebar, mobile drawer, routing)
- [ ] First-run welcome screen
- [ ] Profile setup (discipline, level, manager status, time-in-role)
- [ ] Overview dashboard with dynamic recommendations
- [ ] Save status + autosave indicator

**Gate:** Full-period employee can navigate all routes. Profile persists on refresh.

### Phase 3 — Evidence and Goals
- [ ] Evidence Library (full CRUD, filtering, confidence, shared-result)
- [ ] Goal Achievement section (checklist, goal editor, classification, contradiction handling)
- [ ] Evidence linking to sections and goals

**Gate:** Can add 5 evidence items, link them to sections, add 3 goals with classifications, survive refresh.

### Phase 4 — Assessment Sections
- [ ] Role Performance (calibration guide, evidence linking, rating selector)
- [ ] Impact (activity-to-impact check, evidence linking)
- [ ] Values in Action (LIFT reflection, one-example capture, holistic rating)
- [ ] Development Planning (structured single-area, single-step form)
- [ ] Leadership (conditional; people-manager evidence capture)

**Gate:** All sections operable; Leadership hidden for non-managers; discipline guides load correctly; provisional notice shows for QE.

### Phase 5 — Synthesis
- [ ] Assessment Builder (per-section draft assembly, evidence display, copy)
- [ ] Local draft builder (three styles, no invention)
- [ ] Final Review (three lenses, all review rules)
- [ ] Missing-evidence and flag notices

**Gate:** Draft builder produces output using only entered evidence. All 14 review rules fire correctly.

### Phase 6 — Export and Portability
- [ ] Markdown export (full assessment)
- [ ] JSON backup and restore (with import validation)
- [ ] Print view
- [ ] Copy individual / copy all responses
- [ ] Prompt library with AI copy

**Gate:** Export round-trip: export JSON, clear data, import, verify all data restored. Markdown export contains all sections.

### Phase 7 — Quality and Polish
- [ ] All Playwright E2E scenarios
- [ ] Accessibility audit (keyboard nav, focus states, screen-reader announcements)
- [ ] Mobile layout review
- [ ] Content status badges visible throughout
- [ ] Demo mode (pre-loaded sample data)

**Gate:** All quality gates from DESIGN-BRIEF.md §18 pass.

---

## 6. Review Rules

All rules are deterministic. No ML. No scoring. Advisory only.

| ID | Category | Trigger | Severity |
|---|---|---|---|
| RR-01 | Evidence integrity | Section has no evidence linked | Review |
| RR-02 | Evidence integrity | Only one substantive evidence item | Review |
| RR-03 | Evidence integrity | Shared result with no individual contribution described | Important |
| RR-04 | Evidence integrity | Metric field contains placeholder text | Review |
| RR-05 | Evidence integrity | Outcome field contains only activity language (heuristic) | Review |
| RR-06 | Evidence integrity | Evidence confidence is "needs-verification" | Information |
| RR-07 | Calibration integrity | Rating 4 or 5 with fewer than 2 evidence items | Important |
| RR-08 | Calibration integrity | Overall rating more than 1 point above all section ratings | Review |
| RR-09 | Calibration integrity | All dated evidence in one part of assessment period | Review |
| RR-10 | Calibration integrity | One evidence item linked to all sections | Review |
| RR-11 | Narrative quality | Development step is not actionable (less than 10 words) | Review |
| RR-12 | Narrative quality | Values response has no specific example | Review |
| RR-13 | Goal integrity | Goal classified deprioritized with no explanation | Important |
| RR-14 | Goal integrity | Goal status fields contradict each other | Important |
| RR-15 | Privacy | Leadership example may contain identifying detail (heuristic) | Information |

All flag messages use neutral language: "Review this before finalizing." Never "Your rating is wrong."

---

## 7. Testing Strategy

### Unit (Vitest)
- Content schema validation (every content file)
- Progress calculation (empty, partial, complete states)
- Review rule evaluation (all 15 rules, each with a failing and passing case)
- Draft builder (output contains no unsupported claims)
- Markdown export (all sections present)
- JSON export/import round-trip
- State migrations (v1→v2 shape)
- Evidence reuse counting (one item linked to 5 sections = 1 unique)

### Component (React Testing Library)
- Profile setup: discipline changes update level options
- Evidence editor: all fields save; confidence selector accessible
- Rating selector: no default selection; keyboard navigable
- Leadership section: renders only when `isManager=true`
- Review flag: correct icon per severity; keyboard dismissable
- Export controls: JSON download triggers; import rejects invalid schema

### E2E (Playwright) — 15 required scenarios from DESIGN-BRIEF.md §18

1. PM employee completes full assessment; data survives refresh
2. People manager sees Leadership section in nav and builder
3. Disabling manager status hides Leadership but preserves stored data
4. QE user sees provisional-content notice
5. "Other" discipline shows general-guidance mode
6. Shared goal triggers contribution-clarification review flag
7. Rating 5 with one evidence item triggers calibration flag (non-blocking)
8. Export JSON → clear data → import JSON → data recovered
9. Markdown export contains all sections with ratings and evidence
10. Mobile: full workflow usable on 375px viewport
11. Special characters and multiline content persist and export correctly
12. Invalid JSON import does not overwrite current data
13. Draft builder output contains no text not present in evidence entries
14. One evidence item supporting 5 sections counts as 1 unique item in review
15. Content validation rejects employee-facing content containing internal notes

### Quality gates before MVP complete
- `pnpm typecheck` passes
- `pnpm lint` passes
- `pnpm test` passes (unit + component)
- `pnpm test:e2e` passes (all 15 scenarios)
- `pnpm build` passes with no errors
- No console errors in production build
- No primary controls non-functional
- No placeholder content presented as approved
- Data survives browser refresh
- Backup/restore round-trip works
- Core flow works with no external AI connection

---

## 8. Key Assumptions

1. No existing code in the repository — building from scratch into this directory.
2. Node.js 18+ and pnpm available in the build environment.
3. Content owner will supply updated QE guide before distribution; app will show provisional notice in the meantime.
4. Section 06 does not exist in the official assessment (numbering is 01–05, 07, 08); will confirm before content is finalized.
5. Rating label set from the PDF is canonical — "Meets Some Expectations" not "Partially Achieves."
6. UX Research level titles will be left as "IC1 Researcher" through "IC7 Researcher" until content owner supplies names.
7. Manager calibration content is stored in content files but never rendered in the employee experience in MVP.
8. No authentication, no server, no external API calls in MVP.

---

## 9. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| QE guide remains draft at demo time | High | Medium | Provisional notice built into content system; general guidance mode available |
| Section 06 exists and was missed | Low | Medium | Flag to content owner; content system is additive |
| Rating label discrepancy causes confusion | Medium | Low | Use PDF labels as canonical; document in source manifest |
| Employee attempts to use QE guide for levels above IC5 | Medium | Medium | "Guidance not available" message rendered automatically |
| localStorage quota exceeded with large evidence sets | Low | High | Graceful error handling; early export reminder |
| Content drift between source documents and application | Medium | High | Source manifest with version metadata; content validation script |
| Demo environment uses a different browser that clears local storage | Medium | High | JSON export prominently surfaced throughout; demo-mode seed data |
