import { useGoalStore } from "@/store/useGoalStore";
import { Progress } from "@/components/ui/progress"; // Changed import

export function StepProgress() {
  const { steps, currentStepIndex, onCompleteAction } = useGoalStore();
  const totalSteps = steps.length + 
    (onCompleteAction?.type === "summary" ? 1 : 0);
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;
  
  return (
    <div className="flex-1 flex items-center">
      <div className="flex justify-between text-sm w-24">
        <span className="text-muted-foreground">
          Krok {currentStepIndex + 1} z {totalSteps}
        </span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
}