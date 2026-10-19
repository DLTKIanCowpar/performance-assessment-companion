import type { DisciplineConfig } from "@/state/types";

const SOURCE = {
  filename: "Quality Engineering Performance Calibration Guide.docx",
  status: "draft" as const,
  lastReviewedDate: "2026-10-19",
  notes:
    "DRAFT — requires review by Nitin Sureka and HR before distribution. IC1 and IC2 rows are provisional (no JDs were available). IC6 and IC7 rows are omitted (no QE JDs above IC5). IC5 row blends two conflicting JDs. Internal drafting notes have been excluded from this file.",
};

const PROVISIONAL_SOURCE = {
  ...SOURCE,
  status: "provisional" as const,
};

const config: DisciplineConfig = {
  id: "quality-engineering",
  label: "Quality Engineering",
  status: "draft",
  source: SOURCE,
  levels: [
    {
      id: "qe-ic1",
      discipline: "quality-engineering",
      levelCode: "IC1",
      title: "Associate QA Engineer",
      status: "provisional",
      source: PROVISIONAL_SOURCE,
      employeeFacing: {
        scope: { name: "Scope", selfCheckQuestions: ["What specific test cases or small feature area did I execute this period, and where did I rely on a senior tester for guidance?"] },
        complexity: { name: "Complexity", selfCheckQuestions: ["Which defects did I find and document using test approaches I already knew, and where did I ask for guidance first?"] },
        influence: { name: "Influence", selfCheckQuestions: ["Did my defect reports need rework to be reproducible, or did developers act on them as written?"] },
        aiWorkflow: { name: "AI Workflow", selfCheckQuestions: ["What AI tool did I use for test case drafting or defect write-ups, and how did I verify the output before using it?"] },
        exampleOutcome: "Executed assigned test cases to plan, logged clear and reproducible defects, and could explain the feature behavior tested.",
        selfCheck: "Am I weighing the evidence fairly: giving myself credit for executing assigned work accurately, without overstating the scope, complexity, or influence expected at this level?",
      },
    },
    {
      id: "qe-ic2",
      discipline: "quality-engineering",
      levelCode: "IC2",
      title: "QA Engineer",
      status: "provisional",
      source: PROVISIONAL_SOURCE,
      employeeFacing: {
        scope: { name: "Scope", selfCheckQuestions: ["What feature or module did I test end to end mostly on my own, including test case design?"] },
        complexity: { name: "Complexity", selfCheckQuestions: ["Where did I design tests beyond the written requirements (boundary, data, cross-browser, or cross-module cases), and what did they uncover?"] },
        influence: { name: "Influence", selfCheckQuestions: ["Where did I pair with a senior on test strategy for a feature, rather than deciding it myself?"] },
        aiWorkflow: { name: "AI Workflow", selfCheckQuestions: ["Where did I use AI for test case generation or test data setup on a specific feature, and what did it save me?"] },
        exampleOutcome: "Owned test design and execution for a feature through release and found defects before customers did.",
        selfCheck: "Am I weighing the evidence fairly: recognizing my independent test design, while not treating appropriate pairing on strategy as a shortfall?",
      },
    },
    {
      id: "qe-ic3",
      discipline: "quality-engineering",
      levelCode: "IC3",
      title: "Senior QA Engineer",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: { name: "Scope", selfCheckQuestions: ["What feature set or product area did I own quality for independently this period, across web, mobile, or ERP workflows?"] },
        complexity: { name: "Complexity", selfCheckQuestions: ["What non-routine quality problem (a cross-module workflow or data-dependent defect) did I resolve with minimal guidance, and what trade-off did I make between test depth and schedule?"] },
        influence: { name: "Influence", selfCheckQuestions: ["What root-cause trend from my defect analysis changed what developers or product managers did, and who did I mentor one on one?"] },
        aiWorkflow: { name: "AI Workflow", selfCheckQuestions: ["Where did I use AI in test design, execution, or defect analysis, and what cycle-time or coverage gain can I point to?"] },
        exampleOutcome: "Owned quality for a product area across multiple releases, drove at least one fix to how work is built or specified based on defect analysis, and mentored a newer tester.",
        selfCheck: "Am I weighing the evidence fairly: crediting what I owned and the trends I surfaced, without claiming the cross-team standard-setting that starts at the next level?",
      },
    },
    {
      id: "qe-ic4-qa",
      discipline: "quality-engineering",
      levelCode: "IC4",
      title: "Principal QA Engineer",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: { name: "Scope", selfCheckQuestions: ["What QA strategy or test plan for a high-complexity application or capability did I define and lead this period?"] },
        complexity: { name: "Complexity", selfCheckQuestions: ["How did I scope testing across competing priorities in a complex ERP domain (such as project accounting, payroll, or time and expense), and what risk did I decide to accept or escalate?"] },
        influence: { name: "Influence", selfCheckQuestions: ["What quality requirements did I define with product managers and developers, which testers did I lead or mentor, and what practice did other teams adopt?"] },
        aiWorkflow: { name: "AI Workflow", selfCheckQuestions: ["What reusable AI-assisted testing pattern (prompt standard, test generation workflow) did I define that my team started using, and how did I verify its output?"] },
        exampleOutcome: "Defined the test strategy for a high-complexity capability that multiple testers or teams executed against, and release quality held in production.",
        selfCheck: "Am I weighing the evidence fairly: recognizing the practices I actually got adopted, without mistaking test plan volume or defect counts for higher-level impact?",
      },
    },
    {
      id: "qe-ic4-auto",
      discipline: "quality-engineering",
      levelCode: "IC4",
      title: "Principal Automation Engineer",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: { name: "Scope", selfCheckQuestions: ["What automation framework or API test suite did I design or own, and which teams run on it?"] },
        complexity: { name: "Complexity", selfCheckQuestions: ["What scenario did I automate that off-the-shelf tools did not support, and what did I decide on build versus buy or coverage versus maintenance cost?"] },
        influence: { name: "Influence", selfCheckQuestions: ["Which CI/CD pipelines did I integrate automation into, and which senior engineers did I mentor?"] },
        aiWorkflow: { name: "AI Workflow", selfCheckQuestions: ["What AI-assisted test generation or self-healing approach did I introduce, how did I verify it, and what happened to flake rate and maintenance effort?"] },
        exampleOutcome: "Built an automation framework integrated into CI/CD that multiple teams adopted, with a measurable coverage or cycle-time gain that held over time.",
        selfCheck: "Am I weighing the evidence fairly: crediting adoption and measured gain, without treating framework sophistication or script counts as impact?",
      },
    },
    {
      id: "qe-ic5",
      discipline: "quality-engineering",
      levelCode: "IC5",
      title: "Advanced QA Engineer (QA Architect)",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: { name: "Scope", selfCheckQuestions: ["What QA strategy, quality metrics, and process improvements did I define across products or a suite, and for which domain?"] },
        complexity: { name: "Complexity", selfCheckQuestions: ["What competing approaches (manual versus automated balance, shift-left versus shift-right, validation of AI features) did I evaluate, and on what basis did I decide?"] },
        influence: { name: "Influence", selfCheckQuestions: ["What release readiness, architecture, or executive forum did I represent quality in, what was adopted, and which QA leads did I develop?"] },
        aiWorkflow: { name: "AI Workflow", selfCheckQuestions: ["What evaluation framework (datasets, human-in-the-loop, prompt testing) or AI-assisted QA operating model did I establish, and how do I know teams use it?"] },
        exampleOutcome: "Defined a quality strategy and metrics set for a product domain, got it adopted as the standard, and used it to change release decisions.",
        selfCheck: "Am I weighing the evidence fairly: giving credit for strategy teams adopted and metrics people acted on, without relying on a polished dashboard as proof of impact?",
      },
    },
  ],
};

export default config;
