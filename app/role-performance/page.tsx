"use client";

import { useStore } from "@/lib/persistence/store";
import { ASSESSMENT_QUESTIONS, SECTION_RATING_ANCHORS, getCalibrationLevel, DISCIPLINES } from "@/content/index";
import { OfficialQuestion, SectionPage, SectionCard, TextareaField } from "@/components/shared/SectionLayout";
import { RatingSelector } from "@/components/shared/RatingSelector";
import { ContentStatusBadge } from "@/components/shared/ContentStatusBadge";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagList } from "@/components/shared/ReviewFlag";
import type { RatingValue } from "@/state/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { EvidencePicker } from "@/components/evidence/EvidencePicker";

const QUESTION = ASSESSMENT_QUESTIONS.find((q) => q.id === "role-performance")!;
const ANCHORS = SECTION_RATING_ANCHORS["role-performance"].anchors;

const SELF_REFLECTION_PROMPTS = [
  "What responsibilities did I perform consistently across the full period?",
  "Where did my work meet quality and delivery expectations?",
  "What evidence reflects performance across the period, not just recent months?",
  "Where did I need rework, escalation, or additional support?",
  "Which examples best reflect my selected level?",
  "Am I mistaking visibility, effort, polish, tenure, or potential for sustained impact?",
];

export default function RolePerformancePage() {
  const state = useStore();
  const { profile, sectionState, setSectionRating, setSectionDraft, setSectionStatus } = state;
  const flags = evaluateReviewRules(state);
  const section = sectionState["role-performance"];

  const [adjacentOpen, setAdjacentOpen] = useState(false);

  const calibrationLevel =
    profile ? getCalibrationLevel(profile.discipline, profile.levelCode) : null;
  const disciplineConfig = profile ? DISCIPLINES[profile.discipline] : null;

  const handleRatingChange = (v: RatingValue) => {
    setSectionRating("role-performance", v);
    if (sectionState["role-performance"].status === "not-started") {
      setSectionStatus("role-performance", "in-progress");
    }
  };

  return (
    <SectionPage
      sectionId="role-performance"
      prevHref="/evidence"
      nextHref="/goal-achievement"
    >
      <div className="space-y-6">
        <OfficialQuestion
          sectionNumber={QUESTION.sectionNumber}
          title={QUESTION.title}
          question={QUESTION.selfAssessmentQuestion}
        />

        {/* Content status notice */}
        {disciplineConfig && (
          <ContentStatusBadge status={disciplineConfig.status} />
        )}

        {/* How to rate */}
        <SectionCard title="How to rate this section">
          <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-line">
            {QUESTION.howToRateSelf}
          </p>
        </SectionCard>

        {/* Calibration guide */}
        {calibrationLevel ? (
          <SectionCard title={`Level guidance: ${calibrationLevel.levelCode} — ${calibrationLevel.title}`}>
            <ContentStatusBadge status={calibrationLevel.status} className="mb-4" />
            <div className="space-y-4">
              {[
                calibrationLevel.employeeFacing.scope,
                calibrationLevel.employeeFacing.complexity,
                calibrationLevel.employeeFacing.influence,
                calibrationLevel.employeeFacing.aiWorkflow,
              ].map((dim) => (
                <div key={dim.name}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280] mb-1">
                    {dim.name}
                  </p>
                  <ul className="space-y-1">
                    {dim.selfCheckQuestions.map((q, i) => (
                      <li key={i} className="text-sm text-[#374151] pl-3 border-l-2 border-[#e5e7eb]">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="rounded-md bg-[#f9fafb] px-3 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280] mb-1">Example outcome at this level</p>
                <p className="text-sm text-[#374151]">{calibrationLevel.employeeFacing.exampleOutcome}</p>
              </div>
              <div className="rounded-md bg-amber-50 border border-amber-100 px-3 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">Self-calibration check</p>
                <p className="text-sm text-amber-800">{calibrationLevel.employeeFacing.selfCheck}</p>
              </div>
            </div>

            {/* Adjacent levels toggle */}
            <button
              onClick={() => setAdjacentOpen(!adjacentOpen)}
              className="mt-4 flex items-center gap-1.5 text-sm text-[#1e3a8a] hover:underline"
              aria-expanded={adjacentOpen}
            >
              {adjacentOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              Understand the distinction between levels
            </button>
            {adjacentOpen && (
              <div className="mt-3 rounded-md border border-[#e5e7eb] p-3">
                <p className="text-xs text-[#6b7280] mb-2">
                  This view helps clarify level boundaries — not to help construct a case for a different level.
                </p>
                {(() => {
                  const levels = disciplineConfig?.levels ?? [];
                  const idx = levels.findIndex((l) => l.levelCode === profile?.levelCode);
                  const prev = idx > 0 ? levels[idx - 1] : null;
                  const next = idx >= 0 && idx < levels.length - 1 ? levels[idx + 1] : null;
                  return (
                    <div className="space-y-3">
                      {prev && (
                        <div>
                          <p className="text-xs font-medium text-[#374151]">{prev.levelCode} — {prev.title}</p>
                          <p className="text-xs text-[#6b7280]">{prev.employeeFacing.selfCheck}</p>
                        </div>
                      )}
                      {next && (
                        <div>
                          <p className="text-xs font-medium text-[#374151]">{next.levelCode} — {next.title}</p>
                          <p className="text-xs text-[#6b7280]">{next.employeeFacing.selfCheck}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </SectionCard>
        ) : (
          <SectionCard>
            <p className="text-sm text-[#6b7280]">
              {profile
                ? "Detailed role guidance is not currently available for your discipline and level. Continue with the general assessment guidance above."
                : "Complete your profile to load level-specific guidance."}
            </p>
          </SectionCard>
        )}

        {/* Evidence */}
        <SectionCard title="Evidence">
          <p className="text-sm text-[#6b7280] mb-3">
            Link evidence from your library to this section. Evidence is shared — it won't be duplicated.
          </p>
          <EvidencePicker sectionId="role-performance" />
        </SectionCard>

        {/* Reflection prompts */}
        <SectionCard title="Before selecting a rating, reflect on:">
          <ul className="space-y-2">
            {SELF_REFLECTION_PROMPTS.map((p, i) => (
              <li key={i} className="text-sm text-[#374151] flex items-start gap-2">
                <span className="text-[#9ca3af] mt-0.5 flex-shrink-0">·</span>
                {p}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Rating */}
        <SectionCard title="Self-assessment rating">
          <p className="text-sm text-[#6b7280] mb-4">
            Review your evidence first. No rating is pre-selected. The rating you choose is your judgment — this tool does not recommend or validate a rating.
          </p>
          <RatingSelector
            anchors={ANCHORS}
            value={section.selectedRating}
            onChange={handleRatingChange}
            sectionId="role-performance"
          />
        </SectionCard>

        {/* Draft */}
        <SectionCard title="Draft response">
          <TextareaField
            id="rp-draft"
            label="Your response"
            description="Write your response in your own words, using the evidence you've gathered. This is what you'll copy into the official system."
            value={section.draftResponse}
            onChange={(v) => setSectionDraft("role-performance", v)}
            rows={8}
            placeholder="Describe how consistently you met quality and delivery standards expected in your role..."
          />
        </SectionCard>

        {/* Flags */}
        <ReviewFlagList flags={flags} sectionId="role-performance" />
      </div>
    </SectionPage>
  );
}
