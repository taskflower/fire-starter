// src/components/goals/StepManager.tsx
import { useGoalStore } from "@/store/useGoalStore";
import { StepContent } from "./steps/StepContent";
import { StepDialog } from "./edit/StepDialog";


export function StepManager() {
  const {
    steps,
    editingStep,
    isDialogOpen,
    setIsDialogOpen,
  } = useGoalStore();

  if (steps.length === 0) {
    return <div>Brak dostępnych kroków</div>;
  }

  return (
    <div className="space-y-6">
      <StepContent />
      <StepDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        step={editingStep}
      />
    </div>
  );
}