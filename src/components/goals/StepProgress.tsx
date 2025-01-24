// src/components/goals/StepProgress.tsx
import { Progress } from "@/components/ui/progress";
import { useGoalStore } from "@/store/useGoalStore";

export function StepProgress() {
  const { steps, currentStepIndex } = useGoalStore();
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="flex-1 flex items-center">
      <div className="flex justify-between text-sm w-24">
        <span className="text-muted-foreground">
          Krok {currentStepIndex + 1} z {steps.length}
        </span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
}