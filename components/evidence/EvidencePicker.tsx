"use client";

import { useStore } from "@/lib/persistence/store";
import type { QuestionId } from "@/state/types";
import { Link2, Link2Off } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  sectionId: QuestionId;
}

export function EvidencePicker({ sectionId }: Props) {
  const { evidence, sectionState, linkEvidenceToSection, unlinkEvidenceFromSection } = useStore();
  const linked = sectionState[sectionId]?.linkedEvidenceIds ?? [];
  const allItems = Object.values(evidence);

  if (allItems.length === 0) {
    return (
      <p className="text-sm text-[#9ca3af]">
        No evidence in your library yet.{" "}
        <a href="/evidence" className="text-[#1e3a8a] hover:underline">Add evidence</a> to link it here.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {allItems.map((item) => {
        const isLinked = linked.includes(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "flex items-start justify-between gap-3 rounded-md border px-3 py-2.5 transition-colors",
              isLinked ? "border-[#1e3a8a]/30 bg-[#eff6ff]" : "border-[#e5e7eb] bg-white"
            )}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#111827] truncate">{item.title}</p>
              {item.outcome && (
                <p className="text-xs text-[#6b7280] mt-0.5 line-clamp-1">{item.outcome}</p>
              )}
            </div>
            <button
              onClick={() =>
                isLinked
                  ? unlinkEvidenceFromSection(sectionId, item.id)
                  : linkEvidenceToSection(sectionId, item.id)
              }
              className={cn(
                "flex items-center gap-1 rounded text-xs px-2 py-1 flex-shrink-0 transition-colors",
                isLinked
                  ? "text-[#1e3a8a] hover:bg-[#dbeafe]"
                  : "text-[#6b7280] hover:bg-[#f3f4f6]"
              )}
              aria-pressed={isLinked}
              aria-label={isLinked ? `Unlink "${item.title}" from this section` : `Link "${item.title}" to this section`}
            >
              {isLinked ? <Link2 size={12} /> : <Link2Off size={12} />}
              {isLinked ? "Linked" : "Link"}
            </button>
          </div>
        );
      })}
      {linked.length > 0 && (
        <p className="text-xs text-[#9ca3af]">
          {linked.length} item{linked.length !== 1 ? "s" : ""} linked to this section.
        </p>
      )}
    </div>
  );
}
