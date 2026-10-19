"use client";

import { useState } from "react";
import { useStore } from "@/lib/persistence/store";
import { ASSESSMENT_QUESTIONS, SECTION_RATING_ANCHORS } from "@/content/index";
import { OfficialQuestion, SectionPage, SectionCard, TextareaField, InputField } from "@/components/shared/SectionLayout";
import { RatingSelector } from "@/components/shared/RatingSelector";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagList } from "@/components/shared/ReviewFlag";
import { PROMPT_TEMPLATES } from "@/content/prompts";
import type { Goal, GoalClassification, OwnershipType, RatingValue } from "@/state/types";
import { generateId } from "@/lib/utils";
import { Plus, Pencil, Trash2, Copy, CheckCheck, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTION = ASSESSMENT_QUESTIONS.find((q) => q.id === "goal-achievement")!;
const ANCHORS = SECTION_RATING_ANCHORS["goal-achievement"].anchors;

const GOAL_CLASSIFICATIONS: { value: GoalClassification; label: string; description: string }[] = [
  { value: "complete", label: "Complete", description: "Delivered at 100% or marked Complete/Closed as achieved" },
  { value: "current", label: "Current / In progress", description: "Active goal with meaningful progress" },
  { value: "deprioritized", label: "Formally deprioritized", description: "Business direction or resources changed — must include explanation" },
  { value: "modified", label: "Modified", description: "Target or scope changed due to business decision" },
  { value: "replaced", label: "Replaced", description: "Superseded by a new goal" },
  { value: "needs-clarification", label: "Needs clarification", description: "Status is ambiguous or contradictory" },
];

function emptyGoal(): Omit<Goal, "id" | "createdAt" | "updatedAt"> {
  return {
    title: "", plannedResult: "", actualResult: "", progress: "",
    sourceStatus: "", classification: "current", metric: "", evidenceNotes: "",
    ownershipType: "sole", ownershipPeriod: "", sharedOwnershipDetails: "",
    changedPriorityExplanation: "", outsideControlContext: "", contradictionNote: "",
    verificationState: "not-started", relatedEvidenceIds: [],
  };
}

function GoalForm({ initial, onSave, onCancel }: { initial?: Goal; onSave: (g: Goal) => void; onCancel: () => void }) {
  const now = new Date().toISOString();
  const [form, setForm] = useState(initial ? { ...initial } : { id: generateId(), createdAt: now, updatedAt: now, ...emptyGoal() });

  const set = (field: string, value: unknown) => setForm((p: typeof form) => ({ ...p, [field]: value }));
  const isValid = form.title.trim();

  const needsExplanation = ["deprioritized", "modified", "replaced"].includes(form.classification);
  const isShared = form.ownershipType !== "sole";

  return (
    <div className="rounded-lg border border-[#1e3a8a]/20 bg-white p-5 space-y-4">
      <InputField id="goal-title" label="Goal title *" value={form.title} onChange={(v) => set("title", v)} placeholder="e.g. Reduce API error rate by 30%" />
      <TextareaField id="goal-planned" label="Planned result" description="What was the target or key result?" value={form.plannedResult} onChange={(v) => set("plannedResult", v)} rows={2} placeholder="e.g. Error rate ≤2% by Q4 2026" />
      <TextareaField id="goal-actual" label="Actual result" description="What was delivered? Reference progress, status, and outcomes." value={form.actualResult} onChange={(v) => set("actualResult", v)} rows={2} placeholder="e.g. Error rate reached 1.8% by November" />
      <InputField id="goal-progress" label="Progress % or status from Quantum" value={form.progress} onChange={(v) => set("progress", v)} placeholder="e.g. 95%, On Track, Complete" />
      <InputField id="goal-metric" label="Key metric or observable outcome" value={form.metric} onChange={(v) => set("metric", v)} placeholder="e.g. API error rate 1.8% (Datadog, Nov 2026)" />

      <div>
        <label className="block text-sm font-medium text-[#111827] mb-2">Classification</label>
        <div className="space-y-1.5">
          {GOAL_CLASSIFICATIONS.map((opt) => (
            <label key={opt.value} className={cn("flex items-start gap-2.5 rounded-md border px-3 py-2.5 cursor-pointer transition-colors text-sm",
              form.classification === opt.value ? "border-[#1e3a8a] bg-[#eff6ff]" : "border-[#e5e7eb] hover:bg-[#f9fafb]"
            )}>
              <input type="radio" name={`class-${form.id}`} checked={form.classification === opt.value} onChange={() => set("classification", opt.value)} className="mt-0.5 h-4 w-4 accent-[#1e3a8a]" />
              <div>
                <span className="font-medium text-[#111827]">{opt.label}</span>
                <p className="text-xs text-[#6b7280]">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {needsExplanation && (
        <TextareaField id="goal-deprioritized" label="Explanation (required for this classification)" description="What specific business decision, comment, or status change explains this? A blank status or administrative edit is not evidence of deprioritization." value={form.changedPriorityExplanation} onChange={(v) => set("changedPriorityExplanation", v)} rows={2} placeholder="e.g. Project scope was formally reduced in Q3 planning. See comment from [manager] dated August 15." />
      )}

      <div>
        <label className="block text-sm font-medium text-[#111827] mb-2">Ownership</label>
        <div className="flex gap-2 flex-wrap">
          {(["sole", "shared", "partial-period"] as OwnershipType[]).map((opt) => (
            <button key={opt} type="button" onClick={() => set("ownershipType", opt)}
              className={cn("rounded-full border px-3 py-1 text-xs transition-colors", form.ownershipType === opt ? "border-[#1e3a8a] bg-[#eff6ff] text-[#1e3a8a]" : "border-[#e5e7eb] text-[#6b7280]")}
              aria-pressed={form.ownershipType === opt}>
              {opt === "sole" ? "Sole owner" : opt === "shared" ? "Shared ownership" : "Partial period"}
            </button>
          ))}
        </div>
        {isShared && (
          <div className="mt-3 space-y-3">
            {form.ownershipType === "shared" && (
              <TextareaField id="goal-shared" label="My specific contribution to this shared goal" value={form.sharedOwnershipDetails} onChange={(v) => set("sharedOwnershipDetails", v)} rows={2} placeholder="My updates only — not the full team's progress" />
            )}
            {form.ownershipType === "partial-period" && (
              <InputField id="goal-period" label="Period I owned this goal" value={form.ownershipPeriod} onChange={(v) => set("ownershipPeriod", v)} placeholder="e.g. July–November 2026" />
            )}
          </div>
        )}
      </div>

      <TextareaField id="goal-outside" label="Circumstances outside my control (optional)" value={form.outsideControlContext} onChange={(v) => set("outsideControlContext", v)} rows={2} placeholder="e.g. Dependency on external vendor delayed delivery by 6 weeks" />
      <TextareaField id="goal-contradiction" label="Status contradiction (optional)" description="If the goal's progress %, due-date flag, or tracking status contradict each other, note it here rather than resolving it silently." value={form.contradictionNote} onChange={(v) => set("contradictionNote", v)} rows={2} placeholder="e.g. Goal shows Overdue flag but tracking status is On Track — comment from manager indicates work was complete" />

      <div className="flex gap-2 pt-2">
        <button onClick={() => { if (isValid) onSave({ ...form, updatedAt: new Date().toISOString() } as Goal); }} disabled={!isValid}
          className="rounded-md bg-[#1e3a8a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e40af] disabled:opacity-40 transition-colors">
          Save goal
        </button>
        <button onClick={onCancel} className="rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

const CLASS_COLORS: Record<GoalClassification, string> = {
  complete: "bg-green-100 text-green-800",
  current: "bg-blue-100 text-blue-800",
  deprioritized: "bg-gray-100 text-gray-700",
  modified: "bg-amber-100 text-amber-800",
  replaced: "bg-gray-100 text-gray-700",
  "needs-clarification": "bg-red-100 text-red-800",
};

export default function GoalAchievementPage() {
  const state = useStore();
  const { goals, addGoal, updateGoal, deleteGoal, sectionState, setSectionRating, setSectionDraft, setSectionStatus } = state;
  const flags = evaluateReviewRules(state);
  const section = sectionState["goal-achievement"];
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [promptCopied, setPromptCopied] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const goalPrompt = PROMPT_TEMPLATES.find((p) => p.id === "goal-assessment")!;

  const goalItems = Object.values(goals).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const copyPrompt = () => {
    navigator.clipboard.writeText(goalPrompt.promptText);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2500);
  };

  return (
    <SectionPage sectionId="goal-achievement" prevHref="/role-performance" nextHref="/impact">
      <div className="space-y-6">
        <OfficialQuestion sectionNumber={QUESTION.sectionNumber} title={QUESTION.title} question={QUESTION.selfAssessmentQuestion} />

        <SectionCard title="How to rate this section">
          <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-line">{QUESTION.howToRateSelf}</p>
        </SectionCard>

        {/* Quantum checklist */}
        <SectionCard title="Before entering your goals — complete this in Quantum first">
          <ol className="space-y-2 text-sm text-[#374151]">
            {[
              "Open your Goals page and filter to performance goals.",
              "Under Show More, select Key Results and Goal Updated.",
              "Confirm the progress for each key result.",
              "Add a recent comment describing what you delivered, outcomes achieved, and any changes in priorities or resources.",
              "Note any goals that were formally deprioritized — with a comment citing the specific business decision.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a8a] text-xs font-bold text-white">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5 text-xs text-[#6b7280]">
            <strong className="text-[#374151]">Goal classification rules:</strong> A goal marked Complete or Closed is delivered — not deprioritized — unless a comment explicitly says otherwise. A blank status field alone is not evidence of deprioritization, and neither is an administrative edit to a target value.
          </div>
        </SectionCard>

        {/* AI prompt */}
        <SectionCard>
          <button onClick={() => setPromptOpen(!promptOpen)} className="flex items-center justify-between w-full text-left">
            <div>
              <p className="text-sm font-semibold text-[#111827]">Use an AI prompt to help review your goals</p>
              <p className="text-xs text-[#6b7280] mt-0.5">Paste this into Claude or Copilot while viewing your Quantum goals</p>
            </div>
            {promptOpen ? <ChevronUp size={16} className="text-[#9ca3af]" /> : <ChevronDown size={16} className="text-[#9ca3af]" />}
          </button>
          {promptOpen && (
            <div className="mt-4">
              <p className="text-xs text-[#6b7280] mb-2">{goalPrompt.instructions}</p>
              <pre className="rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 py-3 text-xs text-[#374151] whitespace-pre-wrap overflow-x-auto max-h-48 overflow-y-auto">{goalPrompt.promptText}</pre>
              <div className="mt-2 flex items-start gap-2">
                <button onClick={copyPrompt}
                  className="flex items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs text-[#374151] hover:bg-[#f9fafb] transition-colors">
                  {promptCopied ? <><CheckCheck size={12} className="text-green-600" /> Copied</> : <><Copy size={12} /> Copy prompt</>}
                </button>
                <p className="text-xs text-amber-700 flex-1">{goalPrompt.warningText}</p>
              </div>
            </div>
          )}
        </SectionCard>

        {/* Goals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[#111827]">Your goals</h2>
            {!adding && (
              <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-md bg-[#1e3a8a] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors">
                <Plus size={14} /> Add goal
              </button>
            )}
          </div>
          {adding && <div className="mb-3"><GoalForm onSave={(g) => { addGoal(g); setAdding(false); }} onCancel={() => setAdding(false)} /></div>}
          <div className="space-y-2">
            {goalItems.map((goal) =>
              editingId === goal.id ? (
                <GoalForm key={goal.id} initial={goal} onSave={(g) => { updateGoal(g.id, g); setEditingId(null); }} onCancel={() => setEditingId(null)} />
              ) : (
                <div key={goal.id} className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827]">{goal.title}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={cn("rounded-full px-2 py-0.5 text-xs", CLASS_COLORS[goal.classification])}>
                          {GOAL_CLASSIFICATIONS.find((c) => c.value === goal.classification)?.label ?? goal.classification}
                        </span>
                        {goal.progress && <span className="text-xs text-[#6b7280]">{goal.progress}</span>}
                        {goal.contradictionNote && <span className="rounded-full bg-red-100 text-red-800 px-2 py-0.5 text-xs">contradiction noted</span>}
                      </div>
                      {goal.actualResult && <p className="text-xs text-[#6b7280] mt-1.5 line-clamp-2">{goal.actualResult}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => setEditingId(goal.id)} className="text-[#9ca3af] hover:text-[#1e3a8a]" aria-label="Edit goal"><Pencil size={13} /></button>
                      <button onClick={() => { if (confirm(`Delete "${goal.title}"?`)) deleteGoal(goal.id); }} className="text-[#9ca3af] hover:text-red-600" aria-label="Delete goal"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              )
            )}
            {goalItems.length === 0 && !adding && (
              <div className="rounded-lg border border-dashed border-[#d1d5db] bg-white px-6 py-8 text-center">
                <p className="text-sm text-[#9ca3af]">No goals added yet. Add each goal from Quantum.</p>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <SectionCard title="Self-assessment rating">
          <p className="text-sm text-[#6b7280] mb-4">Consider all complete and current goals together. Exclude only those formally deprioritized with explanation. No rating is pre-selected.</p>
          <RatingSelector anchors={ANCHORS} value={section.selectedRating} onChange={(v) => { setSectionRating("goal-achievement", v); if (section.status === "not-started") setSectionStatus("goal-achievement", "in-progress"); }} sectionId="goal-achievement" />
        </SectionCard>

        {/* Draft */}
        <SectionCard title="Draft response">
          <TextareaField id="ga-draft" label="Your response" description="Reference specific metrics or outcomes. Name any goal delivered at 100% explicitly." value={section.draftResponse} onChange={(v) => setSectionDraft("goal-achievement", v)} rows={8} placeholder="Reflecting on my goals this period..." />
        </SectionCard>

        <ReviewFlagList flags={flags} sectionId="goal-achievement" />
      </div>
    </SectionPage>
  );
}
