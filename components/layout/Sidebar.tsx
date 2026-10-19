"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles,
  Sprout,
  Users,
  FileText,
  CheckSquare,
  Download,
  Save,
} from "lucide-react";
import { cn, formatTimestamp } from "@/lib/utils";
import { useStore } from "@/lib/persistence/store";
import { calculateProgress } from "@/lib/progress/calculator";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  sectionId?: string;
  managerOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
  { href: "/profile", label: "My Profile", icon: <User size={16} /> },
  { href: "/evidence", label: "Evidence Library", icon: <BookOpen size={16} />, sectionId: undefined },
  { href: "/role-performance", label: "Role Performance", icon: <Target size={16} />, sectionId: "role-performance" },
  { href: "/goal-achievement", label: "Goal Achievement", icon: <TrendingUp size={16} />, sectionId: "goal-achievement" },
  { href: "/impact", label: "Impact", icon: <Sparkles size={16} />, sectionId: "impact" },
  { href: "/values", label: "Values in Action", icon: <Sprout size={16} />, sectionId: "values-in-action" },
  { href: "/development", label: "Development Planning", icon: <Sprout size={16} />, sectionId: "development-planning" },
  { href: "/leadership", label: "Leadership", icon: <Users size={16} />, sectionId: "leadership", managerOnly: true },
  { href: "/builder", label: "Assessment Builder", icon: <FileText size={16} /> },
  { href: "/review", label: "Final Review", icon: <CheckSquare size={16} /> },
  { href: "/export", label: "Export & Data", icon: <Download size={16} /> },
];

const STATUS_COLORS: Record<string, string> = {
  "not-started": "bg-[#e5e7eb]",
  "in-progress": "bg-[#d97706]",
  "ready": "bg-[#16a34a]",
};

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const state = useStore();
  const isManager = state.profile?.isManager ?? false;
  const progress = calculateProgress(state);

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.managerOnly && !isManager) return false;
    return true;
  });

  return (
    <nav
      className="flex h-full flex-col border-r border-[#e5e7eb] bg-white"
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="border-b border-[#e5e7eb] px-4 py-4">
        <p className="text-sm font-semibold text-[#1e3a8a] leading-tight">
          Performance Assessment Companion
        </p>
        <p className="mt-0.5 text-xs text-[#6b7280]">2026 preparation workspace</p>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1">
            <span>Overall progress</span>
            <span>{progress.overallPercent}%</span>
          </div>
          <div
            className="h-1.5 w-full rounded-full bg-[#f3f4f6] overflow-hidden"
            role="progressbar"
            aria-valuenow={progress.overallPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall preparation progress"
          >
            <div
              className="h-full rounded-full bg-[#1e3a8a] transition-all"
              style={{ width: `${progress.overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-2">
        <ul role="list" className="space-y-0.5 px-2">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const sectionStatus = item.sectionId
              ? progress.sectionCompletion[item.sectionId as keyof typeof progress.sectionCompletion]
              : undefined;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-[#eff6ff] text-[#1e3a8a] font-medium"
                      : "text-[#374151] hover:bg-[#f9fafb]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={cn(isActive ? "text-[#1e3a8a]" : "text-[#9ca3af]")}>
                    {item.icon}
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {sectionStatus && (
                    <span
                      className={cn("h-2 w-2 rounded-full flex-shrink-0", STATUS_COLORS[sectionStatus])}
                      aria-label={`Status: ${sectionStatus.replace("-", " ")}`}
                      title={sectionStatus.replace("-", " ")}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-[#e5e7eb] px-4 py-3 space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
          <Save size={11} />
          <span>Saved locally</span>
        </div>
        <p className="text-xs text-[#9ca3af]">
          {formatTimestamp(state.lastSavedAt)}
        </p>
        <p className="text-xs text-[#9ca3af]">
          MVP prototype — data stays in this browser
        </p>
      </div>
    </nav>
  );
}
