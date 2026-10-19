# P&T Performance Assessment Companion

## Product Design and Build Brief

### Working product name

P&T Performance Assessment Companion

### Product statement

A guided, evidence-based preparation experience that helps Product & Technology employees understand expectations for their role and level, gather meaningful evidence, reflect accurately on their performance, and prepare stronger responses for the 2026 Performance Assessment.

This is a preparation workspace.

It is not the official performance system, an employee-monitoring product, an automated rating engine, a promotion-readiness tool, or a replacement for manager judgment.

---

# 1. Product Context

Product & Technology employees are entering a changed performance-assessment process with:

- New assessment questions
- New rating anchors
- Discipline-specific role and level guidance
- Goal information maintained in Quantum
- P&T-specific interpretations of the LIFT values
- Additional expectations for people managers
- AI-assisted ways of finding and synthesizing evidence

The supporting information currently exists across separate documents and systems. An employee must understand the assessment form, identify the correct discipline guide, interpret expectations for their level, review goals in Quantum, find relevant evidence, use prompts correctly, and translate all of this into concise assessment responses.

The MVP should turn that fragmented experience into a coherent guided journey.

The product should help an employee move from:

“I need to write my assessment and I’m not sure where to begin.”

to:

“I understand the questions, I know what is expected at my role and level, I have reviewed the full period, I can support my conclusions with evidence, and I have drafts ready to enter into the official system.”

---

# 2. Product Vision

Create the best possible performance-assessment preparation experience for P&T.

The experience should:

1. Improve employee understanding of the assessment process.
2. Establish a consistent P&T-wide preparation method.
3. Help employees assess themselves against the expectations of their actual role and level.
4. Improve the quality and specificity of evidence used in assessments.
5. Reduce recency bias, visibility bias, output bias, and unsupported impact claims.
6. Help employees distinguish activity, output, outcome, and impact.
7. Improve employee self-awareness before manager conversations.
8. Help managers receive better-prepared, more evidence-based self-assessments.
9. Reduce the burden of navigating multiple documents.
10. Preserve employee ownership of every conclusion, narrative, and rating.

---

# 3. Core Product Principles

## 3.1 Guide, do not grade

The application may explain rating anchors and help the employee check the coherence of a self-selected rating.

It must not automatically assign, recommend, predict, or optimize a rating.

## 3.2 Evidence before narrative

The product should first help the employee gather evidence, then reflect on it, and only then draft a response.

Do not begin each section with an empty “write your answer” text box.

## 3.3 Role and level are the calibration baseline

Performance should be considered relative to the employee’s selected discipline, level, scope, and time in role.

Do not compare employees with coworkers.

## 3.4 Outcomes over activity

The application must distinguish:

- Activity: what the employee did
- Output: what the employee produced
- Outcome: what changed
- Evidence: how the employee knows
- Contribution: the employee’s part in the result

## 3.5 Specific examples over general impressions

Encourage concrete examples, decisions, behaviors, results, metrics, and observable changes.

## 3.6 Full-period reflection over recent-memory recall

The experience should remind employees to consider the full assessment period rather than only recent or highly visible work.

## 3.7 Shared outcome does not mean sole ownership

The user must be able to credit a team result while clearly describing their individual contribution.

## 3.8 AI assistance requires verification

Any AI-assisted evidence or drafting workflow must:

- Preserve uncertainty
- Cite or identify its supporting sources when possible
- Avoid inventing metrics
- Avoid inferring ownership from attendance or visibility
- Separate direct contribution from shared outcomes
- Require user review

## 3.9 Development is not deficiency

Development planning should be framed as intentional growth, not as evidence of poor performance.

## 3.10 Private by default

The MVP should store information locally unless the user explicitly exports it.

---

# 4. Primary Users

## Primary

All P&T employees completing a self-assessment.

## Conditional primary

People managers completing the additional leadership question in their own self-assessment.

## Secondary beneficiary

Managers receiving better-prepared employee assessments.

## Explicitly excluded from MVP

- Manager assessment of an employee
- Manager team dashboard
- Employee comparison
- Talent ranking
- Promotion recommendation
- Calibration-session voting
- Organizational analytics
- HR decision automation

The architecture may anticipate a future manager companion, but employee and manager workflows must not be casually combined.

---

# 5. Required Source Materials

The repository will receive a source-material folder containing documents exported from SharePoint.

Expected source documents include:

