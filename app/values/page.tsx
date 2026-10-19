"use client";

import { useStore } from "@/lib/persistence/store";
import { ASSESSMENT_QUESTIONS, SECTION_RATING_ANCHORS } from "@/content/index";
import { LIFT_VALUES } from "@/content/lift-values";
import { OfficialQuestion, SectionPage, SectionCard, TextareaField } from "@/components/shared/SectionLayout";
import { RatingSelector } from "@/components/shared/RatingSelector";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagList } from "@/components/shared/ReviewFlag";
import type { LiftValueId, RatingValue } from "@/state/types";

const QUESTION = ASSESSMENT_QUESTIONS.find((q) => q.id === "values-in-action")!;
const ANCHORS = SECTION_RATING_ANCHORS["values-in-action"].anchors;

const VALUE_LETTER: Record<LiftValueId, string> = {
  "lead-with-integrity": "L",
  "inspire-through-curiosity": "I",
  "focus-on-outcomes": "F",
  "thrive-together": "T",
};

export default function ValuesPage() {
  const state = useStore();
  const { sectionState, valueReflections, setSectionRating, setSectionDraft, setSectionStatus, updateValueReflection } = state;
  const flags = evaluateReviewRules(state);
  const section = sectionState["values-in-action"];

  return (
    <SectionPage sectionId="values-in-action" prevHref="/impact" nextHref="/development">
      <div className="space-y-6">
        <OfficialQuestion sectionNumber={QUESTION.sectionNumber} title={QUESTION.title} question={QUESTION.selfAssessmentQuestion} />

        <div className="rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-4 py-3 text-sm text-[#374151]">
          <p>Reflect on all four values holistically. A strong result in one value should not automatically offset a meaningful gap in another. The prompts below are for reflection — not a checklist or separate rating framework.</p>
        </div>

        {LIFT_VALUES.map((value) => {
          const reflection = valueReflections[value.id];
          return (
            <SectionCard key={value.id}>
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e3a8a] text-white font-bold text-sm flex-shrink-0">
                  {VALUE_LETTER[value.id]}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#111827]">{value.fullName}</h2>
                  <p className="text-sm text-[#6b7280] mt-0.5">{value.definition}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280] mb-2">In P&T context</p>
                <ul className="space-y-1">
                  {value.ptContext.map((c, i) => (
                    <li key={i} className="text-sm text-[#374151] pl-3 border-l-2 border-[#e5e7eb]">{c}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280] mb-2">Reflection prompts</p>
                <ul className="space-y-1">
                  {value.reflectionPrompts.map((p, i) => (
                    <li key={i} className="text-sm text-[#374151] flex items-start gap-1.5">
                      <span className="text-[#9ca3af] mt-0.5">·</span>{p}
                    </li>
                  ))}
                </ul>
              </div>

              <TextareaField
                id={`value-notes-${value.id}`}
                label="Your notes (not submitted — for reflection only)"
                value={reflection?.notes ?? ""}
                onChange={(v) => updateValueReflection(value.id, { notes: v })}
                rows={3}
                placeholder="Notes to help you draft your response..."
              />

              <div className="mt-3">
                <TextareaField
                  id={`value-example-${value.id}`}
                  label="Specific example (this feeds your draft)"
                  description="If this is the example you'll use in your final response, capture it here."
                  value={reflection?.specificExample ?? ""}
                  onChange={(v) => updateValueReflection(value.id, { specificExample: v })}
                  rows={3}
                  placeholder="Describe a specific choice, behavior, and outcome..."
                />
              </div>
            </SectionCard>
          );
        })}

        <SectionCard>
          <p className="text-sm font-medium text-[#374151] mb-2">Before selecting your rating, ask:</p>
          <p className="text-sm text-[#6b7280]">
            Is there a meaningful gap in one value that should not be hidden by strength in another?
          </p>
        </SectionCard>

        <SectionCard title="Self-assessment rating">
          <p className="text-sm text-[#6b7280] mb-4">Rate holistically across all four values. Use one rating — do not average separate value scores. No rating is pre-selected.</p>
          <RatingSelector anchors={ANCHORS} value={section.selectedRating}
            onChange={(v: RatingValue) => { setSectionRating("values-in-action", v); if (section.status === "not-started") setSectionStatus("values-in-action", "in-progress"); }}
            sectionId="values-in-action" />
        </SectionCard>

        <SectionCard title="Draft response">
          <TextareaField id="values-draft" label="Your response"
            description="The official question asks for a specific example. Use the examples you captured above."
            value={section.draftResponse} onChange={(v) => setSectionDraft("values-in-action", v)} rows={8}
            placeholder="Reflecting on this period, I consistently demonstrated our values by..." />
        </SectionCard>

        <ReviewFlagList flags={flags} sectionId="values-in-action" />
      </div>
    </SectionPage>
  );
}
