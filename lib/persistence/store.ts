"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AppState,
  UserProfile,
  EvidenceItem,
  Goal,
  ImpactItem,
  QuestionId,
  SectionState,
  SectionStatus,
  RatingValue,
  ValueReflection,
  LiftValueId,
  DevelopmentPlan,
  LeadershipReflection,
} from "@/state/types";
import { createInitialState } from "@/state/initial";
import { runMigrations } from "./migrations";

const STORAGE_KEY = "pt-performance-assessment-companion-v1";

interface StoreActions {
  // Profile
  setProfile: (profile: UserProfile) => void;
  completeFirstRun: () => void;

  // Evidence
  addEvidence: (item: EvidenceItem) => void;
  updateEvidence: (id: string, updates: Partial<EvidenceItem>) => void;
  deleteEvidence: (id: string) => void;

  // Goals
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // Impact
  addImpactItem: (item: ImpactItem) => void;
  updateImpactItem: (id: string, updates: Partial<ImpactItem>) => void;
  deleteImpactItem: (id: string) => void;

  // Value reflections
  updateValueReflection: (valueId: LiftValueId, updates: Partial<ValueReflection>) => void;

  // Development plan
  updateDevelopmentPlan: (updates: Partial<DevelopmentPlan>) => void;

  // Leadership
  updateLeadershipReflection: (updates: Partial<LeadershipReflection>) => void;

  // Section state
  updateSectionState: (sectionId: QuestionId, updates: Partial<SectionState>) => void;
  setSectionStatus: (sectionId: QuestionId, status: SectionStatus) => void;
  setSectionRating: (sectionId: QuestionId, rating: RatingValue | null) => void;
  setSectionDraft: (sectionId: QuestionId, draft: string) => void;
  linkEvidenceToSection: (sectionId: QuestionId, evidenceId: string) => void;
  unlinkEvidenceFromSection: (sectionId: QuestionId, evidenceId: string) => void;

  // Data management
  importState: (state: AppState) => void;
  resetState: () => void;
  touchSaved: () => void;
}

export type Store = AppState & StoreActions;