- 2026 Performance Assessment Questions
- Engineering Performance Calibration Guide
- Product Management Performance Calibration Guide
- Quality Engineering Performance Calibration Guide
- UX and UX Research Performance Calibration Guide
- Goal Assessment for Product Technology
- LIFT Values for P&T

Treat source documents as content sources, not runtime dependencies.

Create a content-ingestion process that converts approved source content into normalized JSON or TypeScript configuration.

Never require the production application to parse Word or PDF files at runtime.

Preserve source metadata:

- Source filename
- Version or modified date when available
- Content status
- Last reviewed date
- Approved, draft, provisional, or superseded status

Do not silently convert document comments, drafting notes, unresolved review notes, or provisional content into approved employee guidance.

---

# 6. Critical Content Status Rules

Not all content has equal maturity.

Every content object must support a status:

- approved
- draft
- provisional
- placeholder
- superseded

Each discipline or level must support:

- employee-facing content
- manager-only content
- internal drafting notes
- review owner
- last reviewed date
- source document
- status

Internal drafting notes must never appear in the employee experience.

Draft or provisional material must display a subtle but visible notice.

If no approved guidance exists for a discipline or level:

- Do not invent expectations.
- Do not approximate from another discipline.
- Continue with general assessment guidance.
- Display “Detailed role guidance is not currently available.”

---

# 7. Official Assessment Structure

Build the experience around the official assessment sequence:

1. Role Performance
2. Goal Achievement
3. Impact
4. Values in Action
5. Development Planning
6. Leadership: Feedback, Coaching & Development, people managers only
7. Overall Rating

The app may add preparation steps around these questions, but the employee must always be able to see the official question they are preparing to answer.

Rated sections:

- Role Performance
- Goal Achievement
- Values in Action
- Leadership, when applicable
- Overall Rating

Open-text sections:

- Impact
- Development Planning

Do not mathematically average section ratings into an overall rating.

---

# 8. Desired User Journey

## Stage 1: Establish context

The user identifies:

- Discipline
- Level
- Role title, optional
- People-manager status
- Time in role
- Whether they changed roles during the period
- Optional context on scope or role change

## Stage 2: Understand expectations

The user reviews:

- Assessment questions
- Rating anchors
- Discipline-specific guidance
- Level-specific evidence prompts
- Common self-calibration traps

## Stage 3: Gather evidence

The user captures:

- Goals
- Accomplishments
- Decisions
- Outcomes
- Metrics
- Changed priorities
- Shared contributions
- AI-enabled workflow changes
- Coaching examples, if a people manager
- Source references and confidence levels

## Stage 4: Reflect

The user assesses:

- Performance consistency
- Goal achievement
- Business and customer impact
- LIFT values
- Development needs
- Leadership effectiveness, if applicable

## Stage 5: Build responses

The system organizes the employee’s own evidence into editable response scaffolds.

It may improve organization, but it must not invent facts.

## Stage 6: Review coherence

The user reviews:

- Missing evidence
- Unresolved placeholders
- Contradictions
- Unsupported impact claims
- Shared outcomes lacking contribution detail
- Exceeds ratings lacking sustained evidence
- Sections that rely on only one example
- Overreliance on recent work

## Stage 7: Export

The user can:

- Copy each response
- Copy all responses
- Export Markdown
- Export a JSON backup
- Print a consolidated preparation view
- Import a prior JSON backup

---

# 9. Application Information Architecture

## Main navigation

- Overview
- My Context
- Evidence Library
- Role Performance
- Goal Achievement
- Impact
- Values in Action
- Development Planning
- Leadership, conditional
- Assessment Builder
- Final Review
- Export & Data

## Global utilities

- Save status
- Overall progress
- Source-material information
- Privacy explanation
- Clear data
- Load demo experience
- Import backup
- Help

---

# 10. Experience Design

## 10.1 Overview

The overview should answer:

- Where am I?
- What should I do next?
- What have I completed?
- Where is evidence missing?
- What needs review?

Show:

- Overall completion
- Current discipline and level
- Applicable assessment sections
- Evidence count
- Goals captured
- Sections marked ready
- Items requiring verification
- Recommended next action
- Last locally saved timestamp

Avoid gamification.

This is preparation progress, not a performance score.

## 10.2 My Context

Capture:

- Discipline
- Level
- Role title
- People-manager status
- Time in role
- Role-change context
- Optional assessment-period notes

