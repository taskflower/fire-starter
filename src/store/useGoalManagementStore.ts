// src/store/useGoalManagementStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Step, OnCompleteAction } from '@/types/goals';

interface GoalManagementState {
  title: string;
  description: string;
  onCompleteAction: OnCompleteAction;
  steps: Step[];
  editingStep: Step | null;
  isDialogOpen: boolean;
  isProcessingLLM: boolean;
  stepFormData: Partial<Step>;
  selectedStepCategories: string[];
  selectedLLMSteps: string[];
}

const initialState: GoalManagementState = {
  title: "",
  description: "",
  onCompleteAction: { type: "none" },
  steps: [],
  editingStep: null,
  isDialogOpen: false,
  isProcessingLLM: false,
  stepFormData: {
    title: "",
    description: "",
    type: undefined,
    config: {
      documentRequirements: [],
      questions: [],
      llmPrompt: "",
      services: [],
      insert: [],
    },
  },
  selectedStepCategories: [],
  selectedLLMSteps: [],
};

interface GoalManagementActions {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setOnCompleteAction: (action: OnCompleteAction) => void;
  setSteps: (steps: Step[]) => void;
  setEditingStep: (step: Step | null) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  setIsProcessingLLM: (isProcessing: boolean) => void;
  setStepFormData: (data: Partial<Step>) => void;
  resetStepForm: () => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedLLMSteps: (stepIds: string[]) => void;
  handleStepSave: (updatedStep: Step) => void;
  resetStore: () => void;
}

export const useGoalManagementStore = create<GoalManagementState & GoalManagementActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTitle: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setOnCompleteAction: (action) => set({ onCompleteAction: action }),
      setSteps: (steps) => set({ steps }),
      setEditingStep: (step) => set({ editingStep: step }),
      setIsDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
      setIsProcessingLLM: (isProcessing) => set({ isProcessingLLM: isProcessing }),
      setStepFormData: (data) => set((state) => ({
        stepFormData: { ...state.stepFormData, ...data },
      })),
      resetStepForm: () => set({
        stepFormData: initialState.stepFormData,
      }),
      setSelectedCategories: (categories) => set({ selectedStepCategories: categories }),
      setSelectedLLMSteps: (stepIds) => set({ selectedLLMSteps: stepIds }),
      resetStore: () => set(initialState),
      handleStepSave: (updatedStep) => {
        const state = get();
        const { editingStep, steps } = state;
        let newSteps;

        if (editingStep) {
          newSteps = steps.map((s) => (s.id === editingStep.id ? updatedStep : s));
        } else {
          newSteps = [...steps, updatedStep];
        }

        newSteps = newSteps.map((step, index) => ({
          ...step,
          order: index,
        }));

        set({
          steps: newSteps,
          editingStep: null,
          isDialogOpen: false,
        });
      },
    }),
    {
      name: 'goal-management-storage',
    }
  )
);