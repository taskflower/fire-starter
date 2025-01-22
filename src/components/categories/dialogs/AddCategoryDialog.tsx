// src/components/categories/dialogs/AddCategoryDialog.tsx
import React from 'react';
import { Category } from "@/services/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CategoryForm from '../CategoryForm';

interface AddCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (category: Category) => void;
  categories: Category[];
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  isOpen,
  onOpenChange,
  onAdd,
  categories,
}) => {
  const handleSubmit = (category: Category) => {
    onAdd(category);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Dodaj Nową Kategorię</DialogTitle>
        <DialogDescription>
          Wprowadź nazwę kategorii i opcjonalnie wybierz kategorię nadrzędną.
        </DialogDescription>
        <CategoryForm
          category={{}}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          categories={categories}
          submitLabel="Dodaj"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;