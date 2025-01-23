// src/components/categories/CategoryForm.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CategoryParentSelect from './CategoryParentSelect';
import { Category } from '@/types/types';

interface CategoryFormProps {
  category: Partial<Category>;
  onSubmit: (category: Category) => void;
  onCancel?: () => void;
  categories: Category[];
  submitLabel?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  categories,
  submitLabel = 'Save'
}) => {
  const [formData, setFormData] = React.useState<Partial<Category>>({
    ...category,
    parent_id: category.parent_id || 'none'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim()) return;

    const categoryToSubmit: Category = {
      id: formData.id || '',
      name: formData.name,
      parent_id: formData.parent_id === 'none' ? undefined : formData.parent_id
    };

    onSubmit(categoryToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nazwa kategorii</Label>
        <Input
          id="name"
          placeholder="Wprowadź nazwę kategorii"
          value={formData.name || ''}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="w-full"
        />
      </div>
      <CategoryParentSelect
        value={formData.parent_id}
        onChange={(value) => setFormData({ ...formData, parent_id: value })}
        availableCategories={categories}
        currentCategoryId={category.id}
      />
      <div className="flex justify-end space-x-4 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};

export default CategoryForm;