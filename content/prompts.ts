import type { PromptTemplate } from "@/state/types";

const SOURCE = {
  filename: "Goal Assessment for Product Technology.docx",
  status: "approved" as const,
  lastReviewedDate: "2026-10-19",
  notes: "",
};

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "goal-assessment",
    title: "Goal Achievement Assessment Prompt",
    description:
      "Use this prompt while viewing your Quantum goals page. Paste it into the Claude sidebar, or export your goals as a PDF and upload to Claude or Copilot.",
    promptText: `1. List every goal I owned this period, including any marked Complete or Closed. For each, state the key result targets (planned), what was actually delivered (progress %, status, and concrete outcomes from update comments), and classify it as one of three states: complete and fully delivered (100%, or marked Complete/Closed as achieved), current and still in progress, or formally deprioritized, modified, or replaced due to a change in business direction or resources, with the specific comment or status change cited as evidence.

A goal marked Complete or Closed is delivered, not deprioritized, unless a comment explicitly says otherwise. A blank or "No Status" field alone is not evidence of deprioritization, and neither is an administrative edit to a target value, key result type, or measurement setup: only comments or update text describing an actual business decision qualify. If a goal's due-date flag (for example, Overdue) contradicts its tracking status (for example, On Track), note the contradiction explicitly rather than resolving it silently. If a goal has more than one owner posting updates, note that it is shared and only credit the outcomes my own comments describe. If a goal was created partway through this assessment period, or I took it over from someone else mid-period, judge delivery against the time I actually owned it, not the full period.

2. Weigh all complete and current goals together. Give full credit for any goal delivered at 100% or marked Complete/Closed as achieved. Exclude only goals classified as deprioritized/modified/replaced, and state why for each. For goals still in progress, weigh quality of results (not just completion %), progress against any approved stretch goals, and circumstances reasonably outside my control.

3. Recommend one overall rating on this 5-point scale, based on all complete and current goals weighed in step 2:
1 = Needs Improvement (did not deliver on most goals; results fell short of expected metrics/outcomes)
2 = Meets Some Expectations (delivered on some goals but fell short on others; mixed results)
3 = Meets Expectations (delivered on goals set, meeting expected metrics/outcomes)
4 = Exceeds Some Expectations (delivered on set goals, surpassed expectations on several key metrics)
5 = Consistently Exceeds (surpassed most or all goals, results well beyond expected metrics/outcomes)
If evidence for a goal is mixed, incomplete, or missing, say so explicitly rather than assuming delivery, and do not let that goal pull the rating up.

4. Output in this format: (a) a table of each goal with planned vs. delivered and its classification (complete, current, or excluded with why); (b) the recommended rating (1-5) with its label; (c) a 3-5 sentence first-person paragraph that directly answers: "Reflecting on my goals for this period, what did I deliver against what was planned?" Name any goal delivered at 100% or marked Complete explicitly: full delivery must be reflected in the rationale, not only partial or mixed results. Reference specific metrics or outcomes, and explain why any deprioritized or outside-my-control goals were not counted as shortfalls.`,
    instructions:
      "Before using this prompt:\n1. Review and update your goals in Quantum with comments.\n2. Update progress on each key result.\n3. Add a comment describing what you delivered, outcomes achieved, and any changed priorities.\n4. Then run this prompt while viewing your goals, or export goals as PDF and attach to your Claude/Copilot session.\n\nAfter using this prompt:\n- Compare the output against your Quantum record.\n- Correct any missing or inaccurate information.\n- Rerun if needed.\n- Use the reviewed output to draft your response in your own words.",
    warningText:
      "Always verify the AI output against your actual Quantum goals record before using it. Do not accept a classification, rating, or outcome statement without confirming it matches your source data.",
    status: "approved",
    source: SOURCE,
  },
  {
    id: "evidence-reflection",
    title: "Evidence Reflection Prompt",
    description:
      "Use this prompt to help surface examples from the full assessment period that you may have overlooked.",
    promptText: `Help me identify examples I may be overlooking from the full assessment period (approximately the past 12 months). I will describe the kind of work I do and the projects I was involved in. For each area I mention, ask me: What specifically changed because of my contribution? What evidence do I have that it changed? Was this a direct result of my work or a shared team outcome? What would I need to verify to be confident in this as evidence?

Do not suggest specific accomplishments. Only reflect back what I describe and help me assess whether it meets the threshold of evidence (specific, observable, attributed to me at least in part).`,
    instructions:
      "Describe your role and the major initiatives you worked on. The AI will ask you clarifying questions. Take notes on any examples that surface — then capture them in the Evidence Library.",
    warningText:
      "Do not let the AI invent outcomes or metrics. Only accept examples you can verify from your own work record.",
    status: "approved",
    source: {
      filename: "DESIGN-BRIEF.md",
      status: "approved",
      lastReviewedDate: "2026-10-19",
      notes: "",
    },
  },
];
