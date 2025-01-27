// src/components/goals/executions/process/steps/StepManager.tsx
import { StepDialog } from "@/components/goals/templates/edit/StepDialog";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { StepContent } from "./StepContent";

export function StepManager() {
  const {
    steps,
    editingStep,
    isDialogOpen,
    setIsDialogOpen,
  } = useGoalManagementStore();

  if (steps.length === 0) {
    return <div>No steps available</div>;
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