"use client";

import { useState } from "react";
import { useStore } from "@/lib/persistence/store";
import { ASSESSMENT_QUESTIONS } from "@/content/index";
import { OfficialQuestion, SectionPage, SectionCard, TextareaField, InputField } from "@/components/shared/SectionLayout";
import { evaluateReviewRules } from "@/lib/review-rules/rules";
import { ReviewFlagList } from "@/components/shared/ReviewFlag";
import { EvidencePicker } from "@/components/evidence/EvidencePicker";
import type { ImpactItem, ImpactCategory, EvidenceConfidence } from "@/state/types";
import { generateId, cn } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

const QUESTION = ASSESSMENT_QUESTIONS.find((q) => q.id === "impact")!;

const CATEGORIES: { value: ImpactCategory; label: string }[] = [
  { value: "customer", label: "Customer" },
  { value: "business", label: "Business" },
  { value: "financial", label: "Financial" },
  { value: "operational", label: "Operational" },
  { value: "quality", label: "Quality" },
  { value: "team", label: "Team" },
  { value: "employee", label: "Employee" },
  { value: "risk", label: "Risk" },
  { value: "learning", label: "Learning / Decision quality" },
  { value: "other", label: "Other" },
];

const CONFIDENCE_OPTIONS: { value: EvidenceConfidence; label: string }[] = [
  { value: "verified", label: "Verified" },
  { value: "partially-verified", label: "Partially verified" },
  { value: "qualitative", label: "Qualitative" },
  { value: "being-measured", label: "Still being measured" },
  { value: "needs-verification", label: "Needs verification" },
];

function emptyItem(): Omit<ImpactItem, "id" | "createdAt" | "updatedAt"> {
  return {
    category: "customer", startingCondition: "", contribution: "",
    change: "", evidence: "", scope: "", confidence: "qualitative",
    attribution: "", remainingUncertainty: "", relatedEvidenceIds: [],
  };
}

function ImpactForm({ initial, onSave, onCancel }: { initial?: ImpactItem; onSave: (i: ImpactItem) => void; onCancel: () => void }) {
  const now = new Date().toISOString();
  const [form, setForm] = useState(initial ?? { id: generateId(), createdAt: now, updatedAt: now, ...emptyItem() });
  const set = (field: string, v: unknown) => setForm((p) => ({ ...p, [field]: v }));

  return (
    <div className="rounded-lg border border-[#1e3a8a]/20 bg-white p-5 space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#111827] mb-2">Impact category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c.value} type="button" onClick={() => set("category", c.value)}
              className={cn("rounded-full border px-3 py-1 text-xs transition-colors", form.category === c.value ? "border-[#1e3a8a] bg-[#eff6ff] text-[#1e3a8a]" : "border-[#e5e7eb] text-[#6b7280]")}
              aria-pressed={form.category === c.value}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <TextareaField id="imp-start" label="Starting condition" description="What was the situation before your work?" value={form.startingCondition} onChange={(v) => set("startingCondition", v)} rows={2} placeholder="Before this work, the team was..." />
      <TextareaField id="imp-contribution" label="My contribution" value={form.contribution} onChange={(v) => set("contribution", v)} rows={2} placeholder="I specifically..." />
      <TextareaField id="imp-change" label="What changed or resulted" description="What is different now? Be specific." value={form.change} onChange={(v) => set("change", v)} rows={2} placeholder="As a result..." />
      <InputField id="imp-evidence" label="Evidence or source" value={form.evidence} onChange={(v) => set("evidence", v)} placeholder="e.g. Datadog metric, customer feedback, team survey" />
      <InputField id="imp-scope" label="Scope" description="Who or what was affected?" value={form.scope} onChange={(v) => set("scope", v)} placeholder="e.g. Product team (12 people), enterprise customers" />
      <TextareaField id="imp-attr" label="Attribution" description="How much of this change can reasonably be connected to your contribution? Separate from shared efforts." value={form.attribution} onChange={(v) => set("attribution", v)} rows={2} placeholder="My direct contribution was... the team also contributed..." />
      <TextareaField id="imp-uncertainty" label="Remaining uncertainty (optional)" value={form.remainingUncertainty} onChange={(v) => set("remainingUncertainty", v)} rows={1} placeholder="e.g. Outcome is still being measured" />
      <div>
        <label className="block text-sm font-medium text-[#111827] mb-1">Confidence</label>
        <select value={form.confidence} onChange={(e) => set("confidence", e.target.value)}
          className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[#1e3a8a]">
          {CONFIDENCE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave({ ...form, updatedAt: new Date().toISOString() } as ImpactItem)} disabled={!form.change.trim()}
          className="rounded-md bg-[#1e3a8a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e40af] disabled:opacity-40 transition-colors">Save</button>
        <button onClick={onCancel} className="rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">Cancel</button>
      </div>
    </div>
  );
}

