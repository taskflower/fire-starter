// src/store/useGoalStore.ts
import { create } from 'zustand';
import { GoalStore, Step, StepData } from '@/components/newgoals/types';

export const useGoalStore = create<GoalStore>((set) => ({
  currentStepIndex: 0,
  steps: [],
  stepsData: {},

  initializeSteps: (steps: Step[]) => {
    set({
      steps,
      currentStepIndex: 0,
      stepsData: {}
    });
  },

  moveToNextStep: () => {
    set((state) => ({
      currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length - 1)
    }));
  },

  moveToPreviousStep: () => {
    set((state) => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0)
    }));
  },

  setStepData: (stepId: string, data: Partial<StepData>) => {
    set((state) => ({
      stepsData: {
        ...state.stepsData,
        [stepId]: {
          ...state.stepsData[stepId],
          ...data
        }
      }
    }));
  }
}));