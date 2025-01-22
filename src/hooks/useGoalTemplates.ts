// src/hooks/useGoalTemplates.ts
import { useState, useEffect } from "react";
import { GoalTemplate } from "@/types/goalTypes";
import { FirestoreService } from "@/services/firestoreService";

const templateService = new FirestoreService<GoalTemplate>("goal-templates");

export const useGoalTemplates = () => {
  const [templates, setTemplates] = useState<GoalTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await templateService.getAll();
        setTemplates(data);
      } catch (err) {
        setError("Failed to fetch goal templates");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const addTemplate = async (template: GoalTemplate) => {
    try {
      await templateService.add(template);
      const updatedTemplates = await templateService.getAll();
      setTemplates(updatedTemplates);
    } catch (err) {
      setError("Failed to add template");
      throw err;
    }
  };

  const updateTemplate = async (id: string, template: Partial<GoalTemplate>) => {
    try {
      await templateService.update(id, template);
      const updatedTemplates = await templateService.getAll();
      setTemplates(updatedTemplates);
    } catch (err) {
      setError("Failed to update template");
      throw err;
    }
  };

  return {
    templates,
    loading,
    error,
    addTemplate,
    updateTemplate
  };
};