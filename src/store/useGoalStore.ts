// src/store/useGoalStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Step, OnCompleteAction, StepData } from "@/types/goals";

interface GoalState {
  currentStepIndex: number;
  steps: Step[];
  stepsData: Record<string, StepData>;
  title: string;
  description: string;
  onCompleteAction: OnCompleteAction;
  editingStep: Step | null;
  isDialogOpen: boolean;
  isProcessingLLM: boolean;
  stepFormData: Partial<Step>;
  selectedStepCategories: string[];
  selectedLLMSteps: string[];
}

interface GoalActions {
  initializeSteps: (steps: Step[]) => void;
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  setStepData: (stepId: string, data: Partial<StepData>) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setOnCompleteAction: (action: OnCompleteAction) => void;
  setSteps: (steps: Step[]) => void;
  setEditingStep: (step: Step | null) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  setIsProcessingLLM: (isProcessing: boolean) => void;
  setStepFormData: (data: Partial<Step>) => void;
  resetStepForm: () => void;
  addStep: (step: Step) => void;
  updateStep: (index: number, step: Step) => void;
  deleteStep: (index: number) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedLLMSteps: (stepIds: string[]) => void;
  resetStore: () => void;
  handleStepSave: (updatedStep: Step) => void;
}

const initialState: GoalState = {
  currentStepIndex: 0,
  steps: [],
  stepsData: {},
  title: "",
  description: "",
  onCompleteAction: { type: "none" },
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
    },
  },
  selectedStepCategories: [],
  selectedLLMSteps: [],
};

export const useGoalStore = create<GoalState & GoalActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      handleStepSave: (updatedStep: Step) => {
        const state = get();
        const { editingStep, steps } = state;
        let newSteps;

        if (editingStep) {
          newSteps = steps.map(s => s.id === editingStep.id ? updatedStep : s);
        } else {
          newSteps = [...steps, updatedStep];
        }

        newSteps = newSteps.map((step, index) => ({
          ...step,
          order: index
        }));

        set({
          steps: newSteps,
          editingStep: null,
          isDialogOpen: false
        });
      },

      addStep: (step: Step) => set((state) => ({
        steps: [...state.steps, step]
      })),

      updateStep: (index: number, step: Step) => set((state) => ({
        steps: state.steps.map((s, i) => i === index ? step : s)
      })),

      deleteStep: (index: number) => set((state) => ({
        steps: state.steps.filter((_, i) => i !== index)
      })),

      initializeSteps: (steps) => set({ steps, currentStepIndex: 0, stepsData: {} }),
      moveToNextStep: () => set((state) => ({
        currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length - 1)
      })),
      moveToPreviousStep: () => set((state) => ({
        currentStepIndex: Math.max(state.currentStepIndex - 1, 0)
      })),
      setStepData: (stepId, data) => set((state) => ({
        stepsData: {
          ...state.stepsData,
          [stepId]: { ...state.stepsData[stepId], ...data }
        }
      })),
      setTitle: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setOnCompleteAction: (action) => set({ onCompleteAction: action }),
      setSteps: (steps) => set({ steps }),
      setEditingStep: (step) => set({ editingStep: step }),
      setIsDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
      setIsProcessingLLM: (isProcessing) => set({ isProcessingLLM: isProcessing }),
      setStepFormData: (data) => set((state) => ({
        stepFormData: { ...state.stepFormData, ...data }
      })),
      resetStepForm: () => set(() => ({
        stepFormData: initialState.stepFormData
      })),
      setSelectedCategories: (categories) => set({
        selectedStepCategories: categories
      }),
      setSelectedLLMSteps: (stepIds) => set({
        selectedLLMSteps: stepIds
      }),
      resetStore: () => set(initialState)
    }),
    {
      name: 'goal-storage'
    }
  )
);