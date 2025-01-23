// src/types/goals.ts
import { Step } from "@/components/newgoals/types";

export interface BaseDocument {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalTemplate extends BaseDocument {
  title: string;
  description: string;
  steps: GoalStep[];
  requiredCategories: string[];
  isPublic?: boolean;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  metadata?: {
    version?: string;
    tags?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    estimatedDuration?: string;
    prerequisites?: string[];
  };
}

export interface GoalStep extends Omit<Step, 'isCompleted'> {
  order: number;
  validationRules?: {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
    customValidation?: string;
  };
  metadata?: {
    estimatedDuration?: string;
    importance?: 'low' | 'medium' | 'high';
    helpText?: string;
  };
}

export type CreateGoalTemplateDTO = Omit<GoalTemplate, keyof BaseDocument | 'authorId' | 'status'> & {
  status?: GoalTemplate['status'];
}

export interface UpdateGoalTemplateDTO extends Partial<Omit<GoalTemplate, keyof BaseDocument | 'authorId'>> {
  id: string;
}

export interface GoalTemplateFilters {
  status?: GoalTemplate['status'];
  categories?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  authorId?: string;
  isPublic?: boolean;
  searchQuery?: string;
}
export interface GoalTemplateStats {
  totalSteps: number;
  averageCompletionTime?: number;
  usageCount: number;
  successRate?: number;
  lastUpdated: Date;
}

// Hook types
export interface UseGoalTemplatesReturn {
  templates: GoalTemplate[];
  loading: boolean;
  error: string | null;
  addTemplate: (template: CreateGoalTemplateDTO) => Promise<void>;
  updateTemplate: (id: string, template: Partial<GoalTemplate>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  getTemplateById: (id: string) => Promise<GoalTemplate | null>;
}
