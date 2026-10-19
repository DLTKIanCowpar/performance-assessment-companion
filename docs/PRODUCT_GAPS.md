# Product Gaps

P&T Performance Assessment Companion — MVP  
Generated: 2026-10-19

All gaps identified during implementation by comparing the running application against source content, the design brief, and performance-management best practices.

---

## Gap 001 — QE DRAFT guide shown with provisional notice but IC1/IC2 level mapping unconfirmed

**Issue:** Quality Engineering IC1 and IC2 rows are extrapolated from the Engineering guide pattern. No QE JDs for entry or mid-level roles were available to the document authors.

**Impact:** An IC1 or IC2 QE employee receives guidance that may not match their actual expectations. Showing it at all — even with a provisional notice — risks anchoring to incorrect criteria.

**Fix:** Content owner (Nitin Sureka / HR) confirms level mapping before guide status is upgraded to `approved`. Application is wired to show `ContentStatusBadge` for any level with `status: "provisional"`. No code change required once content is updated.

**Classification:** MVP content gap — notice is live; resolution is content-owner action.

---

## Gap 002 — UX Research level titles are generic

**Issue:** The UXR calibration guide does not include named role titles (unlike UX Design). The application uses generic labels ("IC1 Researcher" through "IC7 Researcher") until content owner supplies names.

**Impact:** Low — employees can still identify their level by code. Title ambiguity may cause mild confusion in the level selector.

**Fix:** Content owner supplies role titles; a single content file update (`ux-research.ts`) resolves it. No code change required.

**Classification:** MVP content gap — no action needed from engineering.

---

## Gap 003 — No QE levels above IC5

**Issue:** The QE calibration guide contains no IC6 or IC7 rows. The application correctly shows "Detailed role guidance is not currently available" for these levels, but QE employees at higher levels have no calibration anchor at all — not even the placeholder engineering guide.

**Impact:** Medium. A QE IC6+ employee cannot access any discipline-specific guidance and may feel under-served.

**Fix (MVP):** Guidance-unavailable message is live. Consider adding a note directing these employees to their manager for calibration alignment.

**Fix (Future):** Content owner creates IC6/IC7 rows once JDs are confirmed.

**Classification:** MVP — acceptable with notice. Future content action.

---

## Gap 004 — Section 06 absent from assessment PDF

**Issue:** The 2026 Performance Assessment PDF numbers sections 01–05, then 07–08. Section 06 is absent. This may be intentional (no section 06 exists) or an export artifact.

**Impact:** If section 06 exists and was missed, employees would be preparing without guidance for that question.

**Fix:** Content owner confirms whether section 06 exists. Application is structured to add additional questions by appending to `assessment-questions.ts`.

**Classification:** MVP — flag to content owner; no code blocker.

---

## Gap 005 — Evidence Library has no temporal coverage indicator

**Issue:** The design brief (§11.5, §10.3) requires an assessment-period coverage indicator that flags when all evidence clusters in one period. The MVP does not display a visual timeline or period distribution chart.

**Impact:** Employees may submit assessments that over-represent recent work without noticing. RR-09 flags evidence clustered in Q4 keywords but only detects explicit date strings.

**Fix (MVP):** RR-09 review rule is live and fires based on date text heuristics. Coverage indicator is a "Should ship" item per the design brief.

**Fix (Future):** Add a simple quarter-distribution chart to the Evidence Library and Overview once evidence items have structured date fields.

**Classification:** Should-ship item deferred to post-MVP.

---

## Gap 006 — Draft builder is manual (no auto-assembly)

**Issue:** The design brief (§10.10) calls for a deterministic local draft builder that organizes bullets, groups evidence, and creates a first-person structure — in three styles (Concise, Evidence-forward, Conversation-ready). The MVP surfaces evidence links and a free-text draft field but does not auto-assemble a draft from linked evidence.

**Impact:** Employees must manually translate evidence into draft text. The builder provides the scaffolding but not the assembly. The design brief's "organize bullets, group evidence, create structure" functionality is not yet implemented.

**Fix:** Implement a client-side draft assembler in `lib/draft-builder/builder.ts` that reads linked evidence and produces a structured, first-person draft with explicit placeholders for missing metrics. All three styles must use the same facts — no invention.

