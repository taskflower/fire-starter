// GoalTemplateForm.tsx
import { useState, useEffect } from "react";
import { GoalTemplate, GoalStep } from "@/types/goalTypes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FormActions } from "./FormActions";
import { GeneralTab } from "./GeneralTab";
import { CategoriesTab } from "../categories/CategoriesTab";
import { StepsTab } from "../steps/StepsTab";

interface GoalTemplateFormProps {
  template?: GoalTemplate | null;
  onClose: () => void;
  onSave: (template: GoalTemplate) => Promise<void>;
}

export function GoalTemplateForm({
  template,
  onClose,
  onSave,
}: GoalTemplateFormProps) {
  const [formData, setFormData] = useState<Partial<GoalTemplate>>({
    title: "",
    description: "",
    requiredCategories: [],
  });
  const [steps, setSteps] = useState<GoalStep[]>([]);

  useEffect(() => {
    if (template) {
      setFormData({
        title: template.title,
        description: template.description,
        requiredCategories: template.requiredCategories,
      });
      setSteps(template.steps || []);
    }
  }, [template]);

  const handleSubmit = async () => {
    if (!formData.title) return;

    const newTemplate: GoalTemplate = {
      id: template?.id || crypto.randomUUID(),
      title: formData.title!,
      description: formData.description || "",
      requiredCategories: formData.requiredCategories || [],
      steps,
      suggestedDocuments: template?.suggestedDocuments || [],
    };

    await onSave(newTemplate);
    onClose();
  };

  return (
    <div className="flex flex-col flex-grow">
      <Tabs defaultValue="general" className="w-full flex-grow">
        <div className="sticky top-0 bg-white z-10">
          <TabsList className="mb-4">
            <TabsTrigger value="general">Nazwa i opis</TabsTrigger>
            <TabsTrigger value="categories">Kategorie</TabsTrigger>
            <TabsTrigger value="steps">Kroki</TabsTrigger>
          </TabsList>
        </div>

        <GeneralTab formData={formData} setFormData={setFormData} />
        <CategoriesTab formData={formData} setFormData={setFormData} />
        <StepsTab steps={steps} setSteps={setSteps} />
      </Tabs>

      <FormActions
        template={template}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
