import type { ContentStatus } from "@/state/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";

const CONFIG: Record<ContentStatus, { label: string; className: string; icon?: React.ReactNode }> = {
  approved: { label: "Approved", className: "hidden" },
  draft: {
    label: "Draft — not yet approved for distribution",
    className: "bg-amber-50 border border-amber-200 text-amber-800",
    icon: <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />,
  },
  provisional: {
    label: "Provisional — level mapping is an assumption pending HR confirmation",
    className: "bg-amber-50 border border-amber-200 text-amber-800",
    icon: <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />,
  },
  placeholder: {
    label: "Detailed role guidance is not currently available. General assessment guidance applies.",
    className: "bg-blue-50 border border-blue-200 text-blue-800",
    icon: <Info size={14} className="text-blue-600 flex-shrink-0" />,
  },
  superseded: {
    label: "This content has been superseded.",
    className: "bg-gray-100 border border-gray-200 text-gray-600",
    icon: <Info size={14} className="flex-shrink-0" />,
  },
};

interface Props {
  status: ContentStatus;
  className?: string;
}

export function ContentStatusBadge({ status, className }: Props) {
  const config = CONFIG[status];
  if (status === "approved") return null;

  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-md px-3 py-2.5 text-sm",
        config.className,
        className
      )}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
