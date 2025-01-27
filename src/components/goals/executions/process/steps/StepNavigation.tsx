// src/components/goals/executions/process/steps/StepNavigation.tsx
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StepProgress } from "./StepProgress";

export function StepNavigation({
  canGoBack,
  canGoForward,
  onComplete
}: {
  canGoBack: boolean;
  canGoForward: boolean;
  onComplete: () => void;  // dodaj to
}) {
  const { moveToNextStep, moveToPreviousStep, currentStepIndex } = useGoalExecutionStore();
  const { onCompleteAction, steps } = useGoalManagementStore();
  
  const isSummaryNext = onCompleteAction?.type === "summary" && currentStepIndex === steps.length - 1;
  const showingSummary = currentStepIndex === steps.length;

  const handleNext = () => {
    if (isSummaryNext || canGoForward) {
      moveToNextStep();
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full mt-6">
      <Button
        variant="outline"
        onClick={moveToPreviousStep}
        disabled={!canGoBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous Step
      </Button>
      <StepProgress />
      {showingSummary ? 
  <Button onClick={onComplete}>Finish</Button> : 
  <Button onClick={handleNext}>
    Next Step
    {canGoForward && <ChevronRight className="ml-2 h-4 w-4" />}
  </Button>
}
    </div>
  );
}