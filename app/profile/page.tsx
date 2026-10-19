"use client";

import { useStore } from "@/lib/persistence/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DISCIPLINE_OPTIONS, getLevelOptions } from "@/content/index";
import type { DisciplineId, TimeInRole, UserProfile } from "@/state/types";
import { SectionCard, InputField, TextareaField } from "@/components/shared/SectionLayout";
import { ContentStatusBadge } from "@/components/shared/ContentStatusBadge";
import { DISCIPLINES } from "@/content/index";
import { AlertTriangle } from "lucide-react";

export default function ProfilePage() {
  const { profile, setProfile, completeFirstRun, firstRunComplete } = useStore();
  const router = useRouter();

  const [name, setName] = useState(profile?.name ?? "");
  const [discipline, setDiscipline] = useState<DisciplineId>(profile?.discipline ?? "engineering");
  const [levelCode, setLevelCode] = useState(profile?.levelCode ?? "");
  const [isManager, setIsManager] = useState(profile?.isManager ?? false);
  const [timeInRole, setTimeInRole] = useState<TimeInRole>(profile?.timeInRole ?? "full-period");
  const [roleTitle, setRoleTitle] = useState(profile?.roleTitle ?? "");
  const [roleChangeContext, setRoleChangeContext] = useState(profile?.roleChangeContext ?? "");
  const [assessmentPeriodNotes, setAssessmentPeriodNotes] = useState(profile?.assessmentPeriodNotes ?? "");
  const [guidanceChanged, setGuidanceChanged] = useState(false);

  const levelOptions = getLevelOptions(discipline);
  const disciplineConfig = DISCIPLINES[discipline];

  // Reset level when discipline changes
  const handleDisciplineChange = (val: DisciplineId) => {
    if (profile && profile.discipline !== val) setGuidanceChanged(true);
    setDiscipline(val);
    setLevelCode("");
  };

  const isValid = discipline && levelCode;

  const handleSave = () => {
    const newProfile: UserProfile = {
      name,
      discipline,
      levelCode,
      isManager,
      timeInRole,
      roleTitle,
      roleChangeContext,
      assessmentPeriodNotes,
    };
    setProfile(newProfile);
    if (!firstRunComplete) completeFirstRun();
    router.push("/overview");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111827]">My Profile</h1>
        <p className="mt-1 text-[#6b7280] text-sm">
          Your profile determines which calibration guidance loads throughout the application. You can update it at any time — your evidence and responses are always preserved.
        </p>
      </div>

      {guidanceChanged && (
        <div className="mb-4 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
          <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <span>Your guidance changed. Existing evidence and drafts have been preserved.</span>
        </div>
      )}

      <div className="space-y-5">
        <SectionCard title="Role">
          <div className="space-y-4">
            <InputField
              id="name"
              label="Your name (optional)"
              value={name}
              onChange={setName}
              placeholder="e.g. Alex Chen"
            />
            <InputField
              id="role-title"
              label="Current role title (optional)"
              value={roleTitle}
              onChange={setRoleTitle}
              placeholder="e.g. Senior Software Engineer"
            />

            <div>
              <label htmlFor="discipline" className="block text-sm font-medium text-[#111827] mb-1">
                Discipline <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <select
                id="discipline"
                value={discipline}
                onChange={(e) => handleDisciplineChange(e.target.value as DisciplineId)}
                className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#1e3a8a]"
              >
                {DISCIPLINE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>

            <ContentStatusBadge status={disciplineConfig.status} />

            {discipline !== "other" && (
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-[#111827] mb-1">
                  Level <span aria-hidden="true" className="text-red-500">*</span>
                </label>
                <select
                  id="level"
                  value={levelCode}
                  onChange={(e) => setLevelCode(e.target.value)}
                  className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#1e3a8a]"
                >
                  <option value="">Select your level</option>
                  {levelOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}

            {discipline === "other" && (
              <div>
                <label htmlFor="level-other" className="block text-sm font-medium text-[#111827] mb-1">
                  Level code
                </label>
                <input
                  id="level-other"
                  type="text"
                  value={levelCode}
                  onChange={(e) => setLevelCode(e.target.value)}
                  placeholder="e.g. IC3"
                  className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#1e3a8a]"
                />
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Manager status">
          <fieldset>
            <legend className="sr-only">Are you a people manager?</legend>
            <div className="space-y-2">
              {[
                { val: false, label: "No — I am an individual contributor" },
                { val: true, label: "Yes — I lead people" },
              ].map(({ val, label }) => (
                <label
                  key={String(val)}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${isManager === val ? "border-[#1e3a8a] bg-[#eff6ff]" : "border-[#e5e7eb] bg-white hover:bg-[#f9fafb]"}`}
                >
                  <input
                    type="radio"
                    name="manager-status"
                    checked={isManager === val}
                    onChange={() => setIsManager(val)}
                    className="h-4 w-4 accent-[#1e3a8a]"
                  />
                  <span className="text-sm text-[#111827]">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {isManager && (
            <p className="mt-3 text-xs text-[#6b7280]">
              The Leadership section will appear in your navigation and Assessment Builder.
            </p>
          )}
        </SectionCard>

        <SectionCard title="Time in role">
          <fieldset>
            <legend className="sr-only">Your time in this role</legend>
            <div className="space-y-2">
              {[
                { val: "full-period" as TimeInRole, label: "Full assessment period — I was in this role for the entire period" },
                { val: "joined-during" as TimeInRole, label: "Joined during the period — I started at Deltek or in this role partway through" },
                { val: "changed-roles-during" as TimeInRole, label: "Changed roles during the period — I moved from another role" },
              ].map(({ val, label }) => (
                <label
                  key={val}
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${timeInRole === val ? "border-[#1e3a8a] bg-[#eff6ff]" : "border-[#e5e7eb] bg-white hover:bg-[#f9fafb]"}`}
                >
                  <input
                    type="radio"
                    name="time-in-role"
                    checked={timeInRole === val}
                    onChange={() => setTimeInRole(val)}
                    className="mt-0.5 h-4 w-4 accent-[#1e3a8a]"
                  />
                  <span className="text-sm text-[#111827]">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {(timeInRole === "joined-during" || timeInRole === "changed-roles-during") && (
            <div className="mt-4">
              <TextareaField
                id="role-change-context"
                label="Context (optional)"
                description="e.g. start date, prior role, or circumstances. This helps calibrate your responses to your actual time in role."
                value={roleChangeContext}
                onChange={setRoleChangeContext}
                rows={2}
                placeholder="e.g. Joined January 2026 from the analytics team"
              />
            </div>
          )}
        </SectionCard>

        <SectionCard title="Assessment period notes (optional)">
          <TextareaField
            id="assessment-notes"
            label="Anything worth noting about this period"
            description="Organizational changes, extended leave, significant resource constraints — context you want to remember when preparing responses."
            value={assessmentPeriodNotes}
            onChange={setAssessmentPeriodNotes}
            rows={3}
            placeholder="Optional context for this assessment period"
          />
        </SectionCard>

        <button
          onClick={handleSave}
          disabled={!isValid}
          className="w-full rounded-lg bg-[#1e3a8a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1e40af] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]"
        >
          {profile ? "Save profile" : "Save and continue"}
        </button>
      </div>
    </div>
  );
}
