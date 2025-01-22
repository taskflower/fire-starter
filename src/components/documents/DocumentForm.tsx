// src/components/documents/DocumentForm.tsx
import React from 'react';
import { Category, DocumentWithoutId } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TreeSelect } from '@/components/common/TreeSelect';
import { TreeNodeWithRequiredId } from '@/utils/treeUtils';

interface DocumentFormProps {
  document: Partial<DocumentWithoutId>;
  onSubmit: (document: DocumentWithoutId) => Promise<void>;
  onCancel?: () => void;
  categories: Category[];
  submitLabel?: string;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  document,
  onSubmit,
  onCancel,
  categories,
  submitLabel = 'Save'
}) => {
  const [formData, setFormData] = React.useState<Partial<DocumentWithoutId>>(document);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const documentToSubmit: DocumentWithoutId = {
      title: formData.title || '',
      content: formData.content || '',
      categoryId: formData.categoryId || '',
      createdAt: formData.createdAt || new Date(),
      updatedAt: new Date()
    };

    await onSubmit(documentToSubmit);
  };

  // Filtrujemy kategorie, żeby mieć pewność, że wszystkie mają id
  const categoriesWithId = categories.filter(
    (category): category is Category & { id: string } => !!category.id
  );

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter document title"
          value={formData.title || ''}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter document content"
          value={formData.content || ''}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
        />
      </div>

      <TreeSelect<TreeNodeWithRequiredId>
        items={categoriesWithId}
        value={formData.categoryId}
        onChange={(value) => setFormData({ ...formData, categoryId: value })}
        label="Category"
        placeholder="Select category"
      />

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};

export default DocumentForm;