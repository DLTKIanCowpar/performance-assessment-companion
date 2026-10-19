import type { AssessmentQuestion } from "@/state/types";

const SOURCE = {
  filename: "2026 Performance Assessment Questions.pdf",
  status: "approved" as const,
  lastReviewedDate: "2026-10-19",
  notes: "Section 06 absent from PDF; numbering jumps 05→07. Confirmed no section 06.",
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "role-performance",
    sectionNumber: 1,
    title: "Role Performance",
    selfAssessmentQuestion:
      "How consistently did I meet the quality and delivery standards expected in my role?",
    responseType: "rated",
    ratingScaleId: "standard-5-point",
    isRequired: true,
    applicability: "all-employees",
    howToRateSelf:
      "Consider performance across the core responsibilities of your role and relative to the expectations of your level. Reflect on quality, timeliness, reliability, and consistency across the full assessment period. Use examples that represent your overall performance rather than a single project or event.\n\nIf you lead people, reflect more than your own output. Consider how well you built a collaborative, inclusive, high-performing team through talent development, performance management, engagement, retention, and results.",
    status: "approved",
    source: SOURCE,
  },
  {
    id: "goal-achievement",
    sectionNumber: 2,
    title: "Goal Achievement",
    selfAssessmentQuestion:
      "Reflecting on my goals for this period, what did I deliver against what was planned? Please reference specific metrics or outcomes where applicable.",
    responseType: "rated",
    ratingScaleId: "standard-5-point",
    isRequired: true,
    applicability: "all-employees",
    howToRateSelf:
      "Evaluate achievement against your individual goals and priorities that remained current and relevant during the assessment period. Goals that were formally deprioritized, modified, or replaced because of a change in business direction or resource availability should not be treated as shortfalls. Consider the quality of the results delivered, progress against approved stretch goals, and circumstances reasonably outside your control.\n\nIf you joined Deltek or moved into your role during the year, evaluate your achievements based on your time in role rather than the full review period. Focus on your progress against set goals or milestones — the quality of your ramp-up, early progress relative to what's expected to date, and what you accomplished given the time and opportunities available to you.",
    status: "approved",
    source: SOURCE,
  },
  {
    id: "impact",
    sectionNumber: 3,
    title: "Impact",
    selfAssessmentQuestion:
      "Describe the impact your work had on the business this performance period. What specific outcomes, improvements, or results were realized because of this work?",
    responseType: "open-text",
    ratingScaleId: null,
    isRequired: true,
    applicability: "all-employees",
    howToRateSelf:
      "Examples may include business, customer, operational, financial, team, quality, or other employee outcomes. Describe what changed or improved because of your contribution, using examples where available. Consider impact appropriate to your role, level, scope, and time in role. New hires and employees who changed roles during the period should reflect on what was reasonably achievable during the time they held the role.",
    status: "approved",
    source: SOURCE,
  },
  {
    id: "values-in-action",
    sectionNumber: 4,
    title: "Values in Action",
    selfAssessmentQuestion:
      "Reflecting on this period, how consistently did I bring our core values — leading with integrity, inspiring through curiosity, focusing on outcomes, and thriving together — to life in my work? Please share a specific example.",
    responseType: "rated",
    ratingScaleId: "standard-5-point",
    isRequired: true,
    applicability: "all-employees",
    howToRateSelf:
      "Consider the values holistically and use the open-text field to provide a specific example. A strong result in one value should not automatically offset a meaningful gap in another.",
    status: "approved",
    source: SOURCE,
  },
  {
    id: "development-planning",
    sectionNumber: 5,
    title: "Development Planning",
    selfAssessmentQuestion:
      "What is one area I would like to develop, and what's one step I could take toward it in the coming year?",
    responseType: "open-text",
    ratingScaleId: null,
    isRequired: true,
    applicability: "all-employees",
    howToRateSelf:
      "No official help text is included for this question in the source document. Use this section to identify one meaningful development area and one concrete, actionable next step.",
    status: "approved",
    source: SOURCE,
  },
  {
    id: "leadership",
    sectionNumber: 7,
    title: "Leadership: Feedback, Coaching & Development",
    selfAssessmentQuestion:
      "How effectively do I give clear, actionable feedback and coaching that helps develop my team members?",
    responseType: "rated",
    ratingScaleId: "standard-5-point",
    isRequired: false,
    applicability: "people-managers-only",
    howToRateSelf:
      "Reflect on how consistently you set clear expectations, provide timely and actionable feedback, hold meaningful coaching conversations, and support development based on individual needs. Consider both formal and informal coaching and provide examples of how your approach contributed to development. This includes having the harder conversations directly — whether about how someone works with others or about underperformance — rather than avoiding them.",
    status: "approved",
    source: SOURCE,
  },
  {
    id: "overall-rating",
    sectionNumber: 8,
    title: "Overall Rating",
    selfAssessmentQuestion:
      "Based on all the above, how would I rate my overall performance?",
    responseType: "rated",
    ratingScaleId: "standard-5-point",
    isRequired: true,
    applicability: "all-employees",
    howToRateSelf:
      "Base ratings on performance demonstrated throughout the full assessment period, using specific examples where possible. A rating of 3 indicates successful, consistent performance and is a positive assessment. Ratings of 4 or 5 should reflect sustained performance beyond established expectations, supported by specific examples.",
    status: "approved",
    source: SOURCE,
  },
];
