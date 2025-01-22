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
    dependsOn?: string[]; // Step IDs that must be completed first
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