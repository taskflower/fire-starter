// src/store/useGoalManagementStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Step, OnCompleteAction, StepConfig } from '@/types/goals';

export const defaultStepConfig: StepConfig = {
  documentRequirements: [],
  questions: [],
  llmPrompt: "",
  services: [],
  insert: [],
  validationRules: {},
  includeSteps: [],
  selectedSteps: [],
  serviceName: "",
  serviceEndpoint: "",
};

interface GoalManagementState {
  title: string;
  description: string;
  onCompleteAction: OnCompleteAction;
  steps: Step[];
  editingStep: Step | null;
  isDialogOpen: boolean;
  isProcessingLLM: boolean;
  isSaving: boolean;
  stepFormData: {
    title?: string;
    description?: string;
    type?: string;
    config: StepConfig;
  };
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
  isSaving: false,
  stepFormData: {
    title: "",
    description: "",
    type: undefined,
    config: defaultStepConfig,
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
  setIsSaving: (isSaving: boolean) => void;
  setStepFormData: (data: Partial<{
    title?: string;
    description?: string;
    type?: string;
    config?: Partial<StepConfig>;
  }>) => void;
  resetStepForm: () => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedLLMSteps: (stepIds: string[]) => void;
  handleStepSave: (updatedStep: Step) => Promise<void>;
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
      setIsSaving: (isSaving) => set({ isSaving }),
      
      setStepFormData: (data) => set((state) => ({
        stepFormData: {
          ...state.stepFormData,
          ...data,
          config: data.config ? {
            ...state.stepFormData.config,
            ...data.config
          } : state.stepFormData.config,
        },
      })),

      resetStepForm: () => set({
        stepFormData: {
          ...initialState.stepFormData,
          config: { ...defaultStepConfig }
        },
      }),
      
      setSelectedCategories: (categories) => set({ selectedStepCategories: categories }),
      setSelectedLLMSteps: (stepIds) => set({ selectedLLMSteps: stepIds }),
      resetStore: () => set(initialState),
      
      handleStepSave: async (updatedStep) => {
        const state = get();
        const { editingStep, steps } = state;
        
        set({ isSaving: true });
        
        try {
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

          // Dodajemy sztuczne opóźnienie do testów
          await new Promise(resolve => setTimeout(resolve, 1000));

          set({
            steps: newSteps,
            editingStep: null,
            isDialogOpen: false,
          });
        } catch (error) {
          console.error('Error saving step:', error);
          // Tu możesz dodać obsługę błędów
        } finally {
          set({ isSaving: false });
        }
      },
    }),
    {
      name: 'goal-management-storage',
    }
  )
);