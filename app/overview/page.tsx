"use client";

import { useStore } from "@/lib/persistence/store";
import { calculateProgress } from "@/lib/progress/calculator";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import Link from "next/link";
import { ArrowRight, AlertTriangle, User, BookOpen, Target, CheckCircle } from "lucide-react";
import { cn, formatTimestamp } from "@/lib/utils";
import { DISCIPLINES } from "@/content/index";

export default function OverviewPage() {
  const state = useStore();
  const progress = calculateProgress(state);
  const flags = evaluateReviewRules(state);
  const profile = state.profile;

  const disciplineLabel = profile
    ? DISCIPLINES[profile.discipline]?.label ?? profile.discipline
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111827]">Your assessment preparation</h1>
        <p className="mt-1 text-[#6b7280]">Work section by section. Gather evidence before drafting final responses.</p>
      </div>

      {/* Before you begin */}
      <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-[#fffbeb] border-l-4 border-l-[#d97706] p-4">
        <p className="text-sm font-semibold text-[#92400e] mb-2">Before you begin</p>
        <ul className="space-y-1 text-sm text-[#78350f]">
          <li>• Update your goals in Quantum with comments before starting Goal Achievement.</li>
          <li>• Gather examples and metrics from the full assessment period, not only recent work.</li>
          <li>• Distinguish your direct contribution from shared team outcomes.</li>
          <li>• If you use AI prompts, verify the output against your source records.</li>
        </ul>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {[
          { label: "Overall progress", value: `${progress.overallPercent}%` },
          { label: "Sections ready", value: `${progress.sectionsReady} / ${progress.sectionsTotal}` },
          { label: "Evidence items", value: progress.evidenceCount },
          { label: "Goals entered", value: progress.goalCount },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-[#e5e7eb] bg-white p-4">
            <p className="text-2xl font-bold text-[#1e3a8a]">{stat.value}</p>
            <p className="text-xs text-[#6b7280] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Profile summary */}
      {profile ? (
        <div className="mb-4 rounded-lg border border-[#e5e7eb] bg-white px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#eff6ff] p-2">
              <User size={16} className="text-[#1e3a8a]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#111827]">
                {profile.name || "Your profile"}
              </p>
              <p className="text-xs text-[#6b7280]">
                {disciplineLabel} · {profile.levelCode}
                {profile.isManager ? " · People manager" : ""}
              </p>
            </div>
          </div>
          <Link href="/profile" className="text-xs text-[#1e3a8a] hover:underline">
            Edit
          </Link>
        </div>
      ) : (
        <Link
          href="/profile"
          className="mb-4 flex items-center justify-between rounded-lg border border-[#1e3a8a]/30 bg-[#eff6ff] px-4 py-4"
        >
          <div className="flex items-center gap-3">
            <User size={16} className="text-[#1e3a8a]" />
            <span className="text-sm font-medium text-[#1e3a8a]">Set up your profile to begin</span>
          </div>
          <ArrowRight size={16} className="text-[#1e3a8a]" />
        </Link>
      )}

      {/* Recommended next step */}
      <div className="mb-6 rounded-lg border border-[#0d9488]/30 bg-[#f0fdfa] px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0f766e] mb-0.5">Recommended next</p>
          <p className="text-sm font-medium text-[#134e4a]">{progress.nextStep.label}</p>
        </div>
        <Link
          href={progress.nextStep.href}
          className="flex items-center gap-1 rounded-md bg-[#0d9488] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0f766e] transition-colors flex-shrink-0"
        >
          Go <ArrowRight size={14} />
        </Link>
      </div>

      {/* Journey */}
      <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#111827] mb-4">Assessment journey</h2>
        <ol className="space-y-2">
          {[
            { n: "1", label: "Establish context", href: "/profile" },
            { n: "2", label: "Gather evidence", href: "/evidence" },
            { n: "3", label: "Reflect against expectations", href: "/role-performance" },
            { n: "4", label: "Prepare responses", href: "/builder" },
            { n: "5", label: "Export and verify", href: "/export" },
          ].map((step) => (
            <li key={step.n}>
              <Link
                href={step.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-[#f9fafb] transition-colors"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a8a] text-xs font-bold text-white flex-shrink-0">
                  {step.n}
                </span>
                <span className="text-[#374151]">{step.label}</span>
                <ArrowRight size={13} className="ml-auto text-[#9ca3af]" />
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Review flags */}
      {flags.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <p className="text-sm font-semibold text-amber-800">
              {flags.length} item{flags.length !== 1 ? "s" : ""} to review before finalizing
            </p>
          </div>
          <div className="space-y-1.5">
            {flags.slice(0, 3).map((flag) => (
              <p key={flag.id} className="text-sm text-amber-700">· {flag.message}</p>
            ))}
            {flags.length > 3 && (
              <Link href="/review" className="text-sm font-medium text-amber-800 hover:underline">
                See all {flags.length} items →
              </Link>
            )}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-[#9ca3af]">Last saved: {formatTimestamp(state.lastSavedAt)}</p>
    </div>
  );
}
