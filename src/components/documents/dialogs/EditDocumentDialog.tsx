import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Category, DocumentWithId, DocumentWithoutId } from '@/types/types';
import DocumentForm from '../DocumentForm';

interface EditDocumentDialogProps {
  document: DocumentWithId;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (document: DocumentWithId) => Promise<void>;
  categories: Category[];
  getCategoryPath: (categoryId: string) => string;
}

const EditDocumentDialog: React.FC<EditDocumentDialogProps> = ({
  document,
  isOpen,
  onClose,
  onEdit,
  categories,

}) => {
  const handleSubmit = async (docData: DocumentWithoutId) => {
    console.log('EditDialog - submitting document:', docData);
    await onEdit({
      ...docData,
      id: document.id
    });
    onClose();
  };

  const documentWithoutId: Partial<DocumentWithoutId> = {
    title: document.title,
    content: document.content,
    categoryId: document.categoryId,
    destinations: document.destinations,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
        </DialogHeader>
        <DocumentForm
          document={documentWithoutId}
          onSubmit={handleSubmit}
          onCancel={onClose}
          categories={categories}
          
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentDialog;