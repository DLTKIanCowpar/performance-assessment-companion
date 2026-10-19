"use client";

import { useStore } from "@/lib/persistence/store";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagItem } from "@/components/shared/ReviewFlag";
import { cn } from "@/lib/utils";
import type { ReviewFlagCategory } from "@/state/types";
import { CheckCircle } from "lucide-react";

const LENS_CONFIG: { category: ReviewFlagCategory; label: string; description: string }[] = [
  { category: "evidence-integrity", label: "Evidence integrity", description: "Missing sources, unsupported claims, shared results without contribution detail" },
  { category: "calibration-integrity", label: "Calibration integrity", description: "Rating support, level alignment, period coverage" },
  { category: "narrative-quality", label: "Narrative quality", description: "Specificity, outcomes, placeholder text, direct answers to official questions" },
  { category: "goal-integrity", label: "Goal integrity", description: "Classification accuracy, status contradictions, contribution detail" },
  { category: "privacy", label: "Privacy", description: "Potentially identifying details before export" },
];

export default function ReviewPage() {
  const state = useStore();
  const flags = evaluateReviewRules(state);

  const important = flags.filter(f => f.severity === "important");
  const review = flags.filter(f => f.severity === "review");
  const info = flags.filter(f => f.severity === "information");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111827]">Final Review</h1>
        <p className="mt-1 text-sm text-[#6b7280]">
          Review these notices before finalizing your assessment. All flags are advisory — they identify items to consider, not errors or wrong ratings.
        </p>
      </div>

      {flags.length === 0 ? (
        <div className="rounded-lg border border-green-200 bg-green-50 px-5 py-6 text-center">
          <CheckCircle size={28} className="text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-green-800">No issues found</p>
          <p className="text-xs text-green-700 mt-1">Your assessment looks complete. Review each section one more time before exporting.</p>
        </div>
      ) : (
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { label: "Important", count: important.length, color: "text-red-700 bg-red-50 border-red-200" },
            { label: "Review", count: review.length, color: "text-amber-700 bg-amber-50 border-amber-200" },
            { label: "Information", count: info.length, color: "text-blue-700 bg-blue-50 border-blue-200" },
          ].map((g) => (
            <div key={g.label} className={cn("rounded-lg border px-4 py-3 text-center", g.color)}>
              <p className="text-2xl font-bold">{g.count}</p>
              <p className="text-xs mt-0.5">{g.label}</p>
            </div>
          ))}
        </div>
      )}

      {LENS_CONFIG.map((lens) => {
        const lensFlags = flags.filter(f => f.category === lens.category);
        if (lensFlags.length === 0) return (
          <div key={lens.category} className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-4 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-500" />
              <h2 className="text-sm font-semibold text-[#111827]">{lens.label}</h2>
            </div>
            <p className="text-xs text-[#6b7280] mt-0.5">{lens.description}</p>
          </div>
        );
        return (
          <div key={lens.category} className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-4 mb-4">
            <h2 className="text-sm font-semibold text-[#111827]">{lens.label}</h2>
            <p className="text-xs text-[#6b7280] mt-0.5 mb-3">{lens.description}</p>
            <div className="space-y-2">
              {lensFlags.map(f => <ReviewFlagItem key={f.id} flag={f} />)}
            </div>
          </div>
        );
      })}

      <div className="mt-6 flex gap-3">
        <a href="/builder" className="rounded-md border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">
          ← Back to Builder
        </a>
        <a href="/export" className="rounded-md bg-[#1e3a8a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors">
          Export →
        </a>
      </div>
    </div>
  );
}
