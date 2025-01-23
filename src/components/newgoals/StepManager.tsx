// src/components/newgoals/StepManager.tsx
import { useEffect } from 'react';
import { Step, GoalStore } from './types';
import { useGoalStore } from '@/store/useGoalStore';
import { StepContent } from './steps/StepContent';
import { StepNavigation } from './StepNavigation';
import { StepProgress } from './StepProgress';

interface StepManagerProps {
  steps: Step[];
  onComplete?: () => void;
}

export function StepManager({ steps, onComplete }: StepManagerProps) {
  const { currentStepIndex, initializeSteps } = useGoalStore(
    (state): Pick<GoalStore, 'currentStepIndex' | 'initializeSteps'> => ({
      currentStepIndex: state.currentStepIndex,
      initializeSteps: state.initializeSteps
    })
  );

  useEffect(() => {
    initializeSteps(steps);
  }, [steps, initializeSteps]);

  if (steps.length === 0) {
    return <div>Brak dostępnych kroków</div>;
  }

  return (
    <div className="space-y-6">
      <StepProgress steps={steps} currentIndex={currentStepIndex} />
      <StepContent step={steps[currentStepIndex]} />
      <StepNavigation 
        canGoBack={currentStepIndex > 0}
        canGoForward={currentStepIndex < steps.length - 1}
        onComplete={onComplete}
      />
    </div>
  );
}