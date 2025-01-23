// src/components/categories/dialogs/EditCategoryDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CategoryForm from '../CategoryForm';
import { Category } from '@/types/types';

interface EditCategoryDialogProps {
  category: Category | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (category: Category) => void;
  categories: Category[];
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  category,
  isOpen,
  onOpenChange,
  onEdit,
  categories,
}) => {
  if (!category) return null;

  const handleSubmit = (updatedCategory: Category) => {
    onEdit(updatedCategory);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Edytuj Kategorię</DialogTitle>
        <DialogDescription>
          Zmień nazwę kategorii lub wybierz inną kategorię nadrzędną.
        </DialogDescription>
        <CategoryForm
          category={category}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          categories={categories}
          submitLabel="Zapisz zmiany"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;