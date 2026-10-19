"use client";

import { useState } from "react";
import { useStore } from "@/lib/persistence/store";
import { generateId } from "@/lib/utils";
import type { EvidenceItem, EvidenceConfidence, QuestionId } from "@/state/types";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionCard, TextareaField, InputField } from "@/components/shared/SectionLayout";

const CONFIDENCE_OPTIONS: { value: EvidenceConfidence; label: string }[] = [
  { value: "verified", label: "Verified — I can point to a source" },
  { value: "partially-verified", label: "Partially verified — some elements confirmed" },
  { value: "qualitative", label: "Qualitative — based on observation or feedback" },
  { value: "being-measured", label: "Still being measured — outcome not yet final" },
  { value: "needs-verification", label: "Needs verification — I want to confirm this" },
];

const SECTION_LABELS: Record<QuestionId, string> = {
  "role-performance": "Role Performance",
  "goal-achievement": "Goal Achievement",
  impact: "Impact",
  "values-in-action": "Values in Action",
  "development-planning": "Development Planning",
  leadership: "Leadership",
  "overall-rating": "Overall Rating",
};

function emptyEvidence(): Omit<EvidenceItem, "id" | "createdAt" | "updatedAt"> {
  return {
    title: "",
    datePeriod: "",
    situation: "",
    contribution: "",
    output: "",
    outcome: "",
    metric: "",
    sourceReference: "",
    confidence: "qualitative",
    isSharedResult: false,
    individualPartInSharedResult: "",
    relatedSectionIds: [],
    relatedGoalIds: [],
    tags: [],
    verificationStatus: "not-started",
  };
}

interface EvidenceFormProps {
  initial?: EvidenceItem;
  onSave: (item: EvidenceItem) => void;
  onCancel: () => void;
}

