// src/types/goalTypes.ts
export interface GoalTemplate {
    id: string;
    title: string;
    description: string;
    steps: GoalStep[];
    requiredCategories: string[]; // Category IDs
    suggestedDocuments: DocumentSuggestion[];
  }
  
  export interface GoalStep {
    id: string;
    title: string;
    description: string;
    requiredDocuments: DocumentRequirement[];
    questions: StepQuestion[];
    dependsOn?: string[];
  }

  export interface StepQuestion {
    id: string;
    type: 'text' | 'select' | 'multiselect' | 'number';
    question: string;
    required: boolean;
    options?: string[];
  }

  export interface QuestionFormData {
    id: string;
    type: 'text' | 'select' | 'multiselect' | 'number';
    question: string;
    required: boolean;
    options: string[];
  }
  
  export interface DocumentRequirement {
    categoryId: string;
    title: string;
    description: string;
    template?: string; // Optional document template
  }
  
  export interface DocumentSuggestion {
    documentId: string;
    relevance: number; // 0-100
    reason: string;
  }