export default function ImpactPage() {
  const state = useStore();
  const { impactItems, addImpactItem, updateImpactItem, deleteImpactItem, sectionState, setSectionDraft, setSectionStatus } = state;
  const flags = evaluateReviewRules(state);
  const section = sectionState["impact"];
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const items = Object.values(impactItems).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <SectionPage sectionId="impact" prevHref="/goal-achievement" nextHref="/values">
      <div className="space-y-6">
        <OfficialQuestion sectionNumber={QUESTION.sectionNumber} title={QUESTION.title} question={QUESTION.selfAssessmentQuestion} />

        <SectionCard title="How to respond">
          <p className="text-sm text-[#374151] leading-relaxed">{QUESTION.howToRateSelf}</p>
        </SectionCard>

        <SectionCard title="Activity to impact check">
          <p className="text-sm text-[#6b7280] mb-3">For each example, be able to answer:</p>
          <div className="space-y-1.5 text-sm text-[#374151]">
            {["What did you do?", "What did you produce?", "What changed?", "How do you know?", "What can reasonably be connected to your contribution?"].map((q, i) => (
              <div key={i} className="flex items-start gap-2"><span className="text-[#1e3a8a] font-bold text-xs mt-0.5">{i + 1}.</span>{q}</div>
            ))}
          </div>
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded px-2.5 py-2">
            Shipping, presenting, attending meetings, producing documents, or volume of activity do not stand alone as impact. Describe what changed.
          </p>
        </SectionCard>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[#111827]">Impact examples</h2>
            {!adding && <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-md bg-[#1e3a8a] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors"><Plus size={14} /> Add example</button>}
          </div>
          {adding && <div className="mb-3"><ImpactForm onSave={(i) => { addImpactItem(i); setAdding(false); }} onCancel={() => setAdding(false)} /></div>}
          <div className="space-y-2">
            {items.map((item) =>
              editingId === item.id ? (
                <ImpactForm key={item.id} initial={item} onSave={(i) => { updateImpactItem(i.id, i); setEditingId(null); }} onCancel={() => setEditingId(null)} />
              ) : (
                <div key={item.id} className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-xs mr-2">{CATEGORIES.find((c) => c.value === item.category)?.label}</span>
                      <span className="text-xs text-[#9ca3af]">{item.confidence.replace(/-/g, " ")}</span>
                      {item.change && <p className="text-sm text-[#374151] mt-1.5 line-clamp-2">{item.change}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => setEditingId(item.id)} className="text-[#9ca3af] hover:text-[#1e3a8a]" aria-label="Edit"><Pencil size={13} /></button>
                      <button onClick={() => { if (confirm("Delete this impact example?")) deleteImpactItem(item.id); }} className="text-[#9ca3af] hover:text-red-600" aria-label="Delete"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              )
            )}
            {items.length === 0 && !adding && (
              <div className="rounded-lg border border-dashed border-[#d1d5db] bg-white px-6 py-8 text-center">
                <p className="text-sm text-[#9ca3af]">No impact examples yet. Start with "What changed because of your work?"</p>
              </div>
            )}
          </div>
        </div>

        <SectionCard title="Evidence links">
          <EvidencePicker sectionId="impact" />
        </SectionCard>

        <SectionCard title="Draft response">
          <TextareaField id="impact-draft" label="Your response" description="Describe what changed or improved because of your contribution. Reference specific outcomes." value={section.draftResponse} onChange={(v) => { setSectionDraft("impact", v); if (section.status === "not-started") setSectionStatus("impact", "in-progress"); }} rows={8} placeholder="The impact of my work this period included..." />
        </SectionCard>

        <ReviewFlagList flags={flags} sectionId="impact" />
      </div>
    </SectionPage>
  );
}
