// src/components/goals/path/ActionPlan.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoalStep } from "@/types/goalTypes";
import { StepDetails } from "./StepDetails";

interface ActionPlanProps {
  steps: (GoalStep & { completed: boolean })[];
  onToggleStep: (stepId: string) => void;
}

export function ActionPlan({ steps, onToggleStep }: ActionPlanProps) {
  const progress = steps.length
    ? Math.round((steps.filter((step) => step.completed).length / steps.length) * 100)
    : 0;

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Plan działania</CardTitle>
        <CardDescription>Kroki do realizacji wybranego celu</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Postęp: {progress}%
          </p>
          <Progress value={progress} className="w-full" />
        </div>

        <div className="space-y-3">
          {steps.map((step) => (
            <StepDetails key={step.id} step={step} onToggle={onToggleStep} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}