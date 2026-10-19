# Source Inventory

Generated: 2026-10-19  
Repository: `/inputs/`  
Status: Pre-build review

---

## File Inventory

### 1. DESIGN-BRIEF.md

| Field | Value |
|---|---|
| File name | `DESIGN-BRIEF.md` |
| Document type | Markdown — primary product design brief |
| Purpose | Authoritative specification for product behavior, IA, content model, technical stack, review rules, testing strategy, and definition of done |
| Employee content | Full user journey, section specs, evidence model, rating guidance, export requirements |
| Manager content | Manager-only sections explicitly called out (Leadership section, manager calibration noted as out of MVP scope) |
| Draft/provisional | None indicated — treat as approved product direction |
| Content owner | Not named in document |
| Status | **Approved product direction** |

**Application mapping:** Controls every product behavior decision. Supersedes `performance_assessment_companion.md` where they conflict. All 24 sections must be read before architecture is finalized.

Key content this file contributes to the application:
- Navigation structure (§9)
- All 7 user journey stages (§8)
- 12 section-level UX specifications (§10)
- 18 testing scenarios (§18)
- 14 review rules (§17)
- Complete data model (§14)
- Technical stack and persistence approach (§12)
- 22-point definition of done (§22)
- MVP scope boundary (§19)

---

### 2. performance_assessment_companion.md

| Field | Value |
|---|---|
| File name | `performance_assessment_companion.md` |
| Document type | Markdown — earlier-generation product/build prompt |
| Purpose | Canvas Vibe build prompt; overlaps heavily with DESIGN-BRIEF.md but is less complete and less authoritative |
| Employee content | Section-by-section UX spec through approximately Assessment Builder; appears to be truncated |
| Manager content | Leadership section referenced but same employee-self-reflection framing |
| Draft/provisional | No explicit status; predates DESIGN-BRIEF.md in apparent maturity |
| Content owner | Not named |
| Status | **Superseded by DESIGN-BRIEF.md** — use for supplemental detail only |

**Application mapping:** Supplies additional UX detail for the application shell (sidebar nav, first-run screen copy, overview dashboard, section layout pattern). Cross-reference against DESIGN-BRIEF.md; DESIGN-BRIEF.md wins on conflicts.

Notable content not fully replicated in DESIGN-BRIEF.md:
- Exact sidebar header and caption copy
- First-run welcome screen copy and three expectation cards
- Overview dashboard "Recommended next step" states
- Shared section layout template (A–H structure)

---

### 3. performance_assessment_companion.md.zip

| Field | Value |
|---|---|
| File name | `performance_assessment_companion.md.zip` |
| Document type | ZIP archive |
| Purpose | Archive copy of the companion markdown; no additional content beyond the unzipped version |
| Employee content | Same as #2 above |
| Manager content | Same as #2 above |
| Draft/provisional | N/A |
| Content owner | Not named |
| Status | **Redundant — skip** |

**Application mapping:** Not used. Duplicate of #2.

---

### 4. 2026 Performance Assessment Questions.pdf

| Field | Value |
|---|---|
| File name | `2026 Performance Assessment Questions.pdf` |
| Document type | PDF — official Deltek HR assessment form reference |
| Purpose | Source of record for all official assessment questions, rating scales, behavioral anchors, and how-to-rate guidance |
| Employee content | Self-assessment question text and self-assessment rating guidance for all 6 sections |
| Manager content | Manager question versions and manager rating guidance for all 6 sections — **must be stored separately and not surfaced in employee experience** |
| Draft/provisional | None — carries Deltek confidential mark; appears finalized |
| Content owner | Deltek (HR/People) |
| Status | **Approved source of record** |

**Application mapping:** Populates `src/content/assessment-questions.json` and `src/content/rating-scales.json`.

Sections extracted:
| # | Section | Type | Rating |
|---|---|---|---|
| 01 | Role Performance | All employees | 5-point + optional open text |
| 02 | Goal Achievement | All employees | 5-point + optional open text |
| 03 | Impact | All employees | Required open text (no rating) |
| 04 | Values in Action | All employees | 5-point + optional open text |
| 05 | Development Planning | All employees | Required open text (no rating) |
| 07 | Leadership: Feedback, Coaching & Development | People managers only | 5-point + optional open text |
| 08 | Overall Rating | All employees | 5-point + required open text |

**Note:** Section 06 is absent from the PDF. Either it does not exist or was not included in this export. The numbering jumps from 05 to 07. Flag for content owner confirmation.

