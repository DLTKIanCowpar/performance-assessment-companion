import type { AppState } from "@/state/types";
import { validateImport } from "@/lib/persistence/migrations";

export function exportJSON(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function parseAndValidateImport(raw: string): AppState | null {
  try {
    const parsed = JSON.parse(raw);
    return validateImport(parsed);
  } catch {
    return null;
  }
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
