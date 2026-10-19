"use client";

import { useState } from "react";
import { useStore } from "@/lib/persistence/store";
import { ASSESSMENT_QUESTIONS, SECTION_RATING_ANCHORS } from "@/content/index";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagList } from "@/components/shared/ReviewFlag";
import { SectionCard } from "@/components/shared/SectionLayout";
import { Copy, CheckCheck, ExternalLink, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestionId } from "@/state/types";
import { RatingSelector } from "@/components/shared/RatingSelector";

const OVERALL_ANCHORS = SECTION_RATING_ANCHORS["overall-rating"].anchors;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} disabled={!text}
      className="flex items-center gap-1 text-xs text-[#6b7280] hover:text-[#1e3a8a] disabled:opacity-30 transition-colors">
      {copied ? <CheckCheck size={12} className="text-green-600" /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function BuilderPage() {
  const state = useStore();
  const { sectionState, setSectionRating, profile } = state;
  const flags = evaluateReviewRules(state);

  const questions = ASSESSMENT_QUESTIONS.filter((q) => {
    if (q.applicability === "people-managers-only" && !profile?.isManager) return false;
    return true;
  });

  const copyAll = () => {
    const parts = questions.map((q) => {
      const s = sectionState[q.id];
      const ratingLine = q.responseType === "rated" && s.selectedRating
        ? `Rating: ${s.selectedRating} — ${SECTION_RATING_ANCHORS[q.id]?.anchors.find(a => a.value === s.selectedRating)?.label ?? ""}\n\n`
        : "";
      return `## ${q.title}\n${q.selfAssessmentQuestion}\n\n${ratingLine}${s.draftResponse || "[Not drafted]"}`;
    });
    navigator.clipboard.writeText(parts.join("\n\n---\n\n"));
  };

  const overallSection = sectionState["overall-rating"];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Assessment Builder</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Review your assembled responses before copying them into the official assessment system.</p>
        </div>
        <button onClick={copyAll} className="flex items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors flex-shrink-0">
          <Copy size={14} /> Copy all
        </button>
      </div>

      {flags.length > 0 && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-2">
          <AlertTriangle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            {flags.length} item{flags.length !== 1 ? "s" : ""} to review before finalizing.{" "}
            <a href="/review" className="font-medium hover:underline">See full review →</a>
          </p>
        </div>
      )}

      {/* Overall rating — shown first as orientation */}
      <SectionCard className="mb-6 border-[#1e3a8a]/20 bg-[#eff6ff]">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1e3a8a]/70 mb-1">Overall Rating</p>
        <p className="text-sm text-[#1e3558] mb-3">Based on all the above, how would I rate my overall performance?</p>
        <p className="text-xs text-[#6b7280] mb-3">Your overall rating should generally align with your section ratings but does not need to be an exact average. It reflects the full picture.</p>
        <RatingSelector anchors={OVERALL_ANCHORS} value={overallSection.selectedRating}
          onChange={(v) => setSectionRating("overall-rating", v)} sectionId="overall-rating" />
      </SectionCard>

      {/* Sections */}
      <div className="space-y-4">
        {questions.filter(q => q.id !== "overall-rating").map((q) => {
          const s = sectionState[q.id];
          const ratingAnchors = q.ratingScaleId ? SECTION_RATING_ANCHORS[q.id] : null;
          const selectedAnchor = ratingAnchors?.anchors.find(a => a.value === s.selectedRating);
          const sectionFlags = flags.filter(f => f.affectedSectionId === q.id);
          const hasContent = s.draftResponse.trim() || s.selectedRating;

          return (
            <div key={q.id} className={cn("rounded-lg border bg-white", hasContent ? "border-[#e5e7eb]" : "border-dashed border-[#d1d5db]")}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#f3f4f6]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                    0{q.sectionNumber}
                  </span>
                  <h2 className="text-sm font-semibold text-[#111827]">{q.title}</h2>
                  {q.applicability === "people-managers-only" && (
                    <span className="rounded-full bg-purple-100 text-purple-800 px-2 py-0.5 text-xs">Managers</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <CopyButton text={[selectedAnchor ? `Rating: ${s.selectedRating} — ${selectedAnchor.label}` : "", s.draftResponse].filter(Boolean).join("\n\n")} />
                  <a href={`/${sectionPath(q.id)}`} className="flex items-center gap-0.5 text-xs text-[#9ca3af] hover:text-[#1e3a8a] transition-colors">
                    <ExternalLink size={11} /> Edit
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 py-4 space-y-3">
                <p className="text-xs text-[#6b7280] italic">{q.selfAssessmentQuestion}</p>

                {selectedAnchor && (
                  <div className="rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 py-2 text-sm">
                    <span className="font-medium text-[#111827]">Rating: {s.selectedRating} — {selectedAnchor.label}</span>
                    <p className="text-xs text-[#6b7280] mt-0.5">{selectedAnchor.description}</p>
                  </div>
                )}

                {s.draftResponse ? (
                  <div className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed">{s.draftResponse}</div>
                ) : (
                  <p className="text-sm text-[#9ca3af] italic">No draft yet. <a href={`/${sectionPath(q.id)}`} className="text-[#1e3a8a] hover:underline">Go to section →</a></p>
                )}

                {/* Evidence used */}
                {s.linkedEvidenceIds.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#9ca3af] mb-1">Supporting evidence</p>
                    <div className="space-y-1">
                      {s.linkedEvidenceIds.map((eid) => {
                        const ev = state.evidence[eid];
                        if (!ev) return null;
                        return (
                          <div key={eid} className="text-xs text-[#6b7280] flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d1d5db] flex-shrink-0" />
                            {ev.title}
                            {ev.confidence !== "verified" && (
                              <span className="text-amber-600">({ev.confidence.replace(/-/g, " ")})</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {sectionFlags.length > 0 && (
                  <div className="pt-1">
                    <ReviewFlagList flags={sectionFlags} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <a href="/review" className="flex items-center gap-1.5 rounded-md bg-[#1e3a8a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors">
          Final Review →
        </a>
        <a href="/export" className="flex items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">
          Export
        </a>
      </div>
    </div>
  );
}

function sectionPath(id: QuestionId): string {
  const paths: Record<QuestionId, string> = {
    "role-performance": "role-performance",
    "goal-achievement": "goal-achievement",
    impact: "impact",
    "values-in-action": "values",
    "development-planning": "development",
    leadership: "leadership",
    "overall-rating": "builder",
  };
  return paths[id] ?? id;
}