**Classification:** MVP gap — partially addressed (structure exists, assembly not implemented). High priority for next iteration.

---

## Gap 007 — No backup reminder when meaningful work exists

**Issue:** The design brief requires a backup reminder "once meaningful work exists." The MVP shows a static warning on the Export page but does not proactively surface a backup prompt in the sidebar or Overview when evidence/goals exceed a threshold.

**Impact:** Low — the warning on the Export page is visible, but employees who do not navigate there may lose work.

**Fix:** Add a dismissable banner to the Overview and sidebar once the employee has 3+ evidence items or completed a section, prompting them to export a backup.

**Classification:** Should-ship — low engineering effort, addresses a real data-loss risk.

---

## Gap 008 — AI prompt copy has no redaction warning in UI

**Issue:** The design brief (§10.5, §11.8) requires a warning before copying AI prompts if they may contain sensitive employee information. The goal assessment prompt warning text is implemented, but the copy button on the Leadership section does not include an equivalent check.

**Impact:** A people manager may copy coaching examples containing identifiable details about team members into an external AI system.

**Fix:** The RR-15 flag (leadership example privacy check) fires in the Final Review. Additionally, add a pre-copy warning dialog to any AI prompt copy in the Leadership section.

**Classification:** MVP — RR-15 is live. Additional pre-copy guard is a Should-ship safety improvement.

---

## Gap 009 — No demo mode

**Issue:** The design brief (§19, Should ship) calls for a Demo mode with pre-loaded sample data that demonstrates a completed assessment. The MVP has no demo data.

**Impact:** The application is harder to demonstrate to stakeholders (Lisa Rabideau, Gaurav Kapoor, Dinakar Hituvalli) without a pre-populated state to walk through.

**Fix:** Create a `lib/demo/seed.ts` file with a complete sample AppState (Engineering IC4 PM, 4 evidence items, 3 goals, all sections in-progress) and a "Load demo" button on the Overview. Clear demo data before real use.

**Classification:** Should-ship — high demo value, low risk.

---

## Gap 010 — No automated test coverage

**Issue:** Vitest + Playwright are installed but no tests have been written yet. The design brief's 18 testing scenarios and quality gate requirements are not yet verified by automated tests.

**Impact:** Confidence in correct behavior relies entirely on manual verification. Data loss bugs, state migration errors, and review-rule regressions could ship undetected.

**Fix:** Write unit tests for: review rules (all 15), progress calculator, migrations, markdown export, JSON round-trip. Write Playwright e2e for the 5 most critical scenarios: full workflow, persistence on refresh, JSON backup/restore, leadership section gating, provisional content notice.

**Classification:** MVP gap — test suite must be written before calling the MVP complete.

---

## Gap 011 — Overall Rating section sits inside Builder, not its own route

**Issue:** The design brief lists Overall Rating as a distinct section (question 08). In the MVP, the overall rating is embedded in the Assessment Builder page rather than having its own URL. This means it doesn't appear in the sidebar nav and is not individually tracked as a section status.

**Impact:** Low — the rating is functional. But employees may not realize it needs to be completed, and it won't show as "not started" in the sidebar.

**Fix:** Either add an `/overall-rating` route with its own sidebar entry, or add explicit sidebar visibility for the rating embedded in the builder.

**Classification:** Polish — acceptable at demo, should be addressed before wider rollout.

---

## Gap 012 — Evidence items don't auto-link to sections when tagged

**Issue:** Evidence items support `relatedSectionIds` tagging, but the EvidencePicker operates independently. Tagging an evidence item with "Role Performance" in the Evidence Library does not automatically link it in the Role Performance section's `linkedEvidenceIds` — the user must also click "Link" in the EvidencePicker.

**Impact:** Confusing double-entry — users may think tagging is sufficient. Could result in evidence being tagged but not counted in the section or review rules.

**Fix:** When `relatedSectionIds` is updated on an EvidenceItem, automatically call `linkEvidenceToSection` for each new section ID. Similarly, when an item is unlinked from a section, remove it from `relatedSectionIds`. Keep the two in sync.

**Classification:** MVP — correctness gap. Low-effort fix.
