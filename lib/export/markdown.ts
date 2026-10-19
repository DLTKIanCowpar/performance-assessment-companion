import type { AppState, QuestionId } from "@/state/types";
import { ASSESSMENT_QUESTIONS } from "@/content/index";
import { SECTION_RATING_ANCHORS } from "@/content/rating-scales";

export function exportMarkdown(state: AppState): string {
  const p = state.profile;
  const lines: string[] = [];

  lines.push("# 2026 Performance Assessment Preparation");
  lines.push(`*Generated ${new Date().toLocaleDateString()}*`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Profile");
  if (p) {
    if (p.name) lines.push(`**Name:** ${p.name}`);
    lines.push(`**Discipline:** ${p.discipline}`);
    lines.push(`**Level:** ${p.levelCode}`);
    if (p.roleTitle) lines.push(`**Role Title:** ${p.roleTitle}`);
    lines.push(`**People Manager:** ${p.isManager ? "Yes" : "No"}`);
    lines.push(`**Time in Role:** ${p.timeInRole}`);
    if (p.roleChangeContext) lines.push(`**Context:** ${p.roleChangeContext}`);
  } else {
    lines.push("*Profile not completed.*");
  }

  lines.push("");
  lines.push("---");
  lines.push("");

  const questions = ASSESSMENT_QUESTIONS.filter((q) => {
    if (q.applicability === "people-managers-only" && !p?.isManager) return false;
    return true;
  });

  for (const q of questions) {
    const section = state.sectionState[q.id];
    lines.push(`## ${q.sectionNumber > 0 ? `0${q.sectionNumber} ` : ""}${q.title}`);
    lines.push(`*Official question: ${q.selfAssessmentQuestion}*`);
    lines.push("");

    if (q.responseType === "rated") {
      const rating = section?.selectedRating;
      if (rating) {
        const scale = SECTION_RATING_ANCHORS[q.id];
        const anchor = scale?.anchors.find((a) => a.value === rating);
        lines.push(`**Self-Assessment Rating:** ${rating} — ${anchor?.label ?? ""}`);
      } else {
        lines.push("**Self-Assessment Rating:** *Not selected*");
      }
      lines.push("");
    }

    const draft = section?.draftResponse?.trim();
    if (draft) {
      lines.push("**Response:**");
      lines.push(draft);
    } else {
      lines.push("**Response:** *Not drafted*");
    }

    lines.push("");

    // Supporting evidence
    const evidenceIds = section?.linkedEvidenceIds ?? [];
    if (evidenceIds.length > 0) {
      lines.push("**Supporting Evidence:**");
      for (const eid of evidenceIds) {
        const item = state.evidence[eid];
        if (!item) continue;
        lines.push(`- **${item.title}** (${item.confidence})`);
        if (item.outcome) lines.push(`  - Outcome: ${item.outcome}`);
        if (item.metric) lines.push(`  - Metric: ${item.metric}`);
      }
    }

    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Evidence library
  const evidenceItems = Object.values(state.evidence);
  if (evidenceItems.length > 0) {
    lines.push("## Evidence Library");
    for (const item of evidenceItems) {
      lines.push(`### ${item.title}`);
      if (item.datePeriod) lines.push(`*Period: ${item.datePeriod}*`);
      if (item.situation) lines.push(`**Situation:** ${item.situation}`);
      if (item.contribution) lines.push(`**Contribution:** ${item.contribution}`);
      if (item.output) lines.push(`**Output:** ${item.output}`);
      if (item.outcome) lines.push(`**Outcome:** ${item.outcome}`);
      if (item.metric) lines.push(`**Metric:** ${item.metric}`);
      if (item.isSharedResult && item.individualPartInSharedResult) {
        lines.push(`**My Part:** ${item.individualPartInSharedResult}`);
      }
      lines.push(`**Confidence:** ${item.confidence}`);
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }

  lines.push("*This document was prepared using the P&T Performance Assessment Companion (MVP prototype). Data stored locally in your browser.*");

  return lines.join("\n");
}
