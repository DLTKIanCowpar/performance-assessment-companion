import type { RatingScale } from "@/state/types";

export const RATING_SCALES: Record<string, RatingScale> = {
  "standard-5-point": {
    id: "standard-5-point",
    anchors: [
      {
        value: 1,
        label: "Needs Improvement",
        description:
          "Performance did not meet the expectations for this area during the assessment period.",
      },
      {
        value: 2,
        label: "Meets Some Expectations",
        description:
          "Inconsistently met expectations, with performance that varies across responsibilities or over the period.",
      },
      {
        value: 3,
        label: "Meets Expectations",
        description:
          "Reliably and consistently met expectations. This is the expected, fully-meets-the-bar rating — a positive assessment.",
      },
      {
        value: 4,
        label: "Exceeds Some Expectations",
        description:
          "Frequently went beyond expectations across most responsibilities. Requires sustained evidence, not a single example.",
      },
      {
        value: 5,
        label: "Consistently Exceeds",
        description:
          "Consistently surpassed expectations, enhancing and evolving the role. Requires repeated, durable evidence across the full period.",
      },
    ],
  },
};

export const SECTION_RATING_ANCHORS: Record<string, RatingScale> = {
  "role-performance": {
    id: "role-performance-anchors",
    anchors: [
      { value: 1, label: "Needs Improvement", description: "Unable to meet the quality or delivery standards expected in the role." },
      { value: 2, label: "Meets Some Expectations", description: "Inconsistently meets the quality and delivery standards expected in the role, with performance that varies from task to task." },
      { value: 3, label: "Meets Expectations", description: "Reliably and consistently meets the quality and delivery standards expected in the role." },
      { value: 4, label: "Exceeds Some Expectations", description: "Frequently goes beyond the quality or delivery standards across most role responsibilities." },
      { value: 5, label: "Consistently Exceeds", description: "Consistently surpasses quality and delivery standards, enhancing and evolving the role." },
    ],
  },
  "goal-achievement": {
    id: "goal-achievement-anchors",
    anchors: [
      { value: 1, label: "Needs Improvement", description: "Did not deliver on most goals; results did not meet expected metrics or outcomes." },
      { value: 2, label: "Meets Some Expectations", description: "Delivered on some goals but not all; results were mixed against expected metrics or outcomes." },
      { value: 3, label: "Meets Expectations", description: "Delivered on the goals set for the period, meeting expected metrics or outcomes." },
      { value: 4, label: "Exceeds Some Expectations", description: "Delivered on set goals and surpassed expectations on several key metrics or outcomes." },
      { value: 5, label: "Consistently Exceeds", description: "Surpassed most or all goals, delivering results well beyond expected metrics or outcomes." },
    ],
  },
  "values-in-action": {
    id: "values-in-action-anchors",
    anchors: [
      { value: 1, label: "Needs Improvement", description: "Rarely demonstrates our values in day-to-day work." },
      { value: 2, label: "Meets Some Expectations", description: "Inconsistently demonstrates our values, with areas for improvement." },
      { value: 3, label: "Meets Expectations", description: "Consistently demonstrates our values in day-to-day work." },
      { value: 4, label: "Exceeds Some Expectations", description: "Frequently exemplifies our values, often serving as a model for others." },
      { value: 5, label: "Consistently Exceeds", description: "Widely recognized as an exceptional role model for our values." },
    ],
  },
  "leadership": {
    id: "leadership-anchors",
    anchors: [
      { value: 1, label: "Needs Improvement", description: "Rarely provides feedback or coaching; team members lack clarity on their performance and development opportunities." },
      { value: 2, label: "Meets Some Expectations", description: "Provides feedback or coaching inconsistently, or with limited clarity on impact on performance and development." },
      { value: 3, label: "Meets Expectations", description: "Gives clear, actionable feedback and coaching that helps team members develop." },
      { value: 4, label: "Exceeds Some Expectations", description: "Gives feedback and coaching that measurably accelerates team members' performance and development." },
      { value: 5, label: "Consistently Exceeds", description: "Recognized as an exceptional coach whose feedback shapes long-term development across the team." },
    ],
  },
  "overall-rating": {
    id: "overall-rating-anchors",
    anchors: [
      { value: 1, label: "Needs Improvement", description: "Overall contribution and results did not fully meet expectations for the performance period." },
      { value: 2, label: "Meets Some Expectations", description: "Overall contribution and results met expectations in some areas, but not consistently." },
      { value: 3, label: "Meets Expectations", description: "Overall contribution and results reliably met what was expected for the performance period — this is the expected, fully-meets-the-bar rating." },
      { value: 4, label: "Exceeds Some Expectations", description: "Overall contribution and results exceeded expectations in most areas." },
      { value: 5, label: "Consistently Exceeds", description: "Overall contribution and results consistently and clearly exceeded expectations for the performance period." },
    ],
  },
};
