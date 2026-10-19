You are a senior product designer, UX architect, content designer, and staff-level React engineer working inside Canvas Vibe.

Build a complete, polished, working MVP called:

PERFORMANCE ASSESSMENT COMPANION

Subtitle:
Prepare a thoughtful, evidence-based 2026 performance assessment.

Do not stop at a wireframe, product plan, component list, or static mockup. Build the functioning application, connect all screens and interactions, add realistic seed content, test the primary workflows, and fix any broken states you find.

==================================================
1. PRODUCT PURPOSE
==================================================

Build a guided preparation workspace for Product & Technology employees completing their 2026 performance assessments.

The application should help an employee:

1. Understand the official assessment process.
2. Select their discipline, role level, and people-manager status.
3. Review expectations appropriate to their role and level.
4. Collect specific evidence from the assessment period.
5. Review goals and distinguish completed, current, modified, replaced, and formally deprioritized goals.
6. Reflect on the impact of their work.
7. reflect holistically on all four LIFT values.
8. Identify one meaningful development area and one concrete next step.
9. Prepare for the people-manager coaching question, when applicable.
10. Assemble editable draft responses for the official assessment.
11. Export their work for entry into the official performance system.

This application is not the official system of record.

It must not submit anything to Quantum or another HR system.

It must not present itself as an authoritative HR decision-maker.

It must not evaluate other employees.

It must not automatically determine whether someone deserves a promotion.

It must not infer performance from limited evidence.

It must not manufacture evidence, outcomes, metrics, accomplishments, or ratings.

The product should help the employee reflect, organize evidence, and prepare responses. The employee owns every final judgment and statement.

Core framing:

GUIDE, DO NOT GRADE.
SUPPORT REFLECTION, DO NOT AUTOMATE JUDGMENT.
USE EVIDENCE, DO NOT INVENT IT.

==================================================
2. MVP BOUNDARIES
==================================================

Build this as a client-side MVP.

Use:

- React
- TypeScript
- Tailwind CSS
- Accessible reusable components
- Browser localStorage for persistence
- Lucide icons if available
- A clean component architecture
- Configuration-driven content

Do not require:

- Authentication
- A backend
- A database
- Microsoft Graph
- Quantum integration
- SharePoint integration
- Claude API integration
- Copilot integration
- Employee analytics
- Manager dashboards
- Administrative reporting
- Server-side PDF generation

The application must work immediately with no external services.

If an external dependency is unavailable, implement the required behavior locally rather than leaving the feature broken.

==================================================
3. PRODUCT POSITIONING
==================================================

The application should feel like a thoughtful guided workspace, not an HR portal.

The experience should combine:

- The clarity of Linear
- The writing experience of Notion
- The guided progress of a learning application
- The rigor of an evidence-based assessment process

Avoid:

- Dense HR-system styling
- Large data tables as the dominant experience
- Red, yellow, and green employee scoring
- Gamification
- Leaderboards
- Achievement badges
- Confetti
- Overly decorative gradients
- Robotic AI language
- Corporate jargon
- Claims that the application has evaluated the employee

The tone should be:

- Direct
- Calm
- Respectful
- Human
- Evidence-oriented
- Practical
- Non-judgmental

==================================================
4. PRIMARY USER
==================================================

Primary user:

A Product & Technology employee preparing their own 2026 self-assessment.

The user may be:

- An individual contributor
- A people manager
- New to their role
- In role for the full assessment period
- Working in a discipline that currently has a detailed calibration guide
- Working in a discipline whose guide has not yet been loaded

Supported disciplines for the initial content model:

- Engineering
- Product Management
- Quality Engineering
- UX Design
- UX Research
- Other / Guide not yet available

Supported levels should be driven by configuration.

Do not hard-code a universal IC1–IC7 list into every discipline. Each discipline must define the levels currently available in its configuration.

==================================================
5. KEY DESIGN PRINCIPLES
==================================================

Apply these principles throughout the product.

1. EVIDENCE BEFORE NARRATIVE

Encourage users to capture examples, outcomes, metrics, decisions, and changed conditions before drafting polished prose.

2. ROLE AND LEVEL MATTER

Show guidance based on the user’s selected discipline and level. Do not compare the user with coworkers.

3. SPECIFIC EXAMPLES OVER GENERAL IMPRESSIONS

Prompt for concrete examples across the assessment period.

4. SUSTAINED PERFORMANCE OVER ONE MOMENT

Remind users that one highly visible example does not necessarily represent performance across the full period.

