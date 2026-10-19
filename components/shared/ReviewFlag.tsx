import type { ReviewFlag } from "@/state/types";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const SEVERITY_CONFIG = {
  information: {
    icon: <Info size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />,
    className: "bg-blue-50 border-blue-200 text-blue-800",
  },
  review: {
    icon: <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />,
    className: "bg-amber-50 border-amber-200 text-amber-800",
  },
  important: {
    icon: <AlertCircle size={14} className="text-red-600 flex-shrink-0 mt-0.5" />,
    className: "bg-red-50 border-red-200 text-red-800",
  },
};

interface Props {
  flag: ReviewFlag;
}

export function ReviewFlagItem({ flag }: Props) {
  const config = SEVERITY_CONFIG[flag.severity];
  return (
    <div
      role="note"
      className={cn("flex items-start gap-2 rounded-md border px-3 py-2.5 text-sm", config.className)}
    >
      {config.icon}
      <span>{flag.message}</span>
    </div>
  );
}

interface ListProps {
  flags: ReviewFlag[];
  sectionId?: string;
}

export function ReviewFlagList({ flags, sectionId }: ListProps) {
  const filtered = sectionId
    ? flags.filter((f) => f.affectedSectionId === sectionId)
    : flags;

  if (filtered.length === 0) return null;

  return (
    <div className="space-y-2" role="list" aria-label="Review notices">
      {filtered.map((flag) => (
        <div key={flag.id} role="listitem">
          <ReviewFlagItem flag={flag} />
        </div>
      ))}
    </div>
  );
}
