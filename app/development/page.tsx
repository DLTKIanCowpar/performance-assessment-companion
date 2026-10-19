"use client";

import { useStore } from "@/lib/persistence/store";
import { ASSESSMENT_QUESTIONS } from "@/content/index";
import { OfficialQuestion, SectionPage, SectionCard, TextareaField } from "@/components/shared/SectionLayout";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagList } from "@/components/shared/ReviewFlag";

const QUESTION = ASSESSMENT_QUESTIONS.find((q) => q.id === "development-planning")!;

export default function DevelopmentPage() {
  const state = useStore();
  const { developmentPlan, updateDevelopmentPlan, sectionState, setSectionDraft, setSectionStatus } = state;
  const flags = evaluateReviewRules(state);
  const section = sectionState["development-planning"];

  const touch = () => { if (section.status === "not-started") setSectionStatus("development-planning", "in-progress"); };

  return (
    <SectionPage sectionId="development-planning" prevHref="/values" nextHref={state.profile?.isManager ? "/leadership" : "/builder"}>
      <div className="space-y-6">
        <OfficialQuestion sectionNumber={QUESTION.sectionNumber} title={QUESTION.title} question={QUESTION.selfAssessmentQuestion} />

        <div className="rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm text-[#374151]">
          <p>Development planning is intentional growth — not evidence of poor performance. Focus on one meaningful area and one concrete, actionable next step.</p>
        </div>

        <SectionCard title="Development area">
          <div className="space-y-4">
            <TextareaField id="dev-area" label="One development area"
              description="What skill, capability, or behavior do you want to develop?"
              value={developmentPlan.area} onChange={(v) => { updateDevelopmentPlan({ area: v }); touch(); }} rows={2}
              placeholder="e.g. Communicating roadmap trade-offs to executive audiences" />
            <TextareaField id="dev-why" label="Why it matters in your current role"
              value={developmentPlan.whyItMatters} onChange={(v) => updateDevelopmentPlan({ whyItMatters: v })} rows={2}
              placeholder="e.g. I want to be more effective in steering committee presentations" />
            <TextareaField id="dev-evidence" label="Evidence supporting this choice (optional)"
              description="What have you observed that suggests this is a meaningful area?"
              value={developmentPlan.evidenceSupporting} onChange={(v) => updateDevelopmentPlan({ evidenceSupporting: v })} rows={2}
              placeholder="e.g. I received feedback that my Q3 roadmap briefing was hard to follow for non-technical stakeholders" />
          </div>
        </SectionCard>

        <SectionCard title="Next step">
          <div className="space-y-4">
            <TextareaField id="dev-step" label="One concrete next step"
              description="A specific, actionable step — not 'improve my skills.' Something you could do in the next 3 months."
              value={developmentPlan.nextStep} onChange={(v) => updateDevelopmentPlan({ nextStep: v })} rows={2}
              placeholder="e.g. Prepare and deliver a 15-minute roadmap briefing to a VP audience by Q1, with feedback from my manager" />
            <TextareaField id="dev-support" label="Support or experience needed (optional)"
              value={developmentPlan.supportNeeded} onChange={(v) => updateDevelopmentPlan({ supportNeeded: v })} rows={2}
              placeholder="e.g. Opportunity to present to a senior leadership group; coaching on narrative structure" />
            <TextareaField id="dev-progress" label="Observable sign of progress (optional)"
              description="How would you and your manager know this is developing?"
              value={developmentPlan.observableProgress} onChange={(v) => updateDevelopmentPlan({ observableProgress: v })} rows={2}
              placeholder="e.g. My manager feels comfortable putting me in front of VP-level stakeholders without preparation calls" />
          </div>
        </SectionCard>

        <SectionCard title="Draft response">
          <TextareaField id="dev-draft" label="Your response"
            description="One area, one step. Keep it focused."
            value={section.draftResponse} onChange={(v) => setSectionDraft("development-planning", v)} rows={5}
            placeholder="One area I would like to develop is..." />
        </SectionCard>

        <ReviewFlagList flags={flags} sectionId="development-planning" />
      </div>
    </SectionPage>
  );
}