Changing role or level must not delete existing evidence.

If the selected guide changes, show:

“Your guidance changed. Existing evidence and drafts have been preserved.”

## 10.3 Evidence Library

Create a first-class evidence library rather than trapping evidence inside individual questions.

Every evidence item should support:

- Title
- Date or period, optional
- Situation or responsibility
- Employee contribution
- Output
- Outcome
- Metric or observable signal
- Source reference
- Confidence level
- Shared-result indicator
- Employee’s specific part in shared result
- Related assessment sections
- Related goals
- Related calibration dimensions
- Tags
- Verification status

Confidence values:

- Verified
- Partially verified
- Qualitative
- Still being measured
- Needs verification

Allow one evidence item to support multiple assessment sections without duplication.

Allow filtering by:

- Section
- Goal
- Evidence status
- Date or period
- Impact type
- Calibration dimension
- Verification state

## 10.4 Role Performance

Show the official question and rating anchors.

Load the employee’s discipline and level guide.

Present:

- Scope
- Complexity
- Influence
- AI Workflow
- Example Evidence
- Self-check

Do not render the guide as a giant comparison table by default.

Present the selected level prominently, with adjacent-level guidance hidden behind an optional “Understand the distinction” disclosure.

This prevents level shopping while still helping employees understand boundaries.

Ask:

- What responsibilities did I perform consistently?
- Where did my work meet quality and delivery expectations?
- What evidence reflects performance across the period?
- Where did I need rework, escalation, or additional support?
- Which examples best reflect my selected level?
- Am I mistaking visibility, effort, polish, tenure, or potential for impact?

The employee chooses a rating after reviewing evidence.

Do not preselect, recommend, or color-code a “correct” rating.

## 10.5 Goal Achievement

Model the documented Quantum preparation process.

### Preparation checklist

- Review goals in Quantum
- Update comments
- Review key results
- Review progress
- Record actual outcomes
- Identify formally changed priorities
- Note resource or role changes

### Goal record

Fields:

- Goal title
- Planned result
- Actual result
- Progress
- Source status
- Employee classification
- Metric or observable outcome
- Evidence notes
- Ownership type
- Ownership period
- Shared ownership details
- Changed-priority explanation
- Outside-control context
- Contradiction note
- Verification state

Classification values:

- Complete
- Current
- Formally deprioritized
- Modified
- Replaced
- Needs clarification

Apply these integrity checks:

- Complete or closed is not deprioritized without explicit contrary evidence.
- Blank status is not evidence of deprioritization.
- An administrative edit is not automatically a business-priority change.
- Contradictory fields remain visible.
- Shared goals require specific contribution.
- Part-year ownership should be judged against actual ownership period.
- Missing evidence must be called out rather than filled in.

Provide a prompt-copy experience for use with Claude or Copilot.

Make external AI use optional.

The app must remain useful without it.

## 10.6 Impact

Begin with:

“What changed because of your work?”

Impact categories:

- Customer
- Business
- Financial
- Operational
- Quality
- Team
- Employee
- Risk
- Learning or decision quality
- Other

For each impact example capture:

- Starting condition
- Employee contribution
- Change or result
- Evidence
- Scope
- Confidence
- Attribution
- Remaining uncertainty

Include an activity-to-impact check:

- What did you do?
- What did you produce?
- What changed?
- How do you know?
- What can reasonably be connected to your contribution?

Do not allow shipping, presenting, meeting attendance, document production, or volume of activity to stand alone as impact.

## 10.7 Values in Action

Present all four LIFT values:

- Lead with Integrity
- Inspire through Curiosity
- Focus on Outcomes
- Thrive Together

For each value show:

- Official definition
- P&T context
- Reflection prompts
- Employee notes

Make clear that examples are reflection prompts, not a checklist or separate rating framework.

After reviewing all four, ask the employee to choose one specific example that best demonstrates their choices, behaviors, and resulting outcome.

Ask explicitly:

“Is there a meaningful gap in one value that should not be hidden by strength in another?”

Use one holistic rating. Do not generate four separate value ratings and average them.

## 10.8 Development Planning

Ask for:

- One development area
- Why it matters in the current role
- Evidence supporting the choice
- One concrete next step
- Support or experience needed
- Observable sign of progress

Keep the official output focused on one area and one next step.

Do not turn this into a large career-planning system.

## 10.9 Leadership

Only show this section to people managers.

Focus on the manager’s own behavior:

