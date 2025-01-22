// GoalTemplateDialog.tsx
import { GoalTemplate } from "@/types/goalTypes";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalTemplateForm } from "../form/GoalTemplateForm";

interface GoalTemplateDialogProps {
  template?: GoalTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: GoalTemplate) => Promise<void>;
}

export function GoalTemplateDialog({
  template,
  isOpen,
  onClose,
  onSave,
}: GoalTemplateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[60vh] flex flex-col overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            {template ? "Edytuj szablon celu" : "Nowy szablon celu"}
          </DialogTitle>
        </DialogHeader>
        <GoalTemplateForm 
          template={template}
          onClose={onClose}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}