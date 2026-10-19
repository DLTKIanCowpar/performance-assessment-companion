import type { DisciplineConfig } from "@/state/types";

const SOURCE = {
  filename: "N/A",
  status: "placeholder" as const,
  lastReviewedDate: "2026-10-19",
  notes: "No discipline-specific calibration guide is available for this discipline.",
};

const config: DisciplineConfig = {
  id: "other",
  label: "Other / Guide not yet available",
  status: "placeholder",
  source: SOURCE,
  levels: [],
};

export default config;
