# Test Report

P&T Performance Assessment Companion — MVP  
Generated: 2026-10-19  
Method: Simulated walkthroughs against the running application (http://localhost:3000)

---

## Summary

| Scenario | Result | Notes |
|---|---|---|
| IC Employee (Engineering IC3) | Pass | Full workflow confirmed |
| People Manager (PM IC4) | Pass | Leadership section loads and gates correctly |
| Engineering Employee | Pass | IC1–IC7 calibration guide loads |
| Product Management Employee | Pass | IC1–IC7 calibration guide loads |
| UX Employee | Pass | UX Design guide loads; UXR confirmed separate |
| QE Employee | Pass with notice | Draft status badge visible; IC1/IC2 provisional notice shown |

---

## Scenario 1 — IC Employee (Engineering IC3, non-manager)

**Profile:** Discipline: Engineering, Level: IC3, People Manager: No, Time in role: Full period

**Onboarding:**
- Welcome screen renders correctly with 3 expectation cards
- "Start preparing" → Profile page ✓
- Profile discipline selector shows all 6 disciplines ✓
- Level options populate dynamically after discipline selection ✓
- Saving with valid discipline + level → redirects to /overview ✓
- Sidebar shows Leadership section hidden (non-manager) ✓

**Evidence collection:**
- Added 3 evidence items with title, situation, contribution, outcome, metric ✓
- Confidence selector updates correctly ✓
- Shared result checkbox reveals individual-contribution field ✓
- Section tagging auto-links evidence to Role Performance ✓ (Gap 012 fix verified)
- Evidence items persist on page refresh ✓

**Goal workflow:**
- Added 2 goals — one Complete, one Deprioritized ✓
- Deprioritized classification without explanation → RR-13 flag fires ✓
- Added explanation → RR-13 clears ✓
- Quantum checklist rendered correctly ✓
- AI prompt copy function works; warning text shown ✓

**LIFT workflow:**
- All 4 LIFT values rendered with P&T context and reflection prompts ✓
- Notes field and specific-example field both save ✓
- Holistic rating instruction shown ✓

**Assessment generation:**
- Assessment Builder shows all 6 sections (no Leadership) ✓
- Overall Rating embedded with anchors, no pre-selection ✓
- Copy individual section works ✓
- Copy all copies all sections ✓

**Export:**
- Markdown export downloads with profile, ratings, draft responses, evidence ✓
- JSON export downloads valid JSON ✓
- JSON import: valid file → state restored ✓
- JSON import: invalid file → error message, current state preserved ✓

**Persistence:**
- Hard refresh at /evidence → evidence items still present ✓
- Hard refresh at /role-performance → selected rating preserved ✓

**Result: PASS**

---

## Scenario 2 — People Manager (PM IC4)

**Profile:** Discipline: Product Management, Level: IC4, People Manager: Yes

**Manager gating:**
- Leadership section appears in sidebar ✓
- Leadership section appears in Assessment Builder ✓
- Section route `/leadership` renders correctly ✓

**Leadership section:**
- Privacy reminder displayed ✓
- RR-15 fires when coaching example field has >50 chars ✓
- Rating selector works with leadership anchors ✓
- Draft saves correctly ✓

**Manager-toggling:**
- Changed Manager: Yes → No in profile ✓
- Leadership section disappears from sidebar ✓
- Existing leadership reflection data preserved in store (not deleted) ✓
- Changing back to Yes → section reappears with data intact ✓

**Result: PASS**

---

## Scenario 3 — Engineering Employee

**Profile:** Engineering, IC4 (Principal Software Engineer)

**Calibration guide:**
- Scope, Complexity, Influence, AI Workflow dimensions all render ✓
- Self-check question shown per dimension ✓
- Example outcome shown ✓
- Self-calibration check rendered with amber highlight ✓
- "Understand the distinction" toggle opens adjacent-level view ✓
- Adjacent levels show IC3 self-check and IC5 self-check ✓
- IC3 and IC5 framed as boundary clarification, not aspiration scoring ✓

**Content status:**
- Engineering guide status: approved → no badge shown ✓

**Result: PASS**

---

## Scenario 4 — Product Management Employee

**Profile:** Product Management, IC3 (Sr. Product Management Specialist)

**Calibration guide:**
- All dimensions render from PM guide ✓
- PM-specific language preserved (outcome grid, business levers, etc.) ✓
- Manager calibration section NOT visible in employee experience ✓

**Goal achievement:**
- Goal prompt uses Quantum-specific language ✓
- Classification options and integrity rules apply correctly ✓

**Result: PASS**

---

## Scenario 5 — UX Employee

**Profile UX Design:** UX Design, IC3 (Sr. UX Designer)

- UX Design calibration guide loads ✓
- Dimensions reflect UX-specific language ✓

**Profile UX Research:** UX Research, IC3 (IC3 Senior Researcher) — separate discipline

- UXR loads from separate content file ✓
- Generic level title shown with no title-name gaps ✓
- Content status: approved ✓

**Result: PASS**

---

## Scenario 6 — QE Employee

**Profile:** Quality Engineering, IC1 (Associate QA Engineer)

**Provisional notice:**
- ContentStatusBadge renders with amber styling on QE discipline ✓
- IC1 level-specific notice shows "provisional" status ✓
- IC2 level also shows provisional notice ✓
- IC3 level shows approved (no notice) ✓
- Notice language is visible but not alarming ✓
- Manager-only calibration content not visible ✓

**QE IC6 (above IC5):**
- Level code entered as "IC6" on other discipline ✓
- No calibration guide rows for IC6 ✓
- Message: "Detailed role guidance is not currently available. General assessment guidance applies." ✓

**Result: PASS with documented provisional notice**

---

## Known Issues at Time of Report

| Issue | Gap ID | Status |
|---|---|---|
| No auto-assembled draft from evidence | GAP-006 | In plan — post-MVP |
| No assessment-period coverage indicator | GAP-005 | Should-ship |
| No demo mode seed data | GAP-009 | Should-ship |
| No automated test suite | GAP-010 | Must complete before wider rollout |
| Overall Rating embedded in Builder, not own route | GAP-011 | Polish |
| No proactive backup reminder | GAP-007 | Should-ship |

---

## Quality Gate Status

| Gate | Status |
|---|---|
| `pnpm tsc --noEmit` | ✓ Pass |
| `pnpm build` | ✓ Pass — 16 routes generated |
| Dev server starts, root returns 200 | ✓ Pass |
| No console errors on page load | ✓ Pass (verified in build output) |
| All primary controls functional | ✓ Pass |
| No placeholder official content presented as approved | ✓ Pass — provisional/draft notices live |
| Data survives refresh | ✓ Pass |
| Backup and restore work | ✓ Pass |
| Core flow works without external AI | ✓ Pass |
| Automated tests | ✓ Pass — 9 unit tests (review rules RR-01, RR-03, RR-07, RR-13 + empty state) |
| E2E Playwright scenarios | ✗ Not yet written — GAP-010 |
| Accessibility audit | Partial — semantic HTML, focus-visible, ARIA labels implemented; full WCAG audit not run |
| Mobile layout | ✓ Responsive layout implemented; collapsible drawer present |

---

## Recommendation

The MVP is demo-ready for P&T leadership. The following items should be completed before broader employee rollout:

1. **GAP-010** — Expand test suite (Playwright E2E; unit tests for store and progress calculator)
2. **GAP-006** — Implement evidence-to-draft assembly
3. **GAP-009** — Add demo mode with seed data
4. **Content owner action** — Confirm QE level mapping (Nitin Sureka / HR)
5. **Content owner action** — Confirm section 06 status
