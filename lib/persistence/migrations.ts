import type { AppState } from "@/state/types";
import { createInitialState } from "@/state/initial";

type MigrationFn = (state: AppState) => AppState;

const migrations: Record<number, MigrationFn> = {
  // v1 is the initial schema — no migration needed
};

export function runMigrations(state: AppState): AppState {
  if (!state || typeof state.schemaVersion !== "number") {
    return createInitialState();
  }

  const CURRENT_VERSION = 1;
  let current = state;

  for (let v = current.schemaVersion; v < CURRENT_VERSION; v++) {
    const migrate = migrations[v];
    if (migrate) {
      current = migrate(current);
      current = { ...current, schemaVersion: v + 1 };
    }
  }

  return current;
}

export function validateImport(raw: unknown): AppState | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (typeof obj.schemaVersion !== "number") return null;
  if (typeof obj.firstRunComplete !== "boolean") return null;
  if (!obj.evidence || typeof obj.evidence !== "object") return null;
  if (!obj.goals || typeof obj.goals !== "object") return null;
  return runMigrations(obj as unknown as AppState);
}
