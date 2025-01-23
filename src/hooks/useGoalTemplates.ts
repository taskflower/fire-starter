// src/hooks/useGoalTemplates.ts
import { useState, useEffect } from "react";
import { FirestoreService } from "@/services/firestoreService";
import { GoalTemplate, CreateGoalTemplateDTO, UseGoalTemplatesReturn } from "@/types/goals";

const templateService = new FirestoreService<GoalTemplate>("goal-templates");

export const useGoalTemplates = (): UseGoalTemplatesReturn => {
  const [templates, setTemplates] = useState<GoalTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await templateService.getAll();
        const sanitizedData = data.map(template => ({
          ...template,
          requiredCategories: template.requiredCategories || [],
        }));
        setTemplates(sanitizedData);
      } catch (err) {
        setError("Failed to fetch goal templates");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const addTemplate = async (template: CreateGoalTemplateDTO): Promise<void> => {
    try {
      await templateService.add(template as GoalTemplate);
      const updatedTemplates = await templateService.getAll();
      setTemplates(updatedTemplates);
    } catch (err) {
      setError("Failed to add template");
      throw err;
    }
  };

  const updateTemplate = async (id: string, template: Partial<GoalTemplate>): Promise<void> => {
    try {
      await templateService.update(id, template);
      const updatedTemplates = await templateService.getAll();
      setTemplates(updatedTemplates);
    } catch (err) {
      setError("Failed to update template");
      throw err;
    }
  };

  const deleteTemplate = async (id: string): Promise<void> => {
    try {
      await templateService.delete(id);
      const updatedTemplates = await templateService.getAll();
      setTemplates(updatedTemplates);
    } catch (err) {
      setError("Failed to delete template");
      throw err;
    }
  };

  const getTemplateById = async (id: string): Promise<GoalTemplate | null> => {
    try {
      const template = await templateService.getById(id);
      return template;
    } catch (err) {
      setError("Failed to fetch the template");
      console.error(err);
      return null;
    }
  };

  return {
    templates,
    loading,
    error,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById,
  };
};
