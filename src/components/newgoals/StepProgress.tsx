// src/components/newgoals/StepProgress.tsx
import { Progress } from '@/components/ui/progress';
import { Step } from './types';

interface StepProgressProps {
  steps: Step[];
  currentIndex: number;
}

export function StepProgress({ steps, currentIndex }: StepProgressProps) {
  const progress = ((currentIndex + 1) / steps.length) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Krok {currentIndex + 1} z {steps.length}
        </span>
        <span className="font-medium">{steps[currentIndex].title}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
