"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestionId } from "@/state/types";
import { useStore } from "@/lib/persistence/store";

interface OfficialQuestionProps {
  sectionNumber: number;
  title: string;
  question: string;
}

export function OfficialQuestion({ sectionNumber, title, question }: OfficialQuestionProps) {
  return (
    <div className="rounded-lg border border-[#1e3a8a]/20 bg-[#eff6ff] px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#1e3a8a]/70 mb-1">
        Official assessment question {String(sectionNumber).padStart(2, "0")}
      </p>
      <h1 className="text-lg font-semibold text-[#1e3a8a]">{title}</h1>
      <p className="mt-2 text-[#1e3558] leading-relaxed">{question}</p>
    </div>
  );
}

interface SectionPageProps {
  sectionId: QuestionId;
  prevHref?: string;
  nextHref?: string;
  children: React.ReactNode;
}

export function SectionPage({ sectionId, prevHref, nextHref, children }: SectionPageProps) {
  const { sectionState, setSectionStatus } = useStore();
  const status = sectionState[sectionId]?.status ?? "not-started";

  const handleMarkReady = () => {
    setSectionStatus(sectionId, status === "ready" ? "in-progress" : "ready");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {children}

      {/* Footer controls */}
      <div className="mt-10 flex items-center justify-between border-t border-[#e5e7eb] pt-6">
        <div className="flex items-center gap-3">
          {prevHref && (
            <Link
              href={prevHref}
              className="flex items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors"
            >
              <ChevronLeft size={15} /> Previous
            </Link>
          )}
          {nextHref && (
            <Link
              href={nextHref}
              className="flex items-center gap-1.5 rounded-md bg-[#1e3a8a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors"
            >
              Continue <ChevronRight size={15} />
            </Link>
          )}
        </div>
        <button
          onClick={handleMarkReady}
          className={cn(
            "flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors",
            status === "ready"
              ? "border-[#16a34a]/30 bg-green-50 text-[#16a34a]"
              : "border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb]"
          )}
          aria-pressed={status === "ready"}
        >
          <CheckCircle size={15} />
          {status === "ready" ? "Marked ready" : "Mark ready to review"}
        </button>
      </div>
    </div>
  );
}

interface TextareaFieldProps {
  id: string;
  label: string;
  description?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}

export function TextareaField({ id, label, description, value, onChange, rows = 4, placeholder }: TextareaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#111827] mb-1">
        {label}
      </label>
      {description && <p className="text-sm text-[#6b7280] mb-2">{description}</p>}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9ca3af] focus-visible:outline-2 focus-visible:outline-[#1e3a8a] resize-y"
      />
    </div>
  );
}

interface InputFieldProps {
  id: string;
  label: string;
  description?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export function InputField({ id, label, description, value, onChange, placeholder, type = "text" }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#111827] mb-1">
        {label}
      </label>
      {description && <p className="text-sm text-[#6b7280] mb-2">{description}</p>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9ca3af] focus-visible:outline-2 focus-visible:outline-[#1e3a8a]"
      />
    </div>
  );
}

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    <div className={cn("rounded-lg border border-[#e5e7eb] bg-white p-5", className)}>
      {title && <h2 className="text-base font-semibold text-[#111827] mb-4">{title}</h2>}
      {children}
    </div>
  );
}