- Clear expectations
- Timely feedback
- Actionable feedback
- Formal coaching
- Informal coaching
- Development support
- Difficult conversations
- Resulting clarity or development

Never ask the manager to name, score, rank, or profile team members.

Allow confidentiality-safe description of an example.

## 10.10 Assessment Builder

Assemble every applicable section.

For each response show:

- Official question
- Evidence used
- Selected rating, if applicable
- Draft response
- Missing-evidence notices
- Copy action
- Return-to-section action
- Ready or needs-work state

Provide a deterministic local draft builder.

The draft builder may:

- Organize bullets
- Group evidence
- Create a first-person structure
- Identify missing metrics
- Add explicit placeholders
- Remove duplication
- Suggest a concise order

It must not:

- Invent numbers
- Invent impact
- Upgrade verbs to imply unsupported ownership
- Convert correlation into causation
- Recommend a rating
- hide uncertainty
- Replace “contributed to” with “led” unless supplied by the employee
- Claim team results entirely for the employee

Draft styles:

- Concise
- Evidence-forward
- Conversation-ready

All styles must use exactly the same underlying facts.

## 10.11 Final Review

Create a final review screen with three lenses.

### Evidence integrity

Flag:

- Missing source
- Missing metric
- Unverified claim
- Unsupported causality
- Shared result with unclear individual contribution
- Activity described as impact
- Contradictory goal information

### Calibration integrity

Flag:

- No connection to selected level
- One example carrying the whole assessment
- Exceeds rating without sustained evidence
- Assessment based primarily on visibility, effort, tenure, polish, or potential
- Evidence that appears outside the employee’s time in role

### Narrative quality

Flag:

- Repetition
- Vague language
- Missing outcome
- Excessively long response
- Unresolved placeholder
- Unsupported superlative
- Section that does not directly answer the official question

All flags must be advisory and neutral.

Never state that a rating is wrong.

Use language such as:

“Review this before finalizing.”

## 10.12 Export

Support:

- Copy one response
- Copy all responses
- Markdown export
- JSON backup
- JSON import
- Print view
- Clear local data

The Markdown export should include:

- Profile
- Role and level
- Each assessment question
- Selected rating where applicable
- Draft response
- Supporting evidence
- Verification items
- Remaining placeholders

---

# 11. Hidden Blind Spots the Product Must Address

## 11.1 Source-document drift

The SharePoint documents may continue changing during development.

Solution:

- Content versioning
- Source metadata
- Separate content from application code
- Content-validation script
- Visible “last reviewed” metadata
- Simple replacement workflow

## 11.2 Draft guidance accidentally shown as policy

Some guides may contain comments or drafting notes.

Solution:

- Explicit content approval status
- Never render comments or internal notes
- Build an ingestion review report
- Require content to be marked employee-facing before inclusion

## 11.3 Level shopping

Showing every level side by side could encourage users to construct a case around a desired level.

Solution:

- Center the selected level
- Keep adjacent-level comparisons optional
- Frame comparisons as boundary clarification, not aspiration scoring

## 11.4 Rating optimization

Users may treat the tool as a way to generate the strongest possible rating.

Solution:

- Evidence before rating
- Never optimize language toward a rating
- Explain that 3 is successful performance
- Flag unsupported exceeds selections without overriding them

## 11.5 Recency bias

Users may enter only recent work.

Solution:

- Optional date or period on evidence
- Coverage indicator across the assessment period
- Prompt for earlier-period examples
- Final review notice when all evidence clusters in one period

Do not claim complete temporal coverage unless the user supplies dated evidence.

## 11.6 Evidence duplication

One accomplishment could be copied into every section, creating inflated apparent evidence.

Solution:

- Central evidence library
- Reuse evidence by reference
- Show unique evidence count separately from evidence links
- Flag when one item supports most of the assessment

## 11.7 Missing or inaccessible evidence

Employees may not be able to locate exact metrics.

Solution:

- Allow qualitative evidence
- Record uncertainty honestly
- Distinguish verified, partially verified, and still being measured
- Never encourage fabricated precision

## 11.8 Confidential information exposure

Coaching examples and copied AI prompts may expose sensitive employee information.

Solution:

- Do not collect other employee names
- Include confidentiality-safe wording prompts
- Warn before copying potentially sensitive material
- Keep data local by default

## 11.9 Browser-local data loss

Local storage can be cleared or tied to one browser.

Solution:

