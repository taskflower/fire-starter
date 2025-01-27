// src/store/useGoalExecutionStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GoalExecution, Step, StepData } from '@/types/goals';
import { FirestoreService } from '@/services/firestoreService';

interface GoalExecutionState {
  steps: Step[];  
  currentStepIndex: number;
  stepsData: Record<string, StepData>;
  executionId: string | null;
  executions: GoalExecution[];
  maxSteps: number;
}

interface GoalExecutionActions {
  initializeSteps: (steps: Step[]) => void;
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  setStepData: (stepId: string, data: Partial<StepData>) => void;
  setExecutionId: (id: string | null) => void;
  setExecutions: (executions: GoalExecution[]) => void;
  loadExecutions: () => Promise<void>;
  deleteExecution: (id: string) => Promise<void>;
}

export const useGoalExecutionStore = create<GoalExecutionState & GoalExecutionActions>()(
  persist(
    (set, get) => ({
      // Initial state
      steps: [],
      currentStepIndex: 0,
      stepsData: {},
      executionId: null,
      executions: [],
      maxSteps: 0,

      // Actions
      initializeSteps: (steps) => set({ 
        steps,
        currentStepIndex: 0, 
        stepsData: {}, 
        maxSteps: steps.length 
      }),

      moveToNextStep: () => set((state) => ({
        currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length),
      })),

      moveToPreviousStep: () => set((state) => ({
        currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
      })),

      setStepData: (stepId, data) => set((state) => ({
        stepsData: {
          ...state.stepsData,
          [stepId]: { ...state.stepsData[stepId], ...data },
        },
      })),

      setExecutionId: (id) => set({ executionId: id }),
      setExecutions: (executions) => set({ executions }),

      loadExecutions: async () => {
        const executionService = new FirestoreService<GoalExecution>("goal-executions");
        const executions = await executionService.getAll();
        set({ executions });
      },
      
      deleteExecution: async (id: string) => {
        try {
          const executionService = new FirestoreService<GoalExecution>("goal-executions");
          await executionService.delete(id);
          const updatedExecutions = get().executions.filter(execution => execution.id !== id);
          set({ executions: updatedExecutions });
        } catch (error) {
          console.error("Error deleting execution:", error);
        }
      },
    }),
    {
      name: 'goal-execution-storage',
    }
  )
);