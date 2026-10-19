import type { DisciplineConfig } from "@/state/types";

const SOURCE = {
  filename: "Engineering Performance Calibration Guide.docx",
  status: "approved" as const,
  lastReviewedDate: "2026-10-19",
  notes:
    "Source note: Software Engineer Competencies.xltx could not be read (Purview sensitivity label blocked extraction). Level mapping derived from Engineering JDs and ET Core Competencies.",
};

const config: DisciplineConfig = {
  id: "engineering",
  label: "Engineering",
  status: "approved",
  source: SOURCE,
  levels: [
    {
      id: "eng-ic1",
      discipline: "engineering",
      levelCode: "IC1",
      title: "Associate Software Engineer",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: {
          name: "Scope",
          selfCheckQuestions: [
            "What specific task or small capability did I complete this period, and where did I rely on a mentor for guidance?",
          ],
        },
        complexity: {
          name: "Complexity",
          selfCheckQuestions: [
            "Which bugs or issues did I diagnose using approaches I already knew, and where did I ask for guidance first?",
          ],
        },
        influence: {
          name: "Influence",
          selfCheckQuestions: [
            "Did my pull requests need significant rework after review, or did they hold up as submitted?",
          ],
        },
        aiWorkflow: {
          name: "AI Workflow",
          selfCheckQuestions: [
            "What AI tool did I use for boilerplate or routine coding this period, and how did I verify the output before using it?",
          ],
        },
        exampleOutcome:
          "Completed an assigned task to spec, got pull requests through review, and could explain the issue it resolved.",
        selfCheck:
          "Am I weighing the evidence fairly — giving myself credit for completing assigned work well, without overstating the scope, complexity, or influence expected at this level?",
      },
    },
    {
      id: "eng-ic2",
      discipline: "engineering",
      levelCode: "IC2",
      title: "Software Engineer",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: {
          name: "Scope",
          selfCheckQuestions: [
            "What capability or set of endpoints did I build mostly on my own this period?",
          ],
        },
        complexity: {
          name: "Complexity",
          selfCheckQuestions: [
            "Where did I show a clear productivity trend or deepen my understanding of this part of the product?",
            "Where did I pair with a senior engineer on an architectural decision, rather than deciding it myself?",
          ],
        },
        influence: {
          name: "Influence",
          selfCheckQuestions: [
            "Where did I pair with a senior engineer on an architectural decision, rather than deciding it myself?",
          ],
        },
        aiWorkflow: {
          name: "AI Workflow",
          selfCheckQuestions: [
            "Where did I use AI for code review, PR summaries, or test-case generation on a specific task, and what did it save me?",
          ],
        },
        exampleOutcome:
          "Built a capability end to end (API, UI, tests) to spec and could describe the outcome it was meant to produce.",
        selfCheck:
          "Am I weighing the evidence fairly — recognizing my independent execution, while not treating appropriate pairing on architectural decisions as a shortfall?",
      },
    },
    {
      id: "eng-ic3",
      discipline: "engineering",
      levelCode: "IC3",
      title: "Senior Software Engineer",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: {
          name: "Scope",
          selfCheckQuestions: [
            "What capability area or service did I own independently this period?",
          ],
        },
        complexity: {
          name: "Complexity",
          selfCheckQuestions: [
            "What non-routine problem did I resolve with minimal guidance, and what trade-off did I evaluate?",
          ],
        },
        influence: {
          name: "Influence",
          selfCheckQuestions: [
            "What did I deliver without code-review rejections, and who did I mentor one-on-one?",
          ],
        },
        aiWorkflow: {
          name: "AI Workflow",
          selfCheckQuestions: [
            "Where did I use AI for code review, test generation, or my own SDLC workflow, and what cycle-time gain can I point to?",
          ],
        },
        exampleOutcome:
          "Owned a capability area end to end, shipped it to production without rework, and mentored at least one newer engineer.",
        selfCheck:
          "Am I weighing the evidence fairly — crediting what I owned and delivered without rework, without claiming the cross-team standard-setting that starts at the next level?",
      },
    },
    {
      id: "eng-ic4",
      discipline: "engineering",
      levelCode: "IC4",
      title: "Principal Software Engineer",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: {
          name: "Scope",
          selfCheckQuestions: [
            "What major capability area's architecture did I define or deliver this period?",
          ],
        },
        complexity: {
          name: "Complexity",
          selfCheckQuestions: [
            "What standard or guardrail did I define that other teams had to build against?",
          ],
        },
        influence: {
          name: "Influence",
          selfCheckQuestions: [
            "Which senior engineers did I mentor, and what technical direction decision did I make and defend myself?",
          ],
        },
        aiWorkflow: {
          name: "AI Workflow",
          selfCheckQuestions: [
            "What reusable prompt standard or AI-SDLC pattern did I define that my team started building against, and how did that move toward a higher autonomy level?",
          ],
        },
        exampleOutcome:
          "Defined the reference architecture for a capability that multiple teams built against, and it held up in production.",
        selfCheck:
          "Am I weighing the evidence fairly — recognizing the standards I actually got adopted, without mistaking prototype polish for higher-level impact?",
      },
    },
    {
      id: "eng-ic5",
      discipline: "engineering",
      levelCode: "IC5",
      title: "Sr. Principal Software Architect",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: {
          name: "Scope",
          selfCheckQuestions: [
            "What architectural roadmap did I define, and for which domain across Engineering and Product?",
          ],
        },
        complexity: {
          name: "Complexity",
          selfCheckQuestions: [
            "What competing frameworks or integration patterns did I evaluate, and on what basis did I decide?",
          ],
        },
        influence: {
          name: "Influence",
          selfCheckQuestions: [
            "What architecture review, council, or executive forum did I represent this work in, and what was adopted?",
          ],
        },
        aiWorkflow: {
          name: "AI Workflow",
          selfCheckQuestions: [
            "What AI-SDLC pattern or prompt standard did I define that other teams adopted, and how do I know they used it?",
          ],
        },
        exampleOutcome:
          "Defined a roadmap for a platform domain, got it adopted as the standard, and represented it in an executive forum.",
        selfCheck:
          "Am I weighing the evidence fairly — giving credit for the roadmap other teams actually adopted, without relying on a polished diagram alone as proof of impact?",
      },
    },
    {
      id: "eng-ic6",
      discipline: "engineering",
      levelCode: "IC6",
      title: "Advisory Software Architect",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: {
          name: "Scope",
          selfCheckQuestions: [
            "What AI-powered distributed system's architecture and development did I lead this period?",
          ],
        },
        complexity: {
          name: "Complexity",
          selfCheckQuestions: [
            "What complex, critical project did I take on with little formal direction?",
          ],
        },
        influence: {
          name: "Influence",
          selfCheckQuestions: [
            "What security, automation, or performance practice did I champion across the organization, and what changed?",
          ],
        },
        aiWorkflow: {
          name: "AI Workflow",
          selfCheckQuestions: [
            "What agentic workflow or AI-SDLC architecture did I lead the adoption of across the org, and where does this go beyond the standard Innovative description?",
          ],
        },
        exampleOutcome:
          "Shifted how the organization builds AI-powered systems, and created a practice other teams reuse.",
        selfCheck:
          "Am I weighing the evidence fairly — looking for real change in production across teams, not just broad technology exposure or participation?",
      },
    },
    {
      id: "eng-ic7",
      discipline: "engineering",
      levelCode: "IC7",
      title: "Sr. Advisory Software Architect",
      status: "approved",
      source: SOURCE,
      employeeFacing: {
        scope: {
          name: "Scope",
          selfCheckQuestions: [
            "What best practice or technical direction did I define across Engineering, not just one product or platform?",
          ],
        },
        complexity: {
          name: "Complexity",
          selfCheckQuestions: [
            "What ambiguous, cross-cutting issue did I resolve through influence rather than formal authority?",
          ],
        },
        influence: {
          name: "Influence",
          selfCheckQuestions: [
            "What company-wide technical direction or investment decision changed because of my input?",
          ],
        },
        aiWorkflow: {
          name: "AI Workflow",
          selfCheckQuestions: [
            "What AI-SDLC operating model or autonomy target did I shape for the function company-wide, and what outcome improved?",
          ],
        },
        exampleOutcome:
          "Changed a company-wide technical direction, and shaped how Engineering holds itself accountable for outcomes.",
        selfCheck:
          "Am I weighing the evidence fairly — grounding this level in a specific company-wide technical decision I shaped, not seniority, tenure, or title?",
      },
    },
  ],
};

export default config;
