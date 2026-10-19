"use client";

import type { RatingValue, RatingAnchor } from "@/state/types";
import { cn } from "@/lib/utils";

interface Props {
  anchors: RatingAnchor[];
  value: RatingValue | null;
  onChange: (value: RatingValue) => void;
  sectionId: string;
  disabled?: boolean;
}

export function RatingSelector({ anchors, value, onChange, sectionId, disabled }: Props) {
  return (
    <fieldset>
      <legend className="sr-only">Select your self-assessment rating</legend>
      <div className="space-y-2">
        {anchors.map((anchor) => {
          const id = `${sectionId}-rating-${anchor.value}`;
          const isSelected = value === anchor.value;
          return (
            <label
              key={anchor.value}
              htmlFor={id}
              className={cn(
                "flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors",
                isSelected
                  ? "border-[#1e3a8a] bg-[#eff6ff]"
                  : "border-[#e5e7eb] bg-white hover:border-[#9ca3af] hover:bg-[#f9fafb]",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <input
                id={id}
                type="radio"
                name={`${sectionId}-rating`}
                value={anchor.value}
                checked={isSelected}
                onChange={() => !disabled && onChange(anchor.value)}
                disabled={disabled}
                className="mt-0.5 h-4 w-4 accent-[#1e3a8a] flex-shrink-0"
                aria-describedby={`${id}-desc`}
              />
              <div>
                <span className="text-sm font-medium text-[#111827]">
                  {anchor.value} — {anchor.label}
                </span>
                <p id={`${id}-desc`} className="mt-0.5 text-sm text-[#6b7280]">
                  {anchor.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
      {value === null && (
        <p className="mt-2 text-xs text-[#9ca3af]">
          Review your evidence before selecting a rating. No rating is pre-selected.
        </p>
      )}
    </fieldset>
  );
}