function now() {
  return new Date().toISOString();
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...createInitialState(),

      setProfile: (profile) =>
        set((s) => ({ ...s, profile, lastSavedAt: now() })),

      completeFirstRun: () =>
        set((s) => ({ ...s, firstRunComplete: true, lastSavedAt: now() })),

      addEvidence: (item) =>
        set((s) => {
          // Auto-link to any sections tagged on the item
          const sectionState = { ...s.sectionState };
          for (const sid of item.relatedSectionIds) {
            const key = sid as QuestionId;
            if (!sectionState[key].linkedEvidenceIds.includes(item.id)) {
              sectionState[key] = {
                ...sectionState[key],
                linkedEvidenceIds: [...sectionState[key].linkedEvidenceIds, item.id],
              };
            }
          }
          return { evidence: { ...s.evidence, [item.id]: item }, sectionState, lastSavedAt: now() };
        }),

      updateEvidence: (id, updates) =>
        set((s) => {
          const prev = s.evidence[id];
          const updated = { ...prev, ...updates, updatedAt: now() };
          // Sync section links with relatedSectionIds
          const sectionState = { ...s.sectionState };
          if (updates.relatedSectionIds) {
            const newSids = updates.relatedSectionIds;
            const allSids = Object.keys(sectionState) as QuestionId[];
            for (const sid of allSids) {
              const linked = sectionState[sid].linkedEvidenceIds;
              const shouldLink = newSids.includes(sid);
              const isLinked = linked.includes(id);
              if (shouldLink && !isLinked) {
                sectionState[sid] = { ...sectionState[sid], linkedEvidenceIds: [...linked, id] };
              } else if (!shouldLink && isLinked) {
                sectionState[sid] = { ...sectionState[sid], linkedEvidenceIds: linked.filter((e) => e !== id) };
              }
            }
          }
          return { evidence: { ...s.evidence, [id]: updated }, sectionState, lastSavedAt: now() };
        }),

      deleteEvidence: (id) =>
        set((s) => {
          const evidence = { ...s.evidence };
          delete evidence[id];
          // Remove links from sections
          const sectionState = { ...s.sectionState };
          for (const key of Object.keys(sectionState) as QuestionId[]) {
            sectionState[key] = {
              ...sectionState[key],
              linkedEvidenceIds: sectionState[key].linkedEvidenceIds.filter(
                (eid) => eid !== id
              ),
            };
          }
          return { evidence, sectionState, lastSavedAt: now() };
        }),

      addGoal: (goal) =>
        set((s) => ({
          goals: { ...s.goals, [goal.id]: goal },
          lastSavedAt: now(),
        })),

      updateGoal: (id, updates) =>
        set((s) => ({
          goals: {
            ...s.goals,
            [id]: { ...s.goals[id], ...updates, updatedAt: now() },
          },
          lastSavedAt: now(),
        })),

      deleteGoal: (id) =>
        set((s) => {
          const goals = { ...s.goals };
          delete goals[id];
          return { goals, lastSavedAt: now() };
        }),

      addImpactItem: (item) =>
        set((s) => ({
          impactItems: { ...s.impactItems, [item.id]: item },
          lastSavedAt: now(),
        })),

      updateImpactItem: (id, updates) =>
        set((s) => ({
          impactItems: {
            ...s.impactItems,
            [id]: { ...s.impactItems[id], ...updates, updatedAt: now() },
          },
          lastSavedAt: now(),
        })),

      deleteImpactItem: (id) =>
        set((s) => {
          const impactItems = { ...s.impactItems };
          delete impactItems[id];
          return { impactItems, lastSavedAt: now() };
        }),

      updateValueReflection: (valueId, updates) =>
        set((s) => ({
          valueReflections: {
            ...s.valueReflections,
            [valueId]: { ...s.valueReflections[valueId], ...updates },
          },
          lastSavedAt: now(),
        })),

      updateDevelopmentPlan: (updates) =>
        set((s) => ({
          developmentPlan: { ...s.developmentPlan, ...updates },
          lastSavedAt: now(),
        })),

      updateLeadershipReflection: (updates) =>
        set((s) => ({
          leadershipReflection: { ...s.leadershipReflection, ...updates },
          lastSavedAt: now(),
        })),

      updateSectionState: (sectionId, updates) =>
        set((s) => ({
          sectionState: {
            ...s.sectionState,
            [sectionId]: { ...s.sectionState[sectionId], ...updates },
          },
          lastSavedAt: now(),
        })),

      setSectionStatus: (sectionId, status) =>
        set((s) => ({
          sectionState: {
            ...s.sectionState,
            [sectionId]: { ...s.sectionState[sectionId], status },
          },
          lastSavedAt: now(),
        })),

      setSectionRating: (sectionId, rating) =>
        set((s) => ({
          sectionState: {
            ...s.sectionState,
            [sectionId]: { ...s.sectionState[sectionId], selectedRating: rating },
          },
          lastSavedAt: now(),
        })),

      setSectionDraft: (sectionId, draft) =>
        set((s) => ({
          sectionState: {
            ...s.sectionState,
            [sectionId]: { ...s.sectionState[sectionId], draftResponse: draft },
          },
          lastSavedAt: now(),
        })),

      linkEvidenceToSection: (sectionId, evidenceId) =>
        set((s) => {
          const existing = s.sectionState[sectionId].linkedEvidenceIds;
          if (existing.includes(evidenceId)) return s;
          return {
            sectionState: {
              ...s.sectionState,
              [sectionId]: {
                ...s.sectionState[sectionId],
                linkedEvidenceIds: [...existing, evidenceId],
              },
            },
            lastSavedAt: now(),
          };
        }),

      unlinkEvidenceFromSection: (sectionId, evidenceId) =>
        set((s) => ({
          sectionState: {
            ...s.sectionState,
            [sectionId]: {
              ...s.sectionState[sectionId],
              linkedEvidenceIds: s.sectionState[sectionId].linkedEvidenceIds.filter(
                (id) => id !== evidenceId
              ),
            },
          },
          lastSavedAt: now(),
        })),

      importState: (state) => set(() => ({ ...state, lastSavedAt: now() })),

      resetState: () => set(() => ({ ...createInitialState(), lastSavedAt: now() })),

      touchSaved: () => set((s) => ({ ...s, lastSavedAt: now() })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const migrated = runMigrations(state as AppState);
          Object.assign(state, migrated);
        }
      },
    }
  )
);
