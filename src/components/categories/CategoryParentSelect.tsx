// src/components/categories/CategoryParentSelect.tsx
import React from 'react';
import { TreeSelect } from '@/components/common/TreeSelect';
import { Category } from '@/types/types';
import { TreeNodeWithRequiredId } from '@/utils/treeUtils';

interface CategoryParentSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  availableCategories: Category[];
  currentCategoryId?: string;
}

const CategoryParentSelect: React.FC<CategoryParentSelectProps> = ({
  value,
  onChange,
  availableCategories,
  currentCategoryId
}) => {
  // Filtrujemy kategorie, żeby mieć pewność, że wszystkie mają id
  const categoriesWithId = availableCategories.filter(
    (category): category is Category & { id: string } => !!category.id
  );

  return (
    <TreeSelect<TreeNodeWithRequiredId>
      items={categoriesWithId}
      value={value}
      onChange={onChange}
      currentId={currentCategoryId}
      label="Kategoria nadrzędna"
      placeholder="Wybierz kategorię nadrzędną (opcjonalne)"
    />
  );
};

export default CategoryParentSelect;