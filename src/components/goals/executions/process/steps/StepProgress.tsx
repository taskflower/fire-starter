// src/components/goals/executions/process/steps/StepProgress.tsx
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { Progress } from "@/components/ui/progress";

export function StepProgress() {
  const { currentStepIndex } = useGoalExecutionStore();
  const { steps, onCompleteAction } = useGoalManagementStore();
  
  const totalSteps = steps.length + (onCompleteAction?.type === "summary" ? 1 : 0);
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;
  
  return (
    <div className="flex-1 flex items-center gap-4">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        Step {currentStepIndex + 1} of {totalSteps}
      </span>
      <Progress value={progress} className="h-2 flex-1" />
    </div>
  );
}