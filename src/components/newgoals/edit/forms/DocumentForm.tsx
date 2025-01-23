
import { useCategories } from '@/hooks/useCategories';
import { CategoryTreeSelect } from '../CategoryTreeSelect';
import { StepConfig } from '../../types';
import { useState } from 'react';

interface DocumentFormProps {
  config?: StepConfig;
  onChange: (config: StepConfig) => void;
}

export function DocumentForm({ config = {}, onChange }: DocumentFormProps) {
  const { categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    config.documentRequirements?.map(req => req.categoryId) || []
  );

  const handleCategoriesChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
    const newRequirements = categoryIds.map(categoryId => ({
      categoryId,
      title: categories.find(cat => cat.id === categoryId)?.name || '',
      description: ''
    }));
    onChange({
      ...config,
      documentRequirements: newRequirements
    });
  };

  return (
    <div className="space-y-4">
      <CategoryTreeSelect
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectionChange={handleCategoriesChange}
      />
    </div>
  );
}