- Prominent backup export
- Backup reminder once meaningful work exists
- Schema-versioned JSON
- Import validation
- Never imply local storage is permanent

## 11.10 Content gaps

Not every P&T discipline may have an approved guide.

Solution:

- General assessment mode
- Clear content-gap message
- No invented calibration content
- Extensible discipline registry

## 11.11 Employee versus manager guidance

Source documents contain both employee and manager versions.

Solution:

- MVP defaults to employee self-assessment
- Manager-only material is stored separately
- Do not surface manager calibration criteria in the employee journey unless explicitly approved
- People-manager self-reflection is distinct from manager evaluation of others

## 11.12 AI workflow becoming the product

The real value is structured preparation, not a “generate with AI” button.

Solution:

- Full workflow works without external AI
- AI prompts are accelerators
- Evidence capture and reflection remain the center of the experience

---

# 12. Technical Architecture

## Recommended stack

- Next.js with App Router
- TypeScript with strict mode
- Tailwind CSS
- shadcn/ui or similarly accessible primitives
- React Hook Form
- Zod
- Zustand with persistence, or a small typed reducer if sufficient
- Lucide icons
- Vitest
- React Testing Library
- Playwright
- ESLint
- Prettier

If the repository already has a viable stack, preserve it unless there is a material reason to change.

## Why Next.js

The MVP can remain client-side while preserving a clean route structure and future options for authenticated integrations.

Do not add server complexity without a real requirement.

## Persistence

Primary MVP persistence:

- Browser-local storage or IndexedDB
- Schema versioning
- Migrations
- Export and restore
- Debounced autosave
- Graceful storage failure

Recommended storage key:

`pt-performance-assessment-companion-v1`

## Content

Store normalized content under:

`src/content/`

Suggested structure:

- assessment-questions.json
- rating-scales.json
- lift-values.json
- disciplines/
  - engineering.json
  - product-management.json
  - quality-engineering.json
  - ux-design.json
  - ux-research.json
- prompts.json
- notices.json
- source-manifest.json

Validate content with Zod at build time.

Fail the content-validation task when:

- Required fields are missing
- Duplicate IDs exist
- Invalid statuses are used
- A level references an unknown discipline
- Employee-facing content includes internal notes
- An approved object lacks source metadata

## Suggested repository structure

src/
  app/
  components/
    assessment/
    calibration/
    evidence/
    export/
    goals/
    layout/
    prompts/
    review/
    shared/
  content/
  hooks/
  lib/
    content/
    draft-builder/
    export/
    persistence/
    progress/
    review-rules/
    validation/
  state/
  types/
  tests/

scripts/
  extract-source-content/
  validate-content/
  generate-source-report/

docs/
  DESIGN-BRIEF.md
  CONTENT-MODEL.md
  SOURCE-MAPPING.md
  DECISIONS.md
  TEST-PLAN.md

source-materials/
  README.md
  incoming/
  processed/

---

# 13. Content Ingestion

Build a repeatable source-ingestion workflow.

Allow the developer to place exported DOCX and PDF files in:

`source-materials/incoming/`

The ingestion process should:

1. Inventory source files.
2. Extract readable text and tables.
3. Preserve source filenames.
4. Identify document headings and relevant sections.
5. Produce a normalized intermediate representation.
6. Produce a source-mapping report.
7. Require human review before updating approved application content.

Do not automatically publish extracted content into the live product.

Generate:

- `source-extraction-report.json`
- `source-mapping-report.md`
- Suggested content patches
- Warnings for comments, drafting notes, track changes, provisional text, or ambiguous mappings

The source documents are the factual content authority.

The design brief controls product behavior.

---

# 14. Core Data Model

Use strongly typed models.

Required entities:

- UserProfile
- Discipline
- RoleLevel
- CalibrationGuide
- CalibrationDimension
- AssessmentQuestion
- RatingScale
- EvidenceItem
- Goal
- ImpactItem
- ValueReflection
- DevelopmentPlan
- LeadershipReflection
- AssessmentResponse
- ReviewFlag
- PromptTemplate
- ContentSource
- ContentStatus
- ExportPackage
- AppState

Evidence items must be reusable by reference.

Do not copy evidence into multiple section records.

Every persisted record needs:

- ID
- Created timestamp
- Updated timestamp
- Schema version where appropriate

App state must distinguish:

- User-entered content
- System configuration
- Derived progress
- Advisory review flags

