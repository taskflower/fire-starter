/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/newgoals/types.ts

export type StepType = 'document_selection' | 'questions' | 'llm_processing';

export interface Step {
  id: string;
  type: StepType;
  title: string;
  description?: string;
  isCompleted: boolean;
  config: StepConfig;
  order?: number; // Dodane dla kompatybilności z GoalStep
}

export interface StepConfig {
  documentRequirements?: DocumentRequirement[];
  questions?: Question[];
  llmPrompt?: string;
  validationRules?: ValidationRules; // Dodane dla rozszerzonych walidacji
}

export interface ValidationRules {
  required?: boolean;
  minItems?: number;
  maxItems?: number;
  customValidation?: string;
}

export interface DocumentRequirement {
  categoryId: string;
  title: string;
  description?: string;
}

export interface Question {
  id: string;
  type: 'text' | 'select' | 'number';
  question: string;
  required: boolean;
  options?: string[];
}

// Typy dla StepData używanego w store
export interface StepData {
  answers?: Record<string, any>;
  documentIds?: string[];
  llmResponse?: string;
}

// Store state interface
export interface GoalStoreState {
  currentStepIndex: number;
  steps: Step[];
  stepsData: Record<string, StepData>;
}

// Store actions interface
export interface GoalStoreActions {
  initializeSteps: (steps: Step[]) => void;
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  setStepData: (stepId: string, data: Partial<StepData>) => void;
}

// Połączony typ dla store
export type GoalStore = GoalStoreState & GoalStoreActions;