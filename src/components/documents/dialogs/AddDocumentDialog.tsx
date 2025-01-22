// src/components/documents/dialogs/AddDocumentDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Category, DocumentWithoutId } from "@/types/types";
import DocumentForm from "../DocumentForm";
interface AddDocumentDialogProps {
  onAdd: (document: DocumentWithoutId) => Promise<void>;
  categories: Category[];
  getCategoryPath: (categoryId: string) => string;
}
const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({
  onAdd,
  categories,
  getCategoryPath,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (document: DocumentWithoutId) => {
    await onAdd(document);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Add Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
        </DialogHeader>
        <DocumentForm
          document={{}}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          categories={categories}
          getCategoryPath={getCategoryPath}
          submitLabel="Add Document"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
