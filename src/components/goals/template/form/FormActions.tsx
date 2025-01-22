// FormActions.tsx
import { Button } from "@/components/ui/button";
import { GoalTemplate } from "@/types/goalTypes";

interface FormActionsProps {
  template?: GoalTemplate | null;
  onClose: () => void;
  onSubmit: () => void;
}

export function FormActions({ template, onClose, onSubmit }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={onClose}>
        Anuluj
      </Button>
      <Button onClick={onSubmit}>
        {template ? "Zapisz zmiany" : "Zapisz szablon"}
      </Button>
    </div>
  );
}