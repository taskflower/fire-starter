// src/components/goals/templates/edit/forms/DocumentForm.tsx
import { useCategories } from "@/hooks/useCategories";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { CategoryTreeSelect } from "../CategoryTreeSelect";
import { SourceStepsSelect } from "./SourceStepsSelect";
import { StepConfig } from "@/types/goals";

export function DocumentForm() {
  const { categories } = useCategories();
  const {
    selectedStepCategories,
    setSelectedCategories,
    stepFormData,
    setStepFormData,
  } = useGoalManagementStore();

  const defaultConfig: StepConfig = {
    documentRequirements: [],
    questions: [],
    llmPrompt: "",
    services: [],
    insert: [],
    validationRules: {},
    includeSteps: [],
  };

  // Mergujemy stepFormData.config z defaultConfig
  const config: StepConfig = { ...defaultConfig, ...stepFormData.config };

  const handleCategoriesChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    const newRequirements = categoryIds.map((categoryId) => ({
      categoryId,
      title: categories.find((cat) => cat.id === categoryId)?.name || "",
      description: "",
    }));
    setStepFormData({
      config: {
        ...config,
        documentRequirements: newRequirements,
        // 'services' pozostaje niezmienione
      },
    });
  };

  const handleSelectedStepsChange = (selected: string[]) => {
    setStepFormData({
      config: {
        ...config,
        selectedSteps: selected,
        // 'services' pozostaje niezmienione
      },
    });
  };

  return (
    <div className="space-y-4">
      <CategoryTreeSelect
        categories={categories}
        selectedCategories={selectedStepCategories}
        onSelectionChange={handleCategoriesChange}
      />

      <SourceStepsSelect
        selectedSteps={config.selectedSteps || []}
        onChange={handleSelectedStepsChange}
      />
    </div>
  );
}
