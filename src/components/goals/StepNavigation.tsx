// src/components/goals/StepNavigation.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGoalStore } from "@/store/useGoalStore";
import { StepProgress } from "./StepProgress";

interface StepNavigationProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onComplete?: () => void;
}

export function StepNavigation({
  canGoBack,
  canGoForward,
  onComplete,
}: StepNavigationProps) {
  const { moveToNextStep, moveToPreviousStep } = useGoalStore();

  const handleNext = () => {
    if (canGoForward) {
      moveToNextStep();
    } else {
      onComplete?.();
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
      <Button onClick={handleNext}>
        {!canGoForward ? "Zakończ" : "Następny krok"}
        {canGoForward && <ChevronRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}