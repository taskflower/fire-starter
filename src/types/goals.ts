/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/goals.ts

export type StepType =
  | "document_selection"
  | "questions"
  | "llm_processing"
  | "services"
  | "insert";

export interface BaseDocument {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Step {
  id: string;
  type: StepType;
  title: string;
  description?: string;
  isCompleted: boolean;
  order: number;
  config: StepConfig;
}

export interface StepConfig {
  documentRequirements?: DocumentRequirement[];
  questions?: Question[];
  llmPrompt?: string;
  services: string[];
  insert?: string[];
  validationRules?: ValidationRules;
  includeSteps?: string[];
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
  type: "text" | "select" | "number";
  question: string;
  required: boolean;
  options?: string[];
}

export interface StepData {
  answers?: Record<string, any>;
  documentIds?: string[];
  llmResponse?: string;
}

export interface GoalTemplate extends BaseDocument {
  title: string;
  description: string;
  onCompleteAction: OnCompleteAction;
  steps: Step[];
  isPublic?: boolean;
  status: "draft" | "published" | "archived";
  metadata?: {
    version?: string;
    tags?: string[];
    difficulty?: "beginner" | "intermediate" | "advanced";
    estimatedDuration?: string;
    prerequisites?: string[];
  };
}

export type OnCompleteAction = {
  type: "none" | "redirect" | "summary";
  redirectPath?: string;
  includeSummaryStep?: boolean;
};

export type CreateGoalTemplateDTO = Omit<GoalTemplate, keyof BaseDocument>;

export interface UpdateGoalTemplateDTO
  extends Partial<Omit<GoalTemplate, keyof BaseDocument>> {
  id: string;
}

export interface GoalTemplateFilters {
  status?: GoalTemplate["status"];
  categories?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  isPublic?: boolean;
  searchQuery?: string;
}

export interface UseGoalTemplatesReturn {
  templates: GoalTemplate[];
  loading: boolean;
  error: string | null;
  addTemplate: (template: CreateGoalTemplateDTO) => Promise<void>;
  updateTemplate: (
    id: string,
    template: Partial<GoalTemplate>
  ) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  getTemplateById: (id: string) => Promise<GoalTemplate | null>;
}
export interface GoalStore {
  currentStepIndex: number;
  initializeSteps: (steps: Step[]) => void;
}