5. CONTEXT WITHOUT EXCUSES

Allow users to document changed priorities, limited resources, time in role, and circumstances outside their reasonable control.

6. AI WITH HUMAN VERIFICATION

Where prompts are provided for use in Claude or Copilot, explicitly tell the user to verify the output against source records.

7. LOCAL AND PRIVATE BY DEFAULT

State clearly that MVP data stays in the current browser unless the user exports or clears it.

8. CONTENT IS DATA, NOT CODE

Every assessment question, rating scale, discipline, level, calibration dimension, prompt template, and help-text block must come from configuration objects.

==================================================
6. APPLICATION SHELL
==================================================

Create a responsive application shell.

Desktop:

- Persistent left sidebar
- Main content area
- Optional contextual right panel only where it adds real value
- Sticky page header containing progress and save status

Mobile:

- Collapsible navigation drawer
- Single-column page layout
- Sticky bottom Previous / Continue controls where appropriate

Sidebar header:

Performance Assessment Companion

Sidebar caption:

2026 preparation workspace

Sidebar navigation:

- Overview
- My Profile
- Role Performance
- Goal Achievement
- Impact
- Values in Action
- Development Planning
- Leadership, if user is a people manager
- Assessment Builder
- Export & Reset

Show a completion indicator next to each section:

- Not started
- In progress
- Ready to review

Do not mark a section complete simply because the user opened it.

At the bottom of the sidebar show:

- Saved locally
- Last saved timestamp
- Privacy information link

==================================================
7. FIRST-RUN EXPERIENCE
==================================================

On first launch, show a concise welcome screen.

Headline:

Prepare your 2026 Performance Assessment

Body:

This workspace helps you understand expectations for your role and level, collect evidence, and prepare thoughtful responses for the official assessment. Your work stays in this browser unless you export or clear it.

Show three expectation cards:

1. Understand the questions
Review the official assessment structure and guidance.

2. Gather your evidence
Capture goals, outcomes, decisions, examples, and changed conditions.

3. Prepare your responses
Turn your evidence into drafts you can review and enter into the official system.

Primary button:

Start preparing

Secondary link:

See how this works

When the user selects Start preparing, open the profile setup flow.

==================================================
8. PROFILE SETUP
==================================================

Create a compact setup flow.

Fields:

- Name, optional
- Discipline, required
- Level, required after a discipline is selected
- People manager: Yes or No
- Time in role:
  - Full assessment period
  - Joined during the assessment period
  - Changed roles during the assessment period
- Optional role-change or start-date context
- Optional current role title

Behavior:

- Level options change based on discipline.
- If “Other / Guide not yet available” is selected, do not block the user.
- Explain that general assessment guidance remains available even when a discipline-specific guide is not loaded.
- If People manager is Yes, add the Leadership section to navigation and to the Assessment Builder.
- Make all selections editable later.
- Do not clear existing work when the user changes a profile field.
- If changing discipline or level affects existing calibration responses, show a non-destructive notice that the guidance changed but preserve the responses.

==================================================
9. OVERVIEW DASHBOARD
==================================================

Build a useful overview, not a decorative landing page.

Header:

Your assessment preparation

Supporting copy:

Work section by section. Gather evidence before drafting final responses.

Show:

- Overall completion percentage
- Number of sections ready to review
- Number of evidence items collected
- Number of goals entered
- Current discipline and level
- People-manager status
- Last saved timestamp

Show a “Recommended next step” card based on state:

- Complete profile
- Review role expectations
- Add first goal
- Capture an impact example
- Review all four values
- Prepare development response
- Review assembled drafts

Show the assessment journey:

1. Establish context
2. Gather evidence
3. Reflect against expectations
4. Prepare responses
5. Export and verify

Add a “Before you begin” panel:

- Update goals in Quantum.
- Gather relevant examples and metrics.
- Use the full assessment period, not only recent work.
- Distinguish direct contribution from shared team outcomes.
- Verify any AI-assisted output against the source material.

==================================================
10. SHARED SECTION LAYOUT
==================================================

Use a consistent layout for each assessment section.

Each section should include:

A. Official question
B. What to consider
C. Relevant role-and-level guidance
D. Evidence workspace
E. Reflection prompts
F. Draft response
G. Optional self-selected rating where the official question uses a rating
H. Previous and Continue controls

For rated sections, separate:

- Evidence
- Draft
- Rating reflection

Do not make the rating selector the first or most visually prominent control.

Each page should include:

- Autosave
- Manual “Mark ready to review” control
- “Needs 