Never persist derived progress as the only source of truth.

---

# 15. Visual Direction

The product should feel like a high-quality internal P&T product.

Desired qualities:

- Calm
- Clear
- Thoughtful
- Credible
- Modern
- Evidence-oriented
- Human

Visual references:

- Linear for hierarchy and restraint
- Notion for writing comfort
- Modern learning products for guided progress
- Enterprise design systems for accessibility and control

Avoid:

- Traditional HR portal styling
- Decorative dashboards
- Excessive gradients
- Cartoon illustrations
- Gamification
- Dense comparison tables
- Red-amber-green performance displays
- “AI magic” visual language
- Large empty hero areas after onboarding

Use:

- Deep blue primary
- Restrained teal accent
- Neutral surfaces
- Amber only for review notices
- Red only for errors or destructive actions
- Green only for saved or ready states
- Clear typography
- Comfortable writing width
- Accessible contrast
- Consistent spacing
- Subtle borders
- Minimal shadows

Do not use company logos or proprietary brand assets unless supplied and approved.

Label the experience:

“MVP prototype”

---

# 16. Accessibility and Inclusion

Meet practical WCAG 2.1 AA requirements.

Required:

- Full keyboard navigation
- Visible focus states
- Semantic headings
- Accessible dialogs
- Properly associated labels and errors
- Screen-reader save announcements
- No color-only meaning
- Reduced-motion support
- Adequate target sizes
- Responsive text
- No horizontal overflow
- Accessible rating controls
- Accessible progress descriptions

Write guidance in plain language.

Do not assume US English idioms are equally clear to a global workforce.

---

# 17. Review Rules

Build deterministic, explainable review rules.

Each rule should contain:

- ID
- Category
- Trigger
- User-facing message
- Severity
- Affected section
- Resolution action

Severity values:

- Information
- Review
- Important

Example rules:

- No evidence attached
- Only one substantive example
- Missing contribution on shared outcome
- Metric placeholder unresolved
- Outcome field contains only activity language
- Unverified evidence used in final draft
- Exceeds rating with limited supporting evidence
- Overall rating materially disconnected from section selections
- All dated evidence falls in one part of the assessment period
- Development step is not actionable
- Values response does not include a specific example
- Goal marked deprioritized without explanation
- Goal status contradiction
- People-manager example may include confidential detail

Review rules must never secretly calculate a performance score.

---

# 18. Testing Strategy

## Unit tests

Cover:

- Content schemas
- Progress calculation
- Rating labels
- Evidence reuse
- Goal classification checks
- Review rules
- Draft builder
- Markdown export
- JSON export and import
- State migrations

## Component tests

Cover:

- Profile setup
- Discipline and level selection
- Evidence editor
- Goal editor
- Rating selector
- Conditional leadership section
- Review flag
- Export controls
- Confirm dialogs

## End-to-end tests

Required scenarios:

1. Product Management employee completes an assessment and retains work after refresh.
2. People manager sees the Leadership section.
3. Disabling manager status hides but does not immediately destroy stored Leadership work.
4. Quality Engineering user sees provisional-content notices.
5. Other discipline completes general-guidance mode.
6. Shared goal requires contribution clarification.
7. Exceeds rating without supporting evidence produces a non-blocking review flag.
8. User exports JSON, clears data, imports JSON, and recovers work.
9. Markdown export contains all applicable sections.
10. Mobile workflow is fully usable.
11. Special characters and multiline content persist and export correctly.
12. Invalid imported data does not overwrite current work.
13. Draft builder does not introduce unsupported claims.
14. One evidence item can support several sections but counts as one unique item.
15. Content validation rejects internal drafting notes marked employee-facing.

## Quality gates

Before calling the MVP complete:

- Type check passes
- Lint passes
- Unit tests pass
- Component tests pass
- Playwright tests pass
- Production build passes
- No obvious console errors
- No dead primary controls
- No placeholder official content presented as approved
- No data loss on ordinary refresh
- Core flow works without external AI

---

# 19. MVP Scope

## Must ship

- First-run onboarding
- Profile and role context
- Configuration-driven discipline and level guidance
- Evidence library
- Goal preparation workflow
- Impact reflection
- LIFT reflection
- Development planning
- Conditional people-manager section
- Assessment Builder
- Self-selected ratings
- Final Review
- Local persistence
- Markdown export
- JSON backup and restore
- Print view
- Prompt library
- Responsive design
- Source manifest
- Content validation
- Automated tests for critical paths