Rating scale (same anchor labels across all rated sections):
- 1 — Needs Improvement
- 2 — Meets Some Expectations
- 3 — Meets Expectations
- 4 — Exceeds Some Expectations
- 5 — Consistently Exceeds

---

### 5. Engineering Performance Calibration Guide.docx

| Field | Value |
|---|---|
| File name | `Engineering Performance Calibration Guide.docx` |
| Document type | Word document — discipline calibration guide |
| Purpose | IC-level expectations for self-assessment and manager calibration across Engineering roles |
| Employee content | IC1–IC7 rows: self-check questions per dimension (Scope, Complexity, Influence, AI Workflow, Example Outcome, Self-check) |
| Manager content | Manager Calibration Guide (pages 2+): evidence to review, calibration prompts, calibration standard per level — **must not surface to employees** |
| Draft/provisional | No draft markers in text; document appears final |
| Content owner | Not named in body; sources section lists multiple Engineering JDs and the ET Core Competencies framework |
| Status | **Approved for employee use** (no explicit draft markers) |

**Application mapping:** Populates `src/content/disciplines/engineering.json`.

Levels defined: IC1 (Associate Software Engineer), IC2 (Software Engineer), IC3 (Senior Software Engineer), IC4 (Principal Software Engineer), IC5 (Sr. Principal Software Architect), IC6 (Advisory Software Architect), IC7 (Sr. Advisory Software Architect).

Dimensions per level: Scope, Complexity, Influence, AI Workflow, Example Outcome, Self-check.

**Source attribution note in document:** "Software Engineer Competencies.xltx was provided but could not be read: Microsoft Graph blocked text extraction because the file carries a Purview sensitivity label." — this source gap should be noted in content metadata.

---

### 6. Goal Assessment for Product Technology.docx

| Field | Value |
|---|---|
| File name | `Goal Assessment for Product Technology.docx` |
| Document type | Word document — process guide for goal preparation workflow |
| Purpose | Four-step Quantum preparation process and a complete AI-assisted assessment prompt for goal review |
| Employee content | Full 4-step preparation checklist; complete goal-classification prompt with output format specification |
| Manager content | None (document is entirely employee-facing) |
| Draft/provisional | None — appears finalized |
| Content owner | Not named |
| Status | **Approved for employee use** |

**Application mapping:** Populates `src/content/prompts.json` (goal assessment prompt template) and informs the Goal Achievement section UX — particularly the preparation checklist and the goal classification states (Complete, Current, Formally Deprioritized/Modified/Replaced).

Key content:
- 4-step Quantum preparation workflow (review → update → run prompt → review output)
- Goal classification logic (Complete/Closed ≠ Deprioritized; blank status ≠ deprioritized; administrative edit ≠ business decision)
- Full prompt text for Claude/Copilot use
- 5-point rating label set used in prompt output (note: labels here differ slightly from the PDF — "Partially Achieves" vs "Meets Some Expectations" — **flag for reconciliation**)

---

### 7. Product Management Performance Calibration Guide.docx

| Field | Value |
|---|---|
| File name | `Product Management Performance Calibration Guide.docx` |
| Document type | Word document — discipline calibration guide |
| Purpose | IC-level expectations for Product Management self-assessment and manager calibration |
| Employee content | IC1–IC7 rows with self-check questions per dimension |
| Manager content | Manager Calibration Guide section (labeled "People Manager Only Resource") — **must not surface to employees** |
| Draft/provisional | Document header includes: "Intent is to share with Individual Contributors" — indicates it was written for employee distribution but this appears to be a heading label, not a draft marker |
| Content owner | Not named |
| Status | **Approved for employee use** — no explicit draft markers |

**Application mapping:** Populates `src/content/disciplines/product-management.json`.

Levels defined: IC1 (Associate Product Management Specialist), IC2 (Product Management Specialist), IC3 (Sr. Product Management Specialist), IC4 (Product Manager), IC5 (Sr. Product Manager), IC6 (Product Director), IC7 (Senior Product Director).

Dimensions per level: Scope, Complexity, Influence, AI Workflow, Example Evidence, Self-check.

---

### 8. Quality Engineering Performance Calibration Guide.docx

