import { GoalTemplate, GoalStep } from "@/types/goalTypes";
import { FirestoreService } from "./firestoreService";

// src/services/goalTemplateService.ts
export class GoalTemplateService extends FirestoreService<GoalTemplate> {
    constructor() {
      super('goal-templates');
    }
  
    async createFromDocuments(template: GoalTemplate): Promise<string> {
      // Check if all required categories exist
      const categories = await this.categoriesService.getAll();
      const validCategories = template.requiredCategories.every(
        catId => categories.find(c => c.id === catId)
      );
      if (!validCategories) {
        throw new Error('Some required categories do not exist');
      }
  
      // Create template
      return this.add(template);
    }
  
    async generateStepsFromTemplate(templateId: string): Promise<GoalStep[]> {
      const template = await this.get(templateId);
      if (!template) throw new Error('Template not found');
  
      // Get existing documents for suggestions
      const documents = await this.documentsService.getAll();
      
      return template.steps.map(step => ({
        ...step,
        suggestedDocuments: documents
          .filter(doc => step.requiredDocuments
            .some(req => req.categoryId === doc.categoryId))
          .map(doc => ({
            documentId: doc.id,
            relevance: this.calculateRelevance(doc, step),
            reason: 'Based on category match'
          }))
      }));
    }
  
    private calculateRelevance(doc: DocumentType, step: GoalStep): number {
      // Implement relevance scoring based on content similarity
      // This is a simplified version
      return step.requiredDocuments.some(req => req.categoryId === doc.categoryId) 
        ? 75 
        : 25;
    }
  }