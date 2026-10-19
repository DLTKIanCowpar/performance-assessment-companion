import type { DisciplineConfig, DisciplineId } from "@/state/types";
import engineering from "./disciplines/engineering";
import productManagement from "./disciplines/product-management";
import qualityEngineering from "./disciplines/quality-engineering";
import uxDesign from "./disciplines/ux-design";
import uxResearch from "./disciplines/ux-research";
import other from "./disciplines/_other";

export { ASSESSMENT_QUESTIONS } from "./assessment-questions";
export { RATING_SCALES, SECTION_RATING_ANCHORS } from "./rating-scales";
export { LIFT_VALUES } from "./lift-values";
export { PROMPT_TEMPLATES } from "./prompts";

export const DISCIPLINES: Record<DisciplineId, DisciplineConfig> = {
  engineering,
  "product-management": productManagement,
  "quality-engineering": qualityEngineering,
  "ux-design": uxDesign,
  "ux-research": uxResearch,
  other,
};

export const DISCIPLINE_OPTIONS: { id: DisciplineId; label: string }[] = [
  { id: "engineering", label: "Engineering" },
  { id: "product-management", label: "Product Management" },
  { id: "quality-engineering", label: "Quality Engineering" },
  { id: "ux-design", label: "UX Design" },
  { id: "ux-research", label: "UX Research" },
  { id: "other", label: "Other / Guide not yet available" },
];

export function getDisciplineConfig(id: DisciplineId): DisciplineConfig {
  return DISCIPLINES[id] ?? DISCIPLINES.other;
}

export function getLevelOptions(disciplineId: DisciplineId) {
  const config = getDisciplineConfig(disciplineId);
  return config.levels.map((l) => ({
    id: l.levelCode,
    label: `${l.levelCode} — ${l.title}`,
    title: l.title,
    status: l.status,
  }));
}

export function getCalibrationLevel(disciplineId: DisciplineId, levelCode: string) {
  const config = getDisciplineConfig(disciplineId);
  return config.levels.find((l) => l.levelCode === levelCode) ?? null;
}