| Field | Value |
|---|---|
| File name | `Quality Engineering Performance Calibration Guide.docx` |
| Document type | Word document — discipline calibration guide |
| Purpose | IC-level expectations for Quality Engineering self-assessment and manager calibration |
| Employee content | IC1–IC5 rows with self-check questions per dimension |
| Manager content | Manager Calibration Guide section (labeled "People Manager Only Resource") — **must not surface to employees** |
| Draft/provisional | **DRAFT — requires review before use.** Document header contains: `(DRAFT NEEDS REVIEW)`. Manager calibration section also contains `(DRAFT NEEDS REVIEW)`. Drafting notes section at the end (containing assumptions and unresolved questions) **must be stripped before use.** |
| Content owner | Nitin Sureka named as the person who must confirm level mapping before distribution |
| Status | **DRAFT — do not treat as approved employee guidance** |

**Application mapping:** Populates `src/content/disciplines/quality-engineering.json` with status `draft`. Must display provisional notice in the employee experience.

Critical issues in this document:
1. IC1 and IC2 rows are labeled **provisional** — no JDs existed for entry/mid-level QE
2. IC6 and IC7 are **omitted** — no QE JDs above IC5 were available
3. Two IC5 JDs **conflict** — one manual-focused, one AI-first; row blends both
4. Drafting notes at bottom of document **must never appear in employee experience**
5. Level mapping described as **assumption** pending confirmation with Nitin Sureka and HR

---

### 9. UX UXR Performance Calibration Guide.docx

| Field | Value |
|---|---|
| File name | `UX UXR Performance Calibration Guide.docx` |
| Document type | Word document — discipline calibration guide (combined UX Design and UX Research) |
| Purpose | IC-level expectations for UX Design and UX Research self-assessment and manager calibration |
| Employee content | UX Design IC1–IC7 and UX Research IC1–IC7 rows with self-check questions per dimension |
| Manager content | Manager Calibration Guide section at end covering both Design and Research — **must not surface to employees** |
| Draft/provisional | No explicit draft markers in main body |
| Content owner | Not named |
| Status | **Approved for employee use** — no draft markers |

**Application mapping:** Populates `src/content/disciplines/ux-design.json` and `src/content/disciplines/ux-research.json` as separate disciplines (same source file, separate content objects).

Note: UX Research IC levels are labeled IC1–IC7 without role title names (unlike UX Design which has "Associate UX Designer," "UX Designer," etc.). UX Research levels need title mapping — treat as gap pending content owner input.

---

## Content Status Summary

| Source | Status | Employee-safe | Manager section present | Notes |
|---|---|---|---|---|
| DESIGN-BRIEF.md | Approved | Yes | MVP exclusion documented | Authoritative |
| performance_assessment_companion.md | Superseded | Partial | Referenced | Supplemental only |
| 2026 Performance Assessment Questions.pdf | Approved | Partial | Yes — separate storage required | Section 06 missing |
| Engineering Calibration Guide.docx | Approved | Partial | Yes — separate storage required | Source gap noted |
| Goal Assessment for Product Technology.docx | Approved | Yes | None | Rating label discrepancy vs PDF |
| Product Management Calibration Guide.docx | Approved | Partial | Yes — separate storage required | — |
| Quality Engineering Calibration Guide.docx | **DRAFT** | Partial | Yes — separate storage required | IC1/IC2 provisional; IC6/IC7 missing; drafting notes must be stripped |
| UX/UXR Calibration Guide.docx | Approved | Partial | Yes — separate storage required | UXR level titles missing |

---

## Open Items Requiring Content Owner Resolution

1. **Section 06 missing** from the assessment PDF. Numbering jumps 05→07. Confirm whether a section 06 exists.
2. **Rating label discrepancy**: Goal Assessment document uses "Partially Achieves" for rating 2; PDF uses "Meets Some Expectations." Application must use one canonical set — recommend PDF labels.
3. **QE DRAFT status**: QE guide must not be presented as approved guidance until Nitin Sureka and HR confirm level mapping. Application will display provisional notice.
4. **QE IC6/IC7 missing**: No calibration content exists above IC5 for QE. Application must show "Detailed role guidance is not currently available" for those levels.
5. **UXR role titles**: UX Research levels IC1–IC7 have no role title names. Need mapping for profile setup level selector.
6. **Manager content separation**: All calibration guides contain manager-only sections. These must be stored in separate content objects and never rendered in the employee experience.
7. **Drafting notes in QE guide**: The drafting-notes block at the end of the QE DOCX contains internal assumptions and unresolved questions. This content must not appear in the application under any content status.
