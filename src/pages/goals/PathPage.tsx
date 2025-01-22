// src/app/path/page.tsx
import { useState, useEffect } from "react";
import { GoalTemplate, GoalStep } from "@/types/goalTypes";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useDocuments } from "@/hooks/useDocuments";
import { GoalTemplateDialog } from "@/components/goals/template/dialogs/GoalTemplateDialog";
import { TemplateSelector } from "@/components/goals/path/TemplateSelector";
import { RecommendedDocuments } from "@/components/goals/path/RecommendedDocuments";
import { ActionPlan } from "@/components/goals/path/ActionPlan";

export default function PathPage() {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useGoalTemplates();
  const { documents } = useDocuments();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<GoalTemplate | null>(null);
  const [steps, setSteps] = useState<(GoalStep & { completed: boolean })[]>([]);
  const [recommendations, setRecommendations] = useState<Array<{
    id: string;
    name: string;
    match: number;
    description: string;
  }>>([]);

  useEffect(() => {
    if (selectedTemplateId && templates) {
      const template = templates.find((t) => t.id === selectedTemplateId);
      if (template) {
        setSteps(template.steps.map((step) => ({ ...step, completed: false })));
        updateRecommendations(template);
      }
    }
  }, [selectedTemplateId, templates, documents]);

  const updateRecommendations = (template: GoalTemplate) => {
    const allRequiredCategories = new Set(template.requiredCategories);
    const relevantDocs = documents
      .filter((doc) => allRequiredCategories.has(doc.categoryId))
      .map((doc) => ({
        id: doc.id,
        name: doc.title,
        match: 75,
        description: doc.content.substring(0, 100) + "...",
      }));
    setRecommendations(relevantDocs);
  };

  const handleSaveTemplate = async (template: GoalTemplate) => {
    if (templates.some((t) => t.id === template.id)) {
      await updateTemplate(template.id, template);
    } else {
      await addTemplate(template);
    }
    setSelectedTemplateId(template.id);
  };

  const handleEditTemplate = () => {
    const template = templates.find((t) => t.id === selectedTemplateId);
    if (template) {
      setTemplateToEdit(template);
      setDialogOpen(true);
    }
  };

  const handleDeleteTemplate = async () => {
    await deleteTemplate(selectedTemplateId);
    setSelectedTemplateId("");
  };

  const toggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Moja Podróż do Celu</h1>

      <TemplateSelector
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        onTemplateSelect={setSelectedTemplateId}
        onAddTemplate={() => {
          setTemplateToEdit(null);
          setDialogOpen(true);
        }}
        onEditTemplate={handleEditTemplate}
        onDeleteTemplate={handleDeleteTemplate}
      />

      <GoalTemplateDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveTemplate}
        template={templateToEdit}
      />

      {selectedTemplateId && (
        <div className="flex flex-col lg:flex-row gap-8">
          <RecommendedDocuments documents={recommendations} />
          <ActionPlan steps={steps} onToggleStep={toggleStep} />
        </div>
      )}
    </>
  );
}