## Should ship

- Demo mode
- Adjacent-level boundary view
- Assessment-period coverage indicator
- Prompt-copy redaction warning
- Source metadata viewer
- Content ingestion helpers

## Do not ship in MVP

- Quantum write-back
- SharePoint write-back
- Microsoft Graph integration
- Automatic Copilot or Claude calls
- Automated final ratings
- Promotion recommendations
- Manager evaluation of employees
- Team dashboards
- Calibration ranking
- HR analytics
- Cross-employee comparison

---

# 20. Future Opportunities

Design the architecture so these can be added later without rebuilding the app.

## Evidence discovery connector

User-authorized retrieval from meetings, email, files, and chats.

Every suggested item would require user verification before becoming evidence.

## Quantum import

Import goal data to reduce manual entry.

No write-back in the first integration.

## Manager companion

Separate experience for managers to prepare observable evidence and conversations.

Do not expose employees’ private preparation notes automatically.

## Conversation-preparation view

Turn the completed assessment into concise talking points for the manager conversation.

## Content administration

Controlled editor for assessment questions, rating anchors, level guides, prompts, and source status.

## Content coverage dashboard

Show content owners which disciplines or levels lack approved guidance.

This should measure content readiness, not employee behavior.

## Anonymized product telemetry

Potential future measures:

- Started preparation
- Section completion
- Export
- Content errors
- Workflow abandonment

Never capture employee-entered assessment content as telemetry.

---

# 21. Product Success Measures

For MVP validation, focus on experience and process outcomes.

Potential measures:

- Employees can navigate the full process without opening several separate guidance documents.
- Employees understand expectations for their selected role and level.
- Responses contain specific evidence and outcomes.
- Employees distinguish their own contribution from shared results.
- Employees report greater preparedness for manager conversations.
- Managers report that self-assessments are clearer and better supported.
- Users identify missing evidence before submission.
- Users can complete the workflow without external AI.
- Content owners can replace or update role guidance without changing application code.

Do not claim these outcomes have been achieved until they are measured.

---

# 22. Definition of Done

The MVP is complete when:

1. A new employee can understand what the product is and begin without explanation.
2. The employee can select discipline, level, manager status, and time-in-role context.
3. The correct approved guidance loads from configuration.
4. Missing or provisional guidance is clearly identified.
5. The employee can capture reusable evidence.
6. The employee can review and classify goals without losing ambiguity or context.
7. The employee can prepare every applicable official response.
8. The employee selects, rather than receives, ratings.
9. Review rules identify blind spots without making performance decisions.
10. Draft scaffolding uses only employee-entered evidence.
11. Data survives refresh.
12. Backup and restore work.
13. Export is clean enough to use outside the application.
14. Mobile and desktop experiences are complete.
15. Accessibility requirements are met.
16. Source mapping and content status are traceable.
17. Critical workflows have automated test coverage.
18. The application can be demonstrated to P&T leadership without apologizing for missing core functionality.

---

# 23. Required Documentation

Create and maintain:

- README.md
- DESIGN-BRIEF.md
- CONTENT-MODEL.md
- SOURCE-MAPPING.md
- DECISIONS.md
- TEST-PLAN.md
- PRIVACY-AND-DATA.md
- CONTRIBUTING.md

README must include:

- Purpose
- Local setup
- Commands
- Content update process
- Test commands
- Build command
- Known MVP limitations
- Data-storage explanation
- Source-material ingestion instructions

---

# 24. Implementation Approach for Claude Code

Work in deliberate phases.

## Phase 1: Repository assessment

- Inspect the existing repository.
- Identify the current stack.
- Run the app and tests.
- Document material constraints.
- Do not rewrite a viable repository unnecessarily.

## Phase 2: Foundation

- Create typed content models.
- Create application-state models.
- Add Zod schemas.
- Add source manifest.
- Add local persistence and migrations.
- Add application shell.
- Add routing.

## Phase 3: Core workflow

- Build profile setup.
- Build evidence library.
- Build calibration guidance.
- Build all assessment sections.
- Build progress logic.

## Phase 4: Synthesis

- Build deterministic draft scaffolding.
- Build review rules.
- Build Assessment Builder.
- Build Final Review.

## Phase 5: Portability

- Add Markdown export.
- Add JSON backup and restore.
- Add print view.
- Add prompt library