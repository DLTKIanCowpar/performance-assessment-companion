import type { LiftValue } from "@/state/types";

const SOURCE = {
  filename: "LIFT Values PandT.docx",
  status: "approved" as const,
  lastReviewedDate: "2026-10-19",
  notes: "",
};

export const LIFT_VALUES: LiftValue[] = [
  {
    id: "lead-with-integrity",
    shortName: "Lead",
    fullName: "Lead with Integrity",
    definition:
      "Irrespective of role or level, we all lead. We earn trust by acting with honesty, fairness, inclusion, and accountability.",
    inPractice:
      "Clear commitments, transparency, ethical decisions, respect for and inclusion of all.",
    ptContext: [
      "High-Integrity Commitments over Arbitrary Roadmaps: Teams provide dates grounded in thorough discovery evidence rather than speculative feature lists.",
      "Owning Accountabilities: PMs own Value & Viability, Designers own Usability & Experience, and Engineers own Feasibility & Delivery with total transparency.",
      "Scaling Judgment: Sharing business, legal, and financial context openly so empowered teams make ethical, viable product decisions.",
      "Naming What Got Retired: In AI-SDLC maturity reviews, reporting the specific old process that was actually retired, not just the new tool that was adopted, since tool presence without displacement is not evidence of change.",
    ],
    reflectionPrompts: [
      "Where did I make and keep a clear commitment this period?",
      "When did I share context — including uncertainty — transparently with my team or stakeholders?",
      "How did I ensure my work reflected fairness and inclusion?",
      "When did I name something that wasn't working, rather than letting it stay unaddressed?",
      "Did I report outcomes accurately, including processes or approaches that were retired?",
    ],
    status: "approved",
    source: SOURCE,
  },
  {
    id: "inspire-through-curiosity",
    shortName: "Inspire",
    fullName: "Inspire through Curiosity",
    definition:
      "We stay curious, grow our expertise, and share insight to spark ideas and better outcomes.",
    inPractice:
      "Asking questions, seeking feedback, sharing knowledge, always exploring new possibilities through learning and innovation.",
    ptContext: [
      "Build to Learn before Building to Earn: Use prototypes and gated technical spikes to validate user, business, and feasibility risks, increasing confidence in the outcome before finalizing requirements or committing production code.",
      "Discovering Why Users Churn or Switch: Focusing curiosity on customer behavior and underlying problems rather than celebrating feature shipping.",
      "Failing Fast in Discovery: Experiment with multiple process, product, and solution paths, using evidence to identify the strongest direction and quickly stop, reassess, or redirect when an approach falls short.",
    ],
    reflectionPrompts: [
      "Where did I challenge an assumption rather than accept it?",
      "What did I learn this period that changed how I approached a problem?",
      "How did I share something I learned with others?",
      "When did I stop, reassess, or redirect based on evidence?",
      "Where did I validate a hypothesis before committing to a full solution?",
    ],
    status: "approved",
    source: SOURCE,
  },
  {
    id: "focus-on-outcomes",
    shortName: "Focus",
    fullName: "Focus on Outcomes",
    definition:
      "We are determined, bring clarity to complexity, and prioritize the work that drives progress.",
    inPractice:
      "Working smarter, not harder. Balancing speed with thoughtful decision-making and quality, simplifying where possible, and channeling our drive toward better outcomes for customers, and each other.",
    ptContext: [
      "Framing Work as Problems to Solve: Leaders assign clear, quantified outcomes (e.g., 'Reduce onboarding drop-off by 20%') rather than rigid feature roadmaps.",
      "Eliminating Waste in Discovery: Working smarter by discarding poor ideas in days through prototypes, avoiding months of wasted engineering effort.",
      "Product Telemetry & Impact: Instrumenting releases from day one to verify if shipped capabilities actually moved the metric and solved the core problem.",
    ],
    reflectionPrompts: [
      "What changed or improved because of my work — not just what I shipped?",
      "Where did I make a hard prioritization decision and hold to it?",
      "How did I verify whether my work actually moved the outcome I was targeting?",
      "When did I simplify or cut scope to protect what mattered most?",
      "Where did I distinguish between activity and impact?",
    ],
    status: "approved",
    source: SOURCE,
  },
  {
    id: "thrive-together",
    shortName: "Thrive",
    fullName: "Thrive Together",
    definition:
      "We collaborate deeply, support one another, and celebrate shared success.",
    inPractice:
      "Inclusive partnership, offering help proactively, recognizing achievement, and strengthening relationships with customers, partners, and across teams.",
    ptContext: [
      "The Empowered Product Trio: Product Managers, UX Designers, and Tech Leads co-discover solutions together daily rather than handing specs off for review between roles.",
      "Active Stakeholder Partnership: Engaging business, legal, and operational partners as active collaborators who contribute context and review prototypes early.",
      "Shared Ownership & Success: Celebrating true business impact and customer adoption as a collective win across Product & Technology and Deltek.",
      "Safe to Say It Was Wrong: When a forecast, assumption, or decision proves wrong, surface it early, correct the record, and adjust the plan so others are not working from false information.",
    ],
    reflectionPrompts: [
      "Where did I proactively help a colleague or team?",
      "How did I contribute to a shared outcome while being clear about my own part?",
      "When did I bring a stakeholder in early, rather than presenting to them at the end?",
      "Where did I acknowledge a mistake or wrong assumption and correct course openly?",
      "How did I recognize or celebrate someone else's contribution?",
    ],
    status: "approved",
    source: SOURCE,
  },
];
