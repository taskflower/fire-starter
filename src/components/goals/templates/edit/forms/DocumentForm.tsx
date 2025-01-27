// src/components/goals/templates/edit/forms/DocumentForm.tsx
import { useCategories } from "@/hooks/useCategories";
import { useGoalManagementStore, defaultStepConfig } from "@/store/useGoalManagementStore";
import { CategoryTreeSelect } from "../CategoryTreeSelect";
import { SourceStepsSelect } from "./SourceStepsSelect";


export function DocumentForm() {
  const { categories } = useCategories();
  const {
    selectedStepCategories,
    setSelectedCategories,
    stepFormData,
    setStepFormData,
  } = useGoalManagementStore();

  const config = stepFormData.config || defaultStepConfig;

  const handleCategoriesChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    const newRequirements = categoryIds.map((categoryId) => ({
      categoryId,
      title: categories.find((cat) => cat.id === categoryId)?.name || "",
      description: "",
    }));
    
    setStepFormData({
      config: {
        documentRequirements: newRequirements
      }
    });
  };

  const handleSelectedStepsChange = (selected: string[]) => {
    setStepFormData({
      config: {
        selectedSteps: selected
      }
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