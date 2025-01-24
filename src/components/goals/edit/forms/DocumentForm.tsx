// DocumentForm.tsx
import { useCategories } from '@/hooks/useCategories';
import { CategoryTreeSelect } from '../CategoryTreeSelect';
import { useGoalStore } from '@/store/useGoalStore';

export function DocumentForm() {
  const { categories } = useCategories();
  const { selectedStepCategories, setSelectedCategories, stepFormData, setStepFormData } = useGoalStore();

  const handleCategoriesChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    const newRequirements = categoryIds.map(categoryId => ({
      categoryId,
      title: categories.find(cat => cat.id === categoryId)?.name || '',
      description: ''
    }));
    setStepFormData({ 
      config: {
        ...stepFormData.config,
        documentRequirements: newRequirements
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
    </div>
  );
}