function EvidenceForm({ initial, onSave, onCancel }: EvidenceFormProps) {
  const now = new Date().toISOString();
  const [form, setForm] = useState<Omit<EvidenceItem, "id" | "createdAt" | "updatedAt">>(
    initial
      ? {
          title: initial.title,
          datePeriod: initial.datePeriod,
          situation: initial.situation,
          contribution: initial.contribution,
          output: initial.output,
          outcome: initial.outcome,
          metric: initial.metric,
          sourceReference: initial.sourceReference,
          confidence: initial.confidence,
          isSharedResult: initial.isSharedResult,
          individualPartInSharedResult: initial.individualPartInSharedResult,
          relatedSectionIds: initial.relatedSectionIds,
          relatedGoalIds: initial.relatedGoalIds,
          tags: initial.tags,
          verificationStatus: initial.verificationStatus,
        }
      : emptyEvidence()
  );

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleSection = (id: QuestionId) => {
    set(
      "relatedSectionIds",
      form.relatedSectionIds.includes(id)
        ? form.relatedSectionIds.filter((s) => s !== id)
        : [...form.relatedSectionIds, id]
    );
  };

  const isValid = form.title.trim() && form.outcome.trim();

  const handleSave = () => {
    const item: EvidenceItem = {
      id: initial?.id ?? generateId(),
      createdAt: initial?.createdAt ?? now,
      updatedAt: now,
      ...form,
    };
    onSave(item);
  };

  const sectionOptions: QuestionId[] = [
    "role-performance", "goal-achievement", "impact", "values-in-action",
    "development-planning", "leadership", "overall-rating",
  ];

  return (
    <div className="rounded-lg border border-[#1e3a8a]/20 bg-white p-5 space-y-4">
      <InputField
        id="ev-title"
        label="Title *"
        description="A short name for this evidence item"
        value={form.title}
        onChange={(v) => set("title", v)}
        placeholder="e.g. Redesigned onboarding checkout flow"
      />
      <InputField
        id="ev-date"
        label="Date or period (optional)"
        value={form.datePeriod}
        onChange={(v) => set("datePeriod", v)}
        placeholder="e.g. Q2 2026, March 2026"
      />
      <TextareaField
        id="ev-situation"
        label="Situation"
        description="What was the context or starting condition?"
        value={form.situation}
        onChange={(v) => set("situation", v)}
        rows={2}
        placeholder="The existing flow had a 40% drop-off rate at the payment step..."
      />
      <TextareaField
        id="ev-contribution"
        label="My contribution"
        description="What specifically did you do? Separate your part from team efforts."
        value={form.contribution}
        onChange={(v) => set("contribution", v)}
        rows={3}
        placeholder="I led the UX research, ran 6 user sessions, and redesigned the payment step..."
      />
      <TextareaField
        id="ev-output"
        label="Output"
        description="What did you produce or deliver?"
        value={form.output}
        onChange={(v) => set("output", v)}
        rows={2}
        placeholder="Redesigned flow with 3 fewer steps, shipped to production in April"
      />
      <TextareaField
        id="ev-outcome"
        label="Outcome *"
        description="What changed because of this work?"
        value={form.outcome}
        onChange={(v) => set("outcome", v)}
        rows={2}
        placeholder="Drop-off rate reduced from 40% to 22% in the following month"
      />
      <InputField
        id="ev-metric"
        label="Metric or observable signal"
        description="A number, a decision made, feedback received, or observable change"
        value={form.metric}
        onChange={(v) => set("metric", v)}
        placeholder="e.g. Drop-off: 40% → 22% (Mixpanel, May 2026)"
      />
      <InputField
        id="ev-source"
        label="Source reference (optional)"
        description="Where could this be verified? Ticket, PR, Mixpanel dashboard, etc."
        value={form.sourceReference}
        onChange={(v) => set("sourceReference", v)}
        placeholder="e.g. JIRA-4821, Mixpanel checkout_complete event"
      />

      {/* Confidence */}
      <div>
        <label htmlFor="ev-confidence" className="block text-sm font-medium text-[#111827] mb-1">
          Confidence level
        </label>
        <select
          id="ev-confidence"
          value={form.confidence}
          onChange={(e) => set("confidence", e.target.value)}
          className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#1e3a8a]"
        >
          {CONFIDENCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Shared result */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isSharedResult}
            onChange={(e) => set("isSharedResult", e.target.checked)}
            className="h-4 w-4 accent-[#1e3a8a]"
          />
          <span className="text-sm font-medium text-[#111827]">This is a shared team result</span>
        </label>
        {form.isSharedResult && (
          <div className="mt-3">
            <TextareaField
              id="ev-shared"
              label="My specific part in the shared result"
              description="Be precise — what was your individual contribution to this team outcome?"
              value={form.individualPartInSharedResult}
              onChange={(v) => set("individualPartInSharedResult", v)}
              rows={2}
              placeholder="I owned the research phase and the final recommendation..."
            />
          </div>
        )}
      </div>

      {/* Section links */}
      <div>
        <p className="text-sm font-medium text-[#111827] mb-2">Related assessment sections</p>
        <div className="flex flex-wrap gap-2">
          {sectionOptions.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleSection(id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                form.relatedSectionIds.includes(id)
                  ? "border-[#1e3a8a] bg-[#eff6ff] text-[#1e3a8a]"
                  : "border-[#e5e7eb] text-[#6b7280] hover:border-[#9ca3af]"
              )}
              aria-pressed={form.relatedSectionIds.includes(id)}
            >
              {SECTION_LABELS[id]}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-[#9ca3af]">
          One evidence item can support multiple sections without duplication.
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="rounded-md bg-[#1e3a8a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e40af] disabled:opacity-40 transition-colors"
        >
          Save evidence
        </button>
        <button
          onClick={onCancel}
          className="rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function EvidenceCard({ item, onEdit, onDelete }: { item: EvidenceItem; onEdit: () => void; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const confidenceColors: Record<EvidenceConfidence, string> = {
    verified: "bg-green-100 text-green-800",
    "partially-verified": "bg-blue-100 text-blue-800",
    qualitative: "bg-gray-100 text-gray-700",
    "being-measured": "bg-amber-100 text-amber-800",
    "needs-verification": "bg-red-100 text-red-800",
  };

  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white">
      <button
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#111827] truncate">{item.title}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {item.datePeriod && (
              <span className="text-xs text-[#9ca3af]">{item.datePeriod}</span>
            )}
            <span className={cn("rounded-full px-2 py-0.5 text-xs", confidenceColors[item.confidence])}>
              {item.confidence.replace(/-/g, " ")}
            </span>
            {item.isSharedResult && (
              <span className="rounded-full bg-purple-100 text-purple-800 px-2 py-0.5 text-xs">shared</span>
            )}
            {item.relatedSectionIds.length > 0 && (
              <span className="flex items-center gap-0.5 text-xs text-[#9ca3af]">
                <LinkIcon size={10} />
                {item.relatedSectionIds.length} section{item.relatedSectionIds.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
        {expanded ? <ChevronUp size={15} className="text-[#9ca3af] mt-0.5 flex-shrink-0" /> : <ChevronDown size={15} className="text-[#9ca3af] mt-0.5 flex-shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-[#e5e7eb] px-4 py-3 space-y-2">
          {item.outcome && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Outcome</p>
              <p className="text-sm text-[#374151] mt-0.5">{item.outcome}</p>
            </div>
          )}
          {item.metric && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Metric</p>
              <p className="text-sm text-[#374151] mt-0.5">{item.metric}</p>
            </div>
          )}
          {item.contribution && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">My contribution</p>
              <p className="text-sm text-[#374151] mt-0.5">{item.contribution}</p>
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <button onClick={onEdit} className="flex items-center gap-1 text-xs text-[#1e3a8a] hover:underline">
              <Pencil size={11} /> Edit
            </button>
            <button onClick={onDelete} className="flex items-center gap-1 text-xs text-red-600 hover:underline">
              <Trash2 size={11} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EvidencePage() {
  const { evidence, addEvidence, updateEvidence, deleteEvidence } = useStore();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const items = Object.values(evidence).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Evidence Library</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Capture accomplishments, outcomes, decisions, and metrics here once — then link them to any assessment section. Capture across the full period, not only recent work.
          </p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 rounded-md bg-[#1e3a8a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors flex-shrink-0"
          >
            <Plus size={15} /> Add evidence
          </button>
        )}
      </div>

      <div className="mb-4 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm text-[#6b7280]">
        <strong className="text-[#374151]">{items.length}</strong> evidence item{items.length !== 1 ? "s" : ""} captured.
        {items.length > 0 && (
          <> One item can support multiple sections — each item counts once toward your unique evidence total.</>
        )}
      </div>

      {adding && (
        <div className="mb-4">
          <EvidenceForm
            onSave={(item) => { addEvidence(item); setAdding(false); }}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) =>
          editingId === item.id ? (
            <EvidenceForm
              key={item.id}
              initial={item}
              onSave={(updated) => { updateEvidence(updated.id, updated); setEditingId(null); }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <EvidenceCard
              key={item.id}
              item={item}
              onEdit={() => setEditingId(item.id)}
              onDelete={() => {
                if (confirm(`Delete "${item.title}"? This will remove it from all linked sections.`))
                  deleteEvidence(item.id);
              }}
            />
          )
        )}
        {items.length === 0 && !adding && (
          <div className="rounded-lg border border-dashed border-[#d1d5db] bg-white px-6 py-10 text-center">
            <p className="text-sm font-medium text-[#374151]">No evidence yet</p>
            <p className="mt-1 text-sm text-[#9ca3af]">Add your first accomplishment, outcome, or example to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
