import { useGoalStore } from "@/store/useGoalStore";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StepProgress } from "./StepProgress";

export function StepNavigation({
  canGoBack,
  canGoForward,
}: {
  canGoBack: boolean;
  canGoForward: boolean;
}) {
  const { moveToNextStep, moveToPreviousStep, onCompleteAction, currentStepIndex, steps } = useGoalStore();
  const isSummaryNext = onCompleteAction?.type === "summary" && currentStepIndex === steps.length - 1;
  const showingSummary = currentStepIndex === steps.length;

  const handleNext = () => {
    if (isSummaryNext || canGoForward) {
      moveToNextStep();
    }
  };

  return (
    <div className="flex justify-between mt-6 gap-6 w-full">
      <Button
        variant="outline"
        onClick={moveToPreviousStep}
        disabled={!canGoBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Poprzedni krok
      </Button>
      <StepProgress />
      <Button 
        onClick={handleNext}
        disabled={showingSummary}
      >
        {showingSummary ? "Zakończ" : "Następny krok"}
        {canGoForward && <ChevronRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}