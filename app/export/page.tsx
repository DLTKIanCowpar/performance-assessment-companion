"use client";

import { useState, useRef } from "react";
import { useStore } from "@/lib/persistence/store";
import { exportMarkdown } from "@/lib/export/markdown";
import { exportJSON, parseAndValidateImport, downloadFile } from "@/lib/export/json";
import { Download, Upload, Trash2, CheckCheck, AlertTriangle } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionLayout";

export default function ExportPage() {
  const state = useStore();
  const { importState, resetState } = useStore();
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [importError, setImportError] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleMarkdownExport = () => {
    const md = exportMarkdown(state);
    downloadFile(md, "performance-assessment-2026.md", "text/markdown");
  };

  const handleJSONExport = () => {
    const json = exportJSON(state);
    downloadFile(json, "performance-assessment-backup.json", "application/json");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const parsed = parseAndValidateImport(content);
      if (!parsed) {
        setImportStatus("error");
        setImportError("The file could not be read or does not match the expected format. Your current data has not been changed.");
        return;
      }
      importState(parsed);
      setImportStatus("success");
      setImportError("");
    };
    reader.readAsText(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleReset = () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    resetState();
    setConfirmReset(false);
  };

  const evidenceCount = Object.keys(state.evidence).length;
  const goalCount = Object.keys(state.goals).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111827]">Export & Data</h1>
        <p className="mt-1 text-sm text-[#6b7280]">
          Your data lives in this browser only. Export regularly to avoid data loss if your browser storage is cleared.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-white px-4 py-4">
        <p className="text-sm font-medium text-[#111827] mb-2">What's in your workspace</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="font-bold text-[#1e3a8a]">{evidenceCount}</span> evidence items</div>
          <div><span className="font-bold text-[#1e3a8a]">{goalCount}</span> goals</div>
          <div><span className="font-bold text-[#1e3a8a]">{Object.values(state.sectionState).filter(s => s.status === "ready").length}</span> sections ready</div>
          <div><span className="font-bold text-[#1e3a8a]">{state.profile ? "1" : "0"}</span> profile</div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Markdown export */}
        <SectionCard title="Export for review">
          <p className="text-sm text-[#6b7280] mb-4">
            Download a readable Markdown file containing your profile, all responses, ratings, and evidence. Use this to review your assessment before entering it in the official system.
          </p>
          <button onClick={handleMarkdownExport}
            className="flex items-center gap-2 rounded-md bg-[#1e3a8a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors">
            <Download size={15} /> Download Markdown
          </button>
        </SectionCard>

        {/* JSON backup */}
        <SectionCard title="Backup your work">
          <p className="text-sm text-[#6b7280] mb-4">
            Download a complete JSON backup of all your data. You can restore this file to recover your work if your browser storage is cleared or you switch devices.
          </p>
          <button onClick={handleJSONExport}
            className="flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">
            <Download size={15} /> Download JSON backup
          </button>
          <p className="mt-2 text-xs text-amber-700 flex items-start gap-1.5">
            <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
            Local storage is not permanent. Back up your work if you've made significant progress.
          </p>
        </SectionCard>

        {/* Restore */}
        <SectionCard title="Restore from backup">
          <p className="text-sm text-[#6b7280] mb-4">
            Upload a previously exported JSON backup to restore your work. This will replace your current workspace with the backup data. Invalid files will not overwrite your current data.
          </p>
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">
            <Upload size={15} /> Import JSON backup
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="sr-only" aria-label="Select JSON backup file" />
          {importStatus === "success" && (
            <div className="mt-3 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
              <CheckCheck size={14} /> Backup restored successfully.
            </div>
          )}
          {importStatus === "error" && (
            <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {importError}
            </div>
          )}
        </SectionCard>

        {/* Print */}
        <SectionCard title="Print">
          <p className="text-sm text-[#6b7280] mb-4">Open a printer-friendly view of your assessment preparation.</p>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">
            Print preparation
          </button>
        </SectionCard>

        {/* Clear data */}
        <SectionCard title="Clear all data">
          <p className="text-sm text-[#6b7280] mb-4">
            Permanently delete all your evidence, goals, responses, and profile from this browser. This cannot be undone. Download a backup first.
          </p>
          {confirmReset && (
            <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
              This will delete all your work from this browser. Download a backup before continuing.
            </div>
          )}
          <button onClick={handleReset}
            className="flex items-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 size={15} />
            {confirmReset ? "Confirm — delete everything" : "Clear all data"}
          </button>
          {confirmReset && (
            <button onClick={() => setConfirmReset(false)} className="mt-2 text-xs text-[#6b7280] hover:underline">
              Cancel
            </button>
          )}
        </SectionCard>
      </div>

      <div className="mt-6 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-xs text-[#6b7280]">
        <strong className="text-[#374151]">Privacy:</strong> This application stores data only in your browser's local storage. Nothing is transmitted to any server. Clearing your browser data or switching browsers will remove your work unless you have exported a backup.
      </div>
    </div>
  );
}
