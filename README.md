# P&T Performance Assessment Companion

A guided, evidence-based preparation workspace for Product & Technology employees completing their 2026 performance assessments.

## What it is

The Companion helps P&T employees build a complete, calibration-ready performance self-assessment by:

- Collecting and organizing evidence before writing any responses
- Surfacing the official rating anchors and discipline-specific calibration guides in context
- Running 15 deterministic review rules that flag gaps before you finalize
- Generating a structured draft you can paste directly into Quantum

All data stays in your browser. Nothing is sent to any server.

---

## Setup

Requires Node.js 18+ and pnpm.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type-check
pnpm tsc --noEmit

# Run unit tests
pnpm vitest run

# Production build
pnpm build
```

After `pnpm build`, the output is in `.next/`. Deploy to any Node.js host (Vercel, Canvas, self-hosted).

---

## Application structure

```
app/             Next.js App Router pages
  page.tsx       First-run welcome
  overview/      Dashboard with progress summary
  profile/       Profile setup (discipline, level, manager flag)
  evidence/      Evidence library — add, edit, tag, delete
  role-performance/   Section 01 — with calibration guide
  goal-achievement/   Section 02 — with Quantum goal checklist
  impact/             Section 03
  values/             Section 05 — all 4 LIFT values
  development/        Section 07 — one area + concrete step
  leadership/         Section 08 — manager-only
  builder/            Assessment Builder — assemble all sections
  review/             Final review — 15 review rules
  export/             Markdown + JSON export, JSON import, clear

components/
  layout/        Sidebar navigation
  shared/        ContentStatusBadge, RatingSelector, EvidencePicker
  evidence/      Evidence form
  goals/         Goal form

state/
  types.ts       All TypeScript interfaces
  initial.ts     Empty state factory

lib/
  persistence/   Zustand store + migrations + export/import
  review-rules/  15 deterministic review rules
  progress/      Progress calculator
  export/        Markdown and JSON export

content/
  assessment-questions.ts   Official questions from PDF
  rating-scales.ts          5-point scale + per-section anchors
  lift-values.ts            4 LIFT values with P&T context
  prompts.ts                Goal assessment prompt template
  disciplines/
    engineering.ts          IC1–IC7
    product-management.ts   IC1–IC7
    quality-engineering.ts  IC1–IC5 (draft status — see below)
    ux-design.ts            IC1–IC7
    ux-research.ts          IC1–IC7 (generic titles)
    other.ts                Fallback

docs/
  SOURCE_INVENTORY.md       Content audit with open items
  IMPLEMENTATION_PLAN.md    Architecture and design decisions
  PRODUCT_GAPS.md           Known gaps and prioritization
  TEST_REPORT.md            Persona walkthroughs and quality gates
```

---

## Content status

Content files carry a `status` field:

| Status | Meaning | UI treatment |
|---|---|---|
| `approved` | Sourced from final, published document | No badge |
| `draft` | Sourced from a draft document | Amber badge |
| `provisional` | Content exists but level mapping is unconfirmed | Amber badge |
| `placeholder` | Content needed; none available yet | Blue badge |

The QE (Quality Engineering) guide is sourced from a draft document. IC1 and IC2 levels are additionally marked provisional pending HR confirmation of the level mapping. A notice is displayed to QE employees whenever these levels are shown.

---

## Updating content

All content is in TypeScript files under `content/`. No database, no CMS.

**To update a calibration level:** edit the relevant file in `content/disciplines/`. Change `status` from `draft` or `provisional` to `approved` once the source document is finalized.

**To add a new discipline:** create `content/disciplines/<name>.ts` following the pattern of an existing file, then register it in `content/index.ts`.

**To update rating anchors:** edit `content/rating-scales.ts`. The `SECTION_RATING_ANCHORS` object maps section IDs to arrays of anchors.

**To update LIFT values:** edit `content/lift-values.ts`.

After any content change, run `pnpm tsc --noEmit` to catch shape mismatches before deploying.

---

## Data persistence and privacy

User data is stored only in `localStorage` under the key `pt-performance-assessment-companion-v1`. No data leaves the browser.

Employees can export a full JSON backup at any time from `/export`, and restore it on any browser. The JSON schema is versioned; migrations run automatically on load.

**Manager privacy:** The Leadership section is only visible when `isManager: true` in the profile. The coaching example field shows a privacy reminder; review rule RR-15 flags responses that may contain identifying details about a team member.

---

## Known gaps

See `docs/PRODUCT_GAPS.md` for the full list. Critical items before broader rollout:

1. **GAP-006** — Evidence-to-draft auto-assembly (post-MVP)
2. **GAP-009** — Demo mode with seed data
3. **GAP-010** — E2E Playwright test suite

Content items requiring action from HR / content owners are documented in `docs/SOURCE_INVENTORY.md` under "Open Items."

---

## Deployment

The app builds as a standard Next.js application. The `.next/` directory is the deployment artifact.

**For static hosting** (no Node.js server): add `output: 'export'` to `next.config.ts`, re-run `pnpm build`, then deploy the `out/` directory. Note: static export disables server-side features (not used here — the app is fully client-side).

**Environment requirements:** none. No API keys, no database, no environment variables.
