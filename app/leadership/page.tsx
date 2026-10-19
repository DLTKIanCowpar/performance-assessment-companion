"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/persistence/store";
import { ASSESSMENT_QUESTIONS, SECTION_RATING_ANCHORS } from "@/content/index";
import { OfficialQuestion, SectionPage, SectionCard, TextareaField } from "@/components/shared/SectionLayout";
import { RatingSelector } from "@/components/shared/RatingSelector";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagList } from "@/components/shared/ReviewFlag";
import type { RatingValue } from "@/state/types";

const QUESTION = ASSESSMENT_QUESTIONS.find((q) => q.id === "leadership")!;
const ANCHORS = SECTION_RATING_ANCHORS["leadership"].anchors;

export default function LeadershipPage() {
  const state = useStore();
  const { profile, leadershipReflection, updateLeadershipReflection, sectionState, setSectionRating, setSectionDraft, setSectionStatus } = state;
  const router = useRouter();
  const flags = evaluateReviewRules(state);
  const section = sectionState["leadership"];

  useEffect(() => {
    if (profile && !profile.isManager) {
      router.replace("/builder");
    }
  }, [profile, router]);

  if (!profile?.isManager) return null;

  const touch = () => { if (section.status === "not-started") setSectionStatus("leadership", "in-progress"); };

  return (
    <SectionPage sectionId="leadership" prevHref="/development" nextHref="/builder">
      <div className="space-y-6">
        <OfficialQuestion sectionNumber={QUESTION.sectionNumber} title={QUESTION.title} question={QUESTION.selfAssessmentQuestion} />

        <SectionCard title="How to rate this section">
          <p className="text-sm text-[#374151] leading-relaxed">{QUESTION.howToRateSelf}</p>
        </SectionCard>

        <div className="rounded-md border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p><strong>Privacy reminder:</strong> Do not name team members in your responses. Describe the situation and your approach in a way that protects individual confidentiality.</p>
        </div>

        <SectionCard title="Reflection: your leadership behaviors">
          <div className="space-y-4">
            <TextareaField id="lead-feedback" label="Feedback approach"
              description="How consistently did you provide timely, actionable feedback — including harder conversations?"
              value={leadershipReflection.feedbackApproach}
              onChange={(v) => { updateLeadershipReflection({ feedbackApproach: v }); touch(); }} rows={3}
              placeholder="Describe your approach to giving feedback, without naming individuals..." />
            <TextareaField id="lead-coaching" label="Coaching example"
              description="A specific example of formal or informal coaching and the outcome. Keep it confidentiality-safe."
              value={leadershipReflection.coachingExample}
              onChange={(v) => updateLeadershipReflection({ coachingExample: v })} rows={3}
              placeholder="e.g. I worked with a team member who was struggling with... (do not use names)" />
            <TextareaField id="lead-difficult" label="Difficult conversations"
              description="Did you address underperformance or interpersonal issues directly rather than avoiding them?"
              value={leadershipReflection.difficultConversations}
              onChange={(v) => updateLeadershipReflection({ difficultConversations: v })} rows={3}
              placeholder="Describe how you handled a challenging conversation without identifying the individual..." />
            <TextareaField id="lead-development" label="Development support"
              description="How did you support team members' individual development based on their needs?"
              value={leadershipReflection.developmentSupport}
              onChange={(v) => updateLeadershipReflection({ developmentSupport: v })} rows={3}
              placeholder="e.g. I identified development areas with each team member and provided..." />
            <TextareaField id="lead-clarity" label="Resulting clarity or development"
              description="What evidence do you have that your coaching and feedback actually helped?"
              value={leadershipReflection.resultingClarity}
              onChange={(v) => updateLeadershipReflection({ resultingClarity: v })} rows={3}
              placeholder="e.g. Following our coaching sessions, team members reported clearer direction on..." />
          </div>
        </SectionCard>

        <SectionCard title="Self-assessment rating">
          <p className="text-sm text-[#6b7280] mb-4">Reflect on consistency across the full period — not just a single strong coaching moment. No rating is pre-selected.</p>
          <RatingSelector anchors={ANCHORS} value={section.selectedRating}
            onChange={(v: RatingValue) => { setSectionRating("leadership", v); touch(); }}
            sectionId="leadership" />
        </SectionCard>

        <SectionCard title="Draft response">
          <TextareaField id="lead-draft" label="Your response"
            description="Focus on your own behaviors and approach. Never name, score, or profile team members."
            value={section.draftResponse} onChange={(v) => setSectionDraft("leadership", v)} rows={8}
            placeholder="This period I gave clear, actionable feedback and coaching by..." />
        </SectionCard>

        <ReviewFlagList flags={flags} sectionId="leadership" />
      </div>
    </SectionPage>
  );
}
